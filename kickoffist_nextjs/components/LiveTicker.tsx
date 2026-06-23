"use client";
const ITEMS = [
  "🏆 FIFA World Cup 2026 · 48 Teams · USA · Canada · Mexico · Jun 11–Jul 19",
  "🐐 MESSI WC ALL-TIME RECORD · 18 career goals · Argentina 2–0 Austria",
  "🇫🇷 France 3–0 Iraq · Mbappe 14' 54' · Dembele 66' · FRANCE QUALIFIED",
  "🇳🇴 Norway 3–2 Senegal · Haaland 22' 51' · Ostigard 76' · NORWAY QUALIFIED",
  "🇩🇿 Algeria 2–1 Jordan · Benbouali 69' · Gouiri 82' · Algeria stays alive",
  "🇺🇸 USA QUALIFIED · 6pts · Group D · 2–0 Australia · Freeman 43'",
  "🇲🇽 MEXICO QUALIFIED · 6pts · Group A leaders · First team through",
  "🇩🇪 GERMANY QUALIFIED · 6pts · 9–2 goals · Undav brace vs Ivory Coast",
  "🇦🇷 ARGENTINA QUALIFIED · Messi 5 WC 2026 goals · Group J leaders",
  "🇪🇸 Spain 4–0 Saudi Arabia · Yamal WC debut goal · Group G leaders",
  "🇳🇱 Netherlands 5–1 Sweden · Brobbey brace · Gakpo · Houston",
  "🇯🇵 Japan 4–0 Tunisia · Ueda ×2 · Ito · Nakamura · Monterrey",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England 4–2 Croatia · Kane ×2 · equals Lineker WC record",
  "📺 JioCinema · Sports18 · DD Sports · All IST times → kickoffist.com 🇮🇳",
];
export default function LiveTicker() {
  const d = [...ITEMS, ...ITEMS];
  return (
    <div style={{ background: "linear-gradient(90deg,#FF9933,#e07000)", overflow: "hidden", display: "flex", alignItems: "center" }}>
      <div style={{ flexShrink: 0, background: "rgba(0,0,0,.22)", padding: "7px 14px", display: "flex", alignItems: "center", gap: "5px" }}>
        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#fff", animation: "blink 1.2s infinite", display: "block" }} />
        <span style={{ fontFamily: "'Teko',sans-serif", fontSize: "12px", fontWeight: 600, color: "#fff", letterSpacing: ".14em", whiteSpace: "nowrap" }}>LATEST</span>
      </div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div style={{ display: "flex", width: "max-content", animation: "ticker 75s linear infinite", padding: "7px 0" }}>
          {d.map((item, i) => (
            <span key={i} style={{ fontFamily: "'Teko',sans-serif", fontSize: "14px", fontWeight: 500, color: "rgba(0,0,0,.85)", padding: "0 22px", whiteSpace: "nowrap", letterSpacing: ".03em" }}>
              {item}<span style={{ opacity: .3, marginLeft: "14px" }}>·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}};@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}`}</style>
    </div>
  );
}
