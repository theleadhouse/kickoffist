"use client";
const NEWS = [
  "🏆 FIFA World Cup 2026 · 48 Teams · USA · Canada · Mexico · Jun 11–Jul 19",
  "🇲🇽 MEXICO QUALIFIED! First team into Round of 32 · 2 wins from 2 · Group A top",
  "🇨🇦 Canada 6–0 Qatar · Jonathan David HAT-TRICK · 34' 45' 82' · Vancouver",
  "🇦🇷 MESSI HAT-TRICK! Argentina 3–0 Algeria · 17' 60' 76' · Kansas City",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England 4–2 Croatia · Kane equals Lineker's 10 WC goals · Dallas",
  "🇫🇷 France 3–1 Senegal · Mbappe brace · MetLife Stadium",
  "🇳🇴 Norway 4–1 Iraq · Haaland 29' 43' · Gillette Stadium",
  "🇨🇭 Switzerland 4–1 Bosnia · Manzambi 74' 90' · Los Angeles",
  "🇩🇪 Germany 7–1 Curaçao · Havertz brace · Biggest WC win of tournament",
  "🇺🇸 USA 4–1 Paraguay · Balogun brace · Reyna · Pulisic · SoFi Stadium LA",
  "🇨🇴 Colombia 3–1 Uzbekistan · Diaz 67' · Campaz 85' · Mexico City",
  "🔜 TODAY: USA vs Australia · 12:30 AM IST · Seattle · Group D",
  "🔜 TODAY: Scotland vs Morocco · 3:30 AM IST · Foxborough · Group E",
  "🔜 TODAY: Brazil vs Haiti · 6:30 AM IST · Philadelphia · Group E",
  "🔜 TODAY: Turkey vs Paraguay · 9:30 AM IST · Santa Clara · Group D",
  "📺 Watch live on JioCinema & Sports18 · All times in IST on KickoffIST.com 🇮🇳",
];
export default function LiveTicker() {
  const d=[...NEWS,...NEWS];
  return(
    <div className="flex items-center bg-red-600/90 overflow-hidden rounded-lg my-2">
      <div className="flex-shrink-0 bg-red-700 px-3 py-1.5 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"/>
        <span className="text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">LIVE</span>
      </div>
      <div className="overflow-hidden flex-1 py-1.5">
        <div style={{display:"flex",width:"max-content",animation:"ticker 55s linear infinite"}}>
          {d.map((item,i)=>(
            <span key={i} className="text-[11px] text-white/80 font-medium px-6 whitespace-nowrap">
              {item}<span className="text-white/30 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  );
}
