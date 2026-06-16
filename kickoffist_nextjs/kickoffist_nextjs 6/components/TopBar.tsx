"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ISTClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const ist = new Date(Date.now() + 5.5 * 3600000);
      const h = String(ist.getUTCHours()).padStart(2,"0");
      const m = String(ist.getUTCMinutes()).padStart(2,"0");
      setT(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono font-bold text-green-400 tabular-nums">{t}</span>;
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
    <header className="sticky top-0 z-50 bg-[#0f1923]/95 backdrop-blur-md border-b border-white/8">
      {/* Brand row */}
      <div className="max-w-[1100px] mx-auto px-3 h-11 flex items-center justify-between">
        <Link href="/today" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">K</div>
          <div>
            <div className="text-sm font-black text-white tracking-tight leading-none">
              KICKOFF<span className="text-blue-400">IST</span>
            </div>
            <div className="text-[8px] text-white/30 font-medium leading-none mt-0.5">India&apos;s Football Calendar</div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {liveCount > 0 && (
            <Link href="/live"
              className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/25 px-2 py-1 rounded-lg text-[10px] font-bold text-red-400">
              <span className="live-dot w-1.5 h-1.5" />
              {liveCount} LIVE
            </Link>
          )}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 px-2.5 py-1 rounded-lg text-[10px] text-white/40">
            IST <ISTClock />
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="max-w-[1100px] mx-auto px-1 flex overflow-x-auto" style={{scrollbarWidth:"none"}}>
        {NAV.map(item => {
          const active = path?.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`tab-btn flex items-center gap-1.5 ${active ? "on" : ""}`}>
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
              {item.href === "/live" && liveCount > 0 && (
                <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full ml-0.5">{liveCount}</span>
              )}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
