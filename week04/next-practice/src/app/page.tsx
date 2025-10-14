'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6">Next Practice에 오신 걸 환영합니다!</h1>
      <p className="text-lg text-center mb-8">
        이 사이트는 Next.js의 App Router, Routing, Image, Layout, 폰트, 상태관리 등  
        다양한 기능들을 연습하기 위한 과제입니다.
      </p>
    </main>
  )
}
