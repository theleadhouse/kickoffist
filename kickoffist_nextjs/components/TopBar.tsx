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
  return <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"2px",color:"#FF9933",lineHeight:1}}>{t}</span>;
}

const NAV = [
  {href:"/today",    label:"TODAY"},
  {href:"/results",  label:"RESULTS"},
  {href:"/world-cup",label:"SCHEDULE"},
  {href:"/standings",label:"TABLES"},
  {href:"/news",     label:"IST GUIDE"},
];

export default function TopBar() {
  const path = usePathname();
  const [liveCount, setLiveCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const poll = async () => {try{const r=await fetch("/api/live");const d=await r.json();setLiveCount(d.matches?.length||0);}catch{}};
    poll(); const id=setInterval(poll,15000); return()=>clearInterval(id);
  },[]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  return (
    <header style={{
      background:"rgba(255,255,255,.97)",
      backdropFilter:"blur(20px)",
      borderBottom:`2px solid ${scrolled?"#FF9933":"#0A0A0A"}`,
      position:"sticky",top:0,zIndex:100,
      transition:"border-color .3s",
      boxShadow:scrolled?"0 2px 20px rgba(0,0,0,.08)":"none",
    }}>
      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 20px",height:"56px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"16px"}}>
        
        {/* Logo — newspaper masthead style */}
        <Link href="/today" style={{display:"flex",alignItems:"center",gap:"0",textDecoration:"none",flexShrink:0}}>
          <div style={{
            background:"#FF9933",
            padding:"6px 10px",
            borderRadius:"6px",
            marginRight:"10px",
          }}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",color:"#0A0A0A",letterSpacing:"1px",lineHeight:1}}>K</span>
          </div>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"4px",lineHeight:1,color:"#0A0A0A"}}>
              KICKOFF<span style={{color:"#FF9933"}}>IST</span>
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"#999",letterSpacing:".1em",marginTop:"1px"}}>INDIA'S WORLD CUP HUB 🇮🇳</div>
          </div>
        </Link>

        {/* Nav — clean, editorial */}
        <nav style={{display:"flex",alignItems:"center",gap:"2px",flex:1,justifyContent:"center"}} className="hidden sm:flex">
          {NAV.map(item => {
            const active = path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                padding:"6px 14px",borderRadius:"6px",
                fontFamily:"'Barlow Condensed',sans-serif",
                fontSize:"13px",fontWeight:800,letterSpacing:".1em",
                textDecoration:"none",transition:"all .15s",
                background:active?"#0A0A0A":"transparent",
                color:active?"#FF9933":"#333",
              }}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div style={{display:"flex",alignItems:"center",gap:"10px",flexShrink:0}}>
          {liveCount > 0 && (
            <Link href="/today" style={{display:"flex",alignItems:"center",gap:"5px",background:"#CC1100",borderRadius:"5px",padding:"5px 10px",textDecoration:"none"}}>
              <span className="live-dot" style={{background:"#fff",width:"5px",height:"5px"}}/>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#fff",letterSpacing:".08em"}}>{liveCount} LIVE</span>
            </Link>
          )}
          <div style={{display:"flex",alignItems:"center",gap:"6px",background:"#FF9933",borderRadius:"6px",padding:"6px 12px"}}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"rgba(0,0,0,.6)",letterSpacing:".1em"}}>IST</span>
            <ISTClock/>
          </div>
        </div>
      </div>
    </header>
  );
}
