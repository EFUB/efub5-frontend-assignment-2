import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: '허용되지 않은 요청입니다.' });

  const session = await getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({ message: '로그인이 필요합니다.' });

  const { postId } = req.body;
  const userEmail = session.user?.email;

  const db = (await connectDB).db('forum');
  const post = await db
    .collection('post')
    .findOne({ _id: new ObjectId(postId) });

  if (!post)
    return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });

  // 좋아요를 누르지 않은 경우
  if (!post.likes?.includes(userEmail)) {
    return res.status(400).json({ message: '좋아요를 누른 적이 없습니다.' });
  }

  // 좋아요 목록에서 해당 사용자 제거
  await db
    .collection('post')
    .updateOne({ _id: new ObjectId(postId) }, { $pull: { likes: userEmail } });

  return res.status(200).json({ message: '좋아요 취소 성공' });
}
