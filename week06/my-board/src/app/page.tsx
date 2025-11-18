import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import axios from 'axios';
import ListItem from '@/app/list/ListItem';

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">📃 게시글 목록</h2>
        <ListItem result={result} />
      </div>
    </div>
  );
};

export default List;
