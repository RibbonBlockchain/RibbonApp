import React from "react";
import { X } from "lucide-react";
import Button from "@/components/button";
import InputBox from "@/components/questionnarie/input-box";
import Image from "next/image";

interface TransferModalProps {
  open: boolean;
  onClose: () => void;
  assetLogo: string;
  title: string;
  recipientAddress: string;
  onChangeRecipientAddress: (address: string) => void;
  value: number;
  onChangeValue: (value: number) => void;
  onTransfer: () => void;
  loading: boolean;
}

const TransferModal: React.FC<TransferModalProps> = ({
  open,
  onClose,
  assetLogo,
  title,
  recipientAddress,
  onChangeRecipientAddress,
  value,
  onChangeValue,
  onTransfer,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center z-50 bg-[#0808086B] bg-opacity-50">
      <div className="bg-white backdrop min-h-[50%] rounded-t-lg shadow-lg p-4 mx-1 max-w-[460px] w-full transition-transform transform translate-y-0">
        <div className="py-4 flex flex-col gap-4 bg-white bg-opacity-75 backdrop-blur-sm rounded-md w-full">
          <div className="mb-6 flex flex-row items-center justify-between">
            <div />
            <div className="flex flex-row gap-2 items-center text-lg font-bold">
              <Image src={assetLogo} alt="logo" width={24} height={24} />
              Send {title}
            </div>
            <X size={20} onClick={onClose} />
          </div>

          <div className="flex flex-col gap-4">
            <InputBox
              required={false}
              value={recipientAddress}
              name={"recipient address"}
              label={"Recipient Address"}
              placeholder="Enter recipient address"
              onChange={(e) => onChangeRecipientAddress(e.target.value)}
            />
            <InputBox
              type="number"
              value={value}
              name={"amount"}
              required={false}
              label={"Transfer Amount"}
              placeholder="Enter amount"
              onChange={(e) => onChangeValue(e.target.value)}
            />
          </div>
          <Button
            onClick={onTransfer}
            className="my-6 w-full flex flex-row gap-2 items-center justify-center rounded-[8px] py-3 font-bold text-sm"
            disabled={!recipientAddress || !value}
          >
            {loading ? "Transferring..." : `Send ${title}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;
