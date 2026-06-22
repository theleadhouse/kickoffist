"use client";
const ITEMS=[
  "🏆 FIFA World Cup 2026 · 48 Teams · USA Mexico Canada · Jun 11 – Jul 19",
  "🇺🇸 USA QUALIFIED! 6pts from 2 games · Freeman 43' · 2–0 Australia · Seattle",
  "🇲🇽 MEXICO QUALIFIED! 6pts · 2 wins · Group A leaders",
  "🇩🇪 GERMANY QUALIFIED! 6pts · 9–2 goals · Havertz · Undav brace vs Ivory Coast",
  "🇪🇸 Spain 4–0 Saudi Arabia · Yamal · Morata · Group G leaders",
  "🇪🇬 Egypt 3–1 New Zealand · Egypt through in Group H",
  "🇳🇱 Netherlands 5–1 Sweden · Brobbey brace · Gakpo · Malen · Houston",
  "🇯🇵 Japan 4–0 Tunisia · Ueda brace · Ito · Nakamura · Monterrey",
  "🇧🇷 Brazil 3–0 Haiti · Vinicius · Rodrygo · Endrick · Philadelphia",
  "🇦🇷 MESSI HAT-TRICK! Argentina 3–0 Algeria · 17' 60' 76' · Kansas City",
  "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England 4–2 Croatia · Kane ×2 equals Lineker 10 WC goals · Dallas",
  "🇨🇦 Canada 6–0 Qatar · Jonathan David HAT-TRICK · Vancouver",
  "🔜 TODAY: Argentina vs Austria · 10:30 PM IST · Dallas",
  "🔜 TODAY: France vs Iraq · 2:30 AM IST · Philadelphia",
  "🔜 TONIGHT: Norway vs Senegal · 5:30 AM IST · MetLife Stadium",
  "📺 JioCinema · Sports18 · DD Sports · All times IST on KickoffIST.com 🇮🇳",
];
export default function LiveTicker(){
  const d=[...ITEMS,...ITEMS];
  return(
    <div style={{background:"linear-gradient(90deg,#FF9933 0%,#FF7700 100%)",overflow:"hidden",display:"flex",alignItems:"center",flexShrink:0}}>
      <div style={{flexShrink:0,background:"rgba(0,0,0,.2)",padding:"8px 14px",fontSize:"9px",fontWeight:"900",color:"#fff",letterSpacing:".1em",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"5px",fontFamily:"'Barlow Condensed','Oswald',sans-serif"}}>
        <span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#fff",animation:"blink 1.2s infinite",display:"block"}}/>
        LATEST
      </div>
      <div style={{overflow:"hidden",flex:1,padding:"8px 0"}}>
        <div style={{display:"flex",width:"max-content",animation:"ticker 65s linear infinite"}}>
          {d.map((item,i)=>(
            <span key={i} style={{fontSize:"12px",fontWeight:"700",color:"rgba(0,0,0,.8)",padding:"0 24px",whiteSpace:"nowrap",fontFamily:"'Barlow Condensed','Oswald',sans-serif"}}>
              {item}<span style={{opacity:.35,marginLeft:"16px"}}>·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}};@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </div>
  );
}
