"use client";

import type Post from "@/models/post";
import type { WithId } from "mongodb";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const List = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<WithId<Post>[]>([]);

  const readPostList = async () => {
    try {
      const response = await axios.get("/api/post/readList"); // 상대경로 권장
      setPosts(response.data);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      else alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  // 첫 렌더링시 게시글 목록 불러오기
  useEffect(() => {
    readPostList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (_id: string) => {
    try {
      await axios.delete("/api/post/delete", { data: { _id } });
      alert("삭제 완료");
      // 삭제 후 목록 새로고침
      readPostList();
    } catch (error: any) {
      alert(error.response?.data?.message || "삭제 중 오류 발생");
    }
  };

  return (
    <div className="list-bg">
      {posts.map((a) => (
        <div className="list-item" key={a._id.toString()}>
          <Link href={"/detail/" + a._id}>
            <h4>{a.title}</h4>
          </Link>
          <div className="btns-container">
            <Link href={"/edit/" + a._id}>✏️</Link>
            <button
              className="delete-btn"
              onClick={() => {
                if (confirm("정말 삭제하시겠습니까?")) {
                  handleDelete(a._id.toString());
                }
              }}
            >
              🗑️삭제
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
