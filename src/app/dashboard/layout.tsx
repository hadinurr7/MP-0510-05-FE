import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
 
export default async function Layout({ children }: { children: React.ReactNode }) {

  const session = await auth();
  if (!session) return redirect("/login");
  if (session.user.role !== "ORGANIZER") {
    return redirect("/");
  }

  return (
    <main className="relative">
    <SidebarProvider>
      <DashboardSidebar />
        <SidebarTrigger />
        {children}
    </SidebarProvider>
    </main>

  )
}