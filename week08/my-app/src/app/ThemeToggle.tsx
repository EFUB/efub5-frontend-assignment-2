"use client";

export default function ThemeToggle({
  theme,
  toggleTheme,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  // theme에 따라 버튼에 🌙나 ☀️ 표시 - dark일땐 달 이모지
  return (
    <button onClick={toggleTheme} className="mr-2 cursor-pointer">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
