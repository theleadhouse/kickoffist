import { getStaticWCMatches, getStaticTodayMatches, getStaticTomorrowMatches, getLiveMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import LiveSection from "@/components/LiveSection";
import HeroMatch from "@/components/HeroMatch";
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
  const played        = all.filter(m => m.status === "FINISHED").length;

  // Hero = first live match, or first today upcoming
  const heroMatch = live[0] || todayUpcoming[0] || null;

  // Other today matches after hero
  const otherToday = todayUpcoming.filter(m => m.id !== heroMatch?.id);

  const comingUp = all
    .filter(m => m.status === "UPCOMING" && new Date(m.utcDate).getTime() > now + 24*3600*1000)
    .slice(0, 6);

  const istNow    = new Date(Date.now() + 5.5*3600000);
  const hour      = istNow.getUTCHours();
  const isMorning = hour >= 5 && hour < 12;

  const yesterday = new Date(Date.now() + 5.5*3600000 - 86400000).toISOString().slice(0,10);
  const overnight = all
    .filter(m => m.status === "FINISHED" && m.istDate === yesterday)
    .sort((a,b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());

  return (
    // FULL WIDTH — no grid, no sidebar, everything same width
    <div style={{ maxWidth:"100%", margin:"0 auto" }}>

      {/* LIVE */}
      {live.length > 0 && <LiveSection initialMatches={live}/>}

      {/* HERO MATCH — full width */}
      {heroMatch
        ? <HeroMatch match={heroMatch} played={played} total={104}/>
        : (
          <div style={{
            position:"relative",overflow:"hidden",borderRadius:"16px",marginBottom:"16px",
            background:"linear-gradient(135deg,#0d1a0d 0%,#152e15 40%,#0a1a2a 100%)",
            border:"1px solid rgba(255,153,51,.15)",padding:"40px 24px",textAlign:"center",
          }}>
            <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 46px),repeating-linear-gradient(90deg,rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 46px)"}}/>
            <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"300px",aspectRatio:"1",borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.05)"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div style={{fontSize:"56px",marginBottom:"12px"}}>⚽</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(24px,4vw,40px)",letterSpacing:"3px",color:"#fff",marginBottom:"6px"}}>FIFA WORLD CUP 2026</div>
              <div style={{fontFamily:"'Teko',sans-serif",fontSize:"16px",color:"rgba(255,255,255,.45)",marginBottom:"20px",letterSpacing:".06em"}}>{played} matches played · {104-played} remaining · Jun 11–Jul 19</div>
              <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
                <Link href="/results" style={{fontFamily:"'Teko',sans-serif",fontSize:"15px",fontWeight:600,color:"#FF9933",background:"rgba(255,153,51,.1)",border:"1px solid rgba(255,153,51,.25)",borderRadius:"10px",padding:"10px 20px",textDecoration:"none",letterSpacing:".08em"}}>VIEW RESULTS →</Link>
                <Link href="/world-cup" style={{fontFamily:"'Teko',sans-serif",fontSize:"15px",fontWeight:600,color:"rgba(255,255,255,.6)",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"10px",padding:"10px 20px",textDecoration:"none",letterSpacing:".08em"}}>FULL SCHEDULE →</Link>
              </div>
            </div>
          </div>
        )
      }

      {/* WHAT YOU MISSED OVERNIGHT */}
      {isMorning && overnight.length > 0 && (
        <div style={{marginBottom:"20px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"14px",overflow:"hidden"}}>
          <div style={{padding:"14px 16px 0"}}>
            <div className="sh" style={{borderBottom:"1px solid rgba(255,153,51,.1)",marginBottom:"12px"}}>
              <span>☀️</span>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#FF9933",letterSpacing:".1em"}}>WHAT YOU MISSED OVERNIGHT</span>
              <div className="sh-line"/>
              <Link href="/results" style={{fontSize:"10px",color:"#FF9933",fontWeight:600,textDecoration:"none",flexShrink:0}}>All →</Link>
            </div>
          </div>
          <div style={{padding:"0 16px 14px"}}>
            {overnight.map(m => <PortalMatchCard key={m.id} match={m}/>)}
          </div>
        </div>
      )}

      {/* OTHER TODAY MATCHES */}
      {otherToday.length > 0 && (
        <div style={{marginBottom:"20px"}}>
          <div className="sh">
            <span style={{fontSize:"15px"}}>⚡</span>
            <span className="sh-accent">MORE TODAY</span>
            <span className="badge-up">{otherToday.length} MATCHES</span>
            <div className="sh-line"/>
          </div>
          {otherToday.map(m => <PortalMatchCard key={m.id} match={m}/>)}
        </div>
      )}

      {/* TOMORROW — full width like hero */}
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

      {/* WATCH */}
      <div className="card" style={{padding:"16px",marginBottom:"16px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.1)"}}>
        <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#FF9933",letterSpacing:".12em",marginBottom:"8px"}}>📺 WATCH IN INDIA</div>
        <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
          <div style={{background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"10px",padding:"10px 18px",flex:1,minWidth:"160px"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"2px",color:"#FF9933"}}>ZEE5</div>
            <div style={{fontSize:"11px",color:"rgba(255,255,255,.55)"}}>Exclusive rights · India · zee5.com</div>
          </div>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,.35)",lineHeight:1.6}}>Zee5 holds exclusive FIFA WC 2026 broadcast rights in India.</div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"8px"}}>
        {[
          {href:"/results",  icon:"📋",label:"All Results",   sub:"Goals · Dates"},
          {href:"/world-cup",icon:"📅",label:"Schedule",      sub:"104 matches IST"},
          {href:"/standings",icon:"📊",label:"Tables",        sub:"All 12 groups"},
          {href:"/news",     icon:"🇮🇳",label:"IST Guide",   sub:"When to watch"},
        ].map(l => (
          <Link key={l.href} href={l.href} style={{textDecoration:"none"}}>
            <div className="card card-hover" style={{padding:"14px",cursor:"pointer"}}>
              <div style={{fontSize:"22px",marginBottom:"6px"}}>{l.icon}</div>
              <div style={{fontFamily:"'Teko',sans-serif",fontSize:"15px",fontWeight:600,color:"rgba(255,255,255,.85)",letterSpacing:".03em"}}>{l.label}</div>
              <div style={{fontSize:"10px",color:"rgba(255,255,255,.3)",marginTop:"2px"}}>{l.sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
