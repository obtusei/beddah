import type { NextRequest } from "next/server";
import prisma from "@db/prisma";
import { error, success } from "utils/responses";
import { isAuth } from "@lib/isAuth";
import uploadImage from "utils/imageUpload";

export async function GET(request: NextRequest) {
  try {
    const sessionUser = await isAuth(request);
    const comPosts = await prisma.communityPost.findMany({
      include: {
        community: true,
      },
    });
    return success(comPosts);
  } catch (er) {
    return error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    const content = String(formData.get("content"));
    const comId = request.nextUrl.searchParams.get("id");
    const path = await uploadImage(image, "community/posts");
    const sessionUser = await isAuth(request);
    if (!sessionUser) return error("Unauthorized");
    const checkIfUserFollow = await prisma.community.findUnique({
      where: {
        id: String(comId),
      },
      select: {
        members: {
          where: {
            id: sessionUser?.id,
          },
        },
      },
    });
    if (checkIfUserFollow?.members.length == 0)
      return error("User doesn't follow this community");
    const comPosts = await prisma.communityPost.create({
      data: {
        content: content,
        image: `https://cdn.leftshape.com/${path}`,
        community: {
          connect: {
            id: String(comId),
          },
        },
      },
    });

    return success({ posts: comPosts });
  } catch (er) {
    return error();
  }
}
