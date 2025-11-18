import { connectDB, postCollection } from '@/utils/database';
import { ObjectId } from 'mongodb';

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const result = await postCollection.findOne({ _id: new ObjectId(id) });

  return (
    <div className='p-20'>
      <h4>게시물을 수정해주세요</h4>
      <form action='/api/post/edit' method='POST'>
        <input name='title' placeholder='제목' defaultValue={result?.title} />
        <input
          name='content'
          placeholder='내용'
          defaultValue={result?.content}
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
