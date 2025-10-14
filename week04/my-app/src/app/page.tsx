import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const today = new Date().toLocaleDateString("ko-KR");
  return (
    <main style={{ textAlign: "center" }}>
      <h1>🍽 오늘 뭐 먹지? for 이대</h1>
      <p>오늘은 {today} 입니다</p>

      <Image src="/main.png" alt="메인 사진" width={300} height={300} />

      <div style={{ marginTop: "1rem" }}>
        <Link href="/menu" style={{ textDecoration: "underline" }}>
          메뉴 추천 받으러 가기 →
        </Link>
      </div>
    </main>
  );
}
