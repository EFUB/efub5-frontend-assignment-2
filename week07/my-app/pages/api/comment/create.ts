import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: '허용되지 않은 요청' });

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: '로그인이 필요합니다.' });

  const { postId, content } = req.body;
  if (!postId || !content)
    return res.status(400).json({ error: '잘못된 요청입니다.' });

  try {
    const db = (await connectDB).db('forum');
    const newComment = {
      postId: new ObjectId(postId),
      content,
      author: session.user?.email,
      createdAt: new Date(),
    };

    await db.collection('comments').insertOne(newComment);
    return res.status(200).json({ message: '댓글 등록 성공' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: '서버 내부 오류' });
  }
}
