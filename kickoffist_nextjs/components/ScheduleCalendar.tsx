"use client";
import { useState } from "react";
import { Match } from "@/lib/types";
import PortalMatchCard from "@/components/PortalMatchCard";

function getISTDate(utc: string) {
  const d = new Date(new Date(utc).getTime() + 5.5*3600000);
  return d.toISOString().slice(0,10);
}
function fmtDate(d: string) {
  return new Date(d+"T00:00:00Z").toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short",timeZone:"UTC"});
}

export default function ScheduleCalendar({matches,played}:{matches:Match[];played:number}) {
  const today = new Date(Date.now()+5.5*3600000).toISOString().slice(0,10);
  const [sel, setSel] = useState(today);

  const dates = [...new Set(
    matches.filter(m=>m.homeTeam.name!=="TBD").map(m=>getISTDate(m.utcDate))
  )].sort();

  const filtered = matches.filter(m=>getISTDate(m.utcDate)===sel&&m.homeTeam.name!=="TBD")
    .sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime());

  return (
    <div style={{maxWidth:"800px",margin:"0 auto"}}>
      <div style={{marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,153,51,.15)"}}>
        <div style={{fontFamily:"'Teko',sans-serif",fontSize:"11px",fontWeight:600,color:"#FF9933",letterSpacing:".14em",marginBottom:"4px"}}>FIFA WORLD CUP 2026</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,4vw,44px)",letterSpacing:"2px",color:"#fff",lineHeight:1,marginBottom:"6px"}}>MATCH SCHEDULE</h1>
        <p style={{fontSize:"12px",color:"rgba(255,255,255,.4)"}}>All times Indian Standard Time · {played} played · {104-played} remaining</p>
      </div>

      {/* DATE CALENDAR */}
      <div style={{marginBottom:"20px"}}>
        <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.4)",letterSpacing:".1em",marginBottom:"10px"}}>📅 TAP A DATE</div>
        <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
          {dates.map(date=>{
            const active = date===sel;
            const isToday = date===today;
            const count = matches.filter(m=>getISTDate(m.utcDate)===date&&m.homeTeam.name!=="TBD").length;
            return(
              <button key={date} onClick={()=>setSel(date)} style={{
                padding:"8px 12px",
                background: active?"#FF9933":"rgba(255,255,255,.05)",
                border: active?"1px solid #FF9933":isToday?"1px solid rgba(255,153,51,.3)":"1px solid rgba(255,255,255,.08)",
                borderRadius:"8px",cursor:"pointer",transition:"all .15s",
                fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,
                color: active?"#000":isToday?"#FF9933":"rgba(255,255,255,.6)",
                letterSpacing:".04em",whiteSpace:"nowrap",
              }}>
                <div>{isToday?"TODAY":fmtDate(date)}</div>
                <div style={{fontSize:"9px",opacity:.7,marginTop:"1px"}}>{count} {count===1?"match":"matches"}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MATCHES */}
      <div>
        <div className="sh">
          <span>⚽</span>
          <span style={{color:"#FF9933"}}>{sel===today?"TODAY":fmtDate(sel).toUpperCase()}</span>
          <span className="badge-up">{filtered.length} MATCHES</span>
          <div className="sh-line"/>
          <span style={{fontSize:"10px",color:"rgba(255,255,255,.3)",flexShrink:0}}>IST</span>
        </div>
        {filtered.length>0
          ? filtered.map(m=><PortalMatchCard key={m.id} match={m}/>)
          : <div className="card" style={{padding:"24px",textAlign:"center"}}>
              <div style={{fontFamily:"'Teko',sans-serif",fontSize:"16px",color:"rgba(255,255,255,.4)"}}>No matches on this date</div>
            </div>
        }
      </div>
    </div>
  );
}
