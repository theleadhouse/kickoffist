"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { cn, getCountdown, generateGoogleCalURL, generateICS } from "@/lib/utils";

const BORDER: Record<string, string> = {
  WC: "border-l-amber-400",
  PL: "border-l-purple-400",
  CL: "border-l-blue-400",
  ISL: "border-l-green-400",
};

export default function MatchCard({ match, showDate = false }: { match: Match; showDate?: boolean }) {
  const [countdown, setCountdown] = useState<string | null>(null);
  const [calOpen, setCalOpen] = useState(false);

  const border = BORDER[match.competition.code] || "border-l-slate-400";
  const isLive = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";
  const isUpcoming = match.status === "UPCOMING";
  const homeWin = isFinished && (match.score.home ?? 0) > (match.score.away ?? 0);
  const awayWin = isFinished && (match.score.away ?? 0) > (match.score.home ?? 0);

  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(getCountdown(match.utcDate));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [match.utcDate, isUpcoming]);

  function downloadICS() {
    const content = generateICS({
      home: match.homeTeam.name,
      away: match.awayTeam.name,
      utcDate: match.utcDate,
      competition: match.competition.name,
    });
    const blob = new Blob([content], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${match.homeTeam.shortName}-vs-${match.awayTeam.shortName}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    setCalOpen(false);
  }

  return (
    <div
      className={cn(
        "border-l-4 mb-3 rounded-2xl overflow-hidden transition-all duration-200",
        "bg-slate-800 border border-slate-700",
        "hover:border-slate-500 hover:-translate-y-0.5",
        border,
        isLive && "bg-red-950 border-red-800"
      )}
    >
      {/* Top row: time + status + calendar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          {isLive ? (
            <div className="flex items-center gap-1.5">
              <span className="live-pulse" />
              <span className="text-sm font-black text-red-400">
                {match.minute ? `${match.minute}'` : "LIVE"}
              </span>
            </div>
          ) : (
            <span className="text-lg font-black text-white tabular-nums">
              {match.istTime}
            </span>
          )}
          {isLive && (
            <span className="badge-live">Live</span>
          )}
          {isFinished && (
            <span className="badge-finished">FT</span>
          )}
          {isUpcoming && showDate && (
            <span className="badge-upcoming">{match.istDateLabel}</span>
          )}
        </div>

        {isUpcoming && (
          <div className="relative">
            <button
              onClick={() => setCalOpen(!calOpen)}
              className="text-slate-400 hover:text-green-400 transition-colors p-1 text-sm"
            >
              📅
            </button>
            {calOpen && (
              <div className="absolute right-0 top-8 z-20 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl p-2 w-48">
                
                  href={generateGoogleCalURL({
                    home: match.homeTeam.name,
                    away: match.awayTeam.name,
                    utcDate: match.utcDate,
                    competition: match.competition.name,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-700 text-sm font-medium text-white"
                  onClick={() => setCalOpen(false)}
                >
                  📅 Google Calendar
                </a>
                <button
                  onClick={downloadICS}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-700 text-sm font-medium text-white w-full text-left"
                >
                  🍎 Apple / ICS
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Teams */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-3 py-1">
          <span className="text-xl w-7 text-center flex-shrink-0">
            {match.homeTeam.flag && match.homeTeam.flag !== "🏳️"
              ? match.homeTeam.flag
              : "🏳️"}
          </span>
          <span className={cn(
            "flex-1 text-sm font-bold truncate",
            homeWin ? "text-green-400" : "text-white"
          )}>
            {match.homeTeam.shortName || match.homeTeam.name}
          </span>
          {(isLive || isFinished) && match.score.home !== null && (
            <span className={cn(
              "text-2xl font-black tabular-nums",
              homeWin ? "text-green-400" : "text-white"
            )}>
              {match.score.home}
            </span>
          )}
        </div>

        <div className="h-px bg-slate-700 my-1" />

        <div className="flex items-center gap-3 py-1">
          <span className="text-xl w-7 text-center flex-shrink-0">
            {match.awayTeam.flag && match.awayTeam.flag !== "🏳️"
              ? match.awayTeam.flag
              : "🏳️"}
          </span>
          <span className={cn(
            "flex-1 text-sm font-bold truncate",
            awayWin ? "text-green-400" : "text-white"
          )}>
            {match.awayTeam.shortName || match.awayTeam.name}
          </span>
          {(isLive || isFinished) && match.score.away !== null && (
            <span className={cn(
              "text-2xl font-black tabular-nums",
              awayWin ? "text-green-400" : "text-white"
            )}>
              {match.score.away}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="text-xs">{match.competition.icon}</span>
          <span className="text-xs font-semibold text-slate-400">
            {match.competition.name}
          </span>
          {match.group && (
            <span className="text-xs text-slate-500">· {match.group}</span>
          )}
        </div>
        {countdown && (
          <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
            ⏱ {countdown}
          </span>
        )}
      </div>
    </div>
  );
}
