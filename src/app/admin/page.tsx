import prisma from "@db/prisma";
import React from "react";

type Props = {};

async function AdminPanel({}: Props) {
  const adoptions = await prisma.adopt.count();
  const pets = await prisma.pet.count();
  const users = await prisma.user.count();
  const communities = await prisma.community.count();
  const rescues = await prisma.rescues.count();
  const carecenters = await prisma.org.count();
  const all = [
    {
      title: "adoptions",
      count: adoptions,
    },
    {
      title: "pets",
      count: pets,
    },
    {
      title: "users",
      count: users,
    },
    {
      title: "communities",
      count: communities,
    },
    {
      title: "rescues",
      count: rescues,
    },
    {
      title: "care centers",
      count: carecenters,
    },
  ];
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl">dashboard</h1>
      <hr className="w-full" />
      <br />

      <div className="flex flex-wrap gap-4">
        {all.map((item, index) => (
          <div key={index} className="p-4 w-full rounded-2xl border-2">
            <h1 className="text-3xl font-bold">{item.count}</h1>
            <h1 className="text-gray-500">{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
