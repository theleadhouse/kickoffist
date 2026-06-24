export const revalidate = 3600;
const NEWS = [
  {id:1,tag:"🐐 RONALDO",title:"Ronaldo Scores at SIX Different World Cups — A First in History",body:"Cristiano Ronaldo became the first player ever to score at six different FIFA World Cups as Portugal thrashed Uzbekistan 5-0 on June 23. His two goals took him past Eusebio as Portugal's all-time top World Cup scorer. Ronaldo is 41 years old.",meta:"June 23 · Group K · NRG Stadium Houston",hot:true},
  {id:2,tag:"🐐 MESSI",title:"Messi: 18 World Cup Goals — The Greatest of All Time",body:"Lionel Messi broke Miroslav Klose's all-time World Cup scoring record with his brace against Austria on June 22. He now has 18 career World Cup goals — more than any player in history. At 38, in his fifth World Cup, he has 5 goals in just 2 games at WC 2026.",meta:"June 22 · Group J · AT&T Stadium Dallas",hot:true},
  {id:3,tag:"📊 KEY STAT",title:"Portugal 5–0 Uzbekistan: Biggest Win in Group K History",body:"Portugal's 5-0 demolition of Uzbekistan included goals from Ronaldo (2), Fernandes, Leao and Joao Felix. Colombia also qualified from Group K with a 1-0 win over DR Congo through Luis Diaz. Colombia are the first South American team to qualify from MD2.",meta:"June 23 · Group K",hot:false},
  {id:4,tag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLAND",title:"England 0–0 Ghana: 12-Game Winning Streak Ends",body:"England failed to win a competitive match for the first time since October 2024 as they drew 0-0 with Ghana. Neither team registered a shot on goal in the first half. Croatia beat Panama 1-0 to stay alive. Group L goes to the final day undecided.",meta:"June 23 · Group L · Gillette Stadium Foxborough",hot:false},
  {id:5,tag:"☀️ MORNING READ",title:"What You Missed Overnight — June 23 Results",body:"While India slept: Portugal 5-0 Uzbekistan (Ronaldo brace · first player to score at 6 WCs), England 0-0 Ghana (chippy draw · 12-game winning streak ends), Croatia 1-0 Panama (Budimir 61'), Colombia 1-0 DR Congo (Diaz 73'). Colombia and Portugal both through from Group K.",meta:"June 24 morning summary",hot:false},
  {id:6,tag:"📊 GOLDEN BOOT",title:"Messi 5, Haaland 4, Mbappe 4 — Greatest Golden Boot Race Ever",body:"After Matchday 2+, three of the greatest players ever are battling for the Golden Boot. Messi leads with 5 goals. Haaland and Mbappe have 4 each. Jonathan David (Canada) has 3. Ronaldo just added 2. This is the most star-studded Golden Boot race in World Cup history.",meta:"Updated June 23 · After MD2",hot:false},
  {id:7,tag:"🇮🇳 INDIA GUIDE",title:"How to Watch World Cup 2026 Free in India — Complete Guide",body:"Zee5 is the exclusive broadcaster for FIFA World Cup 2026 in India. Stream all 104 matches on zee5.com or the Zee5 app. All times on KickoffIST.com are in Indian Standard Time (IST). India is 9.5 hours ahead of US Eastern Time — most big matches start between 10 PM and 9 AM IST.",meta:"Viewing guide for Indian fans 🇮🇳",hot:false},
  {id:8,tag:"📅 UPCOMING",title:"Today's Key Matches — June 24 in IST",body:"Today features Matchday 3 for Groups A and B. All four matches kick off simultaneously — Switzerland vs Canada, Bosnia vs Qatar, South Africa vs South Korea, Czechia vs Mexico. Mexico need just a draw to win Group A. Canada and Switzerland fight for Group B top spot.",meta:"June 24 2026 · Groups A & B",hot:false},
];
export default function NewsPage() {
  return (
    <div style={{ maxWidth:"760px", margin:"0 auto" }}>
      <div style={{ marginBottom:"20px", paddingBottom:"14px", borderBottom:"2px solid rgba(26,107,26,.1)" }}>
        <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"11px", fontWeight:600, color:"#1a6b1a", letterSpacing:".14em", marginBottom:"4px" }}>FIFA WORLD CUP 2026</div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(28px,4vw,44px)", letterSpacing:"2px", color:"#0d1f0d", lineHeight:1, marginBottom:"6px" }}>NEWS & STORIES</h1>
        <p style={{ fontSize:"12px", color:"#7a9a7a" }}>Latest · June 23 2026 IST · Written for Indian fans</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
        {NEWS.map((item,i) => (
          <div key={item.id} className="card" style={{ padding:"18px 20px", background: item.hot ? "rgba(255,153,51,.04)" : "#fff", border: item.hot ? "1px solid rgba(255,153,51,.2)" : "1px solid rgba(26,107,26,.08)" }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:"14px" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"32px", letterSpacing:"1px", color: item.hot?"#FF9933":"rgba(26,107,26,.15)", lineHeight:1, flexShrink:0, minWidth:"28px" }}>{i+1}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"11px", fontWeight:600, color: item.hot?"#c85000":"#1a6b1a", letterSpacing:".1em", marginBottom:"5px" }}>{item.tag}</div>
                <h2 style={{ fontFamily:"'Teko',sans-serif", fontSize:"clamp(17px,3vw,22px)", fontWeight:600, color:"#0d1f0d", letterSpacing:".02em", lineHeight:1.2, marginBottom:"8px" }}>{item.title}</h2>
                <p style={{ fontSize:"13px", color:"#3a5c3a", lineHeight:1.7, marginBottom:"10px" }}>{item.body}</p>
                <div style={{ fontSize:"10px", color:"#7a9a7a", fontWeight:600 }}>📍 {item.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:"20px", padding:"14px", background:"rgba(26,107,26,.04)", border:"1px solid rgba(26,107,26,.1)", borderRadius:"12px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"14px", fontWeight:600, color:"#1a6b1a", marginBottom:"4px" }}>📱 Install KickoffIST on your phone</div>
        <div style={{ fontSize:"11px", color:"#7a9a7a" }}>Chrome → Menu → Add to Home Screen · Safari → Share → Add to Home Screen</div>
      </div>
    </div>
  );
}
