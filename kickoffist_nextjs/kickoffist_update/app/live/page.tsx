import { getLiveMatches } from "@/lib/api";
import LiveSection from "@/components/LiveSection";
export const dynamic = "force-dynamic";

export default async function LivePage() {
  const matches = await getLiveMatches();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span className="live-pulse" /> Live Scores
        </h1>
        <p className="text-sm text-white/40 mt-1">Auto-updates every 15 seconds · All times IST</p>
      </div>
      {matches.length > 0 ? <LiveSection initialMatches={matches} /> : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🏟️</div>
          <div className="font-bold text-white mb-2">No live matches right now</div>
          <div className="text-sm text-white/40 mb-6">This page refreshes automatically.</div>
          <a href="/today" className="bg-green-500 text-black font-bold px-5 py-2.5 rounded-xl text-sm">See Today&apos;s Schedule</a>
        </div>
      )}
    </div>
  );
}
