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
    const postContent = { title, content, imgUrl: src };

    fetch("/api/post/new", {
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

      {/* presigned POST 방식 S3 업로드 */}
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const filename = `${Date.now()}-${file.name}`;

          // 1) 서버에서 presigned POST 정보 가져오기 (fileType은 URL params 대신 body로!)
          const res = await fetch("/api/post/image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              filename,
              fileType: file.type, // fields.Content-Type 생성될 때 필요함
            }),
          });

          const presigned = await res.json();

          // 2) FormData 만들기
          const formData = new FormData();
          Object.entries(presigned.fields).forEach(([key, value]) => {
            formData.append(key, value as string);
          });

          // 3) 마지막에 file 추가 (Content-Type 포함됨)
          formData.append("file", file);

          // 4) S3에 업로드
          const upload = await fetch(presigned.url, {
            method: "POST",
            body: formData,
          });

          if (upload.ok) {
            const imgUrl = `${presigned.url}/${presigned.fields.key}`;
            setSrc(imgUrl);
          }
          else {
            console.error("S3 Upload Failed");
          }
        }}
      />

      {src && <img src={src} alt="Uploaded" />}

      <button type="submit" className="button-style" onClick={handlePost}>
        버튼
      </button>
    </div>
  );
}
