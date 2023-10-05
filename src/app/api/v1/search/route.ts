import prisma from "@db/prisma";
import type { NextRequest } from "next/server";
import { success } from "utils/responses";

// DONE: Add search for all

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const q: string = request.nextUrl.searchParams.get("q") || "";
  if (type == "dogs") {
    const dogs = await prisma.pet.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            breed: {
              contains: q,
            },
          },
          {
            bio: {
              contains: q,
            },
          },
        ],
      },
    });
    return success(dogs, "Dogs fetched successfully");
  } else if (type == "coms") {
    const comms = await prisma.community.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            username: {
              contains: q,
            },
          },
          {
            bio: {
              contains: q,
            },
          },
        ],
      },
    });
    return success(comms, "Communities fetched successfully");
  } else {
    const careCenter = await prisma.org.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            location: {
              contains: q,
            },
          },
          {
            bio: {
              contains: q,
            },
          },
        ],
      },
    });
    return success(careCenter, "Care Center fetched successfully");
  }
}
