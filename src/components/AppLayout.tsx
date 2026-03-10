import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { HelpCircle } from "lucide-react";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 relative p-8 overflow-auto">
          <Outlet />
          <button className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-help text-help-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity">
            <HelpCircle className="h-6 w-6" />
          </button>
        </main>
      </div>
    </SidebarProvider>
  );
}
