import { NextResponse } from 'next/server'

export function unAuthorized(){
  return NextResponse.json({
    status: "unauthorized",
    message: 'You are not authorized to access this route'
  },
  {
  status: 401,
  });
}

export function error(){
  return NextResponse.json({
    status: "failed",
    message: 'Error'
  },
  {
  status: 404,
  });
}

export function inCorrect(){
  return NextResponse.json({
    status: "failed",
    message: 'Incorrect email or password'
  },
  {
  status: 404,
  });
}


export function success(data:any,message?:string){
  return NextResponse.json({
    status: "success",
    message: message ? message : "Success",
    data: data
  },
  {
  status: 200,
  });
}


export function incompleteField(){
  return NextResponse.json({
    status: "incomplete",
    message: "Please provide all the required fields"
  },{
    status: 400
  })
}

