import React from "react";

import type { PropsWithChildren } from "react";

import { TRPCProvider } from "./trpc";
import { RainbowKitProvider, WagmiProvider } from "./web3";

type TRootProvider = PropsWithChildren;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <TRPCProvider>
      <WagmiProvider>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </WagmiProvider>
    </TRPCProvider>
  );
}
