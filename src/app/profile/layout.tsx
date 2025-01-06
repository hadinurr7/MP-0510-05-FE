import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AccountSidebar } from "@/features/profile/components/AccountSidebar"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
 
export default async function Layout({ children }: { children: React.ReactNode }) {

    const session = await auth();
    if (!session) return redirect("/login");
    if (session.user.role !== "USER") {
      return redirect("/");
    }

  return (
    <SidebarProvider>
      <AccountSidebar />
      <main className="h-screen w-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}