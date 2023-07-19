import prisma from '@db/prisma';
import type { NextRequest} from "next/server";
import { error, success } from 'utils/responses';


export async function GET(request: NextRequest) {
  try{
    const news =  await prisma.necNews.findMany()
    return success(news)
  }
  catch{
    return error()
  }
}
