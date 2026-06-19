export const revalidate = 300;

const GROUPS:{group:string;teams:{name:string;flag:string;p:number;w:number;d:number;l:number;gf:number;ga:number;pts:number}[]}[]=[
  {group:"A",teams:[
    {name:"Mexico",      flag:"🇲🇽",p:2,w:2,d:0,l:0,gf:3,ga:0,pts:6},
    {name:"South Korea", flag:"🇰🇷",p:2,w:1,d:0,l:1,gf:2,ga:2,pts:3},
    {name:"Ghana",       flag:"🇬🇭",p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3},
    {name:"Czechia",     flag:"🇨🇿",p:2,w:0,d:1,l:1,gf:2,ga:3,pts:1},
    {name:"South Africa",flag:"🇿🇦",p:2,w:0,d:1,l:1,gf:1,ga:4,pts:1},
    {name:"Panama",      flag:"🇵🇦",p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0},
  ]},
  {group:"B",teams:[
    {name:"Colombia",    flag:"🇨🇴",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},
    {name:"DR Congo",    flag:"🇨🇩",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
    {name:"Uzbekistan",  flag:"🇺🇿",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0},
    {name:"Ivory Coast", flag:"🇨🇮",p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0},
  ]},
  {group:"C",teams:[
    {name:"Canada",      flag:"🇨🇦",p:2,w:1,d:1,l:0,gf:7,ga:1,pts:4},
    {name:"Switzerland", flag:"🇨🇭",p:2,w:1,d:1,l:0,gf:5,ga:2,pts:4},
    {name:"Bosnia",      flag:"🇧🇦",p:2,w:0,d:1,l:1,gf:2,ga:5,pts:1},
    {name:"Qatar",       flag:"🇶🇦",p:2,w:0,d:0,l:2,gf:1,ga:7,pts:0},
  ]},
  {group:"D",teams:[
    {name:"USA",         flag:"🇺🇸",p:1,w:1,d:0,l:0,gf:4,ga:1,pts:3},
    {name:"Australia",   flag:"🇦🇺",p:1,w:1,d:0,l:0,gf:2,ga:0,pts:3},
    {name:"Turkey",      flag:"🇹🇷",p:1,w:0,d:0,l:1,gf:0,ga:2,pts:0},
    {name:"Paraguay",    flag:"🇵🇾",p:1,w:0,d:0,l:1,gf:1,ga:4,pts:0},
  ]},
  {group:"E",teams:[
    {name:"Scotland",    flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3},
    {name:"Brazil",      flag:"🇧🇷",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {name:"Morocco",     flag:"🇲🇦",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {name:"Haiti",       flag:"🇭🇹",p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0},
  ]},
  {group:"F",teams:[
    {name:"Germany",     flag:"🇩🇪",p:1,w:1,d:0,l:0,gf:7,ga:1,pts:3},
    {name:"Ivory Coast", flag:"🇨🇮",p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3},
    {name:"Ecuador",     flag:"🇪🇨",p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0},
    {name:"Curaçao",     flag:"🇨🇼",p:1,w:0,d:0,l:1,gf:1,ga:7,pts:0},
  ]},
  {group:"G",teams:[
    {name:"Sweden",      flag:"🇸🇪",p:1,w:1,d:0,l:0,gf:5,ga:1,pts:3},
    {name:"Netherlands", flag:"🇳🇱",p:1,w:0,d:1,l:0,gf:2,ga:2,pts:1},
    {name:"Japan",       flag:"🇯🇵",p:1,w:0,d:1,l:0,gf:2,ga:2,pts:1},
    {name:"Tunisia",     flag:"🇹🇳",p:1,w:0,d:0,l:1,gf:1,ga:5,pts:0},
  ]},
  {group:"H",teams:[
    {name:"Saudi Arabia",flag:"🇸🇦",p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3},
    {name:"Spain",       flag:"🇪🇸",p:1,w:0,d:1,l:0,gf:0,ga:0,pts:1},
    {name:"Cabo Verde",  flag:"🇨🇻",p:1,w:0,d:1,l:0,gf:0,ga:0,pts:1},
    {name:"Uruguay",     flag:"🇺🇾",p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0},
  ]},
  {group:"I",teams:[
    {name:"France",      flag:"🇫🇷",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},
    {name:"Norway",      flag:"🇳🇴",p:1,w:1,d:0,l:0,gf:4,ga:1,pts:3},
    {name:"Iran",        flag:"🇮🇷",p:1,w:0,d:1,l:0,gf:2,ga:2,pts:1},
    {name:"New Zealand", flag:"🇳🇿",p:1,w:0,d:1,l:0,gf:2,ga:2,pts:1},
    {name:"Belgium",     flag:"🇧🇪",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {name:"Egypt",       flag:"🇪🇬",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {name:"Senegal",     flag:"🇸🇳",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0},
    {name:"Iraq",        flag:"🇮🇶",p:1,w:0,d:0,l:1,gf:1,ga:4,pts:0},
  ]},
  {group:"J",teams:[
    {name:"Argentina",   flag:"🇦🇷",p:1,w:1,d:0,l:0,gf:3,ga:0,pts:3},
    {name:"Austria",     flag:"🇦🇹",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},
    {name:"Jordan",      flag:"🇯🇴",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0},
    {name:"Algeria",     flag:"🇩🇿",p:1,w:0,d:0,l:1,gf:0,ga:3,pts:0},
  ]},
  {group:"K",teams:[
    {name:"Colombia",    flag:"🇨🇴",p:1,w:1,d:0,l:0,gf:3,ga:1,pts:3},
    {name:"Portugal",    flag:"🇵🇹",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {name:"DR Congo",    flag:"🇨🇩",p:1,w:0,d:1,l:0,gf:1,ga:1,pts:1},
    {name:"Uzbekistan",  flag:"🇺🇿",p:1,w:0,d:0,l:1,gf:1,ga:3,pts:0},
  ]},
  {group:"L",teams:[
    {name:"England",     flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",p:1,w:1,d:0,l:0,gf:4,ga:2,pts:3},
    {name:"Ghana",       flag:"🇬🇭",p:1,w:1,d:0,l:0,gf:1,ga:0,pts:3},
    {name:"Croatia",     flag:"🇭🇷",p:1,w:0,d:0,l:1,gf:2,ga:4,pts:0},
    {name:"Panama",      flag:"🇵🇦",p:1,w:0,d:0,l:1,gf:0,ga:1,pts:0},
  ]},
];

const TOP_SCORERS=[
  {name:"Lionel Messi",    team:"Argentina", flag:"🇦🇷", goals:3},
  {name:"Jonathan David",  team:"Canada",    flag:"🇨🇦", goals:3},
  {name:"Harry Kane",      team:"England",   flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", goals:2},
  {name:"Erling Haaland",  team:"Norway",    flag:"🇳🇴", goals:2},
  {name:"Kylian Mbappe",   team:"France",    flag:"🇫🇷", goals:2},
  {name:"Kai Havertz",     team:"Germany",   flag:"🇩🇪", goals:2},
  {name:"Yasin Ayari",     team:"Sweden",    flag:"🇸🇪", goals:2},
  {name:"Folarin Balogun", team:"USA",       flag:"🇺🇸", goals:2},
  {name:"Johan Manzambi",  team:"Switzerland",flag:"🇨🇭",goals:2},
];

export default function StandingsPage(){
  return(
    <div className="max-w-[1100px] mx-auto">
      <div className="mb-4">
        <div className="text-[10px] font-bold text-amber-400/80 uppercase tracking-widest mb-1">FIFA World Cup 2026</div>
        <h1 className="text-2xl font-black text-white">Group Standings</h1>
        <p className="text-[11px] text-white/30 mt-1">Updated after Matchday 2 · June 18 2026 IST · Today&apos;s matches pending</p>
      </div>

      {/* Top Scorers */}
      <div className="card mb-6 overflow-hidden">
        <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2">
          <span>⚽</span>
          <span className="text-[11px] font-black text-white uppercase tracking-wide">Golden Boot Race — Top Scorers</span>
          <span className="text-[9px] text-white/30 ml-auto">After MD2</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {TOP_SCORERS.slice(0,9).map((s,i)=>(
            <div key={s.name} className="flex items-center gap-2.5 px-3 py-2">
              <span className="text-[8px] text-white/20 w-3 font-bold">{i+1}</span>
              <span className="text-[18px]">{s.flag}</span>
              <div className="flex-1 min-w-0">
                <div className={`text-[11px] font-bold truncate ${i===0?"text-amber-400":"text-white/80"}`}>{s.name}</div>
                <div className="text-[9px] text-white/30">{s.team}</div>
              </div>
              <div className={`text-[20px] font-black tabular-nums ${i===0?"text-amber-400":i<3?"text-white":"text-white/50"}`}>{s.goals}</div>
              <span className="text-[10px] text-white/25">⚽</span>
            </div>
          ))}
        </div>
      </div>

      {/* 12 Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GROUPS.map(({group,teams})=>{
          const sorted=[...teams].sort((a,b)=>b.pts-a.pts||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf);
          return(
            <div key={group} className="card overflow-hidden">
              <div className="px-3 py-2 bg-amber-500/8 border-b border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-black text-amber-400 uppercase tracking-widest">Group {group}</span>
                <div className="flex gap-2 text-[8px] text-white/20">
                  <span className="w-4 text-center">MP</span>
                  <span className="w-4 text-center">W</span>
                  <span className="w-4 text-center">D</span>
                  <span className="w-4 text-center">L</span>
                  <span className="w-4 text-center">GD</span>
                  <span className="w-6 text-center font-bold">PTS</span>
                </div>
              </div>
              {sorted.map((t,i)=>{
                const gd=t.gf-t.ga;
                const qualifies=i<2&&t.p>0;
                return(
                  <div key={t.name} className={`flex items-center gap-2 px-2.5 py-2 border-b border-white/4 last:border-none ${qualifies?"bg-green-500/3":""}`}>
                    <span className="text-[8px] text-white/20 w-3 text-center">{i+1}</span>
                    <span className={`w-1.5 h-1.5 rounded-sm flex-shrink-0 ${qualifies?"bg-green-500":"bg-white/5"}`}/>
                    <span className="text-[16px] w-5 text-center leading-none flex-shrink-0">{t.flag}</span>
                    <span className={`flex-1 text-[11px] font-semibold truncate ${qualifies?"text-green-400":"text-white/60"}`}>{t.name}</span>
                    <div className="flex gap-2 text-[10px] text-white/35 tabular-nums">
                      <span className="w-4 text-center">{t.p}</span>
                      <span className="w-4 text-center">{t.w}</span>
                      <span className="w-4 text-center">{t.d}</span>
                      <span className="w-4 text-center">{t.l}</span>
                      <span className="w-4 text-center">{gd>0?"+":""}{gd}</span>
                      <span className={`w-6 text-center font-black ${t.pts>0?"text-white":"text-white/25"}`}>{t.pts}</span>
                    </div>
                  </div>
                );
              })}
              <div className="px-3 py-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-sm bg-green-500/40"/>
                <span className="text-[8px] text-white/15">Round of 32</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[9px] text-white/15 text-center mt-4">
        Standings updated after each match · Group I has 8 teams (3 spots) · Some groups have played fewer matches
      </p>
    </div>
  );
}
