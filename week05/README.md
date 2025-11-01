# React → Next.js 마이그레이션 주요 차이점

### 1. 네비게이션 컴포넌트 변경
**React**: `react-router-dom`의 Link
```jsx
import { Link } from 'react-router-dom';
<Link to="/weather">날씨 페이지</Link>
```

**Next.js**: `next/link`의 Link
```jsx
import Link from 'next/link';
<Link href="/weather">날씨 페이지</Link>
```

### 2. 파일 확장자 변경
- `.jsx` → `.tsx` (TypeScript 적용)
- 모든 컴포넌트에 타입 정의 추가

### 3. 클라이언트 컴포넌트 지정
상태를 사용하는 컴포넌트에 `"use client"` 추가
```tsx
"use client";

import React, { useState } from 'react';
// ...
```

## 발생한 오류 해결방법

### localStorage SSR 오류
**문제**: 서버 사이드 렌더링 시 `localStorage is not defined` 오류 발생

**기존 React 코드**:
```jsx
const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
});
```

**Next.js**:
```tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [isClient, setIsClient] = useState(false);

// 클라이언트에서만 localStorage 접근
useEffect(() => {
  setIsClient(true);
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    setTodos(JSON.parse(savedTodos));
  }
}, []);

useEffect(() => {
  if (isClient) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}, [todos, isClient]);
```

## TypeScript 타입 정의
```typescript
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

interface TodoTemplateProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
```