import { MoreVertical } from "lucide-react";

const statusStyles: Record<string, string> = {
  New: "bg-[hsl(var(--status-new-bg))] text-[hsl(var(--status-new))]",
  Contacted: "bg-[hsl(var(--status-contacted-bg))] text-[hsl(var(--status-contacted))]",
  Qualified: "bg-[hsl(var(--status-qualified-bg))] text-[hsl(var(--status-qualified))]",
};

const leads = [
  { name: "John Martinez", instagram: "@johnm_auto", phone: "(555) 123-4567", car: "2024 Tesla Model 3", status: "New", source: "Instagram DM", date: "Mar 8, 2026" },
  { name: "Sarah Johnson", instagram: "@sarahj", phone: "(555) 234-5678", car: "2023 BMW M4", status: "Contacted", source: "Facebook", date: "Mar 7, 2026" },
  { name: "Michael Chen", instagram: "@mikechen", phone: "(555) 345-6789", car: "2024 Porsche 911", status: "Qualified", source: "Instagram Story", date: "Mar 7, 2026" },
  { name: "Emma Wilson", instagram: "@emmaw", phone: "(555) 456-7890", car: "2023 Mercedes C-Class", status: "New", source: "Website Form", date: "Mar 6, 2026" },
  { name: "David Brown", instagram: "@dbrown_cars", phone: "(555) 567-8901", car: "2024 Audi RS6", status: "Contacted", source: "Instagram DM", date: "Mar 6, 2026" },
  { name: "Lisa Anderson", instagram: "@lisaa", phone: "(555) 678-9012", car: "2023 Lexus LC 500", status: "Qualified", source: "Instagram Post", date: "Mar 5, 2026" },
  { name: "Robert Taylor", instagram: "@rob_t", phone: "(555) 789-0123", car: "2024 Tesla Model S", status: "New", source: "Instagram DM", date: "Mar 5, 2026" },
];

const Leads = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">Leads</h1>
      <p className="text-muted-foreground mt-1">Track and manage your sales opportunities.</p>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-x-auto mt-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Name", "Instagram", "Phone", "Interested Car", "Status", "Source", "Date", "Actions"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.name} className="border-t border-border">
                <td className="px-6 py-4 text-sm font-medium text-card-foreground">{lead.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{lead.instagram}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{lead.phone}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{lead.car}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[lead.status]}`}>{lead.status}</span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{lead.source}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{lead.date}</td>
                <td className="px-6 py-4">
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
