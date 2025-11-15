import type { NextApiHandler } from "next";
import { postCollection } from "@/utils/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

const handler: NextApiHandler = async (req, res) => {
  let session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }

  if (req.method === "POST") {
    const { postId, content } = req.body;
    
    if (!postId || !content) {
      return res.status(400).json({ error: "게시글 ID와 댓글 내용이 필요합니다." });
    }

    try {
      const comment = {
        _id: new ObjectId(),
        content,
        author: session.user?.email,
        createdAt: new Date()
      };

      await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: comment } }
      );

      return res.status(200).json({ message: "댓글이 추가되었습니다.", comment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "서버 에러가 발생했습니다." });
    }
  }

  if (req.method === "DELETE") {
    const { postId, commentId } = req.body;
    
    try {
      await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $pull: { comments: { _id: new ObjectId(commentId) } } }
      );

      return res.status(200).json({ message: "댓글이 삭제되었습니다." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "서버 에러가 발생했습니다." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;