import { User } from "@prisma/client";
import prisma from "@db/prisma";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader)
    return NextResponse.json(
      {
        status: "failed",
        message: "Org is not logged in",
      },
      { status: 400 }
    );
  const token = authHeader.split(" ")[1];
  if (!token)
    return NextResponse.json(
      {
        status: "failed",
        message: "Org is not logged in",
      },
      { status: 400 }
    );

  const user = verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return null;
    return user;
  });
  // const users = await prisma.user.findUnique({
  if (user === null)
    return NextResponse.json(
      {
        status: "failed",
        message: "Org is not logged in",
      },
      { status: 400 }
    );

  const userFromDB = await prisma.org.findUnique({
    where: {
      id: (user as any).id,
    },
    include: {
      _count: {
        select: {
          adopt: true,
          pets: true,
        },
      },
      adopt: {
        include: {
          pet: {
            include: {
              owner: true,
            },
          },
        },
      },
    },
  });
  if (!userFromDB)
    return NextResponse.json(
      {
        status: "failed",
        message: "User is not logged in",
      },
      { status: 400 }
    );
  const userWithoutPassword = exclude(userFromDB, ["password"]);
  return NextResponse.json(
    {
      status: "success",
      message: "User is logged in",
      data: userWithoutPassword,
    },
    { status: 200 }
  );
}
