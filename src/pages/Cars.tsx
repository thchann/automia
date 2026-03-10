import { Plus, MoreVertical } from "lucide-react";
import carTesla from "@/assets/car-tesla.jpg";
import carBmw from "@/assets/car-bmw.jpg";
import carPorsche from "@/assets/car-porsche.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";
import carAudi from "@/assets/car-audi.jpg";
import carLexus from "@/assets/car-lexus.jpg";

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

const Cars = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cars</h1>
          <p className="text-muted-foreground mt-1">Manage your inventory and client vehicles.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4" />
          Add Car
        </button>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Image</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Make/Model</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Year</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Price</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Owner Type</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={`${car.make}-${car.model}`} className="border-t border-border">
                <td className="px-6 py-4">
                  <img src={car.image} alt={`${car.make} ${car.model}`} className="h-14 w-20 object-cover rounded-lg" />
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-card-foreground">{car.make}</p>
                  <p className="text-xs text-muted-foreground">{car.model}</p>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{car.year}</td>
                <td className="px-6 py-4 text-sm font-medium text-card-foreground">{car.price}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${ownerStyles[car.owner]}`}>{car.owner}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[car.status]}`}>{car.status}</span>
                </td>
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

export default Cars;
