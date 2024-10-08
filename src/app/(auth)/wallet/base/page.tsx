"use client";

import {
  Copy,
  LogOut,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowDownUp,
} from "lucide-react";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import React, { useState, useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import CustomTokenUI from "@/components/wallet/native-token-ui";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";

const tabs = [
  { label: "Deposits", value: "deposits" },
  { label: "Withdrawals", value: "withdrawals" },
  { label: "Swap", value: "swap" },
];

const BaseWallet = () => {
  const router = useRouter();
  const baseAbi = require("./base-abi.json");

  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: writeData, writeContract } = useWriteContract();
  const { data: receipt } = useWaitForTransactionReceipt({
    hash: writeData,
  });

  useEffect(() => {
    if (receipt) {
      // refetchNftData();
    }
  }, [receipt]);

  const [id, setId] = useState<string | undefined>(undefined);
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => setId(id) },
  });

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });

  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: "https://api.developer.coinbase.com/rpc/v1/base-sepolia/NjBxwkYP6cs5Y0Tomg9xnR5JnBoZHiEo",
        },
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  //
  const [openTx, setOpenTx] = useState(false);
  const [destinationWallet, setDestinationWallet] = useState("");
  const [amount, setAmount] = useState("");

  const [selectedTxTab, setSelectedTxTab] = useState("deposits");

  return (
    <div className="relative min-h-screen w-full text-black bg-white pb-24">
      {account.status === "disconnected" && (
        <div className="h-screen flex flex-col items-center justify-center mx-auto bg-gradient-to-b from-white to-purple-100 p-4 sm:p-6">
          <ArrowLeft
            stroke="#939393"
            onClick={() => router.back()}
            className="absolute top-6 left-6 flex cursor-pointer "
          />

          <div className="flex flex-col gap-2 items-center justify-center text-center">
            <div className="text-[28px] xxs:text-[32px] font-bold max-w-[90%] leading-10">
              Next-gen <span className="text-[#7C56FE]">smart wallets</span>{" "}
              have arrived
            </div>
            <p className="text-sm font-medium text-[#1B1B1B]">
              Monitor and manage crypto portfolio with Ribbon Protocol
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-1 w-full items-center justify-center">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
                className="bg-[#7C56FE] text-white py-2.5 rounded-[12px] text-center w-full xxs:w-[80%]"
              >
                Connect with {connector.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {account.status === "connected" && (
        <div className="min-h-screen bg-[inherit] flex flex-col p-4 sm:p-6">
          <div className="mt-4 h-[40px] w-full">
            <ArrowLeft
              stroke="#939393"
              onClick={() => router.back()}
              className="flex cursor-pointer"
            />
            <div className="flex -mt-6 flex-row items-center justify-center text-base font-semibold">
              Wallet
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-10 overflow-hidden">
            <div className="mt-4">
              <div className="flex flex-row gap-5 items-center justify-center ">
                <p className="text-[16px]">{shorten(account?.address)}</p>
                <Copy
                  size="18"
                  color="#000"
                  className="cursor-pointer"
                  onClick={() => {
                    copyToClipboard(account?.address);
                  }}
                />
              </div>
            </div>

            <CustomTokenUI tokenBalance={0.0} balanceUSD={0.0} token="usdt" />

            <div>
              <button
                onClick={() => {
                  writeContracts({
                    contracts: [
                      {
                        address: "0x95Cff63E43A13c9DC97aC85D2f02327aD01dB560",
                        abi: baseAbi,
                        functionName: "permitSwapToPaymentCoin",
                        // args: [spender,value,deadline,v,r,s],
                        args: [
                          account?.address,
                          10000000000000000000000,
                          1728318268,
                          27,
                          "0x602f932ac1889e95bad8d8c6c3f3c032ad9ad4c00bf2f889016544536966d99d",
                          "0x12ca89c4cdf3fd4ec342f58cd56a436a77cdc5843c2fcae903553a893840175c",
                        ],
                      },
                    ],
                    capabilities,
                  });
                }}
                className={clsx(
                  "mt-5 w-full text-center py-3 font-semibold border border-[#D6CBFF] rounded-[16px]"
                )}
              >
                Claim USDC
              </button>
            </div>

            <div className="w-full pt-5 pb-10 flex gap-4 items-center justify-center text-xs font-bold">
              <div
                onClick={() => router.push("/wallet/base/receive")}
                className="cursor-pointer w-full max-w-[165px] items-center justify-center flex flex-col gap-2"
              >
                <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 justify-center border border-[#D6CBFF] rounded-[12px] ">
                  <ArrowDown stroke="#7C56FE" />
                  Recieve
                </div>
              </div>

              <div
                onClick={() => setOpenTx(true)}
                className="cursor-pointer w-full max-w-[165px] items-center justify-center flex flex-col gap-2"
              >
                <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 justify-center border border-[#D6CBFF] rounded-[12px] ">
                  <ArrowUp stroke="#7C56FE" />
                  Send
                </div>
              </div>

              <div
                onClick={() => console.log("")}
                className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
              >
                <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 justify-center border border-[#D6CBFF] rounded-[12px] ">
                  <ArrowDownUp stroke="#7C56FE" />
                  Swap
                </div>
              </div>
            </div>
            <div className="w-full px-2 flex flex-row items-center justify-between gap-2 text-center text-sm font-bold rounded-[10px]">
              {tabs.map(({ label, value }) => (
                <p
                  key={value}
                  onClick={() => setSelectedTxTab(value)}
                  className="w-full py-2 px-2 text-center cursor-pointer"
                >
                  <span
                    className={clsx(
                      "inline-block",
                      selectedTxTab === value
                        ? "text-[#6200EE] border-b-4 pb-3 border-[#6200EE]"
                        : "border-b-4 pb-3 text-[#939393] border-[#fff] border-"
                    )}
                  >
                    {label}
                  </span>
                </p>
              ))}
            </div>

            <div className="mt-4">
              {selectedTxTab === "deposits" && <div>List of deposits here</div>}
              {selectedTxTab === "withdrawals" && (
                <div>List of withdrawals here</div>
              )}
              {selectedTxTab === "swap" && <div>List of swaps here</div>}
            </div>
            <div className="flex my-20 items-center justify-center">
              <button
                onClick={() => disconnect()}
                className="flex flex-row items-center justify-center gap-2 px-4 py-2 w-fit font-semibold text-red-500 rounded hover:bg-red-300 mr-2 mt-4"
              >
                Disconnect <LogOut />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {openTx && (
        <WithdrawUSDCToken
          isOpen={openTx}
          closeModal={() => setOpenTx(false)}
          handleClick={sendUsdcToken}
          destination={destinationWallet}
          handleDestinationInput={(e:any) => setDestinationWallet(e.target.value)}
          amount={amount}
          handleAmountInput={(e: any) => setAmount(e.target.value)}
          isPending={isPending}
          usdcTokenBalance={loanWalletDetails?.balance}
          USDvalue={Number(amount) * currentPrice}
        />
      )} */}
    </div>
  );
};

export default BaseWallet;
