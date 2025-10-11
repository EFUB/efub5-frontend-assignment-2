import type { Metadata } from "next";
import "./globals.css";
import { Inter, Lora } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "Campus Cafe Explorer",
  description: "Find and favorite campus cafes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${lora.variable}`}>
        <header className="header">
          <nav className="nav">
            <a href="/">Home</a>
            <a href="/cafes">Cafes</a>
          </nav>
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
