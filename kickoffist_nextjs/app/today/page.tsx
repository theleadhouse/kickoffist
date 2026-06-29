import { getStaticWCMatches, getStaticTodayMatches, getStaticTomorrowMatches, getLiveMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import HeroMatch from "@/components/HeroMatch";
import LiveSection from "@/components/LiveSection";
import MiniStandings from "@/components/MiniStandings";
import TopScorers from "@/components/TopScorers";
import Link from "next/link";

export const revalidate = 60;

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

  // R32 matches - upcoming only, sorted by date
  const r32All = all.filter(m=>m.group==="R32").sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime());
  const r32Done = r32All.filter(m=>m.status==="FINISHED");
  const r32Up = r32All.filter(m=>m.status==="UPCOMING"||m.status==="LIVE");

  const istNow = new Date(Date.now()+5.5*3600000);
  const dateStr = istNow.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});
  const hour = istNow.getUTCHours();
  const isMorning = hour>=5&&hour<12;
  const yesterday = new Date(Date.now()+5.5*3600000-86400000).toISOString().slice(0,10);
  const overnight = all.filter(m=>m.status==="FINISHED"&&m.istDate===yesterday)
    .sort((a,b)=>new Date(b.utcDate).getTime()-new Date(a.utcDate).getTime());

  return(
    <div style={{background:"#FFF8F0",minHeight:"100vh"}}>

      {/* MAGAZINE MASTHEAD */}
      <div style={{background:"#1B4332",padding:"14px 0 12px",marginBottom:"0"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
            <div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(11px,2vw,13px)",letterSpacing:"4px",color:"rgba(255,153,51,.8)",marginBottom:"3px"}}>
                ROUND OF 32 · FIFA WORLD CUP 2026 · IN IST
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:600,color:"rgba(255,255,255,.5)",letterSpacing:".06em"}}>{dateStr} · India Standard Time 🇮🇳</div>
            </div>
            <div style={{display:"flex",gap:"16px",alignItems:"center"}}>
              {[{n:`${played}`,l:"Played"},{n:`${104-played}`,l:"Left"},{n:`${r32Done.length}/16`,l:"R32 Done"}].map((s,i)=>(
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:".08em"}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1200px",margin:"0 auto",padding:"16px 16px 80px"}}>
        {live.length>0&&<LiveSection initialMatches={live}/>}

        {/* HERO */}
        {heroMatch&&<HeroMatch match={heroMatch} played={played} total={104}/>}

        {/* No match empty state */}
        {!heroMatch&&!live.length&&(
          <div style={{background:"#1B4332",borderRadius:"12px",padding:"40px 24px",textAlign:"center",marginBottom:"16px"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(24px,4vw,40px)",letterSpacing:"4px",color:"#fff",marginBottom:"8px"}}>⚽ ROUND OF 32</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",color:"rgba(255,255,255,.5)",marginBottom:"16px",letterSpacing:".06em"}}>
              {played} matches played · {r32Done.length} of 16 R32 matches complete
            </div>
            <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
              <Link href="/results" style={{background:"#FF9933",color:"#000",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"9px 18px",borderRadius:"6px",textDecoration:"none",letterSpacing:".08em"}}>RESULTS →</Link>
              <Link href="/world-cup" style={{background:"rgba(255,255,255,.1)",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"9px 18px",borderRadius:"6px",textDecoration:"none",letterSpacing:".08em",border:"1px solid rgba(255,255,255,.2)"}}>FULL BRACKET →</Link>
            </div>
          </div>
        )}

        <div style={{display:"grid",gap:"20px"}} className="lg:grid-cols-[1fr_280px]">
          <div>

            {/* OVERNIGHT */}
            {isMorning&&overnight.length>0&&(
              <div style={{marginBottom:"20px",background:"#FFFEF5",border:"2px solid #FF9933",borderRadius:"10px",overflow:"hidden"}}>
                <div style={{background:"#FF9933",padding:"8px 14px"}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"3px",color:"#000"}}>☀️ WHAT YOU MISSED OVERNIGHT</div>
                </div>
                <div style={{padding:"14px"}}>
                  {overnight.map(m=><PortalMatchCard key={m.id} match={m}/>)}
                </div>
              </div>
            )}

            {/* MORE TODAY */}
            {otherToday.length>0&&(
              <div style={{marginBottom:"20px"}}>
                <div className="sh sh-saff">⚡ MORE TODAY<div className="sh-line"/></div>
                {otherToday.map(m=><PortalMatchCard key={m.id} match={m}/>)}
              </div>
            )}

            {/* R32 SCHEDULE — THE MAIN FEATURE */}
            {r32Up.length>0&&(
              <div style={{marginBottom:"24px"}}>
                <div className="sh sh-green">
                  🏆 ROUND OF 32 SCHEDULE
                  <div className="sh-line"/>
                  <Link href="/world-cup" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#1B4332",textDecoration:"none",letterSpacing:".06em",flexShrink:0}}>FULL BRACKET →</Link>
                </div>
                {/* Date grouping */}
                {Array.from(new Set(r32Up.map(m=>m.istDate||m.utcDate.slice(0,10)))).map(date=>{
                  const dayMatches = r32Up.filter(m=>(m.istDate||m.utcDate.slice(0,10))===date);
                  if(!dayMatches.length) return null;
                  const d = new Date(date+"T00:00:00Z");
                  const label = d.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});
                  return(
                    <div key={date} style={{marginBottom:"16px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
                        <div style={{background:"#1B4332",color:"#FF9933",fontFamily:"'Bebas Neue',sans-serif",fontSize:"13px",letterSpacing:"2px",padding:"4px 12px",borderRadius:"4px",flexShrink:0}}>{label.toUpperCase()}</div>
                        <div style={{flex:1,height:"1px",background:"#E5DDD5"}}/>
                      </div>
                      {dayMatches.map(m=><PortalMatchCard key={m.id} match={m}/>)}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TOMORROW */}
            {tomorrow.length>0&&(
              <div style={{marginBottom:"20px"}}>
                <div className="sh">📅 TOMORROW<div className="sh-line"/></div>
                {tomorrow.map(m=><PortalMatchCard key={m.id} match={m}/>)}
              </div>
            )}

            {/* WATCH */}
            <div style={{background:"#1B4332",borderRadius:"10px",padding:"16px",marginBottom:"16px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"3px",color:"#FF9933",marginBottom:"8px"}}>📺 WATCH IN INDIA</div>
              <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
                <div style={{background:"rgba(255,153,51,.15)",border:"1px solid rgba(255,153,51,.3)",borderRadius:"8px",padding:"10px 18px"}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"3px",color:"#FF9933"}}>ZEE5</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.6)"}}>Exclusive rights · India · zee5.com</div>
                </div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.4)",lineHeight:1.6}}>Zee5 holds exclusive FIFA WC 2026 broadcast rights in India. Every match live.</div>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
              {[
                {href:"/results",  icon:"📋",label:"All Results",  sub:"Goals · Scores · Dates"},
                {href:"/world-cup",icon:"🏆",label:"R32 Bracket",  sub:"Full knockout schedule"},
                {href:"/standings",icon:"📊",label:"Group Tables",  sub:"Final standings"},
                {href:"/news",     icon:"🇮🇳",label:"IST Guide",   sub:"When to watch · Alarms"},
              ].map(l=>(
                <Link key={l.href} href={l.href} style={{textDecoration:"none"}}>
                  <div style={{background:"#fff",border:"1px solid #E5DDD5",borderRadius:"8px",padding:"14px",cursor:"pointer",transition:"all .15s",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
                    <div style={{fontSize:"20px",marginBottom:"5px"}}>{l.icon}</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#0A0A0A",letterSpacing:".04em"}}>{l.label}</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"#AAA",marginTop:"2px"}}>{l.sub}</div>
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
    </div>
  );
}
