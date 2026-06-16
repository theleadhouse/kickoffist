import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import LiveTicker from "@/components/LiveTicker";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: ["400","500","600","700","800"] });

export const metadata: Metadata = {
  title: "KickoffIST — Live Football Scores in IST | FIFA World Cup 2026",
  description: "Live scores, fixtures, results and standings from FIFA World Cup 2026 in Indian Standard Time. Made in India for Indian football fans.",
  themeColor: "#0f1923",
  keywords: "FIFA World Cup 2026 IST, football India, live scores IST, kickoffist",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <div className="max-w-[1100px] mx-auto px-3 pt-2 pb-24">
          <LiveTicker />
          {children}
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/8 bg-[#0a1118] mt-6 pb-20 sm:pb-6">
          <div className="max-w-[1100px] mx-auto px-3 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm">K</div>
                  <span className="text-sm font-black text-white">KICKOFF<span className="text-blue-400">IST</span></span>
                </div>
                <p className="text-[11px] text-white/30 leading-relaxed">
                  India&apos;s Football Calendar — Live scores, fixtures and standings in Indian Standard Time. Made in India 🇮🇳 for Indian football fans.
                </p>
                <p className="text-[10px] text-white/20 mt-2">
                  📧 <a href="mailto:admin@kickoffist.com" className="hover:text-white/50 transition-colors">admin@kickoffist.com</a>
                </p>
              </div>

              {/* Competitions */}
              <div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Competitions</div>
                <div className="space-y-1.5">
                  {[
                    { href:"/world-cup", label:"🏆 FIFA World Cup 2026" },
                    { href:"/standings", label:"📊 Group Standings" },
                    { href:"/live",      label:"🔴 Live Scores" },
                    { href:"/predict",   label:"🔮 AI Predictor" },
                  ].map(l => (
                    <Link key={l.href} href={l.href} className="block text-[11px] text-white/30 hover:text-white/60 transition-colors">{l.label}</Link>
                  ))}
                  <span className="block text-[11px] text-white/15">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League — Coming Aug 2026</span>
                  <span className="block text-[11px] text-white/15">🇮🇳 ISL — Coming Oct 2026</span>
                </div>
              </div>

              {/* Legal */}
              <div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Legal & Info</div>
                <div className="space-y-1.5">
                  {[
                    { href:"/about",      label:"About KickoffIST" },
                    { href:"/terms",      label:"Terms of Service" },
                    { href:"/privacy",    label:"Privacy Policy" },
                    { href:"/disclaimer", label:"Disclaimer" },
                  ].map(l => (
                    <Link key={l.href} href={l.href} className="block text-[11px] text-white/30 hover:text-white/60 transition-colors">{l.label}</Link>
                  ))}
                </div>
                <div className="mt-3 text-[10px] text-white/20 leading-relaxed">
                  Not affiliated with FIFA or any football body. Information purpose only.
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-[10px] text-white/20">
                © 2026 KickoffIST.com — Made in India 🇮🇳 · All rights reserved
              </p>
              <p className="text-[10px] text-white/15">
                Data: football-data.org · Hosted on Vercel · Domain on Cloudflare
              </p>
            </div>
          </div>
        </footer>

        <BottomNav />
      </body>
    </html>
  );
}
