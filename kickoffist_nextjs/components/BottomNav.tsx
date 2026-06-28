"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NAV=[
  {href:"/today",    label:"Live",    icon:"⚡"},
  {href:"/results",  label:"Results", icon:"📋"},
  {href:"/world-cup",label:"Schedule",icon:"📅"},
  {href:"/standings",label:"Tables",  icon:"📊"},
  {href:"/news",     label:"Guide",   icon:"🇮🇳"},
];
export default function BottomNav(){
  const path=usePathname();
  return(
    <nav className="glass sm:hidden" style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,borderTop:"1px solid rgba(255,153,51,.2)",display:"flex"}}>
      {NAV.map(item=>{
        const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
        return(
          <Link key={item.href} href={item.href} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2px",padding:"9px 4px",textDecoration:"none",color:active?"#FF9933":"rgba(255,255,255,.35)",position:"relative",transition:"color .15s"}}>
            {active&&<span style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"32px",height:"2px",background:"#FF9933"}}/>}
            <span style={{fontSize:"17px",lineHeight:1}}>{item.icon}</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:".04em"}}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
