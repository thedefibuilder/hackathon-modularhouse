"use client";

import React from "react";

import { Separator } from "@/components/ui/separator";

import { Logo } from "./logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="fixed z-50 flex h-20 w-full justify-between bg-gradient-to-b from-[#2e026d] to-[#15162c] p-5 text-white">
      <nav className="flex h-full w-1/2 items-center gap-x-5">
        <Logo />
        <Separator
          orientation="vertical"
          className="hidden h-[65%] w-0.5 rounded-md lg:block"
        />
      </nav>

      <div className="flex h-full items-center gap-x-2.5 lg:gap-x-5">
        <div className="hidden items-center gap-4 md:flex lg:flex">
          <Button>
            <ConnectButton />
          </Button>
        </div>
      </div>
    </header>
  );
}
