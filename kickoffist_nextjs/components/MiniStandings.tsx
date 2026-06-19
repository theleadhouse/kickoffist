import Link from "next/link";
// Updated after MD2 (through June 18 IST)
const GROUPS:{[k:string]:{team:string;flag:string;p:number;w:number;d:number;l:number;gf:number;ga:number;pts:number}[]}={
  A:[
    {team:"Mexico",      flag:"🇲🇽",p:2,w:2,d:0,l:0,gf:3,ga:0,pts:6},
    {team:"South Korea", flag:"🇰🇷",p:2,w:1,d:0,l:1,gf:2,ga:2,pts:3},
    {team:"Ghana",       flag:"🇬🇭",p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3},
    {team:"Czechia",     flag:"🇨🇿",p:2,w:0,d:1,l:1,gf:2,ga:3,pts:1},
  ],
  C:[
    {team:"Canada",      flag:"🇨🇦",p:2,w:1,d:1,l:0,gf:7,ga:1,pts:4},
    {team:"Switzerland", flag:"🇨🇭",p:2,w:1,d:1,l:0,gf:5,ga:2,pts:4},
    {team:"Bosnia",      flag:"🇧🇦",p:2,w:0,d:1,l:1,gf:2,ga:5,pts:1},
    {team:"Qatar",       flag:"🇶🇦",p:2,w:0,d:1,l:1,gf:1,ga:7,pts:0},  // corrected: Qatar 1-1 Swiss, 0-6 Canada
  ],
  D:[
    {team:"USA",         flag:"🇺🇸",p:1,w:1,d:0,l:0,gf:4,ga:1,pts:3},
    {team:"Australia",   flag:"🇦🇺",p:1,w:1,d:0,l:0,gf:2,ga:0,pts:3},
    {team:"Turkey",      flag:"🇹🇷",p:1,w:0,d:0,l:1,gf:0,ga:2,pts:0},
    {team:"Paraguay",    flag:"🇵🇾",p:1,w:0,d:0,l:1,gf:1,ga:4,pts:0},
  ],
  J:[
    {team:"Argentina",   flag:"🇦🇷",p:1,w:1,d:0,l:0,gf:3,ga:0,pts:3},
    {team:"Austria",     flag:"🇦🇹",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},
    {team:"Jordan",      flag:"🇯🇴",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0},
    {team:"Algeria",     flag:"🇩🇿",p:1,w:0,d:0,l:1,gf:0,ga:3,pts:0},
  ],
  K:[
    {team:"Colombia",    flag:"🇨🇴",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},
    {team:"Portugal",    flag:"🇵🇹",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {team:"DR Congo",    flag:"🇨🇩",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {team:"Uzbekistan",  flag:"🇺🇿",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0},
  ],
};

export default function MiniStandings(){
  return(
    <div>
      <div className="sh">
        <span className="text-xs">📊</span><span>STANDINGS</span>
        <div className="sh-line"/>
        <Link href="/standings" className="text-[10px] text-blue-400 hover:underline font-bold flex-shrink-0 ml-1">All 12 →</Link>
      </div>
      <div className="card overflow-hidden">
        {Object.entries(GROUPS).map(([g,raw],gi)=>{
          const teams=[...raw].sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga));
          return(
            <div key={g} className={gi>0?"border-t border-white/5":""}>
              <div className="flex items-center justify-between px-2.5 py-1.5 bg-white/2">
                <span className="text-[8px] font-black text-amber-400/80 uppercase tracking-widest">Group {g}</span>
                <span className="text-[8px] text-white/20">MP PTS</span>
              </div>
              {teams.map((t,i)=>(
                <div key={t.team} className="st-row">
                  <span className="text-[8px] text-white/25 w-3 text-center">{i+1}</span>
                  <span className={`st-q ${i<2&&t.pts>0?"q":""}`}/>
                  <span className="text-[15px] w-5 text-center leading-none">{t.flag}</span>
                  <span className={`flex-1 text-[10px] font-semibold truncate ${i<2&&t.pts>0?"text-green-400":"text-white/60"}`}>{t.team}</span>
                  <span className="text-[9px] text-white/30 w-4 text-center tabular-nums">{t.p}</span>
                  <span className={`text-[10px] font-black w-5 text-center tabular-nums ${t.pts>0?"text-white":"text-white/25"}`}>{t.pts}</span>
                </div>
              ))}
            </div>
          );
        })}
        <div className="px-3 py-1.5 border-t border-white/5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-green-500/40"/>
          <span className="text-[8px] text-white/20">Qualify for Round of 32</span>
        </div>
      </div>
    </div>
  );
}
