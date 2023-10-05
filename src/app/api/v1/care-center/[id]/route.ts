import { Adopt } from "./../../../../../../node_modules/.prisma/client/index.d";
import type { NextRequest } from "next/server";
import prisma from "@db/prisma";
import { error, success } from "utils/responses";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const careCenter = await prisma.org.findUnique({
      where: {
        id: context.params.id,
      },
      include: {
        rescues: true,
        communities: true,
        _count: {
          select: {
            adopt: true,
            pets: true,
          },
        },
      },
    });
    return success(careCenter);
  } catch (er) {
    return error();
  }
}
