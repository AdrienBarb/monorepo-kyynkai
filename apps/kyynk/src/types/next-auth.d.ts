// types/next-auth.d.ts
import NextAuth, { type DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import 'next/server';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      userType: string;
      roles: string[];
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /**
   * Étend l'interface JWT pour inclure des propriétés personnalisées.
   */
  interface JWT {
    id: string;
    email: string;
    userType: string;
    roles: string[];
  }
}

declare module 'next/server' {
  interface NextRequest {
    auth?: {
      user: {
        id: string;
        email: string;
        roles: string[];
      };
    };
  }
}
