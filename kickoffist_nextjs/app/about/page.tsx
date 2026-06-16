import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | KickoffIST — India's Football Calendar",
  description: "KickoffIST is built by Indians for Indians. We convert all football match times to Indian Standard Time so you never miss a kickoff.",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg">K</div>
          <div>
            <h1 className="text-xl font-black text-white">KickoffIST.com</h1>
            <p className="text-xs text-white/40">India&apos;s Football Calendar</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">🇮🇳 Made in India, for India</h2>
          <p className="text-sm text-white/60 leading-relaxed">
            KickoffIST is an independent Indian website built by football fans, for football fans across India. 
            Our sole purpose is simple — convert every football match time to Indian Standard Time (IST) so 
            you never have to do the mental maths of time zone conversions at 2 AM.
          </p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">⚽ Why We Built This</h2>
          <p className="text-sm text-white/60 leading-relaxed">
            Every Indian football fan has missed a match because they got the time wrong. A 3 PM ET kickoff 
            becomes a 12:30 AM IST start — easy to miss if you don&apos;t convert it. KickoffIST does that 
            automatically for every single fixture, result and competition, updated in real time.
          </p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">🏆 What We Cover</h2>
          <ul className="text-sm text-white/60 space-y-1.5">
            <li>✅ FIFA World Cup 2026 — all 104 matches in IST</li>
            <li>✅ Live scores with goalscorers and match minute</li>
            <li>✅ Group standings updated after every match</li>
            <li>✅ Stadium names and host cities for every fixture</li>
            <li className="text-white/30">🔜 Premier League 2026/27 — coming August 2026</li>
            <li className="text-white/30">🔜 UEFA Champions League — coming September 2026</li>
            <li className="text-white/30">🔜 Indian Super League (ISL) — coming October 2026</li>
          </ul>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">📧 Contact Us</h2>
          <p className="text-sm text-white/60 leading-relaxed">
            For any queries, feedback or partnership enquiries, reach us at{" "}
            <a href="mailto:admin@kickoffist.com" className="text-blue-400 hover:underline">
              admin@kickoffist.com
            </a>
          </p>
          <p className="text-xs text-white/30 mt-2">We are a small independent team and typically respond within 48 hours.</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
          <p className="text-sm text-white/70">
            🇮🇳 <strong className="text-white">KickoffIST.com</strong> — India&apos;s Football Calendar<br/>
            <span className="text-white/40 text-xs">Information purpose only · Not affiliated with FIFA or any football body</span>
          </p>
        </div>
      </div>
    </div>
  );
}
