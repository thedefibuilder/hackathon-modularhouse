import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { featureNames } from "@/lib/features";
import { isAddress } from "viem";

export const tokenRouter = createTRPCRouter({
  getLatest: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.token.findMany({
        orderBy: { createdAt: "desc" },
        take: input.limit,
      });
    }),
  get: publicProcedure
    .input(z.object({ address: z.string().refine((v) => isAddress(v)) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.token.findFirst({
        where: {
          address: input.address,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        tokenAddress: z.string().refine((v) => isAddress(v)),
        userWalletAddress: z.string().refine((v) => isAddress(v)),
        features: z.set(z.enum(featureNames)),
        customizeArgs: z.object({
          name: z.string(),
          // logo: z.string().url().optional(), TODO: Add logo support
          description: z.string().optional(),
          twitterUrl: z.string().url().optional(),
          telegramUrl: z.string().url().optional(),
          discordUrl: z.string().url().optional(),
          websiteUrl: z.string().url().optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.token.create({
        data: {
          address: input.tokenAddress,
          name: input.customizeArgs.name,
          featureNames: [...input.features],
          description: input.customizeArgs.description,
          discordUrl: input.customizeArgs.discordUrl,
          twitterUrl: input.customizeArgs.twitterUrl,
          websiteUrl: input.customizeArgs.websiteUrl,
          telegramUrl: input.customizeArgs.telegramUrl,
          creator: {
            connectOrCreate: {
              create: {
                walletAddress: input.userWalletAddress,
              },
              where: {
                walletAddress: input.userWalletAddress,
              },
            },
          },
        },
      });
    }),
});
