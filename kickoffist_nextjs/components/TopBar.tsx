"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ISTClock(){
  const [t,setT]=useState("");
  useEffect(()=>{
    const tick=()=>{
      const d=new Date(Date.now()+5.5*3600000);
      setT(`${String(d.getUTCHours()).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}`);
    };
    tick();const id=setInterval(tick,1000);return()=>clearInterval(id);
  },[]);
  return<span style={{fontFamily:"'Courier New',monospace",fontWeight:900,letterSpacing:"1px",color:"#FF9933"}}>{t}</span>;
}

const NAV=[
  {href:"/today",    label:"HOME",    icon:"⚡"},
  {href:"/live",     label:"LIVE",    icon:"🔴"},
  {href:"/results",  label:"RESULTS", icon:"📋"},
  {href:"/world-cup",label:"SCHEDULE",icon:"📅"},
  {href:"/standings",label:"TABLES",  icon:"📊"},
  {href:"/news",     label:"NEWS",    icon:"📰"},
];

export default function TopBar(){
  const path=usePathname();
  const [liveCount,setLiveCount]=useState(0);
  useEffect(()=>{
    const poll=async()=>{try{const r=await fetch("/api/live");const d=await r.json();setLiveCount(d.matches?.length||0);}catch{}};
    poll();const id=setInterval(poll,15000);return()=>clearInterval(id);
  },[]);

  return(
    <header style={{background:"rgba(4,8,4,.98)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.07)",position:"sticky",top:0,zIndex:100}}>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 16px",height:"56px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
        <Link href="/today" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",flexShrink:0}}>
          {/* Tricolor K */}
          <div style={{width:"40px",height:"40px",borderRadius:"10px",overflow:"hidden",flexShrink:0,display:"flex",flexDirection:"column",boxShadow:"0 2px 12px rgba(0,0,0,.6)"}}>
            <div style={{flex:1,background:"#FF9933"}}/>
            <div style={{flex:1,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"16px",fontWeight:900,color:"#000080",lineHeight:1}}>K</span>
            </div>
            <div style={{flex:1,background:"#138808"}}/>
          </div>
          <div>
            <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"22px",fontWeight:900,letterSpacing:"2px",color:"#fff",lineHeight:1}}>
              KICKOFF<span style={{color:"#FF9933"}}>IST</span>
            </div>
            <div style={{fontSize:"9px",color:"rgba(255,255,255,.28)",fontWeight:600,marginTop:"2px",letterSpacing:".07em"}}>FOOTBALL IN YOUR TIME 🇮🇳</div>
          </div>
        </Link>

        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {liveCount>0&&(
            <Link href="/live" style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.3)",borderRadius:"7px",padding:"5px 11px",textDecoration:"none"}}>
              <span className="live-dot" style={{width:"6px",height:"6px"}}/>
              <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"11px",fontWeight:900,color:"#ef4444",letterSpacing:".06em"}}>{liveCount} LIVE</span>
            </Link>
          )}
          <div style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"8px",padding:"6px 12px",display:"flex",alignItems:"center",gap:"7px"}}>
            <span style={{fontSize:"9px",color:"rgba(255,255,255,.35)",fontWeight:600,letterSpacing:".06em"}}>IST</span>
            <div style={{width:"1px",height:"13px",background:"rgba(255,255,255,.1)"}}/>
            <ISTClock/>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 8px",display:"flex",overflowX:"auto",borderTop:"1px solid rgba(255,255,255,.05)",scrollbarWidth:"none"}}>
        {NAV.map(item=>{
          const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
          return(
            <Link key={item.href} href={item.href} style={{
              display:"flex",alignItems:"center",gap:"5px",padding:"9px 14px",
              whiteSpace:"nowrap",textDecoration:"none",flexShrink:0,
              fontFamily:"'Barlow Condensed','Oswald',sans-serif",
              fontSize:"12px",fontWeight:800,letterSpacing:".1em",
              color:active?"#FF9933":"rgba(255,255,255,.37)",
              borderBottom:active?"2px solid #FF9933":"2px solid transparent",
              transition:"color .15s",
            }}>
              <span style={{fontSize:"12px"}}>{item.icon}</span>
              {item.label}
              {item.label==="LIVE"&&liveCount>0&&(
                <span style={{background:"#ef4444",color:"#fff",fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"9px",fontWeight:900,padding:"1px 5px",borderRadius:"8px",lineHeight:"14px"}}>{liveCount}</span>
              )}
            </Link>
          );
        })}
        <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px",flexShrink:0}}>
          <span style={{fontSize:"10px",color:"rgba(255,255,255,.18)",whiteSpace:"nowrap"}}>📺 JioCinema · Sports18</span>
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </header>
  );
}
