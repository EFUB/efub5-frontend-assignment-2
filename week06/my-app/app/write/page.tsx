/*import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const Write = async () => {
  let session = await getServerSession(authOptions);
  if (session) {
    console.log("Server: ", session);
  }
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>새 글 작성</h1>
          <p className={styles.description}>
            새로운 게시글을 작성해보세요.
          </p>
        </div>
        
        <div className={styles.formContainer}>
          <form action="api/post/create" method="POST" className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="title" className={styles.label}>제목</label>
              <input 
                type="text" 
                name="title" 
                id="title"
                placeholder="게시글 제목을 입력해주세요"
                required 
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="content" className={styles.label}>내용</label>
              <textarea 
                name="content" 
                id="content"
                placeholder="게시글 내용을 입력해주세요"
                required 
                className={styles.textarea}
                rows={10}
              />
            </div>
            
            <div className={styles.buttonGroup}>
              <button type="button" className={styles.cancelButton}>
                취소
              </button>
              <button type="submit" className={styles.submitButton}>
                게시하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Write;*/

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Write() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [src, setSrc] = useState("");

  const handlePost = () => {
    const postContent = {
      title: title,
      content: content,
      imgUrl: src,
    };

    fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify(postContent),
    }).then(() => {
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

      {/* 파일 업로드 */}
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const safeFilename = `${Date.now()}-${file.name.replace(
            /[^a-zA-Z0-9.]/g,
            "_"
          )}`;

          // presigned POST 요청
          const response = await fetch("/api/post/image?file=" + safeFilename);
          const res = await response.json(); // { url, fields }

          // FormData 생성
          const formData = new FormData();
          Object.entries(res.fields).forEach(([key, value]) => {
            formData.append(key, value as string);
          });

          // ⛔ 반.드.시 마지막에 추가해야 함!
          formData.append("file", file);

          // 디버그 로그
          for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }

          // S3로 업로드
          const uploadResult = await fetch(res.url, {
            method: "POST",
            body: formData,
          });

          console.log(uploadResult);

          if (uploadResult.ok) {
            const bucketName =
              process.env.NEXT_PUBLIC_BUCKET_NAME || "seminar-test-s3";
            setSrc(
              `https://${bucketName}.s3.ap-northeast-2.amazonaws.com/${res.fields.key}`
            );
          } else {
            console.log("실패");
          }
        }}
      />

      {src && <img src={src} alt="업로드된 이미지" />}

      <button type="submit" className="button-style" onClick={handlePost}>
        버튼
      </button>
    </div>
  );
}
