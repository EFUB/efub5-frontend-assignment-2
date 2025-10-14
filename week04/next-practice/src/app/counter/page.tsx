'use client'
// 기본이 서버 컴포넌트라 이거 써줘야 작동함

import { useState } from 'react'

export default function CounterPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-6">Counter Page</h1>

      <div className="text-6xl font-mono mb-8">{count}</div>

      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        +1 증가시키기
      </button>
    </div>
  )
}
