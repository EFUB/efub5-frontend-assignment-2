'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); 

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('회원가입 성공! 잠시 후 리스트 페이지로 이동합니다.');
      setTimeout(() => {
        router.push('/list'); 
      }, 2000);
    } else {
      setMessage(`오류: ${data.error}`);
    }
  };

  return (
    <div className="p-20">
      <h4>회원가입</h4>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">가입하기</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
}