"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import { Session } from "next-auth";

type Theme = "light" | "dark";

export default function ThemeClientLayout({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
    }
  }, []);

  //theme이 바뀌면 body + localStorage 반영
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <>
      <Header session={session} theme={theme} toggleTheme={toggleTheme} />
      {children}
    </>
  );
}
