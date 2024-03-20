"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/auth.atom";
import { useVerifyPhoneSignUp } from "@/api/auth";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(authAtom);
  const { mutate: verify, isPending, isSuccess } = useVerifyPhoneSignUp();

  const isLoading = isPending || isSuccess;
  const isFormInvalid = form.code.length < 6 || !form.phoneNumber;
  const isSubmitDisabled = isFormInvalid || isLoading;

  const onSuccess = () => {
    router.push("/dashboard/questionnaire/confirmation");
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    verify({ code: form.code, phone: form.phoneNumber }, { onSuccess });
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
        // className={`${
        //   isSubmitDisabled ? "bg-gradient-to-r from-[#714EE7] to-[#A81DA6]" : ""
        // }`}
      >
        Confirm
      </Button>
    </div>
  );
};

export default Submit;