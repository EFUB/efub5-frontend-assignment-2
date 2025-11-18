// next-auth.d.ts
import { DefaultJWT, DefaultSession } from 'next-auth';
declare module 'next-auth' {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    } & DefaultSession['user'];
  }
  interface JWT {
    role?: string;
    user?: {
      name: string;
      email: string;
      role?: string;
    };
  }
}
