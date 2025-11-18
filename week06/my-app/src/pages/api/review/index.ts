import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { reviewCollection } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { postId } = req.query;
    if (!postId || typeof postId !== "string") return res.status(400).json({ message: "postId 필요" });

    const reviews = await reviewCollection.find({ post_id: new ObjectId(postId) }).toArray();
    res.status(200).json(reviews);
  } else if (req.method === "POST") {
    const { postId, content, author } = req.body;
    if (!postId || !content || !author) return res.status(400).json({ message: "필수 데이터 누락" });

    const newReview = { post_id: new ObjectId(postId), content, author };
    await reviewCollection.insertOne(newReview);
    res.status(201).json({ message: "댓글 등록 완료" });
  } else {
    res.status(405).json({ message: "지원하지 않는 메서드" });
  }
}
