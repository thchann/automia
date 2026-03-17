import { LayoutGrid, Car, Users, Zap, MessageCircle, Settings } from "lucide-react";
import { useLocation } from "react-router-dom";
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
import { useLanguage } from "@/i18n/LanguageProvider";

// Main application navigation used by AppLayout.
// Two-column layout: fixed-width rail (icons) + text column (labels when expanded).
// Rail width = --sidebar-width-icon so border and icon padding stay proportional; icons never shift.
const navItems = [
  { titleKey: "nav.dashboard", url: "/dashboard", icon: LayoutGrid },
  { titleKey: "nav.cars", url: "/cars", icon: Car },
  { titleKey: "nav.leads", url: "/leads", icon: Users },
  { titleKey: "nav.automations", url: "/automations", icon: Zap },
  { titleKey: "nav.aiAssistant", url: "/ai-assistant", icon: MessageCircle },
  { titleKey: "nav.settings", url: "/settings", icon: Settings },
];

const iconColumnWidth = "w-12 shrink-0"; // 3rem icon column inside rail

export function AppSidebar() {
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="group/sidebar">
      {/* Two-column layout: rail (fixed width) + text (hidden when collapsed). Positions stay fixed. */}
      <div className="flex h-full w-full flex-col min-h-0">
        {/* Brand row */}
        <div className="flex shrink-0">
          {/* Compact trigger with tight vertical padding so it aligns closely with the nav items. */}
          <div className="py-1 md:group-data-[state=expanded]/sidebar:hidden justify-center">
            <SidebarTrigger className="hidden h-9 w-9 md:flex" />
          </div>
          <div
            className={cn(
              // Brand text uses same x-position and spacing pattern as item titles, with tight vertical padding.
              "hidden min-w-0 flex-1 items-center truncate pr-3 py-1",
              "flex md:hidden md:group-data-[state=expanded]:flex",
            )}
          >
            <span className="app-logo truncate text-lg font-bold text-foreground tracking-tight">
              Automia
            </span>
          </div>
        </div>

        {/* Desktop-only expanded header: title on the left, toggle on the right, with tight vertical padding. */}
        <div className="hidden items-center justify-between px-3 py-1 md:group-data-[state=expanded]/sidebar:flex">
          <span className="app-logo font-title truncate text-lg font-bold text-foreground tracking-tight">
            Automia
          </span>
          <SidebarTrigger className="h-8 w-8 md:inline-flex" aria-label="Toggle sidebar" />
        </div>

        <SidebarContent className="flex-1 gap-0">
          <SidebarGroup className="px-0 py-1">
            <SidebarGroupContent>
              <SidebarMenu className="gap-px">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <div key={item.titleKey} className="flex w-full">
                      {/* Each nav item is a tight, full-width row with minimal vertical spacing. */}
                      <SidebarMenuItem className="group/nav-item w-full shrink-0">
                        <SidebarMenuButton
                          asChild
                          size="lg"
                          className={cn(
                            // Full-width, rounded row with tight spacing
                            "h-9 w-full justify-start px-0 bg-transparent transition-colors rounded-md",
                            // Hover: light grey
                            "hover:bg-gray-200",
                            // Pressed: slightly darker while clicking
                            "active:bg-gray-400",
                            "group-data-[state=collapsed]:!h-9 group-data-[state=collapsed]:!w-full",
                          )}
                        >
                          <NavLink
                            to={item.url}
                            className="flex w-full min-w-0 items-center gap-0 overflow-hidden text-sidebar-foreground"
                            activeClassName="font-medium text-foreground"
                          >
                            {/* Icon column */}
                            <span className="flex-none grid h-9 w-9 place-content-center">
                              <span className={cn(iconColumnWidth, "grid h-9 place-content-center")}>
                                <item.icon className="h-5 w-5" />
                              </span>
                            </span>
                            {/* Label column: always visible on mobile; hidden only when sidebar is collapsed on desktop */}
                            <span
                              className={cn(
                                "min-w-0 flex-none truncate pr-3 text-sm flex font-title",
                                "md:group-data-[state=collapsed]/sidebar:hidden",
                              )}
                            >
                              {t(item.titleKey)}
                            </span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                  );
                })}
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
              <button className={cn("w-fit whitespace-nowrap rounded-md bg-cookie px-3 py-1.5 text-xs text-cookie-foreground transition-opacity hover:opacity-90")}>
                {t("nav.cookies")}
              </button>
            </div>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
