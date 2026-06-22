import Link from "next/link";
const S=[
  {n:"Messi",    t:"Argentina",   f:"🇦🇷",g:5},
  {n:"J. David", t:"Canada",      f:"🇨🇦",g:3},
  {n:"Havertz",  t:"Germany",     f:"🇩🇪",g:2},
  {n:"Undav",    t:"Germany",     f:"🇩🇪",g:2},
  {n:"Brobbey",  t:"Netherlands", f:"🇳🇱",g:2},
  {n:"Ueda",     t:"Japan",       f:"🇯🇵",g:2},
  {n:"Kane",     t:"England",     f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:2},
  {n:"Haaland",  t:"Norway",      f:"🇳🇴",g:2},
  {n:"Mbappe",   t:"France",      f:"🇫🇷",g:2},
  {n:"Balogun",  t:"USA",         f:"🇺🇸",g:2},
];
export default function TopScorers(){
  return(
    <div>
      <div className="sh">
        <span>⚽</span><span>GOLDEN BOOT</span>
        <div className="sh-line"/>
        <span style={{fontSize:"8px",color:"rgba(255,255,255,.2)",flexShrink:0}}>Jun 22</span>
      </div>
      <div className="card" style={{overflow:"hidden"}}>
        {S.map((s,i)=>(
          <div key={s.n+i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"10px",color:i===0?"#FF9933":"rgba(255,255,255,.2)",width:"14px",textAlign:"center",fontWeight:900}}>{i+1}</span>
            <span style={{fontSize:"17px",width:"20px",textAlign:"center"}}>{s.f}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.6)"
              }}>{s.n}</div>
              <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)"}}>{s.t}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"3px",flexShrink:0}}>
              <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"20px",fontWeight:900,
                color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.45)"
              }}>{s.g}</span>
              <span style={{fontSize:"10px",color:"rgba(255,255,255,.3)"}}>⚽</span>
            </div>
          </div>
        ))}
        <div style={{padding:"6px 10px",borderTop:"1px solid rgba(255,255,255,.05)",fontSize:"8px",color:"rgba(255,255,255,.15)",textAlign:"center"}}>
          🥇 Messi now WC all-time top scorer — 18 career goals
        </div>
      </div>
    </div>
  );
}
