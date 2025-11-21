
"use client";

import { useState } from "react";

export default function EditPage({ result }: any) {
  const [title, setTitle] = useState(result?.title || "");
  const [content, setContent] = useState(result?.content || "");
  const [loading, setLoading] = useState(false);
  const _id = result?._id || "";

  if (!_id) {
    return <div>게시글 정보를 찾을 수 없습니다.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/post/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id,
        title,
        content,
      }),
    });
    setLoading(false);
    
    if (res.ok) {
      alert("수정 완료");
      // 필요하면 페이지 이동 등 추가
    } else {
      alert("수정 실패");
    }
  };

  return (
    <div className="p-20">
      <h4>수정 페이지</h4>
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
        <input style={{ display: "none" }} name="_id" value={_id} readOnly />
        <button type="submit" disabled={loading}>
          버튼
        </button>
      </form>
    </div>
  );
}


