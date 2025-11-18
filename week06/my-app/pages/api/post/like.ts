import type { NextApiHandler } from "next";
import { postCollection } from "@/utils/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  const { postId } = req.body;
  
  if (!postId) {
    return res.status(400).json({ error: "게시글 ID가 필요합니다." });
  }

  try {
    const userEmail = session.user?.email;
    
    // 현재 게시글 정보 가져오기
    const post = await postCollection.findOne({ _id: new ObjectId(postId) });
    
    if (!post) {
      return res.status(404).json({ error: "게시글을 찾을 수 없습니다." });
    }

    const likes = post.likes || [];
    const hasLiked = likes.includes(userEmail);

    if (hasLiked) {
      // 좋아요 취소
      await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { 
          $pull: { likes: userEmail },
          $inc: { likeCount: -1 }
        }
      );
      return res.status(200).json({ message: "좋아요가 취소되었습니다.", liked: false });
    } else {
      // 좋아요 추가
      await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { 
          $addToSet: { likes: userEmail },
          $inc: { likeCount: 1 }
        }
      );
      return res.status(200).json({ message: "좋아요가 추가되었습니다.", liked: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "서버 에러가 발생했습니다." });
  }
};

export default handler;