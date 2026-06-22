import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import LiveTicker from "@/components/LiveTicker";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KickoffIST — FIFA World Cup 2026 Live Scores & Results in IST",
  description: "Live scores, results, standings and news from FIFA World Cup 2026 in Indian Standard Time. Messi's record, today's matches, all IST times. Made in India 🇮🇳",
  themeColor:"#FF9933",
  manifest:"/manifest.json",
  appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"KickoffIST"},
  other:{"mobile-web-app-capable":"yes","apple-mobile-web-app-capable":"yes","apple-mobile-web-app-title":"KickoffIST"},
  openGraph:{
    title:"KickoffIST — WC 2026 Live in IST 🇮🇳",
    description:"India's FIFA World Cup 2026 hub. Live scores, results, standings — all in IST.",
    url:"https://kickoffist.com",
    siteName:"KickoffIST",
    type:"website",
  },
};

export const viewport: Viewport = {
  width:"device-width",initialScale:1,maximumScale:5,themeColor:"#FF9933",
};

const FOOTER_LINKS = [
  {href:"/today",    label:"Home"},
  {href:"/live",     label:"Live Scores"},
  {href:"/results",  label:"All Results"},
  {href:"/world-cup",label:"Schedule"},
  {href:"/standings",label:"Tables"},
  {href:"/news",     label:"News"},
  {href:"/about",    label:"About"},
  {href:"/terms",    label:"Terms"},
  {href:"/privacy",  label:"Privacy"},
  {href:"/disclaimer",label:"Disclaimer"},
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return(
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <TopBar/>
        <LiveTicker/>
        <main style={{maxWidth:"1100px",margin:"0 auto",padding:"14px 12px 80px"}}>
          {children}
        </main>

        <footer style={{borderTop:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.5)",padding:"28px 16px 80px"}}>
          <div style={{maxWidth:"1100px",margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
              <div style={{width:"36px",height:"36px",borderRadius:"8px",overflow:"hidden",display:"flex",flexDirection:"column",flexShrink:0}}>
                <div style={{flex:1,background:"#FF9933"}}/>
                <div style={{flex:1,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"14px",fontWeight:900,color:"#000080"}}>K</span>
                </div>
                <div style={{flex:1,background:"#138808"}}/>
              </div>
              <div>
                <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"18px",fontWeight:900,letterSpacing:"2px",color:"#fff"}}>KICKOFF<span style={{color:"#FF9933"}}>IST</span></div>
                <div style={{fontSize:"9px",color:"rgba(255,255,255,.25)"}}>India's Football Calendar 🇮🇳</div>
              </div>
            </div>
            <p style={{fontSize:"12px",color:"rgba(255,255,255,.25)",lineHeight:1.7,maxWidth:"420px",marginBottom:"16px"}}>
              Live FIFA World Cup 2026 scores, results, standings and news — all in Indian Standard Time. Free. No ads. Made in India. 🇮🇳
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px 16px",marginBottom:"16px"}}>
              {FOOTER_LINKS.map(l=>(
                <Link key={l.href} href={l.href} style={{fontSize:"12px",color:"rgba(255,255,255,.25)",textDecoration:"none",transition:"color .15s"}}>{l.label}</Link>
              ))}
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"12px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"6px"}}>
              <p style={{fontSize:"10px",color:"rgba(255,255,255,.15)"}}>© 2026 KickoffIST.com · Not affiliated with FIFA · Information only</p>
              <p style={{fontSize:"10px",color:"rgba(255,255,255,.1)"}}>📧 admin@kickoffist.com</p>
            </div>
          </div>
        </footer>

        <PWAInstallBanner/>
        <BottomNav/>
        <script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js');});}`}}/>
      </body>
    </html>
  );
}
