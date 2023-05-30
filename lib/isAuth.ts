import {verify,sign} from 'jsonwebtoken';
import type { NextRequest } from 'next/server'


export async function generateToken(data:any){
  return sign(data, String(process.env.JWT_SECRET), {expiresIn: "1h"})
}

export async function isAuth(req:NextRequest) {
  const authHeader = req.headers.get('authorization');
  if(!authHeader) return false
  const token = authHeader.split(' ')[1];
  if(!token) return false
   return verify(token,process.env.JWT_SECRET as string,(err,user) => {
      if(err) return false
      return true
      }
    )
}

