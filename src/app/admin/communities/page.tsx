import prisma from "@db/prisma";
import React from "react";

type Props = {};

export default async function Users({}: Props) {
  const communities = await prisma.community.findMany();
  return (
    <div>
      <h1 className="font-bold text-2xl">communities</h1>
      <hr className="w-full" />
      <br />
      <table className="w-full text-left">
        <tbody>
          <tr>
            <th>s.n</th>
            <th>username</th>
            <th>name</th>
            <th>bio</th>
            <th>action</th>
          </tr>
          {communities.map((user, index: number) => (
            <tr key={index} className="border-b-2">
              <td className="py-6">{index + 1}</td>
              <td>{user.username}</td>
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
