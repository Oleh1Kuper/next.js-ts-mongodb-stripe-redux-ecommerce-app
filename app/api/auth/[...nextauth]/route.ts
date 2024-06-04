import { options } from '@/libs/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(options);

export { handler as GET, handler as POST };
