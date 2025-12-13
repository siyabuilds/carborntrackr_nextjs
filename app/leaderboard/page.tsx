import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 text-center">
        <Trophy className="h-16 w-16 text-primary" />
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Leaderboard
        </h1>
        <p className="max-w-md text-muted">
          See how you rank against other users in reducing carbon emissions.
        </p>
      </div>
    </div>
  );
}
