"use client";

import { useAtom } from "jotai";
import { useAtomValue } from "jotai";
import { authAtom } from "@/lib/atoms/auth.atom";
import BackArrowButton from "@/components/button/back-arrow";

export const SubHeading = () => {
  const { phoneNumber } = useAtomValue(authAtom);
  return (
    <div className="flex flex-col gap-[2px]">
      <p className="text-sm text-slate-600">
        A code has been sent to {phoneNumber}
      </p>
      <p className="text-sm text-slate-600">
        Use code: 000000 to create a test account.
      </p>
    </div>
  );
};

export const BackArrow = () => {
  const [_, setState] = useAtom(authAtom);

  const handleClick = () => {
    setState((prev) => ({ ...prev, code: "" }));
  };

  return <BackArrowButton onClick={handleClick} />;
};
