import { getPostById } from "@/services/postService";
import type Post from "@/models/post";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

interface Props {
  params: Promise<{ id: string }>; 
}

const Detail = async ({ params }: Props) => {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  let post: Post | null = null;
  try {
    post = await getPostById(id);
  } catch (e: any) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.errorMessage}>
            에러: {e.message}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <article className={styles.article}>
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span className={styles.author}>작성자: {post.author}</span>
              <span className={styles.date}>
                {new Date(post.createdAt || new Date()).toLocaleDateString('ko-KR')}
              </span>
            </div>
          </header>
          
          <div className={styles.content}>
            <p>{post.content}</p>
          </div>

          <div className={styles.actions}>
            <LikeButton 
              postId={id} 
              initialLikeCount={post.likeCount || 0}
              userLiked={post.likes?.includes(session?.user?.email || '') || false}
              isLoggedIn={!!session}
            />
          </div>

          <CommentSection 
            postId={id} 
            initialComments={post.comments || []}
            isLoggedIn={!!session}
            userEmail={session?.user?.email}
          />
        </article>
      </div>
    </>
  );
};

export default Detail;
