import { NextResponse } from 'next/server';
import prisma from '@db/prisma';
import { User } from '@prisma/client';
import type { NextApiRequest} from "next";

export async function GET(request: Request) {

  const users = await prisma.user.findMany();
  
  return NextResponse.json(users,
  {
  status: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },  
  });
}
