import { connectDB, postCollection } from '@/utils/database';
import { ObjectId } from 'mongodb';
import styles from '../../write/FormPage.module.css';

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const result = await postCollection.findOne({ _id: new ObjectId(id) });

  return (
    <div className={styles.formPage}>
      <h5 className={styles.title}>게시글 수정</h5>
      <form action='/api/post/edit' method='POST'>
        <input
          type='text'
          name='title'
          placeholder='제목'
          defaultValue={result?.title}
          required
        />
        <textarea
          name='content'
          placeholder='내용'
          defaultValue={result?.content}
          required
        />
        <input
          style={{ display: 'none' }}
          name='_id'
          defaultValue={result?._id.toString()}
        />
        <button type='submit'>수정 완료</button>
      </form>
    </div>
  );
}
