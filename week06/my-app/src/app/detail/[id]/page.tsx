import { useState } from "react";
import { getPostById } from "@/services/postService";
import { getReviewByPostId } from "@/services/reviewService";
import type Post from "@/models/post";
import type Review from "@/models/review";
import ReviewItem from "@/app/reviewComponents/ReviewItem";
import { getServerSession } from "next-auth";
import LikeBtn from "@/app/LikeBtn";
import ReviewForm from "@/app/reviewComponents/ReviewForm";

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

  let reviews: Review[] = [];
  try {
    reviews = await getReviewByPostId(id);
  } catch (e: any) {
    return <div>에러: {e.message}</div>
  }

  console.log("좋아요:", post.likes);

  return (
    <div className="post-container">
      <div className="postdetail-container">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>

      <div className="line" />

      <div className="likeBtn-container">
        <LikeBtn postId={id} likes={post?.likes || []} />
      </div>

      <div className="line" />

      <div className="comment-container">
        <ReviewForm postId={id} />
        {/* 댓글 목록 */}
        <ReviewItem result={reviews} />
      </div>
    </div>
  );
};

export default Detail;