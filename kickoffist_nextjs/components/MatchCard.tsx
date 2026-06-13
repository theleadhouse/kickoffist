"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Match } from "@/lib/types";
import { cn, getCountdown, generateGoogleCalURL, generateICS } from "@/lib/utils";

// Competition left-border colors
const BORDER_COLORS: Record<string, string> = {
  WC:  "border-l-amber-500",
  PL:  "border-l-purple-600",
  CL:  "border-l-blue-600",
  ISL: "border-l-green-600",
};

interface MatchCardProps {
  match: Match;
  showDate?: boolean;
}

export default function MatchCard({ match, showDate = false }: MatchCardProps) {
  const [countdown, setCountdown] = useState<string | null>(null);
  const [calOpen, setCalOpen] = useState(false);

  const borderColor = BORDER_COLORS[match.competition.code] || "border-l-slate-300";
  const isLive = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";
  const isUpcoming = match.status === "UPCOMING";

  // Countdown timer
  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(getCountdown(match.utcDate));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [match.utcDate, isUpcoming]);

  const homeWin = isFinished && (match.score.home ?? 0) > (match.score.away ?? 0);
  const awayWin = isFinished && (match.score.away ?? 0) > (match.score.home ?? 0);

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
    a.href = url; a.download = `${match.homeTeam.shortName}-vs-${match.awayTeam.shortName}.ics`;
    a.click(); URL.revokeObjectURL(url);
    setCalOpen(false);
  }

  return (
    <div className={cn(
      "match-card border-l-4 mb-3 relative overflow-hidden",
      borderColor,
      isLive && "ring-1 ring-red-200 ring-inset"
    )}>
      {/* Top row: time + badge + calendar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          {isLive ? (
            <div className="flex items-center gap-1.5">
              <span className="live-pulse" />
              <span className="text-sm font-black text-red-600">
                {match.minute ? `${match.minute}'` : "LIVE"}
              </span>
            </div>
          ) : (
            <span className="text-lg font-black text-slate-900 tabular-nums">
              {match.istTime}
            </span>
          )}
          {isLive && <span className="badge-live">Live</span>}
          {isFinished && <span className="badge-finished">FT</span>}
          {isUpcoming && showDate && (
            <span className="badge-upcoming">{match.istDateLabel}</span>
          )}
        </div>

        {/* Add to calendar button */}
        {isUpcoming && (
          <div className="relative">
            <button
              onClick={() => setCalOpen(!calOpen)}
              className="text-slate-400 hover:text-green-600 transition-colors p-1"
              aria-label="Add to calendar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>

            {calOpen && (
              <div className="absolute right-0 top-8 z-20 bg-white border border-slate-200 rounded-xl shadow-lg p-2 w-48">
                <a
                  href={generateGoogleCalURL({ home: match.homeTeam.name, away: match.awayTeam.name, utcDate: match.utcDate, competition: match.competition.name })}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm font-medium"
                  onClick={() => setCalOpen(false)}
                >
                  📅 Google Calendar
                </a>
                <button
                  onClick={downloadICS}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm font-medium w-full text-left"
                >
                  🍎 Apple / ICS
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Teams + Score */}
      <div className="px-4 pb-3">
        <TeamRow
          team={match.homeTeam}
          score={isLive || isFinished ? match.score.home : null}
          isWinner={homeWin}
        />
        <div className="h-px bg-slate-50 my-2" />
        <TeamRow
          team={match.awayTeam}
          score={isLive || isFinished ? match.score.away : null}
          isWinner={awayWin}
        />
      </div>

      {/* Footer: competition + countdown */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <span className="text-xs">{match.competition.icon}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            {match.competition.name}
          </span>
          {match.group && (
            <span className="text-[10px] text-slate-300">· {match.group}</span>
          )}
        </div>
        {countdown && (
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
            ⏱ {countdown}
          </span>
        )}
        {isFinished && match.score.home !== null && (
          <span className="text-[10px] text-slate-400 font-medium">
            {match.homeTeam.shortName} {match.score.home}–{match.score.away} {match.awayTeam.shortName}
          </span>
        )}
      </div>
    </div>
  );
}

function TeamRow({ team, score, isWinner }: { team: Match["homeTeam"]; score: number | null; isWinner: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Flag / Crest */}
      <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
        {team.flag && team.flag !== "🏳️" ? (
          <span className="text-xl">{team.flag}</span>
        ) : team.crest ? (
          <Image src={team.crest} alt={team.name} width={28} height={28} className="object-contain" unoptimized />
        ) : (
          <span className="text-xl">🏳️</span>
        )}
      </div>

      {/* Team name */}
      <span className={cn(
        "flex-1 text-sm font-bold truncate",
        isWinner ? "text-green-700" : "text-slate-800"
      )}>
        {team.shortName || team.name}
      </span>

      {/* Score */}
      {score !== null && (
        <span className={cn(
          "text-2xl font-black tabular-nums",
          isWinner ? "text-green-600" : "text-slate-900"
        )}>
          {score}
        </span>
      )}
    </div>
  );
}
