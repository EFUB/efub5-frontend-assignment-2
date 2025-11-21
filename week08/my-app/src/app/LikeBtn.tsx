"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

type LikeBtnProps = {
  postId: string;
  likes: string[];
};

export default function LikeBtn({ postId, likes }: LikeBtnProps) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email ?? "";

  // 상태로 좋아요 목록 관리
  const [likeList, setLikeList] = useState<string[]>(likes);
  const [liked, setLiked] = useState(userEmail ? likes.includes(userEmail) : false);

  const handleLike = async () => {
    if (!userEmail) {
      alert("로그인이 필요합니다");
      return;
    }
    if (liked) {
      alert("이미 좋아요를 눌렀습니다");
      return;
    }

    try {
      const res = await fetch("/api/like/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });

      const data = await res.json();
      if (res.ok) {
        setLiked(true);
        setLikeList([...likeList, userEmail]); // 좋아요列表에 사용자 추가하여 count 변화 반영
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("fetch like error:", error);
      alert("네트워크 오류가 발생했습니다");
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked || !userEmail}
      className="like-button"
    >
      {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />} {likeList.length}
    </button>
  );
}
