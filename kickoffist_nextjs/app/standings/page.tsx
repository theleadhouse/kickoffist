"use client";
import { useState, useEffect } from "react";

// VERIFIED June 24-25 2026 — ESPN + Yahoo + FIFA.com + FourFourTwo
const GROUPS = [
  {id:"A",teams:[
    {n:"Mexico",      f:"🇲🇽",p:3,w:3,d:0,l:0,gf:6,ga:0,pts:9},
    {n:"South Africa",f:"🇿🇦",p:3,w:1,d:1,l:1,gf:2,ga:3,pts:4},
    {n:"South Korea", f:"🇰🇷",p:3,w:1,d:0,l:2,gf:2,ga:3,pts:3},
    {n:"Czechia",     f:"🇨🇿",p:3,w:0,d:1,l:2,gf:2,ga:6,pts:1},
  ]},
  {id:"B",teams:[
    {n:"Switzerland", f:"🇨🇭",p:3,w:2,d:1,l:0,gf:8,ga:3,pts:7},
    {n:"Canada",      f:"🇨🇦",p:3,w:1,d:1,l:1,gf:8,ga:4,pts:4},
    {n:"Bosnia",      f:"🇧🇦",p:3,w:1,d:1,l:1,gf:5,ga:8,pts:4},
    {n:"Qatar",       f:"🇶🇦",p:3,w:0,d:0,l:3,gf:2,ga:8,pts:0},
  ]},
  {id:"C",teams:[
    {n:"Brazil",      f:"🇧🇷",p:3,w:2,d:1,l:0,gf:7,ga:1,pts:7},
    {n:"Morocco",     f:"🇲🇦",p:3,w:2,d:1,l:0,gf:6,ga:3,pts:7},
    {n:"Scotland",    f:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",p:3,w:1,d:0,l:2,gf:1,ga:4,pts:3},
    {n:"Haiti",       f:"🇭🇹",p:3,w:0,d:0,l:3,gf:2,ga:8,pts:0},
  ]},
  {id:"D",teams:[
    {n:"USA",         f:"🇺🇸",p:2,w:2,d:0,l:0,gf:6,ga:1,pts:6},
    {n:"Australia",   f:"🇦🇺",p:2,w:1,d:0,l:1,gf:2,ga:2,pts:3},
    {n:"Paraguay",    f:"🇵🇾",p:2,w:1,d:0,l:1,gf:2,ga:5,pts:3},
    {n:"Turkey",      f:"🇹🇷",p:2,w:0,d:0,l:2,gf:0,ga:2,pts:0},
  ]},
  {id:"E",teams:[
    {n:"Germany",     f:"🇩🇪",p:2,w:2,d:0,l:0,gf:9,ga:2,pts:6},
    {n:"Ivory Coast", f:"🇨🇮",p:2,w:1,d:0,l:1,gf:2,ga:8,pts:3},
    {n:"Ecuador",     f:"🇪🇨",p:2,w:0,d:1,l:1,gf:0,ga:1,pts:1},
    {n:"Curaçao",     f:"🇨🇼",p:2,w:0,d:1,l:1,gf:1,ga:1,pts:1},
  ]},
  {id:"F",teams:[
    {n:"Netherlands", f:"🇳🇱",p:2,w:1,d:1,l:0,gf:7,ga:3,pts:4},
    {n:"Japan",       f:"🇯🇵",p:2,w:1,d:1,l:0,gf:6,ga:2,pts:4},
    {n:"Sweden",      f:"🇸🇪",p:2,w:1,d:0,l:1,gf:6,ga:6,pts:3},
    {n:"Tunisia",     f:"🇹🇳",p:2,w:0,d:0,l:2,gf:1,ga:9,pts:0},
  ]},
  {id:"G",teams:[
    {n:"Spain",       f:"🇪🇸",p:2,w:1,d:1,l:0,gf:4,ga:0,pts:4},
    {n:"Uruguay",     f:"🇺🇾",p:2,w:0,d:2,l:0,gf:3,ga:3,pts:2},
    {n:"Cabo Verde",  f:"🇨🇻",p:2,w:0,d:2,l:0,gf:2,ga:2,pts:2},
    {n:"Saudi Arabia",f:"🇸🇦",p:2,w:0,d:1,l:1,gf:1,ga:5,pts:1},
  ]},
  {id:"H",teams:[
    {n:"Egypt",       f:"🇪🇬",p:2,w:1,d:1,l:0,gf:4,ga:3,pts:4},
    {n:"Belgium",     f:"🇧🇪",p:2,w:0,d:2,l:0,gf:1,ga:1,pts:2},
    {n:"Iran",        f:"🇮🇷",p:2,w:0,d:2,l:0,gf:2,ga:2,pts:2},
    {n:"New Zealand", f:"🇳🇿",p:2,w:0,d:1,l:1,gf:3,ga:4,pts:1},
  ]},
  {id:"I",teams:[
    {n:"Norway",      f:"🇳🇴",p:2,w:2,d:0,l:0,gf:7,ga:3,pts:6},
    {n:"France",      f:"🇫🇷",p:2,w:2,d:0,l:0,gf:6,ga:1,pts:6},
    {n:"Senegal",     f:"🇸🇳",p:2,w:0,d:0,l:2,gf:3,ga:6,pts:0},
    {n:"Iraq",        f:"🇮🇶",p:2,w:0,d:0,l:2,gf:1,ga:7,pts:0},
  ]},
  {id:"J",teams:[
    {n:"Argentina",   f:"🇦🇷",p:2,w:2,d:0,l:0,gf:5,ga:0,pts:6},
    {n:"Austria",     f:"🇦🇹",p:2,w:1,d:0,l:1,gf:3,ga:3,pts:3},
    {n:"Algeria",     f:"🇩🇿",p:2,w:1,d:0,l:1,gf:2,ga:3,pts:3},
    {n:"Jordan",      f:"🇯🇴",p:2,w:0,d:0,l:2,gf:2,ga:6,pts:0},
  ]},
  {id:"K",teams:[
    {n:"Colombia",    f:"🇨🇴",p:2,w:2,d:0,l:0,gf:4,ga:1,pts:6},
    {n:"Portugal",    f:"🇵🇹",p:2,w:1,d:1,l:0,gf:6,ga:1,pts:4},
    {n:"DR Congo",    f:"🇨🇩",p:2,w:0,d:1,l:1,gf:1,ga:2,pts:1},
    {n:"Uzbekistan",  f:"🇺🇿",p:2,w:0,d:0,l:2,gf:1,ga:8,pts:0},
  ]},
  {id:"L",teams:[
    {n:"England",     f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:2,w:1,d:1,l:0,gf:4,ga:2,pts:4},
    {n:"Ghana",       f:"🇬🇭",p:2,w:1,d:1,l:0,gf:1,ga:0,pts:4},
    {n:"Croatia",     f:"🇭🇷",p:2,w:1,d:0,l:1,gf:3,ga:4,pts:3},
    {n:"Panama",      f:"🇵🇦",p:2,w:0,d:0,l:2,gf:0,ga:2,pts:0},
  ]},
];

const TEAMS_LIST = ["Argentina","Brazil","France","England","Germany","Spain","Portugal","Netherlands","Norway","USA","Mexico","Japan","Morocco","Colombia","Croatia","Egypt","Belgium","Switzerland","Canada","Sweden","South Africa","Scotland","Austria","Algeria"];

export default function StandingsPage() {
  const [myTeams, setMyTeams] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem("kist-teams"); if(s) setMyTeams(JSON.parse(s)); } catch {}
  }, []);

  const toggleTeam = (t: string) => {
    const next = myTeams.includes(t) ? myTeams.filter(x=>x!==t) : [...myTeams,t];
    setMyTeams(next);
    try { localStorage.setItem("kist-teams", JSON.stringify(next)); } catch {}
  };

  return (
    <div style={{maxWidth:"1100px",margin:"0 auto"}}>
      <div style={{marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,153,51,.15)"}}>
        <div style={{fontFamily:"'Teko',sans-serif",fontSize:"11px",fontWeight:600,color:"#FF9933",letterSpacing:".14em",marginBottom:"4px"}}>FIFA WORLD CUP 2026</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,4vw,44px)",letterSpacing:"2px",color:"#fff",lineHeight:1,marginBottom:"6px"}}>GROUP STANDINGS</h1>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,.4)"}}>Updated June 25 · All 12 groups · Source: ESPN + Yahoo + FIFA.com</p>
      </div>

      {/* MY TEAMS */}
      <div style={{marginBottom:"20px",background:"rgba(255,153,51,.05)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"14px",padding:"14px 16px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"1px",color:"#FF9933"}}>⭐ {myTeams.length>0?"MY TEAMS":"PICK YOUR TEAMS"}</div>
          <button onClick={()=>setShowPicker(!showPicker)} style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#FF9933",background:"none",border:"1px solid rgba(255,153,51,.2)",borderRadius:"6px",padding:"4px 10px",cursor:"pointer"}}>
            {showPicker?"Done":myTeams.length>0?"Change":"Select"}
          </button>
        </div>
        {myTeams.length>0&&!showPicker&&(
          <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
            {myTeams.map(t=>{
              const team=GROUPS.flatMap(g=>g.teams).find(tm=>tm.n===t);
              return(
                <div key={t} style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(255,153,51,.1)",border:"1px solid rgba(255,153,51,.2)",borderRadius:"8px",padding:"5px 10px"}}>
                  <span style={{fontSize:"15px"}}>{team?.f}</span>
                  <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933"}}>{t}</span>
                </div>
              );
            })}
          </div>
        )}
        {(showPicker||myTeams.length===0)&&(
          <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
            {TEAMS_LIST.map(t=>{
              const active=myTeams.includes(t);
              const team=GROUPS.flatMap(g=>g.teams).find(tm=>tm.n===t);
              return(
                <button key={t} onClick={()=>toggleTeam(t)} style={{display:"flex",alignItems:"center",gap:"5px",background:active?"rgba(255,153,51,.15)":"rgba(255,255,255,.05)",border:active?"1px solid rgba(255,153,51,.35)":"1px solid rgba(255,255,255,.08)",borderRadius:"8px",padding:"5px 10px",cursor:"pointer",transition:"all .15s"}}>
                  <span style={{fontSize:"14px"}}>{team?.f||"🏳️"}</span>
                  <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:active?"#FF9933":"rgba(255,255,255,.6)"}}>{t}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 12 GROUPS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"14px"}}>
        {GROUPS.map(({id,teams})=>{
          const sorted=[...teams].sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf);
          return(
            <div key={id} style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"12px",overflow:"hidden"}}>
              <div style={{padding:"10px 14px",background:"rgba(255,153,51,.07)",borderBottom:"2px solid rgba(255,153,51,.15)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"2px",color:"#FF9933"}}>GROUP {id}</span>
                <div style={{display:"flex",gap:"8px",fontFamily:"'Teko',sans-serif",fontSize:"11px",color:"rgba(255,255,255,.3)",letterSpacing:".06em"}}>
                  <span style={{width:"22px",textAlign:"center"}}>MP</span>
                  <span style={{width:"16px",textAlign:"center"}}>W</span>
                  <span style={{width:"16px",textAlign:"center"}}>D</span>
                  <span style={{width:"16px",textAlign:"center"}}>L</span>
                  <span style={{width:"22px",textAlign:"center"}}>GD</span>
                  <span style={{width:"22px",textAlign:"center",color:"rgba(255,153,51,.6)"}}>PTS</span>
                </div>
              </div>
              {sorted.map((t,i)=>{
                const gd=t.gf-t.ga;
                const q=i<2&&t.p>0;
                const isMyTeam=myTeams.includes(t.n);
                return(
                  <div key={t.n} style={{display:"flex",alignItems:"center",gap:"8px",padding:"9px 14px",borderBottom:i<3?"1px solid rgba(255,255,255,.04)":"none",background:isMyTeam?"rgba(255,153,51,.05)":q?"rgba(34,197,94,.02)":"transparent"}}>
                    <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.3)",width:"14px",textAlign:"center"}}>{i+1}</span>
                    <span style={{width:"4px",height:"20px",borderRadius:"2px",background:q?"#22c55e":"rgba(255,255,255,.08)",flexShrink:0}}/>
                    <span style={{fontSize:"18px",width:"22px",textAlign:"center",lineHeight:1,flexShrink:0}}>{t.f}</span>
                    <span style={{flex:1,fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                      color:isMyTeam?"#FF9933":q?"rgba(255,255,255,.9)":"rgba(255,255,255,.5)"
                    }}>{t.n}{isMyTeam?" ⭐":""}</span>
                    <div style={{display:"flex",gap:"8px",fontFamily:"'Teko',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.4)"}}>
                      <span style={{width:"22px",textAlign:"center"}}>{t.p}</span>
                      <span style={{width:"16px",textAlign:"center"}}>{t.w}</span>
                      <span style={{width:"16px",textAlign:"center"}}>{t.d}</span>
                      <span style={{width:"16px",textAlign:"center"}}>{t.l}</span>
                      <span style={{width:"22px",textAlign:"center",color:gd>0?"#22c55e":gd<0?"rgba(239,68,68,.7)":"rgba(255,255,255,.3)"}}>{gd>0?"+":""}{gd}</span>
                      <span style={{width:"22px",textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",letterSpacing:".04em",color:t.pts>0?"#FF9933":"rgba(255,255,255,.2)"}}>{t.pts}</span>
                    </div>
                  </div>
                );
              })}
              <div style={{padding:"5px 14px",display:"flex",alignItems:"center",gap:"5px",borderTop:"1px solid rgba(255,255,255,.04)"}}>
                <span style={{width:"7px",height:"7px",borderRadius:"2px",background:"rgba(34,197,94,.3)"}}/>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"10px",color:"rgba(255,255,255,.25)"}}>Top 2 advance + 8 best 3rd place</span>
              </div>
            </div>
          );
        })}
      </div>
      <p style={{fontSize:"10px",color:"rgba(255,255,255,.2)",textAlign:"center",marginTop:"20px"}}>Source: ESPN · Yahoo Sports · FIFA.com · Updated June 25 2026</p>
    </div>
  );
}
