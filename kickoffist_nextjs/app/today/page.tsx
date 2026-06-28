import { getStaticWCMatches, getStaticTodayMatches, getStaticTomorrowMatches, getLiveMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import MiniStandings from "@/components/MiniStandings";
import TopScorers from "@/components/TopScorers";
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
  const todayUpcoming = today.filter(m=>m.status==="UPCOMING");
  const played = all.filter(m=>m.status==="FINISHED").length;
  const heroMatch = live[0]||todayUpcoming[0]||null;
  const otherToday = todayUpcoming.filter(m=>m.id!==heroMatch?.id);

  // R32 upcoming matches
  const r32Upcoming = all
    .filter(m=>m.status==="UPCOMING"&&m.group==="R32")
    .sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime())
    .slice(0,6);

  const comingUp = all
    .filter(m=>m.status==="UPCOMING"&&m.group!=="R32"&&new Date(m.utcDate).getTime()>now+24*3600*1000)
    .slice(0,4);

  const istNow = new Date(Date.now()+5.5*3600000);
  const hour = istNow.getUTCHours();
  const isMorning = hour>=5&&hour<12;
  const yesterday = new Date(Date.now()+5.5*3600000-86400000).toISOString().slice(0,10);
  const overnight = all.filter(m=>m.status==="FINISHED"&&m.istDate===yesterday)
    .sort((a,b)=>new Date(b.utcDate).getTime()-new Date(a.utcDate).getTime());

  const dateStr = istNow.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});

  return (
    <div>
      {/* ── MASTHEAD DATE LINE ── */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0 14px",borderBottom:"1px solid #E5E5E0",marginBottom:"16px"}}>
        <div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".18em",marginBottom:"2px"}}>🏆 FIFA WORLD CUP 2026 · ROUND OF 32</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:600,color:"#666",letterSpacing:".04em"}}>{dateStr} · All times IST 🇮🇳</div>
        </div>
        <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
          {[{n:`${played}`,l:"Played"},{n:`${104-played}`,l:"Left"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"26px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#999",letterSpacing:".06em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {live.length>0&&<LiveSection initialMatches={live}/>}

      {/* HERO MATCH */}
      {heroMatch&&<HeroMatch match={heroMatch} played={played} total={104}/>}

      {/* Empty state */}
      {!heroMatch&&!live.length&&(
        <div style={{background:"#fff",border:"1px solid #E5E5E0",borderRadius:"12px",padding:"40px 24px",textAlign:"center",marginBottom:"16px",boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
          <div style={{fontSize:"48px",marginBottom:"12px"}}>⚽</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"28px",letterSpacing:"3px",color:"#0A0A0A",marginBottom:"6px"}}>FIFA WORLD CUP 2026</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",color:"#666",marginBottom:"16px",letterSpacing:".04em"}}>{played} matches played · {104-played} remaining · Round of 32 underway</div>
          <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/results" className="btn-saff" style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"#FF9933",color:"#000",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"9px 18px",borderRadius:"7px",textDecoration:"none",letterSpacing:".08em"}}>VIEW RESULTS →</Link>
            <Link href="/world-cup" style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"#0A0A0A",color:"#FF9933",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"9px 18px",borderRadius:"7px",textDecoration:"none",letterSpacing:".08em"}}>R32 SCHEDULE →</Link>
          </div>
        </div>
      )}

      <div style={{display:"grid",gap:"20px"}} className="lg:grid-cols-[1fr_280px]">
        <div>
          {/* OVERNIGHT */}
          {isMorning&&overnight.length>0&&(
            <div style={{marginBottom:"20px",background:"#FFFEF5",border:"1px solid rgba(255,153,51,.2)",borderRadius:"12px",overflow:"hidden"}}>
              <div style={{padding:"12px 16px 0"}}>
                <div className="sh sh-saff" style={{marginBottom:"10px"}}>
                  <span style={{fontSize:"14px"}}>☀️</span>
                  <span>WHAT YOU MISSED OVERNIGHT</span>
                  <div className="sh-line"/>
                  <Link href="/results" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",letterSpacing:".06em",flexShrink:0}}>ALL RESULTS →</Link>
                </div>
              </div>
              <div style={{padding:"0 16px 14px"}}>
                {overnight.map(m=><PortalMatchCard key={m.id} match={m}/>)}
              </div>
            </div>
          )}

          {/* MORE TODAY */}
          {otherToday.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>⚡</span><span style={{color:"#FF9933"}}>MORE TODAY</span>
                <span className="badge-up">{otherToday.length}</span>
                <div className="sh-line"/>
              </div>
              {otherToday.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* R32 UPCOMING */}
          {r32Upcoming.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span style={{background:"#0A0A0A",color:"#FF9933",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,padding:"2px 8px",borderRadius:"3px",letterSpacing:".08em"}}>R32</span>
                <span>ROUND OF 32 — UPCOMING</span>
                <div className="sh-line"/>
                <Link href="/world-cup" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",letterSpacing:".06em",flexShrink:0}}>FULL BRACKET →</Link>
              </div>
              {r32Upcoming.map(m=><PortalMatchCard key={m.id} match={m} showDate/>)}
            </div>
          )}

          {/* TOMORROW */}
          {tomorrow.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh">
                <span>📅</span><span>TOMORROW</span>
                <span className="badge-up">{tomorrow.length} MATCHES</span>
                <div className="sh-line"/>
              </div>
              {tomorrow.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* COMING UP */}
          {comingUp.length>0&&(
            <div style={{marginBottom:"20px"}}>
              <div className="sh"><span>🔜</span><span>COMING UP</span><div className="sh-line"/><Link href="/world-cup" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",letterSpacing:".06em",flexShrink:0}}>SCHEDULE →</Link></div>
              {comingUp.map(m=><PortalMatchCard key={m.id} match={m} showDate/>)}
            </div>
          )}

          {/* WATCH */}
          <div style={{background:"#FFF9F0",border:"1px solid rgba(255,153,51,.2)",borderRadius:"10px",padding:"14px 16px",marginBottom:"16px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#CC7A00",letterSpacing:".14em",marginBottom:"8px"}}>📺 WATCH WORLD CUP 2026 IN INDIA</div>
            <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
              <div style={{background:"#fff",border:"1px solid rgba(255,153,51,.2)",borderRadius:"8px",padding:"10px 16px",flex:1,minWidth:"150px"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"2px",color:"#FF9933"}}>ZEE5</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"#666"}}>Exclusive rights · India · zee5.com</div>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {[
              {href:"/results",  icon:"📋",label:"All Results",  sub:"Goals · Dates · Stats"},
              {href:"/world-cup",icon:"🏆",label:"R32 Schedule", sub:"Bracket · IST times"},
              {href:"/standings",icon:"📊",label:"Tables",       sub:"Final group standings"},
              {href:"/news",     icon:"🇮🇳",label:"IST Guide",  sub:"When to watch"},
            ].map(l=>(
              <Link key={l.href} href={l.href} style={{textDecoration:"none"}}>
                <div style={{background:"#fff",border:"1px solid #E5E5E0",borderRadius:"10px",padding:"14px",cursor:"pointer",transition:"all .15s",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
                  <div style={{fontSize:"20px",marginBottom:"5px"}}>{l.icon}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#0A0A0A",letterSpacing:".04em"}}>{l.label}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"#999",marginTop:"2px",letterSpacing:".04em"}}>{l.sub}</div>
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
