import { useCallback, useEffect, useState } from "react";

import type {
  Abi,
  Address,
  Hex,
  PublicClient,
  TransactionReceipt,
  WalletClient,
} from "viem";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

import { cyberTestnet } from "viem/chains";
import { useToast } from "@/components/ui/use-toast";

type TWriteContractResponse = {
  address: Address;
  hash: Hex;
  receipt: TransactionReceipt;
};

export default function useDeployContract() {
  const { toast } = useToast();
  const activeChainId = useChainId();
  const { address: walletAddress } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { switchChainAsync } = useSwitchChain();

  const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<TWriteContractResponse | null>(null);

  useEffect(() => {
    if (window.ethereum && walletAddress) {
      const publicClient = createPublicClient({
        chain: cyberTestnet,
        transport: http(),
      });

      const walletClient = createWalletClient({
        account: walletAddress,
        chain: cyberTestnet,
        transport: custom(window.ethereum),
      });

      setPublicClient(publicClient);
      setWalletClient(walletClient);
    }
  }, [walletAddress]);

  const deployContract = useCallback(
    async ({
      abi,
      bytecode,
      args,
    }: {
      abi: Abi;
      bytecode: Hex;
      args: unknown[];
    }) => {
      if (!walletAddress) {
        openConnectModal
          ? openConnectModal()
          : toast({
              title: "Connect wallet",
              description: "Please connect your wallet to deploy a contract",
            });
        return;
      }
      if (!publicClient || !walletClient || !activeChainId) {
        setIsLoading(false);
        setError("Could not detect wallet client.");
        setResponse(null);

        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        if (activeChainId !== cyberTestnet.id) {
          await switchChainAsync({
            chainId: cyberTestnet.id,
          });
        }

        const hash = await walletClient.deployContract({
          abi,
          bytecode,
          args,
          account: walletAddress,
          chain: cyberTestnet,
        });
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        if (!receipt.contractAddress)
          throw new Error("Contract address not found in receipt");

        setIsLoading(false);
        setError(null);
        setResponse({
          address: receipt.contractAddress,
          hash,
          receipt,
        });
      } catch (error: unknown) {
        setIsLoading(false);
        setError(error instanceof Error ? error.message : "An error occurred");
        setResponse(null);

        console.error("ERROR DEPLOYING CONTRACT", error);
      }
    },
    [publicClient, walletClient, activeChainId, walletAddress],
  );

  return {
    publicClient,
    isLoading,
    error,
    response,
    deployContract,
  };
}
