"use client";

import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const OfflineMessage = () => (
  <div style={{ backgroundColor: "red", color: "white", padding: "10px" }}>
    Check your internet connection.
  </div>
);

const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(new QueryClient());

  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  return online ? (
    <QueryClientProvider client={client}>
      <SessionProvider>{children}</SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  ) : (
    <OfflineMessage />
  );
};

export default ReactQueryProvider;
