import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AccountSidebar} from "./components/AccountSidebar"
 
export default function Layout({ children }: { children: React.ReactNode }) {
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