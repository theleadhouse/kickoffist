"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Match } from "@/lib/types";
import { cn, getCountdown, generateGoogleCalURL, generateICS } from "@/lib/utils";

const BORDER = { WC:"border-l-amber-500", PL:"border-l-purple-500", CL:"border-l-blue-500", ISL:"border-l-green-500" };

export default function MatchCard({ match, showDate=false }: { match: Match; showDate?: boolean }) {
  const [countdown, setCountdown] = useState<string|null>(null);
  const [calOpen, setCalOpen] = useState(false);
  const [notified, setNotified] = useState(false);

  const border = BORDER[match.competition.code as keyof typeof BORDER] || "border-l-white/20";
  const isLive = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";
  const isUpcoming = match.status === "UPCOMING";
  const homeWin = isFinished && (match.score.home??0) > (match.score.away??0);
  const awayWin = isFinished && (match.score.away??0) > (match.score.home??0);

  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(getCountdown(match.utcDate));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [match.utcDate, isUpcoming]);

  function downloadICS() {
    const content = generateICS({ home: match.homeTeam.name, away: match.awayTeam.name, utcDate: match.utcDate, competition: match.competition.name });
    const blob = new Blob([content], { type:"text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href=url; a.download=`${match.homeTeam.shortName}-vs-${match.awayTeam.shortName}.ics`;
    a.click(); URL.revokeObjectURL(url);
    setCalOpen(false);
  }

  function requestNotify() {
    if (!("Notification" in window)) return;
    Notification.requestPermission().then(p => {
      if (p === "granted") {
        setNotified(true);
        // Schedule notification
        const diff = new Date(match.utcDate).getTime() - Date.now() - 3600000;
        if (diff > 0) setTimeout(() => {
          new Notification(`⚽ Kickoff in 1 hour!`, {
            body: `${match.homeTeam.name} vs ${match.awayTeam.name} — ${match.istTime} IST`,
            icon: "/icon.png"
          });
        }, diff);
      }
    });
  }

  return (
    <div className={cn("match-card border-l-4 mb-3 overflow-hidden relative", border, isLive && "border-red-500/50 bg-red-500/5")}>
      {/* Top row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          {isLive ? (
            <div className="flex items-center gap-1.5">
              <span className="live-pulse" />
              <span className="text-sm font-black text-red-400">{match.minute ? `${match.minute}'` : "LIVE"}</span>
            </div>
          ) : (
            <span className="text-lg font-black text-white tabular-nums">{match.istTime}</span>
          )}
          {isLive && <span className="badge-live">Live</span>}
          {isFinished && <span className="badge-finished">FT</span>}
          {isUpcoming && showDate && <span className="badge-upcoming">{match.istDateLabel}</span>}
        </div>

        <div className="flex items-center gap-2">
          {/* Notify bell */}
          {isUpcoming && (
            <button onClick={requestNotify}
              className={cn("text-sm transition-colors", notified ? "text-green-400" : "text-white/20 hover:text-white/60")}
              title="Remind me 1 hour before">
              {notified ? "🔔" : "🔕"}
            </button>
          )}
          {/* Calendar */}
          {isUpcoming && (
            <div className="relative">
              <button onClick={() => setCalOpen(!calOpen)} className="text-white/20 hover:text-green-400 transition-colors text-sm">📅</button>
              {calOpen && (
                <div className="absolute right-0 top-7 z-20 bg-[#1a1f2e] border border-white/10 rounded-xl shadow-2xl p-2 w-44">
                  <a href={generateGoogleCalURL({ home:match.homeTeam.name, away:match.awayTeam.name, utcDate:match.utcDate, competition:match.competition.name })}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-xs font-medium text-white/70"
                    onClick={() => setCalOpen(false)}>
                    📅 Google Calendar
                  </a>
                  <button onClick={downloadICS} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-xs font-medium text-white/70 w-full text-left">
                    🍎 Apple / ICS
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Teams */}
      <div className="px-4 pb-3">
        <TeamRow team={match.homeTeam} score={isLive||isFinished ? match.score.home : null} isWinner={homeWin} />
        <div className="h-px bg-white/5 my-2" />
        <TeamRow team={match.awayTeam} score={isLive||isFinished ? match.score.away : null} isWinner={awayWin} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs">{match.competition.icon}</span>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-wide">{match.competition.name}</span>
          {match.group && <span className="text-[10px] text-white/20">· {match.group}</span>}
        </div>
        {countdown && (
          <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
            ⏱ {countdown}
          </span>
        )}
      </div>
    </div>
  );
}

function TeamRow({ team, score, isWinner }: { team: Match["homeTeam"]; score: number|null; isWinner: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
        {team.flag && team.flag !== "🏳️" ? (
          <span className="text-xl">{team.flag}</span>
        ) : team.crest ? (
          <Image src={team.crest} alt={team.name} width={28} height={28} className="object-contain" unoptimized />
        ) : <span className="text-xl">🏳️</span>}
      </div>
      <span className={cn("flex-1 text-sm font-bold truncate", isWinner ? "text-green-400" : "text-white/80")}>
        {team.shortName || team.name}
      </span>
      {score !== null && (
        <span className={cn("text-2xl font-black tabular-nums", isWinner ? "text-green-400" : "text-white")}>
          {score}
        </span>
      )}
    </div>
  );
}
