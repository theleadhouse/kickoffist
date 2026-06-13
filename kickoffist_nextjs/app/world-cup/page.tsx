import { getWCSchedule } from "@/lib/api";
import MatchCard from "@/components/MatchCard";
import { todayIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 Schedule in IST | KickoffIST",
  description: "Full FIFA World Cup 2026 schedule with all 104 matches in Indian Standard Time.",
};

export const revalidate = 3600; // rebuild every hour

export default async function WorldCupPage() {
  const matches = await getWCSchedule();
  const today = todayIST();

  // Group by IST date
  const grouped = matches.reduce<Record<string, typeof matches>>((acc, m) => {
    const key = m.istDate;
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-4xl mb-3">🏆</div>
          <h1 className="text-2xl font-black text-white tracking-tight mb-1">
            FIFA World Cup 2026
          </h1>
          <p className="text-amber-100 text-sm">
            USA · Canada · Mexico · Jun 11 – Jul 19
          </p>
          <div className="flex gap-2 mt-3">
            <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              48 Teams
            </span>
            <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              104 Matches
            </span>
            <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              All times IST
            </span>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 text-8xl opacity-10">⚽</div>
      </div>

      {/* Matches grouped by date */}
      {sortedDates.map(date => {
        const dayMatches = grouped[date];
        const isToday = date === today;
        const label = dayMatches[0]?.istDateLabel;

        return (
          <section key={date} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-bold text-slate-700 text-sm">{label || date}</h2>
              {isToday && (
                <span className="bg-green-100 text-green-700 border border-green-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Today
                </span>
              )}
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] text-slate-400 font-medium">
                {dayMatches.length} match{dayMatches.length !== 1 ? "es" : ""}
              </span>
            </div>

            {dayMatches.map(m => (
              <MatchCard key={m.id} match={m} />
            ))}
          </section>
        );
      })}
    </div>
  );
}
