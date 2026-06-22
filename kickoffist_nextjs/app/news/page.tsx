export const revalidate = 3600;

const NEWS = [
  {
    id:1, tag:"🐐 HISTORY", title:"Messi Breaks All-Time World Cup Scoring Record",
    body:"Lionel Messi scored twice against Austria on June 22, taking his career World Cup tally to 18 goals — surpassing Germany legend Miroslav Klose to become the greatest World Cup scorer of all time. He now has 5 goals in just 2 games at WC 2026.",
    meta:"June 22 · Group J · AT&T Stadium Dallas", highlight:true,
  },
  {
    id:2, tag:"🏆 QUALIFIED", title:"USA, Mexico & Germany Through to Round of 32",
    body:"Three teams have already secured their place in the knockout stage. Mexico were first through after two wins. USA followed with a 2–0 win over Australia, with Alex Freeman scoring. Germany sealed qualification with a late 2–1 win over Ivory Coast through substitute Deniz Undav.",
    meta:"After Matchday 2 · Groups A, D, E",
  },
  {
    id:3, tag:"⭐ LAMINE YAMAL", title:"Yamal Scores His First World Cup Goal — Aged 18",
    body:"Barcelona superstar Lamine Yamal scored his first ever World Cup goal for Spain in their 4–0 demolition of Saudi Arabia. At 18 years old, he is one of the most exciting players at the tournament. Spain are now Group G leaders.",
    meta:"June 21 · Group G · Mercedes-Benz Stadium Atlanta",
  },
  {
    id:4, tag:"🇨🇦 DAVID", title:"Jonathan David Hat-Trick: Canada Crush Qatar 6–0",
    body:"Jonathan David became the first Canadian player to score a World Cup hat-trick as Canada demolished Qatar 6–0 in Vancouver. The Lille striker scored in the 34th, 45th and 82nd minutes. Canada are now joint top of Group B with Switzerland.",
    meta:"June 18 · Group B · BC Place Vancouver",
  },
  {
    id:5, tag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 KANE", title:"Kane Equals Lineker's England World Cup Record",
    body:"Harry Kane scored twice against Croatia to equal Gary Lineker's record of 10 England World Cup goals. England won 4–2 in an entertaining match in Dallas. Kane is one of the favourites for the Golden Boot alongside Messi and Haaland.",
    meta:"June 17 · Group L · AT&T Stadium Dallas",
  },
  {
    id:6, tag:"🇳🇱 NETHERLANDS", title:"Netherlands Demolish Sweden 5–1 in Group F Thriller",
    body:"Brian Brobbey scored twice as the Netherlands produced one of the performances of the tournament, dismantling Sweden 5–1 in Houston. Cody Gakpo, Donyell Malen and Memphis Depay also scored. Alexander Isak pulled one back for Sweden.",
    meta:"June 20 · Group F · NRG Stadium Houston",
  },
  {
    id:7, tag:"🇯🇵 JAPAN", title:"Japan 4–0 Tunisia: Asian Giants Send Warning",
    body:"Japan produced a brilliant performance to beat Tunisia 4–0 in Monterrey. Ayase Ueda scored twice with Junya Ito and Takuma Nakamura also on the scoresheet. Japan are joint top of Group F with the Netherlands on 4 points.",
    meta:"June 21 · Group F · Estadio BBVA Monterrey",
  },
  {
    id:8, tag:"🇲🇦 MOROCCO", title:"Dari Scores After Just 1 Minute — Fastest WC 2026 Goal",
    body:"Morocco's Achraf Dari scored just 1 minute into their match against Scotland — the fastest goal of World Cup 2026 so far. Morocco won 1–0 to go joint top of Group C with Brazil, who beat Haiti 3–0 through goals from Vinicius Jr, Rodrygo and Endrick.",
    meta:"June 19 · Group C · Gillette Stadium Foxborough",
  },
  {
    id:9, tag:"📊 GOLDEN BOOT", title:"Golden Boot Race: Messi Leads with 5 Goals",
    body:"After Matchday 2, Lionel Messi leads the Golden Boot race with 5 goals. Jonathan David (Canada) has 3. Kane, Haaland, Mbappe, Havertz, Brobbey, Undav, Ueda and Balogun all have 2. This is shaping up to be the most prolific World Cup in history.",
    meta:"Updated June 22 · After MD2",
  },
  {
    id:10, tag:"🇮🇳 INDIA", title:"How to Watch World Cup 2026 Live in India",
    body:"JioCinema is streaming all 104 matches FREE on mobile. Sports18 has TV coverage. DD Sports has free-to-air coverage of selected matches. All times on KickoffIST.com are in Indian Standard Time (IST) — India is 9.5 hours ahead of US Eastern Time.",
    meta:"Viewing guide for Indian fans 🇮🇳",
  },
];

export default function NewsPage(){
  return(
    <div style={{maxWidth:"800px",margin:"0 auto"}}>
      <div style={{marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
        <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"10px",fontWeight:800,color:"#FF9933",letterSpacing:".14em",textTransform:"uppercase",marginBottom:"4px"}}>FIFA World Cup 2026</div>
        <h1 style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:"#fff",letterSpacing:"1px",lineHeight:1,marginBottom:"6px"}}>NEWS & STORIES</h1>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,.3)"}}>Latest from USA · Canada · Mexico · Updated June 22 2026 IST</p>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
        {NEWS.map((item,i)=>(
          <div key={item.id} style={{
            background:item.highlight?"rgba(255,153,51,.06)":"rgba(255,255,255,.04)",
            border:`1px solid ${item.highlight?"rgba(255,153,51,.2)":"rgba(255,255,255,.07)"}`,
            borderRadius:"12px",padding:"18px 20px",
            transition:"all .15s",cursor:"default",
          }}>
            <div style={{display:"flex",alignItems:"flex-start",gap:"12px"}}>
              {/* Number */}
              <div style={{
                fontFamily:"'Barlow Condensed','Oswald',sans-serif",
                fontSize:"28px",fontWeight:900,
                color:item.highlight?"#FF9933":"rgba(255,255,255,.1)",
                lineHeight:1,flexShrink:0,minWidth:"28px",
              }}>{i+1}</div>
              <div style={{flex:1,minWidth:0}}>
                {/* Tag */}
                <div style={{
                  display:"inline-block",
                  fontFamily:"'Barlow Condensed','Oswald',sans-serif",
                  fontSize:"10px",fontWeight:800,
                  color:item.highlight?"#FF9933":"rgba(255,153,51,.7)",
                  letterSpacing:".1em",textTransform:"uppercase",
                  marginBottom:"6px",
                }}>{item.tag}</div>
                {/* Title */}
                <h2 style={{
                  fontFamily:"'Barlow Condensed','Oswald',sans-serif",
                  fontSize:"clamp(16px,3vw,20px)",fontWeight:800,
                  color:"#fff",letterSpacing:".02em",lineHeight:1.15,
                  marginBottom:"8px",
                }}>{item.title}</h2>
                {/* Body */}
                <p style={{
                  fontSize:"13px",color:"rgba(255,255,255,.55)",
                  lineHeight:1.7,marginBottom:"10px",
                }}>{item.body}</p>
                {/* Meta */}
                <div style={{fontSize:"10px",color:"rgba(255,255,255,.25)",fontWeight:600}}>
                  📍 {item.meta}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:"20px",padding:"14px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.1)",borderRadius:"10px",textAlign:"center"}}>
        <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",fontWeight:700,color:"#FF9933",marginBottom:"4px"}}>📱 Install KickoffIST on your phone</div>
        <div style={{fontSize:"11px",color:"rgba(255,255,255,.3)"}}>Chrome → Menu → Add to Home Screen · Safari → Share → Add to Home Screen</div>
      </div>
    </div>
  );
}
