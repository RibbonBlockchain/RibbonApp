import { useAtom } from "jotai";
import { usePhoneAuth } from "@/api/auth";
import { authAtom } from "@/lib/atoms/auth.atom";
import OtpInput from "@/components/input/otp-input";
import { SpinnerIcon } from "@/components/icons/spinner";

const FormInput = () => {
  const [state, setState] = useAtom(authAtom);
  const { mutate: request, isPending: isRequesting } = usePhoneAuth();

  const setOtp = (code: string) => setState((prev) => ({ ...prev, code }));

  const handleRequest = () => {
    if (isRequesting) return;
    request({ phone: state.phoneNumber });
  };

  return (
    <>
      <OtpInput numInputs={6} value={state.code} setValue={setOtp} />
      <p className="flex items-center gap-2 text-sm text-slate-600">
        <span>I didn&apos;t get a code!</span>{" "}
        <span
          onClick={handleRequest}
          className="cursor-pointer text-sm inline-flex font-normal text-[#4285F4]"
        >
          {isRequesting ? (
            <SpinnerIcon className="text-blue-500" />
          ) : (
            "Resend Code"
          )}
        </span>
      </p>
    </>
  );
};

export default FormInput;
