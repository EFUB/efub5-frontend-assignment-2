import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

// 폰트 적용 및 최적화 
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Practice',
  description: '기초 실습용 Next.js 프로젝트',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="p-4 bg-gray-100 flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/counter">Counter</Link>
          <Link href="/image">Image</Link>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
