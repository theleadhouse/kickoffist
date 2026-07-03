import { getStaticWCMatches, getStaticTodayMatches, getStaticTomorrowMatches, getLiveMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import HeroMatch from "@/components/HeroMatch";
import LiveSection from "@/components/LiveSection";
import MiniStandings from "@/components/MiniStandings";
import TopScorers from "@/components/TopScorers";
import Link from "next/link";

export const revalidate = 0;

export default async function TodayPage() {
  const [today, tomorrow, all, live] = await Promise.all([
    getStaticTodayMatches(), getStaticTomorrowMatches(),
    getStaticWCMatches(), getLiveMatches(),
  ]);

  const played = all.filter(m=>m.status==="FINISHED").length;
  const todayUp = today.filter(m=>m.status==="UPCOMING"&&m.homeTeam.name!=="TBD");
  const heroMatch = live[0]||todayUp[0]||null;
  const otherToday = todayUp.filter(m=>m.id!==heroMatch?.id);
  const r32Done = all.filter(m=>m.group==="R32"&&m.status==="FINISHED");
  const r32Up = all.filter(m=>m.group==="R32"&&m.status==="UPCOMING"&&m.homeTeam.name!=="TBD")
    .sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime());
  const r16All = all.filter(m=>m.group==="R16"&&m.homeTeam.name!=="TBD")
    .sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime());

  const istNow = new Date(Date.now()+5.5*3600000);
  const hour = istNow.getUTCHours();
  const isMorning = hour>=5&&hour<12;
  const yesterday = new Date(Date.now()+5.5*3600000-86400000).toISOString().slice(0,10);
  const overnight = all.filter(m=>m.status==="FINISHED"&&m.istDate===yesterday)
    .sort((a,b)=>new Date(b.utcDate).getTime()-new Date(a.utcDate).getTime()).slice(0,3);
  const dateStr = istNow.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});

  // Group R32 upcoming by IST date
  const r32ByDate = r32Up.reduce((acc,m)=>{
    const d=m.istDate||m.utcDate.slice(0,10); if(!acc[d])acc[d]=[]; acc[d].push(m); return acc;
  },{} as Record<string,typeof r32Up>);

  function fmtDate(d:string){return new Date(d+"T00:00:00Z").toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});}

  return(
    <div>
      {/* HEADER STRIP */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0 14px",borderBottom:"1px solid rgba(255,153,51,.12)",marginBottom:"14px",flexWrap:"wrap",gap:"8px"}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(11px,2.5vw,13px)",letterSpacing:"4px",color:"rgba(255,153,51,.6)",marginBottom:"2px"}}>ROUND OF 32 → ROUND OF 16 · FIFA WORLD CUP 2026</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.35)",letterSpacing:".04em"}}>{dateStr} · IST 🇮🇳</div>
        </div>
        <div style={{display:"flex",gap:"14px"}}>
          {[{n:`${r32Done.length}/16`,l:"R32 DONE"},{n:`${played}`,l:"TOTAL PLAYED"},{n:`${104-played}`,l:"LEFT"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"21px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".1em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {live.length>0&&<LiveSection initialMatches={live}/>}

      {/* HERO */}
      {heroMatch
        ?<HeroMatch match={heroMatch} played={played} total={104}/>
        :<div style={{background:"linear-gradient(150deg,#0d1f10 0%,#0a1a0c 50%,#080f09 100%)",borderRadius:"16px",padding:"36px 20px",textAlign:"center",marginBottom:"16px",border:"1px solid rgba(0,166,81,.2)"}}>
          <div style={{fontSize:"48px",marginBottom:"10px"}}>⚽</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(22px,4vw,38px)",letterSpacing:"4px",color:"#fff",marginBottom:"6px"}}>FIFA WORLD CUP 2026</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",color:"rgba(255,255,255,.4)",marginBottom:"16px"}}>{r32Done.length} of 16 Round of 32 matches complete · {played} total played</div>
          <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/results" style={{background:"#FF9933",color:"#000",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"10px 20px",borderRadius:"8px",textDecoration:"none",letterSpacing:".08em"}}>ALL RESULTS →</Link>
            <Link href="/world-cup" style={{background:"rgba(255,255,255,.08)",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"10px 20px",borderRadius:"8px",textDecoration:"none",letterSpacing:".08em",border:"1px solid rgba(255,255,255,.12)"}}>BRACKET →</Link>
          </div>
        </div>
      }

      <div style={{display:"grid",gap:"20px"}} className="lg:grid-cols-[1fr_280px]">
        <div>
          {/* OVERNIGHT */}
          {isMorning&&overnight.length>0&&(
            <div style={{marginBottom:"18px",background:"rgba(255,153,51,.05)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"12px",overflow:"hidden"}}>
              <div style={{padding:"10px 14px",background:"rgba(255,153,51,.08)",borderBottom:"1px solid rgba(255,153,51,.1)"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"3px",color:"#FF9933"}}>☀️ OVERNIGHT RESULTS</div></div>
              <div style={{padding:"12px"}}>{overnight.map(m=><PortalMatchCard key={m.id} match={m}/>)}</div>
            </div>
          )}

          {/* MORE TODAY */}
          {otherToday.length>0&&(
            <div style={{marginBottom:"18px"}}>
              <div className="sh">⚡ MORE TODAY<span className="badge-up">{otherToday.length}</span><div className="sh-line"/></div>
              {otherToday.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* R32 UPCOMING — grouped by date */}
          {Object.keys(r32ByDate).length>0&&(
            <div style={{marginBottom:"22px"}}>
              <div className="sh">🏆 ROUND OF 32 — REMAINING<div className="sh-line"/><Link href="/world-cup" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",flexShrink:0}}>BRACKET →</Link></div>
              {Object.entries(r32ByDate).sort(([a],[b])=>a.localeCompare(b)).map(([date,matches])=>(
                <div key={date} style={{marginBottom:"14px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"7px"}}>
                    <div style={{background:"#FF9933",color:"#000",fontFamily:"'Bebas Neue',sans-serif",fontSize:"12px",letterSpacing:"2px",padding:"3px 12px",borderRadius:"20px",flexShrink:0,boxShadow:"0 2px 8px rgba(255,153,51,.3)"}}>{fmtDate(date).toUpperCase()}</div>
                    <div style={{flex:1,height:"1px",background:"rgba(255,255,255,.08)"}}/>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,.25)",flexShrink:0}}>{matches.length} MATCH{matches.length>1?"ES":""}</span>
                  </div>
                  {matches.map(m=><PortalMatchCard key={m.id} match={m}/>)}
                </div>
              ))}
            </div>
          )}

          {/* R16 CONFIRMED */}
          {r16All.length>0&&(
            <div style={{marginBottom:"22px"}}>
              <div className="sh">🏆 ROUND OF 16<div className="sh-line"/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:700,color:"rgba(99,102,241,.8)",flexShrink:0}}>{r16All.filter(m=>m.status==="FINISHED").length}/{r16All.length} DONE</span></div>
              {r16All.map(m=><PortalMatchCard key={m.id} match={m} showDate/>)}
            </div>
          )}

          {/* TOMORROW */}
          {tomorrow.filter(m=>m.homeTeam.name!=="TBD"&&m.group!=="R32"&&m.group!=="R16").length>0&&(
            <div style={{marginBottom:"18px"}}>
              <div className="sh">📅 TOMORROW<div className="sh-line"/></div>
              {tomorrow.filter(m=>m.homeTeam.name!=="TBD"&&m.group!=="R32"&&m.group!=="R16").map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* WATCH */}
          <div style={{background:"rgba(255,153,51,.06)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"12px",padding:"14px",marginBottom:"14px"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",letterSpacing:"3px",color:"#FF9933",marginBottom:"8px"}}>📺 WATCH IN INDIA</div>
            <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
              <div style={{background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,153,51,.18)",borderRadius:"8px",padding:"8px 16px"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"19px",letterSpacing:"3px",color:"#FF9933"}}>ZEE5</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.45)"}}>Exclusive · India · zee5.com</div>
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.35)",lineHeight:1.6}}>Every WC 2026 match live. All times shown in IST.</div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
            {[
              {href:"/results",  icon:"📋",label:"All Results",  sub:"Scores · Goals"},
              {href:"/world-cup",icon:"🏆",label:"Full Bracket",  sub:"R32 + R16 + QF"},
              {href:"/standings",icon:"📊",label:"Group Tables",  sub:"Final standings"},
              {href:"/news",     icon:"🇮🇳",label:"IST Guide",   sub:"When to watch"},
            ].map(l=>(
              <Link key={l.href} href={l.href} style={{textDecoration:"none"}}>
                <div className="card card-hover" style={{padding:"13px"}}>
                  <div style={{fontSize:"19px",marginBottom:"4px"}}>{l.icon}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:800,color:"#fff",letterSpacing:".04em"}}>{l.label}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,.3)",marginTop:"2px"}}>{l.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{display:"none"}} className="lg:block">
          <div style={{position:"sticky",top:"76px",display:"flex",flexDirection:"column",gap:"14px"}}>
            <MiniStandings/>
            <TopScorers/>
          </div>
        </div>
      </div>
    </div>
  );
}
