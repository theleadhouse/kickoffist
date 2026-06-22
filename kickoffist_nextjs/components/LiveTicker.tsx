"use client";
const ITEMS=[
  "🏆 FIFA World Cup 2026 · 48 Teams · USA · Canada · Mexico · Jun 11–Jul 19 2026",
  "🐐 MESSI BREAKS WORLD CUP RECORD! 18 goals · Argentina 2–0 Austria · GOAT 🐐",
  "🇦🇷 Argentina QUALIFIED · 6pts · Messi 5 goals in 2 games · Group J leaders",
  "🔴 LIVE: France vs Iraq · Lincoln Financial Field Philadelphia",
  "🔴 LIVE: Norway vs Senegal · MetLife Stadium New Jersey",
  "🔴 LIVE: Jordan vs Algeria · Levi's Stadium Santa Clara",
  "🇺🇸 USA QUALIFIED · 2–0 Australia · Freeman 43' · Seattle · Group D",
  "🇲🇽 MEXICO QUALIFIED · 2 wins 6pts · Group A · First team through",
  "🇩🇪 GERMANY QUALIFIED · 9–2 goals · Undav brace vs Ivory Coast",
  "🇪🇸 Spain 4–0 Saudi Arabia · Yamal scores WC debut goal · Atlanta",
  "🇯🇵 Japan 4–0 Tunisia · Ueda hat-trick · Group F joint leaders",
  "🇳🇱 Netherlands 5–1 Sweden · Brobbey brace · Gakpo · Malen · Houston",
  "🇧🇷 Brazil 3–0 Haiti · Vinicius · Rodrygo · Endrick · Philadelphia",
  "🇨🇦 Canada 6–0 Qatar · Jonathan David HAT-TRICK · Vancouver",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England 4–2 Croatia · Kane ×2 equals Lineker WC record · Dallas",
  "📺 Watch on JioCinema · Sports18 · DD Sports · All times IST · kickoffist.com 🇮🇳",
];
export default function LiveTicker(){
  const d=[...ITEMS,...ITEMS];
  return(
    <div style={{background:"linear-gradient(90deg,#FF9933,#e07000)",overflow:"hidden",display:"flex",alignItems:"center"}}>
      <div style={{flexShrink:0,background:"rgba(0,0,0,.25)",padding:"8px 14px",display:"flex",alignItems:"center",gap:"5px"}}>
        <span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#fff",animation:"blink 1.2s infinite",display:"block"}}/>
        <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"10px",fontWeight:900,color:"#fff",letterSpacing:".12em",whiteSpace:"nowrap"}}>LIVE</span>
      </div>
      <div style={{overflow:"hidden",flex:1}}>
        <div style={{display:"flex",width:"max-content",animation:"ticker 75s linear infinite",padding:"8px 0"}}>
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
