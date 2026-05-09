import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { createContactSubmission, getPublishedArticles, getArticleBySlug, createArticle, updateArticle } from "./db";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
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
          // Store submission in database
          await createContactSubmission({
            name: input.name,
            email: input.email,
            phone: input.phone || null,
            subject: input.subject,
            message: input.message,
          });

          // Send notification to owner
          const notificationSent = await notifyOwner({
            title: `New Contact Form Submission from ${input.name}`,
            content: `Email: ${input.email}\nPhone: ${input.phone || "Not provided"}\nSubject: ${input.subject}\n\nMessage:\n${input.message}`,
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
});

export type AppRouter = typeof appRouter;
