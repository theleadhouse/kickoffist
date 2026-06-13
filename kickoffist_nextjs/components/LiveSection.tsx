"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import MatchCard from "./MatchCard";

interface Props {
  initialMatches: Match[];
}

export default function LiveSection({ initialMatches }: Props) {
  const [matches, setMatches] = useState<Match[]>(initialMatches);

  useEffect(() => {
    // Auto-refresh live matches every 15 seconds
    const poll = async () => {
      try {
        const r = await fetch("/api/live");
        if (!r.ok) return;
        const d = await r.json();
        if (d.matches) setMatches(d.matches);
      } catch {}
    };

    const t = setInterval(poll, 15000);
    return () => clearInterval(t);
  }, []);

  if (matches.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="live-pulse" />
        <h2 className="text-base font-bold text-slate-900">Live Now</h2>
        <span className="text-[11px] font-bold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">
          {matches.length} match{matches.length !== 1 ? "es" : ""}
        </span>
        <span className="ml-auto text-[10px] text-slate-400">Updates every 15s</span>
      </div>
      {matches.map(m => <MatchCard key={m.id} match={m} />)}
    </section>
  );
}
