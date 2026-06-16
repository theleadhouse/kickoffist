import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | KickoffIST",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-xl font-black text-white mb-1">Terms of Service</h1>
      <p className="text-xs text-white/30 mb-6">Last updated: June 2026</p>

      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">1. About KickoffIST</h2>
          <p>KickoffIST.com is an independent Indian football information website. We provide football match schedules, live scores, results and standings — all converted to Indian Standard Time (IST) for the convenience of Indian football fans. The website is operated by an independent team based in India.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">2. Information Purpose Only</h2>
          <p>All content on KickoffIST.com is provided for <strong className="text-white">information and reference purposes only</strong>. We do not stream, broadcast or host any live football content. We do not sell tickets, merchandise or any products. We are not a betting, gambling or fantasy sports platform.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">3. Accuracy of Information</h2>
          <p>While we make every effort to ensure match times, scores and fixture information are accurate, KickoffIST.com cannot guarantee the completeness or accuracy of all data. Match times may change due to official rescheduling. Always verify critical information with official sources such as FIFA.com or the relevant league&apos;s official website.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">4. Intellectual Property</h2>
          <p>KickoffIST.com is not affiliated with FIFA, the Premier League, UEFA, ISL or any other football governing body. All team names, competition names, logos and trademarks belong to their respective owners. We use publicly available match data for informational purposes under fair use principles.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">5. User Conduct</h2>
          <p>By using KickoffIST.com you agree not to misuse, copy or reproduce our original content without permission. You agree not to use automated tools to scrape or extract data from our website. The website is intended for personal, non-commercial use by Indian football fans.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">6. Changes to Terms</h2>
          <p>We reserve the right to update these Terms of Service at any time. Continued use of KickoffIST.com after any changes constitutes acceptance of the new terms.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">7. Contact</h2>
          <p>For any questions regarding these terms, contact us at <a href="mailto:admin@kickoffist.com" className="text-blue-400 hover:underline">admin@kickoffist.com</a></p>
        </div>
      </div>
    </div>
  );
}
