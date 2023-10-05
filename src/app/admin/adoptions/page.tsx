import prisma from "@db/prisma";
import React from "react";

type Props = {};

export default async function Users({}: Props) {
  const adoptions = await prisma.adopt.findMany({
    include: {
      user: true,
      pet: {
        include: {
          owner: true,
        },
      },
    },
  });
  return (
    <div>
      <h1 className="font-bold text-2xl">adoptions</h1>
      <hr className="w-full" />
      <br />
      <table className="w-full text-left">
        <tbody>
          <tr className="bg-accent text-accent bg-opacity-10">
            <th className="p-4">s.n</th>
            <th>pet info</th>
            <th>by</th>
            <th>from</th>
            <th>status</th>
            <th>action</th>
          </tr>
          {adoptions.map((adoption, index: number) => (
            <tr key={index} className="border-b-2">
              <td className="py-6">{index + 1}</td>
              <td>
                <h1 className="font-bold text-lg">{adoption.pet?.name}</h1>
                <h1 className="text-xs text-gray-500">
                  Breed: {adoption.pet?.breed}
                </h1>
                <h1 className="text-sm text-gray-500">
                  Age: {adoption.pet?.age}
                </h1>
              </td>
              <td>{adoption.user?.name}</td>
              <td>{adoption.pet?.owner?.name}</td>
              <td>{adoption.status}</td>
              <td>
                <button className="btn">delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
