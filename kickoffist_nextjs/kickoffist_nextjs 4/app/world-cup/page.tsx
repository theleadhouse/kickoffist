import { getWCSchedule, getStaticWCMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import { todayIST, tomorrowIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Full Schedule IST | KickoffIST",
  description: "Complete FIFA World Cup 2026 — all 104 matches in Indian Standard Time with stadiums.",
};
export const revalidate = 3600;

export default async function WorldCupPage() {
  let matches = await getWCSchedule();
  if (!matches.length) matches = getStaticWCMatches();

  const today = todayIST();
  const tmrw  = tomorrowIST();
  const finished = matches.filter(m => m.status === "FINISHED").length;
  const upcoming = matches.filter(m => m.status === "UPCOMING").length;
  const live     = matches.filter(m => m.status === "LIVE").length;

  const grouped = matches.reduce<Record<string, typeof matches>>((acc, m) => {
    const key = m.istDate || "TBD";
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center gap-3 py-2 border-b border-[#21262d] mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-base">🏆</span>
          <div>
            <div className="text-sm font-black text-white">FIFA World Cup 2026</div>
            <div className="text-[10px] text-[#6e7681]">USA · Canada · Mexico · Jun 11 – Jul 19 · All times IST</div>
          </div>
        </div>
        <div className="flex gap-1.5 ml-auto flex-wrap">
          {live > 0 && <span className="badge-live">{live} Live</span>}
          <span className="bg-[#161b22] border border-[#21262d] text-[#8b949e] text-[9px] font-bold px-2 py-0.5 rounded">{finished} Played</span>
          <span className="bg-[#161b22] border border-[#21262d] text-[#8b949e] text-[9px] font-bold px-2 py-0.5 rounded">{upcoming} Upcoming</span>
          <a href="/standings" className="bg-[#3fb950]/10 border border-[#3fb950]/20 text-[#3fb950] text-[9px] font-bold px-2 py-0.5 rounded hover:bg-[#3fb950]/20">📊 Standings</a>
        </div>
      </div>

      {/* Schedule */}
      {sortedDates.map(date => {
        const dayM = grouped[date];
        const isToday = date === today;
        const isTmrw  = date === tmrw;
        const label   = dayM[0]?.istDateLabel || date;

        return (
          <div key={date} className="mb-4">
            <div className="flex items-center gap-2 py-1 mb-2 border-b border-[#21262d]">
              <span className="text-[10px] font-bold text-[#8b949e]">{label}</span>
              {isToday && <span className="badge-up">Today</span>}
              {isTmrw  && <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded">Tomorrow</span>}
              <span className="ml-auto text-[9px] text-[#6e7681]">{dayM.length} matches</span>
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
