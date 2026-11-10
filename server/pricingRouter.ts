import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import * as service from "./pricing";

const method = z.enum(["board_foot", "fixed", "inquire"]);
const status = z.enum(["active", "inactive"]);
const id = z.string().trim().min(1).max(64);
const reason = z.string().trim().max(2000);
const numeric = z
  .union([
    z.number().finite(),
    z
      .string()
      .trim()
      .regex(/^(?:\d+(?:\.\d*)?|\.\d+)$/, "A numeric value is required")
      .transform(Number),
  ])
  .refine(Number.isFinite, "A finite number is required");
const nonNegative = numeric.refine(
  n => n >= 0 && n <= 100000,
  "Amount must be between 0 and 100000"
);
const rate = numeric.refine(
  n => n >= 0.01 && n <= 100000,
  "Rate must be between 0.01 and 100000"
);
const date = z.string().trim().max(32).optional().nullable();
const notes = z.string().trim().max(5000).optional().nullable();
export const cartItemSchema = z
  .object({
    productId: id,
    quantity: z.number().finite().int().min(1).max(100).default(1),
    selectedPrice: z.number().finite().min(0).max(100000000).nullable(),
    surfacing: z.boolean().default(false),
  })
  .strict();
export const inquiryInputSchema = z
  .object({
    customerName: z.string().trim().min(1).max(255),
    customerEmail: z.string().trim().email().max(320),
    customerPhone: z.string().trim().max(32).optional(),
    notes: z.string().trim().max(5000).optional(),
    items: z
      .array(cartItemSchema)
      .min(1)
      .max(100)
      .refine(
        items => new Set(items.map(i => i.productId)).size === items.length,
        "Product lines must be unique"
      ),
    // Legacy clients may send a total; it is deliberately never trusted/persisted.
    totalAmount: z.union([z.number().finite(), z.string().max(32)]).optional(),
    pricingVersion: z.string().trim().min(1).max(64).optional(),
    idempotencyKey: z
      .string()
      .trim()
      .min(16)
      .max(128)
      .regex(/^[a-zA-Z0-9_-]+$/)
      .optional(),
  })
  .strict();

export const pricingRouter = router({
  snapshot: publicProcedure.query(() => service.getPricingSnapshot()),
  catalog: publicProcedure
    .input(
      z
        .object({
          category: z.string().trim().max(64).optional(),
          species: z.string().trim().max(128).optional(),
          search: z.string().trim().max(200).optional(),
        })
        .strict()
        .optional()
    )
    .query(({ input }) => service.getCatalog(input)),
  product: publicProcedure
    .input(z.object({ id }).strict())
    .query(({ input }) => service.getProduct(input.id)),
  revalidateCart: publicProcedure
    .input(z.object({ items: z.array(cartItemSchema).max(100) }).strict())
    .mutation(({ input }) => service.revalidateCart(input.items)),
  inquiry: publicProcedure
    .input(inquiryInputSchema)
    .mutation(({ input }) => service.recordInquiry(input)),

  // All admin data and mutations use the existing Manus OAuth role, never a PIN.
  speciesList: adminProcedure.query(() => service.listSpeciesRates()),
  updateSpecies: adminProcedure
    .input(
      z
        .object({
          id: z.number().int().positive(),
          newRate: rate,
          pricingMethod: method.optional(),
          status: status.optional(),
          effectiveDate: date,
          notes,
          changeReason: reason.optional(),
        })
        .strict()
    )
    .mutation(({ input, ctx }) =>
      service.updateSpeciesRate(input, ctx.user.name?.trim() || ctx.user.openId)
    ),
  addSpecies: adminProcedure
    .input(
      z
        .object({
          species: z.string().trim().min(1).max(128),
          boardFootRate: rate,
          pricingMethod: method.optional(),
          status: status.optional(),
          effectiveDate: date,
          notes,
          createdReason: reason.optional(),
          changeReason: reason.optional(),
        })
        .strict()
    )
    .mutation(({ input, ctx }) =>
      service.addSpeciesRate(input, ctx.user.name?.trim() || ctx.user.openId)
    ),
  deleteSpecies: adminProcedure
    .input(
      z
        .object({
          id: z.number().int().positive(),
          changeReason: reason.optional(),
        })
        .strict()
    )
    .mutation(async ({ input, ctx }) => {
      await service.deleteSpeciesRate(
        input.id,
        ctx.user.name?.trim() || ctx.user.openId,
        input.changeReason
      );
      return { success: true };
    }),
  history: adminProcedure
    .input(
      z
        .object({ species: z.string().trim().max(128).optional() })
        .strict()
        .optional()
    )
    .query(({ input }) => service.getSpeciesHistory(input?.species)),
  overrides: adminProcedure.query(() => service.listOverrides()),
  upsertOverride: adminProcedure
    .input(
      z
        .object({
          productId: id,
          pricingMethod: method,
          boardFootRateOverride: rate.nullable().optional(),
          fixedPrice: nonNegative.nullable().optional(),
          overrideReason: reason.nullable().optional(),
          active: z.union([z.literal(0), z.literal(1)]).optional(),
        })
        .strict()
        .superRefine((value, ctx) => {
          if (
            value.pricingMethod === "board_foot" &&
            value.boardFootRateOverride == null
          )
            ctx.addIssue({
              code: "custom",
              message: "A board-foot rate is required",
              path: ["boardFootRateOverride"],
            });
          if (value.pricingMethod === "fixed" && value.fixedPrice == null)
            ctx.addIssue({
              code: "custom",
              message: "A fixed price is required",
              path: ["fixedPrice"],
            });
        })
    )
    .mutation(({ input, ctx }) =>
      service.upsertOverride(input, ctx.user.name?.trim() || ctx.user.openId)
    ),
  deleteOverride: adminProcedure
    .input(
      z.object({ productId: id, changeReason: reason.optional() }).strict()
    )
    .mutation(async ({ input, ctx }) => {
      await service.deleteOverride(
        input.productId,
        ctx.user.name?.trim() || ctx.user.openId,
        input.changeReason
      );
      return { success: true };
    }),
  setDefaultRate: adminProcedure
    .input(z.object({ rate, changeReason: reason.optional() }).strict())
    .mutation(async ({ input, ctx }) => {
      await service.setDefaultRate(
        input.rate,
        ctx.user.name?.trim() || ctx.user.openId,
        input.changeReason
      );
      return { success: true };
    }),
  invalidateCache: adminProcedure.mutation(({ ctx }) =>
    service.invalidateCacheWithVersion(ctx.user.name?.trim() || ctx.user.openId)
  ),
});
