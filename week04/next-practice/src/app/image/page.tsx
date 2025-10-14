'use client'

import Image from 'next/image'

export default function ImagePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
      <h1 className="text-xl font-bold mb-6">🐹 리쿠 🐹</h1>

      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800">
        <Image
          src="/riku.jpg"
          alt="리쿠"
          width={250}
          height={250}
          placeholder="blur"
          blurDataURL="/riku.jpg"
          className="object-cover"
        />
      </div>
    </div>
  )
}
