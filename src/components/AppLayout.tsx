import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// AppLayoutContent renders the main area inside the sidebar shell,
// including the mobile header, routed content, and the floating help button.
function AppLayoutContent() {
  const { setOpenMobile } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();

  // Close the mobile sidebar sheet whenever the route changes so the new page
  // is fully visible on small screens.
  React.useEffect(() => {
    setOpenMobile(false);
  }, [location.pathname, setOpenMobile]);

  return (
    <>
      {/* Mobile-only fixed header with sidebar toggle.
          Stays pinned to the top while content scrolls underneath. */}
      {isMobile && (
        <header className="fixed inset-x-0 top-0 z-30 flex h-14 items-center border-b border-border bg-background px-4">
          <SidebarTrigger
            className="h-8 w-8"
            aria-label="Open navigation"
          />
        </header>
      )}
      {/* Content: add top padding on mobile so it starts below the fixed header. */}
      <div className="flex-1 relative overflow-auto px-4 pt-16 md:p-8">
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
    // SidebarProvider manages global sidebar state. We default to collapsed on
    // desktop so the app starts with an icon rail that expands on hover or via
    // the keyboard shortcut (⌘/Ctrl + B).
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <AppLayoutContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
