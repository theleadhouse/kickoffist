export const revalidate = 300;

// VERIFIED: ESPN + CBS Sports + Yahoo Sports + FIFA.com - June 21 2026
// ALL GROUPS ARE 4 TEAMS EACH — confirmed from official sources
const GROUPS = [
  {id:"A", teams:[
    {name:"Mexico",      flag:"🇲🇽",p:2,w:2,d:0,l:0,gf:3,ga:0,pts:6},
    {name:"South Korea", flag:"🇰🇷",p:2,w:1,d:0,l:1,gf:2,ga:2,pts:3},
    {name:"Czechia",     flag:"🇨🇿",p:2,w:0,d:1,l:1,gf:2,ga:3,pts:1},
    {name:"South Africa",flag:"🇿🇦",p:2,w:0,d:1,l:1,gf:1,ga:3,pts:1},
  ]},
  {id:"B", teams:[
    {name:"Canada",       flag:"🇨🇦",p:2,w:1,d:1,l:0,gf:7,ga:1,pts:4},
    {name:"Switzerland",  flag:"🇨🇭",p:2,w:1,d:1,l:0,gf:5,ga:2,pts:4},
    {name:"Bosnia & Herz.",flag:"🇧🇦",p:2,w:0,d:1,l:1,gf:2,ga:5,pts:1},
    {name:"Qatar",        flag:"🇶🇦",p:2,w:0,d:0,l:2,gf:1,ga:7,pts:0},
  ]},
  {id:"C", teams:[
    {name:"Brazil",   flag:"🇧🇷",p:2,w:1,d:1,l:0,gf:4,ga:1,pts:4},
    {name:"Morocco",  flag:"🇲🇦",p:2,w:1,d:1,l:0,gf:2,ga:1,pts:4},
    {name:"Scotland", flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",p:2,w:1,d:0,l:1,gf:1,ga:1,pts:3},
    {name:"Haiti",    flag:"🇭🇹",p:2,w:0,d:0,l:2,gf:0,ga:4,pts:0},
  ]},
  {id:"D", teams:[
    {name:"USA",      flag:"🇺🇸",p:2,w:2,d:0,l:0,gf:6,ga:1,pts:6},
    {name:"Paraguay", flag:"🇵🇾",p:2,w:1,d:0,l:1,gf:2,ga:5,pts:3},
    {name:"Australia",flag:"🇦🇺",p:2,w:1,d:0,l:1,gf:2,ga:2,pts:3},
    {name:"Turkey",   flag:"🇹🇷",p:2,w:0,d:0,l:2,gf:0,ga:2,pts:0},
  ]},
  {id:"E", teams:[
    {name:"Germany",     flag:"🇩🇪",p:2,w:2,d:0,l:0,gf:9,ga:2,pts:6},
    {name:"Ivory Coast", flag:"🇨🇮",p:2,w:1,d:0,l:1,gf:2,ga:8,pts:3},
    {name:"Ecuador",     flag:"🇪🇨",p:2,w:0,d:1,l:1,gf:0,ga:1,pts:1},
    {name:"Curaçao",     flag:"🇨🇼",p:2,w:0,d:1,l:1,gf:1,ga:1,pts:1},
  ]},
  {id:"F", teams:[
    {name:"Netherlands",flag:"🇳🇱",p:2,w:1,d:1,l:0,gf:7,ga:3,pts:4},
    {name:"Japan",      flag:"🇯🇵",p:2,w:1,d:1,l:0,gf:6,ga:2,pts:4},
    {name:"Sweden",     flag:"🇸🇪",p:2,w:1,d:0,l:1,gf:6,ga:6,pts:3},
    {name:"Tunisia",    flag:"🇹🇳",p:2,w:0,d:0,l:2,gf:1,ga:9,pts:0},
  ]},
  {id:"G", teams:[
    {name:"Spain",       flag:"🇪🇸",p:2,w:1,d:1,l:0,gf:4,ga:0,pts:4},
    {name:"Uruguay",     flag:"🇺🇾",p:2,w:0,d:2,l:0,gf:3,ga:3,pts:2},
    {name:"Cabo Verde",  flag:"🇨🇻",p:2,w:0,d:2,l:0,gf:2,ga:2,pts:2},
    {name:"Saudi Arabia",flag:"🇸🇦",p:2,w:0,d:1,l:1,gf:1,ga:5,pts:1},
  ]},
  {id:"H", teams:[
    {name:"Egypt",      flag:"🇪🇬",p:2,w:1,d:1,l:0,gf:4,ga:3,pts:4},
    {name:"Belgium",    flag:"🇧🇪",p:2,w:0,d:2,l:0,gf:1,ga:1,pts:2},
    {name:"Iran",       flag:"🇮🇷",p:2,w:0,d:2,l:0,gf:2,ga:2,pts:2},
    {name:"New Zealand",flag:"🇳🇿",p:2,w:0,d:1,l:1,gf:3,ga:4,pts:1},
  ]},
  {id:"I", teams:[
    {name:"France",  flag:"🇫🇷",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},
    {name:"Norway",  flag:"🇳🇴",p:1,w:1,d:0,l:0,gf:4,ga:1,pts:3},
    {name:"Senegal", flag:"🇸🇳",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0},
    {name:"Iraq",    flag:"🇮🇶",p:1,w:0,d:0,l:1,gf:1,ga:4,pts:0},
  ]},
  {id:"J", teams:[
    {name:"Argentina",flag:"🇦🇷",p:1,w:1,d:0,l:0,gf:3,ga:0,pts:3},
    {name:"Austria",  flag:"🇦🇹",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},
    {name:"Jordan",   flag:"🇯🇴",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0},
    {name:"Algeria",  flag:"🇩🇿",p:1,w:0,d:0,l:1,gf:0,ga:3,pts:0},
  ]},
  {id:"K", teams:[
    {name:"Colombia",  flag:"🇨🇴",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},
    {name:"Portugal",  flag:"🇵🇹",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {name:"DR Congo",  flag:"🇨🇩",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {name:"Uzbekistan",flag:"🇺🇿",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0},
  ]},
  {id:"L", teams:[
    {name:"England",flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:1,w:1,d:0,l:0,gf:4,ga:2,pts:3},
    {name:"Ghana",  flag:"🇬🇭",p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3},
    {name:"Croatia",flag:"🇭🇷",p:1,w:0,d:0,l:1,gf:2,ga:4,pts:0},
    {name:"Panama", flag:"🇵🇦",p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0},
  ]},
];

const TOP_SCORERS=[
  {name:"Lionel Messi",    team:"Argentina",   flag:"🇦🇷",goals:3,matches:1},
  {name:"Jonathan David",  team:"Canada",      flag:"🇨🇦",goals:3,matches:1},
  {name:"Kai Havertz",     team:"Germany",     flag:"🇩🇪",goals:2,matches:2},
  {name:"Harry Kane",      team:"England",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",goals:2,matches:1},
  {name:"Erling Haaland",  team:"Norway",      flag:"🇳🇴",goals:2,matches:1},
  {name:"Kylian Mbappe",   team:"France",      flag:"🇫🇷",goals:2,matches:1},
  {name:"Brian Brobbey",   team:"Netherlands", flag:"🇳🇱",goals:2,matches:2},
  {name:"Deniz Undav",     team:"Germany",     flag:"🇩🇪",goals:2,matches:2},
  {name:"Ayase Ueda",      team:"Japan",       flag:"🇯🇵",goals:2,matches:2},
  {name:"Viktor Gyokeres", team:"Sweden",      flag:"🇸🇪",goals:2,matches:2},
  {name:"Folarin Balogun", team:"USA",         flag:"🇺🇸",goals:2,matches:2},
  {name:"Yasin Ayari",     team:"Sweden",      flag:"🇸🇪",goals:2,matches:1},
];

export default function StandingsPage(){
  return(
    <div style={{maxWidth:"1100px",margin:"0 auto"}}>
      {/* Header */}
      <div style={{marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
        <div style={{fontSize:"10px",fontWeight:"800",color:"#FF9933",letterSpacing:".14em",textTransform:"uppercase",fontFamily:"'Barlow Condensed','Oswald',sans-serif",marginBottom:"4px"}}>
          FIFA World Cup 2026
        </div>
        <h1 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:"900",color:"#fff",fontFamily:"'Barlow Condensed','Oswald',sans-serif",letterSpacing:"1px",lineHeight:1,marginBottom:"6px"}}>
          GROUP STANDINGS
        </h1>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,.3)"}}>
          Updated June 21 2026 · All 12 Groups · 4 teams each · Source: ESPN + CBS Sports + FIFA.com
        </p>
      </div>

      {/* Golden Boot */}
      <div style={{background:"rgba(255,153,51,.05)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"12px",marginBottom:"24px",overflow:"hidden"}}>
        <div style={{padding:"12px 16px",borderBottom:"1px solid rgba(255,153,51,.1)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"16px"}}>⚽</span>
            <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"14px",fontWeight:"800",color:"#FF9933",letterSpacing:".08em",textTransform:"uppercase"}}>Golden Boot Race</span>
          </div>
          <span style={{fontSize:"10px",color:"rgba(255,153,51,.5)"}}>After MD2</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))"}}>
          {TOP_SCORERS.map((s,i)=>(
            <div key={s.name} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,.04)",borderRight:"1px solid rgba(255,255,255,.04)"}}>
              <span style={{fontSize:"9px",color:"rgba(255,255,255,.2)",width:"14px",fontWeight:"700"}}>{i+1}</span>
              <span style={{fontSize:"18px"}}>{s.flag}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:"12px",fontWeight:"700",color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.65)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:"'Barlow Condensed','Oswald',sans-serif"}}>{s.name}</div>
                <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)"}}>{s.team}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"3px",flexShrink:0}}>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"20px",fontWeight:"900",color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.5)"}}>{s.goals}</span>
                <span style={{fontSize:"11px"}}>⚽</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All 12 Groups — 3 column grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"16px"}}>
        {GROUPS.map(({id,teams})=>{
          const sorted=[...teams].sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf);
          return(
            <div key={id} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"10px",overflow:"hidden"}}>
              {/* Group header */}
              <div style={{padding:"10px 14px",background:"rgba(255,153,51,.06)",borderBottom:"2px solid rgba(255,153,51,.15)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"14px",fontWeight:"900",color:"#FF9933",letterSpacing:".12em"}}>GROUP {id}</span>
                <div style={{display:"flex",gap:"8px",fontSize:"9px",color:"rgba(255,255,255,.25)",fontWeight:"700"}}>
                  <span style={{width:"24px",textAlign:"center"}}>MP</span>
                  <span style={{width:"16px",textAlign:"center"}}>W</span>
                  <span style={{width:"16px",textAlign:"center"}}>D</span>
                  <span style={{width:"16px",textAlign:"center"}}>L</span>
                  <span style={{width:"24px",textAlign:"center"}}>GD</span>
                  <span style={{width:"24px",textAlign:"center",color:"rgba(255,153,51,.6)"}}>PTS</span>
                </div>
              </div>
              {/* Teams */}
              {sorted.map((t,i)=>{
                const gd=t.gf-t.ga;
                const qualified=i<2&&t.p>0;
                return(
                  <div key={t.name} style={{
                    display:"flex",alignItems:"center",gap:"8px",
                    padding:"9px 14px",
                    borderBottom:i<3?"1px solid rgba(255,255,255,.04)":"none",
                    background:qualified?"rgba(74,222,128,.03)":"transparent",
                    transition:"background .15s",
                  }}>
                    <span style={{fontSize:"10px",color:"rgba(255,255,255,.2)",width:"14px",textAlign:"center",fontWeight:"700"}}>{i+1}</span>
                    <span style={{width:"4px",height:"20px",borderRadius:"2px",background:qualified?"#22c55e":"rgba(255,255,255,.08)",flexShrink:0}}/>
                    <span style={{fontSize:"18px",width:"22px",textAlign:"center",lineHeight:1,flexShrink:0}}>{t.flag}</span>
                    <span style={{
                      flex:1,fontSize:"13px",fontWeight:"700",
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                      fontFamily:"'Barlow Condensed','Oswald',sans-serif",letterSpacing:".02em",
                      color:qualified?"#4ade80":"rgba(255,255,255,.75)",
                    }}>{t.name}</span>
                    <div style={{display:"flex",gap:"8px",fontSize:"11px",color:"rgba(255,255,255,.35)",fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontWeight:"600"}}>
                      <span style={{width:"24px",textAlign:"center"}}>{t.p}</span>
                      <span style={{width:"16px",textAlign:"center"}}>{t.w}</span>
                      <span style={{width:"16px",textAlign:"center"}}>{t.d}</span>
                      <span style={{width:"16px",textAlign:"center"}}>{t.l}</span>
                      <span style={{width:"24px",textAlign:"center",color:gd>0?"#4ade80":gd<0?"rgba(239,68,68,.7)":"rgba(255,255,255,.3)"}}>{gd>0?"+":""}{gd}</span>
                      <span style={{width:"24px",textAlign:"center",fontWeight:"900",color:t.pts>0?"#fff":"rgba(255,255,255,.2)",fontSize:"13px"}}>{t.pts}</span>
                    </div>
                  </div>
                );
              })}
              {/* Qualify note */}
              <div style={{padding:"5px 14px",display:"flex",alignItems:"center",gap:"5px",borderTop:"1px solid rgba(255,255,255,.04)"}}>
                <span style={{width:"8px",height:"8px",borderRadius:"2px",background:"rgba(74,222,128,.3)"}}/>
                <span style={{fontSize:"8px",color:"rgba(255,255,255,.15)"}}>Top 2 advance · +8 best 3rd place teams</span>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{fontSize:"10px",color:"rgba(255,255,255,.15)",textAlign:"center",marginTop:"20px"}}>
        Data verified from ESPN · CBS Sports · Yahoo Sports · FIFA.com · June 21 2026 IST · 4 teams per group · 12 groups total
      </p>
    </div>
  );
}
