'use client';

import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import Link from 'next/link';
import styles from './ListItem.module.css';

export default function ListItem({ result }: { result: WithId<Post>[] }) {
  const handleDelete = (id: string, e: React.MouseEvent) => {
    if (confirm('삭제하시겠습니까?')) {
      fetch('/api/post/delete', {
        method: 'DELETE',
        body: id,
      })
        .then((r) => r.json())
        .then(() => {
          const target = e.target as HTMLElement;
          const parent = target.closest(`.${styles.listItem}`);
          if (parent) {
            parent.classList.add(styles.fadeOut);
            setTimeout(() => {
              parent.remove();
            }, 300);
          }
        })
        .catch((error) => {
          console.error('삭제 실패:', error);
          alert('삭제에 실패했습니다.');
        });
    }
  };

  return (
    <div className={styles.listContainer}>
      {result.length === 0 ? (
        <div className={styles.emptyState}>
          <p>아직 작성된 게시글이 없습니다.</p>
          <Link href="/write" className={styles.writeButton}>
            첫 번째 글 작성하기
          </Link>
        </div>
      ) : (
        result.map((post) => (
          <div className={styles.listItem} key={post._id.toString()}>
            <div className={styles.postHeader}>
              <Link href={`/detail/${post._id}`} className={styles.titleLink}>
                <h3 className={styles.postTitle}>{post.title}</h3>
              </Link>
              <div className={styles.actions}>
                <Link href={`/edit/${post._id}`} className={styles.editButton} title="수정">
                  ✏️
                </Link>
                <button
                  onClick={(e) => handleDelete(post._id.toString(), e)}
                  className={styles.deleteButton}
                  title="삭제"
                >
                  🗑️
                </button>
              </div>
            </div>
            <p className={styles.postContent}>
              {post.content.substring(0, 150)}
              {post.content.length > 150 ? '...' : ''}
            </p>
            <div className={styles.postMeta}>
              <span className={styles.postDate}>
                {new Date().toLocaleDateString('ko-KR')}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
