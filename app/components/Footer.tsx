"use client";

import { Leaf } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              CarbonTrackr
            </span>
          </div>
          <p className="text-sm text-muted">
            © {currentYear} CarbonTrackr.
          </p>
        </div>
      </div>
    </footer>
  );
}
