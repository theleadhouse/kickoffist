import { getStaticWCMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import { todayIST, tomorrowIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Full Schedule in IST | KickoffIST",
  description: "All 104 FIFA World Cup 2026 matches with stadiums, cities and IST kick-off times.",
};
export const revalidate = 3600;

export default function WorldCupPage() {
  const matches = getStaticWCMatches();
  const today   = todayIST();
  const tmrw    = tomorrowIST();

  const finished = matches.filter(m => m.status === "FINISHED").length;
  const live     = matches.filter(m => m.status === "LIVE").length;
  const upcoming = matches.filter(m => m.status === "UPCOMING").length;

  const grouped = matches.reduce<Record<string, typeof matches>>((acc, m) => {
    const key = m.istDate || "TBD";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 py-2.5 border-b border-white/8 mb-3 flex-wrap">
        <span className="text-2xl">🏆</span>
        <div>
          <div className="text-sm font-black text-white">FIFA World Cup 2026</div>
          <div className="text-[10px] text-white/40">USA · Canada · Mexico · Jun 11 – Jul 19 · All times IST</div>
        </div>
        <div className="flex gap-1.5 ml-auto flex-wrap items-center">
          {live > 0 && <span className="badge-live">{live} Live</span>}
          <span className="bg-white/5 border border-white/8 text-white/40 text-[9px] px-2 py-0.5 rounded font-medium">{finished} Played</span>
          <span className="bg-white/5 border border-white/8 text-white/40 text-[9px] px-2 py-0.5 rounded font-medium">{upcoming} Upcoming</span>
          <a href="/standings" className="bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] px-2 py-0.5 rounded font-bold">📊 Standings</a>
        </div>
      </div>

      {/* Matches by date */}
      {Object.keys(grouped).sort().map(date => {
        const dayM    = grouped[date];
        const isToday = date === today;
        const isTmrw  = date === tmrw;
        const label   = dayM[0]?.istDateLabel || date;
        return (
          <div key={date} className="mb-4">
            <div className="flex items-center gap-2 py-1.5 mb-2 border-b border-white/6 sticky top-[82px] bg-[#0f1923]/95 backdrop-blur z-10">
              <span className="text-[10px] font-bold text-white/50">{label}</span>
              {isToday && <span className="badge-up">Today</span>}
              {isTmrw  && <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded">Tomorrow</span>}
              <span className="ml-auto text-[9px] text-white/25">{dayM.length} match{dayM.length!==1?"es":""}</span>
            </div>
            <div className="space-y-1.5">
              {dayM.map(m => <PortalMatchCard key={m.id} match={m} showDate />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
