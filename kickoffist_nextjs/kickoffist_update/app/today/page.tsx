import { Suspense } from "react";
import { getMatchesForToday, getMatchesForTomorrow } from "@/lib/api";
import MatchCard from "@/components/MatchCard";
import LiveSection from "@/components/LiveSection";
import { todayIST, tomorrowIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today's Football in IST | KickoffIST",
  description: "All football matches today in Indian Standard Time. Live scores, WC 2026.",
};
export const revalidate = 60;

export default async function TodayPage() {
  const [todayMatches, tmrwMatches] = await Promise.all([
    getMatchesForToday(),
    getMatchesForTomorrow(),
  ]);

  const live     = todayMatches.filter(m => m.status === "LIVE");
  const upcoming = todayMatches.filter(m => m.status === "UPCOMING");
  const finished = todayMatches.filter(m => m.status === "FINISHED");

  // Find hero match (most important upcoming)
  const heroMatch = upcoming.find(m =>
    ["Brazil","Argentina","England","France","Germany","Spain","Portugal"].includes(m.homeTeam.name) ||
    ["Brazil","Argentina","England","France","Germany","Spain","Portugal"].includes(m.awayTeam.name)
  ) || upcoming[0] || live[0];

  return (
    <div>
      {/* Hero Match Banner */}
      {heroMatch && (
        <div className="relative bg-gradient-to-br from-green-900/40 via-[#1a1f2e] to-[#0d1117] rounded-2xl p-5 mb-6 overflow-hidden border border-green-500/20 pitch-lines">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-green-400/70">
                {heroMatch.status === "LIVE" ? "🔴 LIVE NOW" : "⚡ Next Big Match"}
              </span>
              <span className="text-[10px] text-white/30">{heroMatch.competition.name}</span>
            </div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="text-center flex-1">
                <span className="text-4xl block mb-2">{heroMatch.homeTeam.flag}</span>
                <span className="text-sm font-bold text-white">{heroMatch.homeTeam.shortName}</span>
              </div>
              <div className="text-center flex-shrink-0">
                {heroMatch.status === "LIVE" ? (
                  <div>
                    <div className="text-4xl font-black text-white tabular-nums">
                      {heroMatch.score.home} : {heroMatch.score.away}
                    </div>
                    <div className="text-red-400 text-xs font-bold mt-1">{heroMatch.minute}&apos;</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl font-black text-green-400">{heroMatch.istTime}</div>
                    <div className="text-white/40 text-xs mt-1">IST · {heroMatch.istDateLabel}</div>
                  </div>
                )}
              </div>
              <div className="text-center flex-1">
                <span className="text-4xl block mb-2">{heroMatch.awayTeam.flag}</span>
                <span className="text-sm font-bold text-white">{heroMatch.awayTeam.shortName}</span>
              </div>
            </div>
            {heroMatch.group && (
              <div className="text-center text-[10px] text-white/30 font-medium">{heroMatch.group}</div>
            )}
          </div>
        </div>
      )}

      {/* Live */}
      <Suspense fallback={null}>
        <LiveSection initialMatches={live} />
      </Suspense>

      {/* Today Upcoming */}
      {upcoming.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Tonight&apos;s Kickoffs 🌙</h2>
            <span className="text-[11px] font-bold text-white/30 bg-white/5 px-2 py-1 rounded-lg">{todayIST()}</span>
          </div>
          {upcoming.map(m => <MatchCard key={m.id} match={m} />)}
        </section>
      )}

      {/* Today Finished */}
      {finished.length > 0 && (
        <section className="mb-8">
          <h2 className="section-title text-white/40">Results Today</h2>
          {finished.map(m => <MatchCard key={m.id} match={m} />)}
        </section>
      )}

      {/* Tomorrow */}
      {tmrwMatches.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Tomorrow 🌅</h2>
            <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">{tomorrowIST()}</span>
          </div>
          {tmrwMatches.slice(0, 4).map(m => <MatchCard key={m.id} match={m} showDate />)}
          {tmrwMatches.length > 4 && (
            <a href="/world-cup" className="block text-center text-sm font-bold text-green-400 hover:underline mt-2">
              +{tmrwMatches.length - 4} more matches →
            </a>
          )}
        </section>
      )}

      {todayMatches.length === 0 && tmrwMatches.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">⚽</div>
          <div className="font-bold text-white mb-2">No matches right now</div>
          <div className="text-sm text-white/40 mb-4">Check the World Cup schedule for upcoming fixtures</div>
          <a href="/world-cup" className="bg-green-500 text-black font-bold px-5 py-2.5 rounded-xl text-sm">View Schedule</a>
        </div>
      )}
    </div>
  );
}
