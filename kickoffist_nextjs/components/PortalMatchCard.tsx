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
const F=(n:string)=>`https://flagcdn.com/32x24/${FLAG[n]||"un"}.png`;

function gcalUrl(m:Match){
  const p=(s:string)=>s.replace(/[-:]/g,"").replace(/\.\d+/,"");
  const s=p(new Date(m.utcDate).toISOString());
  const e=p(new Date(new Date(m.utcDate).getTime()+7200000).toISOString());
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name}`)}&dates=${s}/${e}&details=${encodeURIComponent(`FIFA WC 2026 · Zee5 India · kickoffist.com`)}`;
}

export default function PortalMatchCard({match,showDate=false}:{match:Match;showDate?:boolean}){
  const [expanded,setExpanded]=useState(false);
  const [showAlarm,setShowAlarm]=useState(false);
  const [showShare,setShowShare]=useState(false);
  const [cd,setCd]=useState("");
  const [copied,setCopied]=useState(false);

  const isLive=match.status==="LIVE",isDone=match.status==="FINISHED",isUp=match.status==="UPCOMING";
  const h=match.score.home,a=match.score.away;
  const hw=isDone&&h!==null&&a!==null&&h>a;
  const aw=isDone&&h!==null&&a!==null&&a>h;
  const dr=isDone&&h===a&&h!==null;
  const isR32=match.group==="R32";

  useEffect(()=>{
    if(!isUp) return;
    const tick=()=>setCd(getCountdown(match.utcDate)??"");
    tick(); const id=setInterval(tick,30000); return()=>clearInterval(id);
  },[match.utcDate,isUp]);

  const hG=match.goals?.filter(g=>g.team===match.homeTeam.name)||[];
  const aG=match.goals?.filter(g=>g.team===match.awayTeam.name)||[];
  const shareTxt=isDone
    ?`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · ${match.istDateLabel} · FIFA WC 2026\n→ kickoffist.com 🇮🇳`
    :`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n📅 ${match.istDateLabel} · ⏰ ${match.istTime} IST\n📺 Zee5 India → kickoffist.com 🇮🇳`;

  const bc=isLive?"#f44336":isDone?"#00c853":"#FF9933";

  return(
    <div className={`mc ${isLive?"mc-live":""} ${isDone?"mc-done":""} ${isUp?"mc-up":""}`}
      style={{borderLeftColor:bc,borderLeftWidth:"3px",borderLeftStyle:"solid"}}>

      {/* MAIN ROW */}
      <div style={{display:"flex",alignItems:"stretch",minHeight:"72px",cursor:(isDone||isLive)?"pointer":"default"}}
        onClick={()=>(isDone||isLive)&&setExpanded(!expanded)}>

        {/* Stage tag */}
        <div style={{width:"64px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"6px",gap:"3px",borderRight:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.2)"}}>
          {isR32
            ?<span className="badge-r32" style={{fontSize:"9px"}}>R32</span>
            :<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"rgba(255,153,51,.7)",letterSpacing:".06em",textAlign:"center"}}>{match.group?.replace("Group ","G")||"WC"}</span>
          }
          {isLive&&<span className="badge-live" style={{fontSize:"9px"}}><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
          {isDone&&<span className="badge-ft">FT</span>}
          {isUp&&showDate&&match.istDateLabel&&<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,153,51,.6)",textAlign:"center",lineHeight:1.2}}>{match.istDateLabel.slice(0,8)}</span>}
        </div>

        {/* Teams + Scores */}
        <div style={{flex:1,minWidth:0,padding:"10px 12px"}}>
          {/* Home */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
            <img src={F(match.homeTeam.name)} alt="" style={{width:"26px",height:"auto",borderRadius:"3px",flexShrink:0}} onError={e=>{e.currentTarget.style.display="none";}}/>
            <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"18px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
              color:hw?"#00e676":dr?"#fff":isDone?"rgba(255,255,255,.4)":"#fff"}}>{match.homeTeam.name}</span>
            {(isLive||isDone)&&h!==null&&<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"30px",letterSpacing:"1px",flexShrink:0,lineHeight:1,color:hw?"#00e676":dr?"#fff":"rgba(255,255,255,.5)"}}>{h}</span>}
          </div>
          {/* Away */}
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <img src={F(match.awayTeam.name)} alt="" style={{width:"26px",height:"auto",borderRadius:"3px",flexShrink:0}} onError={e=>{e.currentTarget.style.display="none";}}/>
            <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"18px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
              color:aw?"#00e676":dr?"#fff":isDone?"rgba(255,255,255,.4)":"#fff"}}>{match.awayTeam.name}</span>
            {(isLive||isDone)&&a!==null&&<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"30px",letterSpacing:"1px",flexShrink:0,lineHeight:1,color:aw?"#00e676":dr?"#fff":"rgba(255,255,255,.5)"}}>{a}</span>}
          </div>
          {(match.venue||match.city)&&<div style={{marginTop:"4px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:500,color:"rgba(255,255,255,.25)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>📍 {[match.venue,match.city].filter(Boolean).join(" · ")}</div>}
        </div>

        {/* Time */}
        <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",padding:"8px 12px",borderLeft:"1px solid rgba(255,255,255,.06)",minWidth:"70px",background:"rgba(0,0,0,.1)"}}>
          {isUp&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"19px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{match.istTime}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,255,255,.35)",marginTop:"1px"}}>IST</div>
              {match.istDateLabel&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,153,51,.55)",marginTop:"2px"}}>{match.istDateLabel.slice(0,8)}</div>}
              {cd&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",color:"rgba(255,255,255,.25)",marginTop:"1px"}}>{cd}</div>}
            </div>
          )}
          {isLive&&(
            <div style={{textAlign:"right"}}>
              <div style={{display:"flex",alignItems:"center",gap:"4px",justifyContent:"flex-end",marginBottom:"3px"}}><span className="live-dot" style={{width:"5px",height:"5px"}}/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"#ff6b6b"}}>LIVE</span></div>
              {match.minute&&<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"1px",color:"#ff6b6b",lineHeight:1}}>{match.minute}&apos;</div>}
            </div>
          )}
          {isDone&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",color:"rgba(255,255,255,.3)"}}>{match.istTime}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,255,255,.2)"}}>IST</div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,.2)",marginTop:"3px"}}>{expanded?"▲":"▼"}</div>
            </div>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      {(isUp||isDone)&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"7px 10px",display:"flex",gap:"5px",background:"rgba(0,0,0,.15)"}}>
          {isUp&&<>
            <button onClick={()=>setShowAlarm(!showAlarm)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(255,153,51,.1)",border:"1px solid rgba(255,153,51,.2)",borderRadius:"6px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"11px"}}>⏰</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".06em"}}>ALARM</span>
            </button>
            <MatchInfoPanel match={match}/>
          </>}
          {isDone&&(
            <button onClick={()=>setExpanded(!expanded)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(0,200,83,.08)",border:"1px solid rgba(0,200,83,.15)",borderRadius:"6px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"11px"}}>⚽</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#00e676",letterSpacing:".06em"}}>GOALS</span>
            </button>
          )}
          <button onClick={()=>setShowShare(!showShare)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"4px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"6px",padding:"7px",cursor:"pointer"}}>
            <span style={{fontSize:"11px"}}>📤</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".06em"}}>SHARE</span>
          </button>
        </div>
      )}

      {/* ALARM */}
      {showAlarm&&isUp&&(
        <div style={{borderTop:"1px solid rgba(255,153,51,.15)",background:"rgba(255,153,51,.05)",padding:"12px 14px"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".12em",marginBottom:"8px"}}>⏰ NEVER MISS THIS MATCH</div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"8px",padding:"10px 12px",textDecoration:"none"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>📅</span>
              <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#fff"}}>Google Calendar</div><div style={{fontSize:"10px",color:"rgba(255,255,255,.4)"}}>Set reminder before kickoff</div></div>
              <span style={{marginLeft:"auto",color:"rgba(255,255,255,.3)"}}>→</span>
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n📅 ${match.istDateLabel} · ⏰ ${match.istTime} IST\n📺 Zee5 India\n→ kickoffist.com 🇮🇳`)}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(37,211,102,.06)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"8px",padding:"10px 12px",textDecoration:"none"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>💬</span>
              <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#25d366"}}>WhatsApp</div><div style={{fontSize:"10px",color:"rgba(255,255,255,.4)"}}>Share with your squad</div></div>
              <span style={{marginLeft:"auto",color:"rgba(37,211,102,.3)"}}>→</span>
            </a>
          </div>
        </div>
      )}

      {/* SHARE */}
      {showShare&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.2)",padding:"12px 14px"}}>
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)",borderRadius:"6px",padding:"10px 12px",marginBottom:"8px",fontSize:"12px",color:"rgba(255,255,255,.65)",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{shareTxt}</div>
          <div style={{display:"flex",gap:"6px"}}>
            <button onClick={()=>{navigator.clipboard.writeText(shareTxt).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,padding:"8px",background:copied?"rgba(0,200,83,.1)":"rgba(255,153,51,.1)",border:copied?"1px solid rgba(0,200,83,.3)":"1px solid rgba(255,153,51,.25)",borderRadius:"6px",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:copied?"#00e676":"#FF9933",letterSpacing:".06em",transition:"all .15s"}}>
              {copied?"✅ COPIED":"📋 COPY"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareTxt)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:"8px",background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#25d366",letterSpacing:".06em",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
              💬 WHATSAPP
            </a>
          </div>
        </div>
      )}

      {/* GOALS */}
      {expanded&&(isDone||isLive)&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.25)",padding:"12px 14px"}}>
          {(hG.length>0||aG.length>0)?(
            <div style={{display:"flex",gap:"12px"}}>
              <div style={{flex:1}}>{hG.map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px"}}><span style={{fontSize:"12px"}}>⚽</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"rgba(255,255,255,.85)"}}>{g.player}</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",color:"rgba(255,255,255,.3)"}}>{g.minute}&apos;</span></div>)}</div>
              <div style={{flex:1,textAlign:"right"}}>{aG.map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px",justifyContent:"flex-end"}}><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",color:"rgba(255,255,255,.3)"}}>{g.minute}&apos;</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"rgba(255,255,255,.85)"}}>{g.player}</span><span style={{fontSize:"12px"}}>⚽</span></div>)}</div>
            </div>
          ):<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.25)",textAlign:"center"}}>GOALSCORER DATA UNAVAILABLE</div>}
        </div>
      )}
    </div>
  );
}
