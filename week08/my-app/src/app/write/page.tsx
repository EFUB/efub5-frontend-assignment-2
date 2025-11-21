/*
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Write = async() => {
  let session = await getServerSession(authOptions);
  if (session) {
    console.log("Server: ", session);
  }

  return (
    <div>
    <h5 style={{fontSize: "25px"}}>작성 페이지</h5>
      <form 
        action="api/post/create" 
        method="POST"
        className="writeForm-container"
      >
        <input type="text" name="title" placeholder="제목" required className="write-title" />
        <textarea name="content" placeholder="내용" required className="write-content" />
        <div className="btns-container">
          <button type="submit" className="write-btn">게시</button>
        </div>
      </form>
    </div>
  );
};

export default Write;
*/

"use client";

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
      <div className="write-big-container">
        <div className="write-content-container">
          <input
            name="title"
            placeholder="글 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-container"
          />
          <input
            name="content"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-container"
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

          <button
            type="submit"
            className="button-style"
            onClick={() => handlePost()}
          >
            작성
          </button>
        </div>
        <img src={src} className="newImage" />
      </div>
    </div>
  );
}
