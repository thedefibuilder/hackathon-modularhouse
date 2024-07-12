"use client";

import React from "react";

import { Logo } from "./logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="fixed z-50 flex h-20 w-full items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] p-5 text-white">
      <nav className="flex h-full items-center gap-x-5">
        <Logo />
      </nav>

      <h1 className="flex-1 text-center text-5xl font-bold">
        My <span className="text-[hsl(280,100%,70%)]">Cyber</span> Fun
      </h1>

      <div className="flex h-full items-center gap-x-2.5 lg:gap-x-5">
        <div className="hidden items-center gap-4 md:flex lg:flex">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
