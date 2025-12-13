import { FileText } from "lucide-react";

export default function SummariesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <FileText className="h-16 w-16 text-primary" />
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Summaries
        </h1>
        <p className="max-w-md text-muted">
          Review detailed reports and summaries of your carbon reduction journey.
        </p>
      </div>
    </div>
  );
}
