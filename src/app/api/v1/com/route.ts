import type { NextRequest } from 'next/server'
import prisma from '@db/prisma';
import { error, success } from 'utils/responses';

export async function GET(request: NextRequest) {
  try{
    const id = request.nextUrl.searchParams.get("id")
    if (id != null){
      const dog =  await prisma.pet.findUnique({
        where:{
          id:id
        }
      })
      return success(dog)
    }else{
      const dogs =  await prisma.pet.findMany()
      return success(dogs)
    }
  }catch(er){
    return error()
  }
}