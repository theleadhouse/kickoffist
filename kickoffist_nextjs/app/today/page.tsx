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

  const now = Date.now();
  const played = all.filter(m=>m.status==="FINISHED").length;
  const todayUpcoming = today.filter(m=>m.status==="UPCOMING");
  const heroMatch = live[0]||todayUpcoming[0]||null;
  const otherToday = todayUpcoming.filter(m=>m.id!==heroMatch?.id);

  // All R32 upcoming - sorted by date, no TBD
  const r32Up = all
    .filter(m=>m.group==="R32"&&m.status==="UPCOMING"&&m.homeTeam.name!=="TBD")
    .sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime());

  const r32Done = all.filter(m=>m.group==="R32"&&m.status==="FINISHED");

  const istNow = new Date(Date.now()+5.5*3600000);
  const hour = istNow.getUTCHours();
  const isMorning = hour>=5&&hour<12;
  const yesterday = new Date(Date.now()+5.5*3600000-86400000).toISOString().slice(0,10);
  const overnight = all.filter(m=>m.status==="FINISHED"&&m.istDate===yesterday)
    .sort((a,b)=>new Date(b.utcDate).getTime()-new Date(a.utcDate).getTime());

  // Group R32 by IST date
  const r32ByDate = r32Up.reduce((acc,m)=>{
    const d = m.istDate||m.utcDate.slice(0,10);
    if(!acc[d]) acc[d]=[];
    acc[d].push(m);
    return acc;
  },{} as Record<string,typeof r32Up>);

  const dateStr = istNow.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});

  function fmtDate(d:string){
    return new Date(d+"T00:00:00Z").toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});
  }

  return(
    <div>
      {/* MASTHEAD */}
      <div style={{padding:"12px 16px",borderBottom:"1px solid rgba(255,153,51,.15)",marginBottom:"16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(11px,2.5vw,13px)",letterSpacing:"4px",color:"rgba(255,153,51,.7)",marginBottom:"2px"}}>ROUND OF 32 · FIFA WORLD CUP 2026</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.4)",letterSpacing:".04em"}}>{dateStr} · Indian Standard Time 🇮🇳</div>
        </div>
        <div style={{display:"flex",gap:"14px"}}>
          {[{n:`${played}`,l:"PLAYED"},{n:`${104-played}`,l:"LEFT"},{n:`${r32Done.length}/16`,l:"R32 DONE"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,255,255,.35)",letterSpacing:".1em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {live.length>0&&<LiveSection initialMatches={live}/>}

      {/* HERO */}
      {heroMatch
        ?<HeroMatch match={heroMatch} played={played} total={104}/>
        :<div style={{background:"linear-gradient(150deg,#051428 0%,#0a2040 40%,#051428 100%)",borderRadius:"16px",padding:"36px 20px",textAlign:"center",marginBottom:"16px",border:"1px solid rgba(255,153,51,.2)"}}>
          <div style={{fontSize:"52px",marginBottom:"12px"}}>⚽</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(22px,4vw,38px)",letterSpacing:"4px",color:"#fff",marginBottom:"6px"}}>FIFA WORLD CUP 2026</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",color:"rgba(255,255,255,.45)",marginBottom:"18px"}}>
            {played} matches played · {r32Done.length} of 16 Round of 32 complete
          </div>
          <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/results" style={{background:"#FF9933",color:"#000",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"10px 20px",borderRadius:"8px",textDecoration:"none",letterSpacing:".08em"}}>VIEW RESULTS →</Link>
            <Link href="/world-cup" style={{background:"rgba(255,255,255,.1)",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"10px 20px",borderRadius:"8px",textDecoration:"none",letterSpacing:".08em",border:"1px solid rgba(255,255,255,.15)"}}>FULL BRACKET →</Link>
          </div>
        </div>
      }

      <div style={{display:"grid",gap:"20px"}} className="lg:grid-cols-[1fr_280px]">
        <div>
          {/* OVERNIGHT */}
          {isMorning&&overnight.length>0&&(
            <div style={{marginBottom:"20px",background:"rgba(255,153,51,.05)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"12px",overflow:"hidden"}}>
              <div style={{background:"rgba(255,153,51,.1)",padding:"10px 14px",borderBottom:"1px solid rgba(255,153,51,.15)"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"3px",color:"#FF9933"}}>☀️ WHAT YOU MISSED OVERNIGHT</div>
              </div>
              <div style={{padding:"14px"}}>
                {overnight.map(m=><PortalMatchCard key={m.id} match={m}/>)}
              </div>
            </div>
          )}

          {/* MORE TODAY */}
          {otherToday.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">⚡ MORE TODAY<span className="badge-up">{otherToday.length}</span><div className="sh-line"/></div>
              {otherToday.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* R32 SCHEDULE — FULL, BY DATE, NO TBD */}
          {r32Up.length>0&&(
            <div style={{marginBottom:"24px"}}>
              <div className="sh">
                🏆 ROUND OF 32 SCHEDULE
                <div className="sh-line"/>
                <Link href="/world-cup" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",letterSpacing:".06em",flexShrink:0}}>BRACKET →</Link>
              </div>

              {Object.entries(r32ByDate).sort(([a],[b])=>a.localeCompare(b)).map(([date,matches])=>(
                <div key={date} style={{marginBottom:"16px"}}>
                  {/* Date header */}
                  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
                    <div style={{
                      background:"linear-gradient(90deg,#FF9933,rgba(255,153,51,.6))",
                      color:"#000",fontFamily:"'Bebas Neue',sans-serif",
                      fontSize:"13px",letterSpacing:"2px",
                      padding:"4px 14px",borderRadius:"20px",flexShrink:0,
                      boxShadow:"0 2px 8px rgba(255,153,51,.3)",
                    }}>
                      {fmtDate(date).toUpperCase()}
                    </div>
                    <div style={{flex:1,height:"1px",background:"rgba(255,255,255,.08)"}}/>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,.3)",flexShrink:0}}>{matches.length} MATCH{matches.length>1?"ES":""}</span>
                  </div>
                  {matches.map(m=><PortalMatchCard key={m.id} match={m}/>)}
                </div>
              ))}
            </div>
          )}

          {/* TOMORROW */}
          {tomorrow.filter(m=>m.group!=="R32"&&m.homeTeam.name!=="TBD").length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">📅 TOMORROW<div className="sh-line"/></div>
              {tomorrow.filter(m=>m.group!=="R32"&&m.homeTeam.name!=="TBD").map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* WATCH */}
          <div style={{background:"rgba(255,153,51,.08)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"12px",padding:"16px",marginBottom:"16px"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"3px",color:"#FF9933",marginBottom:"8px"}}>📺 WATCH IN INDIA</div>
            <div style={{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
              <div style={{background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,153,51,.2)",borderRadius:"8px",padding:"10px 18px"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"3px",color:"#FF9933"}}>ZEE5</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.5)"}}>Exclusive rights · India · zee5.com</div>
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.4)",lineHeight:1.6}}>Every Round of 32 match live on Zee5. All times shown in IST.</div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {[
              {href:"/results",  icon:"📋",label:"All Results",  sub:"Scores · Goals · Dates"},
              {href:"/world-cup",icon:"🏆",label:"R32 Bracket",  sub:"Full knockout draw IST"},
              {href:"/standings",icon:"📊",label:"Group Tables",  sub:"Final standings"},
              {href:"/news",     icon:"🇮🇳",label:"IST Guide",   sub:"When to watch"},
            ].map(l=>(
              <Link key={l.href} href={l.href} style={{textDecoration:"none"}}>
                <div className="card card-hover" style={{padding:"14px"}}>
                  <div style={{fontSize:"20px",marginBottom:"5px"}}>{l.icon}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#fff",letterSpacing:".04em"}}>{l.label}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,.35)",marginTop:"2px"}}>{l.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{display:"none"}} className="lg:block">
          <div style={{position:"sticky",top:"76px",display:"flex",flexDirection:"column",gap:"16px"}}>
            <MiniStandings/>
            <TopScorers/>
          </div>
        </div>
      </div>
    </div>
  );
}
