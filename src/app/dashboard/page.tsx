"use client";

import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import Link from "next/link";
import Image from "next/image";
import Todo from "@/containers/dashboard/todo";
import React, { Fragment, useState } from "react";
import CoinSVG from "../../../public/images/coin";
import Survey from "@/containers/dashboard/survey";
import { Bell, EyeOff, Sun, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { todo, priorityTask } from "@/lib/values/mockData";
import CountdownTimer from "@/containers/dashboard/countdown-timer";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const closeModal = () => setIsOpen(false);

  const [hideBalance, setHideBalance] = useState(false);
  const toggleHideBalance = () => setHideBalance(!hideBalance);

  let points = 155;
  let targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;
  let completedTime = targetTime - new Date().getTime();

  let WorldID = "TuJJxlmNlksTYsd4YhdOsy628-&sdfknWTks";
  let walletID = "gNmopkklit-83-sujknbjh-TYsd4YhdOsy628";
  let user = false;

  return (
    <>
      <div className="w-full h-auto text-white bg-[#F5F5F5]">
        <Image
          priority
          width={300}
          height={300}
          alt="bg-image"
          src="/images/background.svg"
          className="absolute z-0 w-full max-w-[500px]"
        />
        <div className="relative p-4 sm:p-6 mx-auto flex flex-col items-center justify-center content-center">
          <div className="w-full flex flex-row mt-2 py-1 items-start justify-between">
            <Bell fill="white" />
            <div className="flex flex-col items-center gap-1 text-center mb-10">
              <div className="flex flex-row gap-2 items-center text-sm font-medium  ">
                Total Balance
                {hideBalance ? (
                  <EyeOff onClick={toggleHideBalance} size={16} />
                ) : (
                  <EyeOff onClick={toggleHideBalance} fill="white" size={16} />
                )}
              </div>
              <div className="flex flex-row gap-2 items-center justify-center text-3xl font-bold">
                <CoinSVG />
                {hideBalance ? "25 WLD" : "*****"}
              </div>
            </div>
            <Sun fill="white" />
          </div>

          {user ? (
            <div className="w-full flex flex-row items-center justify-around">
              <div className="w-full flex flex-col max-w-[120px]">
                <div className="flex flex-row gap-1 text-[12px] font-bold items-center justify-start ">
                  <Image
                    width={20}
                    height={20}
                    alt="world-coin"
                    src="/images/world-coin-active.svg"
                  />
                  World ID
                </div>
                <h1 className="truncate ...">{WorldID}</h1>
              </div>

              <div className="w-full flex flex-col max-w-[120px] ">
                <div className="flex flex-row gap-1 text-[12px] font-bold items-center justify-start ">
                  <Image
                    width={17}
                    height={17}
                    alt="world-coin"
                    src="/images/ethereum-active.svg"
                  />
                  Wallet
                </div>
                <h1 className="truncate .... ">{walletID}</h1>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-row gap-3">
              <Link
                href={`#`}
                className="text-[#A81DA6] bg-white border-white w-full py-2.5 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-2 rounded-xl border-2"
              >
                <Image
                  width={24}
                  height={24}
                  alt="world-coin"
                  src="/images/world-coin-purple.svg"
                />
                Link WorldID
              </Link>

              <Link
                href="#"
                className="w-full text-white bg-[#4285F4] border-[#4285F4] py-2.5 flex flex-row self-center items-center justify-center text-center text-base font-semibold gap-3 rounded-xl border-2"
              >
                Connect Wallet
              </Link>
            </div>
          )}

          <div className="w-full flex flex-row gap-3 mt-6">
            <div className="bg-white border-white w-full py-5 flex flex-col self-center items-center justify-center text-center text-base font-semibold rounded-xl border-2">
              <div className="w-[91px] sm:w-[91px] flex flex-col justify-center mb-3">
                <CircularProgressbarWithChildren
                  styles={buildStyles({
                    pathColor: `#A81DA6`,
                    trailColor: `#E8E8E8`,
                  })}
                  value={(points / 500) * 100}
                  strokeWidth={8}
                >
                  <p className="text-black flex flex-col text-lg font-extrabold leading-4">
                    {points}
                    <span className="font-normal text-[10px]">
                      of 500 points
                    </span>
                  </p>
                </CircularProgressbarWithChildren>
              </div>

              <p className="text-center text-sm font-semibold text-[#939393] flex flex-col gap-1">
                500 points to <span>next withdrawal</span>
              </p>
            </div>

            <div className="bg-white border-white w-full h-auto py-5 flex flex-col self-center items-center justify-between text-center font-semibold rounded-xl border-2">
              <p className="text-[#A81DA6] text-lg ">Withdraw</p>
              <p className="text-[#939393] ">Spend tokens</p>
              <Image
                priority
                width={70}
                height={81}
                alt="withdraw"
                className="mt-6"
                src="/images/withdraw-icon.svg"
              />
            </div>
          </div>

          <div className="mx-auto">
            <div className="w-full mt-5 mb-3 mx-auto border-gradient-parent rounded-full">
              <div
                className={`w-full gap-2 max-w-[320px] z-10 mx-auto flex flex-row items-center justify-between text-[14px] sm:text-[14px] font-semibold px-2 sm:px-3 text-black bg-white border-gradient rounded-full `}
              >
                Claim daily reward
                <Image
                  width={30}
                  height={30}
                  alt="trophy"
                  className=""
                  loading="lazy"
                  src="/images/trophy.gif"
                />
                {completedTime == 0 ? (
                  <div className="text-gradient flex flex-row gap-2 items-center justify-center text-[22px] font-bold">
                    <CoinSVG fill="#6200EE" />
                    25 WLD
                  </div>
                ) : (
                  <CountdownTimer targetTime={targetTime} />
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs text-gradient py-3 font-bold">
              Priority task
            </p>
            {priorityTask.map((i) => (
              <Todo
                key={i.id}
                score={i.score}
                reward={i.reward}
                priority={i.priority}
                taskTitle={i.taskTitle}
                approximateTime={i.approximateTime}
              />
            ))}
          </div>

          <div className="w-full">
            <p className="text-xs text-[#4E2774] pt-5 pb-3 font-bold">
              To do List
            </p>
            {todo.map((i) => (
              <Todo
                key={i.id}
                score={i.score}
                reward={i.reward}
                taskTitle={i.taskTitle}
                approximateTime={i.approximateTime}
                ratings={i.ratings}
                ratingsLevel={i.ratingsLevel}
              />
            ))}
          </div>

          <div className="w-full">
            <p className="text-xs text-[#4E2774] pt-5 pb-3 font-bold">
              Exclusive Surveys
            </p>
            <Survey />
            <Survey />
            <Survey />
          </div>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-70">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-[320px] transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                    <X className="absolute right-6" onClick={closeModal} />
                    <Image
                      priority
                      width={120}
                      height={100}
                      alt="adobe-stock"
                      className="m-auto"
                      src="/images/message-logo.png"
                    />

                    <Dialog.Title
                      as="h3"
                      className="text-xl font-bold text-center py-1"
                    >
                      Link your World ID to continue using Ribbon Protocol{" "}
                    </Dialog.Title>

                    <div onClick={closeModal} className="py-2">
                      <button
                        type="submit"
                        className="w-full text-sm font-semibold text-center p-3 rounded-xl border-solid border-blue-500 border-2 transition-colors duration-100 focus-visible:duration-0 bg-blue-500 text-white hover:bg-blue-600 focus-visible:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300"
                      >
                        Link your World ID now
                      </button>
                    </div>

                    <div className="flex flex-row gap-2 mt-2">
                      <Image
                        alt="info"
                        width={27}
                        height={27}
                        src="/images/info-logo.svg"
                      />
                      <p className="text-[#FF8C05] text-sm ">
                        You will earn A 5.00 for completing your phone number
                        verification
                      </p>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default Dashboard;
