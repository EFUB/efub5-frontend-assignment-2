// UserUtility.ts

interface User3 {
    name: string;
    age: number;
    email: string;
  }
  
  const user1: Partial<User3> = {
    name: 'Alice',
  };
  
  const user2: Required<User3> = {
    name: 'Bob',
    age: 25,
    email: 'bob@example.com',
  };
  
  function register(user: Required<User3>) {
    console.log('Registering:', user);
  }
  
  register(user2);
  
  const user3: Readonly<User3> = {
    name: 'Charlie',
    age: 40,
    email: 'charlie@example.com',
  };
  
  // user3.age = 41; // ❌ 오류: Readonly
  