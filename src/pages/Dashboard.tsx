import { Car, TrendingUp, Users, Zap } from "lucide-react";

const metrics = [
  { icon: Car, value: "24", label: "Active Cars", colorClass: "metric-blue" },
  { icon: TrendingUp, value: "8", label: "New Leads Today", colorClass: "metric-green" },
  { icon: Users, value: "142", label: "Total Leads", colorClass: "metric-purple" },
  { icon: Zap, value: "3", label: "Automations Active", colorClass: "metric-orange" },
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
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
        {metrics.map((m) => {
          const styles = metricIconStyles[m.colorClass];
          return (
            <div key={m.label} className="bg-card rounded-xl p-5 shadow-sm border border-border">
              <div className={`h-10 w-10 rounded-lg ${styles.bg} flex items-center justify-center mb-4`}>
                <m.icon className={`h-5 w-5 ${styles.text}`} />
              </div>
              <p className="text-3xl font-bold text-card-foreground">{m.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border mt-8">
        <div className="p-6 pb-4">
          <h2 className="text-xl font-bold text-card-foreground">Recent Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Name</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Interested Car</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Source</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.name} className="border-t border-border">
                  <td className="px-6 py-4 text-sm font-medium text-card-foreground">{lead.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{lead.car}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{lead.source}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[lead.status]}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{lead.date}</td>
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
