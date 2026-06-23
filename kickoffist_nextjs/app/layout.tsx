import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import LiveTicker from "@/components/LiveTicker";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KickoffIST — FIFA World Cup 2026 Live Scores in IST | India Football",
  description: "Live scores, results, standings and news from FIFA World Cup 2026 in Indian Standard Time. Messi record, today's matches, all IST times. Made in India 🇮🇳",
  themeColor: "#0A1628",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "KickoffIST" },
  other: { "mobile-web-app-capable": "yes", "apple-mobile-web-app-capable": "yes" },
  openGraph: {
    title: "KickoffIST — World Cup 2026 in IST 🇮🇳",
    description: "India's FIFA World Cup hub. Live scores, results, standings — all in Indian Standard Time.",
    url: "https://kickoffist.com", siteName: "KickoffIST", type: "website",
  },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, themeColor: "#0A1628" };

const LINKS = ["/today","/results","/world-cup","/standings","/news","/about","/terms","/privacy","/disclaimer"];
const LABELS: Record<string,string> = { "/today":"Home","/results":"Results","/world-cup":"Schedule","/standings":"Tables","/news":"News","/about":"About","/terms":"Terms","/privacy":"Privacy","/disclaimer":"Disclaimer" };

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
        <LiveTicker/>
        <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "14px 12px 80px" }}>
          {children}
        </main>
        <footer style={{ borderTop: "1px solid rgba(255,153,51,.1)", background: "rgba(6,12,22,.8)", padding: "28px 16px 80px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "9px", overflow: "hidden", display: "flex", flexDirection: "column", flexShrink: 0 }}>
                <div style={{ flex: 1, background: "#FF9933" }} />
                <div style={{ flex: 1, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "15px", color: "#000080" }}>K</span>
                </div>
                <div style={{ flex: 1, background: "#138808" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: "2px", color: "#fff" }}>KICKOFF<span style={{ color: "#FF9933" }}>IST</span></div>
                <div style={{ fontSize: "9px", color: "rgba(200,212,232,.3)" }}>Football In Your Time 🇮🇳</div>
              </div>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(200,212,232,.3)", lineHeight: 1.7, maxWidth: "420px", marginBottom: "14px" }}>
              Live FIFA World Cup 2026 scores, results, standings — all in Indian Standard Time. Free, no ads. Made in India 🇮🇳
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", marginBottom: "14px" }}>
              {LINKS.map(l => (
                <Link key={l} href={l} style={{ fontSize: "12px", color: "rgba(200,212,232,.28)", textDecoration: "none" }}>{LABELS[l]}</Link>
              ))}
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: "12px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
              <p style={{ fontSize: "10px", color: "rgba(200,212,232,.2)" }}>© 2026 KickoffIST.com · Not affiliated with FIFA · Information only</p>
              <p style={{ fontSize: "10px", color: "rgba(200,212,232,.15)" }}>📧 admin@kickoffist.com</p>
            </div>
          </div>
        </footer>
        <PWAInstallBanner/>
        <BottomNav/>
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'));}` }} />
      </body>
    </html>
  );
}
