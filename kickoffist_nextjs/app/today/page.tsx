import { getStaticWCMatches, getStaticTodayMatches, getStaticTomorrowMatches, getLiveMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import MiniStandings from "@/components/MiniStandings";
import TopScorers from "@/components/TopScorers";
import LiveSection from "@/components/LiveSection";
import Link from "next/link";

export const revalidate = 60;

export default async function TodayPage() {
  const [today, tomorrow, all, live] = await Promise.all([
    getStaticTodayMatches(),
    getStaticTomorrowMatches(),
    getStaticWCMatches(),
    getLiveMatches(),
  ]);

  const now = Date.now();
  const upcoming = all
    .filter(m => m.status === "UPCOMING" && new Date(m.utcDate).getTime() > now + 24*3600*1000)
    .slice(0, 6);

  const recent = all
    .filter(m => m.status === "FINISHED")
    .sort((a,b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime())
    .slice(0, 8);

  const played = all.filter(m => m.status === "FINISHED").length;
  const todayUpcoming = today.filter(m => m.status === "UPCOMING");
  const todayResults  = today.filter(m => m.status === "FINISHED");
  const todayLive     = today.filter(m => m.status === "LIVE");

  return (
    <div>
      {/* ── FOOTBALL PITCH HERO ─────────────────────────────────────── */}
      <div style={{
        background: "linear-gradient(135deg,#0a1a0a 0%,#0d2a0d 40%,#081808 100%)",
        borderRadius: "14px",
        padding: "24px 20px 20px",
        marginBottom: "20px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.06)",
      }}>
        {/* Pitch lines background art */}
        <div style={{
          position: "absolute", inset: 0, opacity: .07,
          backgroundImage: `
            repeating-linear-gradient(rgba(255,255,255,.6) 0, rgba(255,255,255,.6) 1px, transparent 1px, transparent 32px),
            repeating-linear-gradient(90deg, rgba(255,255,255,.6) 0, rgba(255,255,255,.6) 1px, transparent 1px, transparent 32px)
          `,
        }}/>
        {/* Centre circle */}
        <div style={{
          position:"absolute",right:"5%",top:"50%",transform:"translateY(-50%)",
          width:"220px",height:"220px",borderRadius:"50%",
          border:"2px solid rgba(255,255,255,.06)",
        }}/>
        {/* Ball watermark */}
        <div style={{position:"absolute",right:"8%",top:"50%",transform:"translateY(-50%)",fontSize:"120px",opacity:.04,userSelect:"none"}}>⚽</div>

        <div style={{position:"relative",zIndex:1}}>
          {/* Tournament badge */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:"8px",
            background:"rgba(255,153,51,.1)",border:"1px solid rgba(255,153,51,.25)",
            borderRadius:"6px",padding:"5px 14px",marginBottom:"14px",
          }}>
            <span style={{fontSize:"12px"}}>🏆</span>
            <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"11px",fontWeight:"800",color:"#FF9933",letterSpacing:".12em",textTransform:"uppercase"}}>
              FIFA World Cup 2026
            </span>
            <span style={{fontSize:"9px",color:"rgba(255,153,51,.5)"}}>USA · Canada · Mexico</span>
          </div>

          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
            <div>
              <h1 style={{
                fontFamily:"'Barlow Condensed','Oswald',sans-serif",
                fontSize:"clamp(32px,5vw,52px)",fontWeight:"900",
                color:"#fff",letterSpacing:"1px",lineHeight:.92,marginBottom:"8px",
              }}>
                {todayUpcoming.length > 0 || todayLive.length > 0
                  ? `${todayUpcoming.length + todayLive.length} MATCH${(todayUpcoming.length + todayLive.length) !== 1 ? "ES" : ""} TODAY`
                  : "TODAY'S RESULTS"
                }
              </h1>
              <p style={{fontSize:"13px",color:"rgba(255,255,255,.4)"}}>
                All times in Indian Standard Time 🇮🇳 · {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Kolkata"})}
              </p>
            </div>

            {/* Quick stats */}
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
              {[
                {n:`${played}`,l:"Played"},
                {n:`${104-played}`,l:"Left"},
                {n:"⚽",l:"Live Updates"},
              ].map((s,i)=>(
                <div key={i} style={{
                  background:"rgba(0,0,0,.4)",backdropFilter:"blur(8px)",
                  border:"1px solid rgba(255,255,255,.08)",
                  borderRadius:"8px",padding:"8px 14px",textAlign:"center",
                }}>
                  <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"20px",fontWeight:"900",color:"#FF9933",lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)",marginTop:"2px"}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ─────────────────────────────────── */}
      <div style={{display:"grid",gap:"16px"}} className="lg:grid-cols-[1fr_260px]">
        <div>

          {/* LIVE NOW */}
          {live.length > 0 && <LiveSection initialMatches={live}/>}

          {/* TODAY'S UPCOMING — the most important section */}
          {todayUpcoming.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span style={{fontSize:"14px"}}>⚡</span>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",letterSpacing:".1em"}}>TODAY&apos;S MATCHES</span>
                <span className="badge-up">{todayUpcoming.length} UPCOMING · IST</span>
                <div className="sh-line"/>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                {todayUpcoming.map(m => <PortalMatchCard key={m.id} match={m}/>)}
              </div>
            </div>
          )}

          {/* TODAY'S LIVE */}
          {todayLive.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span className="live-dot"/>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",letterSpacing:".1em",color:"#f87171"}}>LIVE NOW</span>
                <div className="sh-line"/>
              </div>
              {todayLive.map(m => <PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* TODAY'S RESULTS */}
          {todayResults.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>✅</span>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",letterSpacing:".1em"}}>TODAY&apos;S RESULTS</span>
                <span style={{fontSize:"9px",color:"rgba(255,255,255,.25)"}}>TAP FOR GOALSCORERS</span>
                <div className="sh-line"/>
              </div>
              {todayResults.map(m => <PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* RECENT RESULTS — last day */}
          {recent.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>📋</span>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",letterSpacing:".1em"}}>RECENT RESULTS</span>
                <div className="sh-line"/>
                <Link href="/world-cup" style={{fontSize:"10px",color:"#FF9933",fontWeight:"700",textDecoration:"none",flexShrink:0}}>All →</Link>
              </div>
              {recent.map(m => <PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* TOMORROW */}
          {tomorrow.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>📅</span>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",letterSpacing:".1em"}}>TOMORROW</span>
                <span className="badge-up">{tomorrow.length} MATCHES</span>
                <div className="sh-line"/>
              </div>
              {tomorrow.map(m => <PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* COMING UP */}
          {upcoming.length > 0 && (
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>🔜</span>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",letterSpacing:".1em"}}>COMING UP</span>
                <div className="sh-line"/>
                <Link href="/world-cup" style={{fontSize:"10px",color:"#FF9933",fontWeight:"700",textDecoration:"none",flexShrink:0}}>Full schedule →</Link>
              </div>
              {upcoming.map(m => <PortalMatchCard key={m.id} match={m} showDate/>)}
            </div>
          )}

          {/* QUICK LINKS */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"16px"}}>
            {[
              {href:"/world-cup", icon:"📅",label:"Full WC Schedule",   sub:"104 matches · all IST"},
              {href:"/standings", icon:"📊",label:"Group Tables",       sub:"All 12 groups · live"},
              {href:"/live",      icon:"🔴",label:"Live Scores",        sub:"Auto-refresh 60s"},
              {href:"/world-cup", icon:"🏆",label:"WC 2026 · Jul 19",  sub:"Final at MetLife NJ"},
            ].map(l=>(
              <Link key={l.label} href={l.href} style={{textDecoration:"none"}}>
                <div className="card" style={{padding:"12px",cursor:"pointer",transition:"background .15s"}}>
                  <div style={{fontSize:"20px",marginBottom:"5px"}}>{l.icon}</div>
                  <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"13px",fontWeight:"800",color:"rgba(255,255,255,.85)",letterSpacing:".03em"}}>{l.label}</div>
                  <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)",marginTop:"2px"}}>{l.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{display:"none"}} className="lg:block">
          <div style={{position:"sticky",top:"120px",display:"flex",flexDirection:"column",gap:"16px"}}>
            <MiniStandings/>
            <TopScorers/>
          </div>
        </div>
      </div>
    </div>
  );
}
