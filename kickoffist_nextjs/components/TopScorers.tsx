// Verified June 26 2026 — ESPN + Yahoo + CBS + Sky Sports
const S=[
  {n:"Messi",   t:"Argentina",   f:"🇦🇷",g:5},
  {n:"Haaland", t:"Norway",      f:"🇳🇴",g:6},
  {n:"Mbappe",  t:"France",      f:"🇫🇷",g:4},
  {n:"Sarr",    t:"Senegal",     f:"🇸🇳",g:3},
  {n:"Brobbey", t:"Netherlands", f:"🇳🇱",g:3},
  {n:"Vinicius",t:"Brazil",      f:"🇧🇷",g:3},
  {n:"J. David",t:"Canada",      f:"🇨🇦",g:3},
  {n:"Ronaldo", t:"Portugal",    f:"🇵🇹",g:2},
  {n:"Kane",    t:"England",     f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:2},
  {n:"Havertz", t:"Germany",     f:"🇩🇪",g:2},
];
export default function TopScorers(){
  return(
    <div>
      <div className="sh"><span className="sh-saff">⚽ GOLDEN BOOT</span><div className="sh-line"/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.2)",flexShrink:0,letterSpacing:".06em"}}>JUN 26</span></div>
      <div className="card" style={{overflow:"hidden"}}>
        {S.map((s,i)=>(
          <div key={s.n+i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 14px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:i===0?"#FF9933":"rgba(255,255,255,.2)",width:"14px",textAlign:"center"}}>{i+1}</span>
            <span style={{fontSize:"17px",width:"20px",textAlign:"center"}}>{s.f}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".02em",
                color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.5)"
              }}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",color:"rgba(255,255,255,.3)",fontWeight:600}}>{s.t}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"3px",flexShrink:0}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",letterSpacing:"1px",color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.4)"}}>{s.g}</span>
              <span style={{fontSize:"11px"}}>⚽</span>
            </div>
          </div>
        ))}
        <div style={{padding:"6px 14px",borderTop:"1px solid rgba(255,255,255,.05)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.18)",textAlign:"center",letterSpacing:".06em"}}>
          🐐 MESSI 18 CAREER WC GOALS · ALL-TIME RECORD
        </div>
      </div>
    </div>
  );
}
