import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <LayoutDashboard className="h-16 w-16 text-primary" />
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Dashboard
        </h1>
        <p className="max-w-md text-muted">
          View your carbon footprint analytics and track your environmental impact over time.
        </p>
      </div>
    </div>
  );
}
