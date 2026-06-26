import Link from "next/link";
const GROUPS=[
  {id:"A",teams:[{t:"Mexico",f:"🇲🇽",p:3,pts:9},{t:"S. Africa",f:"🇿🇦",p:3,pts:4},{t:"S. Korea",f:"🇰🇷",p:3,pts:3},{t:"Czechia",f:"🇨🇿",p:3,pts:1}]},
  {id:"D",teams:[{t:"USA",f:"🇺🇸",p:3,pts:6},{t:"Australia",f:"🇦🇺",p:3,pts:4},{t:"Paraguay",f:"🇵🇾",p:3,pts:4},{t:"Turkey",f:"🇹🇷",p:3,pts:3}]},
  {id:"E",teams:[{t:"Germany",f:"🇩🇪",p:3,pts:6},{t:"Ivory Coast",f:"🇨🇮",p:3,pts:6},{t:"Ecuador",f:"🇪🇨",p:3,pts:4},{t:"Curaçao",f:"🇨🇼",p:3,pts:1}]},
  {id:"F",teams:[{t:"Netherlands",f:"🇳🇱",p:3,pts:5},{t:"Japan",f:"🇯🇵",p:3,pts:5},{t:"Sweden",f:"🇸🇪",p:3,pts:4},{t:"Tunisia",f:"🇹🇳",p:3,pts:0}]},
  {id:"I",teams:[{t:"Norway",f:"🇳🇴",p:2,pts:6},{t:"France",f:"🇫🇷",p:2,pts:6},{t:"Senegal",f:"🇸🇳",p:2,pts:0},{t:"Iraq",f:"🇮🇶",p:2,pts:0}]},
  {id:"J",teams:[{t:"Argentina",f:"🇦🇷",p:2,pts:6},{t:"Austria",f:"🇦🇹",p:2,pts:3},{t:"Algeria",f:"🇩🇿",p:2,pts:3},{t:"Jordan",f:"🇯🇴",p:2,pts:0}]},
];
export default function MiniStandings(){
  return(
    <div>
      <div className="sh"><span className="sh-saff">📊 STANDINGS</span><div className="sh-line"/><Link href="/standings" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:700,color:"#FF9933",textDecoration:"none",letterSpacing:".06em",flexShrink:0}}>ALL 12 →</Link></div>
      <div className="card" style={{overflow:"hidden"}}>
        {GROUPS.map(({id,teams},gi)=>(
          <div key={id} style={{borderTop:gi>0?"1px solid rgba(255,255,255,.05)":"none"}}>
            <div style={{padding:"5px 14px",background:"rgba(255,153,51,.06)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#FF9933",letterSpacing:".12em"}}>GROUP {id}</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.2)",letterSpacing:".08em"}}>MP PTS</span>
            </div>
            {teams.map((t,i)=>(
              <div key={t.t} className="st-row">
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,.25)",width:"14px",textAlign:"center"}}>{i+1}</span>
                <span className={`st-q ${i<2&&t.pts>0?"q":""}`}/>
                <span style={{fontSize:"17px",width:"22px",textAlign:"center",lineHeight:1}}>{t.f}</span>
                <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".02em",
                  color:i<2&&t.pts>0?"rgba(255,255,255,.9)":"rgba(255,255,255,.35)"
                }}>{t.t}</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:700,color:"rgba(255,255,255,.25)",width:"18px",textAlign:"center"}}>{t.p}</span>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"1px",width:"22px",textAlign:"center",color:t.pts>0?"#FF9933":"rgba(255,255,255,.2)"}}>{t.pts}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{padding:"6px 14px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:"5px"}}>
          <span style={{width:"7px",height:"7px",borderRadius:"2px",background:"rgba(0,210,106,.3)"}}/>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.2)",letterSpacing:".04em"}}>TOP 2 ADVANCE · 4 PER GROUP</span>
        </div>
      </div>
    </div>
  );
}
