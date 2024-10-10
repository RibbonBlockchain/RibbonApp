"use client";

import Menu, {
  Support,
  Settings,
  RouteMenu,
  ProfileDetails,
} from "@/containers/account/menu";
import Link from "next/link";
import Image from "next/image";
import Logout from "./sections/logout";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import User from "@/containers/account/user";
import MoonSVG from "@/public/ReactSVG/moon";
import { Scan, Wallets, WorldID } from "@/public/images";
import { ChevronRight, Sun } from "lucide-react";
import SwitchButton from "@/containers/account/switch-button";
import InviteFriends from "@/containers/account/invite-friends";
import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";

const Account = () => {
  const [theme, setTheme] = React.useState(false);
  const handleWorldId = () => signIn("worldcoin");
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <AuthNavLayout>
      <div className="bg-white min-h-screen p-4 sm:p-6">
        <h1 className="text-2xl font-extrabold mt-3">My Account</h1>
        <User />

        <div className="my-4">
          <InviteFriends className="bg-[#EAF7ED]" />
        </div>

        <div className="mt-2 flex flex-col gap-[2px]">
          <p className="text-xs font-bold text-[#434343]">ACCOUNT</p>

          <Link href="/account/kyc">
            <div className="flex flex-row items-center justify-between py-3 px-[6px] ">
              <div className="flex flex-row items-center justify-center gap-3">
                <Scan />
                <p className="text-base font-medium text-red-500">
                  Verify Identity (KYC/AML)
                </p>
              </div>

              <ChevronRight stroke="#6200EE" />
            </div>
          </Link>

          <div className="cursor-pointer" onClick={handleWorldId}>
            <div className="flex flex-row items-center justify-between py-3 px-[6px] ">
              <div className="flex flex-row items-center justify-center gap-3">
                <WorldID />
                <p className="text-base font-medium">Link World ID</p>
              </div>
              <ChevronRight stroke="#6200EE" />
            </div>
            <hr />
          </div>

          <div className="relative w-full">
            <div
              onClick={toggleDropdown}
              className="flex flex-row items-center justify-between py-3 px-[6px] "
            >
              <div className="flex flex-row items-center justify-center gap-3">
                <Wallets />
                <p className="text-base font-medium">Wallets</p>
              </div>
              <ChevronRight stroke="#6200EE" />
            </div>
            <hr />

            {isDropdownOpen && (
              <div className="absolute w-full bg-white border rounded-lg mt-2 py-1 shadow-lg z-10">
                <div
                  onClick={() => router.push("/wallet/base")}
                  className="w-full flex flex-row gap-2 items-center py-2 px-4 cursor-pointer text-[#1577EA]"
                >
                  <Image
                    alt="base"
                    width={18}
                    height={18}
                    src={"/images/BASE.svg"}
                  />
                  BASE
                </div>
                <div className="border border-[#E5E7EB]" />
                <div
                  onClick={() => router.push("/wallet/optimism")}
                  className="w-full flex flex-row gap-2 items-center py-2 px-4 cursor-pointer text-[#E81509]"
                >
                  <Image
                    alt="op"
                    width={18}
                    height={18}
                    src={"/images/optimism.svg"}
                  />
                  Optimism
                </div>
              </div>
            )}
          </div>

          {ProfileDetails.map(({ href, description, logo }) => (
            <Menu
              href={href}
              logo={logo}
              key={description}
              description={description}
            />
          ))}
        </div>

        <div className="flex flex-col gap-[2px]">
          <p className="text-xs font-bold pt-6 pb-2 text-[#434343]">
            SETTINGS & SECURITY
          </p>
          {Settings.map(({ href, description, logo }) => (
            <Menu
              href={href}
              logo={logo}
              key={description}
              description={description}
            />
          ))}
          <div>
            <div
              onClick={() => setTheme(!theme)}
              className="flex flex-row items-center justify-between py-3 px-[6px] "
            >
              {theme ? (
                <div className="flex flex-row items-center justify-center gap-3">
                  <MoonSVG />
                  <p className="text-base font-medium">Dark Mode</p>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center gap-3">
                  <Sun />
                  <p className="text-base font-medium">Light Mode</p>
                </div>
              )}

              <SwitchButton />
            </div>

            <hr />
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          <p className="text-xs font-bold pt-6 pb-2 text-[#434343] ">SUPPORT</p>
          {Support.map(({ href, description, logo }) => (
            <RouteMenu
              href={href}
              logo={logo}
              key={description}
              description={description}
            />
          ))}
        </div>

        <Logout />
      </div>
    </AuthNavLayout>
  );
};

export default Account;
