// app/providers.jsx
"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider  } from "../../node_modules/@tanstack/react-query";
export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  /* TODO: Add caching functionality */
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
