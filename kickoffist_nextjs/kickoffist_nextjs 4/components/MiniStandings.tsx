import Link from "next/link";

const GROUPS: Record<string, { team: string; flag: string; p: number; pts: number; gd: number }[]> = {
  A: [
    { team:"Mexico",      flag:"🇲🇽", p:1, pts:3, gd:2 },
    { team:"South Korea", flag:"🇰🇷", p:1, pts:3, gd:1 },
    { team:"Czechia",     flag:"🇨🇿", p:1, pts:0, gd:-1 },
    { team:"South Africa",flag:"🇿🇦", p:1, pts:0, gd:-2 },
  ],
  D: [
    { team:"USA",         flag:"🇺🇸", p:1, pts:3, gd:3 },
    { team:"Australia",   flag:"🇦🇺", p:1, pts:3, gd:2 },
    { team:"Turkey",      flag:"🇹🇷", p:1, pts:0, gd:-2 },
    { team:"Paraguay",    flag:"🇵🇾", p:1, pts:0, gd:-3 },
  ],
  E: [
    { team:"Scotland",    flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", p:1, pts:3, gd:1 },
    { team:"Brazil",      flag:"🇧🇷", p:1, pts:1, gd:0 },
    { team:"Morocco",     flag:"🇲🇦", p:1, pts:1, gd:0 },
    { team:"Haiti",       flag:"🇭🇹", p:1, pts:0, gd:-1 },
  ],
  F: [
    { team:"Germany",     flag:"🇩🇪", p:1, pts:3, gd:6 },
    { team:"Ivory Coast", flag:"🇨🇮", p:1, pts:3, gd:1 },
    { team:"Ecuador",     flag:"🇪🇨", p:1, pts:0, gd:-1 },
    { team:"Curaçao",     flag:"🇨🇼", p:1, pts:0, gd:-6 },
  ],
  H: [
    { team:"Saudi Arabia",flag:"🇸🇦", p:1, pts:3, gd:1 },
    { team:"Spain",       flag:"🇪🇸", p:1, pts:1, gd:0 },
    { team:"Cabo Verde",  flag:"🇨🇻", p:1, pts:1, gd:0 },
    { team:"Uruguay",     flag:"🇺🇾", p:1, pts:0, gd:-1 },
  ],
};

function GroupTable({ group, teams }: { group: string; teams: typeof GROUPS.A }) {
  const sorted = [...teams].sort((a, b) => b.pts - a.pts || b.gd - a.gd);
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Group {group}</span>
        <span className="text-[8px] text-[#6e7681]">P PTS</span>
      </div>
      {sorted.map((t, i) => (
        <div key={t.team} className="st-row">
          <span className="text-[9px] text-[#6e7681] w-3">{i + 1}</span>
          <span className={`st-q ${i < 2 ? "q" : ""}`} />
          <span className="text-sm w-5 text-center">{t.flag}</span>
          <span className={`flex-1 text-[11px] font-semibold truncate ${i < 2 && t.pts > 0 ? "text-[#3fb950]" : "text-slate-300"}`}>{t.team}</span>
          <span className="text-[10px] text-[#6e7681] w-4 text-center">{t.p}</span>
          <span className={`text-[11px] font-black w-5 text-center ${t.pts > 0 ? "text-white" : "text-[#6e7681]"}`}>{t.pts}</span>
        </div>
      ))}
    </div>
  );
}

export default function MiniStandings() {
  return (
    <div>
      <div className="sh">
        <span>📊</span>
        <span>STANDINGS</span>
        <Link href="/standings" className="ml-auto text-[10px] text-[#3fb950] font-bold hover:underline">All groups →</Link>
      </div>
      <div className="bg-[#161b22] border border-[#21262d] rounded-lg overflow-hidden">
        <div className="p-2 space-y-2 divide-y divide-[#21262d]">
          {Object.entries(GROUPS).map(([g, teams]) => (
            <div key={g} className="pt-2 first:pt-0">
              <GroupTable group={g} teams={teams} />
            </div>
          ))}
        </div>
        <div className="px-3 py-1.5 bg-[#0d1117]/40 border-t border-[#21262d] flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-[#3fb950]/50" />
          <span className="text-[9px] text-[#6e7681]">Qualify for Round of 32</span>
        </div>
      </div>
    </div>
  );
}
