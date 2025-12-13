import { Leaf, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <main className="flex max-w-3xl flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-3">
          <Leaf className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Track Your <span className="text-primary">Carbon Footprint</span>
        </h1>
        
        <p className="max-w-xl text-lg text-muted">
          Monitor, analyze, and reduce your environmental impact. Join the community 
          committed to building a sustainable future.
        </p>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/leaderboard"
            className="flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-border"
          >
            View Leaderboard
          </Link>
        </div>
      </main>
    </div>
  );
}
