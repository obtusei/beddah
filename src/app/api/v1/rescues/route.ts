import { Org } from "./../../../../../node_modules/.prisma/client/index.d";
import prisma from "@db/prisma";
import { isAuthOrg } from "@lib/isAuth";
import type { NextRequest } from "next/server";
import { error, success } from "utils/responses";

export async function GET(request: NextRequest) {
  try {
    const news = await prisma.rescues.findMany();
    return success(news);
  } catch {
    return error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { rescueId } = await request.json();
    const sessionUser = await isAuthOrg(request);
    const news = await prisma.rescues.update({
      where: {
        id: rescueId,
      },
      data: {
        org: {
          connect: {
            id: sessionUser ? sessionUser.id : "",
          },
        },
        status: "to rescue",
      },
    });
    const createNotificaiton = await prisma.notification.create({
      data: {
        title: `${sessionUser?.name} is going to rescue`,
        desc: `Rescue id: ${rescueId}`,
        userId: news.userId,
      },
    });
    return success(news);
  } catch {
    return error();
  }
}
