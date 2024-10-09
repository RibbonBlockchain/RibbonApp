"use client";

import {
  X,
  Copy,
  LogOut,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowDownUp,
} from "lucide-react";
import clsx from "clsx";
import Button from "@/components/button";
import { useBaseClaim } from "@/api/user";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import { useEffect, useState, useMemo } from "react";
import { useUsdcCoinDetails } from "@/lib/values/usdcPriceApi";
import CustomTokenUI from "@/components/wallet/native-token-ui";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi";
import { convertPoints, convertPoints6Decimal } from "@/lib/utils/convertPoint";
import Image from "next/image";

const tabs = [
  { label: "Tokens", value: "tokens" },
  { label: "Activities", value: "activities" },
];

const BaseWallet = () => {
  const router = useRouter();
  const baseAbi = require("./base-abi.json");
  const USDCAbi = require("./usdc-abi.json");

  const [iframeSrc, setIframeSrc] = useState<string>("http://base.org/names");

  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: writeData, writeContract } = useWriteContract();
  const { data: receipt } = useWaitForTransactionReceipt({ hash: writeData });

  const [id, setId] = useState<string | undefined>(undefined);
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => setId(id) },
  });

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });

  const { data, isError, isLoading, refetch } = useReadContract({
    abi: USDCAbi,
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    functionName: "balanceOf",
    // @ts-ignore
    args: [account?.address],
  });

  const USDCBalance = data ? parseFloat(data.toString()) / Math.pow(10, 6) : 0;

  const { data: USDCPrice } = useUsdcCoinDetails();
  const currentPrice = USDCPrice?.market_data.current_price.usd as number;

  const { mutate } = useBaseClaim();
  const [amount, setAmount] = useState(10000);

  const handleBaseClaim = () => {
    mutate(
      {
        address: account.address as string,
        amount: amount,
      },
      {
        onSuccess: (data) => {
          writeContracts({
            contracts: [
              {
                address: "0x95Cff63E43A13c9DC97aC85D2f02327aD01dB560",
                abi: baseAbi,
                functionName: "permitSwapToPaymentCoin",
                args: [
                  account?.address,
                  Number(convertPoints(amount)),
                  data?.data?.deadline,
                  data?.data?.v,
                  data?.data?.r,
                  data?.data?.s,
                ],
              },
            ],
            capabilities,
          });
          refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (account?.address) {
      localStorage.setItem("baseWallet", account?.address);
    }
  }, []);

  useEffect(() => {
    if (data) {
      refetch();
      localStorage.setItem("baseBalance", String(USDCBalance));
    }
  }, [data, USDCBalance]);

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

  const [openTx, setOpenTx] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const [selectedTxTab, setSelectedTxTab] = useState("tokens");

  useEffect(() => {
    if (receipt) {
      // refetchNftData();
      refetch();
    }
  }, [receipt, refetch]);

  const handleTransfer = () => {
    if (!recipientAddress || !sendAmount || sendAmount <= 0) {
      alert("Please enter a valid recipient address and amount.");
      return;
    }

    setLoading(true);

    writeContracts({
      contracts: [
        {
          address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
          abi: USDCAbi,
          functionName: "transfer",
          args: [recipientAddress, convertPoints6Decimal(sendAmount)],
        },
      ],
      capabilities,
    });

    setLoading(false);
    setOpenTx(false);
  };

  return (
    <div className="relative min-h-screen w-full text-black bg-white pb-24">
      {account.status === "disconnected" ? (
        <div className="h-screen flex flex-col items-center justify-center mx-auto bg-gradient-to-b from-white to-purple-100 p-4 sm:p-6">
          <ArrowLeft
            stroke="#939393"
            onClick={() => router.back()}
            className="absolute top-6 left-6 flex cursor-pointer"
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
      ) : (
        <div className="min-h-screen bg-[inherit] flex flex-col p-4 sm:p-6">
          <div className="mt-4 h-[40px] w-full">
            <ArrowLeft
              stroke="#939393"
              onClick={() => router.back()}
              className="flex cursor-pointer"
            />
            <div className="flex -mt-6 flex-row gap-2 items-center justify-center text-base font-semibold">
              <Image src="/images/BASE.svg" alt="" width={24} height={24} />
              Base Wallet
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 mb-10 overflow-hidden">
            <div className="flex flex-col items-center justify-center mt-4">
              <div className="flex flex-row gap-5 items-center justify-center ">
                <p className="text-[16px]">{shorten(account?.address)}</p>
                <Copy
                  size="18"
                  color="#000"
                  className="cursor-pointer"
                  onClick={() => copyToClipboard(account?.address)}
                />
              </div>

              <div
                // onClick={() => window.open('"http://base.org/names"', "_blank")}
                className="max-w-fit mt-2 py-1 px-4 border border-[#7C56FE] text-xs text-[#7C56FE] font-medium rounded-full cursor-pointer"
              >
                Personalize wallet
              </div>
            </div>

            <CustomTokenUI
              tokenBalance={USDCBalance.toFixed(2)}
              balanceUSD={USDCBalance * currentPrice}
              token="USDC"
            />

            <div>
              <button
                onClick={handleBaseClaim}
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
                  Receive
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
                        : "border-b-4 pb-3 text-[#939393] border-[#fff]"
                    )}
                  >
                    {label}
                  </span>
                </p>
              ))}
            </div>

            <div className="mt-4">
              {selectedTxTab === "tokens" && <div>List of Tokens</div>}
              {selectedTxTab === "activities" && (
                <div>List of activities here</div>
              )}
            </div>

            <div className="flex mb-10 items-center justify-center">
              <button
                onClick={() => {
                  disconnect();
                  localStorage.removeItem("baseWallet");
                  localStorage.removeItem("baseBalance");
                }}
                className="flex flex-row items-center justify-center gap-2 px-4 py-2 w-fit font-semibold text-red-500 rounded hover:bg-red-300 mr-2 mt-4"
              >
                Disconnect <LogOut />
              </button>
            </div>
          </div>
        </div>
      )}

      {openTx && (
        <div className="fixed inset-0 flex items-end justify-center z-50 bg-[#0808086B] bg-opacity-50">
          <div className="bg-white backdrop h-auto rounded-t-lg shadow-lg p-4 mx-1 max-w-[460px] w-full transition-transform transform translate-y-0">
            <div className="py-4 flex flex-col gap-4 bg-white bg-opacity-75 backdrop-blur-sm rounded-md w-full">
              <div className="flex flex-row items-center justify-between">
                <div />
                <h2 className="text-lg font-bold">Transfer USDC</h2>
                <X size={20} onClick={() => setOpenTx(false)} />
              </div>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Recipient Address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="border rounded p-2"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(Number(e.target.value))}
                  className="border rounded p-2"
                />
              </div>
              <Button
                onClick={handleTransfer}
                className="my-6 w-full flex flex-row gap-2 items-center justify-center rounded-[8px] py-3 font-bold text-sm"
                disabled={loading}
              >
                {loading ? "Transferring..." : "Transfer USDC"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseWallet;
