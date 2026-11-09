import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { createContactSubmission, getPublishedArticles, getArticleBySlug, createArticle, updateArticle } from "./db";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";
import * as pricingService from "./pricing";

const ADMIN_COOKIE = "txus_admin";
const ADMIN_PIN = process.env.ADMIN_PIN || "txus2026";

function isAdminRequest(ctx: { user: { role?: string } | null; req: { headers: { cookie?: string } } }): boolean {
  if (ctx.user?.role === "admin") return true;
  return (ctx.req.headers.cookie || "").split(";").some(c => c.trim() === `${ADMIN_COOKIE}=1`);
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    adminStatus: publicProcedure.query(({ ctx }) => {
      const isAdm = isAdminRequest(ctx);
      const method = ctx.user?.role === "admin" ? "user" : isAdm ? "cookie" : "none";
      return { isAdmin: isAdm, method } as const;
    }),
    adminLogin: publicProcedure
      .input(z.object({ pin: z.string() }))
      .mutation(({ input, ctx }) => {
        if (input.pin !== ADMIN_PIN) {
          throw new Error("Invalid admin PIN");
        }
        const cookieOptions = getSessionCookieOptions(ctx.req);
        ctx.res.cookie(ADMIN_COOKIE, "1", { ...cookieOptions, maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        return { success: true } as const;
      }),
    adminLogout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(ADMIN_COOKIE, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Valid email is required"),
          phone: z.string().optional(),
          subject: z.string().min(1, "Subject is required"),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createContactSubmission({
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            subject: input.subject,
            message: input.message,
          });
          const notificationSent = await notifyOwner({
            title: `TXUS Website Customer Inquiry - ${input.subject}`,
            content: `From: ${input.name}\nEmail: ${input.email}\nPhone: ${input.phone || "Not provided"}\nProject Type: ${input.subject}\n\nMessage:\n${input.message}`,
          });
          return {
            success: true,
            message: "Thank you for your inquiry. We will get back to you soon.",
            notificationSent,
          };
        } catch (error) {
          console.error("[Contact] Submission failed:", error);
          throw new Error("Failed to submit contact form. Please try again.");
        }
      }),
  }),

  articles: router({
    getAll: publicProcedure.query(async () => {
      return await getPublishedArticles();
    }),
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return await getArticleBySlug(input.slug);
      }),
    create: protectedProcedure
      .input(
        z.object({
          title: z.string().min(1, "Title is required"),
          slug: z.string().min(1, "Slug is required"),
          excerpt: z.string().min(1, "Excerpt is required"),
          content: z.string().min(1, "Content is required"),
          featuredImageUrl: z.string().optional(),
          published: z.number().optional(),
          publishedAt: z.date().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can create articles");
        }
        return await createArticle({
          ...input,
          authorId: ctx.user.id,
          published: input.published || 0,
          publishedAt: input.publishedAt || null,
        });
      }),
    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          slug: z.string().optional(),
          excerpt: z.string().optional(),
          content: z.string().optional(),
          featuredImageUrl: z.string().optional(),
          published: z.number().optional(),
          publishedAt: z.date().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Only admins can update articles");
        }
        const { id, ...updates } = input;
        return await updateArticle(id, updates);
      }),
  }),

  // =========================================================================
  // Pricing & Shopping System
  // =========================================================================

  pricing: router({
    snapshot: publicProcedure.query(async () => {
      return await pricingService.getPricingSnapshot();
    }),

    catalog: publicProcedure
      .input(
        z.object({
          category: z.string().optional(),
          species: z.string().optional(),
          search: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        return await pricingService.getCatalog(input);
      }),

    product: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return await pricingService.getProduct(input.id);
      }),

    speciesList: publicProcedure.query(async () => {
      return await pricingService.listSpeciesRates();
    }),

    updateSpecies: adminProcedure
      .input(
        z.object({
          id: z.number(),
          newRate: z.string().min(1),
          pricingMethod: z.enum(["board_foot", "fixed", "inquire"]).optional(),
          status: z.enum(["active", "inactive"]).optional(),
          effectiveDate: z.string().optional(),
          notes: z.string().optional(),
          changeReason: z.string().optional(),
          changedBy: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await pricingService.updateSpeciesRate(input);
      }),

    addSpecies: adminProcedure
      .input(
        z.object({
          species: z.string().min(1),
          boardFootRate: z.string().min(1),
          pricingMethod: z.enum(["board_foot", "fixed", "inquire"]).optional(),
          status: z.enum(["active", "inactive"]).optional(),
          effectiveDate: z.string().optional(),
          notes: z.string().optional(),
          createdReason: z.string().optional(),
          changedBy: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await pricingService.addSpeciesRate(input);
      }),

    deleteSpecies: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await pricingService.deleteSpeciesRate(input.id);
        return { success: true } as const;
      }),

    history: publicProcedure
      .input(z.object({ species: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await pricingService.getSpeciesHistory(input?.species);
      }),

    overrides: adminProcedure.query(async () => {
      return await pricingService.listOverrides();
    }),

    upsertOverride: adminProcedure
      .input(
        z.object({
          productId: z.string().min(1),
          pricingMethod: z.enum(["board_foot", "fixed", "inquire"]),
          boardFootRateOverride: z.string().nullable().optional(),
          fixedPrice: z.string().nullable().optional(),
          overrideReason: z.string().nullable().optional(),
          active: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await pricingService.upsertOverride(input);
      }),

    deleteOverride: adminProcedure
      .input(z.object({ productId: z.string() }))
      .mutation(async ({ input }) => {
        await pricingService.deleteOverride(input.productId);
        return { success: true } as const;
      }),

    setDefaultRate: adminProcedure
      .input(z.object({ rate: z.string().min(1) }))
      .mutation(async ({ input }) => {
        await pricingService.setDefaultRate(input.rate);
        return { success: true } as const;
      }),

    invalidateCache: adminProcedure.mutation(async () => {
      const v = await pricingService.bumpPricingVersion();
      return { version: v } as const;
    }),

    revalidateCart: publicProcedure
      .input(
        z.object({
          items: z.array(
            z.object({
              productId: z.string(),
              quantity: z.number().optional(),
              selectedPrice: z.number().nullable().optional(),
              surfacing: z.boolean().optional(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        return await pricingService.revalidateCart(input.items.map(i => ({ productId: i.productId, quantity: i.quantity, selectedPrice: i.selectedPrice ?? null, surfacing: i.surfacing })));
      }),

    inquiry: publicProcedure
      .input(
        z.object({
          customerName: z.string().min(1),
          customerEmail: z.string().email(),
          customerPhone: z.string().optional(),
          notes: z.string().optional(),
          items: z.array(
            z.object({
              productId: z.string(),
              quantity: z.number(),
              selectedPrice: z.number().nullable().optional(),
              surfacing: z.boolean().optional(),
            })
          ),
          totalAmount: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return await pricingService.recordInquiry({ customerName: input.customerName, customerEmail: input.customerEmail, customerPhone: input.customerPhone, notes: input.notes, totalAmount: input.totalAmount, items: input.items.map(i => ({ productId: i.productId, quantity: i.quantity, selectedPrice: i.selectedPrice ?? null, surfacing: i.surfacing })) });
      }),
  }),
});

export type AppRouter = typeof appRouter;
