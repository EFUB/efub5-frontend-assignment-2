import { connectDB, postCollection } from '@/utils/database';
import { ObjectId } from 'mongodb';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const result = await postCollection.findOne({ _id: new ObjectId(id) });

  if (!result) {
    return (
      <>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.errorMessage}>
            게시글을 찾을 수 없습니다.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>게시글 수정</h1>
        </div>
        
        <div className={styles.formContainer}>
          <form action='/api/post/edit' method='POST' className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="title" className={styles.label}>제목</label>
              <input 
                name='title' 
                id="title"
                placeholder='게시글 제목을 입력해주세요' 
                defaultValue={result?.title}
                required
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="content" className={styles.label}>내용</label>
              <textarea
                name='content'
                id="content"
                placeholder='게시글 내용을 입력해주세요'
                defaultValue={result?.content}
                required
                className={styles.textarea}
                rows={10}
              />
            </div>
            
            <input
              style={{ display: 'none' }}
              name='_id'
              defaultValue={result?._id.toString()}
            />
            
            <div className={styles.buttonGroup}>
              <button type="button" className={styles.cancelButton}>
                취소
              </button>
              <button type='submit' className={styles.submitButton}>
                수정하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
