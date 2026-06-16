"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { generateGoogleCalURL } from "@/lib/utils";

function cd(utc: string): string {
  const diff = new Date(utc).getTime() - Date.now();
  if (diff <= 0) return "";
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h > 24) return `${Math.floor(h/24)}d`;
  if (h > 0)  return `${h}h ${m}m`;
  return `${m}m`;
}

export default function PortalMatchCard({
  match,
  showDate = false,
}: {
  match: Match;
  showDate?: boolean;
}) {
  const [countdown, setCountdown] = useState("");
  const [calOpen, setCalOpen] = useState(false);

  const isLive     = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";
  const isUpcoming = match.status === "UPCOMING";
  const homeWin    = isFinished && (match.score.home ?? 0) > (match.score.away ?? 0);
  const awayWin    = isFinished && (match.score.away ?? 0) > (match.score.home ?? 0);

  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(cd(match.utcDate));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [match.utcDate, isUpcoming]);

  return (
    <div className={`mc relative ${isLive ? "live-card" : ""} ${isFinished ? "finished-card" : ""}`}>
      <div className="flex items-stretch">

        {/* STATUS STRIP */}
        <div className={`w-1 flex-shrink-0 rounded-l-lg ${isLive ? "bg-red-500" : isFinished ? "bg-[#3fb950]/40" : "bg-amber-400/50"}`} />

        {/* COMPETITION TAG */}
        <div className="w-[72px] flex-shrink-0 flex flex-col items-center justify-center py-2 px-1 border-r border-[#21262d] bg-[#0d1117]/40">
          <span className="text-[9px] text-center leading-tight text-[#6e7681] font-medium">{match.competition.name}</span>
          {match.group && <span className="text-[8px] text-[#8b949e] mt-0.5">{match.group?.replace("Group ","Grp ")}</span>}
          {/* Status badge */}
          <div className="mt-1.5">
            {isLive && (
              <span className="badge-live">
                <span className="live-dot w-1 h-1" />
                {match.minute ? `${match.minute}'` : "LIVE"}
              </span>
            )}
            {isFinished && <span className="badge-ft">FT</span>}
            {isUpcoming && showDate && <span className="badge-up">{match.istDateLabel?.slice(0,6)}</span>}
          </div>
        </div>

        {/* TEAMS */}
        <div className="flex-1 min-w-0 py-2 px-3">
          {/* Home */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-lg leading-none w-6 text-center">{match.homeTeam.flag || "🏳️"}</span>
            <span className={`flex-1 text-sm font-semibold truncate ${homeWin ? "text-[#3fb950]" : "text-slate-200"}`}>
              {match.homeTeam.shortName || match.homeTeam.name}
            </span>
            {(isLive || isFinished) && match.score.home !== null && (
              <span className={`text-base font-black tabular-nums ${homeWin ? "text-[#3fb950]" : "text-white"}`}>
                {match.score.home}
              </span>
            )}
          </div>
          {/* Away */}
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none w-6 text-center">{match.awayTeam.flag || "🏳️"}</span>
            <span className={`flex-1 text-sm font-semibold truncate ${awayWin ? "text-[#3fb950]" : "text-slate-200"}`}>
              {match.awayTeam.shortName || match.awayTeam.name}
            </span>
            {(isLive || isFinished) && match.score.away !== null && (
              <span className={`text-base font-black tabular-nums ${awayWin ? "text-[#3fb950]" : "text-white"}`}>
                {match.score.away}
              </span>
            )}
          </div>

          {/* Venue */}
          {match.venue && (
            <div className="mt-1.5 text-[9px] text-[#6e7681] truncate">
              📍 {match.venue}
            </div>
          )}
        </div>

        {/* TIME / COUNTDOWN */}
        <div className="flex-shrink-0 flex flex-col items-end justify-center py-2 px-3 border-l border-[#21262d] gap-1 min-w-[72px]">
          {isUpcoming ? (
            <>
              <span className="text-sm font-black text-amber-400 tabular-nums">{match.istTime}</span>
              <span className="text-[9px] text-[#6e7681]">IST</span>
              {countdown && <span className="text-[9px] text-amber-400/70">in {countdown}</span>}
              {/* Calendar */}
              <div className="relative mt-0.5">
                <button onClick={() => setCalOpen(!calOpen)}
                  className="text-[10px] text-[#6e7681] hover:text-[#3fb950] transition-colors">
                  📅
                </button>
                {calOpen && (
                  <div className="absolute right-0 bottom-5 z-20 bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl p-2 w-36">
                    <a href={generateGoogleCalURL({ home: match.homeTeam.name, away: match.awayTeam.name, utcDate: match.utcDate, competition: match.competition.name })}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-[#21262d] text-[10px] text-slate-300 font-medium"
                      onClick={() => setCalOpen(false)}>
                      📅 Google Cal
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : isLive ? (
            <>
              <span className="text-[10px] font-black text-red-400 flex items-center gap-1">
                <span className="live-dot w-1.5 h-1.5" />LIVE
              </span>
              {match.minute && <span className="text-sm font-black text-red-300">{match.minute}&apos;</span>}
            </>
          ) : (
            <>
              <span className="text-[10px] text-[#6e7681]">{match.istTime}</span>
              <span className="text-[9px] text-[#6e7681]">IST</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
