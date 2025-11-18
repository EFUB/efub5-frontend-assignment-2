import type { NextApiHandler } from 'next';
import { WithId, ObjectId } from 'mongodb';
import type Post from '@/models/post';
import { postCollection } from '@/utils/database';

const handler: NextApiHandler<WithId<Post> | { error: string }> = async (
  req,
  res
) => {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res
      .status(400)
      .json({ error: '잘못된 요청입니다. (id 누락 또는 배열)' });
  }

  try {
    // 게시글 찾기
    const result = await postCollection.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
    }

    // likes 필드가 없으면 기본값 [] 추가
    const postWithLikes = {
      ...result,
      likes: result.likes || [],
    };

    return res.status(200).json(postWithLikes);
  } catch (error) {
    console.error('readDetail 오류:', error);
    return res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
  }
};

export default handler;
