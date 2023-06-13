import type { NextRequest } from 'next/server'
import prisma from '@db/prisma';
import { error, success } from 'utils/responses';

export async function GET(request: NextRequest,context: { params: { id: string; } }) {
  try{
      // const communities =  await prisma.community.findMany()
      return success({id:context.params.id})
  }catch(er){
    return error()
  }
}