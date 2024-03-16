"use client";

import React from "react";
import { usePathname } from "next/navigation";
import FooterNav from "@/containers/dashboard/footer-nav";

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isAuthRoute = pathname.includes("/auth");

  if (pathname === "/") {
    return <>{children}</>;
  }

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 mb-[70px]">{children}</main>
      <FooterNav />
    </div>
  );
};

export default CustomLayout;
