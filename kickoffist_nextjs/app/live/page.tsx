import { getLiveMatches } from "@/lib/api";
import LiveSection from "@/components/LiveSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Football Scores in IST | KickoffIST",
  description: "Live football scores right now, updated every 15 seconds. All times in IST.",
};

export const dynamic = "force-dynamic"; // Always fresh

export default async function LivePage() {
  const matches = await getLiveMatches();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span className="live-pulse" />
          Live Scores
        </h1>
        <p className="text-sm text-slate-500 mt-1">Updates every 15 seconds in IST</p>
      </div>

      {matches.length > 0 ? (
        <LiveSection initialMatches={matches} />
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🏟️</div>
          <div className="font-bold text-slate-900 mb-2">No live matches right now</div>
          <div className="text-sm text-slate-500 mb-6">
            This page refreshes automatically. Come back when a match is in progress.
          </div>
          <a href="/today" className="bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm">
            See Today's Schedule
          </a>
        </div>
      )}
    </div>
  );
}
