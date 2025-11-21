import { reviewCollection } from "@/utils/database";
import { ObjectId } from "mongodb";

// post_id에 해당하는 댓글 조회 함수
export async function getReviewByPostId(id: string) {
  let post_id: ObjectId;

  try {
    post_id = new ObjectId(id);
  } catch {
    throw new Error("잘못된 게시글 ID입니다.");
  }

  // 댓글 리스트로 가져오기
  return await reviewCollection.find({ post_id }).toArray();
}