import type { NextRequest } from "next/server";
import prisma from "@db/prisma";
import { error, success } from "utils/responses";
import uploadImage from "utils/imageUpload";
import { isAuth } from "@lib/isAuth";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const sessionUser = await isAuth(request);
    const community = await prisma.community.findUnique({
      where: {
        id: context.params.id,
      },
      include: {
        posts: true,
        members: {
          where: {
            id: sessionUser?.id,
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
    });
    return success(community);
  } catch (er) {
    return error();
  }
}

/* -------------------------------------------------------------------------- */
/*                         CREATE COMMUNITY POST BY USER                      */
/* -------------------------------------------------------------------------- */

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const content = formData.get("content")?.toString();
    const path = await uploadImage(image, "community/posts");
    const sessionUser = await isAuth(req);
    //check if user follow this community
    const followCheck = await prisma.community.findUnique({
      where: {
        id: context.params.id,
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
      return error("You are not a member of this community");
    }

    const createComPost = await prisma.communityPost.create({
      data: {
        image: `https://cdn.leftshape.com/${path}`,
        content: content,
        user: {
          connect: {
            id: sessionUser?.id,
          },
        },
        community: {
          connect: {
            id: context.params.id,
          },
        },
      },
    });
    return success(createComPost, "Post created successfully");
  } catch (er) {
    return error();
  }
}
