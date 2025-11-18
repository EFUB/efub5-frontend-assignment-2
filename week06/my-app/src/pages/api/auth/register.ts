import type { NextApiHandler } from "next";
import { userCollection } from "@/utils/database";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ error: "아이디/비밀번호를 입력하세요." });
  }

  try {
    const exists = await userCollection.findOne({ username });
    if (exists) {
      return res.status(409).json({ error: "이미 존재하는 아이디입니다." });
    }

    await userCollection.insertOne({
      username,
      password,
      createdAt: new Date(),
    });

    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "서버 오류" });
  }
};

export default handler;
