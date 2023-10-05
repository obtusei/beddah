import type { NextRequest } from "next/server";
import prisma from "@db/prisma";
import { error, success } from "utils/responses";
import { isAuthOrg } from "@lib/isAuth";

export async function GET(request: NextRequest) {
  try {
    const communities = await prisma.community.findMany();
    return success(communities);
  } catch (er) {
    return error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, username, bio } = await request.json();

    const sessionOrg = await isAuthOrg(request);
    if (!sessionOrg) return error("You are not authenticated");
    const newCom = await prisma.community.create({
      data: {
        name: name,
        username: username,
        bio: bio,
        creatorId: sessionOrg.id,
      },
    });
    return success(newCom, "Community created successfully");
  } catch (err) {
    return error("Username already exists");
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { name, username, bio } = await request.json();
    const id = request.nextUrl.searchParams.get("id");
    const sessionOrg = await isAuthOrg(request);
    if (!sessionOrg) return error("You are not authenticated");
    const newCom = await prisma.community.update({
      where: {
        id: String(id),
      },
      data: {
        name: name,
        username: username,
        bio: bio,
      },
    });
    return success(newCom, "Community updated successfully");
  } catch (err) {
    return error("Username already exists");
  }
}
