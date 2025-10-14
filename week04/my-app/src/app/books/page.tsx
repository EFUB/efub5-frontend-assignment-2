'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './page.module.css';

const books = [
  {
    id: '1',
    title: '잘못된 장소 잘못된 시간',
    author: '질리언 매캘리스터',
    image: '/book1.jpeg',
  },
  {
    id: '2',
    title: '나미야 잡화점의 기적',
    author: '히가시노 게이고',
    image: '/book2.jpg',
  },
  {
    id: '3',
    title: '1984',
    author: '조지 오웰',
    image: '/book3.jpg',
  },
];

export default function BooksPage() {
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (id: string) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Bookshelf</h1>
      <div className={styles.bookContainer}>
        {books.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <div className={styles.bookImage}>
              <Image src={book.image} width={100} height={140} alt={book.title} />
            </div>
            <div className={styles.bookInfo}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <p className={styles.bookAuthor}>{book.author}</p>
            </div>
            <button
              className={`${styles.likeBtn} ${likes[book.id] ? styles.liked : ''}`}
              onClick={() => toggleLike(book.id)}
            >
              {likes[book.id] ? '♥' : '♡'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
