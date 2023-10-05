import prisma from "@db/prisma";
import type { NextRequest } from "next/server";
import { error, success } from "utils/responses";

export async function GET(request: NextRequest) {
  try {
    const careCenters = await prisma.org.findMany();
    return success(careCenters);
  } catch {
    return error();
  }
}
