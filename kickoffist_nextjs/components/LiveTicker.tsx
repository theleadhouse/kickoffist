"use client";
const ITEMS=[
  "🏆 FIFA World Cup 2026 · 48 Teams · USA · Canada · Mexico · Jun 11–Jul 19",
  "🐐 MESSI WC ALL-TIME RECORD · 18 career goals · Argentina 2–0 Austria · Messi 5 goals",
  "🇫🇷 France 3–0 Iraq · Mbappe 14' 54' · Dembele 66' · FRANCE QUALIFIED",
  "🇳🇴 Norway 3–2 Senegal · Haaland 22' 51' · Ostigard 76' · NORWAY QUALIFIED",
  "🇩🇿 Algeria 2–1 Jordan · Benbouali 69' · Gouiri 82' · Algeria alive in Group J",
  "🔜 TODAY: Portugal vs Uzbekistan · 6:30 PM IST · Houston",
  "🔜 TODAY: England vs Ghana · 1:30 AM IST · Foxborough",
  "🔜 TODAY: Panama vs Croatia · 4:30 AM IST · Toronto",
  "🔜 TODAY: Colombia vs DR Congo · 7:30 AM IST · Guadalajara",
  "🇺🇸 USA QUALIFIED · 2–0 Australia · 6pts · Group D leaders",
  "🇲🇽 MEXICO QUALIFIED · 2 wins · 6pts · Group A leaders",
  "🇩🇪 GERMANY QUALIFIED · 2 wins · 6pts · Group E leaders",
  "🇦🇷 ARGENTINA QUALIFIED · Messi hat-trick + brace · 6pts · Group J leaders",
  "🇪🇸 Spain 4–0 Saudi Arabia · Yamal debut WC goal · Group G leaders",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England 4–2 Croatia · Kane ×2 equals Lineker record",
  "📺 JioCinema · Sports18 · DD Sports · All IST times → kickoffist.com 🇮🇳",
];
export default function LiveTicker(){
  const d=[...ITEMS,...ITEMS];
  return(
    <div style={{background:"linear-gradient(90deg,#FF9933,#e07000)",overflow:"hidden",display:"flex",alignItems:"center",flexShrink:0}}>
      <div style={{flexShrink:0,background:"rgba(0,0,0,.25)",padding:"7px 14px",display:"flex",alignItems:"center",gap:"5px"}}>
        <span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#fff",animation:"blink 1.2s infinite",display:"block"}}/>
        <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"10px",fontWeight:900,color:"#fff",letterSpacing:".12em",whiteSpace:"nowrap"}}>LIVE</span>
      </div>
      <div style={{overflow:"hidden",flex:1}}>
        <div style={{display:"flex",width:"max-content",animation:"ticker 75s linear infinite",padding:"7px 0"}}>
          {d.map((item,i)=>(
            <span key={i} style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",fontWeight:700,color:"rgba(0,0,0,.85)",padding:"0 22px",whiteSpace:"nowrap"}}>
              {item}<span style={{opacity:.3,marginLeft:"14px"}}>·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}};@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}`}</style>
    </div>
  );
}
