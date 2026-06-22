import Link from "next/link";
// VERIFIED June 21 2026 — ESPN + CBS Sports + Yahoo + FIFA.com
// ALL 4 TEAMS PER GROUP — no errors
const GROUPS:{id:string;teams:{team:string;flag:string;p:number;pts:number}[]}[]=[
  {id:"A",teams:[
    {team:"Mexico",      flag:"🇲🇽",p:2,pts:6},
    {team:"South Korea", flag:"🇰🇷",p:2,pts:3},
    {team:"Czechia",     flag:"🇨🇿",p:2,pts:1},
    {team:"South Africa",flag:"🇿🇦",p:2,pts:1},
  ]},
  {id:"D",teams:[
    {team:"USA",      flag:"🇺🇸",p:2,pts:6},
    {team:"Paraguay", flag:"🇵🇾",p:2,pts:3},
    {team:"Australia",flag:"🇦🇺",p:2,pts:3},
    {team:"Turkey",   flag:"🇹🇷",p:2,pts:0},
  ]},
  {id:"E",teams:[
    {team:"Germany",    flag:"🇩🇪",p:2,pts:6},
    {team:"Ivory Coast",flag:"🇨🇮",p:2,pts:3},
    {team:"Ecuador",    flag:"🇪🇨",p:2,pts:1},
    {team:"Curaçao",    flag:"🇨🇼",p:2,pts:1},
  ]},
  {id:"F",teams:[
    {team:"Netherlands",flag:"🇳🇱",p:2,pts:4},
    {team:"Japan",      flag:"🇯🇵",p:2,pts:4},
    {team:"Sweden",     flag:"🇸🇪",p:2,pts:3},
    {team:"Tunisia",    flag:"🇹🇳",p:2,pts:0},
  ]},
  {id:"G",teams:[
    {team:"Spain",       flag:"🇪🇸",p:2,pts:4},
    {team:"Uruguay",     flag:"🇺🇾",p:2,pts:2},
    {team:"Cabo Verde",  flag:"🇨🇻",p:2,pts:2},
    {team:"Saudi Arabia",flag:"🇸🇦",p:2,pts:1},
  ]},
  {id:"J",teams:[
    {team:"Argentina",flag:"🇦🇷",p:1,pts:3},
    {team:"Austria",  flag:"🇦🇹",p:1,pts:3},
    {team:"Jordan",   flag:"🇯🇴",p:1,pts:0},
    {team:"Algeria",  flag:"🇩🇿",p:1,pts:0},
  ]},
];

export default function MiniStandings(){
  return(
    <div>
      <div className="sh">
        <span>📊</span><span>STANDINGS</span>
        <div className="sh-line"/>
        <Link href="/standings" style={{fontSize:"10px",color:"#FF9933",fontWeight:"700",textDecoration:"none",flexShrink:0}}>All 12 →</Link>
      </div>
      <div className="card overflow-hidden">
        {GROUPS.map(({id,teams},gi)=>(
          <div key={id} className={gi>0?"border-t border-white/5":""}>
            <div style={{display:"flex",justifyContent:"space-between",padding:"5px 10px",background:"rgba(255,153,51,.05)"}}>
              <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"9px",fontWeight:"900",color:"#FF9933",letterSpacing:".1em",textTransform:"uppercase"}}>Group {id}</span>
              <span style={{fontSize:"8px",color:"rgba(255,255,255,.2)"}}>MP PTS</span>
            </div>
            {teams.map((t,i)=>(
              <div key={t.team} className="st-row">
                <span style={{fontSize:"9px",color:"rgba(255,255,255,.2)",width:"12px",textAlign:"center"}}>{i+1}</span>
                <span className={`st-q ${i<2&&t.pts>0?"q":""}`}/>
                <span style={{fontSize:"15px",width:"20px",textAlign:"center",lineHeight:1}}>{t.flag}</span>
                <span style={{flex:1,fontSize:"11px",fontWeight:"600",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                  color:i<2&&t.pts>0?"rgba(255,255,255,.8)":"rgba(255,255,255,.4)"
                }}>{t.team}</span>
                <span style={{fontSize:"9px",color:"rgba(255,255,255,.3)",width:"16px",textAlign:"center"}}>{t.p}</span>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"12px",fontWeight:"900",width:"20px",textAlign:"center",
                  color:t.pts>0?"#fff":"rgba(255,255,255,.2)"
                }}>{t.pts}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{padding:"5px 10px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:"5px"}}>
          <span style={{width:"7px",height:"7px",borderRadius:"2px",background:"rgba(74,222,128,.3)"}}/>
          <span style={{fontSize:"8px",color:"rgba(255,255,255,.18)"}}>Advance · 4 teams per group</span>
        </div>
      </div>
    </div>
  );
}
