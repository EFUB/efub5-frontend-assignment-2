import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { postCollection } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email)
      return res.status(401).json({ message: "로그인 필요" });

    const { postId } = req.body;
    if (!postId) return res.status(400).json({ message: "postId 필요" });

    const post = await postCollection.findOne({ _id: new ObjectId(postId) });
    if (!post) return res.status(404).json({ message: "게시글 없음" });
    if (post.likes?.includes(session.user.email))
      return res.status(409).json({ message: "이미 좋아요를 누르셨습니다." });

    await postCollection.updateOne(
      { _id: new ObjectId(postId) },
      { $push: { likes: session.user.email } }
    );
    return res.status(200).json({ message: "좋아요 완료" });
  } catch (error) {
    console.error("API like error:", error);
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}
