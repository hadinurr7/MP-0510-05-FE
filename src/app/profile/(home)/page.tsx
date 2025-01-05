import ProfilePage from "@/features/profile";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  
  return <ProfilePage />;
}
