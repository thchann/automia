import { useState, useEffect } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import carTesla from "@/assets/car-tesla.jpg";
import carBmw from "@/assets/car-bmw.jpg";
import carPorsche from "@/assets/car-porsche.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";
import carAudi from "@/assets/car-audi.jpg";
import carLexus from "@/assets/car-lexus.jpg";

// Cars page lists inventory and client vehicles.
// It renders a mobile-friendly card list and a desktop table, both backed by
// the same static sample data for now (ready to swap for API data later).
const ownerStyles: Record<string, string> = {
  Owned: "bg-[hsl(var(--owner-owned-bg))] text-[hsl(var(--owner-owned))]",
  Client: "bg-[hsl(var(--owner-client-bg))] text-[hsl(var(--owner-client))]",
  Advisory: "bg-[hsl(var(--owner-advisory-bg))] text-[hsl(var(--owner-advisory))]",
};

const statusStyles: Record<string, string> = {
  Available: "bg-[hsl(var(--status-available-bg))] text-[hsl(var(--status-available))]",
  Pending: "bg-[hsl(var(--status-pending-bg))] text-[hsl(var(--status-pending))]",
  Sold: "bg-[hsl(var(--status-sold-bg))] text-[hsl(var(--status-sold))]",
};

const cars = [
  { image: carTesla, make: "Tesla", model: "Model 3", year: 2024, price: "$45,990", owner: "Owned", status: "Available" },
  { image: carBmw, make: "BMW", model: "M4", year: 2023, price: "$76,500", owner: "Client", status: "Available" },
  { image: carPorsche, make: "Porsche", model: "911", year: 2024, price: "$115,000", owner: "Advisory", status: "Pending" },
  { image: carMercedes, make: "Mercedes", model: "C-Class", year: 2023, price: "$54,500", owner: "Client", status: "Available" },
  { image: carAudi, make: "Audi", model: "RS6", year: 2024, price: "$118,000", owner: "Owned", status: "Sold" },
  { image: carLexus, make: "Lexus", model: "LC 500", year: 2023, price: "$93,975", owner: "Advisory", status: "Available" },
];

type Car = (typeof cars)[number];

type CarColumnKey =
  | "image"
  | "make"
  | "year"
  | "price"
  | "owner"
  | "status"
  | "actions";

type CarColumnConfig = {
  key: CarColumnKey;
  label: string;
  sortableType?: "alpha" | "numeric";
};

const CARS_VISIBLE_COLUMNS_KEY = "cars:visibleColumns";
const CARS_SORT_KEY = "cars:sort";

const carColumns: CarColumnConfig[] = [
  { key: "image", label: "Image" },
  { key: "make", label: "Make/Model", sortableType: "alpha" },
  { key: "year", label: "Year", sortableType: "numeric" },
  { key: "price", label: "Price", sortableType: "numeric" },
  { key: "owner", label: "Owner Type", sortableType: "alpha" },
  { key: "status", label: "Status", sortableType: "alpha" },
  { key: "actions", label: "Actions" },
];

const Cars = () => {
  const [visibleColumns, setVisibleColumns] = useState<CarColumnKey[]>(() => {
    try {
      const stored = localStorage.getItem(CARS_VISIBLE_COLUMNS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CarColumnKey[];
        if (Array.isArray(parsed) && parsed.length) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return carColumns.map((c) => c.key);
  });
  const [sortKey, setSortKey] = useState<CarColumnKey | null>(() => {
    try {
      const stored = localStorage.getItem(CARS_SORT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { key?: CarColumnKey | null; direction?: "asc" | "desc" } | null;
        return parsed?.key ?? null;
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(() => {
    try {
      const stored = localStorage.getItem(CARS_SORT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { key?: CarColumnKey | null; direction?: "asc" | "desc" } | null;
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

  const localizedColumns = carColumns.map((c) => {
    const key = `cars.column.${c.key}`;
    return {
      ...c,
      label: t(key),
    };
  });

  useEffect(() => {
    localStorage.setItem(CARS_VISIBLE_COLUMNS_KEY, JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  useEffect(() => {
    localStorage.setItem(CARS_SORT_KEY, JSON.stringify({ key: sortKey, direction: sortDirection }));
  }, [sortKey, sortDirection]);

  const handleHeaderSort = (key: CarColumnKey) => {
    const columnConfig = carColumns.find((c) => c.key === key);
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

  const orderedColumns = localizedColumns.filter((c) => visibleColumns.includes(c.key));

  const sortedCars = (() => {
    let result = [...cars];

    if (!sortKey) return result;
    const columnConfig = carColumns.find((c) => c.key === sortKey);
    if (!columnConfig || !columnConfig.sortableType) return result;

    const sorted = [...result].sort((a, b) => {
      const type = columnConfig.sortableType;
      if (type === "alpha") {
        let av = "";
        let bv = "";
        if (sortKey === "make") {
          av = `${a.make} ${a.model}`.toLowerCase();
          bv = `${b.make} ${b.model}`.toLowerCase();
        } else if (sortKey === "owner" || sortKey === "status") {
          av = String((a as any)[sortKey] ?? "").toLowerCase();
          bv = String((b as any)[sortKey] ?? "").toLowerCase();
        }
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
        const av = sortKey === "year" ? a.year : parseNum(a.price);
        const bv = sortKey === "year" ? b.year : parseNum(b.price);
        return av - bv;
      }
      return 0;
    });

    if (sortDirection === "desc") sorted.reverse();
    return sorted;
  })();

  return (
    <div>
      <div className="mb-4 md:mb-6 text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">{t("cars.title")}</h1>
        <p className="text-muted-foreground mt-1">{t("cars.subtitle")}</p>
      </div>

      {/* Search + filters + primary action row (same layout on mobile & desktop) */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder={t("cars.searchPlaceholder")}
            className="w-full max-w-xs rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
          <div className="flex items-center gap-2 text-xs">
            <details className="relative">
              <summary className="list-none cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-muted">
                {t("cars.filters")}
              </summary>
              <div className="absolute right-0 mt-2 w-64 rounded-md border border-border bg-background p-3 shadow-md z-50">
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  {t("cars.visibleColumns")}
                </p>
                <div className="flex flex-col space-y-1 max-h-40 overflow-auto mb-1">
                  {localizedColumns.map((col) => (
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
        <button className="ml-4 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 border border-border hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          {t("cars.addCar")}
        </button>
      </div>
      {/* Table layout for all breakpoints (Google Sheets style), with horizontal scroll on small screens */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-x-auto">
        <table className="w-full min-w-[700px]">
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
            {sortedCars.map((car) => (
              <tr key={`${car.make}-${car.model}`} className="border-t border-border">
                {orderedColumns.map((col) => {
                  if (col.key === "image") {
                    return (
                      <td key={col.key} className="px-4 md:px-6 py-3 md:py-4">
                        <img src={car.image} alt={`${car.make} ${car.model}`} className="h-14 w-20 object-cover rounded-lg" />
                      </td>
                    );
                  }
                  if (col.key === "make") {
                    return (
                      <td key={col.key} className="px-4 md:px-6 py-3 md:py-4">
                        <p className="text-sm font-medium text-card-foreground">{car.make}</p>
                        <p className="text-xs text-muted-foreground">{car.model}</p>
                      </td>
                    );
                  }
                  if (col.key === "year") {
                    return (
                      <td key={col.key} className="px-4 md:px-6 py-3 md:py-4 text-sm text-muted-foreground">
                        {car.year}
                      </td>
                    );
                  }
                  if (col.key === "price") {
                    return (
                      <td key={col.key} className="px-4 md:px-6 py-3 md:py-4 text-sm font-medium text-card-foreground">
                        {car.price}
                      </td>
                    );
                  }
                  if (col.key === "owner") {
                    return (
                      <td key={col.key} className="px-4 md:px-6 py-3 md:py-4">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            ownerStyles[car.owner]
                          }`}
                        >
                          {t(
                            car.owner === "Owned"
                              ? "owner.owned"
                              : car.owner === "Client"
                              ? "owner.client"
                              : car.owner === "Advisory"
                              ? "owner.advisory"
                              : car.owner,
                          )}
                        </span>
                      </td>
                    );
                  }
                  if (col.key === "status") {
                    return (
                      <td key={col.key} className="px-4 md:px-6 py-3 md:py-4">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            statusStyles[car.status]
                          }`}
                        >
                          {t(
                            car.status === "Available"
                              ? "status.available"
                              : car.status === "Pending"
                              ? "status.pending"
                              : car.status === "Sold"
                              ? "status.sold"
                              : car.status,
                          )}
                        </span>
                      </td>
                    );
                  }
                  if (col.key === "actions") {
                    return (
                      <td key={col.key} className="px-4 md:px-6 py-3 md:py-4">
                        <button className="min-h-9 min-w-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded-lg">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </td>
                    );
                  }
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cars;
