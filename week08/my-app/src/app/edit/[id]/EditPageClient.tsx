"use client";

import { useState } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
}

interface Props {
  result: Post;
}

export default function EditPageClient({ result }: Props) {
  const [title, setTitle] = useState(result.title);
  const [content, setContent] = useState(result.content);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/post/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: result._id,
        title,
        content,
      }),
    });

    setLoading(false);

    if (res.ok) {
      alert("수정 완료!");
      // 필요 시 페이지 이동: 예) window.location.href = `/post/${result._id}`;
    } else {
      const data = await res.json();
      alert(`수정 실패: ${data.message}`);
    }
  };

  return (
    <div className="p-20">
      <h4>게시글 수정</h4>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="content"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "수정 중..." : "수정"}
        </button>
      </form>
    </div>
  );
}
