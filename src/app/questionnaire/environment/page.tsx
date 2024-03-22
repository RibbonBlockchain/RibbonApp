"use client";

import { useState } from "react";
import BeginQuestionnaire from "@/containers/questionnaire/start";
import YesOrNo from "@/containers/questionnaire/YesOrNo";
import OptionSelectQuestionnarie from "@/containers/questionnaire/radio-questionnaire";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";

export default function Environment() {
  const question = {
    reward: "5",
    rewardPoints: "45",
    completionTime: "1",
    description: "Environment Questionnaires",
    rewardPointText: "completing this environment questionnaire",
    imageUrl: "/images/questionnaire/environment.svg",
    personalInfo: {
      task: "Does the House you live in pose any risk to you or your family's Health?",
      instruction: "Select One",
      userDetails: [
        { label: "First Name", required: true, value: "" },
        { label: "Last Name", required: true, value: "" },
        { label: "Other Names", required: false, value: "" },
      ],
    },
  };

  const [step, setStep] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showClaimedPage, setShowClaimedPage] = useState(false);

  const router = useRouter();

  const handleOpenModal = () => {
    {
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowClaimedPage(true);
    router.push("/questionnaire/claim");
  };

  const handleClick = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      handleOpenModal();
    }
  };

  const handlePrevPageClick = () => {
    setStep(step - 1);
  };
  return (
    <div>
      {step === 0 ? (
        <BeginQuestionnaire
          onclick={handleClick}
          reward={question.reward}
          imageUrl={question.imageUrl}
          description={question.description}
          rewardPoints={question.rewardPoints}
          completionTime={question.completionTime}
          rewardPointText={question.rewardPointText}
        />
      ) : step === 1 ? (
        <OptionSelectQuestionnarie
          step={1}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Does the House you live in pose any risk to you or your family's health?"
        >
          <YesOrNo />
        </OptionSelectQuestionnarie>
      ) : step === 2 ? (
        <OptionSelectQuestionnarie
          step={2}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Does the neighborhood you live in pose any risk to you or your family’s health?"
        >
          <YesOrNo />
        </OptionSelectQuestionnarie>
      ) : step === 3 ? (
        <OptionSelectQuestionnarie
          step={3}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Does your family feel safe in the area you live in?"
        >
          <YesOrNo thirdOptionText="Sometimes" />
        </OptionSelectQuestionnarie>
      ) : step === 4 ? (
        <OptionSelectQuestionnarie
          step={4}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Do you have tarred/asphalt roads in your neighborhood?"
        >
          <YesOrNo thirdOptionText="Sometimes" />
        </OptionSelectQuestionnarie>
      ) : step === 5 ? (
        <OptionSelectQuestionnarie
          step={5}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Do you have tarred/asphalt roads in your neighborhood?"
        >
          <YesOrNo thirdOptionText="Partly" />
        </OptionSelectQuestionnarie>
      ) : (
        <OptionSelectQuestionnarie
          step={6}
          no_of_steps={6}
          onclick={handleClick}
          instruction="Select one"
          prevPage={handlePrevPageClick}
          question="Do you have access to the public transport in your neighborhood?"
        >
          <YesOrNo thirdOptionText="Sometimes" />
        </OptionSelectQuestionnarie>
      )}

      {showClaimedPage && <div className="bg-red-500 !z-50">Hellow world</div>}
      <Modal isOpen={showSuccessModal} onClose={handleCloseModal} />
    </div>
  );
}
