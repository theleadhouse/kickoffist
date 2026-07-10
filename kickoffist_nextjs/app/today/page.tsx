"use client";
import { useEffect, useState } from "react";

function ISTClock(){
  const [t,setT]=useState("--:--:--");
  useEffect(()=>{
    const tick=()=>{
      const ist=new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Kolkata"}));
      setT(`${String(ist.getHours()).padStart(2,"0")}:${String(ist.getMinutes()).padStart(2,"0")}:${String(ist.getSeconds()).padStart(2,"0")}`);
    };
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[]);
  return <>{t}</>;
}

const FLAGS:Record<string,string>={France:"fr",Morocco:"ma",Spain:"es",Belgium:"be",Norway:"no",England:"gb-eng",Argentina:"ar",Switzerland:"ch"};
const F=(n:string)=>`https://flagcdn.com/80x60/${FLAGS[n]||"un"}.png`;

const QF_UP=[
  {home:"Spain",away:"Belgium",date:"FRI 11 JUL",ist:"12:30 AM IST",venue:"SoFi Stadium · Los Angeles",
   gcal:"https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+Spain+vs+Belgium+QF+WC2026&dates=20260710T190000Z/20260710T210000Z",
   wa:"⚽ 🇪🇸 Spain vs Belgium 🇧🇪\n🏆 WC 2026 Quarter-Final\n📅 Fri 11 Jul · 12:30 AM IST\n📺 Zee5 India → kickoffist.com 🇮🇳",
   headline:"Spain's perfect record vs Belgium's fire — something has to give",
   lead:"Spain have not conceded a SINGLE goal in 6 matches. Belgium destroyed USA 4-1. Lamine Yamal, 18, vs De Bruyne in his last great tournament. One of the most mouth-watering QFs in recent memory.",
   homeForm:"0 goals conceded all tournament. Beat Portugal 1-0 in stoppage time. Merino the late hero.",
   awayForm:"4-1 vs USA. De Ketelaere 3 goals in 2 games. De Bruyne finally playing his best football.",
   battle:"Pedri vs De Bruyne — midfield masterclass decides everything",
   starFlag:"🇪🇸",starName:"Lamine Yamal",starNote:"18 years old. The most exciting player at this World Cup. Every defender in this tournament has feared him. If Yamal fires, Spain reach the semis.",
   read:"Spain are favourites — their defensive record is extraordinary. But Belgium have the quality to hurt anyone, and De Bruyne is playing like a man with something to prove. I think Spain win 1-0. But watch Belgium to push them all the way.",
  },
  {home:"Norway",away:"England",date:"SAT 12 JUL",ist:"2:30 AM IST",venue:"Hard Rock Stadium · Miami",
   gcal:"https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+Norway+vs+England+QF+WC2026&dates=20260711T210000Z/20260711T230000Z",
   wa:"⚽ 🇳🇴 Norway vs England 🏴󠁧󠁢󠁥󠁮󠁧󠁿\n🏆 WC 2026 Quarter-Final\n📅 Sat 12 Jul · 2:30 AM IST\n📺 Zee5 India → kickoffist.com 🇮🇳",
   headline:"Haaland vs Kane — the Golden Boot battle becomes a World Cup QF in Miami",
   lead:"Erling Haaland has 9 goals and ELIMINATED BRAZIL. Harry Kane has 6 and ended Mexico's perfect home tournament. Two of the greatest strikers alive. One ticket to the semi-finals. This is the match of the tournament.",
   homeForm:"Shocked Brazil 2-1 in R16. Haaland scored twice in the second half. Norway's FIRST EVER World Cup QF.",
   awayForm:"3-2 thriller in Mexico City. England's best ever win on foreign soil. Kane brace, Bellingham the match-winner.",
   battle:"Haaland vs Guehi/Konsa — can England stop the most unstoppable striker in world football right now?",
   starFlag:"🇳🇴",starName:"Erling Haaland — 9 Goals",starNote:"He watched Mbappe's penalty attempt on Snapchat and commented on it. Then he eliminated BRAZIL. He's 6'4, 94kg, runs at 37km/h. England have a massive problem tonight.",
   read:"My heart says England. My brain says Norway. Haaland eliminated Brazil — if he can do that, he can do anything. But England showed genuine belief vs Mexico and Bellingham is playing the football of his life. This is 50-50. SET YOUR ALARM — worth staying up for.",
  },
  {home:"Argentina",away:"Switzerland",date:"SAT 12 JUL",ist:"6:30 AM IST",venue:"Arrowhead Stadium · Kansas City",
   gcal:"https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+Argentina+vs+Switzerland+QF+WC2026&dates=20260712T010000Z/20260712T030000Z",
   wa:"⚽ 🇦🇷 Argentina vs Switzerland 🇨🇭\n🏆 WC 2026 Quarter-Final\n📅 Sat 12 Jul · 6:30 AM IST\n📺 Zee5 India → kickoffist.com 🇮🇳",
   headline:"Messi's last chapter — Argentina's luck running out or one more miracle?",
   lead:"Argentina were 0-2 down to Egypt and came back to win 3-2. Messi has 8 goals and 19 career WC goals — an all-time record that may never be broken. But they look fragile. Switzerland beat Colombia on penalties, are organised, and are dangerous. This is where the magic ends — or continues.",
   homeForm:"Survived Egypt scare 3-2. 0-2 down → Messi brace + Romero. Incredible comeback spirit but defensive questions remain.",
   awayForm:"Beat Colombia 0-0 on pens (4-3). Xhaka captain and leader. Most underrated team left in the tournament.",
   battle:"Messi vs Xhaka/Freuler — can the Swiss midfield cage the greatest player of all time?",
   starFlag:"🇦🇷",starName:"Lionel Messi — 8 Goals · 19 Career WC Goals",starNote:"All-time WC goalscorer record. 38 years old. Every touch in Kansas City could be his last at a World Cup. Watch carefully. You are watching the greatest to ever play the game.",
   read:"Switzerland are the most underrated team left. Nobody talks about them — but they beat Colombia and Xhaka is playing the tournament of his life. Argentina have Messi and that comeback spirit but they look fragile. I think extra time. I think Messi finds one more moment. That's just who he is.",
  },
];

const R16=[
  {h:"🇲🇦 Morocco",a:"Canada 🇨🇦",s:"3–0",n:"Ounahi ×2 · En-Nesyri",d:"Sat 4 Jul · 10:30 PM IST"},
  {h:"🇫🇷 France",a:"Paraguay 🇵🇾",s:"1–0",n:"Mbappé pen 34'",d:"Sun 5 Jul · 2:30 AM IST"},
  {h:"🇳🇴 Norway",a:"Brazil 🇧🇷",s:"2–1",n:"Haaland ×2 — BIGGEST UPSET 2026",d:"Mon 6 Jul · 1:30 AM IST"},
  {h:"🇲🇽 Mexico",a:"England 🏴󠁧󠁢󠁥󠁮󠁧󠁿",s:"2–3",n:"Kane · Bellingham · Saka",d:"Mon 6 Jul · 5:30 AM IST"},
  {h:"🇵🇹 Portugal",a:"Spain 🇪🇸",s:"0–1",n:"Merino 90+1' — Ronaldo's last WC",d:"Tue 7 Jul · 12:30 AM IST"},
  {h:"🇺🇸 USA",a:"Belgium 🇧🇪",s:"1–4",n:"De Ketelaere ×2 · Vanaken · Lukebakio",d:"Tue 7 Jul · 5:30 AM IST"},
  {h:"🇦🇷 Argentina",a:"Egypt 🇪🇬",s:"3–2",n:"0-2 down → Messi brace — comeback of the tournament",d:"Tue 7 Jul · 9:30 PM IST"},
  {h:"🇨🇭 Switzerland",a:"Colombia 🇨🇴",s:"0–0",n:"SUI win 4-3 on pens — Xhaka the hero",d:"Wed 8 Jul · 1:30 AM IST"},
];

const BOOT=[
  {f:"🇫🇷",n:"Mbappé",t:"France · SF",g:8},
  {f:"🇦🇷",n:"Messi",t:"Argentina · QF",g:8},
  {f:"🇳🇴",n:"Haaland",t:"Norway · QF",g:9},
  {f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",n:"Kane",t:"England · QF",g:6},
  {f:"🇫🇷",n:"Dembélé",t:"France · SF",g:4},
  {f:"🇲🇦",n:"En-Nesyri",t:"Morocco · OUT",g:4},
];

const s=(obj:Record<string,string>)=>({...obj});
const C=(x:string)=>{const o:Record<string,string>={};return o;};

export default function Page(){
  return(
    <div style={{background:"#050A14",minHeight:"100vh",color:"#E2E8F0"}}>

      {/* HERO */}
      <div style={{padding:"clamp(28px,5vw,48px) 16px",textAlign:"center",borderBottom:"1px solid rgba(255,153,51,.15)",background:"radial-gradient(ellipse 80% 50% at 50% 0%,rgba(255,153,51,.07),transparent 70%)"}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"rgba(255,153,51,.6)",letterSpacing:".2em",marginBottom:"8px"}}>🏆 FIFA WORLD CUP 2026</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(36px,8vw,72px)",letterSpacing:"4px",color:"#fff",lineHeight:1,marginBottom:"10px"}}>QUARTER-FINALS <span style={{color:"#FF9933"}}>IST</span></h1>
        <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:600,color:"rgba(255,255,255,.45)",marginBottom:"20px"}}>India's Guide · All times IST 🇮🇳 · Powered by kickoffist.com</p>
        <div style={{display:"flex",justifyContent:"center",gap:"clamp(16px,4vw,32px)",flexWrap:"wrap"}}>
          {[["France 2–0","QF1 DONE"],["3 QFs","REMAINING"],["Jul 20","FINAL · NY/NJ"]].map(([n,l])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(22px,4vw,34px)",letterSpacing:"2px",color:"#FF9933",lineHeight:1}}>{n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".12em"}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:"760px",margin:"0 auto",padding:"20px 14px 100px"}}>

        {/* QF1 DONE */}
        <SH color="#00D26A" title="✅ QF RESULT — FRANCE 2–0 MOROCCO" tag="FULL TIME" tagColor="rgba(0,210,106,.1)" tagBorder="rgba(0,210,106,.2)" tagText="#00D26A"/>
        <div style={{background:"rgba(0,210,106,.04)",border:"1px solid rgba(0,210,106,.15)",borderRadius:"14px",overflow:"hidden",marginBottom:"20px"}}>
          <div style={{background:"rgba(0,0,0,.4)",padding:"8px 16px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#00D26A",letterSpacing:".08em"}}>⚽ QUARTER-FINAL 1 · FULL TIME</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,.3)"}}>Thu 10 Jul · 1:30 AM IST</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",padding:"20px 16px 14px",gap:"8px"}}>
            <FlagTeam name="France" won/>
            <div style={{textAlign:"center"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(44px,8vw,72px)",letterSpacing:"4px",color:"#00D26A",lineHeight:1}}>2–0</div><div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:".12em",marginTop:"4px"}}>FULL TIME</div></div>
            <FlagTeam name="Morocco"/>
          </div>
          <div style={{padding:"0 16px 14px"}}>
            <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.5)",marginBottom:"6px"}}>⚽ Mbappé 60' · Dembélé 84'</p>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,.65)",lineHeight:1.6}}>Mbappé missed a first-half penalty then scored a stunning 60th-minute goal. Dembélé sealed it. France are unbeaten in 90 minutes across 7 matches. Morocco's incredible back-to-back QF run ends — the first African nation to achieve it in history.</p>
          </div>
        </div>

        {/* 3 UPCOMING QFs */}
        <SH color="#FF9933" title="🔥 UPCOMING QUARTER-FINALS" tag="3 TO GO" tagColor="rgba(255,153,51,.1)" tagBorder="rgba(255,153,51,.2)" tagText="#FF9933"/>
        {QF_UP.map((m,i)=>(
          <QFCard key={m.home} m={m} num={i+2}/>
        ))}

        {/* SEMI FINALS */}
        <SH color="#FF9933" title="📅 SEMI-FINALS" tag="JUL 14–15" tagColor="rgba(255,255,255,.05)" tagBorder="rgba(255,255,255,.1)" tagText="rgba(255,255,255,.4)"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"20px"}}>
          {[
            {l:"SF 1",t:"France vs Spain/Belgium",d:"Tue 15 Jul · 12:30 AM IST",v:"AT&T Stadium · Dallas"},
            {l:"SF 2",t:"Nor/Eng vs Arg/Sui",d:"Wed 16 Jul · 12:30 AM IST",v:"Mercedes-Benz · Atlanta"},
          ].map(sf=>(
            <div key={sf.l} style={{background:"rgba(13,24,41,.8)",border:"1px solid rgba(255,255,255,.08)",borderRadius:"12px",padding:"14px",textAlign:"center"}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"rgba(255,255,255,.3)",letterSpacing:".1em",marginBottom:"5px"}}>{sf.l}</div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(13px,2.5vw,18px)",color:"#FF9933",letterSpacing:"1px",marginBottom:"5px",lineHeight:1.2}}>{sf.t}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:700,color:"rgba(255,255,255,.4)"}}>{sf.d}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",color:"rgba(255,255,255,.2)",marginTop:"2px"}}>{sf.v}</div>
            </div>
          ))}
        </div>

        {/* FINAL */}
        <div style={{background:"linear-gradient(135deg,#1a0d00,#261500,#1a0d00)",border:"2px solid rgba(255,153,51,.4)",borderRadius:"16px",padding:"24px",textAlign:"center",marginBottom:"24px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(255,153,51,.08),transparent 60%)",pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,153,51,.5)",letterSpacing:".2em",marginBottom:"8px"}}>🏆 THE BIGGEST MATCH IN HISTORY</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(32px,6vw,52px)",letterSpacing:"4px",color:"#fff",marginBottom:"4px"}}>THE FINAL</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(18px,3.5vw,28px)",letterSpacing:"3px",color:"#FF9933",marginBottom:"10px"}}>SUN 20 JUL · 12:30 AM IST</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:600,color:"rgba(255,255,255,.4)"}}>MetLife Stadium · East Rutherford, New Jersey</div>
          </div>
        </div>

        {/* GOLDEN BOOT */}
        <SH color="#FF9933" title="⚽ GOLDEN BOOT" tag="JUL 10 · LIVE" tagColor="rgba(255,153,51,.08)" tagBorder="rgba(255,153,51,.2)" tagText="#FF9933"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:"7px",marginBottom:"24px"}}>
          {BOOT.map((b,i)=>(
            <div key={b.n} style={{background:"rgba(13,24,41,.8)",border:`1px solid ${i<2?"rgba(255,153,51,.25)":"rgba(255,255,255,.07)"}`,borderRadius:"10px",padding:"10px 12px",display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",color:i<2?"#FF9933":"rgba(255,255,255,.2)",width:"16px",flexShrink:0}}>{i+1}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:"14px"}}>{b.f}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,color:i<2?"#fff":"rgba(255,255,255,.5)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.n}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",color:"rgba(255,255,255,.3)"}}>{b.t}</div>
              </div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"26px",color:i<2?"#FF9933":"rgba(255,255,255,.4)",flexShrink:0,lineHeight:1}}>{b.g}</div>
            </div>
          ))}
        </div>

        {/* R16 RESULTS */}
        <SH color="#00D26A" title="📋 R16 RESULTS" tag="ALL 8 DONE" tagColor="rgba(0,210,106,.1)" tagBorder="rgba(0,210,106,.2)" tagText="#00D26A"/>
        <div style={{marginBottom:"24px"}}>
          {R16.map(r=>(
            <div key={r.h} style={{background:"rgba(13,24,41,.8)",border:"1px solid rgba(255,255,255,.07)",borderLeft:"3px solid #00D26A",borderRadius:"10px",padding:"10px 14px",marginBottom:"6px",display:"flex",alignItems:"center",gap:"10px"}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"16px",fontWeight:700,color:"#fff",display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
                  {r.h} <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",color:"#00D26A",letterSpacing:"1px"}}>{r.s}</span> {r.a}
                </div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,.3)",marginTop:"2px"}}>{r.n}</div>
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:"rgba(255,255,255,.2)",textAlign:"right",flexShrink:0,lineHeight:1.5}}>{r.d}</div>
            </div>
          ))}
        </div>

        {/* WATCH */}
        <div style={{background:"rgba(255,153,51,.06)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"12px",padding:"16px",textAlign:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"3px",color:"#FF9933",marginBottom:"6px"}}>📺 WATCH IN INDIA</div>
          <div style={{display:"inline-block",background:"rgba(255,153,51,.12)",border:"1px solid rgba(255,153,51,.25)",borderRadius:"8px",padding:"8px 20px",fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",color:"#FF9933",letterSpacing:"3px",marginBottom:"6px"}}>ZEE5</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.35)"}}>Exclusive FIFA WC 2026 rights in India · Every match live · zee5.com</div>
        </div>

      </div>
    </div>
  );
}

function SH({color,title,tag,tagColor,tagBorder,tagText}:{color:string;title:string;tag:string;tagColor:string;tagBorder:string;tagText:string}){
  return(
    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"17px",letterSpacing:"3px",color,display:"flex",alignItems:"center",gap:"10px",padding:"16px 0 10px",borderBottom:`1px solid ${color}30`,marginBottom:"14px"}}>
      {title}<div style={{flex:1,height:"1px",background:"rgba(255,255,255,.07)"}}/>
      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,background:tagColor,color:tagText,border:`1px solid ${tagBorder}`,padding:"2px 8px",borderRadius:"20px"}}>{tag}</span>
    </div>
  );
}

function FlagTeam({name,won=false}:{name:string;won?:boolean}){
  const F=(n:string)=>`https://flagcdn.com/80x60/${({France:"fr",Morocco:"ma",Spain:"es",Belgium:"be",Norway:"no",England:"gb-eng",Argentina:"ar",Switzerland:"ch"})[n]||"un"}.png`;
  return(
    <div style={{textAlign:"center"}}>
      <img src={F(name)} alt={name} style={{width:"clamp(50px,9vw,72px)",borderRadius:"6px",border:"2px solid rgba(255,255,255,.12)",display:"block",margin:"0 auto 8px",boxShadow:"0 6px 20px rgba(0,0,0,.4)"}} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(14px,3vw,22px)",letterSpacing:"2px",color:won?"#00D26A":"#fff"}}>{name}</div>
    </div>
  );
}

function QFCard({m,num}:{m:typeof QF_UP[0];num:number}){
  const F=(n:string)=>`https://flagcdn.com/80x60/${({France:"fr",Morocco:"ma",Spain:"es",Belgium:"be",Norway:"no",England:"gb-eng",Argentina:"ar",Switzerland:"ch"})[n]||"un"}.png`;
  return(
    <div style={{background:"rgba(13,24,41,.9)",border:"1px solid rgba(255,255,255,.09)",borderRadius:"14px",overflow:"hidden",marginBottom:"20px"}}>
      <div style={{background:"rgba(0,0,0,.4)",padding:"8px 16px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",letterSpacing:".08em"}}>🏆 QUARTER-FINAL {num}</span>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933"}}>{m.ist}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",padding:"22px 16px 14px",gap:"8px"}}>
        <div style={{textAlign:"center"}}>
          <img src={F(m.home)} alt={m.home} style={{width:"clamp(52px,10vw,80px)",borderRadius:"7px",border:"2px solid rgba(255,255,255,.12)",display:"block",margin:"0 auto 8px",boxShadow:"0 6px 20px rgba(0,0,0,.4)"}} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(14px,3vw,24px)",letterSpacing:"2px",color:"#fff"}}>{m.home}</div>
        </div>
        <div style={{textAlign:"center",padding:"0 8px"}}>
          <div style={{background:"#FF9933",color:"#000",fontFamily:"'Bebas Neue',sans-serif",fontSize:"12px",letterSpacing:"2px",padding:"3px 12px",borderRadius:"20px",display:"inline-block",marginBottom:"8px"}}>{m.date}</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(22px,4.5vw,40px)",letterSpacing:"2px",color:"#FF9933",lineHeight:1,textShadow:"0 0 24px rgba(255,153,51,.4)"}}>{m.ist.split(" · ")[1]}</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:".12em",marginTop:"3px"}}>IST</div>
        </div>
        <div style={{textAlign:"center"}}>
          <img src={F(m.away)} alt={m.away} style={{width:"clamp(52px,10vw,80px)",borderRadius:"7px",border:"2px solid rgba(255,255,255,.12)",display:"block",margin:"0 auto 8px",boxShadow:"0 6px 20px rgba(0,0,0,.4)"}} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(14px,3vw,24px)",letterSpacing:"2px",color:"#fff"}}>{m.away}</div>
        </div>
      </div>
      <div style={{textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,.25)",padding:"0 16px 10px"}}>📍 {m.venue}</div>
      <div style={{padding:"0 16px 16px"}}>
        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(17px,3vw,21px)",fontWeight:900,color:"#fff",lineHeight:1.3,marginBottom:"10px"}}>{m.headline}</h2>
        <p style={{fontSize:"13px",color:"rgba(255,255,255,.6)",lineHeight:1.7,marginBottom:"14px"}}>{m.lead}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"10px"}}>
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"10px",padding:"10px 12px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"rgba(255,255,255,.3)",letterSpacing:".1em",marginBottom:"3px"}}>{m.home.toUpperCase()} FORM</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.65)",lineHeight:1.4}}>{m.homeForm}</div>
          </div>
          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"10px",padding:"10px 12px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"rgba(255,255,255,.3)",letterSpacing:".1em",marginBottom:"3px"}}>{m.away.toUpperCase()} FORM</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.65)",lineHeight:1.4}}>{m.awayForm}</div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:"10px",padding:"10px 12px",marginBottom:"10px"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"rgba(255,255,255,.3)",letterSpacing:".1em",marginBottom:"3px"}}>⚔️ KEY BATTLE</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:700,color:"rgba(255,255,255,.7)"}}>{m.battle}</div>
        </div>
        <div style={{background:"rgba(255,153,51,.06)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"10px",padding:"12px 14px",marginBottom:"10px",display:"flex",alignItems:"flex-start",gap:"12px"}}>
          <span style={{fontSize:"26px",flexShrink:0,lineHeight:1}}>{m.starFlag}</span>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"rgba(255,153,51,.6)",letterSpacing:".1em",marginBottom:"3px"}}>⭐ ONE TO WATCH</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"17px",fontWeight:900,color:"#FF9933",marginBottom:"4px"}}>{m.starName}</div>
            <div style={{fontSize:"12px",color:"rgba(255,255,255,.55)",lineHeight:1.5}}>{m.starNote}</div>
          </div>
        </div>
        <div style={{background:"rgba(255,51,102,.04)",border:"1px solid rgba(255,51,102,.12)",borderRadius:"10px",padding:"12px 14px",marginBottom:"14px"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"rgba(255,51,102,.7)",letterSpacing:".14em",marginBottom:"5px"}}>🔮 OUR READ — AS A FOOTBALL LOVER</div>
          <div style={{fontSize:"13px",fontWeight:600,color:"rgba(255,255,255,.75)",lineHeight:1.6}}>{m.read}</div>
        </div>
        <div style={{display:"flex",gap:"7px"}}>
          <a href={m.gcal} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"#FF9933",borderRadius:"10px",padding:"12px",textDecoration:"none",boxShadow:"0 4px 16px rgba(255,153,51,.3)"}}>
            <span>⏰</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:800,color:"#000",letterSpacing:".08em"}}>SET ALARM</span>
          </a>
          <a href={`https://wa.me/?text=${encodeURIComponent(m.wa)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",borderRadius:"10px",padding:"12px",textDecoration:"none"}}>
            <span>💬</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:800,color:"#25d366",letterSpacing:".08em"}}>WHATSAPP</span>
          </a>
        </div>
      </div>
    </div>
  );
}
