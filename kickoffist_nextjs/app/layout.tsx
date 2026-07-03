import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import EmailSubscribe from "@/components/EmailSubscribe";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import Link from "next/link";
export const metadata: Metadata = {
  title:"KickoffIST — FIFA World Cup 2026 Round of 32 & 16 in IST | India",
  description:"FIFA WC 2026 Round of 32 and 16 live scores, results and bracket in Indian Standard Time. Made for India 🇮🇳",
  themeColor:"#080808",manifest:"/manifest.json",
  appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"KickoffIST"},
  other:{"mobile-web-app-capable":"yes"},
};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:5,themeColor:"#080808"};
export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en"><head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    </head>
    <body>
      <TopBar/>
      <main style={{maxWidth:"1280px",margin:"0 auto",padding:"14px 14px 80px",position:"relative",zIndex:1}}>{children}</main>
      <footer style={{borderTop:"1px solid rgba(255,153,51,.15)",background:"rgba(0,0,0,.6)",padding:"28px 16px 80px",position:"relative",zIndex:1}}>
        <div style={{maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"20px"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                <div style={{width:"34px",height:"34px",background:"#FF9933",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",color:"#080808",lineHeight:1}}>K</span></div>
                <div><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"19px",letterSpacing:"3px",color:"#fff"}}>KICKOFF<span style={{color:"#FF9933"}}>IST</span></div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".1em"}}>Football In Your Time 🇮🇳</div></div>
              </div>
              <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.35)",lineHeight:1.7,marginBottom:"12px"}}>FIFA WC 2026 Round of 32 & 16 scores, results and bracket in IST 🇮🇳</p>
              <div style={{background:"rgba(255,153,51,.07)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"8px",padding:"8px 12px"}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".1em",marginBottom:"2px"}}>📺 WATCH IN INDIA</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.4)"}}>Zee5 — Exclusive FIFA WC 2026 rights · zee5.com</div>
              </div>
            </div>
            <EmailSubscribe/>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:"12px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
            <div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
              {[{h:"/today",l:"Home"},{h:"/results",l:"Results"},{h:"/world-cup",l:"Bracket"},{h:"/standings",l:"Tables"},{h:"/news",l:"IST Guide"},{h:"/about",l:"About"},{h:"/terms",l:"Terms"},{h:"/privacy",l:"Privacy"}].map(({h,l})=>(
                <Link key={h} href={h} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.25)",textDecoration:"none"}}>{l}</Link>
              ))}
            </div>
            <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.15)"}}>© 2026 KickoffIST.com · Not affiliated with FIFA</p>
          </div>
        </div>
      </footer>
      <PWAInstallBanner/><BottomNav/>
      <script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'));}`}}/>
    </body></html>
  );
}
