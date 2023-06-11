import prisma from "@db/prisma";
import type { NextRequest } from "next/server";


export async function POST(req:NextRequest){
  const {dogId, userId} = await req.json();
  const adopt = await prisma.adopt.create({
    data:{
      petId: dogId,
      userId: userId
    }
  })

}