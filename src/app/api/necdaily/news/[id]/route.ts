import prisma from '@db/prisma';
import type { NextRequest} from "next/server";
import { error, success } from 'utils/responses';


export async function GET(request: NextRequest,{params:{id}}:{params:{id:string}}) {
  try{
    const news =  await prisma.necNews.findUnique({
      where:{
        id:id
      }
    })
    if (!news) return error()
    return success(news)
  }
  catch{
    return error()
  }
}
