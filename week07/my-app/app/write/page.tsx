import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import styles from './FormPage.module.css';
import Link from 'next/link';

const Write = async () => {
  const session = await getServerSession(authOptions);

  // 로그인 안 한 경우
  if (!session) {
    return (
      <div className={styles.formPage}>
        <h5 className={styles.title}>게시글 작성</h5>
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
          게시글을 작성하려면 로그인이 필요합니다.
        </p>
        <Link href='/login' className={styles.loginBtn}>
          로그인하러 가기 →
        </Link>
      </div>
    );
  }

  // 로그인된 사용자일 때만 폼 렌더링
  return (
    <div className={styles.formPage}>
      <h5 className={styles.title}>게시글 작성</h5>
      <form action='/api/post/create' method='POST'>
        <input
          type='text'
          name='title'
          placeholder='제목을 입력하세요'
          required
        />
        <textarea name='content' placeholder='내용을 입력하세요' required />
        <button type='submit'>게시</button>
      </form>
    </div>
  );
};

export default Write;
