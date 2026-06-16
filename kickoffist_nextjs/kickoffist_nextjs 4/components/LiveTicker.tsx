"use client";
import { useState, useEffect } from "react";

const STATIC_NEWS = [
  "🏆 FIFA World Cup 2026 LIVE — 48 teams · USA · Canada · Mexico",
  "⚽ Saudi Arabia 1–0 Uruguay · Group H LIVE · Hard Rock Stadium, Miami",
  "🇩🇪 Germany 7–1 Curaçao · Kai Havertz scores twice · Group F",
  "🇸🇪 Sweden 5–1 Tunisia · Yasin Ayari brace · Group G",
  "🇺🇸 USA 4–1 Paraguay · Folarin Balogun 2 goals · Group D",
  "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland 1–0 Haiti · Group E",
  "🇦🇺 Australia 2–0 Turkey · Group D",
  "🔜 Iran vs New Zealand · Tonight 6:30 AM IST · Group I",
  "🔜 France vs Senegal · Tomorrow 12:30 AM IST · Group J",
  "🔜 Argentina vs Algeria · Tomorrow 6:30 AM IST · Group K",
  "📺 Watch live: JioCinema & Sony Sports · All times IST on KickoffIST",
];

export default function LiveTicker() {
  const [items, setItems] = useState(STATIC_NEWS);
  const doubled = [...items, ...items];

  return (
    <div className="flex items-center bg-[#161b22] border border-[#21262d] rounded-lg overflow-hidden">
      <div className="flex-shrink-0 bg-red-500 px-2.5 py-1.5 flex items-center gap-1.5">
        <span className="live-dot w-1.5 h-1.5 bg-white" style={{ background: "#fff" }} />
        <span className="text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">LIVE</span>
      </div>
      <div className="overflow-hidden flex-1 py-1.5">
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={i} className="text-[11px] text-slate-400 px-5 whitespace-nowrap inline-flex items-center gap-2">
              {item}
              <span className="text-[#3fb950]/30 text-base">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
