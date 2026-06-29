import Link from "next/link";
const GROUPS=[
  {id:"A",teams:[{t:"Mexico",f:"🇲🇽",p:3,pts:9,q:true},{t:"S. Africa",f:"🇿🇦",p:3,pts:4,q:true},{t:"S. Korea",f:"🇰🇷",p:3,pts:3,q:true},{t:"Czechia",f:"🇨🇿",p:3,pts:1,q:false}]},
  {id:"B",teams:[{t:"Switzerland",f:"🇨🇭",p:3,pts:7,q:true},{t:"Canada",f:"🇨🇦",p:3,pts:4,q:true},{t:"Bosnia",f:"🇧🇦",p:3,pts:4,q:true},{t:"Qatar",f:"🇶🇦",p:3,pts:0,q:false}]},
  {id:"I",teams:[{t:"Norway",f:"🇳🇴",p:3,pts:9,q:true},{t:"France",f:"🇫🇷",p:3,pts:6,q:true},{t:"Senegal",f:"🇸🇳",p:3,pts:3,q:true},{t:"Iraq",f:"🇮🇶",p:3,pts:0,q:false}]},
  {id:"J",teams:[{t:"Argentina",f:"🇦🇷",p:3,pts:6,q:true},{t:"Algeria",f:"🇩🇿",p:3,pts:3,q:false},{t:"Austria",f:"🇦🇹",p:3,pts:3,q:true},{t:"Jordan",f:"🇯🇴",p:3,pts:0,q:false}]},
  {id:"K",teams:[{t:"Colombia",f:"🇨🇴",p:3,pts:7,q:true},{t:"Portugal",f:"🇵🇹",p:3,pts:5,q:true},{t:"DR Congo",f:"🇨🇩",p:3,pts:4,q:true},{t:"Uzbekistan",f:"🇺🇿",p:3,pts:0,q:false}]},
  {id:"L",teams:[{t:"England",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:3,pts:5,q:true},{t:"Ghana",f:"🇬🇭",p:3,pts:4,q:true},{t:"Croatia",f:"🇭🇷",p:3,pts:3,q:true},{t:"Panama",f:"🇵🇦",p:3,pts:0,q:false}]},
];
export default function MiniStandings(){
  return(
    <div>
      <div className="sh sh-green">📊 STANDINGS<div className="sh-line"/><Link href="/standings" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#1B4332",textDecoration:"none",letterSpacing:".06em",flexShrink:0}}>ALL 12 →</Link></div>
      <div style={{background:"#fff",border:"1px solid #E5DDD5",borderRadius:"8px",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
        {GROUPS.map(({id,teams},gi)=>(
          <div key={id} style={{borderTop:gi>0?"1px solid #F0EDE8":"none"}}>
            <div style={{padding:"5px 14px",background:"#FAFAF7",display:"flex",justifyContent:"space-between"}}>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#1B4332",letterSpacing:".12em"}}>GROUP {id}</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#CCC",letterSpacing:".06em"}}>MP PTS</span>
            </div>
            {teams.map((t,i)=>(
              <div key={t.t} className="st-row">
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"#CCC",width:"14px",textAlign:"center"}}>{i+1}</span>
                <span className={`st-q ${t.q?"q":""}`}/>
                <span style={{fontSize:"16px",width:"20px",textAlign:"center",lineHeight:1}}>{t.f}</span>
                <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:t.q?700:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:t.q?"#0A0A0A":"#AAA"}}>{t.t}{t.q?" ✓":""}</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"#CCC",width:"16px",textAlign:"center"}}>{t.p}</span>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",letterSpacing:"1px",width:"22px",textAlign:"center",color:t.pts>0?"#FF9933":"#CCC"}}>{t.pts}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{padding:"5px 14px",borderTop:"1px solid #F0EDE8",display:"flex",alignItems:"center",gap:"5px"}}>
          <span style={{width:"6px",height:"6px",borderRadius:"2px",background:"#1B4332"}}/>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#AAA",letterSpacing:".04em"}}>✓ QUALIFIED FOR ROUND OF 32</span>
        </div>
      </div>
    </div>
  );
}
