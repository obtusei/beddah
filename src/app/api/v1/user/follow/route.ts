import prisma from "@db/prisma";
import { isAuth } from "@lib/isAuth";
import type{ NextRequest } from "next/server";
import { error, success, unAuthorized } from "utils/responses";

export async function POST(req:NextRequest){
  // try{
  //   const {comId} = await req.json();
  //   const sessionUser = await isAuth(req)
  //   if (!sessionUser) return unAuthorized()
  //   const ids = {comId:comId,userId:sessionUser.id}
  //   const doesLikeExist = await prisma.saved.findUnique({where:{
      
  //   }})
  //   if (doesLikeExist) await prisma.saved.delete({where:{userId_petId:ids}})
  //   else await prisma.saved.create({data:ids})
  //   return success({status:"success"})
  // }
  // catch(err){ return error() }
}