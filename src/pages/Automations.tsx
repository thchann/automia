import { Instagram, MessageCircle, TrendingUp, Settings } from "lucide-react";

const automations = [
  {
    icon: Instagram,
    title: "Instagram DM Auto-Responder",
    description: "Automatically responds to incoming DMs with car availability",
    status: "Active" as const,
    channel: "Instagram",
    messages: 24,
    leads: 8,
    lastActive: "2 minutes ago",
  },
  {
    icon: MessageCircle,
    title: "Lead Qualification Bot",
    description: "Qualifies leads by asking pre-screening questions",
    status: "Active" as const,
    channel: "Instagram",
    messages: 12,
    leads: 4,
    lastActive: "15 minutes ago",
  },
  {
    icon: TrendingUp,
    title: "Price Alert Automation",
    description: "Sends price drop alerts to interested leads",
    status: "Active" as const,
    channel: "Multi-Channel",
    messages: 6,
    leads: 3,
    lastActive: "1 hour ago",
  },
  {
    icon: MessageCircle,
    title: "Follow-up Sequence",
    description: "Automated follow-up messages for inactive leads",
    status: "Paused" as const,
    channel: "Instagram",
    messages: 0,
    leads: 0,
    lastActive: "3 days ago",
  },
];

const Automations = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">Automations</h1>
      <p className="text-muted-foreground mt-1">Manage your automated workflows and bots.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {automations.map((a) => (
          <div key={a.title} className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <a.icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-card-foreground">{a.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{a.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                a.status === "Active"
                  ? "bg-[hsl(var(--status-active-bg))] text-[hsl(var(--status-active))]"
                  : "bg-[hsl(var(--status-paused-bg))] text-[hsl(var(--status-paused))]"
              }`}>
                {a.status}
              </span>
              <span className="text-xs text-muted-foreground">{a.channel}</span>
            </div>

            <div className="border-t border-border pt-4 flex gap-8 mb-5">
              <div>
                <p className="text-xs text-muted-foreground">Messages</p>
                <p className="text-xl font-bold text-card-foreground">{a.messages}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Leads</p>
                <p className="text-xl font-bold text-card-foreground">{a.leads}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Active</p>
                <p className="text-sm font-medium text-card-foreground mt-1">{a.lastActive}</p>
              </div>
            </div>

            {a.status === "Active" && (
              <button className="w-full flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 text-sm font-medium text-card-foreground hover:bg-muted transition-colors mt-auto">
                <Settings className="h-4 w-4" />
                Configure
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Automations;
