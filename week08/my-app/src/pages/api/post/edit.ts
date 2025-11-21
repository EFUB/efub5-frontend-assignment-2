import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "지원하지 않는 메서드" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ message: "로그인 필요" });
  }

  const { _id, title, content } = req.body;
  if (!_id || !title || !content) {
    return res.status(400).json({ message: "필수 필드 누락" });
  }

  const db = (await connectDB).db("forum");
  const post = await db.collection("post").findOne({ _id: new ObjectId(_id) });
  if (!post) {
    return res.status(404).json({ message: "게시글 없음" });
  }

  // 권한 체크: 관리자 or 본인만 가능
  if (session.user.role !== "admin" && session.user.email !== post.author) {
    return res.status(403).json({ message: "권한 없음" });
  }

  try {
    await db.collection("post").updateOne(
      { _id: new ObjectId(_id) },
      { $set: { title, content } }
    );
    return res.status(200).json({ message: "수정 완료" });
  } catch (error) {
    console.error("수정 API 에러:", error);
    return res.status(500).json({ message: "서버 에러 발생" });
  }
}
