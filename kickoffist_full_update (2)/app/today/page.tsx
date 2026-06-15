import { Suspense } from "react";
import { getMatchesForToday, getMatchesForTomorrow, getStaticWCMatches } from "@/lib/api";
import MatchCard from "@/components/MatchCard";
import LiveSection from "@/components/LiveSection";
import { todayIST, tomorrowIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today's Football in IST | KickoffIST",
  description: "All World Cup 2026 matches today in Indian Standard Time. Live scores, fixtures, results.",
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

  // Recent results from static data for fallback
  const allMatches = getStaticWCMatches();
  const recentResults = allMatches
    .filter(m => m.status === "FINISHED")
    .slice(-6)
    .reverse();

  // Hero match — most anticipated upcoming or current live
  const heroMatch = live[0] || upcoming.find(m =>
    ["Brazil","Argentina","England","France","Germany","Spain","Portugal","USA","India"].some(t =>
      m.homeTeam.name.includes(t) || m.awayTeam.name.includes(t)
    )
  ) || upcoming[0] || live[0];

  return (
    <div>
      {/* Hero Match Card */}
      {heroMatch && (
        <div className="relative bg-gradient-to-br from-green-900/40 via-slate-800 to-slate-900 rounded-2xl p-5 mb-6 overflow-hidden border border-green-500/20">
          {/* Pitch lines */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "32px 32px"
          }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-black text-green-400/80 uppercase tracking-[0.15em]">
                {heroMatch.status === "LIVE" ? "🔴 LIVE NOW" : "⚡ Next Match"}
              </span>
              <span className="text-[10px] text-white/30">·</span>
              <span className="text-[10px] text-white/40">{heroMatch.competition.name}</span>
              {heroMatch.group && <span className="text-[10px] text-white/30">· {heroMatch.group}</span>}
            </div>
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="text-center flex-1">
                <span className="text-5xl block mb-2 filter drop-shadow-lg">{heroMatch.homeTeam.flag}</span>
                <span className="text-sm font-bold text-white">{heroMatch.homeTeam.shortName}</span>
              </div>
              <div className="text-center flex-shrink-0 px-2">
                {heroMatch.status === "LIVE" ? (
                  <div>
                    <div className="text-4xl font-black text-white tabular-nums">
                      {heroMatch.score.home ?? 0} <span className="text-red-400">:</span> {heroMatch.score.away ?? 0}
                    </div>
                    <div className="text-red-400 text-xs font-bold mt-1 flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      {heroMatch.minute ? `${heroMatch.minute}'` : "LIVE"}
                    </div>
                  </div>
                ) : heroMatch.status === "FINISHED" ? (
                  <div>
                    <div className="text-4xl font-black text-white tabular-nums">
                      {heroMatch.score.home} : {heroMatch.score.away}
                    </div>
                    <div className="text-white/40 text-xs mt-1 font-bold">FULL TIME</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl font-black text-green-400 tabular-nums">{heroMatch.istTime}</div>
                    <div className="text-white/40 text-[10px] mt-1 font-medium">IST · {heroMatch.istDateLabel}</div>
                  </div>
                )}
              </div>
              <div className="text-center flex-1">
                <span className="text-5xl block mb-2 filter drop-shadow-lg">{heroMatch.awayTeam.flag}</span>
                <span className="text-sm font-bold text-white">{heroMatch.awayTeam.shortName}</span>
              </div>
            </div>
            {heroMatch.venue && (
              <div className="text-center text-[10px] text-white/30 font-medium mt-1">
                📍 {heroMatch.venue}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Live Now */}
      <Suspense fallback={null}>
        <LiveSection initialMatches={live} />
      </Suspense>

      {/* Today Upcoming */}
      {upcoming.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              ⚡ Today&apos;s Matches
            </h2>
            <span className="text-[11px] font-bold text-white/30 bg-white/5 px-2 py-1 rounded-lg">{todayIST()}</span>
          </div>
          {upcoming.map(m => <MatchCard key={m.id} match={m} showVenue />)}
        </section>
      )}

      {/* Today Results */}
      {finished.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-white/50 mb-4">✅ Results Today</h2>
          {finished.map(m => <MatchCard key={m.id} match={m} showVenue />)}
        </section>
      )}

      {/* Tomorrow */}
      {tmrwMatches.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">🌅 Tomorrow</h2>
            <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">{tomorrowIST()}</span>
          </div>
          {tmrwMatches.map(m => <MatchCard key={m.id} match={m} showDate showVenue />)}
        </section>
      )}

      {/* Recent Results fallback if no today matches */}
      {todayMatches.length === 0 && tmrwMatches.length === 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-white mb-4">🏆 Recent Results</h2>
          {recentResults.map(m => <MatchCard key={m.id} match={m} showVenue />)}
          <div className="text-center mt-4">
            <a href="/world-cup" className="text-green-400 text-sm font-bold hover:underline">View full schedule →</a>
          </div>
        </section>
      )}
    </div>
  );
}
