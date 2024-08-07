"use client";

import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { useGetAuth } from "@/api/auth";
import PageLoader from "@/components/loader";
import { useSession } from "next-auth/react";
import Todo from "@/containers/dashboard/todo";
import { ArrowRight, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import Topbar from "@/containers/dashboard/top-bar";
import {
  useGetUncompletedQuestionnaires,
  useGetUncompletedSurveys,
  useGetUncompletedTasks,
} from "@/api/user";
import CoinSVG from "../../../../public/images/coin";
import { SwapIcon, WalletMoney } from "../../../../public/images";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import ClaimDailyRewardModal from "@/components/modal/claim_daily_reward";
import CountdownTimer from "@/containers/dashboard/simple-countdown-timer";
import { UserWalkthrough } from "@/containers/user-walkthrough/walkthrough";
import { verifyPhoneTask, completeProfileTask } from "@/lib/values/mockData";
import {
  QuestionnaireHeader,
  SurveyHeader,
  TaskHeader,
} from "@/containers/questionnaire/headers";
import SurveyTodo from "@/containers/dashboard/survey-todo";
import { useRouter } from "next/navigation";
import TaskTodo from "@/containers/dashboard/task-todo";
import TaskModal, { TTasks } from "@/components/modal/task-modal";
import TaskDetailsModal from "@/components/modal/task-modal";

const Dashboard = () => {
  const session = useSession();

  const router = useRouter();

  const [priorityTask, setPriorityTask] = React.useState<any>([]);
  const [showDailyRewardModal, setShowDailyRewardModal] = useState(false);
  const [swapVirtualBalance, setSwapVirtualBalance] = useState(false);

  const { data: user } = useGetAuth({ enabled: true });
  const balance = user?.wallet.balance;
  const pointBalance = balance * 5000;

  const [hideBalance, setHideBalance] = useState(false);
  const toggleHideBalance = () => setHideBalance(!hideBalance);

  const [swapBalance, setSwapBalance] = useState(false);
  const handleSwapBalance = () => setSwapBalance(!swapBalance);

  const { data: questionnaire, isLoading } = useGetUncompletedQuestionnaires();
  const { data: survey } = useGetUncompletedSurveys();
  const { data: task } = useGetUncompletedTasks();

  // const savedAddress = localStorage.getItem("address");
  const wldTokenBalance = localStorage.getItem("wldTokenBalance");

  const [collapseQuestionnaire, setCollapseQuestionnaire] = useState(true);
  const [collapseSurvey, setCollapseSurvey] = useState(true);
  const [collapseTasks, setCollapseTasks] = useState(true);

  React.useEffect(() => {
    if (user?.id && !user?.phone) {
      setPriorityTask((prev: any) => {
        const newState = [...prev];
        const found = newState.findIndex((t: any) => t.id === "verify-phone");

        if (found === -1) newState.push(verifyPhoneTask as any);
        return newState;
      });
    }

    if (user?.id && !user?.email) {
      setPriorityTask((prev: any) => {
        const newState = [...prev];
        const found = priorityTask.findIndex(
          (t: any) => t.id === "complete-profile"
        );

        if (found === -1) newState.push(completeProfileTask as any);
        return newState;
      });
    }
  }, [user?.id, user?.email]);

  // lastclickTime, currentTime, twelveHoursLater, remainingTime
  const clickedTime = new Date(user?.lastClaimTime);
  const twelveHoursLater = new Date(
    clickedTime.getTime() + 12 * 60 * 60 * 1000
  );

  const currentTime = new Date();
  const remainingTime = Math.max(
    Math.floor((twelveHoursLater.getTime() - currentTime.getTime()) / 1000),
    0
  );

  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const isNew = !localStorage.getItem(`walkthroughCompleted_${user?.id}`);
      setIsNewUser(isNew);
    }
  }, []);

  isLoading && <PageLoader />;

  return (
    <AuthNavLayout>
      <div className="w-full h-auto text-[#080808] dark:bg-gray-950 bg-[#fffefe] p-4 sm:p-6">
        <div className="relative mx-auto flex flex-col items-center justify-center content-center">
          {isNewUser && user && <UserWalkthrough />}

          <Topbar />
          <div className="bg-gradient-to-br from-[#442F8C] to-[#951E93] text-white rounded-2xl w-full h-auto p-4 my-2 flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col items-start gap-1 text-center">
                <div
                  onClick={() => setSwapVirtualBalance(!swapVirtualBalance)}
                  className="w-full cursor-pointer flex items-center justify-center mx-auto"
                >
                  . .
                </div>
                {!swapVirtualBalance ? (
                  <>
                    <div className="flex flex-row gap-2 items-center text-sm font-medium">
                      Virtual Balance
                      {hideBalance ? (
                        <EyeOff onClick={toggleHideBalance} size={16} />
                      ) : (
                        <EyeOff
                          onClick={toggleHideBalance}
                          fill="white"
                          size={16}
                        />
                      )}
                    </div>
                    <div
                      onClick={handleSwapBalance}
                      className="flex flex-row gap-2 items-center justify-center text-lg font-bold cursor-pointer"
                    >
                      <CoinSVG />
                      {hideBalance ? (
                        <p>***</p>
                      ) : (
                        <>
                          {swapBalance ? (
                            <p> {pointBalance.toLocaleString()} Points</p>
                          ) : (
                            <p> {balance.toFixed(4)} WLD</p>
                          )}
                        </>
                      )}
                    </div>
                    {
                      <div
                        onClick={handleSwapBalance}
                        className="flex flex-row items-center justify-center gap-2 text-xs cursor-pointer"
                      >
                        <div>
                          <SwapIcon />
                        </div>{" "}
                        {hideBalance ? (
                          <p>***</p>
                        ) : (
                          <>
                            {swapBalance ? (
                              <p> {balance.toFixed(4)} WLD</p>
                            ) : (
                              <p> {pointBalance.toLocaleString()} Points</p>
                            )}
                          </>
                        )}
                      </div>
                    }
                  </>
                ) : (
                  <>
                    <div className="flex flex-row gap-2 items-center text-sm font-medium">
                      Crypto Balance
                      {hideBalance ? (
                        <EyeOff onClick={toggleHideBalance} size={16} />
                      ) : (
                        <EyeOff
                          onClick={toggleHideBalance}
                          fill="white"
                          size={16}
                        />
                      )}
                    </div>
                    <div
                      onClick={handleSwapBalance}
                      className="flex flex-row gap-2 items-center justify-center text-lg font-bold cursor-pointer"
                    >
                      <CoinSVG />
                      {hideBalance ? (
                        <p>***</p>
                      ) : (
                        <>
                          {swapBalance ? (
                            <p> {Number(wldTokenBalance) * 5000} Points </p>
                          ) : (
                            <p> {wldTokenBalance} WLD</p>
                          )}
                        </>
                      )}
                    </div>
                    {
                      <div
                        onClick={handleSwapBalance}
                        className="flex flex-row items-center justify-center gap-2 text-xs cursor-pointer"
                      >
                        <div>
                          <SwapIcon />
                        </div>{" "}
                        {hideBalance ? (
                          <p>***</p>
                        ) : (
                          <>
                            {swapBalance ? (
                              <p> {wldTokenBalance} WLD</p>
                            ) : (
                              <p>{Number(wldTokenBalance) * 5000} Points</p>
                            )}
                          </>
                        )}
                      </div>
                    }
                  </>
                )}
              </div>

              <div
                id="withdraw-tokens"
                className="flex flex-col items-center justify-center"
              >
                <div className="w-[71px] sm:w-[71px] flex flex-col justify-center mb-2">
                  <CircularProgressbarWithChildren
                    styles={buildStyles({
                      pathColor: `#FFF`,
                      trailColor: `#F6C4D0`,
                    })}
                    value={(pointBalance / 10000) * 100}
                    strokeWidth={8}
                  >
                    {pointBalance >= 10000 ? (
                      <button
                        onClick={() => router.push("/wallet")}
                        className="cursor-pointer text-sm px-2 py-1 bg-white text-black rounded-full "
                      >
                        {"Claim"}
                      </button>
                    ) : (
                      <p className="flex flex-col text-xs font-extrabold leading-4">
                        {0 ||
                          (pointBalance > 10000
                            ? 10000
                            : Math.floor(pointBalance))}
                      </p>
                    )}
                  </CircularProgressbarWithChildren>
                </div>
                <p className="text-xs font-medium text-                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ">
                  {" "}
                  {pointBalance >= 10000
                    ? "Claim points in wallet"
                    : "10,000 pts to withdraw"}{" "}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between w-full gap-3">
              <Link
                href={"/wallet"}
                className="w-full flex flex-row gap-3 items-center justify-center bg-white py-3 rounded-xl text-center mt-6 text-[#080808] font-semibold"
              >
                Wallet
                <WalletMoney />
              </Link>

              <Link
                href={"/withdraw"}
                className="w-full flex flex-row gap-3 items-center justify-center bg-white py-3 rounded-xl text-center mt-6 text-[#080808] font-semibold"
              >
                Withdraw Tokens
                <ArrowRight stroke="#7C56FE" size={20} />
              </Link>
            </div>
          </div>

          <button
            onClick={() => setShowDailyRewardModal(true)}
            className="mx-auto border-[#4B199C] border-1 mb-5 mt-2"
          >
            <span
              className={`w-full gap-2 max-w-[350px] mx-auto flex flex-row items-center justify-between text-[14px] font-semibold py-1.5 px-2 sm:px-3 text-gradient bg-white border-[#4B199C] border-[2px] rounded-full `}
            >
              Claim daily reward
              <Image
                width={24}
                height={24}
                alt="trophy"
                className=""
                loading="lazy"
                src="/images/trophy.gif"
              />
              {remainingTime > 0 ? (
                <CountdownTimer />
              ) : (
                <div
                  className={clsx(
                    "text-gradient flex flex-row gap-2 items-center justify-center text-[20px] font-bold"
                  )}
                >
                  <CoinSVG fill="#4B199C" />
                  0.02 WLD
                </div>
              )}
            </span>
          </button>

          <div className="w-full">
            {priorityTask?.length >= 1 && (
              <p className="text-[#34246B] text-xs py-3 font-bold">
                Priority activity
              </p>
            )}

            {priorityTask.map((i: any) => (
              <Todo
                key={i.id}
                icon={i.icon}
                score={i.score}
                reward={i.reward}
                priority={i.priority}
                taskTitle={i.taskTitle}
                approximateTime={i.approximateTime}
                id={i.id}
                href={i.href}
              />
            ))}
          </div>

          <div className="w-full mb-4">
            <div
              onClick={() => setCollapseQuestionnaire(!collapseQuestionnaire)}
            >
              <QuestionnaireHeader />
            </div>
            {collapseQuestionnaire && (
              <>
                {questionnaire?.map((i: any) => (
                  <Todo
                    key={i.id}
                    ratings={i.ratings}
                    score={i.point}
                    icon={undefined}
                    reward={i.reward}
                    taskTitle={i.name}
                    approximateTime={i.duration / 60}
                    totalRatings={i.totalRatings}
                    id={i.id}
                    href={`/dashboard/questionnaires/${i.id}`}
                  />
                ))}
              </>
            )}
          </div>

          <div className="w-full mb-4">
            <div onClick={() => setCollapseSurvey(!collapseSurvey)}>
              <SurveyHeader />
            </div>

            {collapseSurvey && (
              <>
                {survey?.map((i: any) => (
                  <SurveyTodo
                    key={i.id}
                    score={i.point}
                    icon={undefined}
                    reward={i.reward}
                    taskTitle={i.name}
                    approximateTime={i.duration / 60}
                    ratings={i.ratings}
                    totalRatings={i.totalRatings}
                    id={i.id}
                    href={`/dashboard/survey/${i.id}`}
                  />
                ))}
              </>
            )}
          </div>

          <div className="w-full mb-4">
            <div onClick={() => setCollapseTasks(!collapseTasks)}>
              <TaskHeader />
            </div>
            {collapseTasks && (
              <>
                {task?.map((i: any) => (
                  <TaskTodo
                    key={i.id}
                    id={i.id}
                    score={i.point}
                    reward={i.reward}
                    taskTitle={i.name}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <ClaimDailyRewardModal
        closeModal={() => {
          setShowDailyRewardModal(false);
        }}
        disabled={remainingTime > 0}
        isOpen={showDailyRewardModal}
      />
    </AuthNavLayout>
  );
};

export default Dashboard;
