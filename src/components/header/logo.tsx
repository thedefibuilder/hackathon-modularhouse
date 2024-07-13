import React from "react";

import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/cyber-logo.png";

export function Logo() {
  return (
    <Link href={"/"}>
      <Image
        src={logo}
        alt="DeFi Builder's logo"
        width={120}
        height={30}
        className="block dark:hidden"
      />
    </Link>
  );
}
