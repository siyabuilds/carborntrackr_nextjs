import { Target } from "lucide-react";

export default function TargetsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <Target className="h-16 w-16 text-primary" />
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Targets
        </h1>
        <p className="max-w-md text-muted">
          Set and manage your carbon reduction goals and milestones.
        </p>
      </div>
    </div>
  );
}
