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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

// Main application navigation used by AppLayout.
// Two-column layout: fixed-width rail (icons) + text column (labels when expanded).
// Rail width = --sidebar-width-icon so border and icon padding stay proportional; icons never shift.
const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutGrid },
  { title: "Cars", url: "/cars", icon: Car },
  { title: "Leads", url: "/leads", icon: Users },
  { title: "Automations", url: "/automations", icon: Zap },
  { title: "AI Assistant", url: "/ai-assistant", icon: MessageCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

const iconColumnWidth = "w-12 shrink-0"; // 3rem icon column inside rail

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="group/sidebar">
      {/* Two-column layout: rail (fixed width) + text (hidden when collapsed). Positions stay fixed. */}
      <div className="flex h-full w-full flex-col min-h-0">
        {/* Brand row */}
        <div className="flex shrink-0">
          <div
            className={cn(
              "flex items-center justify-center px-2 py-4",
              "w-[var(--sidebar-width-icon)] shrink-0",
              // On desktop, hide this rail trigger when the sidebar is expanded
              // (we show a header with title + toggle instead).
              "md:group-data-[state=expanded]/sidebar:hidden",
            )}
          >
            <SidebarTrigger className="hidden h-9 w-9 md:flex" />
          </div>
          <div
            className={cn(
              // Brand text uses same x-position and spacing pattern as item titles.
              "hidden min-w-0 flex-1 items-center truncate pr-3 py-4",
              "flex md:hidden md:group-data-[state=expanded]:flex",
            )}
          >
            <span className="app-logo truncate text-lg font-bold text-foreground tracking-tight">
              Automia
            </span>
          </div>
        </div>

        {/* Desktop-only expanded header: title on the left, toggle on the right. */}
        <div className="hidden items-center justify-between px-3 py-4 md:group-data-[state=expanded]/sidebar:flex">
          <span className="app-logo truncate text-lg font-bold text-foreground tracking-tight">
            Automia
          </span>
          <SidebarTrigger className="h-8 w-8 md:inline-flex" aria-label="Toggle sidebar" />
        </div>

        <SidebarContent className="flex-1 gap-0">
          <SidebarGroup className="px-0 py-1">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {navItems.map((item) => (
                  <div key={item.title} className="flex w-full">
                    {/* Rail: fixed width; text column: grows when expanded. One NavLink spans both so active state and a11y are correct. */}
                    <SidebarMenuItem className="group/nav-item w-full shrink-0">
                      <SidebarMenuButton
                        asChild
                        size="lg"
                        className={cn(
                          // Keep row hit-area but prevent row-wide hover/active bg.
                          // Spacing between icon and title is controlled by gap-1.5 on the inner row.
                          "h-8 w-full justify-start px-0 bg-transparent hover:bg-transparent",
                          "group-data-[state=collapsed]:!h-8 group-data-[state=collapsed]:!w-full",
                        )}
                      >
                        <NavLink
                          to={item.url}
                          className="flex w-full min-w-0 items-center gap-1.5 overflow-hidden text-sidebar-foreground transition-colors"
                          activeClassName="font-medium text-foreground"
                        >
                          <span
                            className={cn(
                              // Fixed rail width; no horizontal padding so border is closer to icon.
                              "flex h-8 w-[var(--sidebar-width-icon)] shrink-0 items-center justify-center px-0",
                            )}
                          >
                            <span
                              className={cn(
                                iconColumnWidth,
                                "flex h-8 items-center justify-center rounded-lg bg-transparent transition-colors group-hover/nav-item:bg-sidebar-accent group-hover/nav-item:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
                              )}
                            >
                              <item.icon className="h-5 w-5" />
                            </span>
                          </span>
                          <span
                            className={cn(
                              // On mobile, always show titles when the sheet is open.
                              // On desktop, only show when the sidebar is expanded.
                              "min-w-0 flex-1 truncate pr-3 text-sm flex md:hidden",
                              "md:group-data-[state=expanded]:inline-block",
                            )}
                          >
                            {item.title}
                          </span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="flex shrink-0 p-0">
          <div className="flex w-full">
            <div
              className={cn(
                "w-[var(--sidebar-width-icon)] shrink-0",
                "flex items-center justify-center p-3",
              )}
            />
            <div
              className={cn(
                "hidden min-w-0 flex-1 items-center overflow-hidden p-3 pt-0",
                "md:group-data-[state=expanded]:flex",
              )}
            >
              <button
                className={cn(
                  "w-fit whitespace-nowrap rounded-md bg-cookie px-3 py-1.5 text-xs text-cookie-foreground transition-opacity hover:opacity-90",
                )}
              >
                Manage cookies or opt out
              </button>
            </div>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
