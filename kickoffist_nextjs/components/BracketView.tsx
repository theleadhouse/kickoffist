"use client";
import { Match } from "@/lib/types";
import Link from "next/link";

const FLAG:Record<string,string>={
  "Argentina":"ar","Brazil":"br","France":"fr","England":"gb-eng","Germany":"de",
  "Spain":"es","Portugal":"pt","Netherlands":"nl","Norway":"no","USA":"us",
  "Mexico":"mx","Japan":"jp","Morocco":"ma","Colombia":"co","Croatia":"hr",
  "Egypt":"eg","Belgium":"be","Switzerland":"ch","Canada":"ca","Sweden":"se",
  "South Africa":"za","Ecuador":"ec","Ivory Coast":"ci","Senegal":"sn",
  "Bosnia & Herz.":"ba","Australia":"au","Uruguay":"uy","Austria":"at",
  "Algeria":"dz","DR Congo":"cd","Cape Verde":"cv","Cabo Verde":"cv",
  "South Korea":"kr","Ghana":"gh","Paraguay":"py","Turkey":"tr","Scotland":"gb-sct",
};
const F=(n:string)=>n==="TBD"?"":`https://flagcdn.com/20x15/${FLAG[n]||"un"}.png`;

function getISTTime(utc:string){
  const d=new Date(new Date(utc).getTime()+5.5*3600000);
  return `${String(d.getUTCHours()).padStart(2,"0")}:${String(d.getUTCMinutes()).padStart(2,"0")}`;
}
function getISTDate(utc:string){
  return new Date(new Date(utc).getTime()+5.5*3600000).toLocaleDateString("en-IN",{day:"numeric",month:"short",weekday:"short",timeZone:"UTC"});
}

function MatchSlot({match,size="md"}:{match:Match|null;size?:"sm"|"md"|"lg"}){
  if(!match) return(
    <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"8px",padding:size==="sm"?"8px 10px":"10px 12px",opacity:.5}}>
      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",color:"rgba(255,255,255,.3)",letterSpacing:".06em"}}>TBD vs TBD</div>
    </div>
  );

  const isLive=match.status==="LIVE";
  const isDone=match.status==="FINISHED";
  const isUp=match.status==="UPCOMING";
  const h=match.score.home, a=match.score.away;
  const hw=isDone&&h!==null&&a!==null&&h>a;
  const aw=isDone&&h!==null&&a!==null&&a>h;

  const borderColor=isLive?"rgba(244,67,54,.5)":isDone?"rgba(0,200,83,.3)":"rgba(255,153,51,.2)";

  return(
    <div style={{
      background:isLive?"rgba(244,67,54,.06)":"rgba(17,31,56,.8)",
      border:`1px solid ${borderColor}`,
      borderRadius:"8px",
      padding:size==="sm"?"6px 10px":"10px 12px",
      transition:"all .15s",
      cursor:"default",
    }}>
      {/* Stage + time */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}}>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,
          background:match.group==="R16"?"rgba(99,102,241,.2)":"rgba(255,153,51,.15)",
          color:match.group==="R16"?"#818cf8":"#FF9933",
          padding:"1px 6px",borderRadius:"10px",letterSpacing:".06em"
        }}>{match.group==="R16"?"R16":"R32"}</span>
        {isUp&&<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"#FF9933"}}>{getISTDate(match.utcDate)} · {getISTTime(match.utcDate)} IST</span>}
        {isLive&&<span style={{display:"flex",alignItems:"center",gap:"3px"}}><span style={{width:"5px",height:"5px",borderRadius:"50%",background:"#f44336",animation:"pulse-r 1.2s ease infinite"}}/><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"#f44336"}}>{match.minute?`${match.minute}'`:"LIVE"}</span></span>}
        {isDone&&<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(0,200,83,.8)"}}>FT</span>}
      </div>

      {/* Home */}
      <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"}}>
        {match.homeTeam.name!=="TBD"&&<img src={F(match.homeTeam.name)} alt="" style={{width:"20px",height:"auto",borderRadius:"2px",flexShrink:0}} onError={e=>{e.currentTarget.style.display="none";}}/>}
        <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:size==="sm"?"13px":"15px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
          color:hw?"#00e676":match.homeTeam.name==="TBD"?"rgba(255,255,255,.3)":"#fff"
        }}>{match.homeTeam.name==="TBD"?"TBD":match.homeTeam.name}</span>
        {(isDone||isLive)&&h!==null&&<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",color:hw?"#00e676":"rgba(255,255,255,.6)",flexShrink:0}}>{h}</span>}
      </div>

      {/* Away */}
      <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
        {match.awayTeam.name!=="TBD"&&<img src={F(match.awayTeam.name)} alt="" style={{width:"20px",height:"auto",borderRadius:"2px",flexShrink:0}} onError={e=>{e.currentTarget.style.display="none";}}/>}
        <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:size==="sm"?"13px":"15px",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
          color:aw?"#00e676":match.awayTeam.name==="TBD"?"rgba(255,255,255,.3)":"#fff"
        }}>{match.awayTeam.name==="TBD"?"TBD":match.awayTeam.name}</span>
        {(isDone||isLive)&&a!==null&&<span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",color:aw?"#00e676":"rgba(255,255,255,.6)",flexShrink:0}}>{a}</span>}
      </div>

      {match.venue&&<div style={{marginTop:"4px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",color:"rgba(255,255,255,.2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>📍 {match.city}</div>}
    </div>
  );
}

export default function BracketView({r32,r16}:{r32:Match[];r16:Match[]}){
  const r32Done = r32.filter(m=>m.status==="FINISHED");
  const r32Up = r32.filter(m=>m.status!=="FINISHED");
  const r16Done = r16.filter(m=>m.status==="FINISHED");
  const r16Up = r16.filter(m=>m.status!=="FINISHED"&&m.homeTeam.name!=="TBD");

  return(
    <div>
      {/* R32 RESULTS */}
      {r32Done.length>0&&(
        <div style={{marginBottom:"24px"}}>
          <div className="sh">✅ R32 RESULTS <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:700,color:"rgba(0,200,83,.8)"}}>{r32Done.length}/16 COMPLETE</span><div className="sh-line"/></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:"8px"}}>
            {r32Done.map(m=>(
              <div key={m.id} style={{background:"rgba(0,200,83,.05)",border:"1px solid rgba(0,200,83,.15)",borderRadius:"10px",padding:"10px 12px"}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"rgba(0,200,83,.7)",letterSpacing:".1em",marginBottom:"6px"}}>ROUND OF 32 · FT</div>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                  <img src={`https://flagcdn.com/20x15/${FLAG[m.homeTeam.name]||"un"}.png`} alt="" style={{width:"20px",borderRadius:"2px"}} onError={e=>{e.currentTarget.style.display="none";}}/>
                  <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:700,color:m.score.home!==null&&m.score.away!==null&&m.score.home>m.score.away?"#00e676":"rgba(255,255,255,.5)"}}>{m.homeTeam.name}</span>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",color:m.score.home!==null&&m.score.away!==null&&m.score.home>m.score.away?"#00e676":"rgba(255,255,255,.5)"}}>{m.score.home}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <img src={`https://flagcdn.com/20x15/${FLAG[m.awayTeam.name]||"un"}.png`} alt="" style={{width:"20px",borderRadius:"2px"}} onError={e=>{e.currentTarget.style.display="none";}}/>
                  <span style={{flex:1,fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:700,color:m.score.home!==null&&m.score.away!==null&&m.score.away>m.score.home?"#00e676":"rgba(255,255,255,.5)"}}>{m.awayTeam.name}</span>
                  <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",color:m.score.home!==null&&m.score.away!==null&&m.score.away>m.score.home?"#00e676":"rgba(255,255,255,.5)"}}>{m.score.away}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* R32 UPCOMING */}
      {r32Up.length>0&&(
        <div style={{marginBottom:"24px"}}>
          <div className="sh">🔥 R32 UPCOMING — TODAY & TOMORROW<div className="sh-line"/></div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"8px"}}>
            {r32Up.map(m=><MatchSlot key={m.id} match={m}/>)}
          </div>
        </div>
      )}

      {/* R16 */}
      <div style={{marginBottom:"24px"}}>
        <div className="sh">🏆 ROUND OF 16<div className="sh-line"/>
          <Link href="/world-cup" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",flexShrink:0}}>
            {r16Done.length}/{r16.length} DONE
          </Link>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"8px"}}>
          {r16.map(m=><MatchSlot key={m.id} match={m}/>)}
        </div>
      </div>

      {/* Watch note */}
      <div style={{background:"rgba(255,153,51,.06)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"10px",padding:"12px 16px",textAlign:"center"}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#FF9933",letterSpacing:".1em",marginBottom:"3px"}}>📺 WATCH ALL MATCHES IN INDIA</div>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.45)"}}>Zee5 holds exclusive FIFA WC 2026 broadcast rights in India · zee5.com · All times shown in IST</div>
      </div>
    </div>
  );
}
