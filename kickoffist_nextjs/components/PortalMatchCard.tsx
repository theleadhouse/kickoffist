"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";

function alarmISO(utcDate: string) {
  return new Date(utcDate).toISOString().replace(/[-:]/g,"").replace(/\.\d+/,"");
}
function googleCalUrl(m: Match) {
  const start = alarmISO(m.utcDate);
  const end = new Date(new Date(m.utcDate).getTime() + 2*3600*1000).toISOString().replace(/[-:]/g,"").replace(/\.\d+/,"");
  const title = encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name} — WC 2026`);
  const details = encodeURIComponent(`FIFA World Cup 2026 · ${m.group}\nWatch on Zee5 India\nAll IST times: kickoffist.com`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
}
function whatsappReminder(m: Match) {
  const msg = encodeURIComponent(`⚽ MATCH REMINDER\n${m.homeTeam.flag} ${m.homeTeam.name} vs ${m.awayTeam.name} ${m.awayTeam.flag}\n🕐 ${m.istTime} IST · ${m.istDateLabel}\n📍 ${m.city}\n📺 Watch on Zee5\n\nAll WC times in IST → kickoffist.com 🇮🇳`);
  return `https://wa.me/?text=${msg}`;
}

export default function PortalMatchCard({ match, showDate=false }: { match: Match; showDate?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [countdown, setCountdown] = useState<string|null>(null);
  const [copied, setCopied] = useState(false);

  const isLive     = match.status==="LIVE";
  const isFinished = match.status==="FINISHED";
  const isUpcoming = match.status==="UPCOMING";
  const hScore     = match.score.home;
  const aScore     = match.score.away;
  const homeWin    = isFinished && hScore!==null && aScore!==null && hScore>aScore;
  const awayWin    = isFinished && hScore!==null && aScore!==null && aScore>hScore;
  const isDraw     = isFinished && hScore===aScore && hScore!==null;

  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(getCountdown(match.utcDate));
    tick(); const id = setInterval(tick, 30000); return () => clearInterval(id);
  }, [match.utcDate, isUpcoming]);

  const hGoals = match.goals?.filter(g=>g.team===match.homeTeam.name)||[];
  const aGoals = match.goals?.filter(g=>g.team===match.awayTeam.name)||[];

  const shareText = isFinished
    ? `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${hScore}–${aScore} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · ${match.group} · FIFA WC 2026\n\nAll results in IST → kickoffist.com 🇮🇳`
    : `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST · ${match.istDateLabel}\n📺 Zee5 India\n\nAll WC times in IST → kickoffist.com 🇮🇳`;

  const copyShare = () => {
    navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});
  };

  return (
    <div className={`mc ${isLive?"mc-live":""}`}>
      {/* Main card row */}
      <div style={{display:"flex",alignItems:"stretch",minHeight:"78px"}}
        onClick={()=>(isFinished||isLive)&&setExpanded(!expanded)}
        style2={{cursor:(isFinished||isLive)?"pointer":"default"}}>
        {/* Strip */}
        <div style={{width:"4px",flexShrink:0,borderRadius:"14px 0 0 14px",background:isLive?"#ef4444":isFinished?"rgba(74,222,128,.5)":"#FF9933"}}/>
        {/* Group meta */}
        <div style={{width:"70px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",gap:"4px",borderRight:"1px solid rgba(255,255,255,.05)",background:"rgba(0,0,0,.15)",cursor:(isFinished||isLive)?"pointer":"default"}}
          onClick={()=>(isFinished||isLive)&&setExpanded(!expanded)}>
          {match.group&&<span className="badge-grp">{match.group.replace("Group ","Grp ")}</span>}
          {isLive&&<span className="badge-live"><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
          {isFinished&&<span className="badge-ft">FT</span>}
          {isUpcoming&&showDate&&match.istDateLabel&&<span className="badge-up" style={{fontSize:"9px"}}>{match.istDateLabel.slice(0,6)}</span>}
        </div>
        {/* Teams + scores */}
        <div style={{flex:1,minWidth:0,padding:"12px 14px",cursor:(isFinished||isLive)?"pointer":"default"}}
          onClick={()=>(isFinished||isLive)&&setExpanded(!expanded)}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
            <span style={{fontSize:"22px",lineHeight:1,width:"26px",textAlign:"center",flexShrink:0}}>{match.homeTeam.flag||"🏳️"}</span>
            <span style={{flex:1,fontFamily:"'Teko',sans-serif",fontSize:"18px",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".03em",
              color:homeWin?"#4ade80":isDraw?"#fff":isFinished?"rgba(255,255,255,.45)":"#fff"
            }}>{match.homeTeam.name}</span>
            {(isLive||isFinished)&&hScore!==null&&(
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"32px",letterSpacing:".04em",color:homeWin?"#4ade80":isDraw?"#fff":"rgba(255,255,255,.6)",flexShrink:0,lineHeight:1}}>{hScore}</span>
            )}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"22px",lineHeight:1,width:"26px",textAlign:"center",flexShrink:0}}>{match.awayTeam.flag||"🏳️"}</span>
            <span style={{flex:1,fontFamily:"'Teko',sans-serif",fontSize:"18px",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".03em",
              color:awayWin?"#4ade80":isDraw?"#fff":isFinished?"rgba(255,255,255,.45)":"#fff"
            }}>{match.awayTeam.name}</span>
            {(isLive||isFinished)&&aScore!==null&&(
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"32px",letterSpacing:".04em",color:awayWin?"#4ade80":isDraw?"#fff":"rgba(255,255,255,.6)",flexShrink:0,lineHeight:1}}>{aScore}</span>
            )}
          </div>
          {(match.venue||match.city)&&(
            <div style={{marginTop:"5px",fontSize:"10px",color:"rgba(255,255,255,.2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
              📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
        {/* Time col */}
        <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",padding:"10px 14px",borderLeft:"1px solid rgba(255,255,255,.05)",minWidth:"68px",cursor:(isFinished||isLive)?"pointer":"default"}}
          onClick={()=>(isFinished||isLive)&&setExpanded(!expanded)}>
          {isUpcoming?(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:".04em",color:"#FF9933",lineHeight:1}}>{match.istTime}</div>
              <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)",marginTop:"2px"}}>IST</div>
              {countdown&&<div style={{fontSize:"9px",color:"rgba(255,153,51,.4)",marginTop:"3px"}}>{countdown}</div>}
            </div>
          ):isLive?(
            <div style={{textAlign:"right"}}>
              <div style={{display:"flex",alignItems:"center",gap:"4px",justifyContent:"flex-end",marginBottom:"4px"}}>
                <span className="live-dot"/>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"11px",fontWeight:600,color:"#f87171",letterSpacing:".06em"}}>LIVE</span>
              </div>
              {match.minute&&<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:".04em",color:"#f87171",lineHeight:1}}>{match.minute}&apos;</div>}
            </div>
          ):(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:".04em",color:"rgba(255,255,255,.35)"}}>{match.istTime}</div>
              <div style={{fontSize:"9px",color:"rgba(255,255,255,.2)"}}>IST</div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,.2)",marginTop:"4px"}}>{expanded?"▲":"▼"}</div>
            </div>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS — alarm + share for upcoming, share for finished */}
      {(isUpcoming||isFinished)&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",padding:"8px 12px",display:"flex",gap:"6px",background:"rgba(0,0,0,.1)"}}>
          {isUpcoming&&(
            <>
              <button onClick={()=>setShowAlarm(!showAlarm)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(255,153,51,.08)",border:"1px solid rgba(255,153,51,.18)",borderRadius:"7px",padding:"7px",cursor:"pointer",transition:"all .15s"}}>
                <span style={{fontSize:"13px"}}>⏰</span>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#FF9933",letterSpacing:".06em"}}>SET ALARM</span>
              </button>
              <button onClick={()=>setShowShare(!showShare)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"7px",padding:"7px",cursor:"pointer",transition:"all .15s"}}>
                <span style={{fontSize:"13px"}}>📤</span>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(200,212,232,.6)",letterSpacing:".06em"}}>SHARE</span>
              </button>
            </>
          )}
          {isFinished&&(
            <button onClick={()=>setShowShare(!showShare)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"7px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"13px"}}>📤</span>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(200,212,232,.6)",letterSpacing:".06em"}}>SHARE RESULT</span>
            </button>
          )}
          {isFinished&&(
            <button onClick={()=>setExpanded(!expanded)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"7px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"13px"}}>⚽</span>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(200,212,232,.6)",letterSpacing:".06em"}}>GOALS</span>
            </button>
          )}
        </div>
      )}

      {/* ALARM PANEL */}
      {showAlarm&&isUpcoming&&(
        <div style={{borderTop:"1px solid rgba(255,153,51,.12)",background:"rgba(255,153,51,.05)",padding:"12px 14px"}}>
          <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#FF9933",letterSpacing:".1em",marginBottom:"10px"}}>⏰ NEVER MISS THIS MATCH</div>
          <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
            <a href={googleCalUrl(match)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"9px",padding:"10px 12px",textDecoration:"none",transition:"all .15s"}}>
              <span style={{fontSize:"20px",flexShrink:0}}>📅</span>
              <div>
                <div style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:"#fff",letterSpacing:".04em"}}>Add to Google Calendar</div>
                <div style={{fontSize:"10px",color:"rgba(200,212,232,.4)"}}>One tap — reminder before kickoff</div>
              </div>
              <span style={{marginLeft:"auto",fontSize:"12px",color:"rgba(200,212,232,.4)"}}>→</span>
            </a>
            <a href={whatsappReminder(match)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"9px",padding:"10px 12px",textDecoration:"none",transition:"all .15s"}}>
              <span style={{fontSize:"20px",flexShrink:0}}>💬</span>
              <div>
                <div style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:"#25d366",letterSpacing:".04em"}}>Send WhatsApp Reminder</div>
                <div style={{fontSize:"10px",color:"rgba(200,212,232,.4)"}}>Share match time to yourself or friends</div>
              </div>
              <span style={{marginLeft:"auto",fontSize:"12px",color:"rgba(37,211,102,.4)"}}>→</span>
            </a>
          </div>
        </div>
      )}

      {/* SHARE PANEL */}
      {showShare&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.15)",padding:"12px 14px"}}>
          <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(200,212,232,.6)",letterSpacing:".1em",marginBottom:"8px"}}>📤 SHARE THIS MATCH</div>
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"8px",padding:"10px 12px",marginBottom:"8px",fontSize:"12px",color:"rgba(200,212,232,.7)",lineHeight:1.7,whiteSpace:"pre-wrap",fontFamily:"'Inter',sans-serif"}}>{shareText}</div>
          <div style={{display:"flex",gap:"7px"}}>
            <button onClick={copyShare} style={{flex:1,padding:"9px",background:copied?"rgba(74,222,128,.1)":"rgba(255,153,51,.1)",border:copied?"1px solid rgba(74,222,128,.3)":"1px solid rgba(255,153,51,.25)",borderRadius:"8px",cursor:"pointer",fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:copied?"#4ade80":"#FF9933",letterSpacing:".06em",transition:"all .15s"}}>
              {copied?"✅ COPIED!":"📋 COPY TEXT"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:"9px",background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"8px",cursor:"pointer",fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#25d366",letterSpacing:".06em",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"5px"}}>
              💬 WHATSAPP
            </a>
          </div>
        </div>
      )}

      {/* GOALSCORERS */}
      {expanded&&(isFinished||isLive)&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",background:"rgba(0,0,0,.2)",padding:"10px 14px"}}>
          {(hGoals.length>0||aGoals.length>0)?(
            <div style={{display:"flex",gap:"12px"}}>
              <div style={{flex:1}}>
                {hGoals.map((g,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"4px"}}>
                    <span style={{color:"#4ade80",fontSize:"11px"}}>⚽</span>
                    <span style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:500,color:"#C8D4E8"}}>{g.player}</span>
                    <span style={{fontSize:"10px",color:"rgba(255,255,255,.3)"}}>{g.minute}&apos;</span>
                  </div>
                ))}
              </div>
              <div style={{flex:1,textAlign:"right"}}>
                {aGoals.map((g,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"4px",justifyContent:"flex-end"}}>
                    <span style={{fontSize:"10px",color:"rgba(255,255,255,.3)"}}>{g.minute}&apos;</span>
                    <span style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:500,color:"#C8D4E8"}}>{g.player}</span>
                    <span style={{color:"#4ade80",fontSize:"11px"}}>⚽</span>
                  </div>
                ))}
              </div>
            </div>
          ):(
            <div style={{fontSize:"10px",color:"rgba(255,255,255,.25)",textAlign:"center"}}>Goalscorer data unavailable</div>
          )}
        </div>
      )}
    </div>
  );
}
