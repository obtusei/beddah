import { NextResponse } from 'next/server';
// import prisma from '@db/prisma';
import type { NextRequest} from "next/server";
import communities from '@lib/communities.json';

export async function GET(request: NextRequest) {

  // const users = await prisma.community.findMany();
  
  return NextResponse.json(communities,
  {
  status: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },  
  });
}
