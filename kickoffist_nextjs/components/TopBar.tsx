"use client";
import { useState, useEffect } from "react";
import { currentISTClock } from "@/lib/utils";
import Link from "next/link";

export default function TopBar() {
  const [clock, setClock] = useState("--:--");
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    const tick = () => setClock(currentISTClock());
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // Poll for live matches count
    const poll = async () => {
      try {
        const r = await fetch("/api/live");
        const d = await r.json();
        setLiveCount(d.matches?.length || 0);
      } catch {}
    };
    poll();
    const t = setInterval(poll, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/today" className="flex flex-col">
          <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
            KICKOFF<span className="text-green-600">IST</span>
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 leading-none mt-0.5">
            India&apos;s Football Calendar
          </span>
        </Link>

        {/* Right: live badge + IST clock */}
        <div className="flex items-center gap-3">
          {liveCount > 0 && (
            <Link href="/live" className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
              <span className="live-pulse" />
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">
                {liveCount} Live
              </span>
            </Link>
          )}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">IST</span>
            <span className="text-sm font-bold text-slate-900 tabular-nums">{clock}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
