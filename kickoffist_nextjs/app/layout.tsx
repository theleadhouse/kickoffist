import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title:"KickoffIST — FIFA World Cup 2026 Live Scores in IST | India",
  description:"Live World Cup 2026 scores, results, standings in Indian Standard Time. Set match alarms, share results. Made in India 🇮🇳",
  themeColor:"#111318",manifest:"/manifest.json",
  appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"KickoffIST"},
  other:{"mobile-web-app-capable":"yes","apple-mobile-web-app-capable":"yes"},
  openGraph:{title:"KickoffIST — WC 2026 in IST 🇮🇳",description:"India's FIFA World Cup hub. Live scores, results, standings — all in IST.",url:"https://kickoffist.com",siteName:"KickoffIST",type:"website"},
};
export const viewport: Viewport = {width:"device-width",initialScale:1,maximumScale:5,themeColor:"#111318"};

const LINKS=["/today","/results","/world-cup","/standings","/news","/about","/terms","/privacy"];
const LABELS:Record<string,string>={"/today":"Home","/results":"Results","/world-cup":"Schedule","/standings":"Tables","/news":"News","/about":"About","/terms":"Terms","/privacy":"Privacy"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Teko:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <TopBar/>
        <main style={{maxWidth:"1100px",margin:"0 auto",padding:"14px 16px 80px"}}>
          {children}
        </main>
        <footer style={{borderTop:"1px solid rgba(255,153,51,.12)",background:"rgba(10,12,16,.95)",padding:"28px 16px 80px"}}>
          <div style={{maxWidth:"1100px",margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"}}>
              <div style={{width:"36px",height:"36px",borderRadius:"9px",background:"linear-gradient(135deg,#FF9933,#cc7a00)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:"19px"}}>⚽</span>
              </div>
              <div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"2px"}}>
                  <span style={{color:"#FF9933"}}>KICK</span>
                  <span style={{color:"#fff"}}>OFF</span>
                  <span style={{color:"#FF9933"}}>IST</span>
                </div>
                <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)"}}>Football In Your Time 🇮🇳</div>
              </div>
            </div>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,.3)",lineHeight:1.7,maxWidth:"420px",marginBottom:"14px"}}>
              Live FIFA World Cup 2026 scores, results, standings — all in Indian Standard Time. Made in India 🇮🇳
            </p>
            <div style={{background:"rgba(255,153,51,.05)",border:"1px solid rgba(255,153,51,.1)",borderRadius:"8px",padding:"10px 14px",marginBottom:"14px"}}>
              <div style={{fontSize:"11px",color:"#FF9933",fontFamily:"'Teko',sans-serif",fontWeight:600,letterSpacing:".08em",marginBottom:"3px"}}>📺 WATCH WC 2026 IN INDIA</div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,.4)"}}>
                <strong style={{color:"rgba(255,255,255,.7)"}}>Zee5</strong> holds exclusive FIFA WC 2026 broadcast rights in India. Stream on <strong style={{color:"rgba(255,255,255,.7)"}}>zee5.com</strong> or the Zee5 app.
              </div>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px 18px",marginBottom:"14px"}}>
              {LINKS.map(l=><Link key={l} href={l} style={{fontSize:"12px",color:"rgba(255,255,255,.25)",textDecoration:"none"}}>{LABELS[l]}</Link>)}
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"12px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
              <p style={{fontSize:"10px",color:"rgba(255,255,255,.18)"}}>© 2026 KickoffIST.com · Not affiliated with FIFA</p>
              <p style={{fontSize:"10px",color:"rgba(255,255,255,.15)"}}>📧 admin@kickoffist.com</p>
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
