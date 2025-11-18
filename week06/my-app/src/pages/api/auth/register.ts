
import type { NextApiHandler } from "next";
import { getUserCollection } from "@/utils/database"; 

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "아이디와 비밀번호를 모두 입력하세요." });
    }

    try {
      const userCollection = await getUserCollection();

      const existingUser = await userCollection.findOne({ username: username });
      if (existingUser) {
        return res.status(409).json({ error: "이미 사용 중인 아이디입니다." });
      }

      await userCollection.insertOne({ username, password });

      return res.status(201).json({ message: "회원가입 성공!" });
    } catch (error) {
      console.error("회원가입 API 오류:", error);
      return res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;