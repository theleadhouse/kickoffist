"use client";

const NEWS = [
  "🏆 FIFA World Cup 2026 · 48 teams · USA · Canada · Mexico",
  "🇦🇷 MESSI HAT-TRICK! Argentina 3–0 Algeria · Messi 17' 60' 76' · Arrowhead Stadium KC",
  "🇫🇷 France 3–1 Senegal · Mbappe 66' 91' · Barcola 82' · MetLife Stadium",
  "🇳🇴 Norway 4–1 Iraq · Haaland brace · Ostigard 76' · Gillette Stadium",
  "🇦🇹 Austria 3–1 Jordan · First WC win in 36 years · Levi's Stadium",
  "🇮🇷 Iran 2–2 New Zealand · Just brace for NZ · SoFi Stadium LA",
  "🇩🇪 Germany 7–1 Curaçao · Havertz scores twice · NRG Stadium Houston",
  "🇸🇦 Saudi Arabia 1–0 Uruguay · Al-Dawsari 63' · Hard Rock Stadium Miami",
  "🔜 Portugal vs DR Congo · Tonight 10:30 PM IST · NRG Stadium Houston",
  "🔜 England vs Croatia · Tonight 1:30 AM IST · AT&T Stadium Dallas",
  "📺 Watch live on JioCinema & Sony Sports · All times IST on KickoffIST.com",
];

export default function LiveTicker() {
  const d = [...NEWS,...NEWS];
  return (
    <div className="flex items-center bg-red-600/90 overflow-hidden rounded-lg my-2">
      <div className="flex-shrink-0 bg-red-700 px-3 py-1.5 flex items-center gap-1.5">
        <span className="live-dot w-1.5 h-1.5" style={{background:"#fff",animation:"none"}}/>
        <span className="text-[9px] font-black text-white uppercase tracking-widest whitespace-nowrap">LIVE</span>
      </div>
      <div className="overflow-hidden flex-1 py-1.5">
        <div className="ticker-track">
          {d.map((item,i)=>(
            <span key={i} className="text-[11px] text-white/80 font-medium px-6 whitespace-nowrap">
              {item} <span className="text-white/30 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
