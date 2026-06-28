"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NAV=[
  {href:"/today",    label:"Today",   icon:"⚡"},
  {href:"/results",  label:"Results", icon:"📋"},
  {href:"/world-cup",label:"Schedule",icon:"📅"},
  {href:"/standings",label:"Tables",  icon:"📊"},
  {href:"/news",     label:"Guide",   icon:"🇮🇳"},
];
export default function BottomNav(){
  const path=usePathname();
  return(
    <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,background:"rgba(255,255,255,.98)",backdropFilter:"blur(20px)",borderTop:"2px solid #0A0A0A",display:"flex",boxShadow:"0 -2px 20px rgba(0,0,0,.1)"}} className="sm:hidden">
      {NAV.map(item=>{
        const active=path===item.href||(item.href!=="/today"&&path?.startsWith(item.href));
        return(
          <Link key={item.href} href={item.href} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2px",padding:"8px 4px",textDecoration:"none",color:active?"#FF9933":"#666",position:"relative",transition:"color .15s"}}>
            {active&&<span style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"32px",height:"2px",background:"#FF9933"}}/>}
            <span style={{fontSize:"17px",lineHeight:1}}>{item.icon}</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:".06em",color:active?"#FF9933":"#666"}}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
