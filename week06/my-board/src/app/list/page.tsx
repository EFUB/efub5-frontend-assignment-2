import type Post from "@/models/post";
import type { WithId } from "mongodb";
import axios from "axios";
import Link from "next/link";

const List = async () => {
  const readPostList = async (): Promise<WithId<Post>[]> => {
    try {
      const response = await axios.get("http://localhost:3000/api/post/readList");
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  const posts: WithId<Post>[] = await readPostList();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">📃 게시글 목록</h2>
        <ul className="space-y-4">
          {posts.map((item) => (
            <li
              key={item._id.toString()}
              className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
            >
              <Link href={`/detail/${item._id}`}>
                <h4 className="text-lg font-semibold text-blue-600 hover:underline">
                  {item.title}
                </h4>
              </Link>
              <p className="text-sm text-gray-500 mt-1">🗓️ 1월 1일</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
