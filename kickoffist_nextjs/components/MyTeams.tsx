"use client";
import { useState, useEffect } from "react";

const TEAMS = [
  {name:"Argentina", flag:"🇦🇷"}, {name:"Brazil",    flag:"🇧🇷"},
  {name:"France",    flag:"🇫🇷"}, {name:"England",   flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿"},
  {name:"Germany",   flag:"🇩🇪"}, {name:"Spain",     flag:"🇪🇸"},
  {name:"Portugal",  flag:"🇵🇹"}, {name:"Netherlands",flag:"🇳🇱"},
  {name:"Norway",    flag:"🇳🇴"}, {name:"USA",       flag:"🇺🇸"},
  {name:"Mexico",    flag:"🇲🇽"}, {name:"Japan",     flag:"🇯🇵"},
  {name:"Morocco",   flag:"🇲🇦"}, {name:"Colombia",  flag:"🇨🇴"},
  {name:"Italy",     flag:"🇮🇹"}, {name:"India",     flag:"🇮🇳"},
];

export default function MyTeams() {
  const [picked, setPicked] = useState<string[]>([]);
  const [show, setShow]     = useState(false);
  const [done, setDone]     = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kist-teams");
      if (saved) { setPicked(JSON.parse(saved)); setDone(true); }
      else setShow(true);
    } catch { setShow(true); }
  }, []);

  const toggle = (name: string) => {
    setPicked(p => p.includes(name) ? p.filter(x=>x!==name) : [...p,name]);
  };

  const save = () => {
    if (picked.length === 0) return;
    try { localStorage.setItem("kist-teams", JSON.stringify(picked)); } catch {}
    setDone(true); setShow(false);
  };

  const reset = () => {
    try { localStorage.removeItem("kist-teams"); } catch {}
    setPicked([]); setDone(false); setShow(true);
  };

  if (done && picked.length > 0) return (
    <div style={{marginBottom:"16px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.1)",borderRadius:"14px",padding:"12px 14px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px"}}>
        <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933",letterSpacing:".1em"}}>⭐ MY TEAMS</span>
        <button onClick={reset} style={{fontSize:"10px",color:"rgba(200,212,232,.4)",background:"none",border:"none",cursor:"pointer"}}>Change</button>
      </div>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
        {picked.map(t=>{
          const team = TEAMS.find(x=>x.name===t);
          return (
            <div key={t} style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(255,153,51,.08)",border:"1px solid rgba(255,153,51,.18)",borderRadius:"8px",padding:"5px 10px"}}>
              <span style={{fontSize:"16px"}}>{team?.flag}</span>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933"}}>{t}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (!show) return null;

  return (
    <div style={{marginBottom:"16px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"14px",padding:"14px 16px"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"1px",color:"#FF9933",marginBottom:"4px"}}>WHO DO YOU SUPPORT?</div>
      <div style={{fontSize:"12px",color:"rgba(200,212,232,.5)",marginBottom:"12px"}}>Pick your teams — we&apos;ll highlight their matches 🇮🇳</div>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"14px"}}>
        {TEAMS.map(t=>{
          const active = picked.includes(t.name);
          return (
            <button key={t.name} onClick={()=>toggle(t.name)} style={{
              display:"flex",alignItems:"center",gap:"5px",
              background:active?"rgba(255,153,51,.15)":"rgba(255,255,255,.05)",
              border:active?"1px solid rgba(255,153,51,.4)":"1px solid rgba(255,255,255,.08)",
              borderRadius:"8px",padding:"6px 10px",cursor:"pointer",transition:"all .15s",
            }}>
              <span style={{fontSize:"16px"}}>{t.flag}</span>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:active?"#FF9933":"rgba(200,212,232,.7)"}}>{t.name}</span>
            </button>
          );
        })}
      </div>
      <button onClick={save} disabled={picked.length===0} style={{
        width:"100%",padding:"11px",
        background:picked.length>0?"#FF9933":"rgba(255,255,255,.05)",
        color:picked.length>0?"#000":"rgba(200,212,232,.3)",
        fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"2px",
        border:"none",borderRadius:"10px",cursor:picked.length>0?"pointer":"not-allowed",
        transition:"all .15s",
      }}>
        {picked.length>0?`SAVE MY ${picked.length} TEAM${picked.length>1?"S":""}  ✓`:"PICK AT LEAST ONE TEAM"}
      </button>
    </div>
  );
}
