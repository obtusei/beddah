import LoadingPet from "@/components/Loading";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingPet size={60} color={"gray"} />
    </div>
  );
}
