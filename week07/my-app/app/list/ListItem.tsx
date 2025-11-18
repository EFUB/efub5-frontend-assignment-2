'use client';

import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import Link from 'next/link';
import styles from './ListItem.module.css';

export default function ListItem({ result }: { result: WithId<Post>[] }) {
  return (
    <div className={styles.listBg}>
      {result.map((_, i) => (
        <div className={styles.listItem} key={i}>
          <div className={styles.leftSection}>
            <Link href={'/detail/' + result[i]._id}>
              <h4>{result[i].title}</h4>
            </Link>
          </div>
          <div className={styles.rightSection}>
            <Link href={'/edit/' + result[i]._id}>✏️</Link>
            <span
              onClick={async (e) => {
                try {
                  const res = await fetch('/api/post/delete', {
                    method: 'DELETE',
                    body: result[i]._id.toString(),
                  });

                  if (!res.ok) {
                    const data = await res.json();
                    alert(data.message || '삭제 실패');
                    return; // 실패 시 애니메이션 실행 안 함
                  }

                  // 성공일 때만 삭제 애니메이션
                  const target = e.target as HTMLElement;
                  const listItem = target.closest(
                    `.${styles.listItem}`
                  ) as HTMLElement | null;
                  if (listItem) {
                    listItem.style.opacity = '0';
                    setTimeout(() => {
                      listItem.style.display = 'none';
                    }, 1000);
                  }
                } catch (error) {
                  console.error(error);
                  alert('서버 오류로 삭제 실패');
                }
              }}
            >
              🗑️
            </span>

            <p className={styles.date}>1월 1일</p>
          </div>
        </div>
      ))}
    </div>
  );
}
