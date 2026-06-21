"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NAV=[
  {href:"/today",     label:"Home",     icon:"⚡"},
  {href:"/live",      label:"Live",     icon:"🔴"},
  {href:"/world-cup", label:"Schedule", icon:"📅"},
  {href:"/standings", label:"Tables",   icon:"📊"},
  {href:"/predict",   label:"Predict",  icon:"🔮"},
];
export default function BottomNav(){
  const path=usePathname();
  return(
    <nav style={{position:"fixed",bottom:0,left:0,right:0,zIndex:50,background:"rgba(10,10,15,.98)",backdropFilter:"blur(20px)",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex"}} className="sm:hidden">
      {NAV.map(item=>{
        const active=path?.startsWith(item.href);
        return(
          <Link key={item.href} href={item.href} style={{
            flex:1,display:"flex",flexDirection:"column",alignItems:"center",
            justifyContent:"center",gap:"2px",padding:"10px 4px",
            textDecoration:"none",
            color:active?"#FF9933":"rgba(255,255,255,.3)",
            position:"relative",transition:"color .15s",
          }}>
            {active&&<span style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"28px",height:"2px",background:"#FF9933",borderRadius:"0 0 2px 2px"}}/>}
            <span style={{fontSize:"18px",lineHeight:1}}>{item.icon}</span>
            <span style={{fontSize:"9px",fontWeight:"700",letterSpacing:".04em"}}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
