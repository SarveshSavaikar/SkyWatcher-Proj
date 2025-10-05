import { NavLink } from "react-router-dom";
import { Home, Map, Lightbulb, BookOpen, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Trip Boards", url: "/trips", icon: Map },
  { title: "Recommender", url: "/recommender", icon: Lightbulb },
  { title: "Reports", url: "/reports", icon: BookOpen },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold bg-sky-gradient bg-clip-text text-transparent">
            WeatherPro
          </h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary font-medium"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
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
