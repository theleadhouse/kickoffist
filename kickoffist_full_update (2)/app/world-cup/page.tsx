import { getWCSchedule, getStaticWCMatches } from "@/lib/api";
import MatchCard from "@/components/MatchCard";
import { todayIST, tomorrowIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Full Schedule in IST | KickoffIST",
  description: "Complete FIFA World Cup 2026 fixture list — all 104 matches in Indian Standard Time with stadium and city.",
};
export const revalidate = 3600;

export default async function WorldCupPage() {
  let matches = await getWCSchedule();
  if (!matches.length) matches = getStaticWCMatches();

  const today = todayIST();
  const tmrw  = tomorrowIST();

  const grouped = matches.reduce<Record<string, typeof matches>>((acc, m) => {
    const key = m.istDate || "TBD";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  // Stats
  const finished = matches.filter(m => m.status === "FINISHED").length;
  const live     = matches.filter(m => m.status === "LIVE").length;
  const upcoming = matches.filter(m => m.status === "UPCOMING").length;

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-900/40 to-slate-800 rounded-2xl p-5 mb-6 border border-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
        <div className="relative z-10">
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">FIFA World Cup 2026</h1>
          <p className="text-amber-400/70 text-sm mb-3">USA · Canada · Mexico · Jun 11 – Jul 19 · All times IST</p>
          <div className="flex gap-2 flex-wrap">
            <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-500/20">{finished} Played</span>
            {live > 0 && <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-500/20 animate-pulse">{live} Live</span>}
            <span className="bg-white/10 text-white/60 text-[10px] font-bold px-2.5 py-1 rounded-full">{upcoming} Upcoming</span>
            <span className="bg-white/10 text-white/60 text-[10px] font-bold px-2.5 py-1 rounded-full">48 Teams</span>
            <span className="bg-white/10 text-white/60 text-[10px] font-bold px-2.5 py-1 rounded-full">All times IST 🇮🇳</span>
          </div>
        </div>
      </div>

      {/* Quick nav */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {[
          { label: "📊 Standings", href: "/standings" },
          { label: "🔴 Live", href: "/live" },
          { label: "🔮 Predict", href: "/predict" },
        ].map(item => (
          <a key={item.href} href={item.href}
            className="flex-shrink-0 bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-300 hover:border-green-500/40 hover:text-green-400 transition-all">
            {item.label}
          </a>
        ))}
      </div>

      {/* Schedule by date */}
      {sortedDates.map(date => {
        const dayMatches = grouped[date];
        const isToday = date === today;
        const isTmrw  = date === tmrw;
        const label   = dayMatches[0]?.istDateLabel || date;

        return (
          <section key={date} className="mb-6">
            <div className="flex items-center gap-3 mb-3 sticky top-[118px] bg-slate-900/95 backdrop-blur py-2 z-10 -mx-4 px-4">
              <h2 className="font-bold text-slate-400 text-sm">{label}</h2>
              {isToday && <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">Today</span>}
              {isTmrw  && <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">Tomorrow</span>}
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-[10px] text-slate-500">{dayMatches.length} match{dayMatches.length !== 1 ? "es" : ""}</span>
            </div>
            {dayMatches.map(m => <MatchCard key={m.id} match={m} showVenue />)}
          </section>
        );
      })}
    </div>
  );
}
