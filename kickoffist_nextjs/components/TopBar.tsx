"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ISTClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const ist = new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Kolkata"}));
      setT(`${String(ist.getHours()).padStart(2,"0")}:${String(ist.getMinutes()).padStart(2,"0")}:${String(ist.getSeconds()).padStart(2,"0")}`);
    };
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[]);
  return <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"2px",color:"#FF9933"}}>{t}</span>;
}

const NAV=[
  {href:"/today",    label:"HOME"},
  {href:"/results",  label:"RESULTS"},
  {href:"/world-cup",label:"BRACKET"},
  {href:"/standings",label:"TABLES"},
  {href:"/next-season", label:"NEXT SEASON"},
];

export default function TopBar(){
  const path=usePathname();
  const [live,setLive]=useState(0);
  useEffect(()=>{
    const p=async()=>{try{const r=await fetch("/api/live");const d=await r.json();setLive(d.matches?.length||0);}catch{}};
    p(); const id=setInterval(p,15000); return()=>clearInterval(id);
  },[]);

  return(
    <header style={{background:"rgba(8,8,8,.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,153,51,.2)",position:"sticky",top:0,zIndex:100,boxShadow:"0 4px 30px rgba(0,0,0,.6)"}}>
      {/* Saffron top line */}
      <div style={{height:"3px",background:"linear-gradient(90deg,#FF9933 0%,#FFB347 50%,#FF9933 100%)"}}/>
      <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 14px",height:"52px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px"}}>
        {/* Logo */}
        <Link href="/today" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",flexShrink:0}}>
          <div style={{width:"36px",height:"36px",background:"#FF9933",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px rgba(255,153,51,.4)",flexShrink:0}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",color:"#080808",lineHeight:1}}>K</span>
          </div>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"4px",color:"#fff",lineHeight:1}}>KICKOFF<span style={{color:"#FF9933"}}>IST</span></div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,255,255,.35)",letterSpacing:".1em"}}>INDIA'S WC 2026 HUB 🇮🇳</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{display:"flex",alignItems:"center",gap:"2px",flex:1,justifyContent:"center"}} className="hidden md:flex">
          {NAV.map(item=>{
            const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
            return(
              <Link key={item.href} href={item.href} style={{
                padding:"7px 16px",borderRadius:"8px",
                fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,letterSpacing:".12em",
                textDecoration:"none",transition:"all .15s",
                background:active?"rgba(255,153,51,.12)":"transparent",
                color:active?"#FF9933":"rgba(255,255,255,.45)",
                border:active?"1px solid rgba(255,153,51,.25)":"1px solid transparent",
              }}>{item.label}</Link>
            );
          })}
        </nav>

        {/* Right */}
        <div style={{display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
          {live>0&&<Link href="/today" style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(232,0,45,.15)",border:"1px solid rgba(232,0,45,.3)",borderRadius:"20px",padding:"4px 10px",textDecoration:"none"}}><span className="live-dot" style={{width:"5px",height:"5px"}}/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#ff4d6d",letterSpacing:".06em"}}>{live} LIVE</span></Link>}
          <div style={{display:"flex",alignItems:"center",gap:"6px",background:"rgba(255,153,51,.08)",border:"1px solid rgba(255,153,51,.18)",borderRadius:"20px",padding:"5px 12px"}}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"rgba(255,153,51,.5)",letterSpacing:".1em"}}>IST</span>
            <ISTClock/>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div style={{display:"flex",overflowX:"auto",scrollbarWidth:"none",borderTop:"1px solid rgba(255,255,255,.05)"}} className="md:hidden">
        {NAV.map(item=>{
          const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
          return(
            <Link key={item.href} href={item.href} style={{
              flex:1,display:"flex",alignItems:"center",justifyContent:"center",
              padding:"9px 8px",whiteSpace:"nowrap",
              fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,letterSpacing:".1em",
              textDecoration:"none",flexShrink:0,minWidth:"60px",
              color:active?"#FF9933":"rgba(255,255,255,.35)",
              borderBottom:active?"2px solid #FF9933":"2px solid transparent",
              background:active?"rgba(255,153,51,.05)":"transparent",
            }}>{item.label}</Link>
          );
        })}
      </div>
    </header>
  );
}
