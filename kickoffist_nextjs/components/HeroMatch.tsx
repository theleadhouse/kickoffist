"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";
import MatchInfoPanel from "@/components/MatchInfoPanel";

function gcalUrl(m: Match) {
  const p=(s:string)=>s.replace(/[-:]/g,"").replace(/\.\d+/,"");
  const s=p(new Date(m.utcDate).toISOString());
  const e=p(new Date(new Date(m.utcDate).getTime()+7200000).toISOString());
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name} — WC 2026`)}&dates=${s}/${e}&details=${encodeURIComponent(`FIFA WC 2026\nWatch on Zee5 India\nkickoffist.com`)}`;
}

export default function HeroMatch({ match, played, total }: { match: Match; played: number; total: number }) {
  const [countdown, setCountdown] = useState("");
  const [copied,    setCopied]    = useState(false);

  const isLive     = match.status === "LIVE";
  const isFinished = match.status === "FINISHED";
  const isUpcoming = match.status === "UPCOMING";
  const h = match.score.home;
  const a = match.score.away;

  useEffect(() => {
    if (!isUpcoming) return;
    const tick = () => setCountdown(getCountdown(match.utcDate) ?? "");
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [match.utcDate, isUpcoming]);

  const shareText = isUpcoming
    ? `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST\n📺 Zee5 India · kickoffist.com 🇮🇳`
    : `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · FIFA WC 2026 · kickoffist.com 🇮🇳`;

  return (
    <div style={{
      position:"relative",overflow:"hidden",borderRadius:"16px",marginBottom:"16px",
      background:"linear-gradient(135deg,#0d1a0d 0%,#152e15 35%,#101a2a 100%)",
      border: isLive ? "1px solid rgba(239,68,68,.4)" : "1px solid rgba(255,153,51,.2)",
      boxShadow: isLive ? "0 0 40px rgba(239,68,68,.1)" : "0 0 40px rgba(255,153,51,.06)",
    }}>
      {/* Pitch art */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 46px),repeating-linear-gradient(90deg,rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 46px)"}}/>
      <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"45vw",maxWidth:"300px",aspectRatio:"1",borderRadius:"50%",border:"1.5px solid rgba(255,255,255,.06)"}}/>
      <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:"1px",background:"rgba(255,255,255,.05)"}}/>

      {/* Top bar */}
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontSize:"14px"}}>🏆</span>
          <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.5)",letterSpacing:".1em"}}>FIFA WORLD CUP 2026</span>
          {match.group && <span className="badge-grp">{match.group}</span>}
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          {isLive && (
            <div style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",borderRadius:"6px",padding:"4px 10px"}}>
              <span className="live-dot" style={{width:"6px",height:"6px"}}/>
              <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#f87171",letterSpacing:".06em"}}>{match.minute ? `${match.minute}'` : "LIVE"}</span>
            </div>
          )}
          <div style={{display:"flex",gap:"6px"}}>
            {[{n:`${played}`,l:"Played"},{n:`${total-played}`,l:"Left"}].map((s,i)=>(
              <div key={i} style={{background:"rgba(0,0,0,.4)",borderRadius:"7px",padding:"5px 10px",textAlign:"center"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
                <div style={{fontSize:"8px",color:"rgba(255,255,255,.35)"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN — two teams */}
      <div style={{position:"relative",zIndex:1,padding:"24px 20px"}}>
        {isUpcoming && countdown && (
          <div style={{textAlign:"center",fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"rgba(255,153,51,.7)",letterSpacing:".12em",marginBottom:"16px"}}>
            KICKS OFF IN {countdown.toUpperCase()}
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"16px",alignItems:"center"}}>
          {/* Home */}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"clamp(52px,8vw,72px)",lineHeight:1,marginBottom:"10px"}}>{match.homeTeam.flag||"🏳️"}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(18px,3.5vw,26px)",letterSpacing:"2px",color:"#fff",lineHeight:1}}>{match.homeTeam.name}</div>
          </div>

          {/* Score / VS */}
          <div style={{textAlign:"center",minWidth:"80px"}}>
            {(isLive||isFinished) && h!==null && a!==null ? (
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(48px,8vw,72px)",letterSpacing:"4px",color:"#fff",lineHeight:1}}>{h}–{a}</div>
                {isFinished && <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.4)",letterSpacing:".08em",marginTop:"4px"}}>FULL TIME</div>}
              </>
            ) : (
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,5vw,44px)",letterSpacing:"3px",color:"#FF9933",lineHeight:1}}>{match.istTime}</div>
                <div style={{fontFamily:"'Teko',sans-serif",fontSize:"11px",color:"rgba(255,255,255,.4)",letterSpacing:".1em",marginTop:"2px"}}>IST</div>
              </>
            )}
          </div>

          {/* Away */}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"clamp(52px,8vw,72px)",lineHeight:1,marginBottom:"10px"}}>{match.awayTeam.flag||"🏳️"}</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(18px,3.5vw,26px)",letterSpacing:"2px",color:"#fff",lineHeight:1}}>{match.awayTeam.name}</div>
          </div>
        </div>

        {(match.venue||match.city) && (
          <div style={{textAlign:"center",marginTop:"12px",fontSize:"11px",color:"rgba(255,255,255,.3)"}}>
            📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
          </div>
        )}
      </div>

      {/* Match Info Panel */}
      {isUpcoming && <div style={{padding:"0 16px 8px",position:"relative",zIndex:1}}><div style={{display:"flex",gap:"8px"}}><MatchInfoPanel match={match}/></div></div>}

      {/* Action buttons */}
      <div style={{position:"relative",zIndex:1,padding:"0 16px 16px",display:"flex",gap:"8px"}}>
        {isUpcoming && (
          <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#FF9933",borderRadius:"10px",padding:"12px",textDecoration:"none"}}>
            <span style={{fontSize:"14px"}}>⏰</span>
            <span style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:"#000",letterSpacing:".06em"}}>SET ALARM</span>
          </a>
        )}
        <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:copied?"rgba(34,197,94,.15)":"rgba(255,255,255,.07)",border:copied?"1px solid rgba(34,197,94,.3)":"1px solid rgba(255,255,255,.12)",borderRadius:"10px",padding:"12px",cursor:"pointer",transition:"all .15s"}}>
          <span style={{fontSize:"14px"}}>{copied?"✅":"📤"}</span>
          <span style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:copied?"#22c55e":"rgba(255,255,255,.7)",letterSpacing:".06em"}}>{copied?"COPIED!":"SHARE"}</span>
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",borderRadius:"10px",padding:"12px",textDecoration:"none"}}>
          <span style={{fontSize:"14px"}}>💬</span>
          <span style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:"#25d366",letterSpacing:".06em"}}>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
