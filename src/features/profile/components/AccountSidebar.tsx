"use client";

import { signOut } from "next-auth/react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { FaCalendarAlt, FaCreditCard, FaSignOutAlt, FaTachometerAlt, FaLock } from "react-icons/fa";

const items = [
  { title: "Profile", url: "/profile", icon: FaTachometerAlt },
  { title: "Transactions", url: "/profile/transactions", icon: FaCreditCard },
  { title: "Change Password", url: "/profile/change-password", icon: FaLock },
  { title: "Log Out", icon: FaSignOutAlt, onClick: () => signOut({ callbackUrl: "/login" }) },
];

export function AccountSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center py-10">
            <h1 className="text-2xl font-black ">My Account</h1>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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

