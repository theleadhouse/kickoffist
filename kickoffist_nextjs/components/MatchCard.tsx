"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { cn, getCountdown, generateGoogleCalURL, generateICS } from "@/lib/utils";

export default function MatchCard({
  match,
  showDate = false,
  showVenue = false,
}: {
  match: Match;
  showDate?: boolean;
  showVenue?: boolean;
}) {
  const [countdown, setCountdown] = useState<string | null>(null);
  const [calOpen, setCalOpen] = useState(false);

  const isLive     = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";
  const isUpcoming = match.status === "UPCOMING";
  const homeWin    = isFinished && (match.score.home ?? 0) > (match.score.away ?? 0);
  const awayWin    = isFinished && (match.score.away ?? 0) > (match.score.home ?? 0);

  const borderColor = isLive
    ? "border-l-red-500"
    : isFinished
    ? "border-l-green-500/60"
    : "border-l-amber-400/70";

  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(getCountdown(match.utcDate));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [match.utcDate, isUpcoming]);

  function downloadICS() {
    const c = generateICS({ home: match.homeTeam.name, away: match.awayTeam.name, utcDate: match.utcDate, competition: match.competition.name });
    const blob = new Blob([c], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "match.ics"; a.click();
    URL.revokeObjectURL(url); setCalOpen(false);
  }

  return (
    <div className={cn(
      "border-l-4 mb-3 rounded-2xl overflow-hidden transition-all duration-200",
      "bg-slate-800 border border-slate-600/80",
      "hover:border-slate-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20",
      borderColor,
      isLive && "bg-red-950/40 border-red-800/50"
    )}>

      {/* Header: competition + status */}
      <div className="flex items-center justify-between px-4 pt-2.5 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px]">{match.competition.icon}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{match.competition.name}</span>
          {match.group && <span className="text-[10px] text-slate-500">· {match.group}</span>}
        </div>
        <div className="flex items-center gap-2">
          {isLive && (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              <span className="text-[10px] font-black text-red-400 uppercase">{match.minute ? `${match.minute}'` : "Live"}</span>
            </div>
          )}
          {isFinished && <span className="text-[10px] font-bold text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded-full">FT</span>}
          {isUpcoming && showDate && <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">{match.istDateLabel}</span>}
        </div>
      </div>

      {/* Teams + Score */}
      <div className="px-4 pb-2">
        {/* Home */}
        <div className="flex items-center gap-3 py-1.5">
          <span className="text-2xl w-8 text-center flex-shrink-0 filter drop-shadow">{match.homeTeam.flag || "🏳️"}</span>
          <span className={cn(
            "flex-1 text-sm font-bold truncate",
            homeWin ? "text-green-400" : "text-white"
          )}>
            {match.homeTeam.shortName || match.homeTeam.name}
          </span>
          {(isLive || isFinished) && match.score.home !== null && (
            <span className={cn("text-2xl font-black tabular-nums", homeWin ? "text-green-400" : "text-white")}>
              {match.score.home}
            </span>
          )}
        </div>

        <div className="h-px bg-slate-700/70 mx-0 my-0.5" />

        {/* Away */}
        <div className="flex items-center gap-3 py-1.5">
          <span className="text-2xl w-8 text-center flex-shrink-0 filter drop-shadow">{match.awayTeam.flag || "🏳️"}</span>
          <span className={cn(
            "flex-1 text-sm font-bold truncate",
            awayWin ? "text-green-400" : "text-white"
          )}>
            {match.awayTeam.shortName || match.awayTeam.name}
          </span>
          {(isLive || isFinished) && match.score.away !== null && (
            <span className={cn("text-2xl font-black tabular-nums", awayWin ? "text-green-400" : "text-white")}>
              {match.score.away}
            </span>
          )}
        </div>
      </div>

      {/* Footer: venue + time + countdown + calendar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-700/60 bg-slate-900/30">
        <div className="flex flex-col gap-0.5 min-w-0">
          {isUpcoming && (
            <span className="text-sm font-black text-amber-400 tabular-nums">{match.istTime} IST</span>
          )}
          {showVenue && match.venue && (
            <span className="text-[10px] text-slate-500 truncate">📍 {match.venue}</span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {countdown && (
            <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
              ⏱ {countdown}
            </span>
          )}
          {isUpcoming && (
            <div className="relative">
              <button
                onClick={() => setCalOpen(!calOpen)}
                className="text-slate-500 hover:text-green-400 transition-colors p-1 text-sm"
                title="Add to calendar"
              >
                📅
              </button>
              {calOpen && (
                <div className="absolute right-0 bottom-8 z-20 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-2 w-44">
                  <a
                    href={generateGoogleCalURL({ home: match.homeTeam.name, away: match.awayTeam.name, utcDate: match.utcDate, competition: match.competition.name })}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-700 text-xs font-medium text-white"
                    onClick={() => setCalOpen(false)}
                  >
                    📅 Google Calendar
                  </a>
                  <button
                    onClick={downloadICS}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-700 text-xs font-medium text-white w-full text-left"
                  >
                    🍎 Apple / Outlook
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
