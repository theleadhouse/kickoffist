"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ISTClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date(Date.now() + 5.5 * 3600000);
      setT(`${String(d.getUTCHours()).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}`);
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"2px", color:"#1a6b1a", lineHeight:1 }}>{t}</span>;
}

const NAV = [
  { href:"/today",    label:"HOME",     icon:"⚡" },
  { href:"/results",  label:"RESULTS",  icon:"📋" },
  { href:"/world-cup",label:"SCHEDULE", icon:"📅" },
  { href:"/standings",label:"TABLES",   icon:"📊" },
  { href:"/news",     label:"NEWS",     icon:"📰" },
];

export default function TopBar() {
  const path = usePathname();
  const [liveCount, setLiveCount] = useState(0);
  useEffect(() => {
    const poll = async () => { try { const r = await fetch("/api/live"); const d = await r.json(); setLiveCount(d.matches?.length||0); } catch {} };
    poll(); const id = setInterval(poll, 15000); return () => clearInterval(id);
  }, []);

  return (
    <header style={{ background:"rgba(255,255,255,.97)", backdropFilter:"blur(20px)", borderBottom:"2px solid rgba(26,107,26,.12)", position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 12px rgba(26,107,26,.06)" }}>
      {/* Brand row */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 16px", height:"58px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px" }}>
        <Link href="/today" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none", flexShrink:0 }}>
          {/* Football icon — no tricolor */}
          <div style={{ width:"42px", height:"42px", borderRadius:"50%", background:"linear-gradient(135deg,#1a6b1a,#2d8a2d)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 10px rgba(26,107,26,.3)", flexShrink:0 }}>
            <span style={{ fontSize:"22px", lineHeight:1 }}>⚽</span>
          </div>
          <div>
            {/* KICKOFFIST in Indian tricolor text */}
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"24px", letterSpacing:"3px", lineHeight:1 }}>
              <span style={{ color:"#FF9933" }}>KIC</span>
              <span style={{ color:"#1a6b1a" }}>KOF</span>
              <span style={{ color:"#FF9933" }}>F</span>
              <span style={{ color:"#1a6b1a" }}>IST</span>
            </div>
            <div style={{ fontSize:"9px", color:"#7a9a7a", fontWeight:600, marginTop:"1px", letterSpacing:".08em" }}>FOOTBALL IN YOUR TIME 🇮🇳</div>
          </div>
        </Link>

        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          {liveCount > 0 && (
            <Link href="/today" style={{ display:"flex", alignItems:"center", gap:"5px", background:"rgba(220,38,38,.08)", border:"1px solid rgba(220,38,38,.2)", borderRadius:"7px", padding:"6px 12px", textDecoration:"none" }}>
              <span className="live-dot" style={{ width:"6px", height:"6px" }}/>
              <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"13px", fontWeight:600, color:"#dc2626", letterSpacing:".06em" }}>{liveCount} LIVE</span>
            </Link>
          )}
          <div style={{ background:"#e8f5e8", border:"1px solid rgba(26,107,26,.15)", borderRadius:"10px", padding:"7px 14px", display:"flex", alignItems:"center", gap:"8px" }}>
            <span style={{ fontSize:"9px", color:"#3a5c3a", fontWeight:700, letterSpacing:".08em" }}>IST</span>
            <div style={{ width:"1px", height:"14px", background:"rgba(26,107,26,.2)" }}/>
            <ISTClock/>
          </div>
        </div>
      </div>

      {/* Nav tabs */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 8px", display:"flex", overflowX:"auto", borderTop:"1px solid rgba(26,107,26,.08)", scrollbarWidth:"none" }}>
        {NAV.map(item => {
          const active = path === item.href || (item.href !== "/today" && path?.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} style={{
              display:"flex", alignItems:"center", gap:"5px",
              padding:"9px 16px", whiteSpace:"nowrap", textDecoration:"none", flexShrink:0,
              fontFamily:"'Teko',sans-serif",
              fontSize:"13px", fontWeight:600, letterSpacing:".1em",
              color: active ? "#1a6b1a" : "#7a9a7a",
              borderBottom: active ? "2px solid #1a6b1a" : "2px solid transparent",
              transition:"color .15s",
            }}>
              <span style={{ fontSize:"13px" }}>{item.icon}</span>
              {item.label}
              {item.label === "LIVE" && liveCount > 0 && (
                <span style={{ background:"#dc2626", color:"#fff", fontSize:"9px", fontWeight:700, padding:"1px 5px", borderRadius:"8px", lineHeight:"14px" }}>{liveCount}</span>
              )}
            </Link>
          );
        })}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </header>
  );
}
