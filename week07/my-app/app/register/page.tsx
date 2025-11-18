'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Register.module.css';

export default function Register() {
  return (
    <div className={styles.registerPage}>
      <h5 className={styles.title}>회원가입</h5>
      <form method='POST' action='/api/auth/register'>
        <input name='name' type='text' placeholder='이름' required />
        <input name='email' type='email' placeholder='이메일' required />
        <input
          name='password'
          type='password'
          placeholder='비밀번호'
          required
        />
        <button type='submit'>가입하기</button>
      </form>
    </div>
  );
}
