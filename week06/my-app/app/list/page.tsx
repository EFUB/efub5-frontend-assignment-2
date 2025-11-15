import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import axios from 'axios';
import ListWrapper from './ListWrapper';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

const List = async () => {
  const readPostList = async (): Promise<WithId<Post>[]> => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/post/readList'
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  };

  const result: WithId<Post>[] = await readPostList();

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>게시글 목록</h1>
        </div>
        <div className={styles.content}>
          <ListWrapper result={result} />
        </div>
      </div>
    </>
  );
};

export default List;