{
  /*
import { getPostById } from "@/services/postService";
import type Post from "@/app/models/post";
import NavButtons from "@/components/NavButtons";

interface Props {
  params: Promise<{ id: string }>;
}

const Detail = async ({ params }: Props) => {
  const { id } = await params;
  let post: Post | null = null;
  try {
    post = await getPostById(id);
  } catch (e: any) {
    return <div>에러: {e.message}</div>;
  }

  return (
    <>
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 border-b pb-3">
          {post.title}
        </h1>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>
      </div>
      <div>
        <NavButtons />
      </div>
    </>
  );
};

export default Detail;

*/
}

import type Post from "@/app/models/post";
import type { WithId } from "mongodb";
import axios from "axios";

interface Props {
  params: { id: string; searchParams: string };
}

const Detail = async (props: Props) => {
  const { id } = await props.params;

  const readPostDetail = async (): Promise<WithId<Post>> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/post/readDetail?id=${id}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  const post: WithId<Post> = await readPostDetail();

  return (
    <div>
      <h5>상세 페이지</h5>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.imgUrl && <img src={post.imgUrl} />}
    </div>
  );
};

export default Detail;
