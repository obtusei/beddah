import { NextResponse } from 'next/server';
import prisma from '@db/prisma';
import type { NextRequest} from "next/server";

export async function GET(request: NextRequest) {

  const communities = await prisma.community.findMany();
  
  return NextResponse.json(communities,
  {
  status: 200,
  });
}
