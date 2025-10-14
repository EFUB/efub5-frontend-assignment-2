'use client'

export default function AboutPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Next-Practice</h1>
      <p className="text-lg leading-relaxed">
        이 페이지는 Next.js의 App Router 기능을 이용해 만든 라우팅 테스트용 페이지입니다.  
        <br />
        정적인 내용만 담고 있지만, Next.js의 클라이언트 컴포넌트로 만들어져 있어
        <strong className="text-blue-500"> React의 인터랙티브한 기능도 추가할 수 있어요.</strong>
      </p>
    </div>
  )
}
