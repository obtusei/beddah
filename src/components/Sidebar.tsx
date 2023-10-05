"use client";

import { Sidebar } from "flowbite-react";
import Link from "next/link";
import {
  HiChartPie,
  HiUser,
  HiLocationMarker,
  HiSun,
  HiUserGroup,
  HiOfficeBuilding,
} from "react-icons/hi";
import { MdPets } from "react-icons/md";
import { BiSolidDog } from "react-icons/bi";

export default function DefaultSidebar() {
  const menu = [
    {
      title: "dashboard",
      icon: HiChartPie,
      href: "/admin",
    },
    {
      title: "users",
      icon: HiUser,
      href: "/admin/users",
      label: "3",
    },
    {
      title: "pets",
      icon: MdPets,
      href: "/admin/pets",
    },
    {
      title: "care centers",
      icon: HiOfficeBuilding,
      href: "/admin/care-centers",
    },
    {
      title: "rescues",
      icon: HiLocationMarker,
      href: "/admin/rescues",
    },
    {
      title: "communities",
      icon: HiUserGroup,
      href: "/admin/communities",
    },
    {
      title: "adoption",
      icon: BiSolidDog,
      href: "/admin/adoptions",
    },
  ];
  return (
    <Sidebar aria-label="Default sidebar example" className="h-screen">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {menu.map((item, index) => (
            <Sidebar.Item
              as={Link}
              key={index}
              href={item.href}
              icon={item.icon}
            >
              <p>{item.title}</p>
            </Sidebar.Item>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
