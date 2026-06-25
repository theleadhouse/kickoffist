import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import EmailSubscribe from "@/components/EmailSubscribe";
import Link from "next/link";

export const metadata: Metadata = {
  title:"KickoffIST — FIFA World Cup 2026 Live Scores in IST | India",
  description:"Live World Cup 2026 scores, results, standings in Indian Standard Time. Set match alarms, squad alerts. Made in India 🇮🇳",
  themeColor:"#111318",manifest:"/manifest.json",
  appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"KickoffIST"},
  other:{"mobile-web-app-capable":"yes","apple-mobile-web-app-capable":"yes"},
  openGraph:{title:"KickoffIST — WC 2026 in IST 🇮🇳",description:"India's FIFA World Cup hub. Live scores, results, standings — all in IST.",url:"https://kickoffist.com",siteName:"KickoffIST",type:"website"},
};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:5,themeColor:"#111318"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Teko:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body>
        {/* FOOTBALL STADIUM SIDE PANELS - fills empty black space on desktop */}
        <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
          {/* Left panel */}
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:"calc((100vw - 1100px) / 2)",background:"linear-gradient(180deg,#0a0f0a 0%,#111318 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"40px",opacity:.7}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"13px",letterSpacing:"4px",color:"rgba(255,153,51,.2)",writingMode:"vertical-rl",textOrientation:"mixed",transform:"rotate(180deg)"}}>FIFA WORLD CUP 2026</div>
            <div style={{fontSize:"32px",opacity:.15}}>⚽</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"13px",letterSpacing:"4px",color:"rgba(255,255,255,.1)",writingMode:"vertical-rl",textOrientation:"mixed",transform:"rotate(180deg)"}}>KICKOFFIST.COM</div>
            <div style={{fontSize:"24px",opacity:.1}}>🏆</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"11px",letterSpacing:"3px",color:"rgba(255,153,51,.15)",writingMode:"vertical-rl",textOrientation:"mixed",transform:"rotate(180deg)"}}>INDIA · IST</div>
          </div>
          {/* Right panel */}
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:"calc((100vw - 1100px) / 2)",background:"linear-gradient(180deg,#0a0f0a 0%,#111318 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"40px",opacity:.7}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"11px",letterSpacing:"3px",color:"rgba(255,153,51,.15)",writingMode:"vertical-rl",textOrientation:"mixed"}}>INDIA · IST</div>
            <div style={{fontSize:"24px",opacity:.1}}>🏅</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"13px",letterSpacing:"4px",color:"rgba(255,255,255,.1)",writingMode:"vertical-rl",textOrientation:"mixed"}}>FOOTBALL IN YOUR TIME</div>
            <div style={{fontSize:"32px",opacity:.15}}>⚽</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"13px",letterSpacing:"4px",color:"rgba(255,153,51,.2)",writingMode:"vertical-rl",textOrientation:"mixed"}}>USA · CANADA · MEXICO</div>
          </div>
          {/* Subtle left border glow */}
          <div style={{position:"absolute",left:"calc((100vw - 1100px) / 2)",top:0,bottom:0,width:"1px",background:"linear-gradient(180deg,transparent,rgba(255,153,51,.15),rgba(255,153,51,.08),transparent)"}}/>
          <div style={{position:"absolute",right:"calc((100vw - 1100px) / 2)",top:0,bottom:0,width:"1px",background:"linear-gradient(180deg,transparent,rgba(255,153,51,.15),rgba(255,153,51,.08),transparent)"}}/>
        </div>

        <TopBar/>
        <main style={{maxWidth:"1100px",margin:"0 auto",padding:"14px 16px 80px",position:"relative",zIndex:1}}>
          {children}
        </main>

        <footer style={{borderTop:"1px solid rgba(255,153,51,.12)",background:"rgba(10,12,16,.95)",padding:"28px 16px 80px",position:"relative",zIndex:1}}>
          <div style={{maxWidth:"1100px",margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"24px"}} className="sm:grid-cols-2">
              <div>
                <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                  <div style={{width:"36px",height:"36px",borderRadius:"9px",background:"linear-gradient(135deg,#FF9933,#cc7a00)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:"19px"}}>⚽</span>
                  </div>
                  <div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"2px",color:"#fff"}}>KICKOFF<span style={{color:"#FF9933"}}>IST</span></div>
                    <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)"}}>Football In Your Time 🇮🇳</div>
                  </div>
                </div>
                <p style={{fontSize:"12px",color:"rgba(255,255,255,.3)",lineHeight:1.7,marginBottom:"12px"}}>Live FIFA World Cup 2026 scores, results and standings — all in Indian Standard Time. Made in India 🇮🇳</p>
                <div style={{background:"rgba(255,153,51,.05)",border:"1px solid rgba(255,153,51,.1)",borderRadius:"8px",padding:"8px 12px"}}>
                  <div style={{fontSize:"10px",color:"#FF9933",fontFamily:"'Teko',sans-serif",fontWeight:600,letterSpacing:".08em",marginBottom:"2px"}}>📺 WATCH IN INDIA</div>
                  <div style={{fontSize:"11px",color:"rgba(255,255,255,.4)"}}>Zee5 — Exclusive FIFA WC 2026 rights in India</div>
                </div>
              </div>
              <div>
                <EmailSubscribe/>
              </div>
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"12px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
              <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
                {[{href:"/today",l:"Home"},{href:"/results",l:"Results"},{href:"/world-cup",l:"Schedule"},{href:"/standings",l:"Tables"},{href:"/news",l:"IST Guide"},{href:"/about",l:"About"},{href:"/terms",l:"Terms"},{href:"/privacy",l:"Privacy"}].map(({href,l})=>(
                  <Link key={href} href={href} style={{fontSize:"12px",color:"rgba(255,255,255,.25)",textDecoration:"none"}}>{l}</Link>
                ))}
              </div>
              <p style={{fontSize:"10px",color:"rgba(255,255,255,.18)"}}>© 2026 KickoffIST.com · Not affiliated with FIFA</p>
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
