import prisma from "@db/prisma";
import { isAuth } from "@lib/isAuth";
import type { NextRequest } from "next/server";
import { error, success, unAuthorized } from "utils/responses";

export async function POST(req: NextRequest) {
  try {
    const { comId } = await req.json();
    const sessionUser = await isAuth(req);
    if (!sessionUser) return unAuthorized();
    const ids = { comId: comId, userId: sessionUser.id };
    const followCheck = await prisma.community.findUnique({
      where: {
        id: comId,
      },
      select: {
        members: {
          where: {
            id: sessionUser?.id,
          },
        },
      },
    });
    if (followCheck?.members.length == 0) {
      await prisma.community.update({
        where: {
          id: comId,
        },
        data: {
          members: {
            connect: {
              id: sessionUser.id,
            },
          },
        },
      });
    } else {
      await prisma.community.update({
        where: {
          id: comId,
        },
        data: {
          members: {
            disconnect: {
              id: sessionUser.id,
            },
          },
        },
      });
    }
    return success({ status: "success" });
  } catch (err) {
    return error();
  }
}
