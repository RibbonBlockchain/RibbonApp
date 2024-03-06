import React from "react";
import Image from "next/image";
import { Clock4, Coins } from "lucide-react";
import ProgressBar from "@ramonak/react-progress-bar";
import CoinSVG from "../../public/images/coin";

type Props = {
  score: number;
  reward: number;
  taskTitle: string;
  priority?: number;
  approximateTime: number;
  completed?: boolean;

  ratings?: number;
  ratingsLevel?: string;
};

const Completed = (props: Props) => {
  return (
    <div
      className={`bg-[#E8E8E8] text-[#626262] w-full p-2.5 flex flex-row self-center items-center justify-between rounded-lg mb-3`}
    >
      <div className="flex flex-row items-start justify-start gap-1">
        <div className="flex flex-col text-xs gap-[3px]">
          <p className="font-extrabold">{props.taskTitle}</p>
          <div className="flex flex-row items-center">
            <p className="mr-1.5">Score +{props.score} pts</p>
            <ProgressBar
              height="7px"
              width="60px"
              completed={100}
              labelSize="10px"
              bgColor="#939393"
              maxCompleted={100}
              baseBgColor="#939393"
              isLabelVisible={false}
              className="rounded-md"
            />
          </div>
          {props.ratingsLevel && (
            <div>
              <Image
                width={75}
                height={17}
                alt="ratings"
                src={props.ratingsLevel}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-[3px] text-[10px]">
          <Clock4 size={10} />~
          <p className="font-extrabold">
            {props.approximateTime} <span className="font-normal">mins</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[3px]">
        <p className="text-[#626262] text-xs font-medium self-end">Reward</p>
        <div
          className={`flex flex-row gap-1 items-center self-end text-sm font-black`}
        >
          <CoinSVG width={12} height={13} fill={`#626262`} />
          {props.reward} WLD
        </div>
        {props.ratings && (
          <p className="text-[10px] font-medium text-[#626262]">
            ({props.ratings}) Ratings
          </p>
        )}
      </div>
    </div>
  );
};

export default Completed;
