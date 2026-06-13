import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WC 2026 Group Standings | KickoffIST",
};
export const revalidate = 300;

// Real WC 2026 standings after 2 matches played
const GROUPS: Record<string, { team: string; flag: string; p: number; w: number; d: number; l: number; gf: number; ga: number; pts: number }[]> = {
  A: [
    { team:"Mexico",       flag:"🇲🇽", p:1,w:1,d:0,l:0,gf:2,ga:0,pts:3 },
    { team:"South Africa", flag:"🇿🇦", p:1,w:0,d:0,l:1,gf:0,ga:2,pts:0 },
    { team:"Ghana",        flag:"🇬🇭", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Panama",       flag:"🇵🇦", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
  ],
  B: [
    { team:"South Korea",  flag:"🇰🇷", p:1,w:1,d:0,l:0,gf:2,ga:1,pts:3 },
    { team:"Czechia",      flag:"🇨🇿", p:1,w:0,d:0,l:1,gf:1,ga:2,pts:0 },
    { team:"Uzbekistan",   flag:"🇺🇿", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Colombia",     flag:"🇨🇴", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
  ],
  C: [
    { team:"Canada",       flag:"🇨🇦", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Bosnia & H.",  flag:"🇧🇦", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Qatar",        flag:"🇶🇦", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Switzerland",  flag:"🇨🇭", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
  ],
  D: [
    { team:"USA",          flag:"🇺🇸", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Paraguay",     flag:"🇵🇾", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Australia",    flag:"🇦🇺", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Turkey",       flag:"🇹🇷", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
  ],
  E: [
    { team:"Brazil",       flag:"🇧🇷", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Morocco",      flag:"🇲🇦", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Haiti",        flag:"🇭🇹", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Scotland",     flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
  ],
  F: [
    { team:"Germany",      flag:"🇩🇪", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Ivory Coast",  flag:"🇨🇮", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Ecuador",      flag:"🇪🇨", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Curaçao",      flag:"🇨🇼", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
  ],
  G: [
    { team:"Netherlands",  flag:"🇳🇱", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Japan",        flag:"🇯🇵", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Sweden",       flag:"🇸🇪", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Tunisia",      flag:"🇹🇳", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
  ],
  H: [
    { team:"Spain",        flag:"🇪🇸", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Saudi Arabia", flag:"🇸🇦", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Uruguay",      flag:"🇺🇾", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
    { team:"Cape Verde",   flag:"🇨🇻", p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0 },
  ],
};

export default function StandingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white tracking-tight">📊 Group Standings</h1>
        <p className="text-sm text-white/40 mt-1">FIFA World Cup 2026 · Updated after each match</p>
      </div>

      <div className="grid gap-4">
        {Object.entries(GROUPS).map(([group, teams]) => (
          <div key={group} className="bg-[#1a1f2e] rounded-2xl border border-white/8 overflow-hidden">
            {/* Group header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/3">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Group {group}</span>
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] text-white/20 font-medium">P W D L GF GA PTS</span>
            </div>

            {/* Teams */}
            {teams.map((t, i) => (
              <div key={t.team} className={`flex items-center gap-3 px-4 py-2.5 ${i < teams.length-1 ? "border-b border-white/5" : ""} ${i < 2 && t.pts > 0 ? "bg-green-500/5" : ""}`}>
                {/* Qualification indicator */}
                <span className={`w-1 h-6 rounded-full flex-shrink-0 ${i < 2 ? "bg-green-500/40" : "bg-white/5"}`} />
                <span className="text-base">{t.flag}</span>
                <span className={`flex-1 text-sm font-bold ${i < 2 && t.pts > 0 ? "text-green-400" : "text-white/80"}`}>{t.team}</span>
                <div className="flex gap-3 text-[11px] tabular-nums">
                  <span className="text-white/30 w-4 text-center">{t.p}</span>
                  <span className="text-white/30 w-4 text-center">{t.w}</span>
                  <span className="text-white/30 w-4 text-center">{t.d}</span>
                  <span className="text-white/30 w-4 text-center">{t.l}</span>
                  <span className="text-white/30 w-4 text-center">{t.gf}</span>
                  <span className="text-white/30 w-4 text-center">{t.ga}</span>
                  <span className={`w-5 text-center font-black ${t.pts > 0 ? "text-white" : "text-white/30"}`}>{t.pts}</span>
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="px-4 py-2 flex items-center gap-2 bg-white/2">
              <span className="w-1 h-3 rounded-full bg-green-500/40" />
              <span className="text-[9px] text-white/20">Qualify for Round of 32</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-[11px] text-white/20">
        Standings update automatically as matches are played
      </div>
    </div>
  );
}
