import Link from "next/link";
// Updated after MD2 June 21 IST — ESPN/CBS/Yahoo verified
const GROUPS:{[k:string]:{team:string;flag:string;p:number;pts:number;qualify?:boolean}[]}={
  A:[
    {team:"Mexico",      flag:"🇲🇽",p:2,pts:6,qualify:true},
    {team:"South Korea", flag:"🇰🇷",p:2,pts:3},
    {team:"Ghana",       flag:"🇬🇭",p:1,pts:3},
    {team:"Czechia",     flag:"🇨🇿",p:2,pts:1},
  ],
  D:[
    {team:"USA",         flag:"🇺🇸",p:2,pts:6,qualify:true},
    {team:"Paraguay",    flag:"🇵🇾",p:2,pts:3},
    {team:"Australia",   flag:"🇦🇺",p:2,pts:3},
    {team:"Turkey",      flag:"🇹🇷",p:2,pts:0},
  ],
  E:[
    {team:"Morocco",     flag:"🇲🇦",p:2,pts:4},
    {team:"Brazil",      flag:"🇧🇷",p:2,pts:4},
    {team:"Scotland",    flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",p:2,pts:3},
    {team:"Haiti",       flag:"🇭🇹",p:2,pts:0},
  ],
  G:[
    {team:"Netherlands", flag:"🇳🇱",p:2,pts:4},
    {team:"Japan",       flag:"🇯🇵",p:2,pts:4},
    {team:"Sweden",      flag:"🇸🇪",p:2,pts:3},
    {team:"Tunisia",     flag:"🇹🇳",p:2,pts:0},
  ],
  J:[
    {team:"Argentina",   flag:"🇦🇷",p:1,pts:3},
    {team:"Austria",     flag:"🇦🇹",p:1,pts:3},
    {team:"Jordan",      flag:"🇯🇴",p:1,pts:0},
    {team:"Algeria",     flag:"🇩🇿",p:1,pts:0},
  ],
  L:[
    {team:"England",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:1,pts:3},
    {team:"Ghana",       flag:"🇬🇭",p:1,pts:3},
    {team:"Croatia",     flag:"🇭🇷",p:1,pts:0},
    {team:"Panama",      flag:"🇵🇦",p:1,pts:0},
  ],
};

export default function MiniStandings(){
  return(
    <div>
      <div className="sh">
        <span>📊</span><span>STANDINGS</span>
        <div className="sh-line"/>
        <Link href="/standings" style={{fontSize:"10px",color:"#FF9933",fontWeight:"700",textDecoration:"none",flexShrink:0}}>All 12 →</Link>
      </div>
      <div className="card overflow-hidden">
        {Object.entries(GROUPS).map(([g,teams],gi)=>(
          <div key={g} className={gi>0?"border-t border-white/5":""}>
            <div style={{display:"flex",justifyContent:"space-between",padding:"6px 10px 4px",background:"rgba(255,153,51,.05)"}}>
              <span style={{fontSize:"9px",fontWeight:"900",color:"#FF9933",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Barlow Condensed','Oswald',sans-serif"}}>Group {g}</span>
              <span style={{fontSize:"8px",color:"rgba(255,255,255,.2)"}}>MP PTS</span>
            </div>
            {teams.map((t,i)=>(
              <div key={t.team} className="st-row">
                <span style={{fontSize:"9px",color:"rgba(255,255,255,.2)",width:"12px",textAlign:"center"}}>{i+1}</span>
                <span className={`st-q ${i<2&&t.pts>0?"q":""}`}/>
                <span style={{fontSize:"16px",width:"20px",textAlign:"center",lineHeight:1}}>{t.flag}</span>
                <span style={{flex:1,fontSize:"11px",fontWeight:"600",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:t.qualify?"#4ade80":i<2&&t.pts>0?"rgba(255,255,255,.7)":"rgba(255,255,255,.4)"}}>{t.team}</span>
                <span style={{fontSize:"9px",color:"rgba(255,255,255,.25)",width:"16px",textAlign:"center"}}>{t.p}</span>
                <span style={{fontSize:"11px",fontWeight:"900",width:"20px",textAlign:"center",color:t.pts>0?"#fff":"rgba(255,255,255,.2)"}}>{t.pts}</span>
              </div>
            ))}
          </div>
        ))}
        <div style={{padding:"6px 10px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:"6px"}}>
          <span style={{width:"8px",height:"8px",borderRadius:"2px",background:"rgba(74,222,128,.3)"}}/>
          <span style={{fontSize:"9px",color:"rgba(255,255,255,.2)"}}>Qualify for Round of 32</span>
        </div>
      </div>
    </div>
  );
}
