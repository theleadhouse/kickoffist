import Link from "next/link";
const GROUPS=[
  {id:"A",teams:[{t:"Mexico",f:"🇲🇽",p:3,pts:9,q:true},{t:"S. Africa",f:"🇿🇦",p:3,pts:4,q:true},{t:"S. Korea",f:"🇰🇷",p:3,pts:3,q:true},{t:"Czechia",f:"🇨🇿",p:3,pts:1,q:false}]},
  {id:"C",teams:[{t:"Brazil",f:"🇧🇷",p:3,pts:7,q:true},{t:"Morocco",f:"🇲🇦",p:3,pts:7,q:true},{t:"Scotland",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",p:3,pts:3,q:false},{t:"Haiti",f:"🇭🇹",p:3,pts:0,q:false}]},
  {id:"I",teams:[{t:"Norway",f:"🇳🇴",p:3,pts:9,q:true},{t:"France",f:"🇫🇷",p:3,pts:6,q:true},{t:"Senegal",f:"🇸🇳",p:3,pts:3,q:true},{t:"Iraq",f:"🇮🇶",p:3,pts:0,q:false}]},
  {id:"J",teams:[{t:"Argentina",f:"🇦🇷",p:3,pts:6,q:true},{t:"Austria",f:"🇦🇹",p:3,pts:3,q:true},{t:"Algeria",f:"🇩🇿",p:3,pts:3,q:false},{t:"Jordan",f:"🇯🇴",p:3,pts:0,q:false}]},
  {id:"K",teams:[{t:"Colombia",f:"🇨🇴",p:3,pts:7,q:true},{t:"Portugal",f:"🇵🇹",p:3,pts:5,q:true},{t:"DR Congo",f:"🇨🇩",p:3,pts:4,q:true},{t:"Uzbekistan",f:"🇺🇿",p:3,pts:0,q:false}]},
  {id:"L",teams:[{t:"England",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:3,pts:5,q:true},{t:"Ghana",f:"🇬🇭",p:3,pts:4,q:true},{t:"Croatia",f:"🇭🇷",p:3,pts:3,q:true},{t:"Panama",f:"🇵🇦",p:3,pts:0,q:false}]},
];
export default function MiniStandings(){
  return(
    <div>
      <div className="sh"><span className="sh-saff">📊 STANDINGS</span><div className="sh-line"/><Link href="/standings" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",letterSpacing:".06em",flexShrink:0}}>ALL 12 →</Link></div>
      <div className="glass" style={{borderRadius:"12px",overflow:"hidden"}}>
        {GROUPS.map(({id,teams},gi)=>(
          <div key={id} style={{borderTop:gi>0?"1px solid rgba(255,255,255,.06)":"none"}}>
            <div style={{padding:"5px 14px",background:"rgba(255,153,51,.06)",display:"flex",justifyContent:"space-between"}}>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".12em"}}>GROUP {id}</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.2)",letterSpacing:".06em"}}>MP PTS</span>
            </div>
            {teams.map((t,i)=>(
              <div key={t.t} className="st-row">
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,.25)",width:"14px",textAlign:"center"}}>{i+1}</span>
                <span className={`st-q ${t.q?"q":""}`}/>
                <span style={{fontSize:"16px",width:"20px",textAlign:"center",lineHeight:1}}>{t.f}</span>
                <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:t.q?700:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:t.q?"rgba(255,255,255,.9)":"rgba(255,255,255,.35)"}}>{t.t}{t.q?" ✓":""}</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,.25)",width:"16px",textAlign:"center"}}>{t.p}</span>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",letterSpacing:"1px",width:"22px",textAlign:"center",color:t.pts>0?"#FF9933":"rgba(255,255,255,.2)"}}>{t.pts}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{padding:"5px 14px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:"5px"}}>
          <span style={{width:"6px",height:"6px",borderRadius:"2px",background:"rgba(34,197,94,.4)"}}/>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.2)",letterSpacing:".04em"}}>✓ QUALIFIED · R32 NOW</span>
        </div>
      </div>
    </div>
  );
}
