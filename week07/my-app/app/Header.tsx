'use client';

import Link from 'next/link';
import LoginBtn from './LoginBtn';
import { Session } from 'next-auth';
import LogoutBtn from './LogoutBtn';
import styles from './Header.module.css';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  display: 'swap',
});

type HeaderProps = { session: Session | null };

export default function Header({ session }: HeaderProps) {
  return (
    <div className={`${styles.navbar} ${openSans.className}`}>
      <Link href='/' className={styles.logo}>
        EFUB5 Forum
      </Link>
      <div className={styles.navLinks}>
        <Link href='/list'>List</Link>
        <Link href='/write'>Write</Link>
        {session ? (
          <span className={styles.userArea}>
            <span>{session.user?.name && `${session.user.name}님`}</span>
            <LogoutBtn />
          </span>
        ) : (
          <LoginBtn />
        )}
      </div>
    </div>
  );
}
