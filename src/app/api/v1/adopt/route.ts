import prisma from "@db/prisma";
import { isAuth } from "@lib/isAuth";
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
    const {dogId} = await req.json();
    const sessionUser = await isAuth(req)
    if (sessionUser){
    const adopt = await prisma.adopt.create({
      data:{
        petId: dogId,
        userId: sessionUser.id
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

    
  }else{
    return NextResponse.json({
      status: "failed",
      message:"You need to login first",
    })
  }
}
  catch(err){
    return NextResponse.json({
      status: "failed",
      message:"Adopted failed",
    },{status: 400})
  }

}

export async function DELETE(req:NextRequest){
  try{
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const sessionUser = await isAuth(req)
    if (sessionUser && id){
      await prisma.adopt.delete({
        where:{
          id:String(id),
        }
      })

    return NextResponse.json({
      status: "success",
      message:"Adoption deleted successfully",
    })

    
  }else{
    return NextResponse.json({
      status: "failed",
      message:"You need to login first",
    })
  }
}
  catch(err){
    return NextResponse.json({
      status: "failed",
      message:"Adopted failed",
    },{status: 400})
  }

}