"use client";
const ITEMS=[
  "🏆 FIFA World Cup 2026 · 48 Teams · USA · Canada · Mexico · Jun 11–Jul 19",
  "🐐 MESSI ALL-TIME WC RECORD · 18 career goals · Argentina 2–0 Austria · QUALIFIED",
  "🔴 France vs Iraq · HT 1–0 · Mbappe 34' · Philadelphia",
  "🔴 Norway vs Senegal · Upcoming · MetLife Stadium NJ",
  "🔴 Jordan vs Algeria · Upcoming · Santa Clara",
  "🇺🇸 USA QUALIFIED · 2–0 Australia · 6pts · Group D leaders",
  "🇲🇽 MEXICO QUALIFIED · 2–0 South Korea · 6pts · Group A leaders",
  "🇩🇪 GERMANY QUALIFIED · 2–1 Ivory Coast · 6pts · Undav brace",
  "🇪🇸 Spain 4–0 Saudi Arabia · Yamal WC debut goal · Atlanta",
  "🇳🇱 Netherlands 5–1 Sweden · Brobbey brace · Houston",
  "🇯🇵 Japan 4–0 Tunisia · Ueda ×2 · Monterrey",
  "🇧🇷 Brazil 3–0 Haiti · Vinicius · Rodrygo · Endrick",
  "🇨🇦 Canada 6–0 Qatar · David hat-trick · Vancouver",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England 4–2 Croatia · Kane ×2 · equals Lineker record",
  "📺 JioCinema · Sports18 · DD Sports · All IST times at kickoffist.com 🇮🇳",
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
        <div style={{display:"flex",width:"max-content",animation:"ticker 70s linear infinite",padding:"7px 0"}}>
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
