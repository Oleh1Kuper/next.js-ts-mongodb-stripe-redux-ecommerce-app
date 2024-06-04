import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { schema } from '@/validationSchema';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import clientPromise from './mongodb';

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validation = schema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!validation.success) {
          throw new Error('Provide valid credentials');
        }

        const client = await MongoClient.connect(process.env.MONGODB_URL!);
        const db = client.db();
        const user = await db
          .collection('users')
          .findOne({ email: credentials?.email });

        if (!user) {
          client.close();
          throw new Error('User is not found');
        }

        const isMatched = await bcrypt.compare(credentials?.password!, user.password);

        if (!isMatched) {
          client.close();
          throw new Error('Incorrect password');
        }

        client.close();

        return {
          id: user._id.toString(),
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};
