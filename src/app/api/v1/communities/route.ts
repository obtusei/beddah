import prisma from '@db/prisma';
import type { NextRequest} from "next/server";
import { error, success } from 'utils/responses';

export async function GET(request: NextRequest) {
  try{
    const id = request.nextUrl.searchParams.get("id")
    
    // if (id != null){
    //   const community =  await prisma.community.findUnique({
    //     where:{
    //       id:id
    //     }
    //   })
    //   return success(community);
    // }else{
    // const communities = await prisma.community.findMany();
    // return success(communities)
    // }
    return success({
      id:id ? id:"123213",
      com:"communities"
    })
  }
  catch{
    return error()
  }
}
