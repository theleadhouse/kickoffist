import Link from "next/link";
// Verified June 23 2026 — ESPN + Yahoo + FIFA.com
const GROUPS = [
  {id:"A",teams:[{t:"Mexico",f:"🇲🇽",p:2,pts:6},{t:"South Korea",f:"🇰🇷",p:2,pts:3},{t:"Czechia",f:"🇨🇿",p:2,pts:1},{t:"South Africa",f:"🇿🇦",p:2,pts:1}]},
  {id:"D",teams:[{t:"USA",f:"🇺🇸",p:2,pts:6},{t:"Paraguay",f:"🇵🇾",p:2,pts:3},{t:"Australia",f:"🇦🇺",p:2,pts:3},{t:"Turkey",f:"🇹🇷",p:2,pts:0}]},
  {id:"K",teams:[{t:"Colombia",f:"🇨🇴",p:2,pts:6},{t:"Portugal",f:"🇵🇹",p:2,pts:4},{t:"DR Congo",f:"🇨🇩",p:2,pts:1},{t:"Uzbekistan",f:"🇺🇿",p:2,pts:0}]},
  {id:"L",teams:[{t:"England",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:2,pts:4},{t:"Ghana",f:"🇬🇭",p:2,pts:4},{t:"Croatia",f:"🇭🇷",p:2,pts:3},{t:"Panama",f:"🇵🇦",p:2,pts:0}]},
  {id:"I",teams:[{t:"Norway",f:"🇳🇴",p:2,pts:6},{t:"France",f:"🇫🇷",p:2,pts:6},{t:"Senegal",f:"🇸🇳",p:2,pts:0},{t:"Iraq",f:"🇮🇶",p:2,pts:0}]},
  {id:"J",teams:[{t:"Argentina",f:"🇦🇷",p:2,pts:6},{t:"Austria",f:"🇦🇹",p:2,pts:3},{t:"Algeria",f:"🇩🇿",p:2,pts:3},{t:"Jordan",f:"🇯🇴",p:2,pts:0}]},
];
export default function MiniStandings() {
  return (
    <div>
      <div className="sh">
        <span>📊</span><span>STANDINGS</span>
        <div className="sh-line"/>
        <Link href="/standings" style={{ fontSize:"10px", color:"#1a6b1a", fontWeight:600, textDecoration:"none", flexShrink:0 }}>All 12 →</Link>
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        {GROUPS.map(({id,teams},gi) => (
          <div key={id} style={{ borderTop: gi>0 ? "1px solid rgba(26,107,26,.06)" : "none" }}>
            <div style={{ display:"flex", justifyContent:"space-between", padding:"5px 12px", background:"rgba(26,107,26,.04)" }}>
              <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"11px", fontWeight:600, color:"#1a6b1a", letterSpacing:".1em" }}>GROUP {id}</span>
              <span style={{ fontSize:"8px", color:"#7a9a7a" }}>MP PTS</span>
            </div>
            {teams.map((t,i) => (
              <div key={t.t} className="st-row">
                <span style={{ fontSize:"9px", color:"#7a9a7a", width:"14px", textAlign:"center" }}>{i+1}</span>
                <span className={`st-q ${i<2&&t.pts>0?"q":""}`}/>
                <span style={{ fontSize:"17px", width:"22px", textAlign:"center", lineHeight:1 }}>{t.f}</span>
                <span style={{ flex:1, fontFamily:"'Teko',sans-serif", fontSize:"13px", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                  color: i<2&&t.pts>0 ? "#0d1f0d" : "#7a9a7a"
                }}>{t.t}</span>
                <span style={{ fontSize:"10px", color:"#7a9a7a", width:"18px", textAlign:"center" }}>{t.p}</span>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:".04em", width:"22px", textAlign:"center",
                  color: t.pts>0 ? "#1a6b1a" : "#7a9a7a"
                }}>{t.pts}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{ padding:"6px 12px", borderTop:"1px solid rgba(26,107,26,.06)", display:"flex", alignItems:"center", gap:"5px" }}>
          <span style={{ width:"7px", height:"7px", borderRadius:"2px", background:"rgba(26,107,26,.3)" }}/>
          <span style={{ fontSize:"8px", color:"#7a9a7a" }}>Top 2 qualify · 4 teams per group</span>
        </div>
      </div>
    </div>
  );
}
