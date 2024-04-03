"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@ramonak/react-progress-bar";
import YesOrNo from "@/containers/questionnaire/YesOrNo";
import { SpinnerIcon } from "@/components/icons/spinner";
import { useGetTaskByID, useSubmitTask } from "@/api/user";
import BgEffect from "@/components/questionnarie/bg-effect";
import BeginQuestionnaire from "@/containers/questionnaire/start";
import ClaimTaskReward from "@/components/modal/claim_task_reward";
import RadioOptions from "@/containers/questionnaire/radio-options";
import { Check, RibbonLight } from "../../../../../../public/images";
import PrevQuestionnairePageButton from "@/components/button/prev-questionnarie-page";
import RewardClaimedPage from "@/components/modal/reward-claimed-page";

const TaskPage = ({ params }: any) => {
  const [step, setStep] = React.useState(0);
  const [claim, setClaim] = React.useState(false);
  const [rewardClaimed, setRewardClaimed] = React.useState(false);

  const { data, isLoading } = useGetTaskByID({ id: String(params.id) });
  const questionIds = data?.questions?.map((question: any) => question.id);

  const { mutate: submitTask, isPending } = useSubmitTask();
  isPending && <SpinnerIcon />;

  const router = useRouter();

  const prevPage = () => {
    setStep((x) => x - 1);
    step === 0 && router.push("/dashboard");
  };

  const [optionId, setSelectedOptionId] = useState<number>();
  const [YesOrNoId, setYesorNoId] = useState<number>();
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);

  const handleOptionSelect = (id: number) => {
    setSelectedOptionId(id);
    setButtonDisable(false);

    // if (step !== data?.questions?.length) {
    //   submitTask({
    //     questionId: questionIds[step - 1],
    //     optionId: id,
    //     taskId: data?.id,
    //   });
    // }
  };

  const handleYesOrNoOptionSelect = (id: number) => {
    setYesorNoId(id);
    setButtonDisable(false);

    // if (step !== data?.questions?.length) {
    //   submitTask({
    //     questionId: questionIds[step - 1],
    //     optionId: id,
    //     taskId: data?.id,
    //   });
    // }
  };

  return (
    <div className="relative z-10 flex flex-col min-h-[100vh] items-start justify-between p-4 sm:p-6">
      <BgEffect />

      <div className="flex relative flex-col w-full">
        <PrevQuestionnairePageButton onClick={prevPage} />
        <div className="flex flex-row items-center justify-center">
          {step > 0 && <RibbonLight />}
        </div>

        {step > 0 && (
          <div className="mt-6 mb-4 flex flex-row gap-2 items-center justify-center">
            <div className="text-xs text-[#939393] flex flex-row items-center">
              <p className="">{step}</p>/
              <p className="">{data?.questions?.length}</p>
            </div>

            <div className="w-full">
              <ProgressBar
                height="3px"
                completed={step}
                labelSize="10px"
                isLabelVisible={false}
                maxCompleted={data?.questions?.length}
              />
            </div>
          </div>
        )}

        {step == 0 ? (
          <BeginQuestionnaire
            reward={data?.reward}
            onclick={() => setStep(1)}
            rewardPoints={data?.reward * 5000}
            imageUrl={data?.image || "/images/ribbon.svg"}
            description={data?.description}
            completionTime={data?.duration / 60}
          />
        ) : (
          <div className="flex h-[80vh] flex-col items-center justify-between">
            {data?.questions?.map(
              (q: any, i: any) =>
                i + 1 === step && (
                  <>
                    <div
                      key={q?.id}
                      className="flex w-full flex-col items-center justify-center gap-3"
                    >
                      <h1 className="font-normal text-lg text-center">
                        {q?.text}
                      </h1>

                      {q?.type && (
                        <p className="text-[10px] py-1 px-3 bg-[#F6E8F6] rounded-full">
                          Select One
                        </p>
                      )}

                      {q?.type === "BOOLEAN" ? (
                        <div className="flex items-center justify-center flex-row w-full mt-14">
                          <YesOrNo
                            key={q?.id}
                            options={q?.options}
                            onOptionSelect={handleYesOrNoOptionSelect}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-row w-full mt-10 mb-20  ">
                          <RadioOptions
                            key={q?.id}
                            options={q?.options}
                            onOptionSelect={handleOptionSelect}
                          />
                        </div>
                      )}
                    </div>

                    <div className={clsx("flex justify-center w-full")}>
                      <button
                        disabled={buttonDisable}
                        onClick={() => {
                          setStep((x) => x + 1);
                          setButtonDisable(!buttonDisable);

                          // submit each question
                          if (step !== data?.questions?.length) {
                            submitTask({
                              questionId: questionIds[step - 1],
                              optionId: YesOrNoId || optionId || 0,
                              taskId: data?.id,
                            });
                          }

                          // submit last question here
                          if (step === data?.questions?.length) {
                            setStep(data?.questions?.length);
                            setClaim(!claim);
                            submitTask({
                              questionId:
                                questionIds[data?.questions?.length - 1],
                              optionId: YesOrNoId || optionId || 0,
                              taskId: data?.id,
                            });
                          }

                          // console.log("questionId", questionIds[step - 1]);
                          // console.log(
                          //   "questionId last?",
                          //   questionIds[data?.questions?.length - 1]
                          // );
                          // console.log("optionId", YesOrNoId || optionId || 0);
                          // console.log("taskId", data?.id);
                        }}
                        className={clsx(
                          buttonDisable
                            ? "bg-slate-300"
                            : "bg-gradient-to-r from-[#714EE7] to-[#A81DA6]",
                          `flex w-[12rem] items-center gap-2 justify-center mb-16 text-white text-base font-semibold p-4 rounded-[35px] border-solid border-gray-300 border-2 transition-colors duration-100 focus-visible:duration-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-300`
                        )}
                      >
                        Submit <Check />
                      </button>
                    </div>
                  </>
                )
            )}

            {claim && (
              <ClaimTaskReward
                isOpen={claim}
                closeModal={() => {
                  setClaim(false), setRewardClaimed(true);
                }}
              />
            )}

            {/* {rewardClaimed && (
              <RewardClaimedPage
                isOpen={rewardClaimed}
                closeModal={() => setRewardClaimed(false)}
              />
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
