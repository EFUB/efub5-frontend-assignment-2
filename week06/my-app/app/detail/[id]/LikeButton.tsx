'use client';

import { useState } from 'react';

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  userLiked: boolean;
  isLoggedIn: boolean;
}

export default function LikeButton({ postId, initialLikeCount, userLiked, isLoggedIn }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(userLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/post/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        const data = await response.json();
        setLiked(data.liked);
        setLikeCount(prev => data.liked ? prev + 1 : prev - 1);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error('좋아요 처리 에러:', error);
      alert('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <button 
        onClick={handleLike}
        disabled={loading}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          background: liked ? '#ff6b6b' : '#868e96',
          color: 'white',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {liked ? '❤️' : '🤍'} 좋아요 {likeCount}
      </button>
    </div>
  );
}