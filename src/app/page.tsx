import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import LinkButton from "@/components/button/link";
import { SignInWithWorldIdButton } from "./auth/landing/components";

const Home = () => {
  return (
    <div className="flex flex-col h-[inherit] items-center justify-between gap-6 p-4 sm:p-6">
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 sm:gap-6">
        <Image
          width={100}
          height={24}
          alt="ribbon logo"
          src="/images/ribbon.svg"
        />

        <div className="text-center">
          <h1 className="text-slate-700 text-2xl font-extrabold">
            Welcome to Ribbon Protocol
          </h1>
          <p className="text-base font-normal text-slate-600 text-center">
            Earn tokenized Universal Basic Income
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 pb-12">
        <SignInWithWorldIdButton />

        <LinkButton
          href="/auth/signup"
          className="flex flex-row items-center justify-center gap-3"
        >
          Sign Up with mobile number <Phone />
        </LinkButton>

        <Link
          href="/auth/login"
          className="text-sm font-normal text-[#141414] text-center"
        >
          Already an existing user?{" "}
          <span className="text-[#6200EE] font-semibold">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
