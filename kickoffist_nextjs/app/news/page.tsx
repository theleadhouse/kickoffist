import { getStaticWCMatches } from "@/lib/api";
import { Match } from "@/lib/types";

export const revalidate = 300;

function getISTHour(utc: string) {
  return new Date(new Date(utc).getTime() + 5.5 * 3600000).getUTCHours();
}

function getISTDateLabel(utc: string) {
  const d = new Date(new Date(utc).getTime() + 5.5 * 3600000);
  return d.toLocaleDateString("en-IN", { weekday:"short", day:"numeric", month:"short", timeZone:"UTC" });
}

function getSlot(utc: string): "prime" | "alarm" | "morning" {
  const h = getISTHour(utc);
  // Prime time: 6pm-midnight IST
  if (h >= 18 || h === 0) return "prime";
  // Alarm: midnight-6am IST
  if (h >= 1 && h < 7) return "alarm";
  // Morning: 7am-6pm IST
  return "morning";
}

function waText(m: Match) {
  return encodeURIComponent(`⚽ ${m.homeTeam.flag} ${m.homeTeam.name} vs ${m.awayTeam.name} ${m.awayTeam.flag}\n🕐 ${m.istTime} IST · ${getISTDateLabel(m.utcDate)}\n📺 Zee5 India\n→ kickoffist.com 🇮🇳`);
}

export default async function ISTGuidePage() {
  const all = await getStaticWCMatches();

  const upcoming = all
    .filter(m => m.status === "UPCOMING" && m.homeTeam.name !== "TBD")
    .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime());

  const prime   = upcoming.filter(m => getSlot(m.utcDate) === "prime");
  const alarm   = upcoming.filter(m => getSlot(m.utcDate) === "alarm");
  const morning = upcoming.filter(m => getSlot(m.utcDate) === "morning");

  const istNow = new Date(Date.now() + 5.5 * 3600000);
  const dateStr = istNow.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long", timeZone:"UTC" });

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,153,51,.15)" }}>
        <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "11px", fontWeight: 600, color: "#FF9933", letterSpacing: ".14em", marginBottom: "4px" }}>KICKOFFIST · INDIA EXCLUSIVE</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(28px,4vw,44px)", letterSpacing: "2px", color: "#fff", lineHeight: 1, marginBottom: "6px" }}>🇮🇳 IST GUIDE</h1>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,.4)" }}>When to watch · When to set your alarm · When to sleep · {dateStr}</p>
      </div>

      {/* How to use */}
      <div style={{ background: "rgba(255,153,51,.06)", border: "1px solid rgba(255,153,51,.15)", borderRadius: "14px", padding: "16px 18px", marginBottom: "20px" }}>
        <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "12px", fontWeight: 600, color: "#FF9933", letterSpacing: ".1em", marginBottom: "10px" }}>⏰ YOUR GUIDE AS AN INDIAN FAN</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "10px" }}>
          {[
            { icon: "🌇", label: "PRIME TIME", sub: "6 PM – Midnight IST", tip: "Watch live — best time" },
            { icon: "🌙", label: "SET ALARM", sub: "Midnight – 6 AM IST", tip: "Worth it for big matches" },
            { icon: "☀️", label: "MORNING", sub: "6 AM+ IST", tip: "Catch up over chai" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(0,0,0,.3)", borderRadius: "10px", padding: "10px 12px" }}>
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "13px", fontWeight: 600, color: "#fff", letterSpacing: ".04em", marginBottom: "2px" }}>{s.label}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,.5)", marginBottom: "2px" }}>{s.sub}</div>
              <div style={{ fontSize: "10px", color: "rgba(255,153,51,.7)" }}>{s.tip}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRIME TIME */}
      {prime.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: "2px", color: "#FF9933" }}>🌇 PRIME TIME</div>
            <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "11px", color: "rgba(255,255,255,.35)", letterSpacing: ".06em" }}>6 PM – MIDNIGHT IST · WATCH LIVE</div>
          </div>
          {prime.map(m => <ISTRow key={m.id} match={m} slot="prime" waText={waText(m)}/>)}
        </div>
      )}

      {/* SET ALARM */}
      {alarm.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: "2px", color: "rgba(255,255,255,.6)" }}>🌙 SET YOUR ALARM</div>
            <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "11px", color: "rgba(255,255,255,.35)", letterSpacing: ".06em" }}>MIDNIGHT – 6 AM IST</div>
          </div>
          {alarm.map(m => <ISTRow key={m.id} match={m} slot="alarm" waText={waText(m)}/>)}
        </div>
      )}

      {/* MORNING */}
      {morning.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: "2px", color: "rgba(255,255,255,.5)" }}>☀️ CATCH UP OVER CHAI</div>
            <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "11px", color: "rgba(255,255,255,.3)", letterSpacing: ".06em" }}>6 AM+ IST</div>
          </div>
          {morning.map(m => <ISTRow key={m.id} match={m} slot="morning" waText={waText(m)}/>)}
        </div>
      )}

      {upcoming.length === 0 && (
        <div className="card" style={{ padding: "40px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🏆</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: "2px", color: "rgba(255,255,255,.4)" }}>ALL GROUP MATCHES DONE</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,.3)", marginTop: "6px" }}>Knockout round guide coming soon</div>
        </div>
      )}

      {/* Watch info */}
      <div style={{ background: "rgba(255,153,51,.05)", border: "1px solid rgba(255,153,51,.1)", borderRadius: "12px", padding: "14px 16px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "14px", fontWeight: 600, color: "#FF9933", marginBottom: "4px" }}>📺 Watch on ZEE5 India</div>
        <div style={{ fontSize: "11px", color: "rgba(255,255,255,.4)" }}>Zee5 holds exclusive FIFA WC 2026 broadcast rights in India · Stream on zee5.com or the Zee5 app</div>
      </div>
    </div>
  );
}

function ISTRow({ match, slot, waText }: { match: Match; slot: string; waText: string }) {
  const bg: Record<string,string> = { prime:"rgba(255,153,51,.08)", alarm:"rgba(100,100,150,.06)", morning:"rgba(80,80,80,.06)" };
  const br: Record<string,string> = { prime:"rgba(255,153,51,.18)", alarm:"rgba(255,255,255,.07)", morning:"rgba(255,255,255,.05)" };
  const dateLabel = getISTDateLabel(match.utcDate);

  return (
    <div style={{ background: bg[slot], border: `1px solid ${br[slot]}`, borderRadius: "12px", padding: "12px 14px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
      {/* Time + date */}
      <div style={{ flexShrink: 0, textAlign: "center", minWidth: "72px" }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "20px", letterSpacing: ".04em", color: slot === "prime" ? "#FF9933" : "rgba(255,255,255,.5)", lineHeight: 1 }}>{match.istTime}</div>
        <div style={{ fontSize: "8px", color: "rgba(255,255,255,.3)", marginTop: "1px" }}>IST</div>
        <div style={{ fontSize: "9px", color: slot === "prime" ? "rgba(255,153,51,.6)" : "rgba(255,255,255,.25)", marginTop: "3px", fontFamily: "'Teko',sans-serif", fontWeight: 600 }}>{dateLabel}</div>
      </div>

      {/* Teams */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
          <span style={{ fontSize: "18px" }}>{match.homeTeam.flag}</span>
          <span style={{ fontFamily: "'Teko',sans-serif", fontSize: "15px", fontWeight: 500, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{match.homeTeam.name}</span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,.3)", flexShrink: 0 }}>vs</span>
          <span style={{ fontFamily: "'Teko',sans-serif", fontSize: "15px", fontWeight: 500, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{match.awayTeam.name}</span>
          <span style={{ fontSize: "18px" }}>{match.awayTeam.flag}</span>
        </div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,.3)" }}>{match.group?.replace("Group", "Grp")} · {match.city}</div>
      </div>

      {/* Slot tag + WhatsApp */}
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: "5px", alignItems: "flex-end" }}>
        <span style={{
          fontFamily: "'Teko',sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: ".06em",
          padding: "2px 8px", borderRadius: "4px",
          background: slot === "prime" ? "rgba(255,153,51,.15)" : "rgba(255,255,255,.06)",
          color: slot === "prime" ? "#FF9933" : slot === "alarm" ? "rgba(150,150,255,.8)" : "rgba(255,255,255,.4)",
        }}>
          {slot === "prime" ? "🌇 WATCH LIVE" : slot === "alarm" ? "⏰ SET ALARM" : "☀️ MORNING"}
        </span>
        <a href={`https://wa.me/?text=${waText}`} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: "10px", color: "#25d366", textDecoration: "none", fontFamily: "'Teko',sans-serif", letterSpacing: ".04em", fontWeight: 600 }}>
          💬 Share
        </a>
      </div>
    </div>
  );
}
