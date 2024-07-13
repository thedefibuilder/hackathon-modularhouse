import { z } from "zod";
import { featureNames } from "./features";
import { isAddress, parseUnits } from "viem";

export const createSchema = z.object({
  features: z.set(z.enum(featureNames)),
  customizeArgs: z.object({
    logo: z.string().optional(),
    description: z.string().optional(),
    twitterUrl: z.string().url().optional(),
    telegramUrl: z.string().url().optional(),
    discordUrl: z.string().url().optional(),
    websiteUrl: z.string().url().optional(),
  }),
  deployArgs: z.object({
    baseParams: z.object({
      name: z.string(),
      symbol: z.string(),
    }),
    ownableArgs: z
      .object({
        initialOwner: z
          .string({ required_error: "Initial owner is required" })
          .refine((value) => isAddress(value), { message: "Invalid address" }),
      })
      .optional(),
    cappedArgs: z
      .object({
        cap: z
          .string({ required_error: "Cap is required" })
          .trim()
          .refine((value) => !Number.isNaN(Number(value)), {
            message: "Invalid number",
          })
          .refine((value) => value !== "" && Number(value) > 0, {
            message: "Cap must be positive",
          })
          .transform((value) => value.replace(/,/g, ""))
          .transform((value) => parseUnits(value, 18)),
      })
      .optional(),
    premintArgs: z
      .object({
        premintAmount: z
          .string({ required_error: "Premint amount is required" })
          .refine((value) => !Number.isNaN(Number(value)), {
            message: "Invalid number",
          })
          .refine((value) => value !== "" && Number(value) > 0, {
            message: "Premint amount must be positive",
          })
          .transform((value) => value.replace(/,/g, ""))
          .transform((value) => parseUnits(value, 18)),
      })
      .optional(),
  }),
});

export type TCreateSchema = z.infer<typeof createSchema>;
