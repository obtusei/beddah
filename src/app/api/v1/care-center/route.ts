import prisma from '@db/prisma';
import type { NextRequest} from "next/server";
import formidable from "formidable"
import { error, success } from 'utils/responses';
export async function GET(request: NextRequest) {
  try{
    const careCenters =  await prisma.org.findMany()
    return success(careCenters)
  }
  catch{
    return error()
  }
}



// const readFile = (
//   req: IncomingMessage,
//   saveLocally?: boolean
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
//   const options: formidable.Options = {};
//   if (saveLocally) {
//     options.uploadDir = path.join(process.cwd(), "/public/uploads");
//     options.filename = (name, ext, path, form) => {
//       return Date.now().toString() + "_" + path.originalFilename;
//     };
//   }
//   options.maxFileSize = 4000 * 1024 * 1024;
//   const form = formidable(options);
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//   });
// };

// export async function POST(request:IncomingMessage) {
//   try {
//     await fs.readFileSync(path.join(process.cwd() + "/public", "/uploads"));
//   } catch (error) {
//     await fs.mkdirSync(path.join(process.cwd() + "/public", "/uploads"));
//   }
//   await readFile(request, true);
//   return NextResponse.json({
//     message:"Uploaded Successfully"
//   })
// }