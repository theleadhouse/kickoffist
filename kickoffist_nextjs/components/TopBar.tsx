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
    tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id);
  },[]);
  return (
    <span style={{
      fontFamily:"'Bebas Neue',sans-serif",
      fontSize:"24px",letterSpacing:"3px",
      color:"#FF9933",lineHeight:1,
    }}>{t}</span>
  );
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
    const poll = async () => {
      try { const r = await fetch("/api/live"); const d = await r.json(); setLiveCount(d.matches?.length||0); } catch {}
    };
    poll(); const id = setInterval(poll,15000); return ()=>clearInterval(id);
  },[]);

  return (
    <header style={{
      background:"rgba(13,13,13,.98)",
      backdropFilter:"blur(20px)",
      borderBottom:"2px solid #FF9933",
      position:"sticky",top:0,zIndex:100,
    }}>
      {/* Brand row */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 16px",height:"60px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
        <Link href="/today" style={{display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",flexShrink:0}}>
          {/* Logo: saffron block with K */}
          <div style={{
            width:"44px",height:"44px",
            background:"#FF9933",
            borderRadius:"8px",
            display:"flex",alignItems:"center",justifyContent:"center",
            flexShrink:0,
          }}>
            <span style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:"28px",color:"#0D0D0D",
              lineHeight:1,letterSpacing:"1px",
            }}>K</span>
          </div>
          <div>
            <div style={{
              fontFamily:"'Bebas Neue',sans-serif",
              fontSize:"28px",letterSpacing:"4px",
              lineHeight:1,color:"#fff",
            }}>
              KICKOFF<span style={{color:"#FF9933"}}>IST</span>
            </div>
            <div style={{
              fontFamily:"'Barlow Condensed',sans-serif",
              fontSize:"9px",fontWeight:700,
              color:"rgba(255,255,255,.35)",
              marginTop:"2px",letterSpacing:".12em",
            }}>FOOTBALL IN YOUR TIME 🇮🇳</div>
          </div>
        </Link>

        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          {liveCount > 0 && (
            <Link href="/today" style={{
              display:"flex",alignItems:"center",gap:"6px",
              background:"rgba(255,59,59,.15)",
              border:"1px solid rgba(255,59,59,.4)",
              borderRadius:"6px",padding:"6px 12px",textDecoration:"none",
            }}>
              <span className="live-dot" style={{width:"7px",height:"7px"}}/>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,color:"#FF6B6B",letterSpacing:".08em"}}>{liveCount} LIVE</span>
            </Link>
          )}
          <div style={{
            display:"flex",alignItems:"center",gap:"8px",
            background:"rgba(255,153,51,.1)",
            border:"1px solid rgba(255,153,51,.25)",
            borderRadius:"8px",padding:"8px 14px",
          }}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"rgba(255,153,51,.7)",letterSpacing:".1em"}}>IST</span>
            <div style={{width:"1px",height:"18px",background:"rgba(255,153,51,.25)"}}/>
            <ISTClock/>
          </div>
        </div>
      </div>

      {/* Nav — saffron underline active */}
      <div style={{
        maxWidth:"1100px",margin:"0 auto",padding:"0 8px",
        display:"flex",overflowX:"auto",
        borderTop:"1px solid rgba(255,255,255,.05)",
        scrollbarWidth:"none",
      }}>
        {NAV.map(item => {
          const active = path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{
              display:"flex",alignItems:"center",gap:"5px",
              padding:"10px 18px",whiteSpace:"nowrap",
              textDecoration:"none",flexShrink:0,
              fontFamily:"'Barlow Condensed',sans-serif",
              fontSize:"13px",fontWeight:800,letterSpacing:".12em",
              color:active?"#FF9933":"rgba(255,255,255,.35)",
              borderBottom:active?"2px solid #FF9933":"2px solid transparent",
              transition:"color .15s",marginBottom:"-2px",
            }}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
