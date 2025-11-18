import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '허용되지 않은 메서드입니다.' });
  }

  const { postId } = req.query;

  if (!postId || Array.isArray(postId)) {
    return res.status(400).json({ error: '잘못된 요청입니다.' });
  }

  try {
    const db = (await connectDB).db('forum');

    // ObjectId 변환 시 에러 방지를 위해 유효성 검사 추가
    let query: any = {};
    if (ObjectId.isValid(postId)) {
      query = { postId: new ObjectId(postId) };
    } else {
      query = { postId };
    }

    const comments = await db
      .collection('comments')
      .find(query)
      .sort({ createdAt: -1 }) // 최신순 정렬
      .toArray();

    return res.status(200).json(comments);
  } catch (e) {
    console.error('댓글 조회 실패:', e);
    return res.status(500).json({ error: '댓글 조회 실패' });
  }
}
