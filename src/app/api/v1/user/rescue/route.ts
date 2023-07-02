import prisma from "@db/prisma";
import { isAuth } from "@lib/isAuth";
import type{ NextRequest } from "next/server";
import { error, success, unAuthorized } from "utils/responses";
import uploadImage from "utils/imageUpload";
export async function POST(req:NextRequest){
  try{
    const sessionUser = await isAuth(req)
    if (!sessionUser) return unAuthorized()
    let formData = await req.formData();
    const image = formData.get("file");
    const locationName = formData.get("locationName")?.toString();
    const locationLat = formData.get("locationLat")?.toString();
    const locationLon = formData.get("locationLon")?.toString();
    const imagePath = await uploadImage(image)
    await prisma.location.create({
      data:{
        name:locationName,
        lat:locationLat,
        lon:locationLon,
        Rescues:{
          create:{
            userId:sessionUser.id,
            image:imagePath,
          }
        }
      }
    })
    
    return success({status:"success",locationName})
  }
  catch(err){ return error() }
}