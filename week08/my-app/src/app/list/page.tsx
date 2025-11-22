import type Post from "../models/post";
import type { WithId } from "mongodb";
import axios from "axios";
import Link from "next/link";
import ListItem from "./ListItem";
import NavigationButtons from "@/components/NavButtons";

const List = async () => {
  const readPostList = async (): Promise<WithId<Post>[]> => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/post/readList"
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  const posts: WithId<Post>[] = await readPostList();
  // posts를 활용해서 JSX 반환

  return (
    <div className="list-bg">
      <ListItem result={posts} />
      <div className="text-left">
        <Link
          href="/write"
          className="inline-block bg-blue-300 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors mt-4"
        >
          ✏️ 새 글 쓰기
        </Link>
      </div>
      <NavigationButtons />
    </div>
  );
};

export default List;
