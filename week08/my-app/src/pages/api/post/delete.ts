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
}