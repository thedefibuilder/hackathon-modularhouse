"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/providers/trpc";
import Link from "next/link";

export default function Home() {
  const tokens = api.token.getLatest.useQuery({});

  return (
    <div className="flex flex-col items-center">
      <div className="h-10" />
      <div className="grid min-h-screen grid-cols-3 space-x-3">
        {tokens.data?.map((token) => (
          <Link key={token.address} href={`/token/${token.address}`}>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>{token.name}</CardTitle>
                <CardDescription className="truncate">
                  {token.address}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {
                  // image
                }
              </CardContent>

              <CardFooter>
                Created At: {token.createdAt.toDateString()}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
