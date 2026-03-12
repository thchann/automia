import { Instagram, MessageCircle, TrendingUp, Settings } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

// Automations page visualizes configured automation workflows (bots, alerts).
// Cards are backed by static data and represent how real automation configs
// and metrics would be surfaced from an API.
const automations = [
  {
    icon: Instagram,
    titleKey: "automations.card.dmTitle",
    descriptionKey: "automations.card.dmDescription",
    status: "Active" as const,
    channel: "Instagram",
    messages: 24,
    leads: 8,
    lastActive: "2 minutes ago",
  },
  {
    icon: MessageCircle,
    titleKey: "automations.card.qualTitle",
    descriptionKey: "automations.card.qualDescription",
    status: "Active" as const,
    channel: "Instagram",
    messages: 12,
    leads: 4,
    lastActive: "15 minutes ago",
  },
  {
    icon: TrendingUp,
    titleKey: "automations.card.priceTitle",
    descriptionKey: "automations.card.priceDescription",
    status: "Active" as const,
    channel: "Multi-Channel",
    messages: 6,
    leads: 3,
    lastActive: "1 hour ago",
  },
  {
    icon: MessageCircle,
    titleKey: "automations.card.followupTitle",
    descriptionKey: "automations.card.followupDescription",
    status: "Paused" as const,
    channel: "Instagram",
    messages: 0,
    leads: 0,
    lastActive: "3 days ago",
  },
];

const Automations = () => {
  const { t } = useLanguage();
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {t("automations.title")}
      </h1>
      <p className="text-muted-foreground mt-1">{t("automations.subtitle")}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
        {automations.map((a) => (
          <div
            key={a.titleKey}
            className="bg-card rounded-xl shadow-sm border border-border p-4 md:p-6 flex flex-col"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <a.icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-card-foreground">{t(a.titleKey)}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {t(a.descriptionKey)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  a.status === "Active"
                    ? "bg-[hsl(var(--status-active-bg))] text-[hsl(var(--status-active))]"
                    : "bg-[hsl(var(--status-paused-bg))] text-[hsl(var(--status-paused))]"
                }`}
              >
                {t(
                  a.status === "Active"
                    ? "automations.status.active"
                    : "automations.status.paused",
                )}
              </span>
              <span className="text-xs text-muted-foreground">{a.channel}</span>
            </div>

            <div className="border-t border-border pt-4 flex gap-8 mb-5">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("automations.metrics.messages")}
                </p>
                <p className="text-xl font-bold text-card-foreground">{a.messages}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("automations.metrics.leads")}
                </p>
                <p className="text-xl font-bold text-card-foreground">{a.leads}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("automations.metrics.lastActive")}
                </p>
                <p className="text-sm font-medium text-card-foreground mt-1">{a.lastActive}</p>
              </div>
            </div>

            {a.status === "Active" && (
              <button className="w-full flex items-center justify-center gap-2 border border-border rounded-lg py-3 min-h-11 text-sm font-medium text-card-foreground hover:bg-muted transition-colors mt-auto">
                <Settings className="h-4 w-4" />
                {t("automations.configure")}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Automations;
