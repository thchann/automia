import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { HelpCircle } from "lucide-react";

// AppLayoutContent renders the main area inside the sidebar shell,
// including the mobile header, routed content, and the floating help button.
function AppLayoutContent() {
  const { setOpenMobile } = useSidebar();
  const location = useLocation();

  // Close the mobile sidebar sheet whenever the route changes so the new page
  // is fully visible on small screens.
  React.useEffect(() => {
    setOpenMobile(false);
  }, [location.pathname, setOpenMobile]);

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4 md:hidden">
        <SidebarTrigger className="-ml-1" />
        <span className="text-sm font-medium text-foreground">CarSales AI</span>
      </header>
      <div className="flex-1 relative p-4 md:p-8 overflow-auto">
        <Outlet />
      </div>
      <button className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 rounded-full bg-help text-help-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity">
        <HelpCircle className="h-6 w-6" />
      </button>
    </>
  );
}

// AppLayout is the shared shell for all primary routes:
// it wraps pages with the sidebar navigation and main content area.
export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <AppLayoutContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
