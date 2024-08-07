import React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { RibbonLight } from "../../../public/images";
import ThemeSwitcher from "@/provider/theme-swicher";
import { MoonIcon } from "@heroicons/react/24/solid";

const Topbar = () => {
  return (
    <div className="w-full p-4 sm:p-6 flex flex-row mt-4 py-1 items-start justify-between">
      <RibbonLight />

      <div className="flex flex-row items-center justify-center gap-3">
        <Link href="/dashboard/notifications">
          <Bell
            fill="#6338A2"
            stroke="#6338A2"
            className="rounded-full p-[2px]"
          />
        </Link>

        {/* <ThemeSwitcher /> */}
        <MoonIcon
          className="w-5 h-5 text-[#6338A2]"
          role="button"
          fill={"#6338A2"}
        />
      </div>
    </div>
  );
};

export default Topbar;
