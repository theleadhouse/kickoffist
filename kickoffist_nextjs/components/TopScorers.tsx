// VERIFIED July 7 2026 — FIFA.com + ESPN + Yahoo + CBS
const S=[
  {n:"Haaland",    t:"Norway",      f:"🇳🇴",g:9,note:"R16 brace vs Brazil"},
  {n:"Mbappe",     t:"France",      f:"🇫🇷",g:7,note:"Pen vs Paraguay"},
  {n:"Kane",       t:"England",     f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:6,note:"Brace vs Mexico"},
  {n:"Messi",      t:"Argentina",   f:"🇦🇷",g:5,note:"vs Cabo Verde"},
  {n:"De Ketelaere",t:"Belgium",    f:"🇧🇪",g:3,note:"Brace vs USA"},
  {n:"En-Nesyri",  t:"Morocco",     f:"🇲🇦",g:3,note:"vs Canada R16"},
  {n:"Bellingham", t:"England",     f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:2,note:"vs Mexico R16"},
  {n:"Merino",     t:"Spain",       f:"🇪🇸",g:2,note:"90+1' winner vs POR"},
  {n:"Vinicius",   t:"Brazil",      f:"🇧🇷",g:3,note:"Eliminated R16"},
  {n:"Sarr",       t:"Senegal",     f:"🇸🇳",g:3,note:"Eliminated R32"},
];
export default function TopScorers(){
  return(
    <div>
      <div className="sh">⚽ GOLDEN BOOT<div className="sh-line"/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.25)"}}>JUL 7</span></div>
      <div className="card" style={{overflow:"hidden"}}>
        {S.map((s,i)=>(
          <div key={s.n+i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 14px",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:i===0?"#FF9933":"rgba(255,255,255,.2)",width:"14px",textAlign:"center"}}>{i+1}</span>
            <span style={{fontSize:"15px",width:"20px",textAlign:"center"}}>{s.f}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:i<3?800:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.5)"}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:600,color:"rgba(255,255,255,.25)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.note}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"2px",flexShrink:0}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"1px",color:i===0?"#FF9933":i<3?"#fff":"rgba(255,255,255,.4)"}}>{s.g}</span>
              <span style={{fontSize:"10px"}}>⚽</span>
            </div>
          </div>
        ))}
        <div style={{padding:"6px 14px",borderTop:"1px solid rgba(255,255,255,.05)",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.18)",textAlign:"center"}}>🐐 MESSI 19 CAREER WC GOALS · ALL-TIME RECORD</div>
      </div>
    </div>
  );
}
