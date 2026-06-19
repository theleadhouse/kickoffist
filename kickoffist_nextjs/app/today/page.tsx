import { getStaticWCMatches, getStaticTodayMatches, getStaticTomorrowMatches, getLiveMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import MiniStandings from "@/components/MiniStandings";
import TopScorers from "@/components/TopScorers";
import LiveSection from "@/components/LiveSection";
import Link from "next/link";

export const revalidate = 60;

export default async function TodayPage() {
  const [todayMatches, tomorrowMatches, allMatches, liveMatches] = await Promise.all([
    getStaticTodayMatches(),
    getStaticTomorrowMatches(),
    getStaticWCMatches(),
    getLiveMatches(),
  ]);

  const now = Date.now();
  const upcoming = allMatches
    .filter(m => m.status === "UPCOMING" && new Date(m.utcDate).getTime() > now + 24*3600*1000)
    .slice(0, 6);

  const recentResults = allMatches
    .filter(m => m.status === "FINISHED")
    .sort((a,b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime())
    .slice(0, 8);

  const played    = allMatches.filter(m => m.status === "FINISHED").length;
  const remaining = allMatches.filter(m => m.status !== "FINISHED" && m.homeTeam.name !== "TBD").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4">
      {/* ── LEFT COLUMN ── */}
      <div>
        {/* Live */}
        {liveMatches.length > 0 && <LiveSection initialMatches={liveMatches}/>}

        {/* Today */}
        {todayMatches.length > 0 && (
          <div className="mb-3">
            <div className="sh">
              <span>⚡</span><span>TODAY&apos;S FIXTURES</span>
              <span className="badge-up ml-1">{todayMatches.length} MATCHES · IST</span>
              <div className="sh-line"/>
            </div>
            {todayMatches.map(m=><PortalMatchCard key={m.id} match={m}/>)}
          </div>
        )}

        {/* Today results */}
        {todayMatches.filter(m=>m.status==="FINISHED").length > 0 && (
          <div className="mb-3">
            <div className="sh">
              <span>✅</span><span>TODAY&apos;S RESULTS</span>
              <span className="text-[9px] text-white/30 ml-1">TAP FOR GOALSCORERS</span>
              <div className="sh-line"/>
            </div>
            {todayMatches.filter(m=>m.status==="FINISHED").map(m=><PortalMatchCard key={m.id} match={m}/>)}
          </div>
        )}

        {/* Tomorrow */}
        {tomorrowMatches.length > 0 && (
          <div className="mb-3">
            <div className="sh">
              <span>📅</span><span>TOMORROW</span>
              <span className="badge-up ml-1">{tomorrowMatches.length} MATCHES</span>
              <div className="sh-line"/>
            </div>
            {tomorrowMatches.map(m=><PortalMatchCard key={m.id} match={m}/>)}
          </div>
        )}

        {/* Coming up */}
        {upcoming.length > 0 && (
          <div className="mb-3">
            <div className="sh">
              <span>🔜</span><span>COMING UP</span>
              <div className="sh-line"/>
              <Link href="/world-cup" className="text-[10px] text-blue-400 hover:underline font-bold flex-shrink-0">Full schedule →</Link>
            </div>
            {upcoming.map(m=><PortalMatchCard key={m.id} match={m} showDate/>)}
          </div>
        )}

        {/* Recent results */}
        {recentResults.length > 0 && (
          <div className="mb-3">
            <div className="sh">
              <span>📋</span><span>RECENT RESULTS</span>
              <div className="sh-line"/>
            </div>
            {recentResults.map(m=><PortalMatchCard key={m.id} match={m}/>)}
          </div>
        )}

        {/* Tournament stats */}
        <div className="card p-3 mb-3">
          <div className="grid grid-cols-3 gap-0 text-center">
            {[
              {n:"🏆", l:"FIFA World Cup 2026"},
              {n:`${played}`, l:"Matches Played"},
              {n:`${remaining}`, l:"Matches Left"},
              {n:"48", l:"Teams"},
              {n:"104", l:"Total Matches"},
              {n:"16", l:"Stadiums"},
            ].map((s,i)=>(
              <div key={i} className={`py-2 px-1 ${i%3!==2?"border-r border-white/5":""} ${i>2?"border-t border-white/5":""}`}>
                <div className="text-[14px] font-black text-white">{s.n}</div>
                <div className="text-[8px] text-white/30 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-center text-[9px] text-white/20 border-t border-white/5 pt-1.5">
            Jun 11 – Jul 19 · IST 🇮🇳
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            {href:"/world-cup",  icon:"🏆", label:"Full WC Schedule",    sub:"104 matches · stadiums · IST"},
            {href:"/standings",  icon:"📊", label:"All Group Standings",  sub:"12 groups updated live"},
            {href:"/predict",    icon:"🔮", label:"AI Match Predictor",   sub:"Claude AI analysis"},
            {href:"/live",       icon:"🔴", label:"Live Scores",          sub:"Real-time auto-refresh"},
          ].map(l=>(
            <Link key={l.href} href={l.href} className="card p-3 hover:bg-white/6 transition-colors">
              <div className="text-xl mb-1">{l.icon}</div>
              <div className="text-[11px] font-bold text-white/80">{l.label}</div>
              <div className="text-[9px] text-white/30 mt-0.5">{l.sub}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── RIGHT SIDEBAR ── */}
      <div className="space-y-4">
        <MiniStandings/>
        <TopScorers/>
      </div>
    </div>
  );
}
