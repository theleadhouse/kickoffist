"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ISTClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      setT(ist.toUTCString().slice(17, 22));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-[#3fb950] font-bold text-sm tabular-nums">{t}</span>;
}

const NAV = [
  { href:"/today",     label:"Today",     icon:"⚡" },
  { href:"/world-cup", label:"WC 2026",   icon:"🏆" },
  { href:"/standings", label:"Standings", icon:"📊" },
  { href:"/live",      label:"Live",      icon:"🔴" },
  { href:"/predict",   label:"Predict",   icon:"🔮" },
];

export default function TopBar() {
  const path = usePathname();
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    const poll = async () => {
      try {
        const r = await fetch("/api/live");
        const d = await r.json();
        setLiveCount(d.matches?.length || 0);
      } catch {}
    };
    poll();
    const id = setInterval(poll, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0d1117]/97 backdrop-blur border-b border-[#21262d]">
      {/* Top row */}
      <div className="max-w-[1100px] mx-auto px-3 h-10 flex items-center justify-between gap-3">
        <Link href="/today" className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight text-white leading-none">
            KICKOFF<span className="text-[#3fb950]">IST</span>
          </span>
          <span className="text-[9px] text-[#6e7681] font-medium hidden sm:block">India&apos;s Football Calendar</span>
        </Link>

        <div className="flex items-center gap-2">
          {liveCount > 0 && (
            <Link href="/live" className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/25 px-2 py-0.5 rounded text-[10px] font-bold text-red-400">
              <span className="live-dot w-1.5 h-1.5" />
              {liveCount} LIVE
            </Link>
          )}
          <div className="flex items-center gap-1.5 bg-[#161b22] border border-[#21262d] px-2.5 py-1 rounded text-[10px] text-[#6e7681] font-medium">
            IST <ISTClock />
          </div>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="max-w-[1100px] mx-auto px-3 flex overflow-x-auto scrollbar-none border-t border-[#21262d]">
        {NAV.map(item => {
          const active = path?.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`tab-btn flex items-center gap-1.5 ${active ? "on" : ""}`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.href === "/live" && liveCount > 0 && (
                <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">{liveCount}</span>
              )}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
