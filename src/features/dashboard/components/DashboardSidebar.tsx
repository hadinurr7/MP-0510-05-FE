"use client";

import { signOut } from "next-auth/react"; // Impor signOut dari NextAuth
import { FaTachometerAlt, FaCalendarAlt, FaEdit, FaTicketAlt, FaTags, FaCreditCard, FaCog, FaSignOutAlt } from "react-icons/fa"; 
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: FaTachometerAlt },
  { title: "Events", url: "/dashboard/events", icon: FaCalendarAlt },
  { title: "Edit Event", url: "/dashboard/events/edit-event", icon: FaEdit },
  { title: "Vouchers", url: "/dashboard/vouchers", icon: FaTicketAlt },
  { title: "Coupons", url: "/dashboard/coupons", icon: FaTags },
  { title: "Transactions", url: "/dashboard/transactions", icon: FaCreditCard },
  { title: "Settings", url: "/dashboard/settings", icon: FaCog },
  { title: "Log Out", icon: FaSignOutAlt, onClick: () => signOut({ callbackUrl: "/login" }) },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center py-10">
            <h1 className="text-2xl font-black">Dashboard</h1>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* Jika item memiliki onClick, gunakan onClick untuk logout */}
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="flex items-center gap-4 px-6 py-2 hover:bg-gray-600 rounded-md transition-all w-full text-left"
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="text-lg">{item.title}</span>
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className="flex items-center gap-4 px-6 py-2 hover:bg-gray-600 rounded-md transition-all"
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="text-lg">{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
