import prisma from "@db/prisma";
import { verify, sign } from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import { unAuthorized } from "utils/responses";

export async function generateToken(data: any) {
  return sign(data, String(process.env.JWT_SECRET), { expiresIn: "1h" });
}

export async function isAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  if (!token) return null;
  const user = verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return null;
    return user;
  });
  if (user == null) return null;
  const userFromDB = await prisma.user.findUnique({
    where: {
      id: (user as any).id,
    },
  });

  if (!userFromDB) return null;
  return userFromDB;
}

export async function isAuthOrg(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  if (!token) return null;
  const user = verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return null;
    return user;
  });
  if (user == null) return null;
  const userFromDB = await prisma.org.findUnique({
    where: {
      id: (user as any).id,
    },
  });

  if (!userFromDB) return null;
  return userFromDB;
}
