import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import EmailSubscribe from "@/components/EmailSubscribe";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title:"KickoffIST — FIFA World Cup 2026 Scores in IST | India",
  description:"FIFA World Cup 2026 live scores, results and standings in Indian Standard Time. Made in India 🇮🇳",
  themeColor:"#0D0D0D",manifest:"/manifest.json",
  appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"KickoffIST"},
  other:{"mobile-web-app-capable":"yes","apple-mobile-web-app-capable":"yes"},
  openGraph:{title:"KickoffIST — WC 2026 in IST 🇮🇳",description:"India's FIFA WC 2026 hub. All times in IST.",url:"https://kickoffist.com",siteName:"KickoffIST",type:"website"},
};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:5,themeColor:"#0D0D0D"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return(
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      </head>
      <body>
        {/* Stadium Wall side panels */}
        <div style={{position:"fixed",inset:0,zIndex:0,overflow:"hidden",pointerEvents:"none"}}>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:"calc((100vw - 1100px) / 2)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"52px",borderRight:"1px solid rgba(255,153,51,.08)"}}>
            {["FIFA WORLD CUP 2026","KICKOFFIST.COM","INDIA · IST","USA CANADA MEXICO"].map((t,i)=>(
              <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:i===0||i===3?"11px":"10px",fontWeight:800,letterSpacing:"5px",color:i%2===0?"rgba(255,153,51,.12)":"rgba(255,255,255,.06)",writingMode:"vertical-rl",textOrientation:"mixed",transform:"rotate(180deg)"}}>
                {t}
              </div>
            ))}
            <div style={{fontSize:"24px",opacity:.06}}>⚽</div>
          </div>
          <div style={{position:"absolute",right:0,top:0,bottom:0,width:"calc((100vw - 1100px) / 2)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"52px",borderLeft:"1px solid rgba(255,153,51,.08)"}}>
            {["FOOTBALL IN YOUR TIME","JUL 19 · METLIFE FINAL","ROUND OF 32","KICKOFFIST"].map((t,i)=>(
              <div key={i} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:i===0||i===1?"10px":"11px",fontWeight:800,letterSpacing:"5px",color:i%2===0?"rgba(255,255,255,.06)":"rgba(255,153,51,.12)",writingMode:"vertical-rl",textOrientation:"mixed"}}>
                {t}
              </div>
            ))}
            <div style={{fontSize:"24px",opacity:.06}}>🏆</div>
          </div>
        </div>

        <TopBar/>
        <main style={{maxWidth:"1100px",margin:"0 auto",padding:"14px 16px 80px",position:"relative",zIndex:1}}>
          {children}
        </main>

        <footer style={{borderTop:"2px solid #FF9933",background:"#0D0D0D",padding:"32px 16px 80px",position:"relative",zIndex:1}}>
          <div style={{maxWidth:"1100px",margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"28px",marginBottom:"24px"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px"}}>
                  <div style={{width:"40px",height:"40px",background:"#FF9933",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",color:"#0D0D0D",lineHeight:1}}>K</span>
                  </div>
                  <div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"4px",color:"#fff"}}>KICKOFF<span style={{color:"#FF9933"}}>IST</span></div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".1em"}}>Football In Your Time 🇮🇳</div>
                  </div>
                </div>
                <p style={{fontFamily:"'Inter',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.35)",lineHeight:1.7,marginBottom:"14px"}}>FIFA WC 2026 scores, results and standings — all in Indian Standard Time. Made in India 🇮🇳</p>
                <div style={{background:"rgba(255,153,51,.08)",border:"1px solid rgba(255,153,51,.18)",borderRadius:"8px",padding:"10px 14px"}}>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".1em",marginBottom:"3px"}}>📺 WATCH IN INDIA</div>
                  <div style={{fontSize:"11px",color:"rgba(255,255,255,.45)"}}>Zee5 — Exclusive FIFA WC 2026 rights in India · zee5.com</div>
                </div>
              </div>
              <EmailSubscribe/>
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:"14px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
              <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
                {[{h:"/today",l:"Home"},{h:"/results",l:"Results"},{h:"/world-cup",l:"Schedule"},{h:"/standings",l:"Tables"},{h:"/news",l:"IST Guide"},{h:"/about",l:"About"},{h:"/terms",l:"Terms"},{h:"/privacy",l:"Privacy"}].map(({h,l})=>(
                  <Link key={h} href={h} style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:600,color:"rgba(255,255,255,.25)",textDecoration:"none",letterSpacing:".04em"}}>{l}</Link>
                ))}
              </div>
              <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.18)",letterSpacing:".04em"}}>© 2026 KICKOFFIST.COM · NOT AFFILIATED WITH FIFA</p>
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
