import { getStaticWCMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import MiniStandings from "@/components/MiniStandings";
import { todayIST, tomorrowIST } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KickoffIST — FIFA World Cup 2026 Live Scores & Fixtures in IST",
  description: "Live scores, fixtures and results from FIFA World Cup 2026 in Indian Standard Time.",
};
export const revalidate = 60;

export default function TodayPage() {
  const today = todayIST();
  const tmrw  = tomorrowIST();
  const all   = getStaticWCMatches();

  const todayMatches  = all.filter(m => m.istDate === today);
  const tmrwMatches   = all.filter(m => m.istDate === tmrw);
  const live          = todayMatches.filter(m => m.status === "LIVE");
  const upcoming      = todayMatches.filter(m => m.status === "UPCOMING");
  const finishedToday = todayMatches.filter(m => m.status === "FINISHED");
  const recentResults = all.filter(m => m.status === "FINISHED").slice(-8).reverse();
  const comingUp      = all.filter(m => m.status === "UPCOMING" && m.istDate !== today && m.istDate !== tmrw).slice(0, 6);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-3 mt-2">

      {/* LEFT */}
      <div className="min-w-0 space-y-3">

        {/* LIVE */}
        {live.length > 0 && (
          <section>
            <div className="sh">
              <span className="live-dot" />
              <span className="text-red-400">LIVE NOW</span>
              <span className="badge-live ml-1">{live.length}</span>
              <span className="ml-auto text-[10px] text-white/30">Auto-refresh 15s</span>
            </div>
            <div className="space-y-1.5">
              {live.map(m => <PortalMatchCard key={m.id} match={m} />)}
            </div>
          </section>
        )}

        {/* TODAY UPCOMING */}
        {upcoming.length > 0 && (
          <section>
            <div className="sh">
              <span>⚡</span>
              <span>TODAY&apos;S FIXTURES</span>
              <span className="text-blue-400/70 ml-1 font-normal">{today}</span>
              <span className="ml-auto text-[10px] text-white/30">{upcoming.length} matches · IST</span>
            </div>
            <div className="space-y-1.5">
              {upcoming.map(m => <PortalMatchCard key={m.id} match={m} />)}
            </div>
          </section>
        )}

        {/* TODAY RESULTS */}
        {finishedToday.length > 0 && (
          <section>
            <div className="sh">
              <span>✅</span>
              <span>TODAY&apos;S RESULTS</span>
              <span className="ml-auto text-[10px] text-white/30">Tap for goalscorers</span>
            </div>
            <div className="space-y-1.5">
              {finishedToday.map(m => <PortalMatchCard key={m.id} match={m} />)}
            </div>
          </section>
        )}

        {/* TOMORROW */}
        {tmrwMatches.length > 0 && (
          <section>
            <div className="sh">
              <span>📅</span>
              <span>TOMORROW</span>
              <span className="text-blue-400/70 ml-1 font-normal">{tmrw}</span>
              <span className="ml-auto text-[10px] text-white/30">{tmrwMatches.length} matches</span>
            </div>
            <div className="space-y-1.5">
              {tmrwMatches.map(m => <PortalMatchCard key={m.id} match={m} />)}
            </div>
          </section>
        )}

        {/* RECENT RESULTS if no today/tomorrow matches */}
        {todayMatches.length === 0 && (
          <section>
            <div className="sh">
              <span>🏁</span>
              <span>RECENT RESULTS</span>
              <span className="ml-auto text-[10px] text-white/30">Tap for goalscorers</span>
            </div>
            <div className="space-y-1.5">
              {recentResults.map(m => <PortalMatchCard key={m.id} match={m} />)}
            </div>
          </section>
        )}

        {/* COMING UP */}
        {comingUp.length > 0 && (
          <section>
            <div className="sh">
              <span>🔜</span>
              <span>COMING UP</span>
              <a href="/world-cup" className="ml-auto text-[10px] text-blue-400 hover:underline">Full schedule →</a>
            </div>
            <div className="space-y-1.5">
              {comingUp.map(m => <PortalMatchCard key={m.id} match={m} showDate />)}
            </div>
          </section>
        )}

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="space-y-3">

        {/* WC Stats */}
        <div className="card p-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="text-xs font-bold text-white">FIFA World Cup 2026</div>
              <div className="text-[10px] text-white/30">Jun 11 – Jul 19 · IST 🇮🇳</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              ["48","Teams"],
              ["104","Matches"],
              [String(all.filter(m=>m.status==="FINISHED").length),"Played"],
              [String(all.filter(m=>m.status==="UPCOMING").length),"Left"],
              ["12","Groups"],
              ["16","Stadiums"],
            ].map(([v,k]) => (
              <div key={k} className="bg-white/5 rounded-lg p-2 text-center">
                <div className="text-sm font-black text-white">{v}</div>
                <div className="text-[9px] text-white/30">{k}</div>
              </div>
            ))}
          </div>
        </div>

        <MiniStandings />

        {/* Quick Links */}
        <div className="space-y-1.5">
          {[
            { href:"/world-cup", icon:"📋", label:"Full WC Schedule",  sub:"104 matches · stadiums · IST" },
            { href:"/standings", icon:"📊", label:"All Group Standings",sub:"12 groups updated live" },
            { href:"/predict",   icon:"🔮", label:"AI Match Predictor", sub:"Claude AI analysis" },
            { href:"/live",      icon:"🔴", label:"Live Scores",        sub:"Real-time auto-refresh" },
          ].map(l => (
            <a key={l.href} href={l.href}
              className="flex items-center gap-3 p-2.5 card hover:border-blue-500/30 transition-all rounded-lg group">
              <span className="text-base">{l.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{l.label}</div>
                <div className="text-[9px] text-white/30">{l.sub}</div>
              </div>
              <span className="text-white/20 text-sm">›</span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
