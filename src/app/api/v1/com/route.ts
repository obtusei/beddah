import type { NextRequest } from 'next/server'
import prisma from '@db/prisma';
import { error, success } from 'utils/responses';

export async function GET(request: NextRequest) {
  try{
      const communities =  await prisma.community.findMany()
      return success(communities)
  }catch(er){
    return error()
  }
}