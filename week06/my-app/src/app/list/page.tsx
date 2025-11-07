import type Post from '@/models/post';
import type { WithId } from 'mongodb';
import ListItem from '@/app/list/ListItem';

export const dynamic = 'force-dynamic'; 

const List = async () => {
  
  const res = await fetch('http://localhost:3000/api/post/readList', { 
    cache: 'no-store' 
  });
  
  const result: WithId<Post>[] = await res.json();
  console.log("1. 서버(page.tsx)가 받은 데이터:", result);

  return (
    <div className='list-bg'>
      <ListItem result={result} />
    </div>
  );
};

export default List;