import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function TopBar() {
  return (
    <header className="h-16 border-b bg-card flex items-center px-4 gap-4">
      <SidebarTrigger />
      
      <div className="flex-1" />
      
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
      
      <Button variant="ghost" size="icon">
        <Settings className="h-5 w-5" />
      </Button>
      
      <Button variant="default" size="sm">
        Login
      </Button>
    </header>
  );
}
