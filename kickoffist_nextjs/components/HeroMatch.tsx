"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { getCountdown } from "@/lib/utils";
import MatchInfoPanel from "@/components/MatchInfoPanel";

// Flag image URL from flagcdn
function flagUrl(name:string):string {
  const codes:Record<string,string>={
    "Argentina":"ar","Brazil":"br","France":"fr","England":"gb-eng","Germany":"de",
    "Spain":"es","Portugal":"pt","Netherlands":"nl","Norway":"no","USA":"us",
    "Mexico":"mx","Japan":"jp","Morocco":"ma","Colombia":"co","Croatia":"hr",
    "Egypt":"eg","Belgium":"be","Switzerland":"ch","Canada":"ca","Sweden":"se",
    "South Africa":"za","Ecuador":"ec","Ivory Coast":"ci","Senegal":"sn","Bosnia & Herz.":"ba",
    "Australia":"au","Uruguay":"uy","Austria":"at","Algeria":"dz","DR Congo":"cd",
    "Cape Verde":"cv","South Korea":"kr","Ghana":"gh","Bosnia":"ba","Ghana":"gh",
    "Panama":"pa","Iraq":"iq","Italy":"it","Tunisia":"tn","Paraguay":"py","Turkey":"tr",
    "Curaçao":"cw","Scotland":"gb-sct","Haiti":"ht","Qatar":"qa","Jordan":"jo",
    "Saudi Arabia":"sa","Iran":"ir","New Zealand":"nz","Uzbekistan":"uz","Cabo Verde":"cv",
  };
  const code = codes[name]||"un";
  return `https://flagcdn.com/80x60/${code}.png`;
}

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
  const isR32=match.group==="R32";

  useEffect(()=>{
    if(!isUpcoming) return;
    const tick=()=>setCountdown(getCountdown(match.utcDate)??"");
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[match.utcDate,isUpcoming]);

  const shareText=isUpcoming
    ? `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST · ${match.istDateLabel}\n📺 Zee5 India · kickoffist.com 🇮🇳`
    : `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} ${h}–${a} ${match.awayTeam.name} ${match.awayTeam.flag}\nFT · FIFA WC 2026 · kickoffist.com 🇮🇳`;

  return (
    <div style={{
      position:"relative",overflow:"hidden",borderRadius:"24px",marginBottom:"16px",
      background:"linear-gradient(135deg,#1e3a5f 0%,#0f2a4a 40%,#1a1a3e 100%)",
      border:isLive?"1px solid rgba(239,68,68,.5)":"1px solid rgba(255,153,51,.3)",
      boxShadow:isLive?"0 0 60px rgba(239,68,68,.15),inset 0 1px 0 rgba(255,255,255,.1)":"0 0 60px rgba(255,153,51,.1),inset 0 1px 0 rgba(255,255,255,.1)",
    }}>
      {/* Background watermark */}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"200px",opacity:.03,lineHeight:1,userSelect:"none"}}>⚽</div>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(255,153,51,.06) 0%,transparent 60%)"}}/>

      {/* TOP STRIP */}
      <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",borderBottom:"1px solid rgba(255,255,255,.08)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <img src="https://upload.wikimedia.org/wikipedia/en/6/67/2026_FIFA_World_Cup_logo.svg" style={{width:"28px",opacity:.6,filter:"brightness(10)"}} alt="WC26" onError={e=>(e.currentTarget.style.display="none")}/>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.5)",letterSpacing:".16em"}}>FIFA WORLD CUP 2026</span>
          <span style={{
            fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,
            padding:"2px 10px",borderRadius:"20px",letterSpacing:".08em",
            background:isR32?"rgba(255,255,255,.15)":"rgba(255,153,51,.15)",
            color:isR32?"#fff":"#FF9933",
          }}>{isR32?"ROUND OF 32":match.group}</span>
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          {isLive&&(
            <div style={{display:"flex",alignItems:"center",gap:"5px",background:"rgba(239,68,68,.2)",border:"1px solid rgba(239,68,68,.4)",borderRadius:"20px",padding:"5px 12px"}}>
              <span className="live-dot" style={{width:"6px",height:"6px"}}/>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#f87171",letterSpacing:".06em"}}>{match.minute?`${match.minute}'`:"LIVE"}</span>
            </div>
          )}
          <div style={{display:"flex",gap:"6px"}}>
            {[{n:`${played}`,l:"PLAYED"},{n:`${total-played}`,l:"LEFT"}].map((s,i)=>(
              <div key={i} style={{background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"10px",padding:"6px 12px",textAlign:"center"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".1em"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MATCH */}
      <div style={{position:"relative",zIndex:1,padding:"32px 20px 24px"}}>
        {isUpcoming&&match.istDateLabel&&(
          <div style={{textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"rgba(255,153,51,.6)",letterSpacing:".2em",marginBottom:"8px"}}>
            {match.istDateLabel.toUpperCase()}
          </div>
        )}
        {isUpcoming&&countdown&&(
          <div style={{textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:800,color:"rgba(255,255,255,.5)",letterSpacing:".16em",marginBottom:"20px"}}>
            ⏱ KICKS OFF IN {countdown.toUpperCase()}
          </div>
        )}

        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:"12px",alignItems:"center"}}>
          {/* Home */}
          <div style={{textAlign:"center"}}>
            <div style={{marginBottom:"12px",display:"flex",justifyContent:"center"}}>
              <img
                src={flagUrl(match.homeTeam.name)}
                alt={match.homeTeam.name}
                style={{width:"clamp(56px,10vw,88px)",height:"auto",borderRadius:"8px",border:"2px solid rgba(255,255,255,.15)",boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}
                onError={e=>{e.currentTarget.style.display="none";e.currentTarget.parentElement!.innerHTML=`<span style="font-size:clamp(56px,10vw,88px);line-height:1">${match.homeTeam.flag||"🏳️"}</span>`;}}
              />
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(16px,3.5vw,28px)",letterSpacing:"3px",color:"#fff",lineHeight:1}}>{match.homeTeam.name}</div>
          </div>

          {/* Score / Time */}
          <div style={{textAlign:"center",minWidth:"100px",padding:"0 8px"}}>
            {(isLive||isFinished)&&h!==null&&a!==null?(
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(56px,10vw,88px)",letterSpacing:"6px",color:"#fff",lineHeight:1,textShadow:"0 0 40px rgba(255,255,255,.2)"}}>{h}–{a}</div>
                {isFinished&&<div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".14em",marginTop:"6px"}}>FULL TIME</div>}
              </>
            ):(
              <>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(32px,6vw,56px)",letterSpacing:"3px",color:"#FF9933",lineHeight:1,textShadow:"0 0 30px rgba(255,153,51,.5)"}}>{match.istTime}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".14em",marginTop:"4px"}}>IST</div>
              </>
            )}
          </div>

          {/* Away */}
          <div style={{textAlign:"center"}}>
            <div style={{marginBottom:"12px",display:"flex",justifyContent:"center"}}>
              <img
                src={flagUrl(match.awayTeam.name)}
                alt={match.awayTeam.name}
                style={{width:"clamp(56px,10vw,88px)",height:"auto",borderRadius:"8px",border:"2px solid rgba(255,255,255,.15)",boxShadow:"0 8px 24px rgba(0,0,0,.5)"}}
                onError={e=>{e.currentTarget.style.display="none";e.currentTarget.parentElement!.innerHTML=`<span style="font-size:clamp(56px,10vw,88px);line-height:1">${match.awayTeam.flag||"🏳️"}</span>`;}}
              />
            </div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(16px,3.5vw,28px)",letterSpacing:"3px",color:"#fff",lineHeight:1}}>{match.awayTeam.name}</div>
          </div>
        </div>

        {(match.venue||match.city)&&(
          <div style={{textAlign:"center",marginTop:"14px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.3)",letterSpacing:".1em"}}>
            📍 {[match.venue,match.city].filter(Boolean).join(" · ")}
          </div>
        )}
      </div>

      {isUpcoming&&(
        <div style={{position:"relative",zIndex:1,padding:"0 16px 10px"}}>
          <div style={{display:"flex",gap:"8px"}}><MatchInfoPanel match={match}/></div>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div style={{position:"relative",zIndex:1,padding:"0 16px 18px",display:"flex",gap:"8px"}}>
        {isUpcoming&&(
          <a href={gcalUrl(match)} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#FF9933",borderRadius:"12px",padding:"13px",textDecoration:"none",boxShadow:"0 6px 20px rgba(255,153,51,.35)"}}>
            <span style={{fontSize:"15px"}}>⏰</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#000",letterSpacing:".1em"}}>SET ALARM</span>
          </a>
        )}
        <button onClick={()=>{navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(()=>{});}} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:copied?"rgba(34,197,94,.15)":"rgba(255,255,255,.08)",border:copied?"1px solid rgba(34,197,94,.3)":"1px solid rgba(255,255,255,.12)",borderRadius:"12px",padding:"13px",cursor:"pointer",transition:"all .15s"}}>
          <span style={{fontSize:"15px"}}>{copied?"✅":"📤"}</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:copied?"#4ade80":"rgba(255,255,255,.7)",letterSpacing:".1em"}}>{copied?"COPIED":"SHARE"}</span>
        </button>
        <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",borderRadius:"12px",padding:"13px",textDecoration:"none"}}>
          <span style={{fontSize:"15px"}}>💬</span>
          <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#25d366",letterSpacing:".1em"}}>WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
