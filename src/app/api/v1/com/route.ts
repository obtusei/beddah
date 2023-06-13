import { NextResponse, type NextRequest } from 'next/server'
import prisma from '@db/prisma';
import { error, success } from 'utils/responses';

export async function GET(request: NextRequest) {
  try{
    if (request.nextUrl){
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
    }else{
      return NextResponse.json({
        status: 400,
        body: "Bad Request"
      })
    }
  }catch(er){
    return error()
  }
}