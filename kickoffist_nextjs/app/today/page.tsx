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

  const todayUpcoming = today.filter(m=>m.status==="UPCOMING");
  const todayResults  = today.filter(m=>m.status==="FINISHED");
  const played = all.filter(m=>m.status==="FINISHED").length;
  const tomorrow4 = tomorrow.slice(0,4);

  // IST date string
  const istDate = new Date(Date.now()+5.5*3600000);
  const dateStr = istDate.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});

  return(
    <div>
      {/* ── HERO ── */}
      <div style={{
        position:"relative",overflow:"hidden",borderRadius:"14px",
        marginBottom:"16px",
        background:"linear-gradient(135deg,#071407 0%,#0d2a0d 50%,#071407 100%)",
        border:"1px solid rgba(255,255,255,.06)",
      }}>
        {/* Pitch art */}
        <div style={{position:"absolute",inset:0,opacity:.06,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.8) 0,rgba(255,255,255,.8) 1px,transparent 1px,transparent 44px),repeating-linear-gradient(90deg,rgba(255,255,255,.8) 0,rgba(255,255,255,.8) 1px,transparent 1px,transparent 44px)"}}/>
        <div style={{position:"absolute",right:"4%",top:"50%",transform:"translateY(-50%)",width:"200px",height:"200px",borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.05)"}}/>
        <div style={{position:"absolute",right:"calc(4% + 85px)",top:0,bottom:0,width:"1.5px",background:"rgba(255,255,255,.04)"}}/>
        <svg style={{position:"absolute",right:"7%",top:"50%",transform:"translateY(-50%)",opacity:.04,width:"130px",height:"130px"}} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="2"/><path d="M26,18 L50,0 L74,18 L84,46 L74,74 L50,92 L26,74 L16,46 Z" fill="none" stroke="white" strokeWidth="1.5"/></svg>

        <div style={{position:"relative",zIndex:1,padding:"22px 20px 18px"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:"7px",background:"rgba(255,153,51,.1)",border:"1px solid rgba(255,153,51,.22)",borderRadius:"6px",padding:"4px 12px",marginBottom:"12px"}}>
                <span>🏆</span>
                <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".12em",textTransform:"uppercase"}}>FIFA World Cup 2026</span>
              </div>
              <h1 style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(28px,5vw,48px)",fontWeight:900,color:"#fff",letterSpacing:".5px",lineHeight:.92,marginBottom:"6px"}}>
                {live.length>0?"LIVE NOW ⚡":todayUpcoming.length>0?`${todayUpcoming.length} MATCH${todayUpcoming.length>1?"ES":""} TODAY`:"TODAY'S RESULTS"}
              </h1>
              <p style={{fontSize:"13px",color:"rgba(255,255,255,.4)"}}>{dateStr} · All times IST 🇮🇳</p>
            </div>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {[{n:`${played}`,l:"Played"},{n:`${104-played}`,l:"Left"},{n:"48",l:"Teams"}].map((s,i)=>(
                <div key={i} style={{background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"8px",padding:"8px 12px",textAlign:"center"}}>
                  <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"22px",fontWeight:900,color:"#FF9933",lineHeight:1}}>{s.n}</div>
                  <div style={{fontSize:"9px",color:"rgba(255,255,255,.35)",marginTop:"2px"}}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN + SIDEBAR ── */}
      <div style={{display:"grid",gap:"16px"}} className="lg:grid-cols-[1fr_260px]">
        <div>
          {/* LIVE */}
          {live.length>0&&<LiveSection initialMatches={live}/>}

          {/* TODAY UPCOMING */}
          {todayUpcoming.length>0&&(
            <div style={{marginBottom:"18px"}}>
              <div className="sh">
                <span style={{fontSize:"15px"}}>⚡</span>
                <span>TODAY'S MATCHES</span>
                <span className="badge-up">{todayUpcoming.length} UPCOMING</span>
                <div className="sh-line"/>
                <span style={{fontSize:"10px",color:"rgba(255,255,255,.25)",flexShrink:0}}>IST</span>
              </div>
              {todayUpcoming.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* TODAY RESULTS */}
          {todayResults.length>0&&(
            <div style={{marginBottom:"18px"}}>
              <div className="sh">
                <span>✅</span><span>TODAY'S RESULTS</span>
                <span style={{fontSize:"10px",color:"rgba(255,255,255,.25)"}}>TAP FOR GOALS</span>
                <div className="sh-line"/>
              </div>
              {todayResults.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* TOMORROW PREVIEW */}
          {tomorrow4.length>0&&(
            <div style={{marginBottom:"18px"}}>
              <div className="sh">
                <span>📅</span><span>TOMORROW</span>
                <span className="badge-up">{tomorrow.length} MATCHES</span>
                <div className="sh-line"/>
                <Link href="/world-cup" style={{fontSize:"10px",color:"#FF9933",fontWeight:700,textDecoration:"none",flexShrink:0}}>All →</Link>
              </div>
              {tomorrow4.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* QUICK LINKS */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"16px"}}>
            {[
              {href:"/results",  icon:"📋",label:"All Results",       sub:"Every match with goalscorers"},
              {href:"/world-cup",icon:"📅",label:"Full Schedule",     sub:"All 104 matches in IST"},
              {href:"/standings",icon:"📊",label:"Group Tables",      sub:"All 12 groups updated live"},
              {href:"/news",     icon:"📰",label:"WC 2026 News",      sub:"Latest stories & analysis"},
            ].map(l=>(
              <Link key={l.href} href={l.href} style={{textDecoration:"none"}}>
                <div className="card card-hover" style={{padding:"14px",cursor:"pointer"}}>
                  <div style={{fontSize:"22px",marginBottom:"6px"}}>{l.icon}</div>
                  <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"14px",fontWeight:800,color:"rgba(255,255,255,.85)",letterSpacing:".03em"}}>{l.label}</div>
                  <div style={{fontSize:"10px",color:"rgba(255,255,255,.3)",marginTop:"2px"}}>{l.sub}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* WATCH ON */}
          <div className="card" style={{padding:"14px",marginBottom:"16px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.12)"}}>
            <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"12px",fontWeight:800,color:"#FF9933",letterSpacing:".1em",marginBottom:"8px"}}>📺 WHERE TO WATCH IN INDIA</div>
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
              {[["JioCinema","🎬 Free streaming"],["Sports18","📡 TV channel"],["DD Sports","📺 Free-to-air"]].map(([ch,tag])=>(
                <div key={ch} style={{background:"rgba(0,0,0,.3)",borderRadius:"8px",padding:"8px 12px"}}>
                  <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"14px",fontWeight:700,color:"#fff"}}>{ch}</div>
                  <div style={{fontSize:"10px",color:"rgba(255,255,255,.35)",marginTop:"1px"}}>{tag}</div>
                </div>
              ))}
            </div>
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
