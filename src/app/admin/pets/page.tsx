import prisma from "@db/prisma";
import React from "react";

type Props = {};

export default async function Users({}: Props) {
  const pets = await prisma.pet.findMany();
  return (
    <div>
      <h1 className="font-bold text-2xl">pets</h1>
      <hr className="w-full" />
      <br />
      <table className="w-full text-left">
        <tbody>
          <tr>
            <th>s.n</th>
            <th>name</th>
            <th>bio</th>
            <th>action</th>
          </tr>
          {pets.map((user, index: number) => (
            <tr key={index} className="border-b-2">
              <td className="py-6">{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.bio}</td>
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
