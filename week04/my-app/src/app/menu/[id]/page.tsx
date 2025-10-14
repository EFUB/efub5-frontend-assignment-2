"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { MENUS } from "../menus";
import styles from "./page.module.css";

export default function MenuDetailPage() {
  const params = useParams() as { id?: string };
  const id = params?.id ?? "";
  const menu = MENUS.find((m) => m.id === id);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!menu) return <div>메뉴를 찾을 수 없습니다.</div>;

  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((v) => !v);
  };

  return (
    <div>
      <h1>{menu.name}</h1>

      <Image
        src={menu.image}
        alt={menu.name}
        width={400}
        height={280}
        style={{ borderRadius: 12 }}
      />
      <p style={{ marginTop: "0.5rem" }}>{menu.desc}</p>

      <button
        onClick={handleLike}
        className={`${styles.likeButton} ${
          liked ? styles.liked : styles.unliked
        }`}
      >
        {liked ? "♥ 좋아요" : "♡ 좋아요"} ({likes})
      </button>
    </div>
  );
}
