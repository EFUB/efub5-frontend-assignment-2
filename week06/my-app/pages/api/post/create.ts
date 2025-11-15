import type { NextApiHandler } from "next";
import { postCollection } from "@/utils/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler: NextApiHandler = async (req, res) => {
  let session = await getServerSession(req, res, authOptions);

  if(session){
    req.body.author = session.user?.email;
    req.body.likes = []; // 좋아요 배열 초기화
    req.body.likeCount = 0; // 좋아요 수 초기화
    req.body.comments = []; // 댓글 배열 초기화
    req.body.createdAt = new Date(); // 생성일 추가
  }
  console.log(req.body);
  
  if (req.method === "POST") {
    if (!req.body.title || !req.body.content) {
      return res.status(500).json({ error: "빈 형식이 있습니다." });
    }
    try {
      const result = await postCollection.insertOne(req.body);
      return res.redirect(302, "/list");
    } catch (error) {
      console.error(error);
    }
  }
};

export default handler;

