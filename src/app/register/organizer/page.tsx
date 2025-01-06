import RegisterOrganizerPage from "@/features/register/organizer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const RegisterOrganizer = async () => {
  const session = await auth();
  if (session) return redirect("/");

  return <RegisterOrganizerPage />;
};

export default RegisterOrganizer;
