export const revalidate = 300;
const GROUPS = [
  {id:"A",teams:[{n:"Mexico",f:"🇲🇽",p:2,w:2,d:0,l:0,gf:3,ga:0,pts:6},{n:"South Korea",f:"🇰🇷",p:2,w:1,d:0,l:1,gf:2,ga:2,pts:3},{n:"Czechia",f:"🇨🇿",p:2,w:0,d:1,l:1,gf:2,ga:3,pts:1},{n:"South Africa",f:"🇿🇦",p:2,w:0,d:1,l:1,gf:1,ga:3,pts:1}]},
  {id:"B",teams:[{n:"Canada",f:"🇨🇦",p:2,w:1,d:1,l:0,gf:7,ga:1,pts:4},{n:"Switzerland",f:"🇨🇭",p:2,w:1,d:1,l:0,gf:5,ga:2,pts:4},{n:"Bosnia",f:"🇧🇦",p:2,w:0,d:1,l:1,gf:2,ga:5,pts:1},{n:"Qatar",f:"🇶🇦",p:2,w:0,d:0,l:2,gf:1,ga:7,pts:0}]},
  {id:"C",teams:[{n:"Brazil",f:"🇧🇷",p:2,w:1,d:1,l:0,gf:4,ga:1,pts:4},{n:"Morocco",f:"🇲🇦",p:2,w:1,d:1,l:0,gf:2,ga:1,pts:4},{n:"Scotland",f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",p:2,w:1,d:0,l:1,gf:1,ga:1,pts:3},{n:"Haiti",f:"🇭🇹",p:2,w:0,d:0,l:2,gf:0,ga:4,pts:0}]},
  {id:"D",teams:[{n:"USA",f:"🇺🇸",p:2,w:2,d:0,l:0,gf:6,ga:1,pts:6},{n:"Paraguay",f:"🇵🇾",p:2,w:1,d:0,l:1,gf:2,ga:5,pts:3},{n:"Australia",f:"🇦🇺",p:2,w:1,d:0,l:1,gf:2,ga:2,pts:3},{n:"Turkey",f:"🇹🇷",p:2,w:0,d:0,l:2,gf:0,ga:2,pts:0}]},
  {id:"E",teams:[{n:"Germany",f:"🇩🇪",p:2,w:2,d:0,l:0,gf:9,ga:2,pts:6},{n:"Ivory Coast",f:"🇨🇮",p:2,w:1,d:0,l:1,gf:2,ga:8,pts:3},{n:"Ecuador",f:"🇪🇨",p:2,w:0,d:1,l:1,gf:0,ga:1,pts:1},{n:"Curaçao",f:"🇨🇼",p:2,w:0,d:1,l:1,gf:1,ga:1,pts:1}]},
  {id:"F",teams:[{n:"Netherlands",f:"🇳🇱",p:2,w:1,d:1,l:0,gf:7,ga:3,pts:4},{n:"Japan",f:"🇯🇵",p:2,w:1,d:1,l:0,gf:6,ga:2,pts:4},{n:"Sweden",f:"🇸🇪",p:2,w:1,d:0,l:1,gf:6,ga:6,pts:3},{n:"Tunisia",f:"🇹🇳",p:2,w:0,d:0,l:2,gf:1,ga:9,pts:0}]},
  {id:"G",teams:[{n:"Spain",f:"🇪🇸",p:2,w:1,d:1,l:0,gf:4,ga:0,pts:4},{n:"Uruguay",f:"🇺🇾",p:2,w:0,d:2,l:0,gf:3,ga:3,pts:2},{n:"Cabo Verde",f:"🇨🇻",p:2,w:0,d:2,l:0,gf:2,ga:2,pts:2},{n:"Saudi Arabia",f:"🇸🇦",p:2,w:0,d:1,l:1,gf:1,ga:5,pts:1}]},
  {id:"H",teams:[{n:"Egypt",f:"🇪🇬",p:2,w:1,d:1,l:0,gf:4,ga:3,pts:4},{n:"Belgium",f:"🇧🇪",p:2,w:0,d:2,l:0,gf:1,ga:1,pts:2},{n:"Iran",f:"🇮🇷",p:2,w:0,d:2,l:0,gf:2,ga:2,pts:2},{n:"New Zealand",f:"🇳🇿",p:2,w:0,d:1,l:1,gf:3,ga:4,pts:1}]},
  {id:"I",teams:[{n:"Norway",f:"🇳🇴",p:2,w:2,d:0,l:0,gf:7,ga:3,pts:6},{n:"France",f:"🇫🇷",p:2,w:2,d:0,l:0,gf:6,ga:1,pts:6},{n:"Senegal",f:"🇸🇳",p:2,w:0,d:0,l:2,gf:3,ga:6,pts:0},{n:"Iraq",f:"🇮🇶",p:2,w:0,d:0,l:2,gf:1,ga:7,pts:0}]},
  {id:"J",teams:[{n:"Argentina",f:"🇦🇷",p:2,w:2,d:0,l:0,gf:5,ga:0,pts:6},{n:"Austria",f:"🇦🇹",p:2,w:1,d:0,l:1,gf:3,ga:3,pts:3},{n:"Algeria",f:"🇩🇿",p:2,w:1,d:0,l:1,gf:2,ga:3,pts:3},{n:"Jordan",f:"🇯🇴",p:2,w:0,d:0,l:2,gf:2,ga:6,pts:0}]},
  {id:"K",teams:[{n:"Colombia",f:"🇨🇴",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},{n:"Portugal",f:"🇵🇹",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},{n:"DR Congo",f:"🇨🇩",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},{n:"Uzbekistan",f:"🇺🇿",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0}]},
  {id:"L",teams:[{n:"England",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:1,w:1,d:0,l:0,gf:4,ga:2,pts:3},{n:"Ghana",f:"🇬🇭",p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3},{n:"Croatia",f:"🇭🇷",p:1,w:0,d:0,l:1,gf:2,ga:4,pts:0},{n:"Panama",f:"🇵🇦",p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0}]},
];
const TOP = [
  {n:"Lionel Messi",t:"Argentina",f:"🇦🇷",g:5},{n:"Erling Haaland",t:"Norway",f:"🇳🇴",g:4},
  {n:"Kylian Mbappe",t:"France",f:"🇫🇷",g:4},{n:"Jonathan David",t:"Canada",f:"🇨🇦",g:3},
  {n:"Kai Havertz",t:"Germany",f:"🇩🇪",g:2},{n:"Deniz Undav",t:"Germany",f:"🇩🇪",g:2},
  {n:"Brian Brobbey",t:"Netherlands",f:"🇳🇱",g:2},{n:"Ayase Ueda",t:"Japan",f:"🇯🇵",g:2},
  {n:"Harry Kane",t:"England",f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",g:2},{n:"Folarin Balogun",t:"USA",f:"🇺🇸",g:2},
];
export default function StandingsPage() {
  return (
    <div style={{maxWidth:"1100px",margin:"0 auto"}}>
      <div style={{marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#FF9933",letterSpacing:".14em",marginBottom:"4px"}}>FIFA WORLD CUP 2026</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,4vw,44px)",letterSpacing:"2px",color:"#fff",lineHeight:1,marginBottom:"6px"}}>GROUP STANDINGS</h1>
        <p style={{fontSize:"12px",color:"rgba(200,212,232,.35)"}}>Updated June 22 2026 · All 12 groups · 4 teams each · Verified: ESPN + Yahoo + FIFA.com</p>
      </div>

      {/* Golden Boot */}
      <div style={{background:"rgba(255,153,51,.05)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"14px",marginBottom:"24px",overflow:"hidden"}}>
        <div style={{padding:"12px 16px",borderBottom:"1px solid rgba(255,153,51,.1)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span>⚽</span>
            <span style={{fontFamily:"'Teko',sans-serif",fontSize:"15px",fontWeight:600,color:"#FF9933",letterSpacing:".08em"}}>GOLDEN BOOT RACE</span>
          </div>
          <span style={{fontSize:"10px",color:"rgba(200,212,232,.35)"}}>After MD2 · Jun 22</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))"}}>
          {TOP.map((s,i) => (
            <div key={s.n} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,.04)",borderRight:"1px solid rgba(255,255,255,.04)"}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"13px",letterSpacing:".04em",color:i===0?"#FF9933":"rgba(200,212,232,.25)",width:"16px"}}>{i+1}</span>
              <span style={{fontSize:"18px"}}>{s.f}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:500,color:i===0?"#FF9933":i<3?"#fff":"rgba(200,212,232,.6)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.n}</div>
                <div style={{fontSize:"9px",color:"rgba(200,212,232,.35)"}}>{s.t}</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:"3px",flexShrink:0}}>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:".04em",color:i===0?"#FF9933":i<3?"#fff":"rgba(200,212,232,.5)"}}>{s.g}</span>
                <span style={{fontSize:"10px"}}>⚽</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 12 Groups */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"14px"}}>
        {GROUPS.map(({id,teams}) => {
          const sorted=[...teams].sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf);
          return (
            <div key={id} style={{background:"#112040",border:"1px solid rgba(255,255,255,.07)",borderRadius:"12px",overflow:"hidden"}}>
              <div style={{padding:"10px 14px",background:"rgba(255,153,51,.06)",borderBottom:"2px solid rgba(255,153,51,.12)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"2px",color:"#FF9933"}}>GROUP {id}</span>
                <div style={{display:"flex",gap:"8px",fontFamily:"'Teko',sans-serif",fontSize:"11px",color:"rgba(200,212,232,.3)",letterSpacing:".06em"}}>
                  <span style={{width:"22px",textAlign:"center"}}>MP</span>
                  <span style={{width:"16px",textAlign:"center"}}>W</span>
                  <span style={{width:"16px",textAlign:"center"}}>D</span>
                  <span style={{width:"16px",textAlign:"center"}}>L</span>
                  <span style={{width:"22px",textAlign:"center"}}>GD</span>
                  <span style={{width:"22px",textAlign:"center",color:"rgba(255,153,51,.5)"}}>PTS</span>
                </div>
              </div>
              {sorted.map((t,i) => {
                const gd = t.gf-t.ga;
                const q = i<2&&t.p>0;
                return (
                  <div key={t.n} style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 14px",borderBottom:i<3?"1px solid rgba(255,255,255,.04)":"none",background:q?"rgba(74,222,128,.03)":"transparent"}}>
                    <span style={{fontFamily:"'Teko',sans-serif",fontSize:"11px",color:"rgba(200,212,232,.25)",width:"14px",textAlign:"center"}}>{i+1}</span>
                    <span style={{width:"4px",height:"20px",borderRadius:"2px",background:q?"#22c55e":"rgba(255,255,255,.07)",flexShrink:0}}/>
                    <span style={{fontSize:"18px",width:"22px",textAlign:"center",lineHeight:1,flexShrink:0}}>{t.f}</span>
                    <span style={{flex:1,fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                      color:q?"#4ade80":"rgba(200,212,232,.75)"
                    }}>{t.n}</span>
                    <div style={{display:"flex",gap:"8px",fontFamily:"'Teko',sans-serif",fontSize:"12px",color:"rgba(200,212,232,.4)"}}>
                      <span style={{width:"22px",textAlign:"center"}}>{t.p}</span>
                      <span style={{width:"16px",textAlign:"center"}}>{t.w}</span>
                      <span style={{width:"16px",textAlign:"center"}}>{t.d}</span>
                      <span style={{width:"16px",textAlign:"center"}}>{t.l}</span>
                      <span style={{width:"22px",textAlign:"center",color:gd>0?"#4ade80":gd<0?"rgba(239,68,68,.7)":"rgba(200,212,232,.3)"}}>{gd>0?"+":""}{gd}</span>
                      <span style={{width:"22px",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:"14px",letterSpacing:".04em",color:t.pts>0?"#FF9933":"rgba(200,212,232,.2)"}}>{t.pts}</span>
                    </div>
                  </div>
                );
              })}
              <div style={{padding:"5px 14px",display:"flex",alignItems:"center",gap:"5px",borderTop:"1px solid rgba(255,255,255,.04)"}}>
                <span style={{width:"7px",height:"7px",borderRadius:"2px",background:"rgba(74,222,128,.3)"}}/>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"10px",color:"rgba(200,212,232,.2)"}}>Top 2 advance + 8 best 3rd place</span>
              </div>
            </div>
          );
        })}
      </div>
      <p style={{fontSize:"10px",color:"rgba(200,212,232,.18)",textAlign:"center",marginTop:"20px"}}>Source: ESPN · CBS Sports · Yahoo Sports · FIFA.com · June 22 2026 IST · 4 teams per group</p>
    </div>
  );
}
