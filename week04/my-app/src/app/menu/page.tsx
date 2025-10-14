"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MENUS } from "./menus";

export default function MenuPage() {
  const initial = useMemo(
    () => MENUS[Math.floor(Math.random() * MENUS.length)],
    []
  );
  const [pick, setPick] = useState(initial);

  const reroll = () => {
    const next = MENUS[Math.floor(Math.random() * MENUS.length)];
    setPick(next);
  };

  return (
    <div>
      <h1>🍽 오늘의 메뉴 추천</h1>
      <p>제작자 취향 반영 메뉴 리스트</p>

      <div
        style={{ marginTop: "1rem", marginBottom: "1rem", textAlign: "center" }}
      >
        <Image
          src={pick.image}
          alt={pick.name}
          width={320}
          height={220}
          style={{ borderRadius: 12 }}
        />
        <h2 style={{ marginTop: "0.5rem" }}>{pick.name}</h2>
        <p>{pick.desc}</p>

        <button
          onClick={reroll}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          다른 메뉴 추천 받기
        </button>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      <h3>이 서비스에 있는 전체 메뉴</h3>
      <ul style={{ marginTop: "0.7rem", lineHeight: 1.9 }}>
        {MENUS.map((m) => (
          <li key={m.id}>
            <Link href={`/menu/${m.id}`}>{m.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
