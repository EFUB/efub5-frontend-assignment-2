"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
}

export default function ReviewForm({ postId }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const isLoading = loading || status === "loading";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) {
      alert("로그인이 필요합니다");
      return;
    }
    if (!content.trim()) return alert("내용을 입력하세요");
    setLoading(true);
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId,
        content,
        author: session.user.email,
      }),
    });
    setLoading(false);

    if (res.ok) {
      setContent("");
      router.refresh();
    } else {
      alert("댓글 등록 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows={3}
        style={{ width: "100%", resize: "none", border: "1px solid lightgrey", borderRadius: "10px" }}
      />
      <button type="submit" disabled={isLoading || !session?.user?.email} className="write-btn">
        작성
      </button>
    </form>
  );
}
