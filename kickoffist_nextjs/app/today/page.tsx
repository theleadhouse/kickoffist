import { getStaticWCMatches, getStaticTodayMatches, getStaticTomorrowMatches, getLiveMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import MiniStandings from "@/components/MiniStandings";
import TopScorers from "@/components/TopScorers";
import LiveSection from "@/components/LiveSection";
import MyTeams from "@/components/MyTeams";
import PredictBanner from "@/components/PredictBanner";
import Link from "next/link";

export const revalidate = 60;

export default async function TodayPage() {
  const [today, tomorrow, all, live] = await Promise.all([
    getStaticTodayMatches(), getStaticTomorrowMatches(),
    getStaticWCMatches(), getLiveMatches(),
  ]);

  const now = Date.now();
  const todayUpcoming = today.filter(m => m.status === "UPCOMING");
  const todayLive     = today.filter(m => m.status === "LIVE");

  const yesterday = new Date(Date.now() + 5.5*3600000 - 86400000).toISOString().slice(0,10);
  const missedOvernight = all
    .filter(m => m.status === "FINISHED" && m.istDate === yesterday)
    .sort((a,b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());

  const recentResults = all
    .filter(m => m.status === "FINISHED")
    .sort((a,b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime())
    .slice(0, 6);

  const comingUp = all
    .filter(m => m.status === "UPCOMING" && new Date(m.utcDate).getTime() > now + 24*3600*1000)
    .slice(0, 5);

  const played = all.filter(m => m.status === "FINISHED").length;
  const istNow = new Date(Date.now() + 5.5*3600000);
  const dateStr = istNow.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", timeZone:"UTC" });
  const hour = istNow.getUTCHours();
  const isMorning = hour >= 5 && hour < 12;
  const showMissed = missedOvernight.length > 0;

  return (
    <div>
      {/* ── HERO — no ticker, more space ── */}
      <div style={{
        position:"relative",overflow:"hidden",borderRadius:"16px",marginBottom:"16px",
        background:"linear-gradient(160deg,#081428 0%,#0d1e40 55%,#081428 100%)",
        border:"1px solid rgba(255,153,51,.1)",
      }}>
        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.02) 0,rgba(255,255,255,.02) 1px,transparent 1px,transparent 52px),repeating-linear-gradient(90deg,rgba(255,255,255,.02) 0,rgba(255,255,255,.02) 1px,transparent 1px,transparent 52px)"}}/>
        <div style={{position:"absolute",right:"-2%",top:"50%",transform:"translateY(-50%)",width:"50%",aspectRatio:"1",borderRadius:"50%",border:"1px solid rgba(255,153,51,.06)"}}/>
        <div style={{position:"absolute",right:"calc(25% - 1px)",top:0,bottom:0,width:"1px",background:"rgba(255,153,51,.04)"}}/>
        <div style={{position:"absolute",right:"7%",top:"50%",transform:"translateY(-50%)",fontSize:"86px",opacity:.035,userSelect:"none",lineHeight:1}}>⚽</div>
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"60%",height:"50%",background:"radial-gradient(ellipse at 50% 0%,rgba(255,153,51,.06) 0%,transparent 70%)"}}/>

        <div style={{position:"relative",zIndex:1,padding:"22px 20px 20px"}}>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:"7px",background:"rgba(255,153,51,.1)",border:"1px solid rgba(255,153,51,.18)",borderRadius:"6px",padding:"4px 12px",marginBottom:"10px"}}>
                <span>🏆</span>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933",letterSpacing:".12em"}}>FIFA WORLD CUP 2026</span>
              </div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,5vw,50px)",letterSpacing:"2px",color:"#fff",lineHeight:.9,marginBottom:"7px"}}>
                {live.length>0?"🔴 LIVE NOW":
                 todayUpcoming.length>0?`${todayUpcoming.length} MATCH${todayUpcoming.length>1?"ES":""} TODAY ⚡`:
                 isMorning&&showMissed?"GOOD MORNING ☀️":
                 "NO MATCHES TODAY"}
              </h1>
              <p style={{fontSize:"12px",color:"rgba(200,212,232,.5)"}}>{dateStr} · Indian Standard Time 🇮🇳</p>
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              {[{n:`${played}`,l:"Played"},{n:`${104-played}`,l:"Left"}].map((s,i)=>(
                <div key={i} style={{background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"10px",padding:"10px 14px",textAlign:"center"}}>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"26px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:"9px",color:"rgba(200,212,232,.4)",marginTop:"2px"}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{display:"grid",gap:"16px"}} className="lg:grid-cols-[1fr_260px]">
        <div>
          {/* MY TEAMS — personalisation */}
          <MyTeams/>

          {/* LIVE */}
          {live.length>0&&<LiveSection initialMatches={live}/>}

          {/* TODAY'S MATCHES */}
          {todayUpcoming.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span style={{fontSize:"15px"}}>⚡</span>
                <span style={{color:"#FF9933",fontFamily:"'Teko',sans-serif"}}>TODAY&apos;S MATCHES</span>
                <span className="badge-up">{todayUpcoming.length} UPCOMING · IST</span>
                <div className="sh-line"/>
              </div>
              {todayUpcoming.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* LIVE NOW */}
          {todayLive.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span className="live-dot"/>
                <span style={{color:"#f87171",fontFamily:"'Teko',sans-serif"}}>LIVE NOW</span>
                <div className="sh-line"/>
              </div>
              {todayLive.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* NO MATCHES */}
          {live.length===0&&todayUpcoming.length===0&&todayLive.length===0&&!isMorning&&(
            <div className="card" style={{padding:"32px",textAlign:"center",marginBottom:"20px"}}>
              <div style={{fontSize:"36px",marginBottom:"10px"}}>😴</div>
              <div style={{fontFamily:"'Teko',sans-serif",fontSize:"20px",fontWeight:600,color:"rgba(200,212,232,.4)",marginBottom:"6px"}}>No matches today</div>
              <div style={{fontSize:"13px",color:"rgba(200,212,232,.3)"}}>Check tomorrow&apos;s fixtures below</div>
            </div>
          )}

          {/* ☀️ WHAT YOU MISSED OVERNIGHT */}
          {isMorning&&showMissed&&(
            <div style={{marginBottom:"20px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"14px",overflow:"hidden"}}>
              <div style={{padding:"14px 16px 0"}}>
                <div className="sh" style={{borderBottom:"1px solid rgba(255,153,51,.1)",marginBottom:"12px"}}>
                  <span>☀️</span>
                  <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933",letterSpacing:".1em"}}>WHAT YOU MISSED OVERNIGHT</span>
                  <div className="sh-line"/>
                  <Link href="/results" style={{fontSize:"10px",color:"#FF9933",fontWeight:600,textDecoration:"none",flexShrink:0}}>All results →</Link>
                </div>
              </div>
              <div style={{padding:"0 16px 14px"}}>
                {missedOvernight.map(m=><PortalMatchCard key={m.id} match={m}/>)}
              </div>
            </div>
          )}

          {/* PREDICT BANNER */}
          <PredictBanner matches={todayUpcoming.length>0?todayUpcoming:tomorrow.slice(0,3)}/>

          {/* RECENT RESULTS */}
          {!isMorning&&recentResults.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>📋</span>
                <span>RECENT RESULTS</span>
                <div className="sh-line"/>
                <Link href="/results" style={{fontSize:"10px",color:"#FF9933",fontWeight:600,textDecoration:"none",flexShrink:0}}>All →</Link>
              </div>
              {recentResults.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* TOMORROW */}
          {tomorrow.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>📅</span>
                <span>TOMORROW</span>
                <span className="badge-up">{tomorrow.length} MATCHES</span>
                <div className="sh-line"/>
              </div>
              {tomorrow.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* COMING UP */}
          {comingUp.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>🔜</span>
                <span>COMING UP</span>
                <div className="sh-line"/>
                <Link href="/world-cup" style={{fontSize:"10px",color:"#FF9933",fontWeight:600,textDecoration:"none",flexShrink:0}}>Full schedule →</Link>
              </div>
              {comingUp.map(m=><PortalMatchCard key={m.id} match={m} showDate/>)}
            </div>
          )}

          {/* WATCH IN INDIA — Zee5 only */}
          <div className="card" style={{padding:"16px",marginBottom:"16px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.1)"}}>
            <div style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933",letterSpacing:".12em",marginBottom:"10px"}}>📺 WATCH IN INDIA</div>
            <div style={{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"}}>
              <div style={{background:"rgba(0,0,0,.4)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"12px",padding:"12px 18px",flex:1,minWidth:"180px"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"2px",color:"#FF9933",marginBottom:"3px"}}>ZEE5</div>
                <div style={{fontSize:"11px",color:"rgba(200,212,232,.6)",marginBottom:"2px"}}>Official India broadcaster</div>
                <div style={{fontSize:"10px",color:"rgba(200,212,232,.35)"}}>Exclusive rights for India · App & Web</div>
              </div>
              <div style={{fontSize:"11px",color:"rgba(200,212,232,.4)",maxWidth:"160px",lineHeight:1.6}}>
                Zee5 holds exclusive FIFA WC 2026 rights in India. Available on zee5.com and the Zee5 app.
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {[
              {href:"/results",  icon:"📋",label:"All Results",     sub:"Latest + previous day"},
              {href:"/world-cup",icon:"📅",label:"Full Schedule",   sub:"All 104 matches in IST"},
              {href:"/standings",icon:"📊",label:"Group Tables",    sub:"All 12 groups accurate"},
              {href:"/news",     icon:"📰",label:"News & Stories",  sub:"Messi record · Latest WC"},
            ].map(l=>(
              <Link key={l.href} href={l.href} style={{textDecoration:"none"}}>
                <div className="card card-hover" style={{padding:"14px",cursor:"pointer"}}>
                  <div style={{fontSize:"22px",marginBottom:"6px"}}>{l.icon}</div>
                  <div style={{fontFamily:"'Teko',sans-serif",fontSize:"15px",fontWeight:600,color:"rgba(255,255,255,.85)",letterSpacing:".03em"}}>{l.label}</div>
                  <div style={{fontSize:"10px",color:"rgba(200,212,232,.3)",marginTop:"2px"}}>{l.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{display:"none"}} className="lg:block">
          <div style={{position:"sticky",top:"80px",display:"flex",flexDirection:"column",gap:"16px"}}>
            <MiniStandings/>
            <TopScorers/>
          </div>
        </div>
      </div>
    </div>
  );
}
