import DefaultForm from "@/components/AdminLogin";
import React from "react";

type Props = {};

function LoginPage({}: Props) {
  return (
    <div className="flex p-4 w-full justify-center items-center h-screen">
      <DefaultForm />
    </div>
  );
}

export default LoginPage;
