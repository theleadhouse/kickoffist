import { getWCSchedule } from "@/lib/api";
import MatchCard from "@/components/MatchCard";
import { todayIST, tomorrowIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Schedule in IST | KickoffIST",
  description: "Full FIFA World Cup 2026 fixture list — all 104 matches in Indian Standard Time.",
};
export const revalidate = 3600;

export default async function WorldCupPage() {
  const matches = await getWCSchedule();
  const today = todayIST();
  const tmrw = tomorrowIST();

  const grouped = matches.reduce<Record<string, typeof matches>>((acc, m) => {
    if (!acc[m.istDate]) acc[m.istDate] = [];
    acc[m.istDate].push(m);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-900/40 to-[#1a1f2e] rounded-2xl p-5 mb-6 border border-amber-500/20 relative overflow-hidden pitch-lines">
        <div className="relative z-10">
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">FIFA World Cup 2026</h1>
          <p className="text-amber-400/70 text-sm">USA · Canada · Mexico · Jun 11 – Jul 19</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {["48 Teams","104 Matches","All times IST","3 Countries"].map(tag => (
              <span key={tag} className="bg-white/10 text-white/60 text-[10px] font-bold px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
        <a href="/standings" className="flex-shrink-0 bg-[#1a1f2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white/70 hover:border-green-500/30 hover:text-green-400 transition-all">
          📊 Standings
        </a>
        <a href="/predict" className="flex-shrink-0 bg-[#1a1f2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white/70 hover:border-green-500/30 hover:text-green-400 transition-all">
          🔮 Predict
        </a>
        <a href="/live" className="flex-shrink-0 bg-[#1a1f2e] border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white/70 hover:border-red-500/30 hover:text-red-400 transition-all">
          🔴 Live Now
        </a>
      </div>

      {/* Matches by date */}
      {sortedDates.map(date => {
        const dayMatches = grouped[date];
        const isToday = date === today;
        const isTmrw = date === tmrw;
        const label = dayMatches[0]?.istDateLabel;
        return (
          <section key={date} className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="font-bold text-white/60 text-sm">{label || date}</h2>
              {isToday && <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">Today</span>}
              {isTmrw && <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">Tomorrow</span>}
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] text-white/20">{dayMatches.length} matches</span>
            </div>
            {dayMatches.map(m => <MatchCard key={m.id} match={m} />)}
          </section>
        );
      })}
    </div>
  );
}
