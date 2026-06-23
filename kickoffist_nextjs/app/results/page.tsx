import { getStaticWCMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";

export const revalidate = 60;

export default async function ResultsPage() {
  const all = await getStaticWCMatches();
  const finished = all
    .filter(m => m.status === "FINISHED")
    .sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());

  // Group by IST date label
  const byDate: Record<string, { label: string; matches: typeof finished }> = {};
  for (const m of finished) {
    const key = m.istDate;
    if (!byDate[key]) byDate[key] = { label: m.istDateLabel, matches: [] };
    byDate[key].matches.push(m);
  }

  const dates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));
  const totalGoals = finished.reduce((acc, m) => acc + (m.score.home || 0) + (m.score.away || 0), 0);

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,.07)" }}>
        <div style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "10px", fontWeight: 800, color: "#FF9933", letterSpacing: ".14em", marginBottom: "4px" }}>FIFA WORLD CUP 2026</div>
        <h1 style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color: "#fff", letterSpacing: "1px", lineHeight: 1, marginBottom: "10px" }}>RESULTS</h1>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {[
            { n: `${finished.length}`, l: "Matches Played" },
            { n: `${totalGoals}`, l: "Total Goals" },
            { n: `${(totalGoals / Math.max(finished.length, 1)).toFixed(1)}`, l: "Goals per Game" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "22px", fontWeight: 900, color: "#FF9933" }}>{s.n}</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,.3)" }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Results grouped by date — latest first */}
      {dates.map((date, i) => (
        <div key={date} style={{ marginBottom: "24px" }}>
          <div className="sh">
            <span>📅</span>
            <span style={{ color: i === 0 ? "#FF9933" : "#fff", fontWeight: 900 }}>
              {i === 0 ? "LATEST RESULTS" : byDate[date].label.toUpperCase()}
            </span>
            <span className="badge-ft">{byDate[date].matches.length} MATCHES</span>
            <div className="sh-line" />
            {i === 0 && <span style={{ fontSize: "9px", color: "rgba(255,255,255,.3)", flexShrink: 0 }}>TAP FOR GOALS</span>}
          </div>
          {byDate[date].matches.map(m => <PortalMatchCard key={m.id} match={m} />)}
        </div>
      ))}

      {finished.length === 0 && (
        <div className="card" style={{ padding: "40px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>⚽</div>
          <div style={{ fontFamily: "'Barlow Condensed','Oswald',sans-serif", fontSize: "18px", color: "rgba(255,255,255,.4)" }}>No results yet</div>
        </div>
      )}
    </div>
  );
}
