import { LayoutGrid, Car, Users, Zap, MessageCircle, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

// Main application navigation used by AppLayout.
// On desktop it behaves like a hover-collapsible rail: collapsed to icons by
// default, expanding on hover via the shared SidebarProvider state. On mobile
// it appears as a sheet controlled by the sidebar system.
const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutGrid },
  { title: "Cars", url: "/cars", icon: Car },
  { title: "Leads", url: "/leads", icon: Users },
  { title: "Automations", url: "/automations", icon: Zap },
  { title: "AI Assistant", url: "/ai-assistant", icon: MessageCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { setOpen, isMobile } = useSidebar();
  console.log("isMobile?", isMobile);

  // Drive desktop expand/collapse from hover so the sidebar acts like an icon
  // rail that opens when you move toward it. Mobile still uses the sheet.
  const handleMouseEnter = () => {
    if (!isMobile) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setOpen(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Sidebar collapsible="icon" className="border-r-0 group/sidebar">
        <div className="px-4 py-6 overflow-hidden">
        <span
          className="text-lg font-bold text-foreground tracking-tight whitespace-nowrap
                    opacity-0 group-data-[state=expanded]:opacity-100
                    transition-opacity"
        >
          CarSales AI
        </span>
        </div>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title} className="group/nav-item">
                    <SidebarMenuButton
                      asChild
                      size="lg"
                      className="px-0 group-data-[state=collapsed]/sidebar-wrapper:justify-center group-data-[state=expanded]/sidebar-wrapper:justify-start"
                    >
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-2 px-2 py-1.5 text-sidebar-foreground transition-colors"
                        activeClassName="font-medium text-foreground"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-transparent transition-colors group-hover/nav-item:bg-sidebar-accent group-hover/nav-item:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span
                          className="hidden whitespace-nowrap
                                    group-data-[state=expanded]:inline-flex
                                    -translate-x-2 group-data-[state=expanded]:translate-x-0
                                    transition-transform duration-150">
                          {item.title}
                        </span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 overflow-hidden">
          <button className="hidden text-xs px-3 py-1.5 rounded-md bg-cookie text-cookie-foreground hover:opacity-90 transition-opacity w-fit whitespace-nowrap group-data-[state=expanded]/sidebar-wrapper:inline-flex">
            Manage cookies or opt out
          </button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
