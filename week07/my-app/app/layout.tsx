import './globals.css';
import Header from './Header';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import SessionProviderWrapper from './SessionProviderWrapper';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body>
        <SessionProviderWrapper session={session}>
          <Header session={session} />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
