import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Lead } from "@/pages/Leads";
import { useLanguage } from "@/i18n/LanguageProvider";

export type StatusStyles = Record<string, string>;

const LEAD_STATUS_LABEL_KEY: Record<string, string> = {
  New: "status.new",
  Contacted: "status.contacted",
  Qualified: "status.qualified",
};

type LeadTableColumnKey =
  | "name"
  | "instagram"
  | "phone"
  | "car"
  | "status"
  | "source"
  | "date"
  | "actions";

type LeadCardProps = {
  lead: Lead;
  statusStyles: StatusStyles;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  variant: "card" | "row";
  onLeadClick?: (lead: Lead) => void;
  visibleColumns?: LeadTableColumnKey[];
};

export function LeadCardContent({
  lead,
  statusStyles,
  onEdit,
  onDelete,
  compact,
}: {
  lead: Lead;
  statusStyles: StatusStyles;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  compact: boolean;
}) {
  const { t } = useLanguage();
  const statusLabel = t(LEAD_STATUS_LABEL_KEY[lead.status] ?? lead.status);

  const actions = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={`shrink-0 rounded text-muted-foreground hover:text-foreground ${
            compact ? "p-1" : "min-h-11 min-w-11 flex items-center justify-center rounded-lg -m-2"
          }`}
        >
          <MoreVertical className={compact ? "h-4 w-4" : "h-5 w-5"} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onClick={() => onEdit(lead)}>
          {t("leads.actions.edit")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(lead)} className="text-destructive focus:text-destructive">
          {t("leads.actions.delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (compact) {
    return (
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-card-foreground truncate">{lead.name}</p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{lead.car}</p>
        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${statusStyles[lead.status] ?? ""}`}>
          {statusLabel}
          </span>
        </div>
        {actions}
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-sm font-medium text-card-foreground">{lead.name}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{lead.car}</p>
        <p className="text-xs text-muted-foreground mt-1">{lead.source} · {lead.date}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[lead.status]}`}>
          {statusLabel}
        </span>
        {actions}
      </div>
    </div>
  );
}

export function LeadCard({ lead, statusStyles, onEdit, onDelete, variant, onLeadClick }: LeadCardProps) {
  const { t } = useLanguage();

  if (variant === "row") {
    const columns: LeadTableColumnKey[] =
      (Array.isArray((arguments[0] as LeadCardProps).visibleColumns) &&
        (arguments[0] as LeadCardProps).visibleColumns!.length > 0 &&
        ((arguments[0] as LeadCardProps).visibleColumns as LeadTableColumnKey[])) || [
        "name",
        "instagram",
        "phone",
        "car",
        "status",
        "source",
        "date",
        "actions",
      ];

    return (
      <tr className="border-t border-border">
        {columns.map((col) => {
          if (col === "name") {
            return (
              <td key={col} className="px-4 md:px-6 py-3 md:py-4 text-sm font-medium text-card-foreground">
                {lead.name}
              </td>
            );
          }
          if (col === "instagram") {
            return (
              <td key={col} className="px-4 md:px-6 py-3 md:py-4 text-sm text-muted-foreground">
                {lead.instagram}
              </td>
            );
          }
          if (col === "phone") {
            return (
              <td key={col} className="px-4 md:px-6 py-3 md:py-4 text-sm text-muted-foreground">
                {lead.phone}
              </td>
            );
          }
          if (col === "car") {
            return (
              <td key={col} className="px-4 md:px-6 py-3 md:py-4 text-sm text-muted-foreground">
                {lead.car}
              </td>
            );
          }
          if (col === "status") {
            return (
              <td key={col} className="px-4 md:px-6 py-3 md:py-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[lead.status]}`}>
                  {t(LEAD_STATUS_LABEL_KEY[lead.status] ?? lead.status)}
                </span>
              </td>
            );
          }
          if (col === "source") {
            return (
              <td key={col} className="px-4 md:px-6 py-3 md:py-4 text-sm text-muted-foreground">
                {lead.source}
              </td>
            );
          }
          if (col === "date") {
            return (
              <td key={col} className="px-4 md:px-6 py-3 md:py-4 text-sm text-muted-foreground">
                {lead.date}
              </td>
            );
          }
          if (col === "actions") {
            return (
              <td key={col} className="px-4 md:px-6 py-3 md:py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="min-h-9 min-w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-lg">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(lead)}>
                      {t("leads.actions.edit")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(lead)}
                      className="text-destructive focus:text-destructive"
                    >
                      {t("leads.actions.delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            );
          }
          return null;
        })}
      </tr>
    );
  }

  return (
    <div
      className="rounded-lg border bg-card p-3 shadow-sm border-border cursor-grab active:cursor-grabbing"
      onClick={() => onLeadClick?.(lead)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onLeadClick?.(lead)}
    >
      <LeadCardContent
        lead={lead}
        statusStyles={statusStyles}
        onEdit={onEdit}
        onDelete={onDelete}
        compact
      />
    </div>
  );
}
