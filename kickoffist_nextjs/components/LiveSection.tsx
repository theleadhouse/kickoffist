"use client";
import { useState, useEffect, useCallback } from "react";
import { Match } from "@/lib/types";
import PortalMatchCard from "./PortalMatchCard";

export default function LiveSection({ initialMatches }: { initialMatches: Match[] }) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [spinning, setSpinning] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setSpinning(true);
      const r = await fetch("/api/live", { cache:"no-store" });
      if (!r.ok) return;
      const d = await r.json();
      if (d.matches?.length > 0) setMatches(d.matches);
      const ist = new Date(Date.now()+5.5*3600000);
      setLastUpdated(`${String(ist.getUTCHours()).padStart(2,"0")}:${String(ist.getUTCMinutes()).padStart(2,"0")} IST`);
    } catch {} finally { setSpinning(false); }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 60000);
    return () => clearInterval(id);
  }, [refresh]);

  if (!matches.length) return null;

  return (
    <div className="mb-3">
      <div className="sh">
        <span className="live-dot"/>
        <span className="text-red-400 font-black">LIVE NOW</span>
        <span className="badge-live ml-1">{matches.length}</span>
        <div className="sh-line"/>
        <button onClick={refresh} className={`text-[10px] text-white/25 hover:text-white/50 transition-colors flex-shrink-0 ${spinning?"animate-spin":""}`}>↻</button>
        {lastUpdated && <span className="text-[9px] text-white/20 flex-shrink-0">{lastUpdated}</span>}
      </div>
      <div className="space-y-1.5">
        {matches.map(m=><PortalMatchCard key={m.id} match={m}/>)}
      </div>
    </div>
  );
}
