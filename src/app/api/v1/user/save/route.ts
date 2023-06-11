import prisma from "@db/prisma";
import type{ NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try{
    const {dogId, userId} = await req.json();
    await prisma.saved.create({
      data:{
        petId: dogId,
        userId: userId
      }
    })
    return NextResponse.json({
      status: "success",
      message:"Saved successfully",
    },{
      status: 200
    })

  }
  catch(err){
    return NextResponse.json({
      status: "failed",
      message:"Saved failed",
    },{
      status: 400
    })
  }

}