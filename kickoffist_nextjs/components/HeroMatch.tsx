"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";
import MatchInfoPanel from "@/components/MatchInfoPanel";

const FLAG:Record<string,string>={
  "Argentina":"ar","Brazil":"br","France":"fr","England":"gb-eng","Germany":"de",
  "Spain":"es","Portugal":"pt","Netherlands":"nl","Norway":"no","USA":"us",
  "Mexico":"mx","Japan":"jp","Morocco":"ma","Colombia":"co","Croatia":"hr",
  "Egypt":"eg","Belgium":"be","Switzerland":"ch","Canada":"ca","Sweden":"se",
  "South Africa":"za","Ecuador":"ec","Ivory Coast":"ci","Senegal":"sn",
  "Bosnia & Herz.":"ba","Australia":"au","Uruguay":"uy","Austria":"at",
  "Algeria":"dz","DR Congo":"cd","Cape Verde":"cv","Cabo Verde":"cv",
  "South Korea":"kr","Ghana":"gh","Panama":"pa","Iraq":"iq","Tunisia":"tn",
  "Paraguay":"py","Turkey":"tr","Scotland":"gb-sct","Haiti":"ht",
  "Qatar":"qa","Jordan":"jo","Saudi Arabia":"sa","Iran":"ir",
  "New Zealand":"nz","Uzbekistan":"uz","Curaçao":"cw",
};
const F=(n:string)=>`https://flagcdn.com/96x72/${FLAG[n]||"un"}.png`;

function gcalUrl(m:Match){
  const p=(s:string)=>s.replace(/[-:]/g,"").replace(/\.\d+/,"");
  const s=p(new Date(m.utcDate).toISOString());
  const e=p(new Date(new Date(m.utcDate).getTime()+7200000).toISOString());
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name} — WC 2026`)}&dates=${s}/${e}&details=${encodeURIComponent(`FIFA World Cup 2026\nWatch on Zee5 India\nkickoffist.com 🇮🇳`)}`;
}

export default function HeroMatch({match,played,total}:{match:Match;played:number;total:number}){
  const [cd,setCd]=useState("");
  const [copied,setCopied]=useState(false);
  const isLive=match.status==="LIVE",isDone=match.status==="FINISHED",isUp=match.status==="UPCOMING";
  const h=match.score.home,a=match.score.away;
  const isR32=match.group==="R32";

  useEffect(()=>{
    if(!isUp) return;
    const tick=()=>setCd(getCountdown(match.utcDate)??"");
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[match.utcDate,isUp]);

  const shareText=isUp
    ?`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n📅 ${match.istDateLabel} · ⏰ ${match.istTime} IST\n📺 Zee5 India · kickoffist.com 🇮🇳`
    :`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · FIFA WC 2026\n→ kickoffist.com 🇮🇳`;

  return(
    <div style={{
      position:"relative",overflow:"hidden",
      borderRadius:"16px",marginBottom:"16px",
      background:isLive
        ?"linear-gradient(150deg,#1a0505 0%,#2a0a0a 50%,#1a0505 100%)"
        :"linear-gradient(150deg,#051428 0%,#0a2040 40%,#051428 100%)",
      border:isLive?"2px solid rgba(244,67,54,.5)":"2px solid rgba(255,153,51,.3)",
      boxShadow:isLive?"0 0 60px rgba(244,67,54,.2)":"0 0 60px rgba(255,153,51,.1)",
    }}>
      {/* Pitch lines */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.02) 0,rgba(255,255,255,.02) 1px,transparent 1px,transparent 44px),repeating-linear-gradient(90deg,rgba(255,255,255,.02) 0,rgba(255,255,255,.02) 1px,transparent 1px,transparent 44px)"}}/>
      <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"min(45vw,280px)",aspectRatio:"1",borderRadius:"50%",border:"1px solid rgba(255,255,255,.05)"}}/>
      <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:"1px",background:"rgba(255,255,255,.04)"}}/>
      {/* Glow */}
      <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"80%",height:"60%",background:`radial-gradient(ellipse at 50% 0%,${isLive?"rgba(244,67,54,.08)":"rgba(255,153,51,.07)"} 0%,transparent 70%)`}}/>
      {/* Footballer */}
      <div style={{position:"absolute",right:"1%",bottom:0,height:"85%",opacity:.06,pointerEvents:"none",display:"flex",alignItems:"flex-end"}}>
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

      {/* TOP BAR */}
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 18px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".14em"}}>🏆 FIFA WORLD CUP 2026</span>
          <span className={isR32?"badge-r32":"badge-up"} style={{fontSize:"10px"}}>{isR32?"ROUND OF 32":match.group}</span>
          {isLive&&<span className="badge-live"><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
        </div>
        <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
          {[{n:`${played}`,l:"PLAYED"},{n:`${total-played}`,l:"LEFT"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,255,255,.35)",letterSpacing:".1em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MATCH — flags, score, time */}
      <div style={{position:"relative",zIndex:1,padding:"28px 18px 20px"}}>
        {isUp&&match.istDateLabel&&(
          <div style={{textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:"14px",letterSpacing:"3px",color:"rgba(255,153,51,.7)",marginBottom:"4px"}}>{match.istDateLabel.toUpperCase()}</div>
        )}
        {isUp&&cd&&(
          <div style={{textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:".18em",marginBottom:"18px"}}>KICKS OFF IN {cd.toUpperCase()}</div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
              <img src={F(match.homeTeam.name)} alt={match.homeTeam.name}
                style={{width:"clamp(60px,11vw,92px)",height:"auto",borderRadius:"8px",border:"2px solid rgba(255,255,255,.15)",boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}
                onError={e=>{e.currentTarget.style.display="none";}}/>
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(15px,3vw,26px)",letterSpacing:"2px",color:"#fff",lineHeight:1}}>{match.homeTeam.name}</div>
          </div>

          <div style={{textAlign:"center",minWidth:"clamp(80px,14vw,120px)"}}>
            {(isLive||isDone)&&h!==null&&a!==null?(
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(50px,10vw,88px)",letterSpacing:"4px",color:"#fff",lineHeight:1,textShadow:"0 4px 20px rgba(0,0,0,.5)"}}>{h}–{a}</div>
                {isDone&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:".14em",marginTop:"5px"}}>FULL TIME</div>}
              </>
            ):(
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,5.5vw,52px)",letterSpacing:"2px",color:"#FF9933",lineHeight:1,textShadow:"0 0 30px rgba(255,153,51,.5)"}}>{match.istTime}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:".14em",marginTop:"3px"}}>IST</div>
              </>
            )}
          </div>

          <div style={{textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
              <img src={F(match.awayTeam.name)} alt={match.awayTeam.name}
                style={{width:"clamp(60px,11vw,92px)",height:"auto",borderRadius:"8px",border:"2px solid rgba(255,255,255,.15)",boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}
                onError={e=>{e.currentTarget.style.display="none";}}/>
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(15px,3vw,26px)",letterSpacing:"2px",color:"#fff",lineHeight:1}}>{match.awayTeam.name}</div>
          </div>
        </div>

        {(match.venue||match.city)&&(
          <div style={{textAlign:"center",marginTop:"12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.3)",letterSpacing:".08em"}}>
            📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
          </div>
        )}
      </div>

      {isUp&&<div style={{position:"relative",zIndex:1,padding:"0 16px 8px"}}><div style={{display:"flex",gap:"8px"}}><MatchInfoPanel match={match}/></div></div>}

      {/* BUTTONS */}
      <div style={{position:"relative",zIndex:1,padding:"0 16px 16px",display:"flex",gap:"8px"}}>
        {isUp&&(
          <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#FF9933",borderRadius:"10px",padding:"13px",textDecoration:"none",boxShadow:"0 4px 20px rgba(255,153,51,.4)"}}>
            <span>⏰</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#000",letterSpacing:".08em"}}>SET ALARM</span>
          </a>
        )}
        <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:copied?"rgba(0,200,83,.15)":"rgba(255,255,255,.07)",border:copied?"1px solid rgba(0,200,83,.3)":"1px solid rgba(255,255,255,.1)",borderRadius:"10px",padding:"13px",cursor:"pointer",transition:"all .15s"}}>
          <span>{copied?"✅":"📤"}</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:copied?"#00e676":"rgba(255,255,255,.7)",letterSpacing:".08em"}}>{copied?"COPIED":"SHARE"}</span>
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",borderRadius:"10px",padding:"13px",textDecoration:"none"}}>
          <span>💬</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#25d366",letterSpacing:".08em"}}>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
