import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import { isAuth } from 'lib/isAuth';
import prisma from '@db/prisma';
import { error, success } from 'utils/responses';

export async function GET(request: NextRequest) {
  // const canAccess = await isAuth(request)
  
  // if (!canAccess) return NextResponse.json({
  //   error: true,
  //   message: 'You are not authorized to access this route'
  // },
  // {
  // status: 401,
  // });
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

export async function POST(request: NextRequest) {
  try{

    const {name,bio,age,breed,gender,image}:any = await request.json();
    if (name === undefined || name == "") return error()
    const newDog = await prisma.pet.create({
        data:{
          name:name,
          bio:bio,
          age: age,
          breed: breed,
          gender: gender,
          image: image,
        }
      })
      return success(newDog,"Dog created successfully")
    }
    catch(e){
      return error()
    }
}

export async function DELETE(request: NextRequest) {
  try{

    const {name,bio,age,breed,gender,image}:any = await request.json();
    if (name === undefined || name == "") return error()
    const newDog = await prisma.pet.delete({
        where:{
          id:"12323"
        }
      })
      return success(newDog,"Dog created successfully")
    }
    catch(e){
      return error()
    }
}