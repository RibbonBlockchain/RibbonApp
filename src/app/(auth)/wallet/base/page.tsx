"use client";

import { X, Copy, LogOut, ArrowUp, ArrowDown, ArrowLeft } from "lucide-react";
import {
  useBalance,
  useWriteContract,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { parseEther } from "viem";
import TokenItem from "./token-item";
import IframeComponent from "../iframe";
import Button from "@/components/button";
import { useBaseClaim } from "@/api/user";
import { useRouter } from "next/navigation";
import TransferModal from "./transfer-modal";
import { copyToClipboard } from "@/lib/utils";
import { shorten } from "@/lib/utils/shorten";
import { useEffect, useState, useMemo } from "react";
import InputBox from "@/components/questionnarie/input-box";
import { useUsdcCoinDetails } from "@/lib/values/usdcPriceApi";
import CustomTokenUI from "@/components/wallet/native-token-ui";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi";
import { convertPoints, convertPoints6Decimal } from "@/lib/utils/convertPoint";

const tabs = [
  { label: "Tokens", value: "tokens" },
  { label: "Activities", value: "activities" },
];

const BaseWallet = () => {
  const router = useRouter();
  const baseAbi = require("./base-abi.json");
  const USDCAbi = require("./usdc-abi.json");

  const { data: USDCPrice } = useUsdcCoinDetails();
  const currentPrice = USDCPrice?.market_data.current_price.usd as number;

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

  // USDC
  const { data: usdcData, refetch: refetchUsdcBalance } = useReadContract({
    abi: USDCAbi,
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    functionName: "balanceOf",
    // @ts-ignore
    args: [account?.address],
  });

  const usdcBalance = usdcData
    ? parseFloat(usdcData.toString()) / Math.pow(10, 6)
    : 0;

  const convertedUsdcBalance = usdcBalance * currentPrice;

  const { mutate } = useBaseClaim();
  const [amount, setAmount] = useState<number | null>(null);

  const handleBaseClaim = () => {
    mutate(
      {
        address: account.address as string,
        amount: amount as number,
      },
      {
        onSuccess: (data) => {
          writeContracts(
            {
              contracts: [
                {
                  address: "0x95Cff63E43A13c9DC97aC85D2f02327aD01dB560",
                  abi: baseAbi,
                  functionName: "permitSwapToPaymentCoin",
                  args: [
                    account?.address,
                    Number(convertPoints(amount as number)),
                    data?.data?.deadline,
                    data?.data?.v,
                    data?.data?.r,
                    data?.data?.s,
                  ],
                },
              ],
              capabilities,
            },
            {
              onSuccess: () => {
                setClaimUsdcModal(false);
                refetchUsdcBalance();
              },
            }
          );
        },
      }
    );
  };

  const handleUsdcTransfer = () => {
    if (!recipientAddress || !sendAmount || sendAmount <= 0) {
      alert("Please enter a valid recipient address and amount.");
      return;
    }

    setLoading(true);

    writeContracts(
      {
        contracts: [
          {
            address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
            abi: USDCAbi,
            functionName: "transfer",
            args: [recipientAddress, convertPoints6Decimal(sendAmount)],
          },
        ],
        capabilities,
      },
      {
        onSuccess: () => refetchUsdcBalance(),
      }
    );

    setLoading(false);
    setOpenUsdcTx(false);
  };

  // ETH
  const { data: dataeth, refetch: refetchEthBalance } = useBalance({
    address: account.address,
  });
  const ethBalance = dataeth
    ? parseFloat(dataeth?.value.toString()) / Math.pow(10, 18)
    : 0;

  const { sendTransaction } = useSendTransaction();

  // WLD Coin
  const { data: wldData, refetch: refetchWldBalance } = useReadContract({
    abi: USDCAbi,
    address: "0x84767Daf924dC4c9FE429f75C7D6ad1E8493eC76",
    functionName: "balanceOf",
    // @ts-ignore
    args: [account?.address],
  });

  const wldBalance = wldData
    ? parseFloat(wldData.toString()) / Math.pow(10, 18)
    : 0;

  const handleWldTransfer = () => {
    if (!recipientAddress || !sendAmount || sendAmount <= 0) {
      alert("Please enter a valid recipient address and amount.");
      return;
    }

    setLoading(true);

    writeContracts(
      {
        contracts: [
          {
            address: "0x84767Daf924dC4c9FE429f75C7D6ad1E8493eC76",
            abi: USDCAbi,
            functionName: "transfer",
            args: [recipientAddress, convertPoints(sendAmount)],
          },
        ],
        capabilities,
      },
      { onSuccess: () => refetchWldBalance() }
    );

    setLoading(false);
    setOpenWldTx(false);
  };

  // Link
  const {
    data: linkData,
    refetch: refetchLinkBalance,
    fetchStatus,
  } = useReadContract({
    abi: USDCAbi,
    address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    functionName: "balanceOf",
    // @ts-ignore
    args: [account?.address],
  });

  const linkBalance = linkData
    ? parseFloat(linkData.toString()) / Math.pow(10, 18)
    : 0;

  const handleLinkTransfer = () => {
    if (!recipientAddress || !sendAmount || sendAmount <= 0) {
      alert("Please enter a valid recipient address and amount.");
      return;
    }

    setLoading(true);

    writeContracts(
      {
        contracts: [
          {
            address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
            abi: USDCAbi,
            functionName: "transfer",
            args: [recipientAddress, convertPoints(sendAmount)],
          },
        ],
        capabilities,
      },
      {
        onSuccess: () => {
          refetchLinkBalance();
          console.log(fetchStatus, "here");
        },
      }
    );

    setLoading(false);
    setOpenLinkTx(false);
  };

  const [openUsdcTx, setOpenUsdcTx] = useState(false);
  const [openEthTx, setOpenEthTx] = useState(false);
  const [openWldTx, setOpenWldTx] = useState(false);
  const [openLinkTx, setOpenLinkTx] = useState(false);
  const [claimUsdcModal, setClaimUsdcModal] = useState(false);
  const [openIframeModal, setOpenIframeModal] = useState(false);

  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [selectedTxTab, setSelectedTxTab] = useState("tokens");

  useEffect(() => {
    if (receipt) {
      // refetchNftData();
      refetchUsdcBalance();
    }
  }, [receipt, refetchUsdcBalance]);

  useEffect(() => {
    if (account?.address) {
      localStorage.setItem("baseWallet", account?.address);
    }
  }, []);

  useEffect(() => {
    if (usdcData) {
      refetchUsdcBalance();
      localStorage.setItem("baseBalance", String(usdcBalance));
    }
  }, [usdcData, usdcBalance]);

  return (
    <div className="relative min-h-screen w-full text-black bg-white pb-24">
      {account.status === "disconnected" && (
        <div className="h-screen flex flex-col items-center justify-center mx-auto bg-gradient-to-b from-white to-purple-100 p-4 sm:p-6">
          <ArrowLeft
            stroke="#939393"
            onClick={() => router.push("/dashboard")}
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
      )}

      {account.status === "connected" && (
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

              <a
                href="https://www.base.org/names"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="max-w-fit mt-2 py-1 px-4 border border-[#7C56FE] text-xs text-[#7C56FE] font-medium rounded-full cursor-pointer">
                  Personalize wallet
                </div>
              </a>
            </div>

            <CustomTokenUI
              tokenBalance={usdcBalance.toFixed(2)}
              balanceUSD={convertedUsdcBalance.toFixed(2)}
              token="USDC"
            />

            <div>
              <button
                onClick={() => setClaimUsdcModal(true)}
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
                onClick={() => setOpenUsdcTx(true)}
                className="cursor-pointer w-full max-w-[165px] items-center justify-center flex flex-col gap-2"
              >
                <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 justify-center border border-[#D6CBFF] rounded-[12px] ">
                  <ArrowUp stroke="#7C56FE" />
                  Send
                </div>
              </div>
              {/* <div
                onClick={() => console.log("")}
                className="cursor-pointer w-full items-center justify-center flex flex-col gap-2"
              >
                <div className="w-full h-[70px] flex flex-col gap-1 items-center p-3 justify-center border border-[#D6CBFF] rounded-[12px] ">
                  <ArrowDownUp stroke="#7C56FE" />
                  Swap
                </div>
              </div> */}
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

            <div className="mt-2">
              {selectedTxTab === "tokens" && (
                <div className="flex flex-col gap-2">
                  <TokenItem
                    onClick={() => setOpenEthTx(true)}
                    symbol="ETH"
                    name="Ethereum"
                    balance={ethBalance}
                    assetLogo={"/images/ETH.png"}
                  />
                  <TokenItem
                    onClick={() => setOpenWldTx(true)}
                    symbol="WLD"
                    name="World coin"
                    balance={wldBalance}
                    assetLogo={"/images/world-coin.png"}
                  />
                  <TokenItem
                    onClick={() => setOpenLinkTx(true)}
                    symbol="LINK"
                    name="Link"
                    balance={linkBalance}
                    assetLogo={"/images/LINK.png"}
                  />
                </div>
              )}

              {selectedTxTab === "activities" && (
                <div>List of activities here</div>
              )}
            </div>

            <div className="flex mb-6 items-center justify-center">
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

      <TransferModal
        open={openUsdcTx}
        onClose={() => setOpenUsdcTx(false)}
        title="USDC"
        recipientAddress={recipientAddress}
        onChangeRecipientAddress={setRecipientAddress}
        value={sendAmount as number}
        onChangeValue={setSendAmount}
        onTransfer={handleUsdcTransfer}
        loading={loading}
        assetLogo={"/images/BASE.svg"}
      />

      <TransferModal
        open={openEthTx}
        onClose={() => setOpenEthTx(false)}
        title="ETH"
        recipientAddress={recipientAddress}
        onChangeRecipientAddress={setRecipientAddress}
        value={sendAmount !== null ? sendAmount : ""}
        onChangeValue={setSendAmount}
        onTransfer={() =>
          sendTransaction(
            {
              to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
              value: parseEther("0.0001"),
            },
            {
              onSuccess: () => refetchEthBalance(),
            }
          )
        }
        loading={loading}
        assetLogo={"/images/ETH.png"}
      />

      <TransferModal
        open={openWldTx}
        onClose={() => setOpenWldTx(false)}
        title="WLD"
        recipientAddress={recipientAddress}
        onChangeRecipientAddress={setRecipientAddress}
        value={sendAmount as number}
        onChangeValue={setSendAmount}
        onTransfer={handleWldTransfer}
        loading={loading}
        assetLogo={"/images/world-coin.png"}
      />

      <TransferModal
        open={openLinkTx}
        onClose={() => setOpenLinkTx(false)}
        title="Link"
        recipientAddress={recipientAddress}
        onChangeRecipientAddress={setRecipientAddress}
        value={sendAmount as number}
        onChangeValue={setSendAmount}
        onTransfer={handleLinkTransfer}
        loading={loading}
        assetLogo={"/images/LINK.png"}
      />

      {claimUsdcModal && (
        <div className="fixed inset-0 flex items-end justify-center z-50 bg-[#0808086B] bg-opacity-50">
          <div className="bg-white backdrop h-auto rounded-t-lg shadow-lg p-4 mx-1 max-w-[460px] w-full transition-transform transform translate-y-0">
            <div className="py-4 flex flex-col gap-4 bg-white bg-opacity-75 backdrop-blur-sm rounded-md w-full">
              <div className="mb-6 flex flex-row items-center justify-between">
                <div />
                <div className="flex flex-row gap-2 items-center text-lg font-bold">
                  <Image
                    alt="logo"
                    width={24}
                    height={24}
                    src={"/images/BASE.svg"}
                  />
                  Claim USDC
                </div>
                <X size={20} onClick={() => setClaimUsdcModal(false)} />
              </div>

              <div className="flex flex-col gap-4">
                <InputBox
                  placeholder="Enter amount"
                  value={amount as number}
                  onChange={(e) => setAmount(e.target.value)}
                  name={"amount"}
                  label={"Claim amount (10,000 points minimum)"}
                  required={false}
                />
              </div>
              <Button
                onClick={handleBaseClaim}
                className="my-6 w-full flex flex-row gap-2 items-center justify-center rounded-[8px] py-3 font-bold text-sm"
                disabled={(amount as number) < 10000}
              >
                {loading ? "Transferring..." : `Claim USDC`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseWallet;
