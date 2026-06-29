const S=[
  {n:"Haaland", t:"Norway",      f:"🇳🇴",g:6},
  {n:"Messi",   t:"Argentina",   f:"🇦🇷",g:5},
  {n:"Mbappe",  t:"France",      f:"🇫🇷",g:4},
  {n:"Sarr",    t:"Senegal",     f:"🇸🇳",g:3},
  {n:"Brobbey", t:"Netherlands", f:"🇳🇱",g:3},
  {n:"Vinicius",t:"Brazil",      f:"🇧🇷",g:3},
  {n:"J. David",t:"Canada",      f:"🇨🇦",g:3},
  {n:"Kane",    t:"England",     f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:2},
  {n:"Ronaldo", t:"Portugal",    f:"🇵🇹",g:2},
  {n:"Havertz", t:"Germany",     f:"🇩🇪",g:2},
];
export default function TopScorers(){
  return(
    <div>
      <div className="sh sh-green">⚽ GOLDEN BOOT<div className="sh-line"/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#AAA",letterSpacing:".06em"}}>JUN 28</span></div>
      <div style={{background:"#fff",border:"1px solid #E5DDD5",borderRadius:"8px",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
        {S.map((s,i)=>(
          <div key={s.n+i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 14px",borderBottom:"1px solid #F5F2EE"}}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:i===0?"#FF9933":"#CCC",width:"14px",textAlign:"center"}}>{i+1}</span>
            <span style={{fontSize:"16px",width:"20px",textAlign:"center"}}>{s.f}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:i<3?800:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:i===0?"#FF9933":i<3?"#0A0A0A":"#888"}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"#AAA"}}>{s.t}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"2px",flexShrink:0}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"1px",color:i===0?"#FF9933":i<3?"#0A0A0A":"#AAA"}}>{s.g}</span>
              <span style={{fontSize:"11px"}}>⚽</span>
            </div>
          </div>
        ))}
        <div style={{padding:"6px 14px",borderTop:"1px solid #F0EDE8",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#AAA",textAlign:"center",letterSpacing:".06em"}}>
          🐐 MESSI 18 CAREER WC GOALS · ALL-TIME RECORD
        </div>
      </div>
    </div>
  );
}
