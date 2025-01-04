
import { ChangePasswordForm } from "@/features/profile/change-password";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();

  if (!session) return redirect("/login");
  return <ChangePasswordForm />;
}
