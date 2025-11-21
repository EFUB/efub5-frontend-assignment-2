"use client";

import Link from "next/link";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ClientThemeProvider";
import { Session } from "next-auth";

type HeaderProps = { session: Session | null };

export default function Header({ session }: HeaderProps) {
  const { theme, setTheme } = useTheme();  // ← 여기서 가져옴

  return (
    <div className="navbar">
      <Link href="/" className="logo">EFUB5 Forum</Link>
      <Link href="/list">List</Link>
      <Link href="/write">Write</Link>

      <ThemeToggle theme={theme} setTheme={setTheme} />

      {session ? (
        <span>
          <span>{session.user?.name && `${session.user.name}님 `}</span>
          <LogoutBtn />
        </span>
      ) : (
        <LoginBtn />
      )}
    </div>
  );
}
