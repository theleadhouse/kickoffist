"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown, generateGoogleCalURL } from "@/lib/utils";

export default function PortalMatchCard({ match, showDate = false }: { match: Match; showDate?: boolean }) {
  const [countdown, setCountdown] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [calOpen, setCalOpen] = useState(false);

  const isLive     = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";
  const isUpcoming = match.status === "UPCOMING";
  const homeWin    = isFinished && (match.score.home ?? 0) > (match.score.away ?? 0);
  const awayWin    = isFinished && (match.score.away ?? 0) > (match.score.home ?? 0);
  const isDraw     = isFinished && match.score.home === match.score.away;

  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(getCountdown(match.utcDate));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [match.utcDate, isUpcoming]);

  const homeGoals = match.goals?.filter(g => g.team === match.homeTeam.name) || [];
  const awayGoals = match.goals?.filter(g => g.team === match.awayTeam.name) || [];

  return (
    <div
      className={`mc overflow-hidden cursor-pointer ${isLive ? "live-card" : ""} ${isFinished ? "finished-card" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* TOP ROW */}
      <div className="flex items-stretch">
        {/* Color strip */}
        <div className={`w-0.5 flex-shrink-0 ${isLive ? "bg-red-500" : isFinished ? "bg-green-500/50" : "bg-blue-500/40"}`} />

        {/* Meta: competition + stage + status */}
        <div className="w-[72px] flex-shrink-0 flex flex-col items-center justify-center py-2.5 px-1 gap-1 border-r border-white/6">
          <span className="text-[8px] text-center leading-tight text-white/40 font-medium">
            {match.competition.name.replace("FIFA ", "").replace(" 2026","")}
          </span>
          {match.group && (
            <span className="text-[8px] text-white/30">{match.group.replace("Group ","Grp ")}</span>
          )}
          {isLive && (
            <span className="badge-live text-[8px]">
              <span className="live-dot w-1 h-1" />
              {match.minute ? `${match.minute}'` : "LIVE"}
            </span>
          )}
          {isFinished && <span className="badge-ft text-[8px]">FT</span>}
          {isUpcoming && showDate && match.istDateLabel && (
            <span className="badge-up text-[8px]">{match.istDateLabel.slice(0,6)}</span>
          )}
        </div>

        {/* Teams */}
        <div className="flex-1 min-w-0 py-2 px-3">
          {/* Home */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xl leading-none w-6 text-center flex-shrink-0">{match.homeTeam.flag || "🏳️"}</span>
            <span className={`flex-1 text-sm font-semibold truncate ${homeWin ? "text-green-400 font-bold" : isDraw ? "text-white/80" : isFinished ? "text-white/50" : "text-slate-200"}`}>
              {match.homeTeam.name}
            </span>
            {(isLive || isFinished) && match.score.home !== null && (
              <span className={`text-lg font-black tabular-nums w-5 text-right flex-shrink-0 ${homeWin ? "text-green-400" : "text-white"}`}>
                {match.score.home}
              </span>
            )}
          </div>
          {/* Away */}
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none w-6 text-center flex-shrink-0">{match.awayTeam.flag || "🏳️"}</span>
            <span className={`flex-1 text-sm font-semibold truncate ${awayWin ? "text-green-400 font-bold" : isDraw ? "text-white/80" : isFinished ? "text-white/50" : "text-slate-200"}`}>
              {match.awayTeam.name}
            </span>
            {(isLive || isFinished) && match.score.away !== null && (
              <span className={`text-lg font-black tabular-nums w-5 text-right flex-shrink-0 ${awayWin ? "text-green-400" : "text-white"}`}>
                {match.score.away}
              </span>
            )}
          </div>

          {/* Venue + City */}
          {(match.venue || match.city) && (
            <div className="mt-1.5 text-[9px] text-white/30 truncate">
              📍 {[match.venue, match.city].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>

        {/* Time side */}
        <div className="flex-shrink-0 flex flex-col items-end justify-center py-2 px-3 border-l border-white/6 min-w-[68px] gap-0.5">
          {isUpcoming ? (
            <>
              <span className="text-sm font-black text-amber-400 tabular-nums">{match.istTime}</span>
              <span className="text-[8px] text-white/30">IST</span>
              {countdown && <span className="text-[8px] text-amber-400/50">in {countdown}</span>}
              <div className="relative mt-1" onClick={e => { e.stopPropagation(); setCalOpen(!calOpen); }}>
                <button className="text-[11px] text-white/30 hover:text-blue-400 transition-colors">📅</button>
                {calOpen && (
                  <div className="absolute right-0 bottom-6 z-30 bg-[#1a2535] border border-white/10 rounded-lg shadow-2xl p-1.5 w-36">
                    <a href={generateGoogleCalURL({ home: match.homeTeam.name, away: match.awayTeam.name, utcDate: match.utcDate, competition: match.competition.name })}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-white/5 text-[10px] text-white/70"
                      onClick={() => setCalOpen(false)}>
                      📅 Google Calendar
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : isLive ? (
            <>
              <span className="flex items-center gap-1 text-[10px] font-black text-red-400">
                <span className="live-dot w-1.5 h-1.5" />LIVE
              </span>
              {match.minute && <span className="text-base font-black text-red-300">{match.minute}&apos;</span>}
            </>
          ) : (
            <>
              <span className="text-[10px] text-white/30">{match.istTime}</span>
              <span className="text-[8px] text-white/20">IST</span>
              {expanded ? <span className="text-[10px] text-white/30">▲</span> : <span className="text-[10px] text-white/20">▼</span>}
            </>
          )}
        </div>
      </div>

      {/* EXPANDED: Goals + Match Info */}
      {expanded && (isFinished || isLive) && (
        <div className="border-t border-white/6 px-3 py-2 bg-white/2">
          {/* Goalscorers */}
          {match.goals && match.goals.length > 0 && (
            <div className="flex gap-4 mb-2">
              {/* Home scorers */}
              <div className="flex-1">
                {homeGoals.map((g, i) => (
                  <div key={i} className="text-[10px] text-white/50 flex items-center gap-1">
                    <span>⚽</span>
                    <span className="text-green-400 font-medium">{g.player}</span>
                    <span className="text-white/30">{g.minute}&apos;</span>
                  </div>
                ))}
              </div>
              {/* Away scorers */}
              <div className="flex-1 text-right">
                {awayGoals.map((g, i) => (
                  <div key={i} className="text-[10px] text-white/50 flex items-center justify-end gap-1">
                    <span className="text-white/30">{g.minute}&apos;</span>
                    <span className="text-green-400 font-medium">{g.player}</span>
                    <span>⚽</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Match meta */}
          <div className="flex items-center gap-3 text-[9px] text-white/30 flex-wrap">
            {match.venue && <span>🏟️ {match.venue}</span>}
            {match.city && <span>📍 {match.city}</span>}
            <span>🏆 {match.competition.name}</span>
            {match.group && <span>{match.group}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
