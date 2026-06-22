import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import LiveTicker from "@/components/LiveTicker";
import Link from "next/link";
import PWAInstallBanner from "@/components/PWAInstallBanner";

const inter = Inter({ subsets:["latin"], weight:["400","500","600","700","800"] });

export const metadata: Metadata = {
  title: "KickoffIST — FIFA World Cup 2026 Live Scores in IST | India Football",
  description: "Live scores, results, standings and fixtures from FIFA World Cup 2026 in Indian Standard Time. India's #1 football calendar. Made in India 🇮🇳",
  themeColor: "#FF9933",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KickoffIST",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "KickoffIST",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <LiveTicker />
        <main style={{maxWidth:"1100px",margin:"0 auto",padding:"12px 12px 80px"}}>
          {children}
        </main>
        <footer style={{borderTop:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.4)",padding:"24px 16px 80px"}}>
          <div style={{maxWidth:"1100px",margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:"24px",marginBottom:"20px"}}>
              <div>
                <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"18px",fontWeight:"900",letterSpacing:"2px",color:"#fff",marginBottom:"8px"}}>
                  KICKOFF<span style={{color:"#FF9933"}}>IST</span>
                </div>
                <p style={{fontSize:"11px",color:"rgba(255,255,255,.25)",lineHeight:"1.7",marginBottom:"10px"}}>
                  India&apos;s Football Calendar — Live WC 2026 scores, results and fixtures in IST. Made in India 🇮🇳
                </p>
                <p style={{fontSize:"10px",color:"rgba(255,255,255,.2)"}}>
                  📧 <a href="mailto:admin@kickoffist.com" style={{color:"rgba(255,255,255,.3)"}}>admin@kickoffist.com</a>
                </p>
              </div>
              <div>
                <div style={{fontSize:"10px",fontWeight:"700",color:"rgba(255,255,255,.3)",letterSpacing:".1em",marginBottom:"10px",textTransform:"uppercase"}}>Navigate</div>
                {[
                  {href:"/today",    label:"🏠 Home"},
                  {href:"/live",     label:"🔴 Live Scores"},
                  {href:"/world-cup",label:"📅 WC 2026 Schedule"},
                  {href:"/standings",label:"📊 Group Standings"},
                  
                ].map(l=>(
                  <Link key={l.href} href={l.href} style={{display:"block",fontSize:"12px",color:"rgba(255,255,255,.25)",marginBottom:"6px",textDecoration:"none"}}>{l.label}</Link>
                ))}
              </div>
              <div>
                <div style={{fontSize:"10px",fontWeight:"700",color:"rgba(255,255,255,.3)",letterSpacing:".1em",marginBottom:"10px",textTransform:"uppercase"}}>Legal</div>
                {["/about","/terms","/privacy","/disclaimer"].map(h=>(
                  <Link key={h} href={h} style={{display:"block",fontSize:"12px",color:"rgba(255,255,255,.25)",marginBottom:"6px",textDecoration:"none",textTransform:"capitalize"}}>
                    {h.slice(1).charAt(0).toUpperCase()+h.slice(2)}
                  </Link>
                ))}
              </div>
            </div>
            <div style={{borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"14px",display:"flex",flexWrap:"wrap",gap:"8px",justifyContent:"space-between"}}>
              <p style={{fontSize:"10px",color:"rgba(255,255,255,.15)"}}>© 2026 KickoffIST.com — Made in India 🇮🇳 · Not affiliated with FIFA</p>
              <p style={{fontSize:"10px",color:"rgba(255,255,255,.1)"}}>Data: football-data.org · RapidAPI · Vercel</p>
            </div>
          </div>
        </footer>
        <PWAInstallBanner />
        <BottomNav />
        {/* PWA Service Worker */}
        <script dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').then(function(reg) {
                console.log('KickoffIST SW registered');
              }).catch(function(err) {
                console.log('SW registration failed:', err);
              });
            });
          }
        `}} />
      </body>
    </html>
  );
}
