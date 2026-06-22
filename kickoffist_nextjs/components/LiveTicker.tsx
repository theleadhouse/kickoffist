"use client";
const ITEMS=[
  "🏆 FIFA World Cup 2026 · 48 Teams · USA Mexico Canada · Jun 11 – Jul 19",
  "🔜 TODAY 10:30 PM IST · Argentina vs Austria · AT&T Stadium Dallas · Group J",
  "🔜 TODAY 2:30 AM IST · France vs Iraq · Philadelphia · Group I",
  "🔜 TODAY 5:30 AM IST · Norway vs Senegal · MetLife Stadium NJ · Group I",
  "🔜 TODAY 8:30 AM IST · Jordan vs Algeria · Santa Clara · Group J",
  "🇪🇸 Spain 4–0 Saudi Arabia · Yamal · Morata · Williams · Fabián",
  "🇯🇵 Japan 4–0 Tunisia · Ueda ×2 · Ito · Nakamura · Monterrey",
  "🇺🇾 Uruguay 2–2 Cabo Verde · Nunez · Suarez / Tavares · Andrade",
  "🇧🇪 Belgium 1–1 Iran · Group H · Los Angeles",
  "🇪🇬 Egypt 3–1 New Zealand · Salah 67' · Vancouver",
  "🇺🇸 USA QUALIFIED · 6pts · 2–0 Australia · Freeman 43' · Seattle",
  "🇲🇽 MEXICO QUALIFIED · 6pts · 2 wins · Group A leaders",
  "🇩🇪 GERMANY QUALIFIED · 6pts · 9–2 goals · Undav brace vs Ivory Coast",
  "🇦🇷 MESSI HAT-TRICK · Argentina 3–0 Algeria · 17' 60' 76' · Kansas City",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England 4–2 Croatia · Kane ×2 · equals Lineker WC record · Dallas",
  "📺 Watch live on JioCinema · Sports18 · DD Sports · All times IST 🇮🇳",
];
export default function LiveTicker(){
  const d=[...ITEMS,...ITEMS];
  return(
    <div style={{background:"linear-gradient(90deg,#FF9933 0%,#e67e00 100%)",overflow:"hidden",display:"flex",alignItems:"center",flexShrink:0}}>
      <div style={{flexShrink:0,background:"rgba(0,0,0,.25)",padding:"7px 14px",fontSize:"10px",fontWeight:"900",color:"#fff",letterSpacing:".12em",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"5px",fontFamily:"'Barlow Condensed','Oswald',sans-serif",textTransform:"uppercase"}}>
        <span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#fff",animation:"blink 1.2s infinite",display:"block",flexShrink:0}}/>
        Live
      </div>
      <div style={{overflow:"hidden",flex:1}}>
        <div style={{display:"flex",width:"max-content",animation:"ticker 70s linear infinite",padding:"7px 0"}}>
          {d.map((item,i)=>(
            <span key={i} style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",fontWeight:"700",color:"rgba(0,0,0,.85)",padding:"0 22px",whiteSpace:"nowrap"}}>
              {item}<span style={{opacity:.3,marginLeft:"14px"}}>·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}};@keyframes blink{0%,100%{opacity:1}50%{opacity:.2}}`}</style>
    </div>
  );
}
