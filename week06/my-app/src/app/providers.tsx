// app/providers.tsx (클라이언트 컴포넌트)
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children, session }: { children: React.ReactNode; session: any }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
