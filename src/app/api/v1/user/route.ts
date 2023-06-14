import { NextRequest, NextResponse } from 'next/server';
import { isAuth } from '@lib/isAuth';

export async function GET(request: NextRequest) {

  const users = await isAuth(request)
  
  return NextResponse.json({
    message:"Hello",
    users:users
  },
  {
  status: 200,
  });
}

