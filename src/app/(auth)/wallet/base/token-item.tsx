import React from "react";
import Image from "next/image";

interface TokenProps {
  onClick: () => void;
  assetLogo: string;
  symbol: string;
  name: string;
  balance: number;
}

const TokenItem: React.FC<TokenProps> = ({
  onClick,
  assetLogo,
  symbol,
  name,
  balance,
}) => (
  <div
    onClick={onClick}
    className="flex flex-row items-center justify-between p-3 border border-[#D6CBFF] rounded-[12px] cursor-pointer"
  >
    <div className="flex flex-row items-center justify-center gap-2">
      <div className="w-[35px] h-[35px] flex items-center">
        <Image
          width={35}
          height={35}
          src={assetLogo}
          alt="coin logo"
          className="rounded-full"
        />
      </div>
      <div>
        <p className="text-base font-normal">{symbol}</p>
        <p className="text-xs text-[#626262]">{name}</p>
      </div>
    </div>
    <p className="text-sm">
      {balance.toFixed(5)} {symbol}
    </p>
  </div>
);

export default TokenItem;
