"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NavigationButtons() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await router.refresh();
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <div className="pt-4 grid grid-cols-2 gap-2">
      <button
        className="cursor-pointer border rounded p-2 hover:bg-gray-50 transition-colors"
        onClick={() => router.back()}
      >
        뒤로 가기
      </button>

      <button
        className="cursor-pointer border rounded p-2 hover:bg-gray-50 transition-colors"
        onClick={() => router.forward()}
      >
        앞으로 가기
      </button>

      <button
        className="cursor-pointer border rounded p-2 col-span-2 disabled:opacity-50 hover:bg-gray-50 transition-colors"
        disabled={refreshing}
        onClick={handleRefresh}
      >
        {refreshing ? "새로고침 중..." : "새로 고침"}
      </button>
    </div>
  );
}
