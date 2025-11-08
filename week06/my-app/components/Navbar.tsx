"use client";

import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <h1 className={styles.logo} onClick={() => router.push("/")}>
          게시판
        </h1>
        
        <div className={styles.navLinks}>
          <button 
            className={styles.navButton}
            onClick={() => router.push("/")}
          >
            홈
          </button>
          <button 
            className={styles.navButton}
            onClick={() => router.push("/list")}
          >
            게시글 목록
          </button>
          <button 
            className={styles.navButton}
            onClick={() => router.push("/write")}
          >
            글 작성
          </button>
          <button 
            className={styles.navButton}
            onClick={() => router.push("/signup")}
          >
            회원가입
          </button>
        </div>

        <div className={styles.navigationControls}>
          <button 
            className={styles.controlButton}
            onClick={() => router.back()}
            title="뒤로 가기"
          >
            ← 뒤로
          </button>
          <button 
            className={styles.controlButton}
            onClick={() => router.forward()}
            title="앞으로 가기"
          >
            앞으로 →
          </button>
          <button 
            className={styles.controlButton}
            onClick={() => router.refresh()}
            title="새로 고침"
          >
            새로고침
          </button>
        </div>
      </div>
    </nav>
  );
}