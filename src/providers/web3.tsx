"use client";

import React from "react";

import type { PropsWithChildren } from "react";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  getDefaultWallets,
  RainbowKitProvider as Web3RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { ledgerWallet, trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider as Web3WagmiProvider } from "wagmi";
import { cyberTestnet } from "wagmi/chains";

import { env } from "@/env";

const { wallets: defaultWallets } = getDefaultWallets();

const wagmiConfig = getDefaultConfig({
  appName: "DeFi Builder App",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  wallets: [
    ...defaultWallets,
    {
      groupName: "More",
      wallets: [trustWallet, ledgerWallet],
    },
  ],
  chains: [cyberTestnet],
  ssr: true,
});

type TWeb3Provider = PropsWithChildren;

export function WagmiProvider({ children }: TWeb3Provider) {
  return <Web3WagmiProvider config={wagmiConfig}>{children}</Web3WagmiProvider>;
}

export function RainbowKitProvider({ children }: TWeb3Provider) {
  return <Web3RainbowKitProvider>{children}</Web3RainbowKitProvider>;
}
