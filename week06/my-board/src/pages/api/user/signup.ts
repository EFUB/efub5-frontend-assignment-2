import { connectDB } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, pw } = JSON.parse(req.body);
    const db = (await connectDB).db('forum');

    const user = await db.collection('user').findOne({ id });
    if (user) {
      return res.status(400).json({ message: '이미 존재하는 아이디입니다' });
    }

    await db.collection('user').insertOne({ id, pw }); // 비밀번호 해시는 생략
    return res.status(200).json({ message: '가입 완료!' });
  }
}
