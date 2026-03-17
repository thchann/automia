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
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import OttoLogo from "/Otto_cropped.png";

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

// Match the minimized rail width (SIDEBAR_WIDTH_ICON ≈ 2.75rem) so icons stay
// centered when the sidebar is collapsed.
const iconColumnWidth = "w-11 shrink-0";

export function AppSidebar() {
  const { t } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <Sidebar collapsible="icon" className="group/sidebar">
      {/* Two-column layout: rail (fixed width) + text (hidden when collapsed). Positions stay fixed. */}
      <div className="flex h-full w-full flex-col min-h-0">
        {/* Brand row */}

        {/* Desktop expanded header logo removed; handled by global header. */}

        <SidebarContent className="flex-1 gap-0 px-1">
          <SidebarGroup className="px-0 py-1">
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <div key={item.titleKey} className="flex w-full">
                      {/* Each nav item is a tight, full-width row with minimal vertical spacing. */}
                      <SidebarMenuItem className="group/nav-item w-full shrink-0">
                        <SidebarMenuButton
                          asChild
                          size="lg"
                          isActive={isActive}
                          className={cn(
                            // Full-width, rounded row with tight spacing
                            "h-9 w-full justify-start px-0 bg-transparent transition-colors rounded-md",
                            // Hover: medium grey
                            "hover:bg-gray-300",
                            // Selected: darker grey
                            "data-[active=true]:bg-gray-400",
                            // Pressed: darkest while clicking
                            "active:bg-gray-500",
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
            {/* Icon rail dock: always visible on desktop, houses the Otto toggle. */}
            <div
              className={cn(
                "w-[var(--sidebar-width-icon)] shrink-0",
                "flex items-center justify-center p-3",
              )}
            >
              {!isMobile && <SidebarTrigger className="h-9 w-9" aria-label="Toggle navigation" />}
            </div>
            {/* Expanded-only footer content (e.g., cookies pill) */}
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
