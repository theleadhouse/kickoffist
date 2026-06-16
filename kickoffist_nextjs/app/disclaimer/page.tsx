import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | KickoffIST",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-xl font-black text-white mb-1">Disclaimer</h1>
      <p className="text-xs text-white/30 mb-6">Last updated: June 2026</p>

      <div className="space-y-4 text-sm text-white/60 leading-relaxed">

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
          <h2 className="text-sm font-bold text-amber-400 mb-2">⚠️ Important Notice</h2>
          <p className="text-white/70">KickoffIST.com is an <strong className="text-white">independent Indian information website</strong>. We are not affiliated with, endorsed by or connected to FIFA, the Premier League, UEFA, ISL or any other football organisation.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">🇮🇳 Made in India</h2>
          <p>KickoffIST.com is built and operated by an independent team in India. Our website is designed specifically for Indian football fans to easily check match schedules, live scores and results — all displayed in Indian Standard Time (IST).</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">📋 Information Only</h2>
          <p>All content on this website is for <strong className="text-white">general information and reference purposes only</strong>. We do not host, stream or broadcast live football matches. We do not sell tickets. We are not involved in betting, gambling or fantasy sports of any kind.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">📡 Data Sources</h2>
          <p>Match data, scores and fixture information are sourced from publicly available football data APIs. While we strive for accuracy, KickoffIST.com is not responsible for errors or delays in data. Always refer to official sources for confirmed match information.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">©️ Copyright</h2>
          <p>The KickoffIST name, logo and original website content are copyright © 2026 KickoffIST.com. All football team names, competition names, badges and related intellectual property belong to their respective owners. No copyright infringement is intended.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">🔗 External Links</h2>
          <p>Our website may contain links to external websites such as broadcasters or official football organisations. We are not responsible for the content or privacy practices of those websites.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">📧 Contact</h2>
          <p>For any concerns or queries, contact us at <a href="mailto:admin@kickoffist.com" className="text-blue-400 hover:underline">admin@kickoffist.com</a></p>
        </div>

      </div>
    </div>
  );
}
