"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";
import MatchInfoPanel from "@/components/MatchInfoPanel";

function flagUrl(name:string){
  const c:Record<string,string>={
    "Argentina":"ar","Brazil":"br","France":"fr","England":"gb-eng","Germany":"de",
    "Spain":"es","Portugal":"pt","Netherlands":"nl","Norway":"no","USA":"us",
    "Mexico":"mx","Japan":"jp","Morocco":"ma","Colombia":"co","Croatia":"hr",
    "Egypt":"eg","Belgium":"be","Switzerland":"ch","Canada":"ca","Sweden":"se",
    "South Africa":"za","Ecuador":"ec","Ivory Coast":"ci","Senegal":"sn",
    "Bosnia & Herz.":"ba","Bosnia":"ba","Australia":"au","Uruguay":"uy","Austria":"at",
    "Algeria":"dz","DR Congo":"cd","Cape Verde":"cv","Cabo Verde":"cv","South Korea":"kr",
    "Ghana":"gh","Panama":"pa","Iraq":"iq","Tunisia":"tn","Paraguay":"py","Turkey":"tr",
    "Curaçao":"cw","Scotland":"gb-sct","Haiti":"ht","Qatar":"qa","Jordan":"jo",
    "Saudi Arabia":"sa","Iran":"ir","New Zealand":"nz","Uzbekistan":"uz",
  };
  return `https://flagcdn.com/80x60/${c[name]||"un"}.png`;
}

function gcalUrl(m:Match){
  const p=(s:string)=>s.replace(/[-:]/g,"").replace(/\.\d+/,"");
  const s=p(new Date(m.utcDate).toISOString());
  const e=p(new Date(new Date(m.utcDate).getTime()+7200000).toISOString());
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name} — WC 2026 R32`)}&dates=${s}/${e}&details=${encodeURIComponent(`FIFA WC 2026 Round of 32\nWatch on Zee5 India\nkickoffist.com 🇮🇳`)}`;
}

export default function HeroMatch({match,played,total}:{match:Match;played:number;total:number}){
  const [countdown,setCountdown]=useState("");
  const [copied,setCopied]=useState(false);
  const isLive=match.status==="LIVE",isFinished=match.status==="FINISHED",isUpcoming=match.status==="UPCOMING";
  const h=match.score.home,a=match.score.away;

  useEffect(()=>{
    if(!isUpcoming) return;
    const tick=()=>setCountdown(getCountdown(match.utcDate)??"");
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[match.utcDate,isUpcoming]);

  const shareText=isUpcoming
    ?`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n📅 ${match.istDateLabel} · 🕐 ${match.istTime} IST\n📺 Zee5 India · kickoffist.com 🇮🇳`
    :`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · FIFA WC 2026 Round of 32\n→ kickoffist.com 🇮🇳`;

  const isR32=match.group==="R32";

  return(
    <div style={{
      position:"relative",overflow:"hidden",borderRadius:"12px",marginBottom:"16px",
      background:"linear-gradient(150deg,#1B4332 0%,#2D6A4F 50%,#1a3a28 100%)",
      border:isLive?"2px solid #CC1100":"2px solid rgba(255,153,51,.4)",
      boxShadow:isLive?"0 8px 40px rgba(204,17,0,.3)":"0 8px 40px rgba(0,0,0,.25)",
    }}>
      {/* Pitch watermark */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.03) 0,rgba(255,255,255,.03) 1px,transparent 1px,transparent 44px),repeating-linear-gradient(90deg,rgba(255,255,255,.03) 0,rgba(255,255,255,.03) 1px,transparent 1px,transparent 44px)"}}/>
      <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"min(45vw,260px)",aspectRatio:"1",borderRadius:"50%",border:"1px solid rgba(255,255,255,.06)"}}/>
      {/* Footballer */}
      <div style={{position:"absolute",right:"2%",bottom:0,height:"82%",opacity:.07,pointerEvents:"none",display:"flex",alignItems:"flex-end"}}>
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

      {/* TOP STRIP */}
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 18px",borderBottom:"1px solid rgba(255,255,255,.1)",background:"rgba(0,0,0,.15)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.5)",letterSpacing:".14em"}}>🏆 FIFA WORLD CUP 2026</span>
          <span style={{background:"#FF9933",color:"#000",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,padding:"1px 8px",borderRadius:"3px",letterSpacing:".08em"}}>
            {isR32?"ROUND OF 32":match.group}
          </span>
          {isLive&&(
            <span style={{display:"flex",alignItems:"center",gap:"4px",background:"#CC1100",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,padding:"2px 8px",borderRadius:"3px"}}>
              <span className="live-dot" style={{width:"5px",height:"5px",background:"#fff"}}/>
              {match.minute?`${match.minute}'`:"LIVE"}
            </span>
          )}
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          {[{n:`${played}`,l:"PLAYED"},{n:`${total-played}`,l:"LEFT"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"7px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".1em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MATCH */}
      <div style={{position:"relative",zIndex:1,padding:"28px 20px 20px"}}>
        {match.istDateLabel&&isUpcoming&&(
          <div style={{textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"3px",color:"rgba(255,153,51,.8)",marginBottom:"6px"}}>{match.istDateLabel.toUpperCase()}</div>
        )}
        {countdown&&isUpcoming&&(
          <div style={{textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,color:"rgba(255,255,255,.5)",letterSpacing:".18em",marginBottom:"18px"}}>⏱ KICKS OFF IN {countdown.toUpperCase()}</div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"10px",alignItems:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
              <img src={flagUrl(match.homeTeam.name)} alt={match.homeTeam.name}
                style={{width:"clamp(60px,10vw,88px)",height:"auto",borderRadius:"6px",border:"2px solid rgba(255,255,255,.2)",boxShadow:"0 6px 20px rgba(0,0,0,.4)"}}
                onError={e=>{e.currentTarget.style.display="none";}}/>
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(16px,3.5vw,26px)",letterSpacing:"3px",color:"#fff",lineHeight:1}}>{match.homeTeam.name}</div>
          </div>

          <div style={{textAlign:"center",minWidth:"90px",padding:"0 6px"}}>
            {(isLive||isFinished)&&h!==null&&a!==null?(
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(52px,10vw,84px)",letterSpacing:"6px",color:"#fff",lineHeight:1,textShadow:"0 4px 20px rgba(0,0,0,.4)"}}>{h}–{a}</div>
                {isFinished&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.5)",letterSpacing:".14em",marginTop:"5px"}}>FULL TIME</div>}
              </>
            ):(
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(30px,6vw,52px)",letterSpacing:"3px",color:"#FF9933",lineHeight:1,textShadow:"0 0 30px rgba(255,153,51,.4)"}}>{match.istTime}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.5)",letterSpacing:".12em",marginTop:"3px"}}>IST</div>
              </>
            )}
          </div>

          <div style={{textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
              <img src={flagUrl(match.awayTeam.name)} alt={match.awayTeam.name}
                style={{width:"clamp(60px,10vw,88px)",height:"auto",borderRadius:"6px",border:"2px solid rgba(255,255,255,.2)",boxShadow:"0 6px 20px rgba(0,0,0,.4)"}}
                onError={e=>{e.currentTarget.style.display="none";}}/>
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(16px,3.5vw,26px)",letterSpacing:"3px",color:"#fff",lineHeight:1}}>{match.awayTeam.name}</div>
          </div>
        </div>

        {(match.venue||match.city)&&(
          <div style={{textAlign:"center",marginTop:"12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.35)",letterSpacing:".08em"}}>
            📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
          </div>
        )}
      </div>

      {isUpcoming&&<div style={{position:"relative",zIndex:1,padding:"0 16px 10px"}}><div style={{display:"flex",gap:"8px"}}><MatchInfoPanel match={match}/></div></div>}

      {/* BUTTONS */}
      <div style={{position:"relative",zIndex:1,padding:"0 16px 16px",display:"flex",gap:"8px"}}>
        {isUpcoming&&(
          <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#FF9933",borderRadius:"8px",padding:"13px",textDecoration:"none",boxShadow:"0 4px 16px rgba(255,153,51,.4)"}}>
            <span style={{fontSize:"14px"}}>⏰</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#000",letterSpacing:".1em"}}>SET ALARM</span>
          </a>
        )}
        <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:copied?"rgba(255,255,255,.15)":"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",borderRadius:"8px",padding:"13px",cursor:"pointer",transition:"all .15s"}}>
          <span style={{fontSize:"14px"}}>{copied?"✅":"📤"}</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:copied?"#FF9933":"rgba(255,255,255,.8)",letterSpacing:".1em"}}>{copied?"COPIED":"SHARE"}</span>
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(37,211,102,.15)",border:"1px solid rgba(37,211,102,.3)",borderRadius:"8px",padding:"13px",textDecoration:"none"}}>
          <span style={{fontSize:"14px"}}>💬</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#25d366",letterSpacing:".1em"}}>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
