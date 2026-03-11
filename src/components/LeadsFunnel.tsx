import React, { useState, useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Plus } from "lucide-react";
import { LeadCardContent } from "@/components/LeadCard";
import type { Lead, FunnelColumn } from "@/pages/Leads";

type StatusStyles = Record<string, string>;

function DraggableLeadCard({
  lead,
  statusStyles,
  onLeadClick,
  onEdit,
  onDelete,
  isDragging,
}: {
  lead: Lead;
  statusStyles: StatusStyles;
  onLeadClick: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  isDragging?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `lead-${lead.id}`,
    data: { lead },
  });
  const style = transform ? { transform: CSS.Translate.toString(transform) } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border bg-card p-3 shadow-sm border-border cursor-grab active:cursor-grabbing ${isDragging ? "opacity-50" : ""}`}
      {...listeners}
      {...attributes}
      onClick={() => onLeadClick(lead)}
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

function FunnelColumnHeader({
  column,
  onRename,
  onRemove,
  canRemove,
}: {
  column: FunnelColumn;
  onRename: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(column.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const save = () => {
    const trimmed = editValue.trim();
    if (trimmed) onRename(column.id, trimmed);
    else setEditValue(column.name);
    setIsEditing(false);
  };

  React.useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
          className="flex-1 bg-muted border border-border rounded px-2 py-1 text-sm text-foreground"
        />
      ) : (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="text-left font-semibold text-sm text-foreground hover:underline"
        >
          {column.name}
        </button>
      )}
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(column.id)}
          className="text-xs text-muted-foreground hover:text-destructive"
        >
          Remove
        </button>
      )}
    </div>
  );
}

export function LeadsFunnel({
  leads,
  columns,
  onLeadStatusChange,
  onColumnsChange,
  onLeadClick,
  statusStyles,
  onDeleteLead,
}: {
  leads: Lead[];
  columns: FunnelColumn[];
  onLeadStatusChange: (leadId: string, newStatusKey: string) => void;
  onColumnsChange: (columns: FunnelColumn[]) => void;
  onLeadClick: (lead: Lead) => void;
  statusStyles: StatusStyles;
  onDeleteLead?: (lead: Lead) => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const justDraggedRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    justDraggedRef.current = false;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    justDraggedRef.current = true;
    if (over && active.id !== over.id) {
      const leadData = active.data.current as { lead: Lead };
      const overId = over.id as string;
      const targetColumn = columns.find((c) => c.id === overId);
      if (leadData?.lead && targetColumn) {
        onLeadStatusChange(leadData.lead.id, targetColumn.statusKey);
      }
    }
    setTimeout(() => {
      justDraggedRef.current = false;
    }, 100);
  };

  const handleCardClick = (lead: Lead) => {
    if (!justDraggedRef.current) onLeadClick(lead);
  };

  const handleRenameColumn = (id: string, name: string) => {
    onColumnsChange(
      columns.map((c) => (c.id === id ? { ...c, name } : c))
    );
  };

  const handleRemoveColumn = (id: string) => {
    const col = columns.find((c) => c.id === id);
    if (!col) return;
    const firstStatus = columns[0]?.statusKey;
    if (firstStatus) {
      leads.forEach((l) => {
        if (l.status === col.statusKey) onLeadStatusChange(l.id, firstStatus);
      });
    }
    onColumnsChange(columns.filter((c) => c.id !== id));
  };

  const handleAddColumn = () => {
    const num = columns.length + 1;
    onColumnsChange([
      ...columns,
      { id: `col-new-${Date.now()}`, name: `Column ${num}`, statusKey: `custom-${Date.now()}` },
    ]);
  };

  const activeLead = activeId && typeof activeId === "string" && activeId.startsWith("lead-")
    ? leads.find((l) => `lead-${l.id}` === activeId)
    : null;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <FunnelColumnDropZone
            key={col.id}
            column={col}
            leads={leads.filter((l) => l.status === col.statusKey)}
            statusStyles={statusStyles}
            onLeadClick={handleCardClick}
            onEdit={onLeadClick}
            onDelete={onDeleteLead ?? (() => {})}
            onRename={handleRenameColumn}
            onRemove={handleRemoveColumn}
            canRemove={columns.length > 1}
            activeId={activeId}
          />
        ))}
        <button
          type="button"
          onClick={handleAddColumn}
          className="flex-shrink-0 w-64 border-2 border-dashed border-border flex items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add column
        </button>
      </div>
      <DragOverlay>
        {activeLead ? (
          <div className="border bg-card p-3 shadow-lg border-border cursor-grabbing opacity-95">
            <LeadCardContent
              lead={activeLead}
              statusStyles={statusStyles}
              onEdit={() => {}}
              onDelete={() => {}}
              compact
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function FunnelColumnDropZone({
  column,
  leads,
  statusStyles,
  onLeadClick,
  onEdit,
  onDelete,
  onRename,
  onRemove,
  canRemove,
  activeId,
}: {
  column: FunnelColumn;
  leads: Lead[];
  statusStyles: StatusStyles;
  onLeadClick: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onRename: (id: string, name: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
  activeId: string | null;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const hoverClasses = isOver
    ? "border-primary bg-primary/5"
    : "border-border bg-muted/30";

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-64 min-h-[200px] p-3 border transition-colors ${hoverClasses}`}
    >
      <FunnelColumnHeader
        column={column}
        onRename={onRename}
        onRemove={onRemove}
        canRemove={canRemove}
      />
      <div className="space-y-2">
        {leads.map((lead) => (
          <DraggableLeadCard
            key={lead.id}
            lead={lead}
            statusStyles={statusStyles}
            onLeadClick={onLeadClick}
            onEdit={onEdit}
            onDelete={onDelete}
            isDragging={activeId === `lead-${lead.id}`}
          />
        ))}
      </div>
    </div>
  );
}
