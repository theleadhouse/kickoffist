"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ISTClock(){
  const [t,setT]=useState("");
  useEffect(()=>{
    const tick=()=>{
      const ist=new Date(Date.now()+5.5*3600000);
      setT(`${String(ist.getUTCHours()).padStart(2,"0")}:${String(ist.getUTCMinutes()).padStart(2,"0")}`);
    };
    tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[]);
  return <span style={{fontFamily:"'Courier New',monospace",fontWeight:"900",letterSpacing:"1px",fontSize:"15px"}}>{t}</span>;
}

const NAV=[
  {href:"/today",     label:"HOME",     icon:"⚡"},
  {href:"/live",      label:"LIVE",     icon:"🔴"},
  {href:"/world-cup", label:"SCHEDULE", icon:"📅"},
  {href:"/standings", label:"TABLES",   icon:"📊"},
];

export default function TopBar(){
  const path=usePathname();
  const [liveCount,setLiveCount]=useState(0);
  useEffect(()=>{
    const poll=async()=>{try{const r=await fetch("/api/live");const d=await r.json();setLiveCount(d.matches?.length||0);}catch{}};
    poll();const id=setInterval(poll,15000);return()=>clearInterval(id);
  },[]);
  return(
    <header style={{background:"#080808",borderBottom:"1px solid rgba(255,255,255,.07)",position:"sticky",top:0,zIndex:100}}>
      {/* Brand row */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 16px",height:"54px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
        <Link href="/today" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",flexShrink:0}}>
          {/* Indian tricolor K */}
          <div style={{width:"38px",height:"38px",borderRadius:"10px",overflow:"hidden",display:"flex",flexDirection:"column",flexShrink:0,boxShadow:"0 2px 12px rgba(0,0,0,.6)"}}>
            <div style={{flex:1,background:"#FF9933"}}/>
            <div style={{flex:1,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"15px",fontWeight:"900",color:"#000080",lineHeight:1}}>K</span>
            </div>
            <div style={{flex:1,background:"#138808"}}/>
          </div>
          <div>
            <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"21px",fontWeight:"900",letterSpacing:"2px",color:"#fff",lineHeight:1}}>
              KICKOFF<span style={{color:"#FF9933"}}>IST</span>
            </div>
            <div style={{fontSize:"8px",color:"rgba(255,255,255,.3)",fontWeight:"600",marginTop:"2px",letterSpacing:".06em"}}>INDIA&apos;S FOOTBALL CALENDAR 🇮🇳</div>
          </div>
        </Link>

        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {liveCount>0&&(
            <Link href="/live" style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.25)",borderRadius:"6px",padding:"5px 10px",textDecoration:"none"}}>
              <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#ef4444",animation:"pulse 1.5s infinite",display:"block"}}/>
              <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"11px",fontWeight:"900",color:"#ef4444",letterSpacing:".06em"}}>{liveCount} LIVE</span>
            </Link>
          )}
          {/* IST Clock */}
          <div style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.09)",borderRadius:"8px",padding:"6px 12px",display:"flex",alignItems:"center",gap:"6px"}}>
            <span style={{fontSize:"9px",color:"rgba(255,255,255,.35)",fontWeight:"600",letterSpacing:".06em"}}>IST</span>
            <div style={{width:"1px",height:"12px",background:"rgba(255,255,255,.12)"}}/>
            <span style={{color:"#FF9933"}}><ISTClock/></span>
          </div>
        </div>
      </div>

      {/* Nav strip */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 8px",display:"flex",overflowX:"auto",borderTop:"1px solid rgba(255,255,255,.05)",scrollbarWidth:"none"}}>
        {NAV.map(item=>{
          const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
          return(
            <Link key={item.href} href={item.href} style={{
              display:"flex",alignItems:"center",gap:"5px",
              padding:"10px 16px",whiteSpace:"nowrap",textDecoration:"none",
              fontFamily:"'Barlow Condensed','Oswald',sans-serif",
              fontSize:"12px",fontWeight:"800",letterSpacing:".1em",
              color:active?"#FF9933":"rgba(255,255,255,.4)",
              borderBottom:active?"2px solid #FF9933":"2px solid transparent",
              transition:"all .15s",flexShrink:0,
            }}>
              <span style={{fontSize:"13px"}}>{item.icon}</span>
              {item.label}
              {item.label==="LIVE"&&liveCount>0&&(
                <span style={{background:"#ef4444",color:"#fff",fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"9px",fontWeight:"900",padding:"1px 5px",borderRadius:"8px",lineHeight:"14px"}}>{liveCount}</span>
              )}
            </Link>
          );
        })}
        {/* Watch on */}
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"}}>
          <span style={{fontSize:"10px",color:"rgba(255,255,255,.2)",fontWeight:"500"}}>📺 JioCinema · Sports18 · DD Sports</span>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.8)}}`}</style>
    </header>
  );
}
