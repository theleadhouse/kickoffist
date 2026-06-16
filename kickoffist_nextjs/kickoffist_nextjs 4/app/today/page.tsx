import { Suspense } from "react";
import { getMatchesForToday, getMatchesForTomorrow, getStaticWCMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import LiveTicker from "@/components/LiveTicker";
import MiniStandings from "@/components/MiniStandings";
import { todayIST, tomorrowIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KickoffIST — Live Scores & Fixtures in IST | FIFA World Cup 2026",
  description: "Live scores, today's fixtures and results from FIFA World Cup 2026 in Indian Standard Time.",
};
export const revalidate = 60;

export default async function TodayPage() {
  const [todayM, tmrwM] = await Promise.all([
    getMatchesForToday(),
    getMatchesForTomorrow(),
  ]);

  const allStatic   = getStaticWCMatches();
  const live        = todayM.filter(m => m.status === "LIVE");
  const upcoming    = todayM.filter(m => m.status === "UPCOMING");
  const finishedToday = todayM.filter(m => m.status === "FINISHED");
  const recentResults = allStatic.filter(m => m.status === "FINISHED").slice(-8).reverse();

  const todayDate = todayIST();
  const tmrwDate  = tomorrowIST();

  return (
    <div>
      {/* LIVE TICKER */}
      <Suspense fallback={null}>
        <LiveTicker />
      </Suspense>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3 mt-3">

        {/* LEFT COLUMN */}
        <div className="min-w-0">

          {/* LIVE NOW */}
          {live.length > 0 && (
            <div className="mb-3">
              <div className="sh">
                <span className="live-dot" />
                <span className="text-red-400">LIVE NOW</span>
                <span className="ml-auto text-[10px] text-[#6e7681]">Updates every 15s</span>
              </div>
              <div className="space-y-1.5">
                {live.map(m => <PortalMatchCard key={m.id} match={m} />)}
              </div>
            </div>
          )}

          {/* TODAY'S FIXTURES */}
          {upcoming.length > 0 && (
            <div className="mb-3">
              <div className="sh">
                <span>⚡</span>
                <span>TODAY&apos;S FIXTURES</span>
                <span className="ml-1 text-[#3fb950]">{todayDate}</span>
                <span className="ml-auto text-[10px] text-[#6e7681]">{upcoming.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {upcoming.map(m => <PortalMatchCard key={m.id} match={m} />)}
              </div>
            </div>
          )}

          {/* TODAY'S RESULTS */}
          {finishedToday.length > 0 && (
            <div className="mb-3">
              <div className="sh">
                <span>✅</span>
                <span>TODAY&apos;S RESULTS</span>
              </div>
              <div className="space-y-1.5">
                {finishedToday.map(m => <PortalMatchCard key={m.id} match={m} />)}
              </div>
            </div>
          )}

          {/* TOMORROW */}
          {tmrwM.length > 0 && (
            <div className="mb-3">
              <div className="sh">
                <span>📅</span>
                <span>TOMORROW</span>
                <span className="ml-1 text-[#3fb950]">{tmrwDate}</span>
                <span className="ml-auto text-[10px] text-[#6e7681]">{tmrwM.length} matches</span>
              </div>
              <div className="space-y-1.5">
                {tmrwM.map(m => <PortalMatchCard key={m.id} match={m} showDate />)}
              </div>
            </div>
          )}

          {/* RECENT RESULTS fallback */}
          {todayM.length === 0 && (
            <div className="mb-3">
              <div className="sh">
                <span>🏁</span>
                <span>RECENT RESULTS</span>
                <span className="ml-auto text-[10px] text-[#6e7681]">FIFA World Cup 2026</span>
              </div>
              <div className="space-y-1.5">
                {recentResults.map(m => <PortalMatchCard key={m.id} match={m} />)}
              </div>
              <div className="mt-2 text-center">
                <a href="/world-cup" className="text-[11px] font-bold text-[#3fb950] hover:underline">
                  View full schedule →
                </a>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-3">
          <Suspense fallback={null}>
            <MiniStandings />
          </Suspense>

          {/* Quick links */}
          <div>
            <div className="sh"><span>🔗</span><span>QUICK LINKS</span></div>
            <div className="space-y-1">
              {[
                { href:"/world-cup", label:"Full WC Schedule", sub:"All 104 matches in IST" },
                { href:"/standings", label:"All Group Standings", sub:"12 groups · Updated live" },
                { href:"/predict",   label:"AI Match Predictor", sub:"Claude AI analysis" },
              ].map(link => (
                <a key={link.href} href={link.href}
                  className="flex items-center justify-between p-2.5 bg-[#161b22] border border-[#21262d] rounded-lg hover:border-[#3fb950]/40 transition-colors group">
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-[#3fb950] transition-colors">{link.label}</div>
                    <div className="text-[10px] text-[#6e7681]">{link.sub}</div>
                  </div>
                  <span className="text-[#6e7681] text-sm">›</span>
                </a>
              ))}
            </div>
          </div>

          {/* WC 2026 Info */}
          <div className="bg-[#161b22] border border-[#21262d] rounded-lg p-3">
            <div className="text-[10px] font-bold text-[#6e7681] uppercase tracking-wide mb-2">FIFA World Cup 2026</div>
            <div className="space-y-1.5 text-[11px] text-[#8b949e]">
              <div className="flex justify-between"><span>Teams</span><span className="text-slate-200 font-semibold">48</span></div>
              <div className="flex justify-between"><span>Matches</span><span className="text-slate-200 font-semibold">104</span></div>
              <div className="flex justify-between"><span>Countries</span><span className="text-slate-200 font-semibold">USA · CAN · MEX</span></div>
              <div className="flex justify-between"><span>Start</span><span className="text-slate-200 font-semibold">Jun 11, 2026</span></div>
              <div className="flex justify-between"><span>Final</span><span className="text-slate-200 font-semibold">Jul 19, 2026</span></div>
              <div className="flex justify-between"><span>Times</span><span className="text-[#3fb950] font-bold">All in IST 🇮🇳</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
