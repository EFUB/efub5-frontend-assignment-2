import "./globals.css";
import Link from "next/link";
import { Inter, Poor_Story } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const poorStory = Poor_Story({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={poorStory.className}>
        <header className="header">
          <nav
            className="nav"
            style={{ display: "flex", gap: "1rem", padding: "1rem" }}
          >
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>

        <main className="main" style={{ padding: "1rem" }}>
          {children}
        </main>

        <footer
          className={`footer ${inter.className}`}
          style={{
            borderTop: "1px solid #ddd",
            textAlign: "center",
            padding: "1rem",
            marginTop: "2rem",
          }}
        >
          2025 EFUB 5th week4 assignment 우윤수
        </footer>
      </body>
    </html>
  );
}
