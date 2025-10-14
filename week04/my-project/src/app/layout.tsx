import './globals.css';
import Link from 'next/link';
import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko' className={ubuntu.className}>
      <body>
        <header className='header'>
          <nav className='nav'>
            <Link href='/'>Home</Link>
            <Link href='/guest'>Guest</Link>
            <Link href='/about'>About</Link>
          </nav>
        </header>

        <main className='main'> {children}</main>
        <footer className='footer'>
          © {new Date().getFullYear()} My Blog. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
