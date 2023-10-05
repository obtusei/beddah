import prisma from "@db/prisma";
import type { NextRequest } from "next/server";
import { success } from "utils/responses";

// TODO: Add vets and their details
export async function GET(request: NextRequest) {
  const vets = await prisma.veterinarian.findMany({
    include: {
      User: true,
    },
  });

  return success(vets, "Vets fetched successfully");
}
