import type { NextRequest} from "next/server";
import { error, success } from 'utils/responses';

export async function GET(request: NextRequest) {
  try{
    const communityId = request.nextUrl.toString()
    if (communityId != null){
      return success({
        com:"community",
        id:communityId
      })
    } 
    return success({
      com:"communities"
    })
  }
  catch{
    return error()
  }
}
