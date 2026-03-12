import { User, Instagram, Moon } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/i18n/LanguageProvider";

// Settings page manages basic account/profile preferences.
// Form fields are currently local state; in a real app, values would be
// loaded from and persisted to a backend API.
const SettingsPage = () => {
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@carsalesai.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t("settings.title")}</h1>
      <p className="text-muted-foreground mt-1">{t("settings.subtitle")}</p>

      <div className="bg-card rounded-xl shadow-sm border border-border mt-6 md:mt-8">
        <div className="p-4 md:p-6 flex items-center gap-3 border-b border-border">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-card-foreground">{t("settings.profile.title")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("settings.profile.subtitle")}
            </p>
          </div>
        </div>
        <div className="p-4 md:p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">
              {t("settings.profile.fullName")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 min-h-11 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">
              {t("settings.profile.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 min-h-11 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1.5">
              {t("settings.profile.phone")}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 min-h-11 text-sm text-foreground outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <button className="bg-primary text-primary-foreground px-5 py-3 min-h-11 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            {t("settings.profile.save")}
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border mt-6">
        <div className="p-4 md:p-6 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <Moon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-card-foreground">
              {t("settings.appearance.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("settings.appearance.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {t("settings.appearance.light")}
            </span>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              aria-label="Toggle dark mode"
            />
            <span className="text-xs text-muted-foreground">
              {t("settings.appearance.dark")}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border mt-6">
        <div className="p-4 md:p-6 flex items-center gap-3">
          <div className="flex-1">
            <h2 className="font-bold text-card-foreground">
              {t("settings.language.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("settings.language.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                language === "en"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border"
              }`}
            >
              {t("settings.language.english")}
            </button>
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${
                language === "es"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border"
              }`}
            >
              {t("settings.language.spanish")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
