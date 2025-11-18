import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "지원하지 않는 메서드입니다" });
  }

  let session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ messae: "로그인 필요" });
  }

  const { _id, author } = req.body;

  const db = (await connectDB).db("forum");
  const post = await db.collection("post").findOne({ _id: new ObjectId(_id) });
  if (!post) return res.status(404).json({ message: "게시글 없음" });

  // 관리자 또는 본인인 경우에만 삭제 가능
  if (session.user.role !== "admin" && session.user.email !== post.author) {
    return res.status(403).json({ message: "권한 없음" });
  }

  try {
    await db.collection("post").deleteOne({ _id: new ObjectId(_id) });
    return res.status(200).json({ message: "삭제 완료" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}