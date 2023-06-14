import prisma from "@db/prisma";
import { isAuth } from "@lib/isAuth";
import type{ NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { error, unAuthorized } from "utils/responses";

export async function POST(req:NextRequest){
  try{
    const {dogId, userId} = await req.json();
    const sessionUser = await isAuth(req)
    if (!sessionUser) return unAuthorized()
      await prisma.saved.create({
        data:{
          petId: dogId,
          userId: sessionUser.id
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