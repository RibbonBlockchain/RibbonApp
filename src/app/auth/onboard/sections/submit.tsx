"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { usePhoneOnboard } from "@/api/auth";
import { phoneAuthAtom } from "@/lib/atoms/auth.atom";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(phoneAuthAtom);
  const { isPending, isSuccess, mutate: request } = usePhoneOnboard();

  const isLoading = isPending || isSuccess;
  const isFormInvalid =
    !form.phoneNumber.trim() || !form.pin.trim() || !form.code;

  const isSubmitDisabled = isLoading || isFormInvalid;

  const onSuccess = () => {
    router.push("/dashboard");
  };

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    request(
      { pin: form.pin, phone: form.phoneNumber, code: form.code },
      { onSuccess }
    );
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button
        loading={isLoading}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Continue
      </Button>
    </div>
  );
};

export default Submit;