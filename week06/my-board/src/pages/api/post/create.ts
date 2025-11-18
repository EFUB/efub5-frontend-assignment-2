import type { NextApiHandler } from "next";
import { getPostCollection } from "@/utils/database";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "허용되지 않은 메서드입니다." });
  }

  const { title, content } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ error: "제목과 내용은 필수입니다." });
  }

  try {
    const postCollection = await getPostCollection(); 
    const result = await postCollection.insertOne({
      title,
      content,
      createdAt: new Date(),
    });

    console.log("✅ 새 게시글 추가:", result.insertedId);

    return res.redirect(302, "/list");
  } catch (error) {
    console.error("❌ 게시글 추가 실패:", error);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
};

export default handler;
