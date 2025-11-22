import { connectDB, postCollection } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function Edit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const result = await postCollection.findOne({ _id: new ObjectId(id) });

  return (
    <div className="max-w-xl mx-auto p-10 bg-white rounded-2xl shadow-md">
      <h4 className="text-2xl font-semibold mb-6 text-center">
        ✏️ 수정 페이지
      </h4>

      <form
        action="/api/post/edit"
        method="POST"
        className="flex flex-col space-y-4"
      >
        <input
          name="title"
          placeholder="제목"
          defaultValue={result?.title}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="content"
          placeholder="내용"
          defaultValue={result?.content}
          rows={6}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <input type="hidden" name="_id" defaultValue={result?._id.toString()} />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          수정하기
        </button>
      </form>
    </div>
  );
}
