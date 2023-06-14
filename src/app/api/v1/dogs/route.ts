import type { NextRequest } from 'next/server'
import prisma from '@db/prisma';
import { error, success } from 'utils/responses';
import { isAuth } from '@lib/isAuth';

export async function GET(request: NextRequest) {
  try{
    const id = request.nextUrl.searchParams.get("id")
    const sessionUser = await isAuth(request)
    if (id != null){
      const dog =  await prisma.pet.findUnique({
        where:{
          id:id
        }
      })
      return success(dog)
    }else{
      const dogs =  await prisma.pet.findMany({
        include:{
          Saved:{
            select:{
              User:{
                select:{
                  id:true
                }
              }
            }
          }
        }
      })
        const hehe = await Promise.all(dogs.map(async (dog) => {
          if (sessionUser){
          const savedItem = await prisma.saved.findUnique({
            where:{
                userId_petId:{
                  userId:sessionUser?.id,
                  petId:dog.id
                }
            }
          })
          if (!savedItem) return {dog}
          return {dog,isSaved:true}
        }
        return {dog}

        }))
        return success(hehe)
      
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