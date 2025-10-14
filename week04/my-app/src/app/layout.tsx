import './globals.css';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Roboto({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${roboto.className}`}>
        <header className='header'>
          <nav className='nav'>
            <Link href='/'>Home</Link>
            <Link href='/books'>Books</Link>
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
