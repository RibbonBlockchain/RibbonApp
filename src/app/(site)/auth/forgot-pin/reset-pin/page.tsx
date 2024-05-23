import React from "react";
import Submit from "./sections/submit";
import FormInput from "./sections/form";
import BackArrow from "@/containers/auth/login/sections/back";

const ResetPin = () => {
  return (
    <div className="dark:bg-[#171717] flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col gap-4 sm:gap-6">
        <BackArrow stroke="#000" />

        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="text-slate-700 dark:text-white font-extrabold text-3xl">
            Reset your Pin
          </h1>
          <p className="text-sm text-slate-600 dark:text-white text-center">
            Enter the phone number associated with your Ribbon Protocol account{" "}
          </p>
        </div>

        <FormInput />
      </div>

      <Submit />
    </div>
  );
};

export default ResetPin;
