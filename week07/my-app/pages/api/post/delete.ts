import { connectDB } from '@/utils/database';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
      }

      const db = (await connectDB).db('forum');
      const postId = req.body;
      const userEmail = session.user?.email;
      const userRole = session.user.role;

      // 게시글 존재 여부 확인
      const post = await db
        .collection('post')
        .findOne({ _id: new ObjectId(postId) });
      if (!post) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
      }

      // 관리자(admin)는 작성자 체크 없이 바로 삭제 가능
      if (userRole !== 'admin') {
        // 일반 유저는 본인 게시글만 삭제 가능
        if (post.author !== userEmail) {
          return res
            .status(403)
            .json({ message: '본인 게시글만 삭제할 수 있습니다.' });
        }
      }

      // 실제 삭제
      await db.collection('post').deleteOne({ _id: new ObjectId(postId) });
      return res.status(200).json({ message: '삭제 완료' });
    } catch (error) {
      console.error('삭제 중 오류:', error);
      return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  } else {
    return res.status(405).json({ message: '허용되지 않은 요청 방식입니다.' });
  }
}
