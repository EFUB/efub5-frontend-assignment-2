
import type {NextApiRequest, NextApiResponse } from "next";
import { connectDB} from "@/utils/database"; 
import bcrypt from 'bcrypt'; 

export default async function handler (
  req:NextApiRequest,
  res:NextApiResponse
){
  if(req.method==="POST"){
    const hash=await bcrypt.hash(req.body.password,10);
    req.body.password=hash;
    req.body.role = 'normal'; // 기본 역할을 normal로 설정
    req.body.createdAt = new Date(); // 가입일 추가

    let db=(await connectDB).db("forum");
    await db.collection("user_cred").insertOne(req.body);
    res.status(200).json("성공");
  }
}