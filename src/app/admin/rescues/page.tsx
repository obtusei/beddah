import prisma from "@db/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Tooltip } from "flowbite-react";

type Props = {};

export default async function Users({}: Props) {
  const rescues = await prisma.rescues.findMany({
    include: { location: true },
  });
  return (
    <div>
      <h1 className="font-bold text-2xl">rescues</h1>
      <hr className="w-full" />
      <br />
      <table className="w-full text-left">
        <tbody>
          <tr>
            <th>s.n</th>
            <th>image</th>
            <th>status</th>
            <th>bio</th>
            <th>location</th>
            <th>action</th>
          </tr>
          {rescues.map((user, index: number) => (
            <tr key={index} className="border-b-2">
              <td className="py-6">{index + 1}</td>
              <td>
                {user.image && (
                  <Image
                    src={user.image}
                    width={40}
                    height={40}
                    alt={user.id}
                  />
                )}
              </td>
              <td>{user.status}</td>
              <td>{user?.description}</td>
              <td>
                <Link
                  target="_blank"
                  href={`https://www.google.com/maps/@${user?.location?.lat},${user?.location?.lon},10z`}
                >
                  {user.location?.name}
                </Link>
              </td>
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
