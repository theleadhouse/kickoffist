import Link from "next/link";
const SCORERS=[
  {name:"Messi",       team:"Argentina",   flag:"🇦🇷",goals:3},
  {name:"J. David",    team:"Canada",      flag:"🇨🇦",goals:3},
  {name:"Ueda",        team:"Japan",       flag:"🇯🇵",goals:2},
  {name:"Kane",        team:"England",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",goals:2},
  {name:"Haaland",     team:"Norway",      flag:"🇳🇴",goals:2},
  {name:"Mbappe",      team:"France",      flag:"🇫🇷",goals:2},
  {name:"Havertz",     team:"Germany",     flag:"🇩🇪",goals:2},
  {name:"Brobbey",     team:"Netherlands", flag:"🇳🇱",goals:2},
  {name:"Undav",       team:"Germany",     flag:"🇩🇪",goals:2},
  {name:"Balogun",     team:"USA",         flag:"🇺🇸",goals:2},
];
export default function TopScorers(){
  return(
    <div>
      <div className="sh">
        <span>⚽</span><span>GOLDEN BOOT</span>
        <div className="sh-line"/>
        <span style={{fontSize:"8px",color:"rgba(255,255,255,.2)",flexShrink:0}}>After MD2</span>
      </div>
      <div className="card overflow-hidden">
        {SCORERS.map((s,i)=>(
          <div key={s.name} style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <span style={{fontSize:"8px",color:"rgba(255,255,255,.2)",width:"12px",textAlign:"center",fontWeight:"700"}}>{i+1}</span>
            <span style={{fontSize:"16px",width:"20px",textAlign:"center"}}>{s.flag}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:"11px",fontWeight:"700",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.6)"}}>{s.name}</div>
              <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)"}}>{s.team}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"3px",flexShrink:0}}>
              <span style={{fontSize:"18px",fontWeight:"900",color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.5)",fontFamily:"'Barlow Condensed','Oswald',sans-serif"}}>{s.goals}</span>
              <span style={{fontSize:"9px",color:"rgba(255,255,255,.3)"}}>⚽</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
