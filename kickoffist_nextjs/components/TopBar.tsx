"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ISTClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date(Date.now() + 5.5*3600000);
      setT(`${String(d.getUTCHours()).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}`);
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"2px",color:"#FF9933",lineHeight:1}}>{t}</span>;
}

const NAV = [
  {href:"/today",    label:"HOME",    icon:"⚡"},
  {href:"/results",  label:"RESULTS", icon:"📋"},
  {href:"/world-cup",label:"SCHEDULE",icon:"📅"},
  {href:"/standings",label:"TABLES",  icon:"📊"},
  {href:"/news",     label:"IST GUIDE",icon:"🇮🇳"},
];

export default function TopBar() {
  const path = usePathname();
  const [liveCount, setLiveCount] = useState(0);
  useEffect(() => {
    const poll = async () => { try { const r = await fetch("/api/live"); const d = await r.json(); setLiveCount(d.matches?.length||0); } catch {} };
    poll(); const id = setInterval(poll,15000); return () => clearInterval(id);
  }, []);

  return (
    <header style={{background:"rgba(17,19,24,.98)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,153,51,.15)",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 20px rgba(0,0,0,.5)"}}>
      {/* Brand */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 16px",height:"56px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
        <Link href="/today" style={{display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",flexShrink:0}}>
          {/* Football logo — simple, bold */}
          <div style={{width:"40px",height:"40px",borderRadius:"10px",background:"linear-gradient(135deg,#FF9933 0%,#cc7a00 100%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 12px rgba(255,153,51,.3)",flexShrink:0}}>
            <span style={{fontSize:"22px",lineHeight:1}}>⚽</span>
          </div>
          <div>
            {/* KICKOFFIST — Bebas Neue, bold, tricolor letters */}
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"26px",letterSpacing:"3px",lineHeight:1}}>
              <span style={{color:"#FF9933"}}>KICK</span>
              <span style={{color:"#ffffff"}}>OFF</span>
              <span style={{color:"#FF9933"}}>IST</span>
            </div>
            <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)",fontWeight:600,marginTop:"1px",letterSpacing:".08em"}}>FOOTBALL IN YOUR TIME 🇮🇳</div>
          </div>
        </Link>

        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {liveCount > 0 && (
            <Link href="/today" style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.3)",borderRadius:"7px",padding:"6px 12px",textDecoration:"none"}}>
              <span className="live-dot" style={{width:"6px",height:"6px"}}/>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#f87171",letterSpacing:".06em"}}>{liveCount} LIVE</span>
            </Link>
          )}
          <div style={{background:"rgba(255,153,51,.08)",border:"1px solid rgba(255,153,51,.2)",borderRadius:"10px",padding:"7px 14px",display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"9px",color:"rgba(255,153,51,.6)",fontWeight:700,letterSpacing:".08em"}}>IST</span>
            <div style={{width:"1px",height:"14px",background:"rgba(255,153,51,.2)"}}/>
            <ISTClock/>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 8px",display:"flex",overflowX:"auto",borderTop:"1px solid rgba(255,255,255,.05)",scrollbarWidth:"none"}}>
        {NAV.map(item => {
          const active = path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{
              display:"flex",alignItems:"center",gap:"5px",
              padding:"10px 16px",whiteSpace:"nowrap",textDecoration:"none",flexShrink:0,
              fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,letterSpacing:".1em",
              color: active ? "#FF9933" : "rgba(255,255,255,.38)",
              borderBottom: active ? "2px solid #FF9933" : "2px solid transparent",
              transition:"color .15s",
            }}>
              <span style={{fontSize:"12px"}}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </header>
  );
}
