import prisma from "@db/prisma";
import { isAuth, isAuthOrg } from "@lib/isAuth";
import { NextResponse, type NextRequest } from "next/server";

// DONE: ADOPT ALL DONE
/* -------------------------------------------------------------------------- */
/*                                   FOR ORG                                  */
/* -------------------------------------------------------------------------- */
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const sessionUser = await isAuthOrg(req);
    const all = await prisma.org.findUnique({
      where: {
        id: sessionUser?.id,
      },
      select: {
        pets: {
          include: {
            Adopt: true,
          },
        },
      },
    });
    const status = req.nextUrl.searchParams.get("status")?.toString();

    const petsWithAdoption = all?.pets.filter((pet) =>
      pet.Adopt.filter((adoption) =>
        adoption.status === status ? status : "pending"
      )
    );
    return NextResponse.json(petsWithAdoption);
  } catch (err) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Adopted failed",
      },
      { status: 400 }
    );
  }
}
/* -------------------------------------------------------------------------- */
/*                                  FOR USER                                  */
/* -------------------------------------------------------------------------- */
export async function POST(req: NextRequest) {
  try {
    const { dogId } = await req.json();
    const sessionUser = await isAuth(req);
    if (sessionUser) {
      const adopt = await prisma.adopt.create({
        data: {
          petId: dogId,
          userId: sessionUser.id,
        },
      });

      if (!adopt)
        return NextResponse.json(
          {
            status: "failed",
            message: "Adopted failed",
          },
          { status: 400 }
        );

      return NextResponse.json({
        status: "success",
        message: "Adopted successfully",
      });
    } else {
      return NextResponse.json({
        status: "failed",
        message: "You need to login first",
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Adopted failed",
      },
      { status: 400 }
    );
  }
}
/* -------------------------------------------------------------------------- */
/*                                   FOR ORG                                  */
/* -------------------------------------------------------------------------- */
export async function PUT(req: NextRequest) {
  try {
    const { adoptId } = await req.json();
    const sessionUser = await isAuthOrg(req);
    if (sessionUser) {
      const adoptionData = await prisma.adopt.update({
        where: {
          id: adoptId,
        },
        data: {
          status: "approved",
        },
      });

      await prisma.notification.create({
        data: {
          userId: adoptionData.userId,
          title: "Adoption Approved",
          desc: "Your adoption has been approved",
        },
      });

      return NextResponse.json({
        status: "success",
        message: "Adopted successfully",
      });
    } else {
      return NextResponse.json({
        status: "failed",
        message: "You need to login first",
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Adopted failed",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const sessionUser = await isAuth(req);
    if (sessionUser && id) {
      await prisma.adopt.delete({
        where: {
          id: String(id),
        },
      });

      return NextResponse.json({
        status: "success",
        message: "Adoption deleted successfully",
      });
    } else {
      return NextResponse.json({
        status: "failed",
        message: "You need to login first",
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        status: "failed",
        message: "Adopted failed",
      },
      { status: 400 }
    );
  }
}
