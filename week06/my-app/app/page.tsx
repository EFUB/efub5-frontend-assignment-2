"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import styles from "@/app/page.module.css";

type Post = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/post/readList");
      if (response.ok) {
        const data = await response.json();
        setPosts(data.slice(0, 5)); // 최근 5개 게시글만
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>게시판</h1>
          
          <div className={styles.quickActions}>
            <button 
              className={styles.actionButton}
              onClick={() => router.push("/write")}
            >
              새 글 작성
            </button>
            <button 
              className={styles.actionButton}
              onClick={() => router.push("/list")}
            >
              모든 글 보기
            </button>
          </div>

          <section className={styles.recentPosts}>
            <h2 className={styles.sectionTitle}>최근 게시글</h2>
            {loading ? (
              <p className={styles.loading}>로딩 중...</p>
            ) : posts.length > 0 ? (
              <div className={styles.postList}>
                {posts.map((post) => (
                  <div 
                    key={post._id} 
                    className={styles.postCard}
                    onClick={() => router.push(`/detail/${post._id}`)}
                  >
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postContent}>
                      {post.content.substring(0, 100)}...
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noPost}>아직 작성된 글이 없습니다.</p>
            )}
          </section>
        </main>
      </div>
    </>
  );
}