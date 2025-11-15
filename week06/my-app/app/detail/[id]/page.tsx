import { getPostById } from "@/services/postService";
import type Post from "@/models/post";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

interface Props {
  params: Promise<{ id: string }>; 
}

const Detail = async ({ params }: Props) => {
  const { id } = await params;
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
              <span className={styles.date}>
                {new Date().toLocaleDateString('ko-KR')}
              </span>
            </div>
          </header>
          
          <div className={styles.content}>
            <p>{post.content}</p>
          </div>
        </article>
      </div>
    </>
  );
};

export default Detail;
