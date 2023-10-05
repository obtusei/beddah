import prisma from "@db/prisma";
import { isAuth } from "@lib/isAuth";
import type { NextRequest } from "next/server";
import { error, success, unAuthorized } from "utils/responses";
import uploadImage from "utils/imageUpload";

export async function GET(req: NextRequest) {
  try {
    const sessionUser = await isAuth(req);
    if (!sessionUser) return unAuthorized();
    const rescues = await prisma.rescues.findMany({
      where: {
        userId: sessionUser.id,
      },
      include: {
        location: true,
      },
    });
    return success(rescues);
  } catch (err) {
    return error();
  }
}

export async function POST(req: NextRequest) {
  try {
    const sessionUser = await isAuth(req);
    if (!sessionUser) return unAuthorized();
    let formData = await req.formData();
    const image = formData.get("file");
    const locationName = formData.get("locationName")?.toString();
    const locationLat = Number(formData.get("locationLat"));
    const locationLon = Number(formData.get("locationLon"));
    const desc = formData.get("description")?.toString();
    const imagePath = await uploadImage(image, "rescues");
    const createData = await prisma.location.create({
      data: {
        name: locationName,
        lat: locationLat,
        lon: locationLon,
        Rescues: {
          create: {
            userId: sessionUser.id,
            image: imagePath,
            description: desc,
            status: "not rescued",
          },
        },
      },
    });

    return success(createData);
  } catch (err) {
    return error();
  }
}
