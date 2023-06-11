import bcrypt from 'bcrypt';
import prisma from "./prisma";
import orgs from "../lib/org.json"
import communities from "../lib/communities.json"
import users from "../lib/users.json"
import dogs from "../lib/dogs.json"

// async function createOrgs(){
//   await Promise.all(
//       orgs.map(async (item) => {
//         await prisma.org.create({
//           data:{
//             name:item.name,
//             email:item.email,
//             password:bcrypt.hashSync("12345", 10),
//             phone:item.contact,
//             location:item.location,
//             isVerified:item.isVerified,
//             image:item.image,
//           }
//         })
//       })
//     )
// }

async function createUsers(){
  await Promise.all(
      users.map(async (item) => {
        await prisma.user.create({
          data:{
            name:item.name,
            email:item.email,
            password:item.password,
          }
        })
      })
    )  
}

async function createDogs(){
  await Promise.all(
      dogs.map(async (item) => {
        await prisma.pet.create({
          data:{
            name:item.name,
            age:item.age,
            breed:item.breed,
            gender:item.gender,
            bio:item.description,
            image:item.photo,
            dieases:item.diseases,
            vaccinations:item.vacinations,
            characters:item.behaviour,
          }
        })
      })
  )
}

async function createCommunities(){
  await Promise.all(
      communities.map(async (item) => {
        await prisma.community.create({
          data:{
            name:item.name,
            username:item.username,
            bio:item.description,
          }
        })
      })
    )
}


async function main() {  
  // await createOrgs();
  // await createCommunities();
  // await createUsers();
  await createDogs();
}

main()
  .then(() => console.log(`Seeded data successfully`))
  .catch((e) => console.error(`Failed to seed data, ${e}`))
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;