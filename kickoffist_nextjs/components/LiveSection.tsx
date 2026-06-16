"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import PortalMatchCard from "./PortalMatchCard";

export default function LiveSection({ initialMatches }: { initialMatches: Match[] }) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);

  useEffect(() => {
    const poll = async () => {
      try {
        const r = await fetch("/api/live");
        if (!r.ok) return;
        const d = await r.json();
        if (d.matches) setMatches(d.matches);
      } catch {}
    };
    const id = setInterval(poll, 15000);
    return () => clearInterval(id);
  }, []);

  if (!matches.length) return null;

  return (
    <div className="mb-3">
      <div className="sh">
        <span className="live-dot" />
        <span className="text-red-400">LIVE NOW</span>
        <span className="badge-live ml-1">{matches.length}</span>
        <span className="ml-auto text-[10px] text-[#6e7681]">Auto-refresh 15s</span>
      </div>
      <div className="space-y-1.5">
        {matches.map(m => <PortalMatchCard key={m.id} match={m} />)}
      </div>
    </div>
  );
}
