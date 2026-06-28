import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import EmailSubscribe from "@/components/EmailSubscribe";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title:"KickoffIST — FIFA World Cup 2026 in IST | India",
  description:"World Cup 2026 Round of 32 scores, results and schedule in Indian Standard Time. Made for India 🇮🇳",
  themeColor:"#FF9933",manifest:"/manifest.json",
  appleWebApp:{capable:true,statusBarStyle:"default",title:"KickoffIST"},
  other:{"mobile-web-app-capable":"yes"},
  openGraph:{title:"KickoffIST 🇮🇳 — WC 2026 in IST",description:"India's FIFA WC 2026 hub.",url:"https://kickoffist.com",siteName:"KickoffIST",type:"website"},
};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:5,themeColor:"#FF9933"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body style={{background:"#FAFAF8"}}>
        <TopBar/>
        <main style={{maxWidth:"1200px",margin:"0 auto",padding:"16px 16px 80px",position:"relative",zIndex:1}}>
          {children}
        </main>

        <footer style={{borderTop:"3px solid #0A0A0A",background:"#0A0A0A",padding:"36px 20px 80px",position:"relative",zIndex:1}}>
          <div style={{maxWidth:"1200px",margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"32px",marginBottom:"24px"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
                  <div style={{width:"40px",height:"40px",background:"#FF9933",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",color:"#0A0A0A",lineHeight:1}}>K</span>
                  </div>
                  <div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"4px",color:"#fff"}}>KICKOFF<span style={{color:"#FF9933"}}>IST</span></div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".1em"}}>Football In Your Time 🇮🇳</div>
                  </div>
                </div>
                <p style={{fontFamily:"'Inter',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.4)",lineHeight:1.7,marginBottom:"14px"}}>
                  FIFA WC 2026 Round of 32 scores, results and schedule — all in Indian Standard Time. Made for Indian football fans 🇮🇳
                </p>
                <div style={{background:"rgba(255,153,51,.1)",border:"1px solid rgba(255,153,51,.2)",borderRadius:"8px",padding:"10px 14px"}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".1em",marginBottom:"3px"}}>📺 WATCH IN INDIA</div>
                  <div style={{fontSize:"11px",color:"rgba(255,255,255,.45)"}}>Zee5 — Exclusive FIFA WC 2026 rights in India</div>
                </div>
              </div>
              <EmailSubscribe/>
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.1)",paddingTop:"14px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
              <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
                {[{h:"/today",l:"Home"},{h:"/results",l:"Results"},{h:"/world-cup",l:"Schedule"},{h:"/standings",l:"Tables"},{h:"/news",l:"IST Guide"},{h:"/about",l:"About"},{h:"/terms",l:"Terms"},{h:"/privacy",l:"Privacy"}].map(({h,l})=>(
                  <Link key={h} href={h} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.3)",textDecoration:"none"}}>{l}</Link>
                ))}
              </div>
              <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.2)"}}>© 2026 KickoffIST.com · Not affiliated with FIFA</p>
            </div>
          </div>
        </footer>
        <PWAInstallBanner/>
        <BottomNav/>
        <script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'));}`}}/>
      </body>
    </html>
  );
}
