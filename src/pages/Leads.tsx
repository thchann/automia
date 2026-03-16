import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadCard } from "@/components/LeadCard";
import { LeadsFunnel } from "@/components/LeadsFunnel";
import { useLanguage } from "@/i18n/LanguageProvider";

// Leads page tracks potential customers and their interest in cars.
// Static seed data is used for now; in a real app this would come from an API
// and be wired through React Query.
export type Lead = {
  id: string;
  name: string;
  instagram: string;
  phone: string;
  car: string;
  status: string;
  source: string;
  date: string;
  notes?: string;
};

export type FunnelColumn = {
  id: string;
  name: string;
  statusKey: string;
};

const statusStyles: Record<string, string> = {
  New: "bg-[hsl(var(--status-new-bg))] text-[hsl(var(--status-new))]",
  Contacted: "bg-[hsl(var(--status-contacted-bg))] text-[hsl(var(--status-contacted))]",
  Qualified: "bg-[hsl(var(--status-qualified-bg))] text-[hsl(var(--status-qualified))]",
};

const initialLeads: Lead[] = [
  {
    id: "1",
    name: "John Martinez",
    instagram: "@johnm_auto",
    phone: "(555) 123-4567",
    car: "2024 Tesla Model 3",
    status: "New",
    source: "Instagram DM",
    date: "Mar 8, 2026",
    notes: "",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    instagram: "@sarahj",
    phone: "(555) 234-5678",
    car: "2023 BMW M4",
    status: "Contacted",
    source: "Facebook",
    date: "Mar 7, 2026",
    notes: "",
  },
  {
    id: "3",
    name: "Michael Chen",
    instagram: "@mikechen",
    phone: "(555) 345-6789",
    car: "2024 Porsche 911",
    status: "Qualified",
    source: "Instagram Story",
    date: "Mar 7, 2026",
    notes: "",
  },
  {
    id: "4",
    name: "Emma Wilson",
    instagram: "@emmaw",
    phone: "(555) 456-7890",
    car: "2023 Mercedes C-Class",
    status: "New",
    source: "Website Form",
    date: "Mar 6, 2026",
    notes: "",
  },
  {
    id: "5",
    name: "David Brown",
    instagram: "@dbrown_cars",
    phone: "(555) 567-8901",
    car: "2024 Audi RS6",
    status: "Contacted",
    source: "Instagram DM",
    date: "Mar 6, 2026",
    notes: "",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    instagram: "@lisaa",
    phone: "(555) 678-9012",
    car: "2023 Lexus LC 500",
    status: "Qualified",
    source: "Instagram Post",
    date: "Mar 5, 2026",
    notes: "",
  },
  {
    id: "7",
    name: "Robert Taylor",
    instagram: "@rob_t",
    phone: "(555) 789-0123",
    car: "2024 Tesla Model S",
    status: "New",
    source: "Instagram DM",
    date: "Mar 5, 2026",
    notes: "",
  },
];

const defaultFunnelColumns: FunnelColumn[] = [
  { id: "col-new", name: "New", statusKey: "New" },
  { id: "col-contacted", name: "Contacted", statusKey: "Contacted" },
  { id: "col-qualified", name: "Qualified", statusKey: "Qualified" },
];

type LeadColumnKey =
  | "name"
  | "instagram"
  | "phone"
  | "car"
  | "status"
  | "source"
  | "date"
  | "actions";

type LeadColumnConfig = {
  key: LeadColumnKey;
  label: string;
  sortableType?: "alpha" | "numeric" | "date";
};

const LEADS_VISIBLE_COLUMNS_KEY = "leads:visibleColumns";
const LEADS_SORT_KEY = "leads:sort";

const leadColumns: LeadColumnConfig[] = [
  { key: "name", label: "Name", sortableType: "alpha" },
  { key: "instagram", label: "Instagram" },
  { key: "phone", label: "Phone" },
  { key: "car", label: "Interested Car", sortableType: "alpha" },
  { key: "status", label: "Status", sortableType: "alpha" },
  { key: "source", label: "Source", sortableType: "alpha" },
  { key: "date", label: "Date", sortableType: "date" },
  { key: "actions", label: "Actions" },
];

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [view, setView] = useState<"table" | "funnel">("table");
  const [funnelColumns, setFunnelColumns] = useState<FunnelColumn[]>(defaultFunnelColumns);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [draftLead, setDraftLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [leadToConfirmDelete, setLeadToConfirmDelete] = useState<Lead | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<LeadColumnKey[]>(() => {
    try {
      const stored = localStorage.getItem(LEADS_VISIBLE_COLUMNS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as LeadColumnKey[];
        if (Array.isArray(parsed) && parsed.length) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return leadColumns.map((c) => c.key);
  });
  const [sortKey, setSortKey] = useState<LeadColumnKey | null>(() => {
    try {
      const stored = localStorage.getItem(LEADS_SORT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { key?: LeadColumnKey | null; direction?: "asc" | "desc" } | null;
        return parsed?.key ?? null;
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(() => {
    try {
      const stored = localStorage.getItem(LEADS_SORT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { key?: LeadColumnKey | null; direction?: "asc" | "desc" } | null;
        if (parsed?.direction === "asc" || parsed?.direction === "desc") {
          return parsed.direction;
        }
      }
    } catch {
      // ignore
    }
    return "asc";
  });

  const { t } = useLanguage();

  const localizedLeadColumns: LeadColumnConfig[] = leadColumns.map((c) => ({
    ...c,
    label: t(`leads.column.${c.key}`),
  }));

  useEffect(() => {
    localStorage.setItem(LEADS_VISIBLE_COLUMNS_KEY, JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  useEffect(() => {
    localStorage.setItem(LEADS_SORT_KEY, JSON.stringify({ key: sortKey, direction: sortDirection }));
  }, [sortKey, sortDirection]);

  const handleDeleteLead = (lead: Lead) => {
    setLeadToDelete(lead);
  };

  const confirmDelete = () => {
    if (leadToConfirmDelete) {
      setLeads((prev) => prev.filter((l) => l.id !== leadToConfirmDelete.id));
      setLeadToConfirmDelete(null);
    }
  };

  const handleLeadStatusChange = (leadId: string, newStatusKey: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatusKey } : l))
    );
  };

  const handleChangeStatusFromDialog = (leadId: string, newStatus: string) => {
    handleLeadStatusChange(leadId, newStatus);
    setSelectedLead(null);
  };

  const handleColumnsChange = (columns: FunnelColumn[]) => {
    setFunnelColumns(columns);
  };

  const handleGenerateLead = () => {
    setLeads((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        name: "New Lead",
        instagram: "",
        phone: "",
        car: "",
        status: "New",
        source: "",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        notes: "",
      },
    ]);
  };

  const handleOpenEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setDraftLead({ ...lead, notes: lead.notes ?? "" });
  };

  const handleSaveLeadEdits = () => {
    if (!draftLead) return;
    const trimmedNotes = (draftLead.notes ?? "").slice(0, 400).trim();
    const nextLead: Lead = { ...draftLead, notes: trimmedNotes.length ? trimmedNotes : "" };
    setLeads((prev) => prev.map((l) => (l.id === nextLead.id ? nextLead : l)));
    setEditingLead(null);
    setDraftLead(null);
  };

  const handleHeaderSort = (key: LeadColumnKey) => {
    const columnConfig = leadColumns.find((c) => c.key === key);
    if (!columnConfig || !columnConfig.sortableType) return;

    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
    } else if (sortDirection === "asc") {
      setSortDirection("desc");
    } else {
      setSortKey(null);
      setSortDirection("asc");
    }
  };

  const orderedColumns = localizedLeadColumns.filter((c) => visibleColumns.includes(c.key));

  const sortedLeads = (() => {
    // Start from original leads
    let result = [...leads];

    // Apply sorting if active
    if (!sortKey) return result;
    const columnConfig = leadColumns.find((c) => c.key === sortKey);
    if (!columnConfig || !columnConfig.sortableType) return result;

    const sorted = [...result].sort((a, b) => {
      const type = columnConfig.sortableType;
      if (type === "alpha") {
        const av = String((a as any)[sortKey] ?? "").toLowerCase();
        const bv = String((b as any)[sortKey] ?? "").toLowerCase();
        return av.localeCompare(bv);
      }
      if (type === "numeric") {
        const parseNum = (val: unknown) => {
          if (typeof val === "number") return val;
          if (typeof val === "string") {
            const n = Number(val.replace(/[^0-9.]/g, ""));
            return Number.isNaN(n) ? 0 : n;
          }
          return 0;
        };
        const av = parseNum((a as any)[sortKey]);
        const bv = parseNum((b as any)[sortKey]);
        return av - bv;
      }
      if (type === "date") {
        const ad = new Date(a.date).getTime();
        const bd = new Date(b.date).getTime();
        return ad - bd;
      }
      return 0;
    });

    if (sortDirection === "desc") sorted.reverse();
    return sorted;
  })();

  const statusLabelKeyByValue: Record<string, string> = {
    New: "status.new",
    Contacted: "status.contacted",
    Qualified: "status.qualified",
  };

  const getLeadStatusLabel = (status: string) =>
    t(statusLabelKeyByValue[status] ?? status);

  return (
    <div>
      {/* <h1 className="text-2xl md:text-3xl font-bold text-foreground font-title">{t("leads.title")}</h1>
      <p className="text-muted-foreground mt-1">{t("leads.subtitle")}</p> */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setView("table")}
            className={`text-sm font-medium pb-2 -mb-px border-b-2 transition-colors ${
              view === "table"
                ? "border-border text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {t("leads.tableTab")}
          </button>
          <button
            type="button"
            onClick={() => setView("funnel")}
            className={`ml-6 text-sm font-medium pb-2 -mb-px border-b-2 transition-colors ${
              view === "funnel"
                ? "border-border text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {t("leads.funnelTab")}
          </button>
        </div>
        <button
          type="button"
          onClick={handleGenerateLead}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 min-h-11 rounded-lg font-medium text-sm border border-border hover:opacity-90 transition-opacity"
          >
          <Plus className="h-4 w-4" />
          {t("leads.generateLead")}
        </button>
      </div>

      <div className="border-b border-border mt-2" />

      {view === "table" && (
        <>
          {/* Search, filters, and table – shared across mobile and desktop */}
          <div className="flex items-center gap-4 mt-6">
            <input
              type="text"
              // Search is not wired yet; placeholder for future behavior.
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("leads.searchPlaceholder")}
              className="w-full max-w-xs rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <div className="flex items-center gap-2 text-xs">
              <details className="relative">
                <summary className="list-none cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-muted">
                  {t("leads.filters")}
                </summary>
                <div className="absolute right-0 mt-2 w-64 rounded-md border border-border bg-background p-3 shadow-md z-50">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    {t("leads.visibleColumns")}
                  </p>
                  <div className="flex flex-col space-y-1 max-h-40 overflow-auto mb-1">
                    {localizedLeadColumns.map((col) => (
                      <label
                        key={col.key}
                        className="flex w-full items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-muted transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="shrink-0"
                          checked={visibleColumns.includes(col.key)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setVisibleColumns((prev) => {
                              if (checked) {
                                return prev.includes(col.key) ? prev : [...prev, col.key];
                              }
                              const next = prev.filter((k) => k !== col.key);
                              // Prevent hiding all columns
                              return next.length ? next : prev;
                            });
                          }}
                        />
                        <span className="flex-1 text-xs text-foreground">{col.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </details>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border overflow-x-auto mt-4">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  {orderedColumns.map((col) => {
                    const isSortable = !!col.sortableType;
                    const isActive = sortKey === col.key;
                    // Always show an indicator for sortable columns:
                    // - \"●\" when unsorted
                    // - \"▲\" when ascending
                    // - \"▼\" when descending
                    let indicator: string | null = null;
                    if (isSortable) {
                      if (!isActive) {
                        indicator = "●";
                      } else {
                        indicator = sortDirection === "asc" ? "▲" : "▼";
                      }
                    }

                    return (
                      <th
                        key={col.key}
                        className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 md:px-6 py-3"
                      >
                        <button
                          type="button"
                          className={`inline-flex items-center gap-1 ${
                            isSortable ? "cursor-pointer hover:text-foreground" : "cursor-default"
                          }`}
                          onClick={() => isSortable && handleHeaderSort(col.key)}
                        >
                          <span>{col.label}</span>
                          {indicator && <span className="text-[10px]">{indicator}</span>}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sortedLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    statusStyles={statusStyles}
                    variant="row"
                    onEdit={handleOpenEditLead}
                    onDelete={handleDeleteLead}
                    visibleColumns={orderedColumns.map((c) => c.key)}
                    onLeadClick={setSelectedLead}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {view === "funnel" && (
        <div className="mt-6">
          <LeadsFunnel
            leads={leads}
            columns={funnelColumns}
            onLeadStatusChange={handleLeadStatusChange}
            onColumnsChange={handleColumnsChange}
            onLeadClick={setSelectedLead}
            onDeleteLead={handleDeleteLead}
            statusStyles={statusStyles}
          />
        </div>
      )}

      {/* View-only lead details dialog (opened from row/card click) */}
      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("leads.leadDetails")}</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="grid gap-3 text-sm">
              <p>
                <span className="font-medium text-muted-foreground">
                  {t("leads.column.name")}
                </span>
                <br />
                {selectedLead.name}
              </p>
              <p>
                <span className="font-medium text-muted-foreground">
                  {t("leads.column.instagram")}
                </span>
                <br />
                {selectedLead.instagram}
              </p>
              <p>
                <span className="font-medium text-muted-foreground">
                  {t("leads.column.phone")}
                </span>
                <br />
                {selectedLead.phone}
              </p>
              <p>
                <span className="font-medium text-muted-foreground">
                  {t("leads.column.car")}
                </span>
                <br />
                {selectedLead.car}
              </p>
              <div>
                <span className="font-medium text-muted-foreground">
                  {t("leads.status")}
                </span>
                <br />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="mt-1 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium border border-border bg-card hover:bg-muted transition-colors"
                    >
                      <span className={`px-2 py-0.5 rounded-full ${statusStyles[selectedLead.status] ?? ""}`}>
                        {getLeadStatusLabel(selectedLead.status)}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-[180px]">
                    {funnelColumns.map((col) => {
                      const isCurrent = col.statusKey === selectedLead.status;
                      return (
                        <DropdownMenuItem
                          key={col.id}
                          className="flex items-center gap-2"
                          disabled={isCurrent}
                          onClick={() => {
                            if (!isCurrent) {
                              handleChangeStatusFromDialog(selectedLead.id, col.statusKey);
                            }
                          }}
                        >
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              statusStyles[col.statusKey] ?? ""
                            }`}
                          >
                            {getLeadStatusLabel(col.statusKey)}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] text-muted-foreground ml-1">
                              {t("leads.statusCurrent")}
                            </span>
                          )}
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p>
                <span className="font-medium text-muted-foreground">
                  {t("leads.source")}
                </span>
                <br />
                {selectedLead.source}
              </p>
              <p>
                <span className="font-medium text-muted-foreground">
                  {t("leads.date")}
                </span>
                <br />
                {selectedLead.date}
              </p>
              {selectedLead.notes && selectedLead.notes.trim().length > 0 && (
                <p>
                  <span className="font-medium text-muted-foreground">
                    {t("leads.notesLabel")}
                  </span>
                  <br />
                  <span className="whitespace-pre-wrap break-words">
                    {selectedLead.notes}
                  </span>
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit lead dialog (opened from actions -> Edit lead) */}
      <Dialog
        open={!!editingLead}
        onOpenChange={(open) => {
          if (!open) {
            setEditingLead(null);
            setDraftLead(null);
          }
        }}
      >
        <DialogContent className="max-w-md max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{t("leads.leadEdit")}</DialogTitle>
          </DialogHeader>
          {draftLead && (
            <>
              <div className="mt-2 flex-1 overflow-y-auto pr-1">
                <div className="grid gap-3 text-sm pb-2">
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("leads.column.name")}
                    </span>
                    <input
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                      value={draftLead.name}
                      onChange={(e) => setDraftLead({ ...draftLead, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("leads.column.instagram")}
                    </span>
                    <input
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                      value={draftLead.instagram}
                      onChange={(e) => setDraftLead({ ...draftLead, instagram: e.target.value })}
                    />
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("leads.column.phone")}
                    </span>
                    <input
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                      value={draftLead.phone}
                      onChange={(e) => setDraftLead({ ...draftLead, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("leads.column.car")}
                    </span>
                    <input
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                      value={draftLead.car}
                      onChange={(e) => setDraftLead({ ...draftLead, car: e.target.value })}
                    />
                  </div>
                  <div>
                    <span className="block font-medium text-muted-foreground">
                      {t("leads.status")}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="mt-1 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium border border-border bg-card hover:bg-muted transition-colors"
                        >
                          <span
                            className={`px-2 py-0.5 rounded-full ${
                              statusStyles[draftLead.status] ?? ""
                            }`}
                          >
                            {getLeadStatusLabel(draftLead.status)}
                          </span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-[180px]">
                        {funnelColumns.map((col) => {
                          const isCurrent = col.statusKey === draftLead.status;
                          return (
                            <DropdownMenuItem
                              key={col.id}
                              className="flex items-center gap-2"
                              disabled={isCurrent}
                              onClick={() => {
                                if (!isCurrent) {
                                  setDraftLead({ ...draftLead, status: col.statusKey });
                                }
                              }}
                            >
                              <span
                                className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                  statusStyles[col.statusKey] ?? ""
                                }`}
                              >
                                {getLeadStatusLabel(col.statusKey)}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] text-muted-foreground ml-1">
                                  {t("leads.statusCurrent")}
                                </span>
                              )}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("leads.source")}
                    </span>
                    <input
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                      value={draftLead.source}
                      onChange={(e) => setDraftLead({ ...draftLead, source: e.target.value })}
                    />
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("leads.date")}
                    </span>
                    <input
                      className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm"
                      value={draftLead.date}
                      onChange={(e) => setDraftLead({ ...draftLead, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {t("leads.notesLabel")}
                    </span>
                    <textarea
                      maxLength={400}
                      value={draftLead.notes ?? ""}
                      onChange={(e) => setDraftLead({ ...draftLead, notes: e.target.value })}
                      placeholder={t("leads.notesPlaceholder")}
                      className="mt-1 w-full min-h-[96px] resize-none rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground"
                    />
                    <div className="mt-1 text-[11px] text-muted-foreground text-right">
                      {(draftLead.notes ?? "").length}/400
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  className="px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium border border-border hover:opacity-90 transition-opacity"
                  onClick={handleSaveLeadEdits}
                >
                  {t("leads.saveChanges")}
                </button>
                <button
                  type="button"
                  className="px-3 py-2 rounded-md border border-border text-sm text-muted-foreground hover:bg-muted transition-colors"
                  onClick={() => {
                    setEditingLead(null);
                    setDraftLead(null);
                  }}
                >
                  {t("leads.deleteCancel")}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* First delete dialog: initial confirmation */}
      <AlertDialog open={!!leadToDelete} onOpenChange={(open) => !open && setLeadToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("leads.deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {leadToDelete
                ? t("leads.deleteDescription", { name: leadToDelete.name })
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("leads.deleteCancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (leadToDelete) {
                  setLeadToConfirmDelete(leadToDelete);
                  setLeadToDelete(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("leads.deleteConfirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Second delete dialog: final irreversible confirmation */}
      <AlertDialog
        open={!!leadToConfirmDelete}
        onOpenChange={(open) => !open && setLeadToConfirmDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("leads.deleteConfirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {leadToConfirmDelete
                ? t("leads.deleteConfirmDescription", { name: leadToConfirmDelete.name })
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("leads.deleteCancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-black text-destructive hover:bg-black/90"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Leads;
