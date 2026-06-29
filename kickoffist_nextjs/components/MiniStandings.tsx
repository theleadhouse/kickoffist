import Link from "next/link";
const G=[
  {id:"A",t:[{n:"Mexico",f:"🇲🇽",p:3,pts:9,q:true},{n:"S. Africa",f:"🇿🇦",p:3,pts:4,q:true},{n:"S. Korea",f:"🇰🇷",p:3,pts:3,q:true},{n:"Czechia",f:"🇨🇿",p:3,pts:1,q:false}]},
  {id:"C",t:[{n:"Brazil",f:"🇧🇷",p:3,pts:7,q:true},{n:"Morocco",f:"🇲🇦",p:3,pts:7,q:true},{n:"Scotland",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",p:3,pts:3,q:false},{n:"Haiti",f:"🇭🇹",p:3,pts:0,q:false}]},
  {id:"I",t:[{n:"Norway",f:"🇳🇴",p:3,pts:9,q:true},{n:"France",f:"🇫🇷",p:3,pts:6,q:true},{n:"Senegal",f:"🇸🇳",p:3,pts:3,q:true},{n:"Iraq",f:"🇮🇶",p:3,pts:0,q:false}]},
  {id:"J",t:[{n:"Argentina",f:"🇦🇷",p:3,pts:6,q:true},{n:"Austria",f:"🇦🇹",p:3,pts:3,q:true},{n:"Algeria",f:"🇩🇿",p:3,pts:3,q:false},{n:"Jordan",f:"🇯🇴",p:3,pts:0,q:false}]},
  {id:"K",t:[{n:"Colombia",f:"🇨🇴",p:3,pts:7,q:true},{n:"Portugal",f:"🇵🇹",p:3,pts:5,q:true},{n:"DR Congo",f:"🇨🇩",p:3,pts:4,q:true},{n:"Uzbekistan",f:"🇺🇿",p:3,pts:0,q:false}]},
  {id:"L",t:[{n:"England",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:3,pts:5,q:true},{n:"Ghana",f:"🇬🇭",p:3,pts:4,q:true},{n:"Croatia",f:"🇭🇷",p:3,pts:3,q:true},{n:"Panama",f:"🇵🇦",p:3,pts:0,q:false}]},
];
export default function MiniStandings(){
  return(
    <div>
      <div className="sh">📊 STANDINGS<div className="sh-line"/><Link href="/standings" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",flexShrink:0}}>ALL 12 →</Link></div>
      <div className="card" style={{overflow:"hidden"}}>
        {G.map(({id,t},gi)=>(
          <div key={id} style={{borderTop:gi>0?"1px solid rgba(255,255,255,.05)":"none"}}>
            <div style={{padding:"5px 14px",background:"rgba(255,153,51,.06)",display:"flex",justifyContent:"space-between"}}>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".12em"}}>GROUP {id}</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.2)"}}>MP PTS</span>
            </div>
            {t.map((tm,i)=>(
              <div key={tm.n} className="st-row">
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,.25)",width:"14px",textAlign:"center"}}>{i+1}</span>
                <span className={`st-q ${tm.q?"q":""}`}/>
                <span style={{fontSize:"16px",width:"20px",textAlign:"center",lineHeight:1}}>{tm.f}</span>
                <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:tm.q?700:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:tm.q?"rgba(255,255,255,.9)":"rgba(255,255,255,.35)"}}>{tm.n}{tm.q?" ✓":""}</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,.25)",width:"16px",textAlign:"center"}}>{tm.p}</span>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",letterSpacing:"1px",width:"22px",textAlign:"center",color:tm.pts>0?"#FF9933":"rgba(255,255,255,.2)"}}>{tm.pts}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{padding:"5px 14px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:"5px"}}>
          <span style={{width:"6px",height:"6px",borderRadius:"2px",background:"#00c853"}}/>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.2)"}}>✓ QUALIFIED · R32 UNDERWAY</span>
        </div>
      </div>
    </div>
  );
}
