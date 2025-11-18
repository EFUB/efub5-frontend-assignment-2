'use client';

import { useState, useEffect } from 'react';
import styles from './Comment.module.css';
import CommentList from './CommentList';

export default function Comment({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return alert('댓글을 입력해주세요.');
    const res = await fetch('/api/comment/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, content: comment }),
    });
    if (res.ok) {
      setComment('');
      setRefresh((prev) => !prev);
    } else {
      const data = await res.json();
      alert(data.error || '댓글 등록 실패');
    }
  };

  return (
    <div className={styles.commentSection}>
      <div className={styles.commentTitle}>댓글 작성</div>
      <div className={styles.commentForm}>
        <input
          placeholder='댓글을 작성해주세요'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='button'
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          전송
        </button>
      </div>
      <CommentList postId={postId} refresh={refresh} />
    </div>
  );
}
