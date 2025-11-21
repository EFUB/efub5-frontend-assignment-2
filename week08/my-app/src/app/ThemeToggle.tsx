"use client";

import { useEffect, useState } from "react";

/*
export default function ThemeToggle() {
    // 테마 상태 설정
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    // 테마 변경 시 body + localStorage 업데이트
    useEffect(() => {
        document.body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    // 버튼 클릭 시 테마 토글
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        localStorage.setItem("theme", theme);
    };

    // theme에 따라 버튼에 🌙나 ☀️ 표시
    return (
        <button onClick={toggleTheme}>
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
}
*/

type Props = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>
}

export default function ThemeToggle({ theme, setTheme }: Props) {
    const toggleTheme = () => {
        setTheme(prev => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <button onClick={toggleTheme}>
            {theme === "dark" ? "🌙" : "☀️"}
        </button>
    );
}
