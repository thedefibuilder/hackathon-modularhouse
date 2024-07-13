import { z } from "zod";

import { ContractService, LlmService } from "@defibuilder/sdk";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { featureNames, featuresToOptionsERC20 } from "@/lib/features";
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

  getArtifacts: publicProcedure
    .input(z.set(z.enum(featureNames)))
    .mutation(async ({ input }) => {
      const erc20Options = featuresToOptionsERC20([...input]);
      const sourceCode = await ContractService.buildERC20(erc20Options);
      const artifacts = await LlmService.buildCode(sourceCode);

      if (!artifacts.success) throw new Error(artifacts.message);

      return {
        abi: artifacts.artifact.abi,
        bytecode: artifacts.artifact.bytecode,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        symbol: z.string(),
        tokenAddress: z.string().refine((v) => isAddress(v)),
        userWalletAddress: z.string().refine((v) => isAddress(v)),
        features: z.set(z.enum(featureNames)),
        customizeArgs: z.object({
          logo: z.string().optional(),
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
          name: input.name,
          symbol: input.symbol,
          featureNames: [...input.features],
          logoBase64: input.customizeArgs.logo,
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
