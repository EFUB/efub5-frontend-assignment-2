"use client";

{
  /*
import NavButtons from "@/components/NavButtons";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Write() {
  let session = await getServerSession(authOptions);
  if (session) {
    console.log("Server : ", session);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
      <h5 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        ✏️ 작성 페이지
      </h5>

      <form
        action="/api/post/create"
        method="POST"
        className="flex flex-col space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="제목을 입력하세요"
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="content"
          placeholder="내용을 입력하세요"
          required
          rows={6}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors duration-200"
        >
          게시하기
        </button>
      </form>

      <NavButtons />
    </div>
  );
}
*/
}

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Write() {
  const router = useRouter();

  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [src, setSrc] = useState("");

  const handlePost = () => {
    let postContent = { title: title, content: content, imgUrl: src };

    fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify(postContent),
    }).then((res) => {
      router.push("/list");
    });
  };

  return (
    <div className="p-20">
      <h4>글작성</h4>
      <input
        name="title"
        placeholder="글 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        name="content"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          let file = e.target.files?.[0];
          let filename = file ? encodeURIComponent(file.name) : "NoFile";
          let response = await fetch("/api/post/image?file=" + filename);
          const res = await response.json();

          //S3 업로드
          const formData = new FormData();

          Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
            if (typeof value === "string" || value instanceof Blob) {
              formData.append(key, value); // 타입 체크 후 추가
            } else {
              throw new Error(`Invalid value for key "${key}"`);
            }
          });
          let uploadResult = await fetch(res.url, {
            method: "POST",
            body: formData,
          });
          console.log(uploadResult);

          if (uploadResult.ok) {
            setSrc(uploadResult.url + "/" + filename); // 파일명 까지 붙여야 full-url임
          } else {
            console.log("실패");
          }
        }}
      />
      <img src={src} />

      <button
        type="submit"
        className="button-style"
        onClick={() => handlePost()}
      >
        버튼
      </button>
    </div>
  );
}
