import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Header from "./Header";
import { Providers} from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <Header session={session} />
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
