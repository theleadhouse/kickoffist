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

export default function HeroMatch({ match, played, total }: { match: Match; played: number; total: number }) {
  const [countdown, setCountdown] = useState("");
  const [copied, setCopied] = useState(false);
  const isLive = match.status==="LIVE", isFinished = match.status==="FINISHED", isUpcoming = match.status==="UPCOMING";
  const h = match.score.home, a = match.score.away;

  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(getCountdown(match.utcDate) ?? "");
    tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id);
  },[match.utcDate,isUpcoming]);

  const shareText = isUpcoming
    ? `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST\n📺 Zee5 India · kickoffist.com 🇮🇳`
    : `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · FIFA WC 2026 · kickoffist.com 🇮🇳`;

  return (
    <div style={{
      position:"relative",overflow:"hidden",borderRadius:"16px",marginBottom:"16px",
      background:"linear-gradient(150deg,#0a1a0a 0%,#0f2a1a 30%,#0a1428 70%,#080f1e 100%)",
      border:isLive?"1px solid rgba(239,68,68,.4)":"1px solid rgba(255,153,51,.2)",
      boxShadow:isLive?"0 0 50px rgba(239,68,68,.12)":"0 0 50px rgba(255,153,51,.08)",
    }}>
      {/* Pitch grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 48px)"}}/>
      {/* Centre circle */}
      <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"min(50vw,320px)",aspectRatio:"1",borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.06)"}}/>
      <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:"1px",background:"rgba(255,255,255,.04)"}}/>
      {/* Footballer silhouette */}
      <div style={{position:"absolute",right:"2%",bottom:0,height:"88%",opacity:.06,pointerEvents:"none",display:"flex",alignItems:"flex-end"}}>
        <svg viewBox="0 0 180 380" height="100%" fill="white" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="38" r="28"/>
          <path d="M62 66 Q50 105 48 148 L76 152 L80 210 L90 206 L100 210 L104 152 L132 148 Q130 105 118 66 Z"/>
          <path d="M62 82 Q35 58 14 38 Q9 32 16 27 Q42 52 68 80"/>
          <circle cx="10" cy="24" r="13"/>
          <path d="M118 82 Q148 115 158 138 Q162 144 155 147 Q143 124 116 90"/>
          <path d="M80 210 Q68 258 55 298 Q46 318 62 322 Q74 300 86 258 L90 298 Q87 326 102 328 Q112 306 106 270 L100 210 Z"/>
          <path d="M100 210 Q112 258 126 305 Q132 325 148 322 Q140 300 132 255 L136 210 Z"/>
          <path d="M124 302 Q140 300 152 320 Q155 327 148 328 Q134 322 122 308 Z"/>
          <path d="M100 325 Q116 322 120 342 Q121 348 113 348 Q102 340 98 328 Z"/>
        </svg>
      </div>
      {/* Saffron top glow */}
      <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"70%",height:"50%",background:"radial-gradient(ellipse at 50% 0%,rgba(255,153,51,.07) 0%,transparent 70%)"}}/>

      {/* Top bar */}
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span>🏆</span>
          <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.5)",letterSpacing:".1em"}}>FIFA WORLD CUP 2026</span>
          {match.group&&<span className="badge-grp">{match.group}</span>}
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          {isLive&&(
            <div style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",borderRadius:"6px",padding:"4px 10px"}}>
              <span className="live-dot" style={{width:"6px",height:"6px"}}/>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#f87171",letterSpacing:".06em"}}>{match.minute?`${match.minute}'`:"LIVE"}</span>
            </div>
          )}
          <div style={{display:"flex",gap:"6px"}}>
            {[{n:`${played}`,l:"Played"},{n:`${total-played}`,l:"Left"}].map((s,i)=>(
              <div key={i} style={{background:"rgba(0,0,0,.5)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"8px",padding:"6px 10px",textAlign:"center"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:"8px",color:"rgba(255,255,255,.4)"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* THE BIG MATCH — flags + score/time */}
      <div style={{position:"relative",zIndex:1,padding:"28px 20px 20px"}}>
        {isUpcoming&&countdown&&(
          <div style={{textAlign:"center",fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:"rgba(255,153,51,.7)",letterSpacing:".14em",marginBottom:"18px"}}>
            KICKS OFF IN {countdown.toUpperCase()}
          </div>
        )}
        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"12px",alignItems:"center"}}>
          {/* Home */}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"clamp(56px,9vw,76px)",lineHeight:1,marginBottom:"10px",filter:"drop-shadow(0 4px 12px rgba(0,0,0,.5))"}}>{match.homeTeam.flag||"🏳️"}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(16px,3vw,24px)",letterSpacing:"2px",color:"#fff",lineHeight:1}}>{match.homeTeam.name}</div>
          </div>
          {/* Score / Time */}
          <div style={{textAlign:"center",minWidth:"90px"}}>
            {(isLive||isFinished)&&h!==null&&a!==null?(
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(52px,9vw,76px)",letterSpacing:"4px",color:"#fff",lineHeight:1,textShadow:"0 0 30px rgba(255,255,255,.2)"}}>{h}–{a}</div>
                {isFinished&&<div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.4)",letterSpacing:".1em",marginTop:"4px"}}>FULL TIME</div>}
              </>
            ):(
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(30px,5vw,48px)",letterSpacing:"3px",color:"#FF9933",lineHeight:1,textShadow:"0 0 20px rgba(255,153,51,.3)"}}>{match.istTime}</div>
                <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.4)",letterSpacing:".1em",marginTop:"3px"}}>IST</div>
              </>
            )}
          </div>
          {/* Away */}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"clamp(56px,9vw,76px)",lineHeight:1,marginBottom:"10px",filter:"drop-shadow(0 4px 12px rgba(0,0,0,.5))"}}>{match.awayTeam.flag||"🏳️"}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(16px,3vw,24px)",letterSpacing:"2px",color:"#fff",lineHeight:1}}>{match.awayTeam.name}</div>
          </div>
        </div>
        {(match.venue||match.city)&&(
          <div style={{textAlign:"center",marginTop:"12px",fontSize:"11px",color:"rgba(255,255,255,.28)"}}>📍 {[match.venue,match.city].filter(Boolean).join(" · ")}</div>
        )}
      </div>

      {/* Match info panel for upcoming */}
      {isUpcoming&&(
        <div style={{position:"relative",zIndex:1,padding:"0 16px 8px"}}>
          <div style={{display:"flex",gap:"8px"}}>
            <MatchInfoPanel match={match}/>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div style={{position:"relative",zIndex:1,padding:"0 16px 16px",display:"flex",gap:"8px"}}>
        {isUpcoming&&(
          <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#FF9933",borderRadius:"10px",padding:"13px",textDecoration:"none",boxShadow:"0 4px 16px rgba(255,153,51,.3)",transition:"all .15s"}}>
            <span style={{fontSize:"15px"}}>⏰</span>
            <span style={{fontFamily:"'Teko',sans-serif",fontSize:"15px",fontWeight:600,color:"#000",letterSpacing:".06em"}}>SET ALARM</span>
          </a>
        )}
        <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:copied?"rgba(34,197,94,.15)":"rgba(255,255,255,.07)",border:copied?"1px solid rgba(34,197,94,.3)":"1px solid rgba(255,255,255,.12)",borderRadius:"10px",padding:"13px",cursor:"pointer",transition:"all .15s"}}>
          <span style={{fontSize:"15px"}}>{copied?"✅":"📤"}</span>
          <span style={{fontFamily:"'Teko',sans-serif",fontSize:"15px",fontWeight:600,color:copied?"#22c55e":"rgba(255,255,255,.7)",letterSpacing:".06em"}}>{copied?"COPIED!":"SHARE"}</span>
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",borderRadius:"10px",padding:"13px",textDecoration:"none",transition:"all .15s"}}>
          <span style={{fontSize:"15px"}}>💬</span>
          <span style={{fontFamily:"'Teko',sans-serif",fontSize:"15px",fontWeight:600,color:"#25d366",letterSpacing:".06em"}}>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
