import { schema } from '@/validationSchema';
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const validation = schema.safeParse({ email, password });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL!);
    const db = client.db();
    const user = await db.collection('users').findOne({ email });

    if (user) {
      return NextResponse.json('User already exists', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await db.collection('users').insertOne({ email, password: hashedPassword });

    await client.close();

    return NextResponse.json(result, { status: 200, statusText: 'Welcome' });
  } catch (error) {
    return NextResponse.json('Registration Error', { status: 500 });
  }
};
