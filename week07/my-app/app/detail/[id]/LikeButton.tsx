'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './Detail.module.css';

export default function LikeButton({
  postId,
  initialLikes,
  initiallyLiked = false,
}: {
  postId: string;
  initialLikes: number;
  initiallyLiked?: boolean;
}) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initiallyLiked);

  const handleToggleLike = async () => {
    if (!session) return alert('로그인이 필요합니다.');

    const endpoint = liked ? '/api/post/unlike' : '/api/post/like';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });

      if (res.ok) {
        setLikes((prev) => prev + (liked ? -1 : 1));
        setLiked((prev) => !prev);
      } else {
        const data = await res.json();
        alert(data.message || '실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류 발생');
    }
  };

  return (
    <button onClick={handleToggleLike} className={styles.likeBtn}>
      {liked ? '❤️' : '🤍'} {likes}
    </button>
  );
}
