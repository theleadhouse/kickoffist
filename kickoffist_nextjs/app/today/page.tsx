import { getStaticWCMatches, getStaticTodayMatches, getStaticTomorrowMatches, getLiveMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import MiniStandings from "@/components/MiniStandings";
import TopScorers from "@/components/TopScorers";
import LiveSection from "@/components/LiveSection";
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

  // What you missed overnight — yesterday's results
  const yesterday = new Date(Date.now() + 5.5*3600000 - 86400000).toISOString().slice(0,10);
  const missedOvernight = all
    .filter(m => m.status === "FINISHED" && m.istDate === yesterday)
    .sort((a,b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());

  // Most recent results if no yesterday
  const recentResults = all
    .filter(m => m.status === "FINISHED")
    .sort((a,b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime())
    .slice(0, 6);

  const showMissed = missedOvernight.length > 0;

  const comingUp = all
    .filter(m => m.status === "UPCOMING" && new Date(m.utcDate).getTime() > now + 24*3600*1000)
    .slice(0, 5);

  const played = all.filter(m => m.status === "FINISHED").length;

  const istNow = new Date(Date.now() + 5.5*3600000);
  const dateStr = istNow.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", timeZone:"UTC" });
  const hour = istNow.getUTCHours();
  const isMorning = hour >= 5 && hour < 12;

  return (
    <div>
      {/* ── STADIUM HERO ── */}
      <div style={{
        position:"relative", overflow:"hidden", borderRadius:"16px", marginBottom:"16px",
        background:"linear-gradient(160deg,#081428 0%,#0d1e40 55%,#081428 100%)",
        border:"1px solid rgba(255,153,51,.1)", minHeight:"130px",
        display:"flex", flexDirection:"column", justifyContent:"flex-end",
      }}>
        {/* Grid lines */}
        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.02) 0,rgba(255,255,255,.02) 1px,transparent 1px,transparent 52px),repeating-linear-gradient(90deg,rgba(255,255,255,.02) 0,rgba(255,255,255,.02) 1px,transparent 1px,transparent 52px)"}}/>
        {/* Circle */}
        <div style={{position:"absolute",right:"-2%",top:"50%",transform:"translateY(-50%)",width:"50%",aspectRatio:"1",borderRadius:"50%",border:"1px solid rgba(255,153,51,.06)"}}/>
        {/* Half line */}
        <div style={{position:"absolute",right:"calc(25% - 1px)",top:0,bottom:0,width:"1px",background:"rgba(255,153,51,.04)"}}/>
        {/* Ball */}
        <div style={{position:"absolute",right:"6%",top:"50%",transform:"translateY(-50%)",fontSize:"88px",opacity:.04,userSelect:"none",lineHeight:1}}>⚽</div>
        {/* Floodlight glow */}
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"60%",height:"40%",background:"radial-gradient(ellipse at 50% 0%,rgba(255,153,51,.06) 0%,transparent 70%)"}}/>

        <div style={{position:"relative",zIndex:1,padding:"20px 20px 18px"}}>
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:"7px",background:"rgba(255,153,51,.1)",border:"1px solid rgba(255,153,51,.18)",borderRadius:"6px",padding:"4px 12px",marginBottom:"10px"}}>
                <span>🏆</span>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933",letterSpacing:".12em"}}>FIFA WORLD CUP 2026</span>
              </div>
              <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,5vw,50px)",letterSpacing:"2px",color:"#fff",lineHeight:.92,marginBottom:"6px"}}>
                {live.length > 0 ? "🔴 LIVE NOW" :
                 todayUpcoming.length > 0 ? `${todayUpcoming.length} MATCH${todayUpcoming.length > 1 ? "ES" : ""} TODAY` :
                 isMorning && showMissed ? "GOOD MORNING ☀️" :
                 "NO MATCHES TODAY"}
              </h1>
              <p style={{fontSize:"12px",color:"rgba(200,212,232,.5)"}}>{dateStr} · Indian Standard Time 🇮🇳</p>
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              {[{n:`${played}`,l:"Played"},{n:`${104-played}`,l:"Left"}].map((s,i) => (
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
          {/* LIVE */}
          {live.length > 0 && <LiveSection initialMatches={live}/>}

          {/* TODAY'S MATCHES */}
          {todayUpcoming.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span style={{fontSize:"15px"}}>⚡</span>
                <span className="sh-accent">TODAY&apos;S MATCHES</span>
                <span className="badge-up">{todayUpcoming.length} UPCOMING · IST</span>
                <div className="sh-line"/>
              </div>
              {todayUpcoming.map(m => <PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* TODAY'S LIVE */}
          {todayLive.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span className="live-dot"/>
                <span style={{color:"#f87171",fontFamily:"'Teko',sans-serif"}}>LIVE NOW</span>
                <div className="sh-line"/>
              </div>
              {todayLive.map(m => <PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* ☀️ WHAT YOU MISSED OVERNIGHT */}
          {isMorning && showMissed && (
            <div style={{marginBottom:"20px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.1)",borderRadius:"14px",overflow:"hidden"}}>
              <div style={{padding:"12px 16px 0"}}>
                <div className="sh" style={{borderBottom:"1px solid rgba(255,153,51,.1)",marginBottom:"12px"}}>
                  <span>☀️</span>
                  <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933",letterSpacing:".1em"}}>WHAT YOU MISSED OVERNIGHT</span>
                  <div className="sh-line"/>
                  <Link href="/results" style={{fontSize:"10px",color:"#FF9933",fontWeight:600,textDecoration:"none",flexShrink:0}}>All results →</Link>
                </div>
              </div>
              <div style={{padding:"0 16px 14px"}}>
                {missedOvernight.map(m => <PortalMatchCard key={m.id} match={m}/>)}
              </div>
            </div>
          )}

          {/* NO MATCHES TODAY */}
          {live.length === 0 && todayUpcoming.length === 0 && todayLive.length === 0 && !isMorning && (
            <div className="card" style={{padding:"32px",textAlign:"center",marginBottom:"20px"}}>
              <div style={{fontSize:"36px",marginBottom:"10px"}}>😴</div>
              <div style={{fontFamily:"'Teko',sans-serif",fontSize:"20px",fontWeight:600,color:"rgba(200,212,232,.4)",marginBottom:"6px"}}>No matches scheduled today</div>
              <div style={{fontSize:"13px",color:"rgba(200,212,232,.3)"}}>Check tomorrow&apos;s fixtures below</div>
            </div>
          )}

          {/* RECENT RESULTS — if not morning */}
          {!isMorning && !showMissed && recentResults.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>📋</span>
                <span>RECENT RESULTS</span>
                <div className="sh-line"/>
                <Link href="/results" style={{fontSize:"10px",color:"#FF9933",fontWeight:600,textDecoration:"none",flexShrink:0}}>All →</Link>
              </div>
              {recentResults.map(m => <PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* TOMORROW */}
          {tomorrow.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>📅</span>
                <span>TOMORROW</span>
                <span className="badge-up">{tomorrow.length} MATCHES</span>
                <div className="sh-line"/>
              </div>
              {tomorrow.map(m => <PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* COMING UP */}
          {comingUp.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>🔜</span>
                <span>COMING UP</span>
                <div className="sh-line"/>
                <Link href="/world-cup" style={{fontSize:"10px",color:"#FF9933",fontWeight:600,textDecoration:"none",flexShrink:0}}>Full schedule →</Link>
              </div>
              {comingUp.map(m => <PortalMatchCard key={m.id} match={m} showDate/>)}
            </div>
          )}

          {/* WHERE TO WATCH */}
          <div className="card" style={{padding:"16px",marginBottom:"16px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.1)"}}>
            <div style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933",letterSpacing:".12em",marginBottom:"10px"}}>📺 WATCH IN INDIA</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px"}}>
              {[["JioCinema","Free · App/Web"],["Sports18","TV Channel"],["DD Sports","Free TV"]].map(([ch,tag]) => (
                <div key={ch} style={{background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,255,255,.06)",borderRadius:"10px",padding:"10px 12px",textAlign:"center"}}>
                  <div style={{fontFamily:"'Teko',sans-serif",fontSize:"16px",fontWeight:600,color:"#fff",marginBottom:"2px"}}>{ch}</div>
                  <div style={{fontSize:"10px",color:"rgba(200,212,232,.35)"}}>{tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{display:"none"}} className="lg:block">
          <div style={{position:"sticky",top:"122px",display:"flex",flexDirection:"column",gap:"16px"}}>
            <MiniStandings/>
            <TopScorers/>
          </div>
        </div>
      </div>
    </div>
  );
}
