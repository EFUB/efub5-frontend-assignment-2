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
