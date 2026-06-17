"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown, generateGoogleCalURL } from "@/lib/utils";

export default function PortalMatchCard({ match, showDate=false }: { match:Match; showDate?:boolean }) {
  const [countdown, setCountdown] = useState<string|null>(null);
  const [expanded, setExpanded] = useState(false);

  const isLive     = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";
  const isUpcoming = match.status === "UPCOMING";
  const homeWin    = isFinished && (match.score.home??0) > (match.score.away??0);
  const awayWin    = isFinished && (match.score.away??0) > (match.score.home??0);
  const isDraw     = isFinished && match.score.home === match.score.away && match.score.home !== null;

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
    <div className={`mc ${isLive?"mc-live":""} mb-1.5`} onClick={()=>setExpanded(!expanded)}>

      {/* MAIN ROW */}
      <div className="flex items-stretch min-h-[68px]">

        {/* Left status strip */}
        <div className={`w-[3px] flex-shrink-0 ${isLive?"bg-red-500":isFinished?"bg-green-600/50":"bg-blue-500/30"}`} />

        {/* Competition meta */}
        <div className="w-[64px] flex-shrink-0 flex flex-col items-center justify-center py-2 px-1 gap-1 border-r border-white/5 bg-black/10">
          <span className="text-[8px] text-center leading-tight text-white/30 font-medium px-0.5">
            {match.competition.name.replace("FIFA ","").replace(" 2026","")}
          </span>
          {match.group && <span className="badge-grp">{match.group.replace("Group ","Grp ")}</span>}
          <div className="mt-0.5">
            {isLive && <span className="badge-live"><span className="live-dot w-1 h-1"/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
            {isFinished && <span className="badge-ft">FT</span>}
            {isUpcoming && showDate && match.istDateLabel && (
              <span className="badge-up text-[8px]">{match.istDateLabel.slice(0,6)}</span>
            )}
          </div>
        </div>

        {/* Teams + Scores — CRICBUZZ DENSE STYLE */}
        <div className="flex-1 min-w-0 py-2 px-3">
          {/* Home team */}
          <div className="flex items-center gap-2 mb-[7px]">
            <span className="text-[18px] leading-none w-[22px] text-center flex-shrink-0">{match.homeTeam.flag||"🏳️"}</span>
            <span className={`flex-1 text-[13px] font-bold truncate leading-tight ${homeWin?"text-green-400":isDraw?"text-white/80":isFinished?"text-white/55":"text-white"}`}>
              {match.homeTeam.name}
            </span>
            {(isLive||isFinished) && match.score.home!==null && (
              <span className={`text-[18px] font-black tabular-nums leading-none flex-shrink-0 ${homeWin?"text-green-400":isDraw?"text-white":"text-white/70"}`}>
                {match.score.home}
              </span>
            )}
          </div>
          {/* Away team */}
          <div className="flex items-center gap-2">
            <span className="text-[18px] leading-none w-[22px] text-center flex-shrink-0">{match.awayTeam.flag||"🏳️"}</span>
            <span className={`flex-1 text-[13px] font-bold truncate leading-tight ${awayWin?"text-green-400":isDraw?"text-white/80":isFinished?"text-white/55":"text-white"}`}>
              {match.awayTeam.name}
            </span>
            {(isLive||isFinished) && match.score.away!==null && (
              <span className={`text-[18px] font-black tabular-nums leading-none flex-shrink-0 ${awayWin?"text-green-400":isDraw?"text-white":"text-white/70"}`}>
                {match.score.away}
              </span>
            )}
          </div>

          {/* Venue */}
          {(match.venue||match.city) && (
            <div className="mt-1.5 text-[9px] text-white/25 truncate">
              📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>

        {/* Right: Time / Live min */}
        <div className="flex-shrink-0 flex flex-col items-end justify-center py-2 px-3 border-l border-white/5 min-w-[60px]">
          {isUpcoming ? (
            <div className="text-right">
              {/* GOAL.COM BIG TIME */}
              <div className="text-[15px] font-black text-amber-400 tabular-nums leading-none">{match.istTime}</div>
              <div className="text-[8px] text-white/25 mt-0.5">IST</div>
              {countdown && <div className="text-[8px] text-amber-400/50 mt-0.5">in {countdown}</div>}
              <a
                href={generateGoogleCalURL({home:match.homeTeam.name,away:match.awayTeam.name,utcDate:match.utcDate,competition:match.competition.name})}
                target="_blank" rel="noopener noreferrer"
                onClick={e=>e.stopPropagation()}
                className="text-[10px] text-white/20 hover:text-blue-400 transition-colors mt-1 block"
                title="Add to Google Calendar"
              >📅</a>
            </div>
          ) : isLive ? (
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <span className="live-dot w-1.5 h-1.5"/>
                <span className="text-[9px] font-black text-red-400">LIVE</span>
              </div>
              {match.minute && <div className="text-[16px] font-black text-red-300 tabular-nums leading-none mt-0.5">{match.minute}&apos;</div>}
            </div>
          ) : (
            <div className="text-right">
              <div className="text-[10px] text-white/25">{match.istTime}</div>
              <div className="text-[8px] text-white/15">IST</div>
              <div className="text-[9px] text-white/15 mt-1">{expanded?"▲":"▼"}</div>
            </div>
          )}
        </div>
      </div>

      {/* EXPANDED: BBC SPORT GOALSCORER STYLE */}
      {expanded && (isFinished||isLive) && (
        <div className="border-t border-white/5 bg-black/20 px-3 py-2">
          {(homeGoals.length>0||awayGoals.length>0) ? (
            <div className="flex gap-3">
              <div className="flex-1">
                {homeGoals.map((g,i)=>(
                  <div key={i} className="goalscorer mb-0.5">
                    <span>⚽</span>
                    <span className="text-green-400/80 font-semibold">{g.player}</span>
                    <span className="min">{g.minute}&apos;</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 text-right">
                {awayGoals.map((g,i)=>(
                  <div key={i} className="goalscorer mb-0.5 justify-end">
                    <span className="min">{g.minute}&apos;</span>
                    <span className="text-green-400/80 font-semibold">{g.player}</span>
                    <span>⚽</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-[9px] text-white/20 text-center">No goalscorer data available</div>
          )}
          <div className="flex items-center gap-3 mt-2 text-[8px] text-white/20 flex-wrap">
            {match.venue&&<span>🏟️ {match.venue}</span>}
            {match.city&&<span>📍 {match.city}</span>}
            <span>{match.competition.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
