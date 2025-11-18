import { NextApiHandler } from "next";
import { getPostCollection } from "@/utils/database";
import type { WithId } from "mongodb";
import type Post from "@/models/post";

const handler: NextApiHandler<WithId<Post>[]> = async (req, res) => {
  try {
    const postCollection = await getPostCollection();
    const result = await postCollection.find().toArray();
    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ readList API 에러:", error);
    return res.status(500).json({ message: "서버 에러 발생" } as any);
  }
};

export default handler;
