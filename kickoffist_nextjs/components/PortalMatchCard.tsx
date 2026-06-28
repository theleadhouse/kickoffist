"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";
import MatchInfoPanel from "@/components/MatchInfoPanel";

function flagUrl(name:string):string {
  const codes:Record<string,string>={
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
  const code=codes[name]||"un";
  return `https://flagcdn.com/32x24/${code}.png`;
}

function gcalUrl(m:Match){const p=(s:string)=>s.replace(/[-:]/g,"").replace(/\.\d+/,"");const s=p(new Date(m.utcDate).toISOString());const e=p(new Date(new Date(m.utcDate).getTime()+7200000).toISOString());return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`⚽ ${m.homeTeam.name} vs ${m.awayTeam.name}`)}&dates=${s}/${e}&details=${encodeURIComponent(`FIFA WC 2026 · Zee5 India · kickoffist.com`)}`;}

export default function PortalMatchCard({ match, showDate=false }:{match:Match;showDate?:boolean}) {
  const [expanded,setExpanded]=useState(false);
  const [showAlarm,setShowAlarm]=useState(false);
  const [showShare,setShowShare]=useState(false);
  const [countdown,setCountdown]=useState("");
  const [copied,setCopied]=useState(false);

  const isLive=match.status==="LIVE",isFinished=match.status==="FINISHED",isUpcoming=match.status==="UPCOMING";
  const h=match.score.home,a=match.score.away;
  const homeWin=isFinished&&h!==null&&a!==null&&h>a;
  const awayWin=isFinished&&h!==null&&a!==null&&a>h;
  const isDraw=isFinished&&h===a&&h!==null;
  const isR32=match.group==="R32";

  useEffect(()=>{
    if(!isUpcoming) return;
    const tick=()=>setCountdown(getCountdown(match.utcDate)??"");
    tick(); const id=setInterval(tick,30000); return()=>clearInterval(id);
  },[match.utcDate,isUpcoming]);

  const hGoals=match.goals?.filter(g=>g.team===match.homeTeam.name)||[];
  const aGoals=match.goals?.filter(g=>g.team===match.awayTeam.name)||[];
  const shareText=isFinished
    ?`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · FIFA WC 2026\n→ kickoffist.com 🇮🇳`
    :`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST · ${match.istDateLabel}\n📺 Zee5 India → kickoffist.com 🇮🇳`;

  return (
    <div className={`mc ${isLive?"mc-live":""} ${isFinished?"mc-done":""} ${isUpcoming?"mc-up":""}`}>
      <div
        style={{display:"flex",alignItems:"stretch",minHeight:"76px",cursor:(isFinished||isLive)?"pointer":"default"}}
        onClick={()=>(isFinished||isLive)&&setExpanded(!expanded)}
      >
        {/* Stage */}
        <div style={{width:"72px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 6px",gap:"4px",borderRight:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.2)"}}>
          <span className={isR32?"badge-r32":"badge-grp"}>{isR32?"R32":match.group?.replace("Group ","Grp ")||"WC"}</span>
          {isLive&&<span className="badge-live" style={{fontSize:"10px"}}><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
          {isFinished&&<span className="badge-ft">FT</span>}
          {isUpcoming&&showDate&&match.istDateLabel&&<span className="badge-up" style={{fontSize:"9px"}}>{match.istDateLabel.slice(0,6)}</span>}
        </div>

        {/* Teams */}
        <div style={{flex:1,minWidth:0,padding:"12px 14px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"9px"}}>
            <img src={flagUrl(match.homeTeam.name)} alt={match.homeTeam.name} style={{width:"28px",height:"auto",borderRadius:"3px",flexShrink:0}} onError={e=>{e.currentTarget.style.display="none";}}/>
            <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"19px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".02em",
              color:homeWin?"#4ade80":isDraw?"#fff":isFinished?"rgba(255,255,255,.4)":"#fff"
            }}>{match.homeTeam.name}</span>
            {(isLive||isFinished)&&h!==null&&<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"34px",letterSpacing:"2px",flexShrink:0,lineHeight:1,color:homeWin?"#4ade80":isDraw?"#fff":"rgba(255,255,255,.5)"}}>{h}</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <img src={flagUrl(match.awayTeam.name)} alt={match.awayTeam.name} style={{width:"28px",height:"auto",borderRadius:"3px",flexShrink:0}} onError={e=>{e.currentTarget.style.display="none";}}/>
            <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"19px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",letterSpacing:".02em",
              color:awayWin?"#4ade80":isDraw?"#fff":isFinished?"rgba(255,255,255,.4)":"#fff"
            }}>{match.awayTeam.name}</span>
            {(isLive||isFinished)&&a!==null&&<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"34px",letterSpacing:"2px",flexShrink:0,lineHeight:1,color:awayWin?"#4ade80":isDraw?"#fff":"rgba(255,255,255,.5)"}}>{a}</span>}
          </div>
          {(match.venue||match.city)&&<div style={{marginTop:"5px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,.25)",letterSpacing:".04em",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>📍 {[match.venue,match.city].filter(Boolean).join(" · ")}</div>}
        </div>

        {/* Time */}
        <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",padding:"10px 14px",borderLeft:"1px solid rgba(255,255,255,.06)",minWidth:"72px",background:"rgba(0,0,0,.1)"}}>
          {isUpcoming&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{match.istTime}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.3)",marginTop:"1px",letterSpacing:".06em"}}>IST</div>
              {match.istDateLabel&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:600,color:"rgba(255,153,51,.5)",marginTop:"2px"}}>{match.istDateLabel.slice(0,8)}</div>}
              {countdown&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:600,color:"rgba(255,255,255,.25)",marginTop:"1px"}}>{countdown}</div>}
            </div>
          )}
          {isLive&&(
            <div style={{textAlign:"right"}}>
              <div style={{display:"flex",alignItems:"center",gap:"4px",justifyContent:"flex-end",marginBottom:"4px"}}><span className="live-dot" style={{width:"6px",height:"6px"}}/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#f87171",letterSpacing:".08em"}}>LIVE</span></div>
              {match.minute&&<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",letterSpacing:"1px",color:"#f87171",lineHeight:1}}>{match.minute}&apos;</div>}
            </div>
          )}
          {isFinished&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"1px",color:"rgba(255,255,255,.3)"}}>{match.istTime}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.2)",letterSpacing:".06em"}}>IST</div>
              <div style={{fontSize:"11px",color:"rgba(255,255,255,.25)",marginTop:"4px"}}>{expanded?"▲":"▼"}</div>
            </div>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      {(isUpcoming||isFinished)&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",padding:"8px 12px",display:"flex",gap:"6px",background:"rgba(0,0,0,.15)"}}>
          {isUpcoming&&<>
            <button onClick={()=>setShowAlarm(!showAlarm)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(255,153,51,.1)",border:"1px solid rgba(255,153,51,.2)",borderRadius:"8px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"12px"}}>⏰</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".08em"}}>ALARM</span>
            </button>
            <MatchInfoPanel match={match}/>
          </>}
          {isFinished&&(
            <button onClick={()=>setExpanded(!expanded)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(34,197,94,.07)",border:"1px solid rgba(34,197,94,.15)",borderRadius:"8px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"12px"}}>⚽</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#4ade80",letterSpacing:".08em"}}>GOALS</span>
            </button>
          )}
          <button onClick={()=>setShowShare(!showShare)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"8px",padding:"7px",cursor:"pointer"}}>
            <span style={{fontSize:"12px"}}>📤</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.45)",letterSpacing:".08em"}}>SHARE</span>
          </button>
        </div>
      )}

      {/* ALARM */}
      {showAlarm&&isUpcoming&&(
        <div style={{borderTop:"1px solid rgba(255,153,51,.15)",background:"rgba(255,153,51,.04)",padding:"12px 14px"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".12em",marginBottom:"10px"}}>⏰ SET YOUR ALARM</div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"8px",padding:"10px 12px",textDecoration:"none"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>📅</span>
              <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#fff",letterSpacing:".04em"}}>Google Calendar</div><div style={{fontSize:"10px",color:"rgba(255,255,255,.4)"}}>Match day reminder</div></div>
              <span style={{marginLeft:"auto",color:"rgba(255,255,255,.3)"}}>→</span>
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST · ${match.istDateLabel}\n📺 Zee5 India\n→ kickoffist.com 🇮🇳`)}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(37,211,102,.06)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"8px",padding:"10px 12px",textDecoration:"none"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>💬</span>
              <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#25d366",letterSpacing:".04em"}}>WhatsApp Reminder</div><div style={{fontSize:"10px",color:"rgba(255,255,255,.4)"}}>Share with yourself or friends</div></div>
              <span style={{marginLeft:"auto",color:"rgba(37,211,102,.3)"}}>→</span>
            </a>
          </div>
        </div>
      )}

      {/* SHARE */}
      {showShare&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.2)",padding:"12px 14px"}}>
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.06)",borderRadius:"7px",padding:"10px 12px",marginBottom:"8px",fontSize:"12px",color:"rgba(255,255,255,.65)",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{shareText}</div>
          <div style={{display:"flex",gap:"7px"}}>
            <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,padding:"9px",background:copied?"rgba(34,197,94,.1)":"rgba(255,153,51,.1)",border:copied?"1px solid rgba(34,197,94,.3)":"1px solid rgba(255,153,51,.25)",borderRadius:"7px",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:copied?"#4ade80":"#FF9933",letterSpacing:".08em",transition:"all .15s"}}>
              {copied?"✅ COPIED":"📋 COPY"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:"9px",background:"rgba(37,211,102,.07)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"7px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#25d366",letterSpacing:".08em",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
              💬 WHATSAPP
            </a>
          </div>
        </div>
      )}

      {/* GOALS */}
      {expanded&&(isFinished||isLive)&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.06)",background:"rgba(0,0,0,.25)",padding:"12px 16px"}}>
          {(hGoals.length>0||aGoals.length>0)?(
            <div style={{display:"flex",gap:"12px"}}>
              <div style={{flex:1}}>{hGoals.map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px"}}><span style={{fontSize:"12px"}}>⚽</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"rgba(255,255,255,.85)"}}>{g.player}</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",color:"rgba(255,255,255,.3)"}}>{g.minute}&apos;</span></div>)}</div>
              <div style={{flex:1,textAlign:"right"}}>{aGoals.map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px",justifyContent:"flex-end"}}><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",color:"rgba(255,255,255,.3)"}}>{g.minute}&apos;</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"rgba(255,255,255,.85)"}}>{g.player}</span><span style={{fontSize:"12px"}}>⚽</span></div>)}</div>
            </div>
          ):<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.25)",textAlign:"center",letterSpacing:".06em"}}>GOALSCORER DATA UNAVAILABLE</div>}
        </div>
      )}
    </div>
  );
}
