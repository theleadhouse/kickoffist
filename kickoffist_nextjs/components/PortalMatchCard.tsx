"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";

export default function PortalMatchCard({ match, showDate=false }: { match:Match; showDate?:boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [countdown, setCountdown] = useState<string|null>(null);

  const isLive     = match.status==="LIVE";
  const isFinished = match.status==="FINISHED";
  const isUpcoming = match.status==="UPCOMING";
  const hScore     = match.score.home??null;
  const aScore     = match.score.away??null;
  const homeWin    = isFinished && hScore!==null && aScore!==null && hScore>aScore;
  const awayWin    = isFinished && hScore!==null && aScore!==null && aScore>hScore;

  useEffect(()=>{
    if(!isUpcoming) return;
    const tick=()=>setCountdown(getCountdown(match.utcDate));
    tick(); const id=setInterval(tick,30000); return()=>clearInterval(id);
  },[match.utcDate,isUpcoming]);

  const hGoals=match.goals?.filter(g=>g.team===match.homeTeam.name)||[];
  const aGoals=match.goals?.filter(g=>g.team===match.awayTeam.name)||[];

  return(
    <div
      className={`mc mb-2 ${isLive?"mc-live":""}`}
      onClick={()=>(isFinished||isLive)&&setExpanded(!expanded)}
      style={{cursor:(isFinished||isLive)?"pointer":"default"}}
    >
      <div style={{display:"flex",alignItems:"stretch",minHeight:"70px"}}>
        {/* Status strip */}
        <div style={{width:"3px",flexShrink:0,background:isLive?"#ef4444":isFinished?"rgba(74,222,128,.5)":"rgba(255,153,51,.3)"}}/>

        {/* Group/competition tag */}
        <div style={{width:"68px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"8px 4px",gap:"5px",borderRight:"1px solid rgba(255,255,255,.05)",background:"rgba(0,0,0,.1)"}}>
          <span style={{fontSize:"8px",color:"rgba(255,255,255,.3)",fontWeight:"600",textAlign:"center",lineHeight:1.2}}>
            {match.competition.name.replace("FIFA ","").replace(" 2026","")}
          </span>
          {match.group&&<span className="badge-grp">{match.group.replace("Group ","Grp ")}</span>}
          {isLive&&<span className="badge-live"><span className="live-dot" style={{width:"5px",height:"5px"}}/>{match.minute?`${match.minute}'`:"LIVE"}</span>}
          {isFinished&&<span className="badge-ft">FT</span>}
          {isUpcoming&&showDate&&match.istDateLabel&&<span className="badge-up" style={{fontSize:"8px"}}>{match.istDateLabel.slice(0,6)}</span>}
        </div>

        {/* Teams + scores — FotMob dense style */}
        <div style={{flex:1,minWidth:0,padding:"10px 12px"}}>
          {/* Home */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
            <span style={{fontSize:"20px",lineHeight:1,width:"24px",textAlign:"center",flexShrink:0}}>{match.homeTeam.flag||"🏳️"}</span>
            <span style={{flex:1,fontSize:"14px",fontWeight:"700",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
              color:homeWin?"#4ade80":(isFinished&&!homeWin&&!awayWin)?"rgba(255,255,255,.7)":isFinished?"rgba(255,255,255,.45)":"#fff",
              fontFamily:"'Barlow Condensed','Oswald',sans-serif",letterSpacing:".02em",
            }}>{match.homeTeam.name}</span>
            {(isLive||isFinished)&&hScore!==null&&(
              <span style={{fontSize:"22px",fontWeight:"900",color:homeWin?"#4ade80":"#fff",fontFamily:"'Barlow Condensed','Oswald',sans-serif",flexShrink:0,lineHeight:1}}>{hScore}</span>
            )}
          </div>
          {/* Away */}
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{fontSize:"20px",lineHeight:1,width:"24px",textAlign:"center",flexShrink:0}}>{match.awayTeam.flag||"🏳️"}</span>
            <span style={{flex:1,fontSize:"14px",fontWeight:"700",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
              color:awayWin?"#4ade80":(isFinished&&!homeWin&&!awayWin)?"rgba(255,255,255,.7)":isFinished?"rgba(255,255,255,.45)":"#fff",
              fontFamily:"'Barlow Condensed','Oswald',sans-serif",letterSpacing:".02em",
            }}>{match.awayTeam.name}</span>
            {(isLive||isFinished)&&aScore!==null&&(
              <span style={{fontSize:"22px",fontWeight:"900",color:awayWin?"#4ade80":"#fff",fontFamily:"'Barlow Condensed','Oswald',sans-serif",flexShrink:0,lineHeight:1}}>{aScore}</span>
            )}
          </div>
          {/* Venue */}
          {(match.venue||match.city)&&(
            <div style={{marginTop:"5px",fontSize:"9px",color:"rgba(255,255,255,.2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
              📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>

        {/* Right: time */}
        <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"flex-end",justifyContent:"center",padding:"10px 14px",borderLeft:"1px solid rgba(255,255,255,.05)",minWidth:"64px"}}>
          {isUpcoming?(
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:"16px",fontWeight:"900",color:"#FF9933",fontFamily:"'Barlow Condensed','Oswald',sans-serif",lineHeight:1,letterSpacing:".02em"}}>{match.istTime}</div>
              <div style={{fontSize:"8px",color:"rgba(255,255,255,.2)",marginTop:"2px"}}>IST</div>
              {countdown&&<div style={{fontSize:"9px",color:"rgba(255,153,51,.5)",marginTop:"2px"}}>in {countdown}</div>}
            </div>
          ):isLive?(
            <div style={{textAlign:"right"}}>
              <div style={{display:"flex",alignItems:"center",gap:"4px",justifyContent:"flex-end"}}>
                <span className="live-dot"/>
                <span style={{fontSize:"9px",fontWeight:"900",color:"#f87171",fontFamily:"'Barlow Condensed','Oswald',sans-serif"}}>LIVE</span>
              </div>
              {match.minute&&<div style={{fontSize:"18px",fontWeight:"900",color:"#f87171",fontFamily:"'Barlow Condensed','Oswald',sans-serif",lineHeight:1,marginTop:"4px"}}>{match.minute}&apos;</div>}
            </div>
          ):(
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:"10px",color:"rgba(255,255,255,.25)"}}>{match.istTime}</div>
              <div style={{fontSize:"8px",color:"rgba(255,255,255,.15)"}}>IST</div>
              {(isFinished||isLive)&&<div style={{fontSize:"10px",color:"rgba(255,255,255,.2)",marginTop:"4px"}}>{expanded?"▲":"▼"}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Expanded goalscorers */}
      {expanded&&(isFinished||isLive)&&(
        <div style={{borderTop:"1px solid rgba(255,255,255,.05)",background:"rgba(0,0,0,.2)",padding:"10px 12px"}}>
          {(hGoals.length>0||aGoals.length>0)?(
            <div style={{display:"flex",gap:"12px"}}>
              <div style={{flex:1}}>
                {hGoals.map((g,i)=>(
                  <div key={i} className="goalscorer" style={{marginBottom:"3px"}}>
                    <span style={{color:"#4ade80",fontSize:"10px"}}>⚽</span>
                    <span style={{color:"rgba(255,255,255,.7)",fontWeight:"600"}}>{g.player}</span>
                    <span className="min">{g.minute}&apos;</span>
                  </div>
                ))}
              </div>
              <div style={{flex:1,textAlign:"right"}}>
                {aGoals.map((g,i)=>(
                  <div key={i} className="goalscorer" style={{marginBottom:"3px",justifyContent:"flex-end"}}>
                    <span className="min">{g.minute}&apos;</span>
                    <span style={{color:"rgba(255,255,255,.7)",fontWeight:"600"}}>{g.player}</span>
                    <span style={{color:"#4ade80",fontSize:"10px"}}>⚽</span>
                  </div>
                ))}
              </div>
            </div>
          ):(
            <div style={{fontSize:"9px",color:"rgba(255,255,255,.2)",textAlign:"center"}}>Goalscorer data not available</div>
          )}
        </div>
      )}
    </div>
  );
}
