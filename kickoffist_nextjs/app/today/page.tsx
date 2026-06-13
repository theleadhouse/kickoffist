import { Suspense } from "react";
import { getMatchesForToday, getMatchesForTomorrow } from "@/lib/api";
import MatchCard from "@/components/MatchCard";
import LiveSection from "@/components/LiveSection";
import { todayIST, tomorrowIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today's Football Matches in IST | KickoffIST",
  description: "All football matches happening today in Indian Standard Time. Live scores, WC 2026, Premier League.",
};

export const revalidate = 60; // ISR: rebuild every minute

export default async function TodayPage() {
  const [todayMatches, tmrwMatches] = await Promise.all([
    getMatchesForToday(),
    getMatchesForTomorrow(),
  ]);

  const today = todayIST();
  const now = new Date();
  const istHour = new Date(now.getTime() + 5.5 * 3600 * 1000).getUTCHours();

  // Separate live / upcoming / finished for today
  const live     = todayMatches.filter(m => m.status === "LIVE");
  const upcoming = todayMatches.filter(m => m.status === "UPCOMING");
  const finished = todayMatches.filter(m => m.status === "FINISHED");

  return (
    <div>

      {/* AI Briefing Banner */}
      <AiBriefing matches={todayMatches} tmrwMatches={tmrwMatches} />

      {/* Live Now */}
      <Suspense fallback={null}>
        <LiveSection initialMatches={live} />
      </Suspense>

      {/* Tonight's / Today's Matches */}
      {upcoming.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">
              {istHour >= 18 || istHour < 6 ? "Tonight's Kickoffs 🌙" : "Today's Matches ⚽"}
            </h2>
            <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
              {today}
            </span>
          </div>
          {upcoming.map(m => <MatchCard key={m.id} match={m} />)}
        </section>
      )}

      {/* Finished Today */}
      {finished.length > 0 && (
        <section className="mb-8">
          <h2 className="section-title text-slate-500">Results Today</h2>
          {finished.map(m => <MatchCard key={m.id} match={m} />)}
        </section>
      )}

      {/* Tomorrow Preview */}
      {tmrwMatches.length > 0 && (
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Coming Tomorrow 🌅</h2>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
              {tomorrowIST()}
            </span>
          </div>
          {tmrwMatches.slice(0, 5).map(m => <MatchCard key={m.id} match={m} showDate />)}
          {tmrwMatches.length > 5 && (
            <a href="/world-cup" className="block text-center text-sm font-bold text-green-600 hover:underline mt-2">
              See all {tmrwMatches.length} matches →
            </a>
          )}
        </section>
      )}

      {/* No matches state */}
      {todayMatches.length === 0 && tmrwMatches.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">⚽</div>
          <div className="font-bold text-slate-900 mb-2">No matches right now</div>
          <div className="text-sm text-slate-500">Check the World Cup schedule for upcoming fixtures</div>
          <a href="/world-cup" className="mt-4 inline-block bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm">
            View Schedule
          </a>
        </div>
      )}
    </div>
  );
}

// AI Briefing — generates a smart summary of the day
function AiBriefing({ matches, tmrwMatches }: { matches: ReturnType<typeof Array.prototype.filter>; tmrwMatches: typeof matches }) {
  const allMatches = [...matches, ...tmrwMatches];
  if (allMatches.length === 0) return null;

  // Find the "biggest" upcoming match
  const highlightMatches = [
    allMatches.find(m => m.homeTeam?.name === "Brazil" || m.awayTeam?.name === "Brazil"),
    allMatches.find(m => m.homeTeam?.name === "Argentina" || m.awayTeam?.name === "Argentina"),
    allMatches.find(m => m.status === "LIVE"),
    allMatches.find(m => m.status === "UPCOMING"),
  ].filter(Boolean);

  const feature = highlightMatches[0];
  if (!feature) return null;

  const home = feature.homeTeam?.name;
  const away = feature.awayTeam?.name;
  const time = feature.istTime;
  const date = feature.istDateLabel;

  const briefings: Record<string, string> = {
    "Brazil": `Brazil are heavy favourites. Watch for Vinicius Jr. on the left wing — he's been unplayable this tournament.`,
    "Argentina": `Messi and Argentina. Enough said. This could be his last World Cup. Every minute matters.`,
    "default": `${home} take on ${away} at ${time} IST ${date === "Today" ? "tonight" : date.toLowerCase()}.`,
  };

  const text = home?.includes("Brazil") ? briefings["Brazil"] :
               home?.includes("Argentina") || away?.includes("Argentina") ? briefings["Argentina"] :
               briefings["default"];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-lg mb-8 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">✦</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            AI Scout Report
          </span>
        </div>
        <p className="text-sm font-medium leading-relaxed text-slate-200">
          &ldquo;{text}&rdquo;
        </p>
        {feature && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-white font-bold text-sm">
              {feature.homeTeam?.flag} {home}
            </span>
            <span className="text-slate-500 text-sm">vs</span>
            <span className="text-white font-bold text-sm">
              {away} {feature.awayTeam?.flag}
            </span>
            <span className="ml-auto text-green-400 font-bold text-sm">{time} IST</span>
          </div>
        )}
      </div>
      <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full" />
      <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-white/5 rounded-full" />
    </div>
  );
}
