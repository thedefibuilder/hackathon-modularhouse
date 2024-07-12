import React from "react";

import Image from "next/image";

import { cn, separateCamelCase } from "@/lib/utils";

type TReviewSection = {
  title: string;
  keyValuePair: Record<string, unknown>;
};

export function ReviewSection({ title, keyValuePair }: TReviewSection) {
  return (
    <div className="flex flex-col gap-y-1.5">
      <h2 className="text-xl font-semibold">{title}</h2>

      <ul className="mb-4 ml-2 border-b pb-4">
        {Object.entries(keyValuePair).map((entry) => {
          const key = entry[0];
          const value = entry[1];
          const isImage =
            typeof value === "string"
              ? value?.includes("data:image/jpeg;base64")
              : false;

          return (
            <li
              key={key}
              className={cn({
                "mb-2 flex flex-col gap-y-1.5 border-b border-border": isImage,
              })}
            >
              <span className="font-semibold capitalize text-muted-foreground">
                {separateCamelCase(key ?? "")}:{" "}
              </span>
              {isImage ? (
                <Image
                  src={(value as string) ?? ""}
                  alt="Token Logo"
                  width={200}
                  height={113}
                  className="aspect-auto w-1/2 rounded-md"
                />
              ) : (
                <span>
                  {value && typeof value === "string"
                    ? value
                    : JSON.stringify(value)}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
