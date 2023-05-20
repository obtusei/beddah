import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
}

if (!prisma) {
  prisma = new PrismaClient();
}

export default prisma;
