"use client";

import DiscordIcon from "@/assets/discord";
import TelegramIcon from "@/assets/telegram";
import CommentsSection from "@/components/comments-section";
import { api } from "@/providers/trpc";
import { LinkIcon, PanelsTopLeftIcon, XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import PlaceHolderImage from "@/assets/placeholder.jpg";
import ExternalAnchor from "@/components/common/external-anchor";
import { cyberTestnet } from "viem/chains";

export default function TokenDetailPage({
  params,
}: {
  params: { address: string };
}) {
  const { data: token } = api.token.get.useQuery({ address: params.address });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="flex flex-col items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                {token?.name} {`(${token?.symbol})`}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {token?.address && (
                <ExternalAnchor
                  href={`${cyberTestnet.blockExplorers.default.url}/address/${token.address}`}
                  className="text-primary hover:underline"
                >
                  <LinkIcon className="h-6 w-6" />
                </ExternalAnchor>
              )}

              {token?.twitterUrl && (
                <ExternalAnchor
                  href={token.twitterUrl}
                  className="text-primary hover:underline"
                >
                  <XIcon className="h-6 w-6" />
                </ExternalAnchor>
              )}

              {token?.discordUrl && (
                <ExternalAnchor
                  href={token.discordUrl}
                  className="text-primary hover:underline"
                >
                  <DiscordIcon />
                </ExternalAnchor>
              )}

              {token?.telegramUrl && (
                <ExternalAnchor
                  href={token.telegramUrl}
                  className="text-primary hover:underline"
                >
                  <TelegramIcon />
                </ExternalAnchor>
              )}

              {token?.websiteUrl && (
                <ExternalAnchor
                  href={token.websiteUrl}
                  className="text-primary hover:underline"
                >
                  <PanelsTopLeftIcon className="h-6 w-6" />
                </ExternalAnchor>
              )}
            </div>
          </div>
          <div className="mt-12" />
          <h2 className="mb-4 text-2xl font-bold">About {token?.name}</h2>
          <p className="text-muted-foreground">
            {token?.description
              ? token.description
              : "No description available."}
          </p>
        </div>
        <div>
          {token?.name && (
            <Image
              src={token.logoBase64 ? token.logoBase64 : PlaceHolderImage}
              alt={token.name}
              width={400}
              height={400}
              className="h-[400px] w-[400px] rounded-lg object-cover"
            />
          )}
        </div>
      </div>

      <CommentsSection />
    </div>
  );
}
