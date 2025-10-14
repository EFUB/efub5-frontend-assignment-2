'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface Comment {
  id: number;
  name: string;
  message: string;
  date: string;
}

export default function GuestBookPage() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert('이름과 메시지를 입력해주세요.');
      return;
    }

    const newComment: Comment = {
      id: Date.now(),
      name,
      message,
      date: new Date().toLocaleString('en-GB', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
    };

    setComments([newComment, ...comments]);
    setName('');
    setMessage('');
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>GuestBook</h1>
      <p className={styles.subtitle}>Please feel free to leave a comment ✨</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder='Message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={styles.textarea}
        />
        <button type='submit' className={styles.button}>
          Post
        </button>
      </form>

      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <strong className={styles.commentName}>{comment.name}</strong>{' '}
            <small className={styles.commentDate}>{comment.date}</small>
            <p className={styles.commentMessage}>{comment.message}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
