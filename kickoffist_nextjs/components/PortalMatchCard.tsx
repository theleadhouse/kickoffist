"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";
import MatchInfoPanel from "@/components/MatchInfoPanel";

function gcalUrl(m: Match) {
  const p=(s:string)=>s.replace(/[-:]/g,"").replace(/\.\d+/,"");
  const s=p(new Date(m.utcDate).toISOString());
  const e=p(new Date(new Date(m.utcDate).getTime()+7200000).toISOString());
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name}`)}&dates=${s}/${e}&details=${encodeURIComponent(`FIFA WC 2026 · Watch on Zee5 · kickoffist.com`)}`;
}

export default function PortalMatchCard({ match, showDate=false }: { match: Match; showDate?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [copied, setCopied] = useState(false);

  const isLive=match.status==="LIVE", isFinished=match.status==="FINISHED", isUpcoming=match.status==="UPCOMING";
  const h=match.score.home, a=match.score.away;
  const homeWin=isFinished&&h!==null&&a!==null&&h>a;
  const awayWin=isFinished&&h!==null&&a!==null&&a>h;
  const isDraw=isFinished&&h===a&&h!==null;
  const isR32 = match.group==="R32";

  useEffect(()=>{
    if(!isUpcoming) return;
    const tick=()=>setCountdown(getCountdown(match.utcDate)??"");
    tick(); const id=setInterval(tick,30000); return()=>clearInterval(id);
  },[match.utcDate,isUpcoming]);

  const hGoals=match.goals?.filter(g=>g.team===match.homeTeam.name)||[];
  const aGoals=match.goals?.filter(g=>g.team===match.awayTeam.name)||[];
  const shareText=isFinished
    ? `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · FIFA WC 2026\n→ kickoffist.com 🇮🇳`
    : `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST\n📺 Zee5 India → kickoffist.com 🇮🇳`;

  const borderColor = isLive?"#CC1100":isFinished?"#006B3C":"#FF9933";

  return (
    <div className="mc-standalone" style={{borderLeftColor:borderColor,borderLeftWidth:"3px",borderLeftStyle:"solid",marginBottom:"8px"}}>
      {/* Main row */}
      <div
        style={{display:"flex",alignItems:"stretch",minHeight:"76px",cursor:(isFinished||isLive)?"pointer":"default",background:"#fff"}}
        onClick={()=>(isFinished||isLive)&&setExpanded(!expanded)}
      >
        {/* Stage/Group tag */}
        <div style={{width:"72px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 6px",gap:"4px",borderRight:"1px solid #F0F0EC",background:"#FAFAF8"}}>
          <span className={isR32?"badge-r32":"badge-grp"}>{isR32?"R32":match.group?.replace("Group ","Grp ")||"WC"}</span>
          {isLive&&<span className="badge-live" style={{fontSize:"10px"}}><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
          {isFinished&&<span className="badge-ft">FT</span>}
          {isUpcoming&&showDate&&match.istDateLabel&&<span className="badge-up" style={{fontSize:"9px"}}>{match.istDateLabel.slice(0,6)}</span>}
        </div>

        {/* Teams + scores */}
        <div style={{flex:1,minWidth:0,padding:"12px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"9px"}}>
            <span style={{fontSize:"21px",lineHeight:1,width:"24px",textAlign:"center",flexShrink:0}}>{match.homeTeam.flag||"🏳️"}</span>
            <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"19px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".02em",
              color:homeWin?"#006B3C":isDraw?"#0A0A0A":isFinished?"#999":"#0A0A0A"
            }}>{match.homeTeam.name}</span>
            {(isLive||isFinished)&&h!==null&&(
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"34px",letterSpacing:"2px",flexShrink:0,lineHeight:1,
                color:homeWin?"#006B3C":isDraw?"#0A0A0A":"#999"
              }}>{h}</span>
            )}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <span style={{fontSize:"21px",lineHeight:1,width:"24px",textAlign:"center",flexShrink:0}}>{match.awayTeam.flag||"🏳️"}</span>
            <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"19px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".02em",
              color:awayWin?"#006B3C":isDraw?"#0A0A0A":isFinished?"#999":"#0A0A0A"
            }}>{match.awayTeam.name}</span>
            {(isLive||isFinished)&&a!==null&&(
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"34px",letterSpacing:"2px",flexShrink:0,lineHeight:1,
                color:awayWin?"#006B3C":isDraw?"#0A0A0A":"#999"
              }}>{a}</span>
            )}
          </div>
          {(match.venue||match.city)&&(
            <div style={{marginTop:"5px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"#999",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".04em"}}>
              📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>

        {/* Time */}
        <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",padding:"10px 16px",borderLeft:"1px solid #F0F0EC",minWidth:"70px",background:"#FAFAF8"}}>
          {isUpcoming&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"21px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{match.istTime}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#999",marginTop:"1px",letterSpacing:".06em"}}>IST</div>
              {countdown&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:600,color:"#CC7A00",marginTop:"2px"}}>{countdown}</div>}
            </div>
          )}
          {isLive&&(
            <div style={{textAlign:"right"}}>
              <div style={{display:"flex",alignItems:"center",gap:"4px",justifyContent:"flex-end",marginBottom:"4px"}}>
                <span className="live-dot" style={{width:"6px",height:"6px"}}/>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#CC1100",letterSpacing:".08em"}}>LIVE</span>
              </div>
              {match.minute&&<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",letterSpacing:"1px",color:"#CC1100",lineHeight:1}}>{match.minute}&apos;</div>}
            </div>
          )}
          {isFinished&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"1px",color:"#999"}}>{match.istTime}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#CCC",letterSpacing:".06em"}}>IST</div>
              <div style={{fontSize:"12px",color:"#CCC",marginTop:"4px"}}>{expanded?"▲":"▼"}</div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      {(isUpcoming||isFinished)&&(
        <div style={{borderTop:"1px solid #F0F0EC",padding:"8px 12px",display:"flex",gap:"6px",background:"#FAFAF8"}}>
          {isUpcoming&&(
            <>
              <button onClick={()=>setShowAlarm(!showAlarm)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"#FFF3E0",border:"1px solid rgba(255,153,51,.3)",borderRadius:"6px",padding:"7px",cursor:"pointer"}}>
                <span style={{fontSize:"12px"}}>⏰</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#CC7A00",letterSpacing:".08em"}}>ALARM</span>
              </button>
              <MatchInfoPanel match={match}/>
            </>
          )}
          {isFinished&&(
            <button onClick={()=>setExpanded(!expanded)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"#E8F5EE",border:"1px solid rgba(0,107,60,.15)",borderRadius:"6px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"12px"}}>⚽</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#006B3C",letterSpacing:".08em"}}>GOALS</span>
            </button>
          )}
          <button onClick={()=>setShowShare(!showShare)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"#fff",border:"1px solid #E5E5E0",borderRadius:"6px",padding:"7px",cursor:"pointer"}}>
            <span style={{fontSize:"12px"}}>📤</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#666",letterSpacing:".08em"}}>SHARE</span>
          </button>
        </div>
      )}

      {/* Alarm */}
      {showAlarm&&isUpcoming&&(
        <div style={{borderTop:"1px solid #FDE8CC",background:"#FFF9F0",padding:"12px 14px"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#CC7A00",letterSpacing:".12em",marginBottom:"10px"}}>⏰ NEVER MISS THIS MATCH</div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"#fff",border:"1px solid #E5E5E0",borderRadius:"8px",padding:"10px 12px",textDecoration:"none",boxShadow:"0 1px 3px rgba(0,0,0,.06)"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>📅</span>
              <div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#0A0A0A",letterSpacing:".04em"}}>Add to Google Calendar</div>
                <div style={{fontSize:"10px",color:"#999"}}>Reminder before kickoff</div>
              </div>
              <span style={{marginLeft:"auto",color:"#999",fontSize:"12px"}}>→</span>
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST · ${match.istDateLabel}\n📺 Zee5 India\n→ kickoffist.com 🇮🇳`)}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(37,211,102,.06)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"8px",padding:"10px 12px",textDecoration:"none"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>💬</span>
              <div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#1a7a3a",letterSpacing:".04em"}}>WhatsApp Reminder</div>
                <div style={{fontSize:"10px",color:"#999"}}>Share with yourself or friends</div>
              </div>
              <span style={{marginLeft:"auto",color:"#25d366",fontSize:"12px"}}>→</span>
            </a>
          </div>
        </div>
      )}

      {/* Share */}
      {showShare&&(
        <div style={{borderTop:"1px solid #E5E5E0",background:"#FAFAF8",padding:"12px 14px"}}>
          <div style={{background:"#fff",border:"1px solid #E5E5E0",borderRadius:"7px",padding:"10px 12px",marginBottom:"8px",fontSize:"12px",color:"#333",lineHeight:1.7,whiteSpace:"pre-wrap",fontFamily:"'Inter',sans-serif"}}>{shareText}</div>
          <div style={{display:"flex",gap:"6px"}}>
            <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,padding:"8px",background:copied?"#E8F5EE":"#FFF3E0",border:copied?"1px solid rgba(0,107,60,.2)":"1px solid rgba(255,153,51,.3)",borderRadius:"7px",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:copied?"#006B3C":"#CC7A00",letterSpacing:".08em",transition:"all .15s"}}>
              {copied?"✅ COPIED":"📋 COPY"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:"8px",background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"7px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#1a7a3a",letterSpacing:".08em",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
              💬 WHATSAPP
            </a>
          </div>
        </div>
      )}

      {/* Goals */}
      {expanded&&(isFinished||isLive)&&(
        <div style={{borderTop:"1px solid #E5E5E0",background:"#fff",padding:"12px 16px"}}>
          {(hGoals.length>0||aGoals.length>0)?(
            <div style={{display:"flex",gap:"12px"}}>
              <div style={{flex:1}}>
                {hGoals.map((g,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px"}}>
                    <span style={{fontSize:"12px"}}>⚽</span>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#0A0A0A"}}>{g.player}</span>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"#999"}}>{g.minute}&apos;</span>
                  </div>
                ))}
              </div>
              <div style={{flex:1,textAlign:"right"}}>
                {aGoals.map((g,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px",justifyContent:"flex-end"}}>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"#999"}}>{g.minute}&apos;</span>
                    <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#0A0A0A"}}>{g.player}</span>
                    <span style={{fontSize:"12px"}}>⚽</span>
                  </div>
                ))}
              </div>
            </div>
          ):(
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"#999",textAlign:"center",letterSpacing:".06em"}}>GOALSCORER DATA UNAVAILABLE</div>
          )}
        </div>
      )}
    </div>
  );
}
