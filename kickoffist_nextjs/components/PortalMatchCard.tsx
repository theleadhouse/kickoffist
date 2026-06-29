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
  return `https://flagcdn.com/32x24/${c[name]||"un"}.png`;
}

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
    ?`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · ${match.istDateLabel} · FIFA WC 2026\n→ kickoffist.com 🇮🇳`
    :`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n📅 ${match.istDateLabel} · 🕐 ${match.istTime} IST\n📺 Zee5 India → kickoffist.com 🇮🇳`;

  const lc=isLive?"#CC1100":isFinished?"#1B4332":"#FF9933";

  return(
    <div className={`mc ${isLive?"mc-live":""} ${isFinished?"mc-done":""} ${isUpcoming?"mc-up":""}`}
      style={{borderLeftColor:lc,borderLeftWidth:"4px",borderLeftStyle:"solid"}}>

      {/* MAIN ROW */}
      <div style={{display:"flex",alignItems:"stretch",minHeight:"76px",cursor:(isFinished||isLive)?"pointer":"default",background:"#fff"}}
        onClick={()=>(isFinished||isLive)&&setExpanded(!expanded)}>

        {/* Stage */}
        <div style={{width:"68px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"6px",gap:"4px",borderRight:"1px solid #F0EDE8",background:"#FAFAF7"}}>
          <span className={isR32?"badge-r32":"badge-grp"}>{isR32?"R32":match.group?.replace("Group ","G")||"WC"}</span>
          {isLive&&<span className="badge-live" style={{fontSize:"9px"}}><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
          {isFinished&&<span className="badge-ft">FT</span>}
          {isUpcoming&&showDate&&match.istDateLabel&&<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"#CC7A00",textAlign:"center",lineHeight:1.2}}>{match.istDateLabel.slice(0,8)}</span>}
        </div>

        {/* Teams */}
        <div style={{flex:1,minWidth:0,padding:"11px 14px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
            <img src={flagUrl(match.homeTeam.name)} alt="" style={{width:"26px",height:"auto",borderRadius:"2px",flexShrink:0,border:"1px solid rgba(0,0,0,.08)"}} onError={e=>{e.currentTarget.style.display="none";}}/>
            <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"19px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
              color:homeWin?"#1B4332":isDraw?"#0A0A0A":isFinished?"#AAA":"#0A0A0A"
            }}>{match.homeTeam.name}</span>
            {(isLive||isFinished)&&h!==null&&<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"32px",letterSpacing:"2px",flexShrink:0,lineHeight:1,color:homeWin?"#1B4332":isDraw?"#0A0A0A":"#AAA"}}>{h}</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <img src={flagUrl(match.awayTeam.name)} alt="" style={{width:"26px",height:"auto",borderRadius:"2px",flexShrink:0,border:"1px solid rgba(0,0,0,.08)"}} onError={e=>{e.currentTarget.style.display="none";}}/>
            <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"19px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
              color:awayWin?"#1B4332":isDraw?"#0A0A0A":isFinished?"#AAA":"#0A0A0A"
            }}>{match.awayTeam.name}</span>
            {(isLive||isFinished)&&a!==null&&<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"32px",letterSpacing:"2px",flexShrink:0,lineHeight:1,color:awayWin?"#1B4332":isDraw?"#0A0A0A":"#AAA"}}>{a}</span>}
          </div>
          {(match.venue||match.city)&&<div style={{marginTop:"5px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"#AAA",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>📍 {[match.venue,match.city].filter(Boolean).join(" · ")}</div>}
        </div>

        {/* Time */}
        <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",padding:"10px 14px",borderLeft:"1px solid #F0EDE8",minWidth:"70px",background:"#FAFAF7"}}>
          {isUpcoming&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{match.istTime}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#AAA",marginTop:"1px"}}>IST</div>
              {match.istDateLabel&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#CC7A00",marginTop:"2px"}}>{match.istDateLabel.slice(0,8)}</div>}
              {countdown&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",color:"#CCC",marginTop:"1px"}}>{countdown}</div>}
            </div>
          )}
          {isLive&&(
            <div style={{textAlign:"right"}}>
              <div style={{display:"flex",alignItems:"center",gap:"4px",justifyContent:"flex-end",marginBottom:"4px"}}><span className="live-dot" style={{width:"6px",height:"6px"}}/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#CC1100",letterSpacing:".08em"}}>LIVE</span></div>
              {match.minute&&<div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",letterSpacing:"1px",color:"#CC1100",lineHeight:1}}>{match.minute}&apos;</div>}
            </div>
          )}
          {isFinished&&(
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"1px",color:"#AAA"}}>{match.istTime}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#CCC"}}>IST</div>
              <div style={{fontSize:"12px",color:"#CCC",marginTop:"4px"}}>{expanded?"▲":"▼"}</div>
            </div>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      {(isUpcoming||isFinished)&&(
        <div style={{borderTop:"1px solid #F0EDE8",padding:"7px 10px",display:"flex",gap:"5px",background:"#FAFAF7"}}>
          {isUpcoming&&<>
            <button onClick={()=>setShowAlarm(!showAlarm)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"4px",background:"#FFF3E0",border:"1px solid rgba(255,153,51,.3)",borderRadius:"5px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"12px"}}>⏰</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#CC7A00",letterSpacing:".06em"}}>ALARM</span>
            </button>
            <MatchInfoPanel match={match}/>
          </>}
          {isFinished&&(
            <button onClick={()=>setExpanded(!expanded)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"4px",background:"#E8F5EE",border:"1px solid rgba(27,67,50,.15)",borderRadius:"5px",padding:"7px",cursor:"pointer"}}>
              <span style={{fontSize:"12px"}}>⚽</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#1B4332",letterSpacing:".06em"}}>GOALS</span>
            </button>
          )}
          <button onClick={()=>setShowShare(!showShare)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"4px",background:"#fff",border:"1px solid #E5DDD5",borderRadius:"5px",padding:"7px",cursor:"pointer"}}>
            <span style={{fontSize:"12px"}}>📤</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#888",letterSpacing:".06em"}}>SHARE</span>
          </button>
        </div>
      )}

      {/* ALARM */}
      {showAlarm&&isUpcoming&&(
        <div style={{borderTop:"1px solid #FFE8CC",background:"#FFFAF5",padding:"12px 14px"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#CC7A00",letterSpacing:".12em",marginBottom:"8px"}}>⏰ NEVER MISS THIS MATCH</div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"#fff",border:"1px solid #E5DDD5",borderRadius:"7px",padding:"10px 12px",textDecoration:"none",boxShadow:"0 1px 4px rgba(0,0,0,.06)"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>📅</span>
              <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#0A0A0A"}}>Google Calendar</div><div style={{fontSize:"10px",color:"#999"}}>Match day reminder</div></div>
              <span style={{marginLeft:"auto",color:"#CCC"}}>→</span>
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(`⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n📅 ${match.istDateLabel} · 🕐 ${match.istTime} IST\n📺 Zee5 India\n→ kickoffist.com 🇮🇳`)}`} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:"10px",background:"rgba(37,211,102,.06)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"7px",padding:"10px 12px",textDecoration:"none"}}>
              <span style={{fontSize:"18px",flexShrink:0}}>💬</span>
              <div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#1a7a3a"}}>WhatsApp</div><div style={{fontSize:"10px",color:"#999"}}>Share with friends</div></div>
              <span style={{marginLeft:"auto",color:"#25d366"}}>→</span>
            </a>
          </div>
        </div>
      )}

      {/* SHARE */}
      {showShare&&(
        <div style={{borderTop:"1px solid #E5DDD5",background:"#FAFAF7",padding:"12px 14px"}}>
          <div style={{background:"#fff",border:"1px solid #E5DDD5",borderRadius:"6px",padding:"10px 12px",marginBottom:"8px",fontSize:"12px",color:"#333",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{shareText}</div>
          <div style={{display:"flex",gap:"6px"}}>
            <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,padding:"8px",background:copied?"#E8F5EE":"#FFF3E0",border:copied?"1px solid rgba(27,67,50,.2)":"1px solid rgba(255,153,51,.3)",borderRadius:"6px",cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:copied?"#1B4332":"#CC7A00",letterSpacing:".06em",transition:"all .15s"}}>
              {copied?"✅ COPIED":"📋 COPY"}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,padding:"8px",background:"rgba(37,211,102,.08)",border:"1px solid rgba(37,211,102,.2)",borderRadius:"6px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#1a7a3a",letterSpacing:".06em",textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"}}>
              💬 WHATSAPP
            </a>
          </div>
        </div>
      )}

      {/* GOALS */}
      {expanded&&(isFinished||isLive)&&(
        <div style={{borderTop:"1px solid #E5DDD5",background:"#fff",padding:"12px 14px"}}>
          {(hGoals.length>0||aGoals.length>0)?(
            <div style={{display:"flex",gap:"12px"}}>
              <div style={{flex:1}}>{hGoals.map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px"}}><span>⚽</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#0A0A0A"}}>{g.player}</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"#AAA"}}>{g.minute}&apos;</span></div>)}</div>
              <div style={{flex:1,textAlign:"right"}}>{aGoals.map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px",justifyContent:"flex-end"}}><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"#AAA"}}>{g.minute}&apos;</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#0A0A0A"}}>{g.player}</span><span>⚽</span></div>)}</div>
            </div>
          ):<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"#AAA",textAlign:"center",letterSpacing:".06em"}}>GOALSCORER DATA UNAVAILABLE</div>}
        </div>
      )}
    </div>
  );
}
