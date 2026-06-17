import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import LiveTicker from "@/components/LiveTicker";
import Link from "next/link";

const inter = Inter({ subsets:["latin"], weight:["400","500","600","700","800","900"] });

export const metadata: Metadata = {
  title: "KickoffIST — Live Football Scores in IST | FIFA World Cup 2026",
  description: "Live scores, fixtures and results from FIFA World Cup 2026 in Indian Standard Time. Made in India 🇮🇳 for Indian football fans.",
  themeColor: "#0e1117",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <div className="max-w-[1140px] mx-auto px-3 pt-1 pb-24">
          <LiveTicker />
          {children}
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/6 bg-black/40 mt-4 pb-20 sm:pb-4">
          <div className="max-w-[1140px] mx-auto px-3 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-sm">K</div>
                  <span className="text-sm font-black text-white">KICKOFF<span className="text-red-500">IST</span></span>
                </div>
                <p className="text-[11px] text-white/25 leading-relaxed mb-2">
                  India&apos;s Football Calendar — Live scores, fixtures and standings in Indian Standard Time. Made in India 🇮🇳
                </p>
                <p className="text-[10px] text-white/20">
                  📧 <a href="mailto:admin@kickoffist.com" className="hover:text-white/50 transition-colors">admin@kickoffist.com</a>
                </p>
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/25 uppercase tracking-wider mb-2">Competitions</div>
                <div className="space-y-1.5">
                  {[
                    {href:"/world-cup",label:"🏆 FIFA World Cup 2026"},
                    {href:"/standings",label:"📊 Group Standings"},
                    {href:"/live",     label:"🔴 Live Scores"},
                    {href:"/predict",  label:"🔮 AI Predictor"},
                  ].map(l=>(
                    <Link key={l.href} href={l.href} className="block text-[11px] text-white/25 hover:text-white/60 transition-colors">{l.label}</Link>
                  ))}
                  <span className="block text-[11px] text-white/12">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League · Aug 2026</span>
                  <span className="block text-[11px] text-white/12">🇮🇳 ISL · Oct 2026</span>
                </div>
              </div>
              <div>
                <div className="text-[9px] font-bold text-white/25 uppercase tracking-wider mb-2">Legal</div>
                <div className="space-y-1.5">
                  {[
                    {href:"/about",     label:"About KickoffIST"},
                    {href:"/terms",     label:"Terms of Service"},
                    {href:"/privacy",   label:"Privacy Policy"},
                    {href:"/disclaimer",label:"Disclaimer"},
                  ].map(l=>(
                    <Link key={l.href} href={l.href} className="block text-[11px] text-white/25 hover:text-white/60 transition-colors">{l.label}</Link>
                  ))}
                </div>
                <p className="text-[9px] text-white/15 leading-relaxed mt-3">Not affiliated with FIFA or any football body. Information only.</p>
              </div>
            </div>
            <div className="border-t border-white/5 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-[9px] text-white/18">© 2026 KickoffIST.com — Made in India 🇮🇳 · All rights reserved</p>
              <p className="text-[9px] text-white/12">Data: football-data.org · RapidAPI · Hosted on Vercel</p>
            </div>
          </div>
        </footer>
        <BottomNav />
      </body>
    </html>
  );
}
