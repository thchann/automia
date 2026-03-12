import { User, Instagram, Moon } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";

// Settings page manages basic account/profile preferences.
// Form fields are currently local state; in a real app, values would be
// loaded from and persisted to a backend API.
const SettingsPage = () => {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@carsalesai.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
      <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>

      <div className="bg-card rounded-xl shadow-sm border border-border mt-6 md:mt-8">
        <div className="p-4 md:p-6 flex items-center gap-3 border-b border-border">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-card-foreground">Profile</h2>
            <p className="text-sm text-muted-foreground">Manage your personal information</p>
          </div>
        </div>
        <div className="p-4 md:p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 min-h-11 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 min-h-11 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 min-h-11 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <button className="bg-primary text-primary-foreground px-5 py-3 min-h-11 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border mt-6">
        <div className="p-4 md:p-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <Moon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-card-foreground">Appearance</h2>
            <p className="text-sm text-muted-foreground">
              Toggle dark mode to reverse the app colors for low-light environments.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Light</span>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              aria-label="Toggle dark mode"
            />
            <span className="text-xs text-muted-foreground">Dark</span>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border mt-6">
        <div className="p-4 md:p-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[hsl(var(--metric-purple-bg))] flex items-center justify-center">
            <Instagram className="h-5 w-5 text-[hsl(var(--metric-purple))]" />
          </div>
          <div>
            <h2 className="font-bold text-card-foreground">Instagram Connection</h2>
            <p className="text-sm text-muted-foreground">Connect your Instagram account for automations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
