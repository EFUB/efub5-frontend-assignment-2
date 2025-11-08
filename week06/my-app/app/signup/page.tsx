"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
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
        setTimeout(() => router.push("/"), 2000);
      } else {
        const data = await response.json();
        setError(data.message || "회원 가입에 실패했습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>회원 가입</h1>
          
          <form onSubmit={handleSignup} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>아이디</label>
              <input
                type="text"
                id="username"
                placeholder="아이디를 입력해주세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            
            <button type="submit" className={styles.submitButton}>
              회원가입
            </button>
          </form>
          
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </div>
      </div>
    </>
  );
}
