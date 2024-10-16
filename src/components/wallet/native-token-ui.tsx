import { LucideCopy } from "lucide-react";
import React from "react";

type Props = {
  tokenBalance: any;
  balanceUSD: any;
  token: string;
};

const CustomTokenUI = (props: Props) => {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center font-semibold ">
        <p className="text-[42px] w-fit">
          {props.tokenBalance} {props.token}
        </p>
        <p className="text-[18px] text-[#626262]"> $ {props.balanceUSD} </p>
      </div>
    </div>
  );
};

export default CustomTokenUI;
