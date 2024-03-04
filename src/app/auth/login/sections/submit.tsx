"use client";

import { useAtomValue } from "jotai";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { mobileOnboardAtom } from "@/app/lib/atoms";
import { useOnboardOTPRequest } from "@/app/api/auth";

const Submit = () => {
  const router = useRouter();
  const form = useAtomValue(mobileOnboardAtom);
  const { mutate: request, isPending, isSuccess } = useOnboardOTPRequest();

  const isLoading = isPending || isSuccess;

  const onSuccess = () => {
    router.push("/auth/verify");
  };

  const handleSubmit = () => {
    if (!form.phoneNumber || isPending) return;
    request({ phone: form.phoneNumber }, { onSuccess });
  };

  return (
    <div className="flex items-center justify-center w-full pb-6">
      <Button loading={isLoading} onClick={handleSubmit}>
        Continue
      </Button>
    </div>
  );
};

export default Submit;
