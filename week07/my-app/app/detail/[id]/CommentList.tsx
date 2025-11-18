'use client';

import { useEffect, useState } from 'react';
import styles from './Comment.module.css';

interface CommentType {
  _id?: string;
  content: string;
  createdAt?: string;
}

interface Props {
  postId: string;
  refresh: boolean;
}

export default function CommentList({ postId, refresh }: Props) {
  const [comments, setComments] = useState<CommentType[]>([]);

  const fetchComments = async () => {
    const res = await fetch(`/api/comment/read?postId=${postId}`);
    if (res.ok) {
      const data = await res.json();
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId, refresh]);

  return (
    <div className={styles.commentList}>
      <div className={styles.commentCount}>댓글 {comments.length}</div>
      {comments.length > 0 ? (
        comments.map((c, idx) => (
          <div key={c._id || idx} className={styles.commentItem}>
            <p className={styles.commentContent}>{c.content}</p>
            {c.createdAt && (
              <span className={styles.commentDate}>
                {new Date(c.createdAt).toLocaleString()}
              </span>
            )}
          </div>
        ))
      ) : (
        <p className={styles.noComment}>아직 댓글이 없습니다.</p>
      )}
    </div>
  );
}
