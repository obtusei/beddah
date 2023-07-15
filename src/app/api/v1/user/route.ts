import { NextRequest, NextResponse } from 'next/server';
import { isAuth } from '@lib/isAuth';
import prisma from '@db/prisma';

export async function GET(request: NextRequest) {

  const users = await prisma.user.findMany()
  
  return NextResponse.json({
    message:"Hello",
    users:users
  },
  {
  status: 200,
  });
}

