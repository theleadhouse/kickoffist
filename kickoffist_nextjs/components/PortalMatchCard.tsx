"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";
import MatchInfoPanel from "@/components/MatchInfoPanel";

function gcalUrl(m: Match) {
  const p = (s:string) => s.replace(/[-:]/g,"").replace(/\.\d+/,"");
  const s = p(new Date(m.utcDate).toISOString());
  const e = p(new Date(new Date(m.utcDate).getTime()+7200000).toISOString());
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name}`)}&dates=${s}/${e}&details=${encodeURIComponent(`FIFA WC 2026 · ${m.group}\nWatch on Zee5 · kickoffist.com`)}`;
}
function waUrl(m: Match) {
  return `https://wa.me/?text=${encodeURIComponent(`⚽ ${m.homeTeam.flag} ${m.homeTeam.name} vs ${m.awayTeam.name} ${m.awayTeam.flag}\n🕐 ${m.istTime} IST · ${m.istDateLabel}\n📺 Zee5 India\n→ kickoffist.com 🇮🇳`)}`;
}

export default function PortalMatchCard({ match, showDate=false }: { match: Match; showDate?: boolean }) {
  const [expanded,  setExpanded]  = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [countdown, setCountdown] = useState<string|null>(null);
  const [copied,    setCopied]    = useState(false);

  const isLive     = match.status==="LIVE";
  const isFinished = match.status==="FINISHED";
  const isUpcoming = match.status==="UPCOMING";
  const h = match.score.home, a = match.score.away;
  const homeWin = isFinished && h!==null && a!==null && h>a;
  const awayWin = isFinished && h!==null && a!==null && a>h;
  const isDraw  = isFinished && h===a && h!==null;

  useEffect(()=>{
    if(!isUpcoming) return;
    const tick=()=>setCountdown(getCountdown(match.utcDate));
    tick(); const id=setInterval(tick,30000); return ()=>clearInterval(id);
  },[match.utcDate,isUpcoming]);

  const hGoals = match.goals?.filter(g=>g.team===match.homeTeam.name)||[];
  const aGoals = match.goals?.filter(g=>g.team===match.awayTeam.name)||[];
  const shareText = isFinished
    ? `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · ${match.group} · FIFA WC 2026\n→ kickoffist.com 🇮🇳`
    : `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST\n📺 Zee5 India\n→ kickoffist.com 🇮🇳`;

  return (
    <div className={`mc ${isLive?"mc-live":""}`}>
      {/* ── MAIN ROW ── */}
      <div
        style={{display:"flex",alignItems:"stretch",minHeight:"76px",cursor:(isFinished||isLive)?"pointer":"default"}}
        onClick={()=>(isFinished||isLive)&&setExpanded(!expanded)}
      >
        {/* Colour strip */}
        <div style={{width:"4px",flexShrink:0,background:isLive?"#ef4444":isFinished?"rgba(34,197,94,.6)":"#FF9933"}}/>

        {/* Group tag */}
        <div style={{width:"68px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",gap:"4px",borderRight:"1px solid rgba(255,255,255,.05)",background:"rgba(0,0,0,.15)"}}>
          {match.group&&<span className="badge-grp">{match.group.replace("Group ","Grp ")}</span>}
          {isLive&&<span className="badge-live"><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
          {isFinished&&<span className="badge-ft">FT</span>}
          {isUpcoming&&showDate&&match.istDateLabel&&<span className="badge-up" style={{fontSize:"9px"}}>{match.istDateLabel.slice(0,6)}</span>}
        </div>

        {/* Teams — Teko font */}
        <div style={{flex:1,minWidth:0,padding:"12px 14px"}}>
          {/* Home */}
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
            <span style={{fontSize:"22px",lineHeight:1,width:"26px",textAlign:"center",flexShrink:0}}>{match.homeTeam.flag||"🏳️"}</span>
            <span style={{flex:1,fontFamily:"'Teko',sans-serif",fontSize:"18px",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".02em",
              color:homeWin?"#22c55e":isDraw?"#fff":isFinished?"rgba(255,255,255,.4)":"#fff"
            }}>{match.homeTeam.name}</span>
            {(isLive||isFinished)&&h!==null&&(
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"32px",letterSpacing:".04em",flexShrink:0,lineHeight:1,
                color:homeWin?"#22c55e":isDraw?"#fff":"rgba(255,255,255,.55)"
              }}>{h}</span>
            )}
          </div>
          {/* Away */}
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"22px",lineHeight:1,width:"26px",textAlign:"center",flexShrink:0}}>{match.awayTeam.flag||"🏳️"}</span>
            <span style={{flex:1,fontFamily:"'Teko',sans-serif",fontSize:"18px",fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".02em",
              color:awayWin?"#22c55e":isDraw?"#fff":isFinished?"rgba(255,255,255,.4)":"#fff"
            }}>{match.awayTeam.name}</span>
            {(isLive||isFinished)&&a!==null&&(
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"32px",letterSpacing:".04em",flexShrink:0,lineHeight:1,
                color:awayWin?"#22c55e":isDraw?"#fff":"rgba(255,255,255,.55)"
              }}>{a}</span>
            )}
          </div>
          {(match.venue||match.city)&&(
            <div style={{marginTop:"5px",fontSize:"10px",color:"rgba(255,255,255,.2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
              📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>

        {/* Time */}
        <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",padding:"10px 14px",borderLeft:"1px solid rgba(255,255,255,.05)",minWidth:"68px"}}>
          {isUpcoming&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:".04em",color:"#FF9933",lineHeight:1}}>{match.istTime}</div>
              <div style={{fontSize:"9px",color:"rgba(255,255,255,.3)",marginTop:"2px"}}>IST</div>
              {countdown&&<div style={{fontSize:"9px",color:"rgba(255,153,51,.45)",marginTop:"3px"}}>{countdown}</div>}
            </div>
          )}
          {isLive&&(
            <div style={{textAlign:"right"}}>
              <div style={{display:"flex",alignItems:"center",gap:"4px",justifyContent:"flex-end",marginBottom:"4px"}}>
                <span className="live-dot"/>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"11px",fontWeight:600,color:"#f87171",letterSpacing:".06em"}}>LIVE</span>
              </div>
              {match.minute&&<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:".04em",color:"#f87171",lineHeight:1}}>{match.minute}&apos;</div>}
            </div>
          )}
          {isFinished&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",letterSpacing:".04em",color:"rgba(255,255,255,.3)"}}>{match.istTime}</div>
              <div style={{fontSize:"9px",color:"rgba(255,255,255,.2)"}}>IST</div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,.2)",marginTop:"4px"}}>{expanded?"▲":"▼"}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── ACTION BUTTONS ── */}
      {(isUpcoming||isFinished)&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",padding:"8px 12px",display:"flex",gap:"6px",background:"rgba(0,0,0,.1)"}}>
          {isUpcoming&&(
            <button onClick={()=>setShowAlarm(!showAlarm)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(255,153,51,.08)",border:"1px solid rgba(255,153,51,.2)",borderRadius:"7px",padding:"7px",cursor:"pointer",transition:"all .15s"}}>
              <span style={{fontSize:"13px"}}>⏰</span>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#FF9933",letterSpacing:".06em"}}>SET ALARM</span>
            </button>
          )}
          {isFinished&&(
            <button onClick={()=>setExpanded(!expanded)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(34,197,94,.07)",border:"1px solid rgba(34,197,94,.15)",borderRadius:"7px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"13px"}}>⚽</span>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#22c55e",letterSpacing:".06em"}}>GOALS</span>
            </button>
          )}
          <button onClick={()=>setShowShare(!showShare)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"7px",padding:"7px",cursor:"pointer"}}>
            <span style={{fontSize:"13px"}}>📤</span>
            <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.5)",letterSpacing:".06em"}}>SHARE</span>
          </button>
          {isUpcoming&&<MatchInfoPanel match={match}/>}
        </div>
      )}

      {/* ── ALARM ── */}
      {showAlarm&&isUpcoming&&(
        <div style={{borderTop:"1px solid rgba(255,153,51,.15)",background:"rgba(255,153,51,.04)",padding:"12px 14px"}}>
          <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#FF9933",letterSpacing:".1em",marginBottom:"10px"}}>⏰ NEVER MISS THIS MATCH</div>
          <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
            <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"9px",padding:"10px 12px",textDecoration:"none"}}>
              <span style={{fontSize:"20px",flexShrink:0}}>📅</span>
              <div>
                <div style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:"#fff",letterSpacing:".04em"}}>Add to Google Calendar</div>
                <div style={{fontSize:"10px",color:"rgba(255,255,255,.35)"}}>One tap reminder before kickoff</div>
              </div>
              <span style={{marginLeft:"auto",fontSize:"12px",color:"rgba(255,255,255,.3)"}}>→</span>
            </a>
            <a href={waUrl(match)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(37,211,102,.07)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"9px",padding:"10px 12px",textDecoration:"none"}}>
              <span style={{fontSize:"20px",flexShrink:0}}>💬</span>
              <div>
                <div style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:"#25d366",letterSpacing:".04em"}}>Send WhatsApp Reminder</div>
                <div style={{fontSize:"10px",color:"rgba(255,255,255,.35)"}}>Share with yourself or friends</div>
              </div>
              <span style={{marginLeft:"auto",fontSize:"12px",color:"rgba(37,211,102,.3)"}}>→</span>
            </a>
          </div>
        </div>
      )}

      {/* ── SHARE ── */}
      {showShare&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.15)",padding:"12px 14px"}}>
          <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.5)",letterSpacing:".1em",marginBottom:"8px"}}>📤 SHARE</div>
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"8px",padding:"10px 12px",marginBottom:"8px",fontSize:"12px",color:"rgba(255,255,255,.65)",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{shareText}</div>
          <div style={{display:"flex",gap:"7px"}}>
            <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,padding:"9px",background:copied?"rgba(34,197,94,.1)":"rgba(255,153,51,.1)",border:copied?"1px solid rgba(34,197,94,.3)":"1px solid rgba(255,153,51,.25)",borderRadius:"8px",cursor:"pointer",fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:copied?"#22c55e":"#FF9933",letterSpacing:".06em",transition:"all .15s"}}>
              {copied?"✅ COPIED!":"📋 COPY"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:"9px",background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"8px",fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#25d366",letterSpacing:".06em",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"5px"}}>
              💬 WHATSAPP
            </a>
          </div>
        </div>
      )}

      {/* ── GOALSCORERS ── */}
      {expanded&&(isFinished||isLive)&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",background:"rgba(0,0,0,.2)",padding:"10px 14px"}}>
          {(hGoals.length>0||aGoals.length>0)?(
            <div style={{display:"flex",gap:"12px"}}>
              <div style={{flex:1}}>
                {hGoals.map((g,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"4px"}}>
                    <span style={{color:"#22c55e",fontSize:"11px"}}>⚽</span>
                    <span style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:500,color:"rgba(255,255,255,.8)"}}>{g.player}</span>
                    <span style={{fontSize:"10px",color:"rgba(255,255,255,.3)"}}>{g.minute}&apos;</span>
                  </div>
                ))}
              </div>
              <div style={{flex:1,textAlign:"right"}}>
                {aGoals.map((g,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"5px",marginBottom:"4px",justifyContent:"flex-end"}}>
                    <span style={{fontSize:"10px",color:"rgba(255,255,255,.3)"}}>{g.minute}&apos;</span>
                    <span style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:500,color:"rgba(255,255,255,.8)"}}>{g.player}</span>
                    <span style={{color:"#22c55e",fontSize:"11px"}}>⚽</span>
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
