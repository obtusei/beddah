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

    const type = req.nextUrl.searchParams.get("type");
    if (type == "user"){
      const userExist = await prisma.user.findUnique({
        where:{
          email:email
        }
      })
      
      if (userExist != null) {
        return NextResponse.json({
        status: "failed",
        message: "Email is already registered",
      },{
        status: 404
      }) 
      }
      else {
        const user = await prisma.user.create({
        data:{
          name: name,
          email: email,
          password: await hash(password, 10),
        }
      })
      
      return NextResponse.json({
        status: "success",
        message: "User created successfully",
        data: user
      },{
        status: 201
      })  
      } 
      
    }else if (type == "org"){
      const orgExist = await prisma.org.findUnique({
        where:{
          email:email
        }
      })
      if (orgExist){
        return NextResponse.json({
          status: "failed",
          message: "Email is already registered",
        },{
          status: 404
        }) 
      }
      else{
        const org = await prisma.org.create({
          data:{
            name: name,
            email: email,
            password: await hash(password, 10),
          }
        })
        
        return NextResponse.json({
          status: "success",
          message: "Org created successfully",
          data: org
        },{
          status: 201
        })  
      }
    }else{
      return NextResponse.json({
        status: "failed",
        message: "Please provide the correct type"
      },{
        status: 400
      })
    }
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