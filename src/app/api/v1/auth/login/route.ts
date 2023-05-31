import type { NextRequest } from "next/server";
import  { NextResponse } from "next/server";
import prisma from "@db/prisma";
import {generateToken} from "lib/isAuth";
import bcrypt from "bcrypt";
import { inCorrect, incompleteField, success } from "utils/responses";
import { sign } from "jsonwebtoken";

export async function POST(req:NextRequest){
  try{
    const {email,password} = await req.json();
    if (email === undefined || password === undefined) return incompleteField()
    const user = await prisma.user.findUnique({
      where:{
        email: email
      }
    })
    if (user === null) return inCorrect()
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return inCorrect()
    const token  = sign({id: user.id,name:user.name,email:user.email,role:user.type}, String(process.env.JWT_SECRET), {expiresIn: "1h"})
    return success({token},"User logged in successfully") 
  } 
  catch{
    return NextResponse.json({
      status: "failed",
      message:"User cannot be created"
    },{
      status: 400
    })
  }   

}