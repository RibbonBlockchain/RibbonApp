"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query.provider";
import { ThemeProvider } from "next-themes";
import { BaseProvider } from "@/app/(auth)/wallet/base/baseProvider";

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    // <ThemeProvider enableSystem={true} attribute="class">
    <BaseProvider>
      <ReactQueryProvider>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </ReactQueryProvider>
    </BaseProvider>

    // </ThemeProvider>
  );
};

export default RootProvider;
