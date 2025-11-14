import Navbar from '@/components/Navbar';
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

export default Write;
