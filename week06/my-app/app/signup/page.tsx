"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setSuccess("회원 가입이 완료되었습니다!");
        setUsername("");
        setPassword("");
      } else {
        const data = await response.json();
        setError(data.message || "회원 가입에 실패했습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>회원 가입</h1>
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>가입하기</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
      <div className={styles.navigation}>
        <button onClick={() => router.back()} className={styles.button}>뒤로 가기</button>
        <button onClick={() => router.forward()} className={styles.button}>앞으로 가기</button>
        <button onClick={() => router.refresh()} className={styles.button}>새로 고침</button>
      </div>
    </div>
  );
}
