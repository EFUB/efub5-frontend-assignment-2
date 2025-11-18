'use client';

import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import Link from 'next/link';
import styles from './ListItem.module.css';
import { useSession } from 'next-auth/react';

export default function ListItem({ result }: { result: WithId<Post>[] }) {
  const { data: session } = useSession();

  const handleDelete = (id: string, e: React.MouseEvent) => {
    if (confirm('삭제하시겠습니까?')) {
      fetch('/api/post/delete', {
        method: 'DELETE',
        body: id,
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then(error => Promise.reject(error));
          }
          return response.json();
        })
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
          alert(error.error || '삭제에 실패했습니다.');
        });
    }
  };

  const canEditOrDelete = (post: WithId<Post>) => {
    if (!session) return false;
    // 작성자이거나 관리자인 경우 수정/삭제 가능
    return post.author === session.user?.email;
    // 관리자 권한은 서버에서 체크하므로 클라이언트에서는 작성자만 체크
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
                {canEditOrDelete(post) && (
                  <>
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
                  </>
                )}
              </div>
            </div>
            <p className={styles.postContent}>
              {post.content.substring(0, 150)}
              {post.content.length > 150 ? '...' : ''}
            </p>
            <div className={styles.postMeta}>
              <span className={styles.postAuthor}>작성자: {post.author}</span>
              <span className={styles.postDate}>
                {new Date(post.createdAt || new Date()).toLocaleDateString('ko-KR')}
              </span>
              <span className={styles.postLikes}>❤️ {post.likeCount || 0}</span>
              <span className={styles.postComments}>💬 {post.comments?.length || 0}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
