import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/prisma';
import { User } from '@prisma/client';
import type { NextApiRequest} from "next";

export async function GET(request: Request) {

  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    
  });
  const data = await res.json();
  return NextResponse.json(data,
  {
  status: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },  
  });
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    name: string;
    email:string;
    password:string;
  };
}

export async function POST(request: ExtendedNextApiRequest) {

  // const user = await prisma.user.create({
  //   data:{
  //     name:request.body?.name,
  //     email:request.body?.email,
  //     password:request.body?.password
  //   }
  // })
  
  return NextResponse.json({message:"User created"},
  {
  status: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },  
  });
}

