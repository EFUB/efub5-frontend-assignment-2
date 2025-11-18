'use client';

import { useState } from 'react';

export default function SignUp() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ id, pw }),
    });

    const result = await res.json();
    setMsg(result.message);
  };

  return (
    <div className='p-10'>
      <h4>회원가입</h4>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='아이디'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          placeholder='비밀번호'
          type='password'
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button type='submit'>가입하기</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
