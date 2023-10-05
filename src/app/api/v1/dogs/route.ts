import uploadImage from "utils/imageUpload";
import type { NextRequest } from "next/server";
import prisma from "@db/prisma";
import { error, success } from "utils/responses";
import { isAuth, isAuthOrg } from "@lib/isAuth";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const sessionUser = await isAuth(request);
    if (id != null) {
      const dog = await prisma.pet.findUnique({
        where: {
          id: id,
        },
        include: {
          Saved: true,
          Adopt: true,
        },
      });
      return success(dog);
    } else {
      const dogs = await prisma.pet.findMany({
        include: {
          Saved: {
            select: {
              User: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });
      const hehe = await Promise.all(
        dogs.map(async (dog) => {
          if (sessionUser) {
            const userPetInfo = {
              userId_petId: {
                userId: sessionUser?.id,
                petId: dog.id,
              },
            };
            const savedItem = await prisma.saved.findUnique({
              where: userPetInfo,
            });
            const adoptions = await prisma.adopt.findUnique({
              where: userPetInfo,
            });
            return {
              dog,
              isSaved: savedItem != null ? true : false,
              isAdopted: adoptions != null ? true : false,
              adoptionStatus: adoptions != null ? adoptions.status : null,
            };
          }
          return { dog };
        })
      );
      return success(hehe);
    }
  } catch (er) {
    return error();
  }
}

export async function POST(request: NextRequest) {
  try {
    // const { name, bio, age, breed, gender, image }: any = await request.json();
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const image = formData.get("image");
    const bio = formData.get("bio")?.toString();
    const age = Number(formData.get("age")?.toString());
    const breed = formData.get("breed")?.toString();
    const gender = formData.get("gender")?.toString();
    const path = await uploadImage(image, "dogs");
    const sessionOrg = await isAuthOrg(request);
    if (name === undefined || name == "") return error();
    if (sessionOrg == null) return error();
    const newDog = await prisma.pet.create({
      data: {
        name: name,
        bio: bio,
        age: age,
        breed: breed,
        gender: gender,
        image: `https://cdn.leftshape.com/${path}`,
        orgId: sessionOrg?.id,
      },
    });
    return success(newDog, "Dog created successfully");
  } catch (e) {
    return error();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { name }: any = await request.json();
    if (name === undefined || name == "") return error();
    const newDog = await prisma.pet.delete({
      where: {
        id: "12323",
      },
    });
    return success(newDog, "Dog created successfully");
  } catch (e) {
    return error();
  }
}
