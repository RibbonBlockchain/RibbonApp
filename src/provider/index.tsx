"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query.provider";
import { ThemeProvider } from "next-themes";
import { BaseProvider } from "@/app/(auth)/wallet/base/baseProvider";

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    // <ThemeProvider enableSystem={true} attribute="class">
    <ReactQueryProvider>
      <BaseProvider>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </BaseProvider>
    </ReactQueryProvider>
    // </ThemeProvider>
  );
};

export default RootProvider;
