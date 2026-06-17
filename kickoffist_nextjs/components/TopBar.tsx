"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ISTClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const ist = new Date(Date.now() + 5.5*3600000);
      setT(`${String(ist.getUTCHours()).padStart(2,"0")}:${String(ist.getUTCMinutes()).padStart(2,"0")}`);
    };
    tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id);
  },[]);
  return <span className="font-mono font-black text-green-400 tabular-nums text-sm">{t}</span>;
}

const NAV = [
  {href:"/today",     label:"Today",     icon:"⚡"},
  {href:"/world-cup", label:"WC 2026",   icon:"🏆"},
  {href:"/standings", label:"Standings", icon:"📊"},
  {href:"/live",      label:"Live",      icon:"🔴"},
  {href:"/predict",   label:"Predict",   icon:"🔮"},
];

export default function TopBar() {
  const path = usePathname();
  const [liveCount, setLiveCount] = useState(0);
  useEffect(() => {
    const poll = async () => {
      try { const r = await fetch("/api/live"); const d = await r.json(); setLiveCount(d.matches?.length||0); } catch {}
    };
    poll(); const id = setInterval(poll,15000); return ()=>clearInterval(id);
  },[]);

  return (
    <header className="sticky top-0 z-50 bg-[#0e1117]/96 backdrop-blur-md border-b border-white/6">
      {/* ESPN-style top row */}
      <div className="max-w-[1140px] mx-auto px-3 h-11 flex items-center justify-between gap-3">
        <Link href="/today" className="flex items-center gap-2.5 flex-shrink-0">
          {/* ESPN-style red K logo */}
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-base shadow-lg shadow-red-900/40">K</div>
          <div>
            <div className="text-sm font-black text-white tracking-tight leading-none">
              KICKOFF<span className="text-red-500">IST</span>
            </div>
            <div className="text-[8px] text-white/25 font-medium leading-none mt-0.5 hidden sm:block">India&apos;s Football Calendar 🇮🇳</div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {liveCount > 0 && (
            <Link href="/live" className="flex items-center gap-1.5 bg-red-500/12 border border-red-500/22 px-2.5 py-1 rounded text-[10px] font-black text-red-400 uppercase tracking-wide">
              <span className="live-dot w-1.5 h-1.5"/>{liveCount} LIVE
            </Link>
          )}
          <div className="flex items-center gap-1.5 bg-white/4 border border-white/7 px-2.5 py-1 rounded text-[10px] text-white/30 font-medium">
            IST <ISTClock />
          </div>
        </div>
      </div>

      {/* BBC Sport style nav strip */}
      <div className="max-w-[1140px] mx-auto px-1 flex overflow-x-auto border-t border-white/5" style={{scrollbarWidth:"none"}}>
        {NAV.map(item => {
          const active = path?.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`tab-btn flex items-center gap-1.5 ${active?"on":""}`}>
              <span className="text-sm">{item.icon}</span>
              <span>{item.label}</span>
              {item.href==="/live" && liveCount>0 && (
                <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full ml-0.5 leading-none">{liveCount}</span>
              )}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
