"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";
import MatchInfoPanel from "@/components/MatchInfoPanel";

const FLAGS:Record<string,string>={
  "Argentina":"ar","Brazil":"br","France":"fr","England":"gb-eng","Germany":"de",
  "Spain":"es","Portugal":"pt","Netherlands":"nl","Norway":"no","USA":"us",
  "Mexico":"mx","Japan":"jp","Morocco":"ma","Colombia":"co","Croatia":"hr",
  "Egypt":"eg","Belgium":"be","Switzerland":"ch","Canada":"ca","Sweden":"se",
  "South Africa":"za","Ecuador":"ec","Ivory Coast":"ci","Senegal":"sn",
  "Bosnia & Herz.":"ba","Australia":"au","Uruguay":"uy","Austria":"at",
  "Algeria":"dz","DR Congo":"cd","Cape Verde":"cv","Cabo Verde":"cv",
  "South Korea":"kr","Ghana":"gh","Paraguay":"py","Turkey":"tr",
  "Scotland":"gb-sct","Haiti":"ht","Qatar":"qa","Jordan":"jo",
  "Saudi Arabia":"sa","Iran":"ir","New Zealand":"nz","Uzbekistan":"uz","Curaçao":"cw",
};
const F=(n:string)=>`https://flagcdn.com/96x72/${FLAGS[n]||"un"}.png`;
function gcal(m:Match){const p=(s:string)=>s.replace(/[-:]/g,"").replace(/\.\d+/,"");const s=p(new Date(m.utcDate).toISOString());const e=p(new Date(new Date(m.utcDate).getTime()+7200000).toISOString());return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name} — WC 2026 R32`)}&dates=${s}/${e}&details=${encodeURIComponent(`FIFA World Cup 2026\nWatch on Zee5 India\nkickoffist.com 🇮🇳`)}`;}

export default function HeroMatch({match,played,total}:{match:Match;played:number;total:number}){
  const [cd,setCd]=useState("");
  const [copied,setCopied]=useState(false);
  const isLive=match.status==="LIVE",isDone=match.status==="FINISHED",isUp=match.status==="UPCOMING";
  const h=match.score.home,a=match.score.away;
  const isR32=match.group==="R32",isR16=match.group==="R16";

  useEffect(()=>{
    if(!isUp) return;
    const tick=()=>setCd(getCountdown(match.utcDate)??"");
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[match.utcDate,isUp]);

  const shareText=isUp
    ?`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n📅 ${match.istDateLabel} · ⏰ ${match.istTime} IST\n📺 Zee5 India · kickoffist.com 🇮🇳`
    :`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · FIFA WC 2026 · kickoffist.com 🇮🇳`;

  return(
    <div style={{position:"relative",overflow:"hidden",borderRadius:"16px",marginBottom:"16px",background:"linear-gradient(150deg,#0d1f10 0%,#0a1a0c 50%,#080f09 100%)",border:isLive?"2px solid rgba(232,0,45,.5)":"2px solid rgba(0,166,81,.3)",boxShadow:isLive?"0 0 60px rgba(232,0,45,.15)":"0 0 40px rgba(0,166,81,.08)"}}>
      {/* Pitch lines */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 60px)"}}/>
      <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"min(50vw,300px)",aspectRatio:"1",borderRadius:"50%",border:"1px solid rgba(255,255,255,.06)"}}/>
      <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:"1px",background:"rgba(255,255,255,.05)"}}/>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(0,166,81,.06) 0%,transparent 60%)"}}/>
      {/* Footballer silhouette */}
      <div style={{position:"absolute",right:"1%",bottom:0,height:"85%",opacity:.05,pointerEvents:"none"}}>
        <svg viewBox="0 0 180 380" height="100%" fill="white"><circle cx="90" cy="38" r="28"/><path d="M62 66 Q50 105 48 148 L76 152 L80 210 L90 206 L100 210 L104 152 L132 148 Q130 105 118 66 Z"/><path d="M62 82 Q35 58 14 38 Q9 32 16 27 Q42 52 68 80"/><circle cx="10" cy="24" r="13"/><path d="M118 82 Q148 115 158 138 Q162 144 155 147 Q143 124 116 90"/><path d="M80 210 Q68 258 55 298 Q46 318 62 322 Q74 300 86 258 L90 298 Q87 326 102 328 Q112 306 106 270 L100 210 Z"/><path d="M100 210 Q112 258 126 305 Q132 325 148 322 Q140 300 132 255 L136 210 Z"/></svg>
      </div>

      {/* TOP */}
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.35)",letterSpacing:".14em"}}>🏆 FIFA WORLD CUP 2026</span>
          <span className={isR16?"badge-r16":"badge-r32"}>{isR16?"ROUND OF 16":"ROUND OF 32"}</span>
          {isLive&&<span className="badge-live"><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
          {isDone&&<span className="badge-ft">FULL TIME</span>}
        </div>
        <div style={{display:"flex",gap:"12px"}}>
          {[{n:`${played}`,l:"PLAYED"},{n:`${total-played}`,l:"LEFT"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".1em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MATCH */}
      <div style={{position:"relative",zIndex:1,padding:"28px 16px 20px"}}>
        {isUp&&(
          <>
            {match.istDateLabel&&<div style={{textAlign:"center",fontFamily:"'Bebas Neue',sans-serif",fontSize:"14px",letterSpacing:"3px",color:"rgba(0,166,81,.8)",marginBottom:"4px"}}>{match.istDateLabel.toUpperCase()}</div>}
            {cd&&<div style={{textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:".16em",marginBottom:"18px"}}>KICKS OFF IN {cd.toUpperCase()}</div>}
          </>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"8px",alignItems:"center"}}>
          <div style={{textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
              <img src={F(match.homeTeam.name)} alt={match.homeTeam.name} style={{width:"clamp(56px,10vw,88px)",height:"auto",borderRadius:"6px",border:"2px solid rgba(255,255,255,.15)",boxShadow:"0 8px 24px rgba(0,0,0,.5)"}} onError={e=>{e.currentTarget.style.display="none";}}/>
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(14px,3vw,24px)",letterSpacing:"2px",color:"#fff",lineHeight:1}}>{match.homeTeam.name}</div>
          </div>

          <div style={{textAlign:"center",minWidth:"clamp(80px,13vw,110px)"}}>
            {(isLive||isDone)&&h!==null&&a!==null
              ?<><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(48px,9vw,80px)",letterSpacing:"4px",color:"#fff",lineHeight:1,textShadow:"0 4px 20px rgba(0,0,0,.5)"}}>{h}–{a}</div></>
              :<><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(26px,5vw,48px)",letterSpacing:"2px",color:"#00A651",lineHeight:1,textShadow:"0 0 24px rgba(0,166,81,.4)"}}>{match.istTime}</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:".14em",marginTop:"3px"}}>IST</div></>
            }
          </div>

          <div style={{textAlign:"center"}}>
            <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
              <img src={F(match.awayTeam.name)} alt={match.awayTeam.name} style={{width:"clamp(56px,10vw,88px)",height:"auto",borderRadius:"6px",border:"2px solid rgba(255,255,255,.15)",boxShadow:"0 8px 24px rgba(0,0,0,.5)"}} onError={e=>{e.currentTarget.style.display="none";}}/>
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(14px,3vw,24px)",letterSpacing:"2px",color:"#fff",lineHeight:1}}>{match.awayTeam.name}</div>
          </div>
        </div>

        {(match.venue||match.city)&&<div style={{textAlign:"center",marginTop:"12px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.28)",letterSpacing:".08em"}}>📍 {[match.venue,match.city].filter(Boolean).join(" · ")}</div>}
      </div>

      {isUp&&<div style={{position:"relative",zIndex:1,padding:"0 14px 8px"}}><div style={{display:"flex",gap:"8px"}}><MatchInfoPanel match={match}/></div></div>}

      {/* BUTTONS */}
      <div style={{position:"relative",zIndex:1,padding:"0 14px 14px",display:"flex",gap:"7px"}}>
        {isUp&&<a href={gcal(match)} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#FF9933",borderRadius:"10px",padding:"12px",textDecoration:"none",boxShadow:"0 4px 16px rgba(255,153,51,.35)"}}><span>⏰</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#000",letterSpacing:".08em"}}>SET ALARM</span></a>}
        <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:copied?"rgba(0,166,81,.15)":"rgba(255,255,255,.06)",border:copied?"1px solid rgba(0,166,81,.3)":"1px solid rgba(255,255,255,.1)",borderRadius:"10px",padding:"12px",cursor:"pointer",transition:"all .15s"}}>
          <span>{copied?"✅":"📤"}</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:copied?"#00D26A":"rgba(255,255,255,.7)",letterSpacing:".08em"}}>{copied?"COPIED":"SHARE"}</span>
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",borderRadius:"10px",padding:"12px",textDecoration:"none"}}>
          <span>💬</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#25d366",letterSpacing:".08em"}}>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
