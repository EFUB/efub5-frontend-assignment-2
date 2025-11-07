'use client'; 

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavButtons() {
  const router = useRouter();

  return (
<nav className="nav-bar">
      <Link href="/">홈</Link>
      <Link href="/list">게시판</Link>
      <Link href="/write">글쓰기</Link>
      <Link href="/register">회원가입</Link>

      <div className="nav-buttons">
        <button onClick={() => router.back()}>뒤로</button>
        <button onClick={() => router.forward()}>앞으로</button>
        <button onClick={() => router.refresh()}>새로고침</button>
      </div>
    </nav>  );
}