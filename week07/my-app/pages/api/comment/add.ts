import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않은 메서드입니다.' });
  }

  try {
    const { postId, content } = req.body;

    // ✅ postId와 content가 정상적으로 왔는지 확인
    if (!postId || !content || !content.trim()) {
      console.log('🚨 잘못된 요청:', req.body);
      return res.status(400).json({ error: 'postId 또는 content 누락' });
    }

    const db = (await connectDB).db('forum');

    // ✅ postId를 ObjectId로 변환 (유효성 체크 포함)
    const query = ObjectId.isValid(postId)
      ? { postId: new ObjectId(postId) }
      : { postId };

    await db.collection('comments').insertOne({
      ...query,
      content,
      createdAt: new Date(),
    });

    console.log('댓글 추가 성공');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('댓글 추가 실패:', error);
    return res.status(500).json({ error: '댓글 추가 실패' });
  }
}
