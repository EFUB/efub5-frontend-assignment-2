import { getPostCollection } from '@/utils/database'; 
import { ObjectId } from 'mongodb';

export default async function Edit({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const postCollection = await getPostCollection();
  const result = await postCollection.findOne({ _id: new ObjectId(id) });

  if (!result) {
    return (
      <div className="p-10 text-center text-gray-500">
        존재하지 않는 게시글입니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8">
        <h4 className="text-2xl font-semibold mb-6 text-center">📝 게시글 수정</h4>

        <form action="/api/post/edit" method="POST" className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">제목</label>
            <input
              name="title"
              placeholder="제목"
              defaultValue={result.title}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">내용</label>
            <textarea
              name="content"
              placeholder="내용"
              defaultValue={result.content}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
          </div>

          <input
            type="hidden"
            name="_id"
            defaultValue={result._id.toString()}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            수정 완료
          </button>
        </form>
      </div>
    </div>
  );
}
