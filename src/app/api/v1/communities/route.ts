import type { NextRequest} from "next/server";
import { error, success } from 'utils/responses';

export async function GET(request: NextRequest) {
  try{
    return success({
      com:"communities"
    })
  }
  catch{
    return error()
  }
}
