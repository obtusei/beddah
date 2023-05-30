import type { NextRequest } from "next/server";
import  { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/prisma";
import { hash } from "bcrypt";

export async function  POST(req:NextRequest){
  try{

    const {name, email,password} = await req.json();
    
    if (name === undefined || email === undefined || password === undefined){
      return NextResponse.json({
        status: "failed",
        message: "Please provide all the required fields"
      },{
        status: 400
      })
    }

    await prisma.user.create({
      data:{
        name: name,
        email: email,
        password: await hash(password, 10),
      }
    })
    
    return NextResponse.json({
      status: "success",
      message: "User created successfully"
    },{
      status: 201
    })
  }    
    
  catch(err){
    return NextResponse.json({
      status: "failed",
      message:"User cannot be created"
    },{
      status: 400
    })
  }
}