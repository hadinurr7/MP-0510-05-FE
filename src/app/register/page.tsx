import RegisterPage from "@/features/register";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Register = async () => {
  return <RegisterPage />;
};

export default Register;
