"use client";

import { getConfig } from "./wagmi";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

export function BaseProvider(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig);

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      {props.children}
    </WagmiProvider>
  );
}
