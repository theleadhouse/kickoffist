import { getLiveMatches, getStaticWCMatches } from "@/lib/api";
import LiveSection from "@/components/LiveSection";
import PortalMatchCard from "@/components/PortalMatchCard";
export const dynamic = "force-dynamic";

export default async function LivePage() {
  const live = await getLiveMatches();
  const recent = getStaticWCMatches().filter(m => m.status === "FINISHED").slice(-5).reverse();

  return (
    <div>
      <div className="sh mt-2">
        <span className="live-dot" />
        <span className="text-red-400">LIVE SCORES</span>
        <span className="ml-auto text-[10px] text-[#6e7681]">Auto-updates every 15 seconds</span>
      </div>

      {live.length > 0 ? (
        <LiveSection initialMatches={live} />
      ) : (
        <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-6 text-center mb-4">
          <div className="text-3xl mb-2">🏟️</div>
          <div className="text-sm font-bold text-slate-300 mb-1">No live matches right now</div>
          <div className="text-[11px] text-[#6e7681] mb-3">This page refreshes automatically every 15 seconds</div>
          <a href="/today" className="text-[11px] font-bold text-[#3fb950] hover:underline">See today&apos;s schedule →</a>
        </div>
      )}

      <div className="sh mt-2">
        <span>🏁</span>
        <span>RECENT RESULTS</span>
      </div>
      <div className="space-y-1.5">
        {recent.map(m => <PortalMatchCard key={m.id} match={m} />)}
      </div>
    </div>
  );
}
