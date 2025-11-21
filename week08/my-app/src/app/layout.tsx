import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Header from "./Header";
import { Providers} from "./providers";
import ThemeToggle from "./ThemeToggle";
import { ClientThemeProvider } from "./ClientThemeProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <ClientThemeProvider>
            <Header session={session} />
            {children}
          </ClientThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
