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
    const type = req.nextUrl.searchParams.get("type");
    if (type == "user"){
      const user = await prisma.user.findUnique({
        where:{
          email: email
        }
      })
      if (user === null) return inCorrect()
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) return inCorrect()
      const token  = sign({id: user.id,name:user.name,email:user.email,role:user.type,type:type}, String(process.env.JWT_SECRET))
      return success({token},"User logged in successfully") 
    }
    else if (type == "org"){
      const org = await prisma.org.findUnique({
        where:{
          email: email
        }
      })
      if (org === null) return inCorrect()
      const passwordMatch = await bcrypt.compare(password, org.password)
      if (!passwordMatch) return inCorrect()
      const token  = sign({id: org.id,name:org.name,email:org.email,type:type}, String(process.env.JWT_SECRET))
      return success({token},"Org logged in successfully") 
    }else{
      return NextResponse.json({
        status: "failed",
        message:"Provide a valid type"
      },{
        status: 400
      })
    }
  } 
  catch{
    return NextResponse.json({
      status: "failed",
      message:"User cannot be logged in"
    },{
      status: 400
    })
  }   

}