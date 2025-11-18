"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="p-6 space-x-2">
      <button
        className="cursor-pointer border rounded p-2"
        onClick={() => router.push("/register")}
      >
        회원 가입
      </button>
      <button
        className="cursor-pointer border rounded p-2"
        onClick={() => router.push("/list")}
      >
        게시글 목록
      </button>
    </main>
  );
}
