"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavButtons from "@/components/NavButtons";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/list");

        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "가입 실패");
    } catch (e) {
      setError("네트워크 오류");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">회원 가입</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border rounded p-2"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full border rounded p-2 disabled:opacity-50"
          disabled={loading}
          type="submit"
        >
          {loading ? "가입 중..." : "가입하기"}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <NavButtons />
    </main>
  );
}
