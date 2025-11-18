import type { NextApiHandler } from 'next';
import { postCollection } from '@/utils/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않은 요청 방식입니다.' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: '로그인이 필요합니다.' });
  }

  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: '제목과 내용은 필수입니다.' });
  }

  try {
    const result = await postCollection.insertOne({
      title,
      content,
      author: session.user.email,
      likes: [],
      createdAt: new Date(),
    });

    return res.redirect(302, '/list');
  } catch (error) {
    console.error('게시글 작성 오류:', error);
    return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
};

export default handler;
