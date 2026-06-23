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

  // Next 6 upcoming after tomorrow
  const comingUp = all
    .filter(m => m.status === "UPCOMING" && new Date(m.utcDate).getTime() > now + 24 * 3600 * 1000)
    .slice(0, 6);

  const played = all.filter(m => m.status === "FINISHED").length;

  const istNow = new Date(Date.now() + 5.5 * 3600000);
  const dateStr = istNow.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", timeZone: "UTC"
  });

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{
        position: "relative", overflow: "hidden", borderRadius: "16px",
        marginBottom: "16px",
        background: "linear-gradient(160deg,#061206 0%,#0c220c 55%,#061206 100%)",
        border: "1px solid rgba(255,255,255,.06)",
      }}>
        {/* Pitch grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(rgba(255,255,255,.022) 0,rgba(255,255,255,.022) 1px,transparent 1px,transparent 50px),repeating-linear-gradient(90deg,rgba(255,255,255,.022) 0,rgba(255,255,255,.022) 1px,transparent 1px,transparent 50px)" }} />
        {/* Centre circle */}
        <div style={{ position: "absolute", right: "-3%", top: "50%", transform: "translateY(-50%)", width: "52%", aspectRatio: "1", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", right: "calc(26% - 1px)", top: 0, bottom: 0, width: "1.5px", background: "rgba(255,255,255,.03)" }} />
        <div style={{ position: "absolute", right: "7%", top: "50%", transform: "translateY(-50%)", fontSize: "90px", opacity: .03, userSelect: "none" }}>⚽</div>

        <div style={{ position: "relative", zIndex: 1, padding: "22px 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(255,153,51,.1)", border: "1px solid rgba(255,153,51,.2)", borderRadius: "6px", padding: "4px 12px", marginBottom: "10px" }}>
                <span style={{ fontSize: "11px" }}>🏆</span>
                <span style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "11px", fontWeight: 800, color: "#FF9933", letterSpacing: ".12em" }}>FIFA WORLD CUP 2026</span>
              </div>
              <h1 style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(26px,5vw,46px)", fontWeight: 900, color: "#fff", letterSpacing: ".5px", lineHeight: .9, marginBottom: "7px" }}>
                {live.length > 0 ? "🔴 LIVE NOW" :
                  todayUpcoming.length > 0 ? `${todayUpcoming.length} MATCH${todayUpcoming.length > 1 ? "ES" : ""} TODAY ⚡` :
                    "NO MATCHES TODAY"}
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,.4)" }}>{dateStr} · Indian Standard Time 🇮🇳</p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[{ n: `${played}`, l: "Played" }, { n: `${104 - played}`, l: "Left" }].map((s, i) => (
                <div key={i} style={{ background: "rgba(0,0,0,.5)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "10px", padding: "10px 14px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "24px", fontWeight: 900, color: "#FF9933", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: "9px", color: "rgba(255,255,255,.35)", marginTop: "2px" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gap: "16px" }} className="lg:grid-cols-[1fr_260px]">
        <div>
          {/* LIVE */}
          {live.length > 0 && <LiveSection initialMatches={live} />}

          {/* TODAY'S UPCOMING MATCHES — main focus */}
          {todayUpcoming.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div className="sh">
                <span style={{ fontSize: "15px" }}>⚡</span>
                <span>TODAY&apos;S MATCHES</span>
                <span className="badge-up">{todayUpcoming.length} UPCOMING</span>
                <div className="sh-line" />
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,.25)", flexShrink: 0 }}>All IST</span>
              </div>
              {todayUpcoming.map(m => <PortalMatchCard key={m.id} match={m} />)}
            </div>
          )}

          {/* TODAY'S LIVE */}
          {todayLive.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div className="sh">
                <span className="live-dot" />
                <span style={{ color: "#f87171" }}>LIVE NOW</span>
                <div className="sh-line" />
              </div>
              {todayLive.map(m => <PortalMatchCard key={m.id} match={m} />)}
            </div>
          )}

          {/* No matches today message */}
          {live.length === 0 && todayUpcoming.length === 0 && todayLive.length === 0 && (
            <div className="card" style={{ padding: "32px", textAlign: "center", marginBottom: "20px" }}>
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>😴</div>
              <div style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,.5)", marginBottom: "6px" }}>No matches today</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,.3)" }}>Check tomorrow&apos;s fixtures below</div>
            </div>
          )}

          {/* TOMORROW */}
          {tomorrow.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div className="sh">
                <span>📅</span>
                <span>TOMORROW</span>
                <span className="badge-up">{tomorrow.length} MATCHES</span>
                <div className="sh-line" />
              </div>
              {tomorrow.map(m => <PortalMatchCard key={m.id} match={m} />)}
            </div>
          )}

          {/* COMING UP */}
          {comingUp.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <div className="sh">
                <span>🔜</span>
                <span>COMING UP</span>
                <div className="sh-line" />
                <Link href="/world-cup" style={{ fontSize: "10px", color: "#FF9933", fontWeight: 700, textDecoration: "none", flexShrink: 0 }}>Full schedule →</Link>
              </div>
              {comingUp.map(m => <PortalMatchCard key={m.id} match={m} showDate />)}
            </div>
          )}

          {/* WHERE TO WATCH */}
          <div className="card" style={{ padding: "16px", marginBottom: "16px", background: "rgba(255,153,51,.04)", border: "1px solid rgba(255,153,51,.1)" }}>
            <div style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "11px", fontWeight: 800, color: "#FF9933", letterSpacing: ".12em", marginBottom: "10px" }}>📺 WHERE TO WATCH IN INDIA</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" }}>
              {[["JioCinema", "Free · App/Web"], ["Sports18", "TV Channel"], ["DD Sports", "Free TV"]].map(([ch, tag]) => (
                <div key={ch} style={{ background: "rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.07)", borderRadius: "10px", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "15px", fontWeight: 800, color: "#fff", marginBottom: "2px" }}>{ch}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,.35)" }}>{tag}</div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              { href: "/results", icon: "📋", label: "All Results", sub: "Latest & previous day" },
              { href: "/world-cup", icon: "📅", label: "Full Schedule", sub: "All 104 matches IST" },
              { href: "/standings", icon: "📊", label: "Group Tables", sub: "All 12 groups accurate" },
              { href: "/news", icon: "📰", label: "News", sub: "Messi record · Latest" },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "14px", cursor: "pointer" }}>
                  <div style={{ fontSize: "22px", marginBottom: "6px" }}>{l.icon}</div>
                  <div style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "14px", fontWeight: 800, color: "rgba(255,255,255,.85)", letterSpacing: ".03em" }}>{l.label}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,.3)", marginTop: "2px" }}>{l.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{ display: "none" }} className="lg:block">
          <div style={{ position: "sticky", top: "120px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <MiniStandings />
            <TopScorers />
          </div>
        </div>
      </div>
    </div>
  );
}
