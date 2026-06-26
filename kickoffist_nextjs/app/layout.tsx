import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import EmailSubscribe from "@/components/EmailSubscribe";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title:"KickoffIST — FIFA World Cup 2026 Live Scores in IST | India",
  description:"FIFA World Cup 2026 scores, results, standings in Indian Standard Time. Set alarms, match info, IST guide. Made in India 🇮🇳",
  themeColor:"#0B1426",manifest:"/manifest.json",
  appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"KickoffIST"},
  other:{"mobile-web-app-capable":"yes","apple-mobile-web-app-capable":"yes"},
  openGraph:{title:"KickoffIST — WC 2026 in IST 🇮🇳",description:"India's FIFA WC 2026 hub. All times in IST.",url:"https://kickoffist.com",siteName:"KickoffIST",type:"website"},
};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:5,themeColor:"#0B1426"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Teko:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body>
        {/* Stadium side panels — fills empty black space on desktop */}
        <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:"calc((100vw - 1100px) / 2)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"48px"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"12px",letterSpacing:"5px",color:"rgba(255,153,51,.15)",writingMode:"vertical-rl",textOrientation:"mixed",transform:"rotate(180deg)"}}>FIFA WORLD CUP 2026</div>
            <div style={{fontSize:"28px",opacity:.08}}>⚽</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"11px",letterSpacing:"4px",color:"rgba(255,255,255,.08)",writingMode:"vertical-rl",textOrientation:"mixed",transform:"rotate(180deg)"}}>KICKOFFIST.COM</div>
            <div style={{fontSize:"22px",opacity:.06}}>🏆</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"11px",letterSpacing:"4px",color:"rgba(255,153,51,.12)",writingMode:"vertical-rl",textOrientation:"mixed",transform:"rotate(180deg)"}}>INDIA · IST</div>
          </div>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:"calc((100vw - 1100px) / 2)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"48px"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"11px",letterSpacing:"4px",color:"rgba(255,153,51,.12)",writingMode:"vertical-rl"}}>INDIA · IST</div>
            <div style={{fontSize:"22px",opacity:.06}}>🏅</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"11px",letterSpacing:"4px",color:"rgba(255,255,255,.08)",writingMode:"vertical-rl"}}>FOOTBALL IN YOUR TIME</div>
            <div style={{fontSize:"28px",opacity:.08}}>⚽</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"12px",letterSpacing:"5px",color:"rgba(255,153,51,.15)",writingMode:"vertical-rl"}}>USA · CANADA · MEXICO</div>
          </div>
          <div style={{position:"absolute",left:"calc((100vw - 1100px) / 2)",top:0,bottom:0,width:"1px",background:"linear-gradient(180deg,transparent,rgba(255,153,51,.12),transparent)"}}/>
          <div style={{position:"absolute",right:"calc((100vw - 1100px) / 2)",top:0,bottom:0,width:"1px",background:"linear-gradient(180deg,transparent,rgba(255,153,51,.12),transparent)"}}/>
        </div>

        <TopBar/>
        <main style={{maxWidth:"1100px",margin:"0 auto",padding:"14px 16px 80px",position:"relative",zIndex:1}}>
          {children}
        </main>

        <footer style={{borderTop:"1px solid rgba(255,153,51,.12)",background:"rgba(8,14,28,.96)",padding:"28px 16px 80px",position:"relative",zIndex:1}}>
          <div style={{maxWidth:"1100px",margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"20px"}}>
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
                <p style={{fontSize:"12px",color:"rgba(255,255,255,.3)",lineHeight:1.7,marginBottom:"12px"}}>FIFA WC 2026 scores, results and standings in Indian Standard Time. Made in India 🇮🇳</p>
                <div style={{background:"rgba(255,153,51,.05)",border:"1px solid rgba(255,153,51,.1)",borderRadius:"8px",padding:"8px 12px"}}>
                  <div style={{fontSize:"10px",color:"#FF9933",fontFamily:"'Teko',sans-serif",fontWeight:600,letterSpacing:".08em",marginBottom:"2px"}}>📺 WATCH IN INDIA</div>
                  <div style={{fontSize:"11px",color:"rgba(255,255,255,.4)"}}>Zee5 — Exclusive FIFA WC 2026 rights in India</div>
                </div>
              </div>
              <EmailSubscribe/>
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"12px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
              <div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
                {[{h:"/today",l:"Home"},{h:"/results",l:"Results"},{h:"/world-cup",l:"Schedule"},{h:"/standings",l:"Tables"},{h:"/news",l:"IST Guide"},{h:"/about",l:"About"},{h:"/terms",l:"Terms"},{h:"/privacy",l:"Privacy"}].map(({h,l})=>(
                  <Link key={h} href={h} style={{fontSize:"12px",color:"rgba(255,255,255,.25)",textDecoration:"none"}}>{l}</Link>
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
