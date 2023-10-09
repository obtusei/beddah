import type { NextRequest } from "next/server";
import prisma from "@db/prisma";
import { error, success } from "utils/responses";
import { isAuth } from "@lib/isAuth";

export async function GET(request: NextRequest) {
  try {
    const sessionUser = await isAuth(request);
    const communities = await prisma.communityPost.findMany({
      where: {
        community: {
          members: {
            some: {
              id: sessionUser?.id,
            },
          },
        },
      },
      include: {
        community: true,
      },
    });
    return success(communities);
  } catch (er) {
    return error();
  }
}
