"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";

export default function PortalMatchCard({ match, showDate = false }: { match: Match; showDate?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [countdown, setCountdown] = useState<string | null>(null);

  const isLive     = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";
  const isUpcoming = match.status === "UPCOMING";
  const hScore     = match.score.home;
  const aScore     = match.score.away;
  const homeWin    = isFinished && hScore !== null && aScore !== null && hScore > aScore;
  const awayWin    = isFinished && hScore !== null && aScore !== null && aScore > hScore;
  const isDraw     = isFinished && hScore === aScore && hScore !== null;

  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(getCountdown(match.utcDate));
    tick(); const id = setInterval(tick, 30000); return () => clearInterval(id);
  }, [match.utcDate, isUpcoming]);

  const hGoals = match.goals?.filter(g => g.team === match.homeTeam.name) || [];
  const aGoals = match.goals?.filter(g => g.team === match.awayTeam.name) || [];

  return (
    <div className={`mc ${isLive ? "mc-live" : ""}`}
      onClick={() => (isFinished || isLive) && setExpanded(!expanded)}
      style={{ cursor: (isFinished || isLive) ? "pointer" : "default" }}>

      <div style={{ display: "flex", alignItems: "stretch", minHeight: "78px" }}>
        {/* Colour strip */}
        <div style={{ width: "4px", flexShrink: 0, borderRadius: "14px 0 0 14px", background: isLive ? "#ef4444" : isFinished ? "rgba(74,222,128,.5)" : "#FF9933" }} />

        {/* Group meta */}
        <div style={{ width: "70px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 4px", gap: "4px", borderRight: "1px solid rgba(255,255,255,.05)", background: "rgba(0,0,0,.15)" }}>
          {match.group && <span className="badge-grp">{match.group.replace("Group ", "Grp ")}</span>}
          {isLive && <span className="badge-live"><span className="live-dot" style={{ width: "5px", height: "5px" }} />{match.minute ? `${match.minute}'` : "LIVE"}</span>}
          {isFinished && <span className="badge-ft">FT</span>}
          {isUpcoming && showDate && match.istDateLabel && <span className="badge-up" style={{ fontSize: "9px" }}>{match.istDateLabel.slice(0, 6)}</span>}
        </div>

        {/* Teams + BEBAS NEUE SCORES */}
        <div style={{ flex: 1, minWidth: 0, padding: "12px 14px" }}>
          {/* Home */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <span style={{ fontSize: "22px", lineHeight: 1, width: "26px", textAlign: "center", flexShrink: 0 }}>{match.homeTeam.flag || "🏳️"}</span>
            <span style={{
              flex: 1, fontFamily: "'Teko',sans-serif", fontSize: "18px", fontWeight: 500,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: ".03em",
              color: homeWin ? "#4ade80" : isDraw ? "#fff" : isFinished ? "rgba(255,255,255,.45)" : "#fff",
            }}>{match.homeTeam.name}</span>
            {(isLive || isFinished) && hScore !== null && (
              <span style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "32px", letterSpacing: ".04em",
                color: homeWin ? "#4ade80" : isDraw ? "#fff" : "rgba(255,255,255,.6)",
                flexShrink: 0, lineHeight: 1,
              }}>{hScore}</span>
            )}
          </div>
          {/* Away */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "22px", lineHeight: 1, width: "26px", textAlign: "center", flexShrink: 0 }}>{match.awayTeam.flag || "🏳️"}</span>
            <span style={{
              flex: 1, fontFamily: "'Teko',sans-serif", fontSize: "18px", fontWeight: 500,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: ".03em",
              color: awayWin ? "#4ade80" : isDraw ? "#fff" : isFinished ? "rgba(255,255,255,.45)" : "#fff",
            }}>{match.awayTeam.name}</span>
            {(isLive || isFinished) && aScore !== null && (
              <span style={{
                fontFamily: "'Bebas Neue',sans-serif", fontSize: "32px", letterSpacing: ".04em",
                color: awayWin ? "#4ade80" : isDraw ? "#fff" : "rgba(255,255,255,.6)",
                flexShrink: 0, lineHeight: 1,
              }}>{aScore}</span>
            )}
          </div>
          {/* Venue */}
          {(match.venue || match.city) && (
            <div style={{ marginTop: "5px", fontSize: "10px", color: "rgba(255,255,255,.2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              📍 {[match.venue, match.city].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>

        {/* Time column */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", padding: "10px 16px", borderLeft: "1px solid rgba(255,255,255,.05)", minWidth: "68px" }}>
          {isUpcoming ? (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "20px", letterSpacing: ".04em", color: "#FF9933", lineHeight: 1 }}>{match.istTime}</div>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,.3)", marginTop: "2px" }}>IST</div>
              {countdown && <div style={{ fontSize: "9px", color: "rgba(255,153,51,.4)", marginTop: "3px" }}>{countdown}</div>}
            </div>
          ) : isLive ? (
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end", marginBottom: "4px" }}>
                <span className="live-dot" />
                <span style={{ fontFamily: "'Teko',sans-serif", fontSize: "11px", fontWeight: 600, color: "#f87171", letterSpacing: ".06em" }}>LIVE</span>
              </div>
              {match.minute && <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "22px", letterSpacing: ".04em", color: "#f87171", lineHeight: 1 }}>{match.minute}&apos;</div>}
            </div>
          ) : (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "16px", letterSpacing: ".04em", color: "rgba(255,255,255,.35)" }}>{match.istTime}</div>
              <div style={{ fontSize: "9px", color: "rgba(255,255,255,.2)" }}>IST</div>
              {(isFinished || isLive) && <div style={{ fontSize: "11px", color: "rgba(255,255,255,.2)", marginTop: "4px" }}>{expanded ? "▲" : "▼"}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Expanded goalscorers */}
      {expanded && (isFinished || isLive) && (
        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", background: "rgba(0,0,0,.2)", padding: "10px 14px" }}>
          {(hGoals.length > 0 || aGoals.length > 0) ? (
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                {hGoals.map((g, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                    <span style={{ color: "#4ade80", fontSize: "11px" }}>⚽</span>
                    <span style={{ fontFamily: "'Teko',sans-serif", fontSize: "14px", fontWeight: 500, color: "#C8D4E8" }}>{g.player}</span>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,.3)" }}>{g.minute}&apos;</span>
                  </div>
                ))}
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                {aGoals.map((g, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px", justifyContent: "flex-end" }}>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,.3)" }}>{g.minute}&apos;</span>
                    <span style={{ fontFamily: "'Teko',sans-serif", fontSize: "14px", fontWeight: 500, color: "#C8D4E8" }}>{g.player}</span>
                    <span style={{ color: "#4ade80", fontSize: "11px" }}>⚽</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,.25)", textAlign: "center" }}>Goalscorer data unavailable</div>
          )}
        </div>
      )}
    </div>
  );
}
