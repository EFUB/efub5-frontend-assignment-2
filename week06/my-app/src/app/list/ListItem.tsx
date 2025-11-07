'use client';

import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import Link from 'next/link';

export default function ListItem({ result }: { result: WithId<Post>[] }) {
  return (
    <>
      {result.map((post) => (
        <div className='list-item' key={post._id.toString()}>
          <Link href={'/detail/' + post._id}>
            <h4>{post.title}</h4>
          </Link>
          <Link href={'/edit/' + post._id}>✏️</Link>
          <span
            onClick={(e) => {
              fetch('/api/post/delete', {
                method: 'DELETE',
                body: post._id.toString(),
              })
                .then((r) => r.json())
                .then(() => {
                  const target = e.target as HTMLElement;
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.opacity = '0';
                    setTimeout(() => {
                      parent.style.display = 'none';
                    }, 1000);
                  }
                });
            }}
          >
            🗑️
          </span>
        </div>
      ))}
    </>
  );
}