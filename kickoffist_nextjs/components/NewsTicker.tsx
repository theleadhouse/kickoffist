"use client";

const NEWS = [
  "🏆 FIFA World Cup 2026 LIVE — 48 teams, 104 matches across USA, Canada & Mexico",
  "⚽ Brazil vs Morocco tonight at 3:30 AM IST — Group E blockbuster",
  "🇰🇷 South Korea 2–1 Czechia — Son's team win thriller in Guadalajara",
  "🇲🇽 Mexico 2–0 South Africa — Perfect opener at Estadio Azteca",
  "🇨🇦 Canada vs Bosnia tonight — 12:30 AM IST at BMO Field Toronto",
  "🇦🇷 Argentina vs Algeria — 6:30 AM IST · Messi's World Cup begins",
  "📺 Watch live on United8 Sports & ZEE5 · All times in IST on KickoffIST",
];

export default function NewsTicker() {
  const doubled = [...NEWS, ...NEWS];
  return (
    <div className="bg-green-500/10 border-b border-green-500/20 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-green-500 px-3 py-1.5 z-10">
          <span className="text-[10px] font-black text-black uppercase tracking-widest whitespace-nowrap">⚡ LIVE</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="ticker-animate py-1.5">
            {doubled.map((item, i) => (
              <span key={i} className="inline-flex items-center text-[11px] font-medium text-white/70 px-6 whitespace-nowrap">
                {item}
                <span className="mx-6 text-green-500/40">●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
