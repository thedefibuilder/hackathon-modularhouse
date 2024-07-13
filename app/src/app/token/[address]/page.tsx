"use client";

import DiscordIcon from "@/assets/discord";
import TelegramIcon from "@/assets/telegram";
import CommentsSection from "@/components/comments-section";
import { api } from "@/providers/trpc";
import { PanelsTopLeftIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PlaceHolderImage from "@/assets/placeholder.jpg";

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
              <h1 className="text-3xl font-bold">{token?.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              {token?.twitterUrl && (
                <Link
                  href={token.twitterUrl}
                  className="text-primary hover:underline"
                  prefetch={false}
                >
                  <XIcon className="h-6 w-6" />
                </Link>
              )}

              {token?.discordUrl && (
                <Link
                  href={token.discordUrl}
                  className="text-primary hover:underline"
                  prefetch={false}
                >
                  <DiscordIcon />
                </Link>
              )}

              {token?.telegramUrl && (
                <Link
                  href={token.telegramUrl}
                  className="text-primary hover:underline"
                  prefetch={false}
                >
                  <TelegramIcon />
                </Link>
              )}

              {token?.websiteUrl && (
                <Link
                  href={token.websiteUrl}
                  className="text-primary hover:underline"
                  prefetch={false}
                >
                  <PanelsTopLeftIcon className="h-6 w-6" />
                </Link>
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
              className="h-auto w-full rounded-lg object-cover"
            />
          )}
        </div>
      </div>

      <CommentsSection />
    </div>
  );
}
