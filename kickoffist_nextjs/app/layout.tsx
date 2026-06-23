import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KickoffIST — FIFA World Cup 2026 Live Scores in IST | India Football",
  description: "Live World Cup 2026 scores, results, standings and news in Indian Standard Time. Set match alarms, predict winners, share results. Made in India 🇮🇳",
  themeColor: "#0A1628",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "KickoffIST" },
  other: { "mobile-web-app-capable": "yes", "apple-mobile-web-app-capable": "yes" },
  openGraph: {
    title: "KickoffIST — World Cup 2026 in IST 🇮🇳",
    description: "India's FIFA World Cup hub. Live scores, results, standings — all in IST. Set alarms, predict matches.",
    url: "https://kickoffist.com", siteName: "KickoffIST", type: "website",
  },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#0A1628" };

const NAV_LINKS = [
  {href:"/today",    label:"Home"},
  {href:"/results",  label:"Results"},
  {href:"/world-cup",label:"Schedule"},
  {href:"/standings",label:"Tables"},
  {href:"/news",     label:"News"},
  {href:"/about",    label:"About"},
  {href:"/terms",    label:"Terms"},
  {href:"/privacy",  label:"Privacy"},
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Teko:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <TopBar/>
        {/* NO TICKER — space saved, info in News tab instead */}
        <main style={{ maxWidth:"1100px", margin:"0 auto", padding:"14px 12px 80px" }}>
          {children}
        </main>
        <footer style={{ borderTop:"1px solid rgba(255,153,51,.1)", background:"rgba(6,12,22,.9)", padding:"28px 16px 80px" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
              <div style={{ width:"38px", height:"38px", borderRadius:"9px", overflow:"hidden", display:"flex", flexDirection:"column", flexShrink:0 }}>
                <div style={{ flex:1, background:"#FF9933" }}/>
                <div style={{ flex:1, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", color:"#000080" }}>K</span>
                </div>
                <div style={{ flex:1, background:"#138808" }}/>
              </div>
              <div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:"2px", color:"#fff" }}>KICKOFF<span style={{color:"#FF9933"}}>IST</span></div>
                <div style={{ fontSize:"9px", color:"rgba(200,212,232,.3)" }}>Football In Your Time 🇮🇳</div>
              </div>
            </div>
            <p style={{ fontSize:"12px", color:"rgba(200,212,232,.3)", lineHeight:1.7, maxWidth:"440px", marginBottom:"14px" }}>
              Live FIFA World Cup 2026 scores, results, standings — all in Indian Standard Time. Set match alarms, predict winners, share results. Made in India 🇮🇳
            </p>
            <div style={{ background:"rgba(255,153,51,.05)", border:"1px solid rgba(255,153,51,.1)", borderRadius:"8px", padding:"10px 14px", marginBottom:"14px" }}>
              <div style={{ fontSize:"11px", color:"#FF9933", fontFamily:"'Teko',sans-serif", fontWeight:600, letterSpacing:".08em", marginBottom:"4px" }}>📺 WATCH WORLD CUP 2026 IN INDIA</div>
              <div style={{ fontSize:"11px", color:"rgba(200,212,232,.5)" }}>
                <strong style={{color:"rgba(200,212,232,.8)"}}>Zee5</strong> holds exclusive broadcast rights for FIFA World Cup 2026 in India. Stream on <strong style={{color:"rgba(200,212,232,.8)"}}>zee5.com</strong> or the Zee5 app.
              </div>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px 18px", marginBottom:"14px" }}>
              {NAV_LINKS.map(l=>(
                <Link key={l.href} href={l.href} style={{fontSize:"12px",color:"rgba(200,212,232,.28)",textDecoration:"none"}}>{l.label}</Link>
              ))}
            </div>
            <div style={{ borderTop:"1px solid rgba(255,255,255,.05)", paddingTop:"12px", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"6px" }}>
              <p style={{ fontSize:"10px", color:"rgba(200,212,232,.2)" }}>© 2026 KickoffIST.com · Not affiliated with FIFA · Information only</p>
              <p style={{ fontSize:"10px", color:"rgba(200,212,232,.15)" }}>📧 admin@kickoffist.com</p>
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
