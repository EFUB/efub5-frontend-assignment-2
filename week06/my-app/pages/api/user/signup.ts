import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/database";
import { Collection } from "mongodb";

const DB_NAME: string = process.env.NEXT_PUBLIC_DB_NAME || "";

type User = {
  username: string;
  password: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const connection = await connectDB;
    const db = connection.db(DB_NAME);
    const usersCollection: Collection<User> = db.collection("users");

    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "이미 존재하는 사용자입니다." });
    }

    await usersCollection.insertOne({ username, password });

    return res.status(201).json({ message: "회원 가입이 완료되었습니다!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
