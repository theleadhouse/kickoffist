import Link from "next/link";

const GROUPS: Record<string, { team:string; flag:string; p:number; w:number; d:number; l:number; gf:number; ga:number; pts:number }[]> = {
  A: [
    { team:"Mexico",       flag:"🇲🇽", p:1,w:1,d:0,l:0,gf:2,ga:0,pts:3 },
    { team:"South Korea",  flag:"🇰🇷", p:1,w:1,d:0,l:0,gf:2,ga:1,pts:3 },
    { team:"Czechia",      flag:"🇨🇿", p:1,w:0,d:0,l:1,gf:1,ga:2,pts:0 },
    { team:"South Africa", flag:"🇿🇦", p:1,w:0,d:0,l:1,gf:0,ga:2,pts:0 },
  ],
  D: [
    { team:"USA",          flag:"🇺🇸", p:1,w:1,d:0,l:0,gf:4,ga:1,pts:3 },
    { team:"Australia",    flag:"🇦🇺", p:1,w:1,d:0,l:0,gf:2,ga:0,pts:3 },
    { team:"Turkey",       flag:"🇹🇷", p:1,w:0,d:0,l:1,gf:0,ga:2,pts:0 },
    { team:"Paraguay",     flag:"🇵🇾", p:1,w:0,d:0,l:1,gf:1,ga:4,pts:0 },
  ],
  E: [
    { team:"Scotland",     flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3 },
    { team:"Brazil",       flag:"🇧🇷", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1 },
    { team:"Morocco",      flag:"🇲🇦", p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1 },
    { team:"Haiti",        flag:"🇭🇹", p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0 },
  ],
  F: [
    { team:"Germany",      flag:"🇩🇪", p:1,w:1,d:0,l:0,gf:7,ga:1,pts:3 },
    { team:"Ivory Coast",  flag:"🇨🇮", p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3 },
    { team:"Ecuador",      flag:"🇪🇨", p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0 },
    { team:"Curaçao",      flag:"🇨🇼", p:1,w:0,d:0,l:1,gf:1,ga:7,pts:0 },
  ],
  H: [
    { team:"Saudi Arabia", flag:"🇸🇦", p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3 },
    { team:"Spain",        flag:"🇪🇸", p:1,w:0,d:1,l:0,gf:0,ga:0,pts:1 },
    { team:"Cabo Verde",   flag:"🇨🇻", p:1,w:0,d:1,l:0,gf:0,ga:0,pts:1 },
    { team:"Uruguay",      flag:"🇺🇾", p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0 },
  ],
};

export default function MiniStandings() {
  return (
    <div>
      <div className="sh">
        <span>📊</span>
        <span>STANDINGS</span>
        <Link href="/standings" className="ml-auto text-[10px] text-blue-400 hover:underline font-bold">All 12 groups →</Link>
      </div>
      <div className="card overflow-hidden">
        {Object.entries(GROUPS).map(([g, rawTeams], gi) => {
          const teams = [...rawTeams].sort((a,b) => b.pts-a.pts || (b.gf-b.ga)-(a.gf-a.ga));
          return (
            <div key={g} className={gi > 0 ? "border-t border-white/5" : ""}>
              <div className="flex items-center justify-between px-3 py-1.5 bg-white/3">
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">Group {g}</span>
                <span className="text-[8px] text-white/30">MP · PTS</span>
              </div>
              {teams.map((t, i) => (
                <div key={t.team} className="st-row">
                  <span className="text-[9px] text-white/30 w-3 text-center">{i+1}</span>
                  <span className={`st-q ${i < 2 ? "q" : ""}`} />
                  <span className="text-base w-5 text-center">{t.flag}</span>
                  <span className={`flex-1 text-[11px] font-medium truncate ${i < 2 && t.pts > 0 ? "text-green-400" : "text-slate-300"}`}>{t.team}</span>
                  <span className="text-[10px] text-white/40 w-4 text-center">{t.p}</span>
                  <span className={`text-[11px] font-black w-5 text-center ${t.pts > 0 ? "text-white" : "text-white/30"}`}>{t.pts}</span>
                </div>
              ))}
            </div>
          );
        })}
        <div className="px-3 py-1.5 border-t border-white/5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-green-500/50" />
          <span className="text-[9px] text-white/30">Qualify for Round of 32</span>
        </div>
      </div>
    </div>
  );
}
