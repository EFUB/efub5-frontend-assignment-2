import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import axios from 'axios';
import styles from './Detail.module.css';
import Link from 'next/link';
import LikeButton from './LikeButton';
import Comment from './Comment';

interface Props {
  params: Promise<{ id: string }>;
}

const Detail = async ({ params }: Props) => {
  const { id } = await params;

  const readPostDetail = async (): Promise<WithId<Post>> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/readDetail?id=${id}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  };

  const post: WithId<Post> = await readPostDetail();

  return (
    <div className={styles.detailPage}>
      <h5 className={styles.subtitle}>상세 페이지</h5>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.content}>{post.content}</p>

      <div className={styles.buttonContainer}>
        <LikeButton postId={id} initialLikes={post.likes?.length || 0} />
        <Link href='/list' className={styles.backBtn}>
          ← 목록으로 돌아가기
        </Link>
      </div>
      <Comment postId={id} />
    </div>
  );
};

export default Detail;
