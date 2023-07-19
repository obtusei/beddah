import prisma from "@db/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
  try{
    const allAdoption = await prisma.adopt.findMany();
    return NextResponse.json(allAdoption)
  }
  catch(err){
    return NextResponse.json({
      status: "failed",
      message:"Adopted failed",
    },{status: 400})
  }
}

export async function POST(req:NextRequest){
  try{
    const {dogId, userId} = await req.json();
    const adopt = await prisma.adopt.create({
      data:{
        petId: dogId,
        userId: userId
      }
    })

    if (!adopt) return NextResponse.json({
      status: "failed",
      message:"Adopted failed",
    },{status: 400})

    return NextResponse.json({
      status: "success",
      message:"Adopted successfully",
    })
  }
  catch(err){
    return NextResponse.json({
      status: "failed",
      message:"Adopted failed",
    },{status: 400})
  }

}