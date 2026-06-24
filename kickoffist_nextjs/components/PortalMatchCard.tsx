"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";

function googleCalUrl(m: Match) {
  const pad = (s: string) => s.replace(/[-:]/g,"").replace(/\.\d+/,"");
  const start = pad(new Date(m.utcDate).toISOString());
  const end = pad(new Date(new Date(m.utcDate).getTime()+2*3600*1000).toISOString());
  const title = encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name} — WC 2026`);
  const details = encodeURIComponent(`FIFA World Cup 2026 · ${m.group}\nWatch on Zee5 India\nAll IST times: kickoffist.com`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
}

function waMsg(m: Match) {
  const msg = `⚽ MATCH REMINDER\n${m.homeTeam.flag} ${m.homeTeam.name} vs ${m.awayTeam.name} ${m.awayTeam.flag}\n🕐 ${m.istTime} IST · ${m.istDateLabel}\n📍 ${m.city}\n📺 Watch on Zee5 India\n\nAll WC times in IST → kickoffist.com 🇮🇳`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function PortalMatchCard({ match, showDate=false }: { match: Match; showDate?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [countdown, setCountdown] = useState<string|null>(null);
  const [copied, setCopied] = useState(false);

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

  const shareText = isFinished
    ? `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${hScore}–${aScore} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · ${match.group} · FIFA WC 2026\n\nFull results in IST → kickoffist.com 🇮🇳`
    : `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST · ${match.istDateLabel}\n📺 Zee5 India\n\nAll WC times in IST → kickoffist.com 🇮🇳`;

  const copyShare = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className={`mc ${isLive ? "mc-live" : ""}`}>
      {/* Main row */}
      <div
        style={{ display:"flex", alignItems:"stretch", minHeight:"76px", cursor:(isFinished||isLive)?"pointer":"default" }}
        onClick={() => (isFinished||isLive) && setExpanded(!expanded)}
      >
        {/* Strip */}
        <div style={{ width:"4px", flexShrink:0, background: isLive ? "#dc2626" : isFinished ? "#1a6b1a" : "#FF9933" }}/>

        {/* Group meta */}
        <div style={{ width:"70px", flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"8px 4px", gap:"4px", borderRight:"1px solid rgba(26,107,26,.08)", background:"rgba(26,107,26,.02)" }}>
          {match.group && <span className="badge-grp">{match.group.replace("Group ","Grp ")}</span>}
          {isLive && <span className="badge-live"><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
          {isFinished && <span className="badge-ft">FT</span>}
          {isUpcoming && showDate && match.istDateLabel && <span className="badge-up" style={{fontSize:"9px"}}>{match.istDateLabel.slice(0,6)}</span>}
        </div>

        {/* Teams + scores */}
        <div style={{ flex:1, minWidth:0, padding:"12px 14px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
            <span style={{ fontSize:"22px", lineHeight:1, width:"26px", textAlign:"center", flexShrink:0 }}>{match.homeTeam.flag||"🏳️"}</span>
            <span style={{ flex:1, fontFamily:"'Teko',sans-serif", fontSize:"18px", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", letterSpacing:".03em",
              color: homeWin ? "#1a6b1a" : isDraw ? "#0d1f0d" : isFinished ? "#7a9a7a" : "#0d1f0d"
            }}>{match.homeTeam.name}</span>
            {(isLive||isFinished) && hScore !== null && (
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"32px", letterSpacing:".04em", color: homeWin ? "#1a6b1a" : isDraw ? "#0d1f0d" : "#7a9a7a", flexShrink:0, lineHeight:1 }}>{hScore}</span>
            )}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <span style={{ fontSize:"22px", lineHeight:1, width:"26px", textAlign:"center", flexShrink:0 }}>{match.awayTeam.flag||"🏳️"}</span>
            <span style={{ flex:1, fontFamily:"'Teko',sans-serif", fontSize:"18px", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", letterSpacing:".03em",
              color: awayWin ? "#1a6b1a" : isDraw ? "#0d1f0d" : isFinished ? "#7a9a7a" : "#0d1f0d"
            }}>{match.awayTeam.name}</span>
            {(isLive||isFinished) && aScore !== null && (
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"32px", letterSpacing:".04em", color: awayWin ? "#1a6b1a" : isDraw ? "#0d1f0d" : "#7a9a7a", flexShrink:0, lineHeight:1 }}>{aScore}</span>
            )}
          </div>
          {(match.venue||match.city) && (
            <div style={{ marginTop:"5px", fontSize:"10px", color:"#7a9a7a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>

        {/* Time col */}
        <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"center", padding:"10px 14px", borderLeft:"1px solid rgba(26,107,26,.08)", minWidth:"68px" }}>
          {isUpcoming && (
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:".04em", color:"#FF9933", lineHeight:1 }}>{match.istTime}</div>
              <div style={{ fontSize:"9px", color:"#7a9a7a", marginTop:"2px" }}>IST</div>
              {countdown && <div style={{ fontSize:"9px", color:"#c85000", marginTop:"3px" }}>{countdown}</div>}
            </div>
          )}
          {isLive && (
            <div style={{ textAlign:"right" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"4px", justifyContent:"flex-end", marginBottom:"4px" }}>
                <span className="live-dot"/>
                <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"11px", fontWeight:600, color:"#dc2626", letterSpacing:".06em" }}>LIVE</span>
              </div>
              {match.minute && <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"22px", letterSpacing:".04em", color:"#dc2626", lineHeight:1 }}>{match.minute}&apos;</div>}
            </div>
          )}
          {isFinished && (
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"15px", letterSpacing:".04em", color:"#7a9a7a" }}>{match.istTime}</div>
              <div style={{ fontSize:"9px", color:"#7a9a7a" }}>IST</div>
              <div style={{ fontSize:"11px", color:"#7a9a7a", marginTop:"4px" }}>{expanded?"▲":"▼"}</div>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {(isUpcoming||isFinished) && (
        <div style={{ borderTop:"1px solid rgba(26,107,26,.08)", padding:"8px 12px", display:"flex", gap:"6px", background:"rgba(26,107,26,.02)" }}>
          {isUpcoming && (
            <button onClick={() => setShowAlarm(!showAlarm)} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"5px", background:"rgba(255,153,51,.08)", border:"1px solid rgba(255,153,51,.25)", borderRadius:"7px", padding:"7px", cursor:"pointer" }}>
              <span style={{ fontSize:"13px" }}>⏰</span>
              <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"12px", fontWeight:600, color:"#c85000", letterSpacing:".06em" }}>SET ALARM</span>
            </button>
          )}
          {isFinished && (
            <button onClick={() => setExpanded(!expanded)} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"5px", background:"rgba(26,107,26,.06)", border:"1px solid rgba(26,107,26,.12)", borderRadius:"7px", padding:"7px", cursor:"pointer" }}>
              <span style={{ fontSize:"13px" }}>⚽</span>
              <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"12px", fontWeight:600, color:"#1a6b1a", letterSpacing:".06em" }}>GOALS</span>
            </button>
          )}
          <button onClick={() => setShowShare(!showShare)} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"5px", background:"rgba(26,107,26,.06)", border:"1px solid rgba(26,107,26,.12)", borderRadius:"7px", padding:"7px", cursor:"pointer" }}>
            <span style={{ fontSize:"13px" }}>📤</span>
            <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"12px", fontWeight:600, color:"#3a5c3a", letterSpacing:".06em" }}>SHARE</span>
          </button>
        </div>
      )}

      {/* Alarm panel */}
      {showAlarm && isUpcoming && (
        <div style={{ borderTop:"1px solid rgba(255,153,51,.2)", background:"rgba(255,153,51,.04)", padding:"12px 14px" }}>
          <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"12px", fontWeight:600, color:"#c85000", letterSpacing:".1em", marginBottom:"10px" }}>⏰ NEVER MISS THIS MATCH</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
            <a href={googleCalUrl(match)} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:"10px", background:"#fff", border:"1px solid rgba(26,107,26,.15)", borderRadius:"9px", padding:"10px 12px", textDecoration:"none", boxShadow:"0 1px 4px rgba(26,107,26,.08)" }}>
              <span style={{ fontSize:"20px", flexShrink:0 }}>📅</span>
              <div>
                <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"14px", fontWeight:600, color:"#0d1f0d", letterSpacing:".04em" }}>Add to Google Calendar</div>
                <div style={{ fontSize:"10px", color:"#7a9a7a" }}>One tap — reminder before kickoff</div>
              </div>
              <span style={{ marginLeft:"auto", fontSize:"12px", color:"#7a9a7a" }}>→</span>
            </a>
            <a href={waMsg(match)} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:"10px", background:"rgba(37,211,102,.06)", border:"1px solid rgba(37,211,102,.2)", borderRadius:"9px", padding:"10px 12px", textDecoration:"none" }}>
              <span style={{ fontSize:"20px", flexShrink:0 }}>💬</span>
              <div>
                <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"14px", fontWeight:600, color:"#1a7a3a", letterSpacing:".04em" }}>Send WhatsApp Reminder</div>
                <div style={{ fontSize:"10px", color:"#7a9a7a" }}>Share match time to yourself or friends</div>
              </div>
              <span style={{ marginLeft:"auto", fontSize:"12px", color:"#7a9a7a" }}>→</span>
            </a>
          </div>
        </div>
      )}

      {/* Share panel */}
      {showShare && (
        <div style={{ borderTop:"1px solid rgba(26,107,26,.1)", background:"rgba(26,107,26,.02)", padding:"12px 14px" }}>
          <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"12px", fontWeight:600, color:"#3a5c3a", letterSpacing:".1em", marginBottom:"8px" }}>📤 SHARE THIS MATCH</div>
          <div style={{ background:"#fff", border:"1px solid rgba(26,107,26,.1)", borderRadius:"8px", padding:"10px 12px", marginBottom:"8px", fontSize:"12px", color:"#3a5c3a", lineHeight:1.7, whiteSpace:"pre-wrap" }}>{shareText}</div>
          <div style={{ display:"flex", gap:"7px" }}>
            <button onClick={copyShare} style={{ flex:1, padding:"9px", background: copied?"rgba(26,107,26,.1)":"rgba(255,153,51,.08)", border: copied?"1px solid rgba(26,107,26,.25)":"1px solid rgba(255,153,51,.3)", borderRadius:"8px", cursor:"pointer", fontFamily:"'Teko',sans-serif", fontSize:"13px", fontWeight:600, color: copied?"#1a6b1a":"#c85000", letterSpacing:".06em", transition:"all .15s" }}>
              {copied?"✅ COPIED!":"📋 COPY TEXT"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{ flex:1, padding:"9px", background:"rgba(37,211,102,.08)", border:"1px solid rgba(37,211,102,.2)", borderRadius:"8px", fontFamily:"'Teko',sans-serif", fontSize:"13px", fontWeight:600, color:"#1a7a3a", letterSpacing:".06em", textDecoration:"none", display:"flex", alignItems:"center", justifyContent:"center", gap:"5px" }}>
              💬 WHATSAPP
            </a>
          </div>
        </div>
      )}

      {/* Goalscorers */}
      {expanded && (isFinished||isLive) && (
        <div style={{ borderTop:"1px solid rgba(26,107,26,.08)", background:"rgba(26,107,26,.02)", padding:"10px 14px" }}>
          {(hGoals.length>0||aGoals.length>0) ? (
            <div style={{ display:"flex", gap:"12px" }}>
              <div style={{ flex:1 }}>
                {hGoals.map((g,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"4px" }}>
                    <span style={{ color:"#1a6b1a", fontSize:"11px" }}>⚽</span>
                    <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"14px", fontWeight:500, color:"#0d1f0d" }}>{g.player}</span>
                    <span style={{ fontSize:"10px", color:"#7a9a7a" }}>{g.minute}&apos;</span>
                  </div>
                ))}
              </div>
              <div style={{ flex:1, textAlign:"right" }}>
                {aGoals.map((g,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom:"4px", justifyContent:"flex-end" }}>
                    <span style={{ fontSize:"10px", color:"#7a9a7a" }}>{g.minute}&apos;</span>
                    <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"14px", fontWeight:500, color:"#0d1f0d" }}>{g.player}</span>
                    <span style={{ color:"#1a6b1a", fontSize:"11px" }}>⚽</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ fontSize:"10px", color:"#7a9a7a", textAlign:"center" }}>Goalscorer data unavailable</div>
          )}
        </div>
      )}
    </div>
  );
}
