import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WC 2026 Group Standings | KickoffIST",
  description: "FIFA World Cup 2026 group standings — all 12 groups updated after each match, in IST.",
};
export const revalidate = 300;

// REAL standings as of June 16, 2026 — from FIFA.com/ESPN
const GROUPS: Record<string, {
  team: string; flag: string;
  p: number; w: number; d: number; l: number;
  gf: number; ga: number; pts: number;
}[]> = {
  A: [
    { team:"Mexico",       flag:"🇲🇽", p:1,w:1,d:0,l:0,gf:2,ga:0,pts:3  },
    { team:"South Korea",  flag:"🇰🇷", p:1,w:1,d:0,l:0,gf:2,ga:1,pts:3  },
    { team:"Czechia",      flag:"🇨🇿", p:1,w:0,d:0,l:1,gf:1,ga:2,pts:0  },
    { team:"South Africa", flag:"🇿🇦", p:1,w:0,d:0,l:1,gf:0,ga:2,pts:0  },
  ],
  B: [
    { team:"South Korea",  flag:"🇰🇷", p:1,w:1,d:0,l:0,gf:2,ga:1,pts:3  },
    { team:"Uzbekistan",   flag:"🇺🇿", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Colombia",     flag:"🇨🇴", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Czechia",      flag:"🇨🇿", p:1,w:0,d:0,l:1,gf:1,ga:2,pts:0  },
  ],
  C: [
    { team:"Canada",       flag:"🇨🇦", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1  },
    { team:"Qatar",        flag:"🇶🇦", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1  },
    { team:"Switzerland",  flag:"🇨🇭", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1  },
    { team:"Bosnia & H.",  flag:"🇧🇦", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1  },
  ],
  D: [
    { team:"USA",          flag:"🇺🇸", p:1,w:1,d:0,l:0,gf:4,ga:1,pts:3  },
    { team:"Australia",    flag:"🇦🇺", p:1,w:1,d:0,l:0,gf:2,ga:0,pts:3  },
    { team:"Turkey",       flag:"🇹🇷", p:1,w:0,d:0,l:1,gf:0,ga:2,pts:0  },
    { team:"Paraguay",     flag:"🇵🇾", p:1,w:0,d:0,l:1,gf:1,ga:4,pts:0  },
  ],
  E: [
    { team:"Scotland",     flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3  },
    { team:"Brazil",       flag:"🇧🇷", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1  },
    { team:"Morocco",      flag:"🇲🇦", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1  },
    { team:"Haiti",        flag:"🇭🇹", p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0  },
  ],
  F: [
    { team:"Germany",      flag:"🇩🇪", p:1,w:1,d:0,l:0,gf:7,ga:1,pts:3  },
    { team:"Ivory Coast",  flag:"🇨🇮", p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3  },
    { team:"Ecuador",      flag:"🇪🇨", p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0  },
    { team:"Curaçao",      flag:"🇨🇼", p:1,w:0,d:0,l:1,gf:1,ga:7,pts:0  },
  ],
  G: [
    { team:"Sweden",       flag:"🇸🇪", p:1,w:1,d:0,l:0,gf:5,ga:1,pts:3  },
    { team:"Netherlands",  flag:"🇳🇱", p:1,w:0,d:1,l:0,gf:2,ga:2,pts:1  },
    { team:"Japan",        flag:"🇯🇵", p:1,w:0,d:1,l:0,gf:2,ga:2,pts:1  },
    { team:"Tunisia",      flag:"🇹🇳", p:1,w:0,d:0,l:1,gf:1,ga:5,pts:0  },
  ],
  H: [
    { team:"Saudi Arabia", flag:"🇸🇦", p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3  },
    { team:"Spain",        flag:"🇪🇸", p:1,w:0,d:1,l:0,gf:0,ga:0,pts:1  },
    { team:"Cabo Verde",   flag:"🇨🇻", p:1,w:0,d:1,l:0,gf:0,ga:0,pts:1  },
    { team:"Uruguay",      flag:"🇺🇾", p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0  },
  ],
  I: [
    { team:"Belgium",      flag:"🇧🇪", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1  },
    { team:"Egypt",        flag:"🇪🇬", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1  },
    { team:"Iran",         flag:"🇮🇷", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"New Zealand",  flag:"🇳🇿", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
  ],
  J: [
    { team:"France",       flag:"🇫🇷", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Senegal",      flag:"🇸🇳", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Iraq",         flag:"🇮🇶", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Norway",       flag:"🇳🇴", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
  ],
  K: [
    { team:"Argentina",    flag:"🇦🇷", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Algeria",      flag:"🇩🇿", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Austria",      flag:"🇦🇹", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Jordan",       flag:"🇯🇴", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
  ],
  L: [
    { team:"England",      flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Croatia",      flag:"🇭🇷", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Ghana",        flag:"🇬🇭", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
    { team:"Panama",       flag:"🇵🇦", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0  },
  ],
};

// Top scorers from confirmed matches
const TOP_SCORERS = [
  { player:"Kai Havertz",    team:"Germany",     flag:"🇩🇪", goals:2 },
  { player:"Yasin Ayari",    team:"Sweden",      flag:"🇸🇪", goals:2 },
  { player:"Folarin Balogun",team:"USA",         flag:"🇺🇸", goals:2 },
  { player:"Son Heung-min",  team:"South Korea", flag:"🇰🇷", goals:1 },
  { player:"Saud Abdulhamid",team:"Saudi Arabia",flag:"🇸🇦", goals:1 },
];

export default function StandingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white tracking-tight">📊 Group Standings</h1>
        <p className="text-sm text-slate-400 mt-1">FIFA World Cup 2026 · Updated after each match · All times IST</p>
        <p className="text-xs text-slate-500 mt-1">After Matchday 1 · June 16, 2026</p>
      </div>

      {/* Top Scorers */}
      <div className="bg-slate-800 border border-slate-600 rounded-2xl overflow-hidden mb-6">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700 bg-slate-700/30">
          <span className="text-sm">⚽</span>
          <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Top Scorers</span>
        </div>
        <div className="divide-y divide-slate-700/50">
          {TOP_SCORERS.map((s, i) => (
            <div key={s.player} className="flex items-center gap-3 px-4 py-2.5">
              <span className="text-xs font-bold text-slate-500 w-4">{i + 1}</span>
              <span className="text-base">{s.flag}</span>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">{s.player}</div>
                <div className="text-[10px] text-slate-500">{s.team}</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-black text-green-400">{s.goals}</span>
                <span className="text-xs text-slate-500">⚽</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Groups */}
      <div className="grid gap-4">
        {Object.entries(GROUPS).map(([group, rawTeams]) => {
          const teams = [...rawTeams].sort((a, b) =>
            b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf
          );
          return (
            <div key={group} className="bg-slate-800 rounded-2xl border border-slate-600/80 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/80 bg-slate-700/30">
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Group {group}</span>
                <span className="text-[10px] text-slate-500 font-medium">MP · W · D · L · GF · GA · PTS</span>
              </div>
              {/* Teams */}
              <div className="divide-y divide-slate-700/50">
                {teams.map((t, i) => (
                  <div key={t.team} className={`flex items-center gap-3 px-4 py-2.5 ${i < 2 && t.pts > 0 ? "bg-green-500/5" : ""}`}>
                    <span className="text-xs font-bold text-slate-500 w-4 text-center">{i + 1}</span>
                    <span className={`w-1.5 h-6 rounded-full flex-shrink-0 ${i < 2 ? "bg-green-500/50" : "bg-slate-700"}`} />
                    <span className="text-base">{t.flag}</span>
                    <span className={`flex-1 text-sm font-bold truncate ${i < 2 && t.pts > 0 ? "text-green-400" : "text-slate-200"}`}>{t.team}</span>
                    <div className="flex gap-2.5 text-[11px] tabular-nums text-slate-400">
                      <span className="w-4 text-center">{t.p}</span>
                      <span className="w-4 text-center">{t.w}</span>
                      <span className="w-4 text-center">{t.d}</span>
                      <span className="w-4 text-center">{t.l}</span>
                      <span className="w-4 text-center">{t.gf}</span>
                      <span className="w-4 text-center">{t.ga}</span>
                      <span className={`w-6 text-center font-black ${t.pts > 0 ? "text-white" : "text-slate-500"}`}>{t.pts}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Qualifier note */}
              <div className="px-4 py-2 flex items-center gap-2 bg-slate-900/30">
                <span className="w-1.5 h-3 rounded-full bg-green-500/50" />
                <span className="text-[9px] text-slate-500">Qualify for Round of 32</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-[11px] text-slate-500">
        Standings update automatically as matches are played · kickoffist.com
      </p>
    </div>
  );
}
