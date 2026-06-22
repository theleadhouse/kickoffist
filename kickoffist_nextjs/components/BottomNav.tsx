"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NAV=[
  {href:"/today",    label:"Home",    icon:"⚡"},
  {href:"/live",     label:"Live",    icon:"🔴"},
  {href:"/results",  label:"Results", icon:"📋"},
  {href:"/standings",label:"Tables",  icon:"📊"},
  {href:"/news",     label:"News",    icon:"📰"},
];
export default function BottomNav(){
  const path=usePathname();
  return(
    <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,background:"rgba(6,10,6,.98)",backdropFilter:"blur(20px)",borderTop:"2px solid rgba(255,153,51,.12)",display:"flex"}} className="sm:hidden">
      {NAV.map(item=>{
        const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
        return(
          <Link key={item.href} href={item.href} style={{
            flex:1,display:"flex",flexDirection:"column",alignItems:"center",
            justifyContent:"center",gap:"2px",padding:"9px 4px",
            textDecoration:"none",
            color:active?"#FF9933":"rgba(255,255,255,.3)",
            position:"relative",transition:"color .15s",
          }}>
            {active&&<span style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"30px",height:"2px",background:"#FF9933",borderRadius:"0 0 3px 3px"}}/>}
            <span style={{fontSize:"18px",lineHeight:1}}>{item.icon}</span>
            <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:".04em"}}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
