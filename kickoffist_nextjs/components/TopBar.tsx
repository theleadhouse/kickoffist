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
  return <span className="font-mono font-black tabular-nums" style={{fontSize:"15px",letterSpacing:"1px"}}>{t}</span>;
}

const NAV=[
  {href:"/today",     label:"HOME",     icon:"⚡"},
  {href:"/live",      label:"LIVE",     icon:"🔴"},
  {href:"/world-cup", label:"SCHEDULE", icon:"📅"},
  {href:"/standings", label:"TABLES",   icon:"📊"},
  {href:"/predict",   label:"PREDICT",  icon:"🔮"},
];

export default function TopBar(){
  const path=usePathname();
  const [liveCount,setLiveCount]=useState(0);
  useEffect(()=>{
    const poll=async()=>{try{const r=await fetch("/api/live");const d=await r.json();setLiveCount(d.matches?.length||0);}catch{}};
    poll();const id=setInterval(poll,15000);return()=>clearInterval(id);
  },[]);
  return(
    <header style={{background:"#0a0a0f",borderBottom:"1px solid rgba(255,255,255,.08)",position:"sticky",top:0,zIndex:100}}>
      {/* Top row */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 16px",height:"52px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
        <Link href="/today" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none"}}>
          {/* Tricolor K logo */}
          <div style={{width:"36px",height:"36px",borderRadius:"10px",overflow:"hidden",display:"flex",flexDirection:"column",position:"relative",boxShadow:"0 2px 12px rgba(0,0,0,.5)"}}>
            <div style={{flex:1,background:"#FF9933"}}/>
            <div style={{flex:1,background:"#FFFFFF",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:"14px",fontWeight:"900",color:"#000080",fontFamily:"'Barlow Condensed',sans-serif",lineHeight:1}}>K</span>
            </div>
            <div style={{flex:1,background:"#138808"}}/>
          </div>
          <div>
            <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"20px",fontWeight:"900",letterSpacing:"2px",color:"#fff",lineHeight:1}}>
              KICKOFF<span style={{color:"#FF9933"}}>IST</span>
            </div>
            <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)",fontWeight:"600",marginTop:"2px",letterSpacing:".08em"}}>INDIA&apos;S FOOTBALL CALENDAR 🇮🇳</div>
          </div>
        </Link>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {liveCount>0&&(
            <Link href="/live" style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",borderRadius:"6px",padding:"5px 10px",textDecoration:"none"}}>
              <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#ef4444",animation:"pulse 1.5s infinite",display:"block"}}/>
              <span style={{fontSize:"10px",fontWeight:"900",color:"#ef4444",letterSpacing:".08em"}}>{liveCount} LIVE</span>
            </Link>
          )}
          <div style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"8px",padding:"6px 12px",display:"flex",alignItems:"center",gap:"6px"}}>
            <span style={{fontSize:"10px",color:"rgba(255,255,255,.4)",fontWeight:"600"}}>IST</span>
            <div style={{width:"1px",height:"12px",background:"rgba(255,255,255,.15)"}}/>
            <span style={{color:"#FF9933"}}><ISTClock/></span>
          </div>
        </div>
      </div>
      {/* Nav tabs */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 8px",display:"flex",overflowX:"auto",borderTop:"1px solid rgba(255,255,255,.05)",scrollbarWidth:"none"}}>
        {NAV.map(item=>{
          const active=path?.startsWith(item.href);
          return(
            <Link key={item.href} href={item.href} style={{
              display:"flex",alignItems:"center",gap:"5px",
              padding:"10px 14px",whiteSpace:"nowrap",textDecoration:"none",
              fontSize:"11px",fontWeight:"800",letterSpacing:".08em",
              color:active?"#FF9933":"rgba(255,255,255,.4)",
              borderBottom:active?"2px solid #FF9933":"2px solid transparent",
              transition:"all .15s",position:"relative",flexShrink:0,
            }}>
              <span style={{fontSize:"12px"}}>{item.icon}</span>
              {item.label}
              {item.label==="LIVE"&&liveCount>0&&(
                <span style={{background:"#ef4444",color:"#fff",fontSize:"8px",fontWeight:"900",padding:"1px 5px",borderRadius:"8px",lineHeight:"14px"}}>{liveCount}</span>
              )}
            </Link>
          );
        })}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}`}</style>
    </header>
  );
}
