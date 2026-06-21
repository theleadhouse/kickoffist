"use client";
const ITEMS=[
  "🏆 FIFA World Cup 2026 · 48 Teams · USA Mexico Canada · Jun 11–Jul 19",
  "🇺🇸 USA QUALIFIED! 2 wins from 2 · USA 2–0 Australia · Freeman 43' · Seattle",
  "🇲🇽 MEXICO QUALIFIED! 2 wins from 2 · First team through · Group A leaders",
  "🇧🇷 Brazil 3–0 Haiti · Vinicius 34' · Rodrygo 67' · Endrick 88' · Philadelphia",
  "🇳🇱 Netherlands 5–1 Sweden · Brobbey brace · Gakpo · Malen · Depay · Houston",
  "🇯🇵 Japan 4–0 Tunisia · Ueda brace · Ito · Nakamura · Monterrey",
  "🇩🇪 Germany 2–1 Ivory Coast · Undav 71' 90' · Late winner · Toronto",
  "🇲🇦 Morocco 1–0 Scotland · Dari 1' · Fastest goal of WC 2026",
  "🇵🇾 Paraguay 1–0 Turkey · Almirón 59' · Santa Clara",
  "🇦🇷 MESSI HAT-TRICK! Argentina 3–0 Algeria · 17' 60' 76' · Kansas City",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England 4–2 Croatia · Kane equals Lineker record 10 WC goals · Dallas",
  "🇨🇦 Canada 6–0 Qatar · Jonathan David HAT-TRICK 34' 45' 82' · Vancouver",
  "🔜 TODAY: Spain vs Saudi Arabia · 9:30 PM IST · Atlanta",
  "🔜 TODAY: Belgium vs Iran · 12:30 AM IST · Los Angeles",
  "📺 Watch live on JioCinema & Sports18 · All IST times on KickoffIST.com 🇮🇳",
];
export default function LiveTicker(){
  const d=[...ITEMS,...ITEMS];
  return(
    <div style={{background:"linear-gradient(90deg,#FF9933,#FF7700)",overflow:"hidden",display:"flex",alignItems:"center"}}>
      <div style={{flexShrink:0,background:"rgba(0,0,0,.25)",padding:"8px 14px",fontSize:"9px",fontWeight:"900",color:"#fff",letterSpacing:".1em",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"5px"}}>
        <span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#fff",animation:"blink 1.2s infinite"}}/>
        LATEST
      </div>
      <div style={{overflow:"hidden",flex:1,padding:"8px 0"}}>
        <div style={{display:"flex",width:"max-content",animation:"ticker 60s linear infinite"}}>
          {d.map((item,i)=>(
            <span key={i} style={{fontSize:"12px",fontWeight:"700",color:"rgba(0,0,0,.85)",padding:"0 24px",whiteSpace:"nowrap"}}>
              {item}<span style={{opacity:.4,marginLeft:"16px"}}>·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}};@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </div>
  );
}
