import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./components/DashboardSidebar"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="h-screen w-screen mr-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}