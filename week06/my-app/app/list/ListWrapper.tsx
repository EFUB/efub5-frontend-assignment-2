'use client';

import { SessionProvider } from 'next-auth/react';
import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import ListItem from './ListItem';

interface ListWrapperProps {
  result: WithId<Post>[];
}

export default function ListWrapper({ result }: ListWrapperProps) {
  return (
    <SessionProvider>
      <ListItem result={result} />
    </SessionProvider>
  );
}