import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KickoffIST",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-xl font-black text-white mb-1">Privacy Policy</h1>
      <p className="text-xs text-white/30 mb-6">Last updated: June 2026</p>

      <div className="space-y-4 text-sm text-white/60 leading-relaxed">
        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">1. No Personal Data Collection</h2>
          <p>KickoffIST.com does not require you to create an account or log in. We do not collect your name, email address, phone number or any other personal information simply by visiting our website.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">2. Email Subscribers</h2>
          <p>If you choose to subscribe to match reminders or notifications, we collect only your email address. This is used solely to send you match time reminders in IST. We do not share, sell or rent your email address to any third party. You can unsubscribe at any time.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">3. Cookies</h2>
          <p>KickoffIST.com uses minimal cookies only for basic website functionality such as remembering your preferences. We do not use advertising cookies or tracking cookies. We do not serve advertisements on this website.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">4. Analytics</h2>
          <p>We may use basic anonymous analytics to understand how many people visit our website and which pages are most popular. This data is aggregated and anonymous — we cannot identify individual users.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">5. Third Party APIs</h2>
          <p>We use football data APIs to retrieve match information. These services may log API requests as part of their standard operations. We do not share any user information with these services.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">6. Children&apos;s Privacy</h2>
          <p>KickoffIST.com is a general football information website suitable for all ages. We do not knowingly collect personal information from children under the age of 13.</p>
        </div>

        <div className="bg-white/5 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-2">7. Contact</h2>
          <p>For any privacy-related questions or to request deletion of your data, contact us at <a href="mailto:admin@kickoffist.com" className="text-blue-400 hover:underline">admin@kickoffist.com</a></p>
        </div>
      </div>
    </div>
  );
}
