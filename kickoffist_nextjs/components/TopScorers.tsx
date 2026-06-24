// Verified June 23 2026 — ESPN + Yahoo + FIFA.com
const S = [
  {n:"Messi",    t:"Argentina", f:"🇦🇷", g:5},
  {n:"Haaland",  t:"Norway",    f:"🇳🇴", g:4},
  {n:"Mbappe",   t:"France",    f:"🇫🇷", g:4},
  {n:"J. David", t:"Canada",    f:"🇨🇦", g:3},
  {n:"Ronaldo",  t:"Portugal",  f:"🇵🇹", g:2},
  {n:"Havertz",  t:"Germany",   f:"🇩🇪", g:2},
  {n:"Undav",    t:"Germany",   f:"🇩🇪", g:2},
  {n:"Brobbey",  t:"Netherlands",f:"🇳🇱",g:2},
  {n:"Ueda",     t:"Japan",     f:"🇯🇵", g:2},
  {n:"Kane",     t:"England",   f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", g:2},
];
export default function TopScorers() {
  return (
    <div>
      <div className="sh">
        <span>⚽</span><span>GOLDEN BOOT</span>
        <div className="sh-line"/>
        <span style={{ fontSize:"8px", color:"#7a9a7a", flexShrink:0 }}>Jun 23</span>
      </div>
      <div className="card" style={{ overflow:"hidden" }}>
        {S.map((s,i) => (
          <div key={s.n+i} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 12px", borderBottom:"1px solid rgba(26,107,26,.06)" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"12px", letterSpacing:".04em", color: i===0?"#FF9933":"#7a9a7a", width:"14px", textAlign:"center" }}>{i+1}</span>
            <span style={{ fontSize:"17px", width:"20px", textAlign:"center" }}>{s.f}</span>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"13px", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                color: i===0 ? "#c85000" : i<3 ? "#0d1f0d" : "#3a5c3a"
              }}>{s.n}</div>
              <div style={{ fontSize:"9px", color:"#7a9a7a" }}>{s.t}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"3px", flexShrink:0 }}>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:".04em",
                color: i===0 ? "#FF9933" : i<3 ? "#1a6b1a" : "#7a9a7a"
              }}>{s.g}</span>
              <span style={{ fontSize:"10px", color:"#7a9a7a" }}>⚽</span>
            </div>
          </div>
        ))}
        <div style={{ padding:"6px 12px", borderTop:"1px solid rgba(26,107,26,.06)", fontSize:"8px", color:"#7a9a7a", textAlign:"center" }}>
          🐐 Messi 18 career WC goals · 🇵🇹 Ronaldo scores at 6 WCs
        </div>
      </div>
    </div>
  );
}
