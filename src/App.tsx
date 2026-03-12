import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import Leads from "./pages/Leads";
import Automations from "./pages/Automations";
import AIAssistant from "./pages/AIAssistant";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Single QueryClient instance used for all React Query hooks in the app.
const queryClient = new QueryClient();

// App wires global providers (data fetching, tooltips, toasts) and the main route tree.
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <LanguageProvider>
          {/* Shadcn-style toasts driven by the custom useToast hook */}
          <Toaster />
          {/* Sonner-style toasts themed via next-themes */}
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Redirect root to the main dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {/* All primary routes share the AppLayout shell (sidebar + content area) */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/automations" element={<Automations />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              {/* Catch-all 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
