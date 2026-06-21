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
  const upcoming = all.filter(m=>m.status==="UPCOMING"&&new Date(m.utcDate).getTime()>now+24*3600*1000).slice(0,6);
  const recent   = all.filter(m=>m.status==="FINISHED").sort((a,b)=>new Date(b.utcDate).getTime()-new Date(a.utcDate).getTime()).slice(0,10);
  const played   = all.filter(m=>m.status==="FINISHED").length;

  return(
    <div style={{display:"grid",gridTemplateColumns:"1fr",gap:"0"}} className="lg:grid-cols-[1fr_260px]" >
      <div style={{paddingRight:"0"}} className="lg:pr-4">
        {/* Live */}
        {live.length>0&&<LiveSection initialMatches={live}/>}

        {/* Today */}
        {today.length>0&&(
          <div style={{marginBottom:"16px"}}>
            <div className="sh">
              <span>⚡</span><span>TODAY&apos;S FIXTURES</span>
              <span className="badge-up">{today.length} MATCHES · IST</span>
              <div className="sh-line"/>
            </div>
            {today.map(m=><PortalMatchCard key={m.id} match={m}/>)}
          </div>
        )}

        {/* Today results */}
        {today.filter(m=>m.status==="FINISHED").length>0&&(
          <div style={{marginBottom:"16px"}}>
            <div className="sh">
              <span>✅</span><span>TODAY&apos;S RESULTS</span>
              <span style={{fontSize:"9px",color:"rgba(255,255,255,.25)"}}>TAP FOR GOALSCORERS</span>
              <div className="sh-line"/>
            </div>
            {today.filter(m=>m.status==="FINISHED").map(m=><PortalMatchCard key={m.id} match={m}/>)}
          </div>
        )}

        {/* Tomorrow */}
        {tomorrow.length>0&&(
          <div style={{marginBottom:"16px"}}>
            <div className="sh">
              <span>📅</span><span>TOMORROW</span>
              <span className="badge-up">{tomorrow.length} MATCHES</span>
              <div className="sh-line"/>
            </div>
            {tomorrow.map(m=><PortalMatchCard key={m.id} match={m}/>)}
          </div>
        )}

        {/* Recent Results */}
        {recent.length>0&&(
          <div style={{marginBottom:"16px"}}>
            <div className="sh">
              <span>📋</span><span>RECENT RESULTS</span>
              <div className="sh-line"/>
              <Link href="/world-cup" style={{fontSize:"10px",color:"#FF9933",fontWeight:"700",textDecoration:"none",flexShrink:0}}>All →</Link>
            </div>
            {recent.map(m=><PortalMatchCard key={m.id} match={m}/>)}
          </div>
        )}

        {/* Coming up */}
        {upcoming.length>0&&(
          <div style={{marginBottom:"16px"}}>
            <div className="sh">
              <span>🔜</span><span>COMING UP</span>
              <div className="sh-line"/>
              <Link href="/world-cup" style={{fontSize:"10px",color:"#FF9933",fontWeight:"700",textDecoration:"none",flexShrink:0}}>Full schedule →</Link>
            </div>
            {upcoming.map(m=><PortalMatchCard key={m.id} match={m} showDate/>)}
          </div>
        )}

        {/* Tournament stats */}
        <div className="card" style={{padding:"14px",marginBottom:"16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:0,textAlign:"center"}}>
            {[
              {n:"🏆",l:"FIFA World Cup 2026"},
              {n:`${played}`,l:"Matches Played"},
              {n:`${104-played}`,l:"Matches Left"},
              {n:"48",l:"Teams"},
              {n:"16",l:"Stadiums"},
              {n:"12",l:"Groups"},
            ].map((s,i)=>(
              <div key={i} style={{padding:"10px 4px",borderRight:i%3!==2?"1px solid rgba(255,255,255,.05)":"none",borderTop:i>2?"1px solid rgba(255,255,255,.05)":"none"}}>
                <div style={{fontSize:"16px",fontWeight:"900",color:"#fff",fontFamily:"'Barlow Condensed','Oswald',sans-serif"}}>{s.n}</div>
                <div style={{fontSize:"8px",color:"rgba(255,255,255,.25)",marginTop:"2px"}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:"8px",textAlign:"center",fontSize:"9px",color:"rgba(255,255,255,.15)",borderTop:"1px solid rgba(255,255,255,.05)",paddingTop:"8px"}}>
            Jun 11 – Jul 19 · USA · Canada · Mexico · All times IST 🇮🇳
          </div>
        </div>

        {/* Quick links */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"16px"}}>
          {[
            {href:"/world-cup", icon:"📅",label:"Full WC Schedule",   sub:"104 matches · all IST times"},
            {href:"/standings", icon:"📊",label:"Group Standings",    sub:"All 12 groups · live updated"},
            {href:"/predict",   icon:"🔮",label:"AI Match Predictor", sub:"Claude AI analysis"},
            {href:"/live",      icon:"🔴",label:"Live Scores",        sub:"Auto-refresh every 60s"},
          ].map(l=>(
            <Link key={l.href} href={l.href} style={{textDecoration:"none"}}>
              <div className="card" style={{padding:"12px",transition:"all .15s",cursor:"pointer"}}>
                <div style={{fontSize:"22px",marginBottom:"5px"}}>{l.icon}</div>
                <div style={{fontSize:"12px",fontWeight:"700",color:"rgba(255,255,255,.8)",fontFamily:"'Barlow Condensed','Oswald',sans-serif",letterSpacing:".02em"}}>{l.label}</div>
                <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)",marginTop:"2px"}}>{l.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{display:"none"}} className="lg:block" >
        <div style={{position:"sticky",top:"120px",display:"flex",flexDirection:"column",gap:"16px"}}>
          <MiniStandings/>
          <TopScorers/>
        </div>
      </div>
    </div>
  );
}
