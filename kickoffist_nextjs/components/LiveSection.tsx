"use client";
import { useState, useEffect, useCallback } from "react";
import { Match } from "@/lib/types";
import PortalMatchCard from "./PortalMatchCard";

export default function LiveSection({ initialMatches }: { initialMatches: Match[] }) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLive = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const r = await fetch("/api/live", { cache: "no-store" });
      if (!r.ok) return;
      const d = await r.json();
      if (d.matches && d.matches.length > 0) {
        setMatches(d.matches);
        const now = new Date();
        const ist = new Date(now.getTime() + 5.5 * 3600000);
        setLastUpdated(`${String(ist.getUTCHours()).padStart(2,"0")}:${String(ist.getUTCMinutes()).padStart(2,"0")} IST`);
      }
    } catch {}
    finally { setIsRefreshing(false); }
  }, []);

  useEffect(() => {
    fetchLive();
    const id = setInterval(fetchLive, 60000); // 60 seconds
    return () => clearInterval(id);
  }, [fetchLive]);

  if (!matches.length) return null;

  return (
    <div className="mb-3">
      <div className="sh">
        <span className="live-dot" />
        <span className="text-red-400 font-black">LIVE NOW</span>
        <span className="badge-live ml-1">{matches.length} match{matches.length !== 1 ? "es" : ""}</span>
        <span className="ml-auto flex items-center gap-2 text-[10px] text-white/30">
          {isRefreshing && <span className="animate-spin">↻</span>}
          {lastUpdated ? `Updated ${lastUpdated}` : "Refreshes every 60s"}
        </span>
      </div>
      <div className="space-y-1.5">
        {matches.map(m => <PortalMatchCard key={m.id} match={m} />)}
      </div>
      <button
        onClick={fetchLive}
        className="mt-2 w-full text-center text-[10px] text-white/30 hover:text-white/60 py-1 transition-colors"
      >
        ↻ Refresh now
      </button>
    </div>
  );
}
