"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";
import MatchInfoPanel from "@/components/MatchInfoPanel";

function gcalUrl(m: Match) {
  const p=(s:string)=>s.replace(/[-:]/g,"").replace(/\.\d+/,"");
  const s=p(new Date(m.utcDate).toISOString());
  const e=p(new Date(new Date(m.utcDate).getTime()+7200000).toISOString());
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name}`)}&dates=${s}/${e}&details=${encodeURIComponent(`FIFA WC 2026\nWatch on Zee5 India · kickoffist.com`)}`;
}

export default function HeroMatch({ match, played, total }: { match: Match; played: number; total: number }) {
  const [countdown, setCountdown] = useState("");
  const [copied, setCopied] = useState(false);
  const isLive=match.status==="LIVE", isFinished=match.status==="FINISHED", isUpcoming=match.status==="UPCOMING";
  const h=match.score.home, a=match.score.away;
  const isR32 = match.group==="R32";

  useEffect(()=>{
    if(!isUpcoming) return;
    const tick=()=>setCountdown(getCountdown(match.utcDate)??"");
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[match.utcDate,isUpcoming]);

  const shareText=isUpcoming
    ? `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST\n📺 Zee5 India · kickoffist.com 🇮🇳`
    : `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · FIFA WC 2026 · kickoffist.com 🇮🇳`;

  // Hero background — saffron for upcoming, green for live, dark for finished
  const heroBg = isLive
    ? "linear-gradient(135deg,#0d0d0d 0%,#1a0000 100%)"
    : isFinished
    ? "linear-gradient(135deg,#0d0d0d 0%,#001a0d 100%)"
    : "linear-gradient(135deg,#1a0800 0%,#2d1400 100%)";

  return (
    <div style={{
      position:"relative",overflow:"hidden",borderRadius:"16px",marginBottom:"16px",
      background:heroBg,
      boxShadow:isLive?"0 0 60px rgba(204,17,0,.2)":"0 0 60px rgba(255,153,51,.12)",
      border:isLive?"1px solid rgba(204,17,0,.3)":isFinished?"1px solid rgba(0,107,60,.3)":"1px solid rgba(255,153,51,.25)",
    }}>
      {/* Pitch watermark lines */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.02) 0,rgba(255,255,255,.02) 1px,transparent 1px,transparent 44px),repeating-linear-gradient(90deg,rgba(255,255,255,.02) 0,rgba(255,255,255,.02) 1px,transparent 1px,transparent 44px)"}}/>
      <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"min(45vw,260px)",aspectRatio:"1",borderRadius:"50%",border:"1px solid rgba(255,255,255,.04)"}}/>
      <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:"1px",background:"rgba(255,255,255,.03)"}}/>
      {/* Footballer */}
      <div style={{position:"absolute",right:"2%",bottom:0,height:"85%",opacity:.05,pointerEvents:"none",display:"flex",alignItems:"flex-end"}}>
        <svg viewBox="0 0 180 380" height="100%" fill="white" xmlns="http://www.w3.org/2000/svg">
          <circle cx="90" cy="38" r="28"/>
          <path d="M62 66 Q50 105 48 148 L76 152 L80 210 L90 206 L100 210 L104 152 L132 148 Q130 105 118 66 Z"/>
          <path d="M62 82 Q35 58 14 38 Q9 32 16 27 Q42 52 68 80"/>
          <circle cx="10" cy="24" r="13"/>
          <path d="M118 82 Q148 115 158 138 Q162 144 155 147 Q143 124 116 90"/>
          <path d="M80 210 Q68 258 55 298 Q46 318 62 322 Q74 300 86 258 L90 298 Q87 326 102 328 Q112 306 106 270 L100 210 Z"/>
          <path d="M100 210 Q112 258 126 305 Q132 325 148 322 Q140 300 132 255 L136 210 Z"/>
        </svg>
      </div>

      {/* Top strip */}
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".14em"}}>🏆 FIFA WORLD CUP 2026</span>
          <span style={{
            fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,
            padding:"1px 8px",borderRadius:"3px",letterSpacing:".08em",
            background:isR32?"rgba(255,255,255,.15)":"rgba(255,153,51,.15)",
            color:isR32?"#fff":"#FF9933",
          }}>{isR32?"ROUND OF 32":match.group}</span>
        </div>
        <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
          {isLive&&(
            <div style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(204,17,0,.2)",border:"1px solid rgba(204,17,0,.4)",borderRadius:"5px",padding:"4px 10px"}}>
              <span className="live-dot" style={{width:"6px",height:"6px",background:"#FF4444"}}/>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#FF6666",letterSpacing:".08em"}}>{match.minute?`${match.minute}'`:"LIVE"}</span>
            </div>
          )}
          {[{n:`${played}`,l:"PLAYED"},{n:`${total-played}`,l:"LEFT"}].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,.08)",borderRadius:"6px",padding:"5px 10px",textAlign:"center",minWidth:"44px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"19px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"7px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".1em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BIG FLAGS + SCORE */}
      <div style={{position:"relative",zIndex:1,padding:"32px 20px 24px"}}>
        {isUpcoming&&countdown&&(
          <div style={{textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,color:"rgba(255,153,51,.7)",letterSpacing:".2em",marginBottom:"20px"}}>
            ⏱ KICKS OFF IN {countdown.toUpperCase()}
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"clamp(64px,11vw,92px)",lineHeight:1,marginBottom:"10px",filter:"drop-shadow(0 8px 20px rgba(0,0,0,.4))"}}>
              {match.homeTeam.flag||"🏳️"}
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(16px,3vw,28px)",letterSpacing:"3px",color:"#fff",lineHeight:1,textShadow:"0 2px 8px rgba(0,0,0,.4)"}}>
              {match.homeTeam.name}
            </div>
          </div>

          <div style={{textAlign:"center",minWidth:"100px",padding:"0 8px"}}>
            {(isLive||isFinished)&&h!==null&&a!==null?(
              <>
                <div style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:"clamp(60px,11vw,92px)",
                  letterSpacing:"6px",color:"#fff",lineHeight:1,
                  textShadow:isLive?"0 0 40px rgba(255,100,0,.5)":"0 4px 16px rgba(0,0,0,.4)",
                }}>{h}–{a}</div>
                {isFinished&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".14em",marginTop:"6px"}}>FULL TIME</div>}
              </>
            ):(
              <>
                <div style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:"clamp(34px,6vw,56px)",
                  letterSpacing:"3px",color:"#FF9933",lineHeight:1,
                  textShadow:"0 0 30px rgba(255,153,51,.5)",
                }}>{match.istTime}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".14em",marginTop:"4px"}}>IST TONIGHT</div>
              </>
            )}
          </div>

          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"clamp(64px,11vw,92px)",lineHeight:1,marginBottom:"10px",filter:"drop-shadow(0 8px 20px rgba(0,0,0,.4))"}}>
              {match.awayTeam.flag||"🏳️"}
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(16px,3vw,28px)",letterSpacing:"3px",color:"#fff",lineHeight:1,textShadow:"0 2px 8px rgba(0,0,0,.4)"}}>
              {match.awayTeam.name}
            </div>
          </div>
        </div>

        {(match.venue||match.city)&&(
          <div style={{textAlign:"center",marginTop:"14px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.28)",letterSpacing:".1em"}}>
            📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
          </div>
        )}
      </div>

      {/* Match info */}
      {isUpcoming&&(
        <div style={{position:"relative",zIndex:1,padding:"0 16px 10px"}}>
          <div style={{display:"flex",gap:"8px"}}>
            <MatchInfoPanel match={match}/>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div style={{position:"relative",zIndex:1,padding:"0 16px 18px",display:"flex",gap:"8px"}}>
        {isUpcoming&&(
          <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#FF9933",borderRadius:"10px",padding:"14px",textDecoration:"none",boxShadow:"0 6px 20px rgba(255,153,51,.4)"}}>
            <span style={{fontSize:"15px"}}>⏰</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#000",letterSpacing:".1em"}}>SET ALARM</span>
          </a>
        )}
        <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:copied?"rgba(0,107,60,.2)":"rgba(255,255,255,.08)",border:copied?"1px solid rgba(0,107,60,.4)":"1px solid rgba(255,255,255,.12)",borderRadius:"10px",padding:"14px",cursor:"pointer",transition:"all .15s"}}>
          <span style={{fontSize:"15px"}}>{copied?"✅":"📤"}</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:copied?"#4ade80":"rgba(255,255,255,.7)",letterSpacing:".1em"}}>{copied?"COPIED":"SHARE"}</span>
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",borderRadius:"10px",padding:"14px",textDecoration:"none"}}>
          <span style={{fontSize:"15px"}}>💬</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#25d366",letterSpacing:".1em"}}>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
