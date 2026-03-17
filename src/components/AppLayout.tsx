import React from "react";
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import OttoLogo from "/Otto_cropped.png";
import { useIsMobile } from "@/hooks/use-mobile";

// AppLayoutContent renders the main area inside the sidebar shell,
// including the mobile header, routed content, and the floating help button.
function AppLayoutContent() {
  const { setOpenMobile, toggleSidebar } = useSidebar();
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
        <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center border-b border-border bg-background px-4">
          <button
            type="button"
            onClick={toggleSidebar}
            className="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-transparent"
            aria-label="Open navigation"
          >
            <img src={OttoLogo} alt="Automia" className="h-10 w-10 object-contain" />
          </button>
        </header>
      )}
      {/* Desktop-only persistent structural header bar (sits above the scrollable content). */}
      {!isMobile && (
        <header className="flex h-16 items-center border-b border-border bg-background px-4">
          <span className="app-logo font-title text-2xl font-bold text-foreground tracking-tight">
            Automia
          </span>
        </header>
      )}
      {/* Content: add top padding on mobile so it starts below the fixed header. */}
      <div className="flex-1 relative overflow-auto px-4 pt-20 pb-8 md:p-4">
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
