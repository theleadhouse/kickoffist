const S = [
  {n:"Messi",   t:"Argentina",   f:"🇦🇷",g:5},
  {n:"Haaland", t:"Norway",      f:"🇳🇴",g:4},
  {n:"Mbappe",  t:"France",      f:"🇫🇷",g:4},
  {n:"J. David",t:"Canada",      f:"🇨🇦",g:3},
  {n:"Havertz", t:"Germany",     f:"🇩🇪",g:2},
  {n:"Undav",   t:"Germany",     f:"🇩🇪",g:2},
  {n:"Brobbey", t:"Netherlands", f:"🇳🇱",g:2},
  {n:"Ueda",    t:"Japan",       f:"🇯🇵",g:2},
  {n:"Kane",    t:"England",     f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:2},
  {n:"Balogun", t:"USA",         f:"🇺🇸",g:2},
];
export default function TopScorers() {
  return (
    <div>
      <div className="sh">
        <span>⚽</span><span>GOLDEN BOOT</span>
        <div className="sh-line"/>
        <span style={{fontSize:"8px",color:"rgba(200,212,232,.25)",flexShrink:0}}>Jun 22</span>
      </div>
      <div className="card" style={{overflow:"hidden"}}>
        {S.map((s,i) => (
          <div key={s.n+i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"13px",letterSpacing:".04em",color:i===0?"#FF9933":"rgba(200,212,232,.2)",width:"16px",textAlign:"center"}}>{i+1}</span>
            <span style={{fontSize:"17px",width:"20px",textAlign:"center"}}>{s.f}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                color:i===0?"#FF9933":i<3?"#fff":"rgba(200,212,232,.6)"
              }}>{s.n}</div>
              <div style={{fontSize:"9px",color:"rgba(200,212,232,.35)"}}>{s.t}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"3px",flexShrink:0}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",letterSpacing:".04em",
                color:i===0?"#FF9933":i<3?"#fff":"rgba(200,212,232,.4)"
              }}>{s.g}</span>
              <span style={{fontSize:"10px",color:"rgba(200,212,232,.3)"}}>⚽</span>
            </div>
          </div>
        ))}
        <div style={{padding:"6px 12px",borderTop:"1px solid rgba(255,255,255,.05)",fontSize:"8px",color:"rgba(200,212,232,.18)",textAlign:"center"}}>
          🐐 Messi · 18 career WC goals · all-time record
        </div>
      </div>
    </div>
  );
}
