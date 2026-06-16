"use client";

const NEWS = [
  "🏆 FIFA World Cup 2026 LIVE — 48 teams · USA · Canada · Mexico",
  "🇸🇦 Saudi Arabia 1–0 Uruguay · Group H · Hard Rock Stadium Miami",
  "🇩🇪 Germany 7–1 Curaçao · Havertz brace · NRG Stadium Houston",
  "🇸🇪 Sweden 5–1 Tunisia · Ayari scores twice · Group G",
  "🇺🇸 USA 4–1 Paraguay · Balogun 2 goals · SoFi Stadium LA",
  "🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland 1–0 Haiti · Group E · Gillette Stadium Boston",
  "🇦🇺 Australia 2–0 Turkey · Group D · BC Place Vancouver",
  "🔜 France vs Senegal · Tomorrow 12:30 AM IST · MetLife Stadium",
  "🔜 Argentina vs Algeria · Tomorrow 6:30 AM IST · Kansas City",
  "🔜 Portugal vs DR Congo · Tomorrow 10:30 PM IST · Houston",
  "📺 Watch on JioCinema & Sony Sports · All times IST on KickoffIST.com",
];

export default function LiveTicker() {
  const doubled = [...NEWS, ...NEWS];
  return (
    <div className="flex items-center bg-white/4 border border-white/8 rounded-lg overflow-hidden">
      <div className="flex-shrink-0 bg-red-500 px-2.5 py-1.5 flex items-center gap-1.5">
        <span className="live-dot w-1.5 h-1.5" style={{background:"#fff",animation:"none"}} />
        <span className="text-[9px] font-black text-white uppercase tracking-wider whitespace-nowrap">LIVE</span>
      </div>
      <div className="overflow-hidden flex-1 py-1.5">
        <div className="ticker-track">
          {doubled.map((item, i) => (
            <span key={i} className="text-[11px] text-white/50 px-5 whitespace-nowrap inline-flex items-center gap-2">
              {item}
              <span className="text-white/15">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
