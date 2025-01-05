"use client";
import { signOut } from "next-auth/react";
import { FaTachometerAlt, FaCalendarAlt, FaEdit, FaTicketAlt, FaTags, FaCreditCard, FaCog, FaSignOutAlt, FaCaretDown } from "react-icons/fa"; 
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useState } from "react";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: FaTachometerAlt },
  { title: "Events", 
    icon: FaCalendarAlt,
    children: [
      { title: "My Events", url: "/dashboard/events", icon: FaTicketAlt },
      { title: "Create Events", url: "/dashboard/events/create-events", icon: FaTicketAlt }
    ]
   },
  { title: "Edit Event", url: "/dashboard/events/edit-event", icon: FaEdit },
  {
    title: "Vouchers", 
    icon: FaTicketAlt, 
    children: [
      { title: "My Vouchers", url: "/dashboard/vouchers", icon: FaTicketAlt },
      { title: "Create Vouchers", url: "/dashboard/vouchers/create-vouchers", icon: FaTicketAlt }
    ]
  },
  { title: "Coupons", url: "/dashboard/coupons", icon: FaTags },
  { title: "Transactions", url: "/dashboard/transactions", icon: FaCreditCard },
  { title: "profile", url: "/dashboard/profile", icon: FaCog },
  { title: "Log Out", icon: FaSignOutAlt, onClick: () => signOut({ callbackUrl: "/login" }) },
];

export function DashboardSidebar() {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prevState) => 
      prevState.includes(title)
        ? prevState.filter(menu => menu !== title)
        : [...prevState, title] 
    );
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-center py-10">
            <h1 className="text-2xl font-black">Dashboard</h1>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                item.children ? (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md transition-all w-full text-left" onClick={() => toggleMenu(item.title)}>
                        <item.icon className="h-5 w-5" />
                        <span className="text-base flex-grow">{item.title}</span>
                        <FaCaretDown className={`ml-auto h-3 w-3 transition-transform ${openMenus.includes(item.title) ? "rotate-180" : ""}`} />
                      </div>
                    </SidebarMenuButton>
                    {openMenus.includes(item.title) && (
                      <SidebarMenu className="space-y-1 mt-1 ml-4">
                        {item.children.map((child) => (
                          <SidebarMenuItem key={child.title}>
                            <a
                              href={child.url}
                              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md transition-all"
                            >
                              <child.icon className="h-5 w-5" />
                              <span className="text-base">{child.title}</span>
                            </a>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    )}
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.onClick ? (
                        <button
                          onClick={item.onClick}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md transition-all w-full text-left"
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="text-base">{item.title}</span>
                        </button>
                      ) : (
                        <a
                          href={item.url}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-md transition-all"
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="text-base">{item.title}</span>
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

