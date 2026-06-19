import Link from "next/link";
// Verified top scorers after MD2 — ESPN + FIFA.com
const SCORERS=[
  {name:"Messi",        team:"Argentina", flag:"🇦🇷", goals:3, assists:0, matches:1},
  {name:"J. David",     team:"Canada",    flag:"🇨🇦", goals:3, assists:0, matches:1},
  {name:"Kane",         team:"England",   flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", goals:2, assists:0, matches:1},
  {name:"Haaland",      team:"Norway",    flag:"🇳🇴", goals:2, assists:0, matches:1},
  {name:"Mbappe",       team:"France",    flag:"🇫🇷", goals:2, assists:0, matches:1},
  {name:"Havertz",      team:"Germany",   flag:"🇩🇪", goals:2, assists:0, matches:1},
  {name:"Ayari",        team:"Sweden",    flag:"🇸🇪", goals:2, assists:0, matches:1},
  {name:"Balogun",      team:"USA",       flag:"🇺🇸", goals:2, assists:0, matches:1},
  {name:"Manzambi",     team:"Switzerland",flag:"🇨🇭",goals:2, assists:0, matches:1},
];

export default function TopScorers(){
  return(
    <div>
      <div className="sh">
        <span className="text-xs">⚽</span><span>TOP SCORERS</span>
        <div className="sh-line"/>
        <span className="text-[8px] text-white/20 flex-shrink-0">After MD2</span>
      </div>
      <div className="card overflow-hidden">
        {SCORERS.map((s,i)=>(
          <div key={s.name} className="flex items-center gap-2 px-2.5 py-2 border-b border-white/4 last:border-none hover:bg-white/3 transition-colors">
            <span className="text-[8px] text-white/20 w-3 text-center font-bold">{i+1}</span>
            <span className="text-[15px] w-5 text-center">{s.flag}</span>
            <div className="flex-1 min-w-0">
              <div className={`text-[11px] font-bold truncate ${i===0?"text-amber-400":"text-white/80"}`}>{s.name}</div>
              <div className="text-[9px] text-white/30">{s.team}</div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className={`text-[16px] font-black tabular-nums ${i===0?"text-amber-400":i<3?"text-white":"text-white/60"}`}>{s.goals}</span>
              <span className="text-[8px] text-white/25">⚽</span>
            </div>
          </div>
        ))}
        <div className="px-3 py-1.5 text-[8px] text-white/15 text-center">
          🥇 Golden Boot race · Updated after each matchday
        </div>
      </div>
    </div>
  );
}
