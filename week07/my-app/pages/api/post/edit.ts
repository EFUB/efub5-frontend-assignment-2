import { connectDB } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: '로그인이 필요합니다.' });
    }

    const db = (await connectDB).db('forum');

    // 수정할 대상 글 가져오기
    const post = await db
      .collection('post')
      .findOne({ _id: new ObjectId(req.body._id) });

    if (!post) {
      return res.status(404).json({ error: '존재하지 않는 글입니다.' });
    }

    // 관리자(admin)는 모든 글 수정 가능
    if (session.user.role !== 'admin') {
      // 일반 유저는 작성자(author)만 수정 가능
      if (post.author !== session.user.email) {
        return res.status(403).json({ error: '수정 권한이 없습니다.' });
      }
    }

    const newDocument = {
      title: req.body.title,
      content: req.body.content,
    };

    await db
      .collection('post')
      .updateOne({ _id: new ObjectId(req.body._id) }, { $set: newDocument });

    return res.redirect(302, '/list');
  }
}
