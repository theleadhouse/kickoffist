import Link from "next/link";
// Verified June 22 2026 — ESPN + Yahoo Sports + FIFA.com
const GROUPS=[
  {id:"A",teams:[{t:"Mexico",f:"🇲🇽",p:2,pts:6},{t:"South Korea",f:"🇰🇷",p:2,pts:3},{t:"Czechia",f:"🇨🇿",p:2,pts:1},{t:"South Africa",f:"🇿🇦",p:2,pts:1}]},
  {id:"D",teams:[{t:"USA",f:"🇺🇸",p:2,pts:6},{t:"Paraguay",f:"🇵🇾",p:2,pts:3},{t:"Australia",f:"🇦🇺",p:2,pts:3},{t:"Turkey",f:"🇹🇷",p:2,pts:0}]},
  {id:"E",teams:[{t:"Germany",f:"🇩🇪",p:2,pts:6},{t:"Ivory Coast",f:"🇨🇮",p:2,pts:3},{t:"Ecuador",f:"🇪🇨",p:2,pts:1},{t:"Curaçao",f:"🇨🇼",p:2,pts:1}]},
  {id:"F",teams:[{t:"Netherlands",f:"🇳🇱",p:2,pts:4},{t:"Japan",f:"🇯🇵",p:2,pts:4},{t:"Sweden",f:"🇸🇪",p:2,pts:3},{t:"Tunisia",f:"🇹🇳",p:2,pts:0}]},
  {id:"G",teams:[{t:"Spain",f:"🇪🇸",p:2,pts:4},{t:"Uruguay",f:"🇺🇾",p:2,pts:2},{t:"Cabo Verde",f:"🇨🇻",p:2,pts:2},{t:"Saudi Arabia",f:"🇸🇦",p:2,pts:1}]},
  {id:"I",teams:[{t:"Norway",f:"🇳🇴",p:2,pts:6},{t:"France",f:"🇫🇷",p:2,pts:6},{t:"Senegal",f:"🇸🇳",p:2,pts:0},{t:"Iraq",f:"🇮🇶",p:2,pts:0}]},
  {id:"J",teams:[{t:"Argentina",f:"🇦🇷",p:2,pts:6},{t:"Austria",f:"🇦🇹",p:2,pts:3},{t:"Algeria",f:"🇩🇿",p:2,pts:3},{t:"Jordan",f:"🇯🇴",p:2,pts:0}]},
];

export default function MiniStandings(){
  return(
    <div>
      <div className="sh">
        <span>📊</span><span>STANDINGS</span>
        <div className="sh-line"/>
        <Link href="/standings" style={{fontSize:"10px",color:"#FF9933",fontWeight:700,textDecoration:"none",flexShrink:0}}>All 12 →</Link>
      </div>
      <div className="card" style={{overflow:"hidden"}}>
        {GROUPS.map(({id,teams},gi)=>(
          <div key={id} style={{borderTop:gi>0?"1px solid rgba(255,255,255,.05)":"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",padding:"5px 12px",background:"rgba(255,153,51,.04)"}}>
              <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"10px",fontWeight:900,color:"#FF9933",letterSpacing:".1em"}}>GROUP {id}</span>
              <span style={{fontSize:"8px",color:"rgba(255,255,255,.2)"}}>MP PTS</span>
            </div>
            {teams.map((t,i)=>(
              <div key={t.t} className="st-row">
                <span style={{fontSize:"9px",color:"rgba(255,255,255,.2)",width:"14px",textAlign:"center"}}>{i+1}</span>
                <span className={`st-q ${i<2&&t.pts>0?"q":""}`}/>
                <span style={{fontSize:"17px",width:"22px",textAlign:"center",lineHeight:1}}>{t.f}</span>
                <span style={{flex:1,fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"12px",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                  color:i<2&&t.pts>0?"rgba(255,255,255,.8)":"rgba(255,255,255,.4)"
                }}>{t.t}</span>
                <span style={{fontSize:"10px",color:"rgba(255,255,255,.25)",width:"18px",textAlign:"center"}}>{t.p}</span>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"14px",fontWeight:900,width:"22px",textAlign:"center",
                  color:t.pts>0?"#fff":"rgba(255,255,255,.2)"
                }}>{t.pts}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{padding:"6px 12px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:"5px"}}>
          <span style={{width:"7px",height:"7px",borderRadius:"2px",background:"rgba(74,222,128,.3)"}}/>
          <span style={{fontSize:"8px",color:"rgba(255,255,255,.18)"}}>Top 2 qualify · 4 teams per group</span>
        </div>
      </div>
    </div>
  );
}
