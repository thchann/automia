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
        <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center bg-sidebar px-4">
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
      {/* Desktop-only structural header is now handled at the AppLayout level so it
          can visually bleed over both the sidebar rail and main content. */}
      {/* Content frame: fixed-height floating panel that sits beneath the header.
          The shell (header + sidebar) stays fixed; only the content inside this
          panel scrolls. */}
      <div className="flex-1 relative overflow-hidden px-4 pt-16 pb-8 md:px-6 md:pt-20 md:pb-8">
        <div className="w-full max-w-7xl rounded-3xl border border-border bg-background/95 backdrop-blur-sm mx-auto md:mx-0 md:ml-0 md:mr-2">
          {/* Inner scroll area: fills the available viewport height beneath the
              header and scrolls independently of the shell. */}
          <div className="max-h-[calc(100vh-7rem)] overflow-auto px-4 py-4 md:px-6 md:py-6">
            <Outlet />
          </div>
        </div>
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
  const isMobile = useIsMobile();

  return (
    // SidebarProvider manages global sidebar state. We default to collapsed on
    // desktop so the app starts with an icon rail that expands on hover or via
    // the keyboard shortcut (⌘/Ctrl + B).
    <SidebarProvider defaultOpen={false}>
      <>
        {/* Desktop header: fixed and full-width so it can visually overlay the
            sidebar rail and place the Automia logo in the true top-left. */}
        {!isMobile && (
          <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center bg-sidebar px-4">
            <span className="app-logo font-title text-2xl font-bold text-foreground tracking-tight">
              Automia
            </span>
          </header>
        )}

        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset>
            <AppLayoutContent />
          </SidebarInset>
        </div>
      </>
    </SidebarProvider>
  );
}
