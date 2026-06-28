"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ISTClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const ist = new Date(d.toLocaleString("en-US",{timeZone:"Asia/Kolkata"}));
      const h = String(ist.getHours()).padStart(2,"0");
      const m = String(ist.getMinutes()).padStart(2,"0");
      const s = String(ist.getSeconds()).padStart(2,"0");
      setT(`${h}:${m}:${s}`);
    };
    tick(); const id = setInterval(tick,1000); return()=>clearInterval(id);
  },[]);
  return <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"2px",color:"#fff",lineHeight:1}}>{t} <span style={{color:"#FF9933"}}>IST</span></span>;
}

const NAV = [
  {href:"/today",    label:"LIVE"},
  {href:"/results",  label:"RESULTS"},
  {href:"/world-cup",label:"SCHEDULE"},
  {href:"/standings",label:"TABLES"},
  {href:"/news",     label:"IST GUIDE"},
];

export default function TopBar() {
  const path = usePathname();
  const [liveCount, setLiveCount] = useState(0);
  useEffect(() => {
    const poll = async ()=>{try{const r=await fetch("/api/live");const d=await r.json();setLiveCount(d.matches?.length||0);}catch{}};
    poll(); const id=setInterval(poll,15000); return()=>clearInterval(id);
  },[]);

  return (
    <header className="glass" style={{position:"sticky",top:0,zIndex:100,borderBottom:"1px solid rgba(255,153,51,.2)"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 16px",height:"56px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
        <Link href="/today" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",flexShrink:0}}>
          <div style={{background:"#FF9933",width:"32px",height:"32px",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",color:"#0F172A",lineHeight:1}}>K</span>
          </div>
          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"3px",color:"#fff",lineHeight:1}}>
            KICKOFF<span style={{color:"#FF9933"}}>IST</span>
          </span>
        </Link>

        <nav style={{display:"flex",alignItems:"center",gap:"2px"}} className="hidden md:flex">
          {NAV.map(item=>{
            const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
            return(
              <Link key={item.href} href={item.href} style={{
                padding:"6px 14px",borderRadius:"8px",
                fontFamily:"'Barlow Condensed',sans-serif",
                fontSize:"13px",fontWeight:800,letterSpacing:".1em",
                textDecoration:"none",transition:"all .15s",
                background:active?"rgba(255,153,51,.15)":"transparent",
                color:active?"#FF9933":"rgba(255,255,255,.5)",
                borderBottom:active?"2px solid #FF9933":"2px solid transparent",
              }}>{item.label}</Link>
            );
          })}
        </nav>

        <div style={{display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
          {liveCount>0&&(
            <Link href="/today" style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(239,68,68,.2)",border:"1px solid rgba(239,68,68,.4)",borderRadius:"20px",padding:"5px 12px",textDecoration:"none"}}>
              <span className="live-dot" style={{width:"6px",height:"6px"}}/>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#f87171",letterSpacing:".06em"}}>{liveCount} LIVE</span>
            </Link>
          )}
          <div style={{display:"flex",alignItems:"center",gap:"8px",background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"20px",padding:"6px 14px"}}>
            <span className="live-dot" style={{width:"5px",height:"5px",background:"#FF9933",animation:"none",opacity:1}}/>
            <ISTClock/>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 8px",display:"flex",overflowX:"auto",scrollbarWidth:"none"}} className="md:hidden">
        {NAV.map(item=>{
          const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
          return(
            <Link key={item.href} href={item.href} style={{
              padding:"8px 16px",whiteSpace:"nowrap",
              fontFamily:"'Barlow Condensed',sans-serif",
              fontSize:"12px",fontWeight:800,letterSpacing:".1em",
              textDecoration:"none",flexShrink:0,
              color:active?"#FF9933":"rgba(255,255,255,.4)",
              borderBottom:active?"2px solid #FF9933":"2px solid transparent",
            }}>{item.label}</Link>
          );
        })}
      </div>
    </header>
  );
}
