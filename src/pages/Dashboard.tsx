import { Car, TrendingUp, Users, Zap } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

// Dashboard shows a high-level overview: metric cards and recent leads.
// All data is currently static sample data and can be replaced with API-backed
// React Query hooks in the future.
const metrics = [
  { icon: Car, value: "24", labelKey: "dashboard.metrics.activeCars", colorClass: "metric-blue" },
  { icon: TrendingUp, value: "8", labelKey: "dashboard.metrics.newLeadsToday", colorClass: "metric-green" },
  { icon: Users, value: "142", labelKey: "dashboard.metrics.totalLeads", colorClass: "metric-purple" },
  { icon: Zap, value: "3", labelKey: "dashboard.metrics.automationsActive", colorClass: "metric-orange" },
];

const leads = [
  { name: "John Martinez", car: "2024 Tesla Model 3", source: "Instagram", status: "New" as const, date: "Mar 8, 2026" },
  { name: "Sarah Johnson", car: "2023 BMW M4", source: "Facebook", status: "Contacted" as const, date: "Mar 7, 2026" },
  { name: "Michael Chen", car: "2024 Porsche 911", source: "Instagram", status: "Qualified" as const, date: "Mar 7, 2026" },
  { name: "Emma Wilson", car: "2023 Mercedes C-Class", source: "Website", status: "New" as const, date: "Mar 6, 2026" },
];

const statusStyles: Record<string, string> = {
  New: "bg-[hsl(var(--status-new-bg))] text-[hsl(var(--status-new))]",
  Contacted: "bg-[hsl(var(--status-contacted-bg))] text-[hsl(var(--status-contacted))]",
  Qualified: "bg-[hsl(var(--status-qualified-bg))] text-[hsl(var(--status-qualified))]",
};

const metricIconStyles: Record<string, { bg: string; text: string }> = {
  "metric-blue": { bg: "bg-[hsl(var(--metric-blue-bg))]", text: "text-[hsl(var(--metric-blue))]" },
  "metric-green": { bg: "bg-[hsl(var(--metric-green-bg))]", text: "text-[hsl(var(--metric-green))]" },
  "metric-purple": { bg: "bg-[hsl(var(--metric-purple-bg))]", text: "text-[hsl(var(--metric-purple))]" },
  "metric-orange": { bg: "bg-[hsl(var(--metric-orange-bg))]", text: "text-[hsl(var(--metric-orange))]" },
};

const Dashboard = () => {
  const { t } = useLanguage();

  const leadStatusLabelKey: Record<string, string> = {
    New: "status.new",
    Contacted: "status.contacted",
    Qualified: "status.qualified",
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t("dashboard.title")}</h1>
      <p className="text-muted-foreground mt-1">{t("dashboard.subtitle")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {metrics.map((m) => {
          const styles = metricIconStyles[m.colorClass];
          return (
            <div key={m.labelKey} className="bg-card rounded-xl p-5 shadow-sm border border-border">
              <div className={`h-10 w-10 rounded-lg ${styles.bg} flex items-center justify-center mb-4`}>
                <m.icon className={`h-5 w-5 ${styles.text}`} />
              </div>
              <p className="text-3xl font-bold text-card-foreground">{m.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{t(m.labelKey)}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border mt-8">
        <div className="p-4 md:p-6 pb-4">
          <h2 className="text-lg md:text-xl font-bold text-card-foreground">
            {t("dashboard.recentLeads")}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-t border-border">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3">
                  {t("dashboard.table.name")}
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3">
                  {t("dashboard.table.car")}
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3">
                  {t("dashboard.table.source")}
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3">
                  {t("dashboard.table.status")}
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3">
                  {t("dashboard.table.date")}
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.name} className="border-t border-border">
                  <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-medium text-card-foreground">{lead.name}</td>
                  <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-muted-foreground">{lead.car}</td>
                  <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-muted-foreground">{lead.source}</td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    statusStyles[lead.status]
                  }`}
                >
                  {t(leadStatusLabelKey[lead.status] ?? lead.status)}
                </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-muted-foreground">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
