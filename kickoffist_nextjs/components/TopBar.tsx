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
      setT(`${String(ist.getHours()).padStart(2,"0")}:${String(ist.getMinutes()).padStart(2,"0")}:${String(ist.getSeconds()).padStart(2,"0")}`);
    };
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[]);
  return <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"2px",color:"#FF9933"}}>{t} <span style={{color:"rgba(0,0,0,.5)",fontSize:"12px"}}>IST</span></span>;
}

const NAV=[
  {href:"/today",    label:"HOME"},
  {href:"/results",  label:"RESULTS"},
  {href:"/world-cup",label:"BRACKET"},
  {href:"/standings",label:"TABLES"},
  {href:"/news",     label:"IST GUIDE"},
];

export default function TopBar(){
  const path=usePathname();
  const [live,setLive]=useState(0);
  useEffect(()=>{
    const p=async()=>{try{const r=await fetch("/api/live");const d=await r.json();setLive(d.matches?.length||0);}catch{}};
    p(); const id=setInterval(p,15000); return()=>clearInterval(id);
  },[]);

  return(
    <header style={{background:"#1B4332",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 20px rgba(0,0,0,.2)"}}>
      {/* Top strip — magazine masthead */}
      <div style={{background:"#FF9933",padding:"3px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"#000",letterSpacing:".14em"}}>🏆 FIFA WORLD CUP 2026 · ROUND OF 32 · LIVE IN IST</span>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(0,0,0,.6)",letterSpacing:".06em"}}>📺 ZEE5 INDIA · EXCLUSIVE</span>
      </div>

      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 16px",height:"52px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
        <Link href="/today" style={{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",flexShrink:0}}>
          <div style={{background:"#FF9933",width:"36px",height:"36px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,.3)"}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",color:"#1B4332",lineHeight:1}}>K</span>
          </div>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",letterSpacing:"4px",color:"#fff",lineHeight:1}}>
              KICKOFF<span style={{color:"#FF9933"}}>IST</span>
            </div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,255,255,.5)",letterSpacing:".1em",marginTop:"1px"}}>INDIA'S #1 WORLD CUP HUB 🇮🇳</div>
          </div>
        </Link>

        <nav style={{display:"flex",alignItems:"center",gap:"2px"}} className="hidden md:flex">
          {NAV.map(item=>{
            const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
            return(
              <Link key={item.href} href={item.href} style={{
                padding:"6px 14px",borderRadius:"4px",
                fontFamily:"'Barlow Condensed',sans-serif",
                fontSize:"13px",fontWeight:800,letterSpacing:".12em",
                textDecoration:"none",transition:"all .15s",
                background:active?"#FF9933":"transparent",
                color:active?"#000":"rgba(255,255,255,.7)",
              }}>{item.label}</Link>
            );
          })}
        </nav>

        <div style={{display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
          {live>0&&(
            <Link href="/today" style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(204,17,0,.9)",borderRadius:"4px",padding:"4px 10px",textDecoration:"none"}}>
              <span className="live-dot" style={{background:"#fff",width:"5px",height:"5px"}}/>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#fff",letterSpacing:".08em"}}>{live} LIVE</span>
            </Link>
          )}
          <div style={{background:"rgba(0,0,0,.25)",borderRadius:"4px",padding:"5px 12px"}}>
            <ISTClock/>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",overflowX:"auto",scrollbarWidth:"none",borderTop:"1px solid rgba(255,255,255,.1)",padding:"0 8px"}} className="md:hidden">
        {NAV.map(item=>{
          const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
          return(
            <Link key={item.href} href={item.href} style={{
              padding:"8px 16px",whiteSpace:"nowrap",
              fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,letterSpacing:".1em",
              textDecoration:"none",flexShrink:0,
              color:active?"#FF9933":"rgba(255,255,255,.55)",
              borderBottom:active?"2px solid #FF9933":"2px solid transparent",
            }}>{item.label}</Link>
          );
        })}
      </div>
    </header>
  );
}
