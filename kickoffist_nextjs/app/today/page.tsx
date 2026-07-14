"use client";
import { useEffect, useState } from "react";

function ISTClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      setT(`${String(ist.getHours()).padStart(2,"0")}:${String(ist.getMinutes()).padStart(2,"0")}:${String(ist.getSeconds()).padStart(2,"0")}`);
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"2px",color:"#C8A84B"}}>{t}</span>;
}

const FLAGS: Record<string,string> = {
  France:"fr", Spain:"es", England:"gb-eng", Argentina:"ar",
  Morocco:"ma", Belgium:"be", Norway:"no", Switzerland:"ch"
};
const F = (n: string) => `https://flagcdn.com/96x72/${FLAGS[n]||"un"}.png`;

const SF = [
  {
    num: 1,
    home: "France", away: "Spain",
    date: "TUE 15 JUL", ist: "12:30 AM IST",
    venue: "AT&T Stadium · Dallas, TX",
    gcal: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+France+vs+Spain+SF+WC2026&dates=20260714T190000Z/20260714T210000Z&details=WC+2026+Semi-Final+Zee5+India",
    wa: "⚽ 🇫🇷 France vs Spain 🇪🇸\n🏆 WC 2026 Semi-Final\n📅 Tue 15 Jul · 12:30 AM IST\n📺 Zee5 India → kickoffist.com 🇮🇳",
    headline: "The dream semi-final — Mbappé vs Yamal. Two unbeaten giants collide.",
    lead: "France haven't conceded in extra time all tournament. Spain haven't conceded at all — not a single goal in 7 matches. Something has to give in Dallas in what may be the greatest semi-final in World Cup history. Mbappé vs Lamine Yamal. Deschamps vs de la Fuente. The two best teams at this tournament, finally face to face.",
    homeForm: "7 wins, 0 defeats. Only team to win every game in 90 minutes. Mbappé scored vs Morocco. Dembélé clinical. France look unstoppable.",
    awayForm: "0 goals conceded in 7 games. Beat Portugal 1-0, Belgium 2-1 (Merino again!). Yamal, Cubarsí, Pedri — Spain's young core is historic.",
    battle: "Mbappé vs Cubarsí — 19-year-old Spanish defender against the best striker on the planet",
    starFlag: "🇫🇷", starName: "Kylian Mbappé — 9 Goals", starNote: "Missed a pen vs Morocco, scored anyway. Goals vs Paraguay, Morocco, Sweden. His 9 WC 2026 goals puts him in the Golden Boot lead. This is Mbappé's World Cup to win. At 27, in his absolute prime.",
    starFlag2: "🇪🇸", starName2: "Lamine Yamal — 18 Years Old", starNote2: "18 years old in the World Cup semi-final. The most naturally talented footballer since Messi himself. Watch him tonight. You are watching the future happening in real time.",
    read: "This is the match of the tournament. Possibly the match of the decade. France have the individual quality — Mbappé, Dembélé, Griezmann. Spain have the system — nobody has broken through them all tournament. I think Spain will defend brilliantly for 75 minutes. Then Mbappé will score. Then all hell breaks loose. I'm going France in extra time — but I could easily be wrong about this one.",
  },
  {
    num: 2,
    home: "England", away: "Argentina",
    date: "WED 16 JUL", ist: "12:30 AM IST",
    venue: "Mercedes-Benz Stadium · Atlanta, GA",
    gcal: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+England+vs+Argentina+SF+WC2026&dates=20260715T190000Z/20260715T210000Z&details=WC+2026+Semi-Final+Zee5+India",
    wa: "⚽ 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England vs Argentina 🇦🇷\n🏆 WC 2026 Semi-Final\n📅 Wed 16 Jul · 12:30 AM IST\n📺 Zee5 India → kickoffist.com 🇮🇳",
    headline: "60 years of hurt vs 40 years of revenge — England vs Argentina in a World Cup semi-final.",
    lead: "1966. 1986. 1998. 2002. England and Argentina have met in some of the most historic, heated, controversial moments in football history. Now, in Atlanta, they meet in a World Cup semi-final. Messi vs Bellingham. Kane vs Romero. And for India — the most famous football rivalry on Earth. At 12:30 AM IST. Set. Your. Alarm.",
    homeForm: "Beat Mexico 3-2, Norway 2-1 AET. Bellingham scored in both knockouts. Kane 6 goals. England believe this is their year.",
    awayForm: "Survived everything — Cape Verde AET, Egypt from 0-2 down, Switzerland 3-1 AET. Messi 8 goals. Álvarez found form vs Switzerland with the winner. Defending champions.",
    battle: "Bellingham vs Enzo Fernández — England's engine vs Argentina's heartbeat. The midfield battle decides the World Cup final.",
    starFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", starName: "Jude Bellingham — 3 Knockout Goals", starNote: "Scored the winner vs Mexico. Scored twice vs Norway. Bellingham has been England's best player in every knockout game. 21 years old and playing like a veteran. If England reach the final, it's because of him.",
    starFlag2: "🇦🇷", starName2: "Lionel Messi — 8 Goals · The GOAT", starNote2: "Messi didn't score vs Switzerland — first time in 10 knockout matches — but Argentina won anyway. That's how good they are. He's still here. Still dangerous. Still capable of changing a game in one moment.",
    read: "This is the match I've been waiting for my entire life as a football fan. England haven't beaten Argentina in a major tournament since 1966. Argentina are the defending champions. This has everything — history, quality, drama, and two teams that genuinely believe they will win the World Cup. I think this goes to penalties. I think Argentina win on pens — that's just what they do. But I desperately want to be wrong.",
  },
];

const QF_RESULTS = [
  {h:"🇫🇷 France", a:"Morocco 🇲🇦", s:"2–0", n:"Mbappé 60' · Dembélé 84'", d:"Thu 10 Jul · 1:30 AM IST"},
  {h:"🇪🇸 Spain",  a:"Belgium 🇧🇪",  s:"2–1", n:"Cubarsí 34' · Merino 88' · De Ketelaere 71'", d:"Fri 11 Jul · 12:30 AM IST"},
  {h:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", a:"Norway 🇳🇴", s:"2–1 AET", n:"Bellingham ×2 · Haaland · Extra time thriller", d:"Sat 12 Jul · 2:30 AM IST"},
  {h:"🇦🇷 Argentina", a:"Switzerland 🇨🇭", s:"3–1 AET", n:"Álvarez · Messi · Lautaro · 10-man Swiss", d:"Sat 12 Jul · 6:30 AM IST"},
];

const BOOT = [
  {f:"🇫🇷",n:"Mbappé",t:"France 🏆 SF",g:9},
  {f:"🇦🇷",n:"Messi",t:"Argentina 🏆 SF",g:8},
  {f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",n:"Kane",t:"England 🏆 SF",g:6},
  {f:"🇳🇴",n:"Haaland",t:"Norway — OUT",g:9},
  {f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",n:"Bellingham",t:"England 🏆 SF",g:4},
  {f:"🇫🇷",n:"Dembélé",t:"France 🏆 SF",g:4},
];

// ── THEME: Parchment meets pitch ──
// Background: rich dark navy #0C1220
// Card: deep blue-black #111B2E
// Gold accent: #C8A84B — classic trophy gold
// Red: #E8002D — classic football red
// Green: #00A651 — pitch green
// White: #F0EDE8 — warm off-white like parchment

const T = {
  bg: "#0C1220",
  card: "#111B2E",
  card2: "#162038",
  gold: "#C8A84B",
  goldlt: "#E8D48A",
  green: "#00A651",
  red: "#E8002D",
  soft: "#F0EDE8",
  muted: "rgba(240,237,232,.5)",
  dim: "rgba(240,237,232,.25)",
  border: "rgba(240,237,232,.08)",
  borderGold: "rgba(200,168,75,.25)",
};

export default function Page() {
  return (
    <div style={{background:T.bg, minHeight:"100vh", color:T.soft}}>

      {/* HERO — trophy gold themed */}
      <div style={{
        position:"relative", overflow:"hidden",
        padding:"clamp(32px,5vw,56px) 16px",
        textAlign:"center",
        borderBottom:`1px solid ${T.borderGold}`,
        background:`radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200,168,75,.08), transparent 70%)`,
      }}>
        {/* Decorative lines */}
        <div style={{position:"absolute",inset:0,backgroundImage:`repeating-linear-gradient(rgba(200,168,75,.03) 0,rgba(200,168,75,.03) 1px,transparent 1px,transparent 80px)`,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:T.gold,letterSpacing:".25em",marginBottom:"10px",opacity:.7}}>🏆 FIFA WORLD CUP 2026 · INDIA'S GUIDE</div>
          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(38px,9vw,80px)",letterSpacing:"5px",color:T.soft,lineHeight:1,marginBottom:"8px"}}>
            SEMI-<span style={{color:T.gold}}>FINALS</span>
          </h1>
          <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:600,color:T.muted,marginBottom:"24px",letterSpacing:".06em"}}>
            4 teams · 2 tickets to the World Cup Final · All times IST 🇮🇳
          </p>
          <div style={{display:"flex",justifyContent:"center",gap:"clamp(20px,5vw,40px)",flexWrap:"wrap"}}>
            {[["France","Spain","🇫🇷🆚🇪🇸"],["England","Argentina","🏴󠁧󠁢󠁥󠁮󠁧󠁿🆚🇦🇷"],["Jul 19","THE FINAL","🏆"]].map(([a,b,c])=>(
              <div key={b} style={{textAlign:"center"}}>
                <div style={{fontSize:"clamp(20px,4vw,28px)",marginBottom:"3px"}}>{c}</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(13px,2.5vw,18px)",letterSpacing:"2px",color:T.soft,lineHeight:1}}>{a}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:T.dim,letterSpacing:".1em"}}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:"780px",margin:"0 auto",padding:"24px 14px 100px"}}>

        {/* IST GUIDE BOX */}
        <div style={{background:`rgba(200,168,75,.06)`,border:`1px solid ${T.borderGold}`,borderRadius:"12px",padding:"14px 16px",marginBottom:"24px",display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",background:"rgba(200,168,75,.1)",border:`1px solid ${T.borderGold}`,borderRadius:"8px",padding:"8px 14px",flexShrink:0}}>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:T.gold,letterSpacing:".1em"}}>IST NOW</span>
            <ISTClock/>
          </div>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:800,color:T.soft,marginBottom:"2px"}}>Both Semi-Finals kick off at 12:30 AM IST</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:T.muted}}>Set your alarm tonight. These are the two biggest matches of the tournament. 📺 Watch on Zee5 India</div>
          </div>
        </div>

        {/* SEMI FINAL CARDS */}
        <Sh gold title="⚽ THE SEMI-FINALS" right="2 MATCHES · 2 TICKETS"/>
        {SF.map(m => <SFCard key={m.num} m={m}/>)}

        {/* FINAL */}
        <div style={{
          background:`linear-gradient(135deg, rgba(200,168,75,.08), rgba(200,168,75,.04), rgba(200,168,75,.08))`,
          border:`2px solid ${T.borderGold}`,
          borderRadius:"16px",padding:"28px",textAlign:"center",marginBottom:"28px",
          position:"relative",overflow:"hidden",
        }}>
          <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(circle at 50% 0%,rgba(200,168,75,.1),transparent 60%)`,pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{fontSize:"40px",marginBottom:"10px"}}>🏆</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:T.gold,letterSpacing:".25em",marginBottom:"8px",opacity:.7}}>THE MOMENT EVERYTHING BUILDS TO</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(32px,7vw,60px)",letterSpacing:"5px",color:T.soft,marginBottom:"6px"}}>THE FINAL</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(18px,4vw,32px)",letterSpacing:"3px",color:T.gold,marginBottom:"12px"}}>SUN 20 JUL · 12:30 AM IST</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:T.muted,marginBottom:"4px"}}>MetLife Stadium · East Rutherford, New Jersey</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:T.dim}}>The first Final of the 48-team era · 82,500 fans · July 19, 2026</div>
            <div style={{marginTop:"14px"}}>
              <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=🏆+FIFA+World+Cup+2026+FINAL&dates=20260719T190000Z/20260719T210000Z&details=FIFA+WC+2026+Final+Zee5+India+kickoffist.com" target="_blank" rel="noopener noreferrer"
                style={{display:"inline-flex",alignItems:"center",gap:"8px",background:T.gold,color:"#0C1220",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,letterSpacing:".1em",padding:"12px 24px",borderRadius:"10px",textDecoration:"none",boxShadow:`0 4px 20px rgba(200,168,75,.3)`}}>
                ⏰ REMIND ME FOR THE FINAL
              </a>
            </div>
          </div>
        </div>

        {/* THIRD PLACE */}
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"12px",padding:"14px 16px",marginBottom:"28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}}>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:T.dim,letterSpacing:".1em",marginBottom:"3px"}}>🥉 THIRD PLACE PLAY-OFF</div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"2px",color:T.muted}}>SAT 19 JUL · 10:30 PM IST</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",color:T.dim}}>Hard Rock Stadium · Miami Gardens, FL</div>
          </div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:700,color:T.dim}}>SF losers compete for bronze 🥉</div>
        </div>

        {/* QF RESULTS */}
        <Sh gold={false} title="✅ QF RESULTS" right="ALL DONE"/>
        <div style={{marginBottom:"28px"}}>
          {QF_RESULTS.map(r=>(
            <div key={r.h} style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.green}`,borderRadius:"10px",padding:"10px 14px",marginBottom:"6px",display:"flex",alignItems:"center",gap:"10px"}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"16px",fontWeight:700,color:T.soft,display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
                  {r.h} <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",color:T.green,letterSpacing:"1px"}}>{r.s}</span> {r.a}
                </div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:T.dim,marginTop:"2px"}}>{r.n}</div>
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:T.dim,textAlign:"right",flexShrink:0,lineHeight:1.5}}>{r.d}</div>
            </div>
          ))}
        </div>

        {/* GOLDEN BOOT */}
        <Sh gold title="⚽ GOLDEN BOOT" right="JUL 12 · LIVE"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:"8px",marginBottom:"28px"}}>
          {BOOT.map((b,i)=>(
            <div key={b.n} style={{background:T.card,border:`1px solid ${i<2?T.borderGold:T.border}`,borderRadius:"10px",padding:"12px",display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",color:i<2?T.gold:"rgba(240,237,232,.2)",width:"16px",flexShrink:0}}>{i+1}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:"14px",marginBottom:"1px"}}>{b.f}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,color:i<2?T.soft:"rgba(240,237,232,.45)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.n}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",color:T.dim,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.t}</div>
              </div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"26px",color:i<2?T.gold:"rgba(240,237,232,.35)",flexShrink:0,lineHeight:1}}>{b.g}</div>
            </div>
          ))}
        </div>

        {/* WATCH */}
        <div style={{background:`rgba(200,168,75,.05)`,border:`1px solid ${T.borderGold}`,borderRadius:"12px",padding:"16px",textAlign:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"3px",color:T.gold,marginBottom:"8px"}}>📺 WATCH IN INDIA</div>
          <div style={{display:"inline-block",background:"rgba(200,168,75,.1)",border:`1px solid ${T.borderGold}`,borderRadius:"8px",padding:"8px 20px",fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",color:T.gold,letterSpacing:"3px",marginBottom:"6px"}}>ZEE5</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:T.dim}}>Exclusive FIFA WC 2026 rights · Every match live · zee5.com</div>
        </div>

      </div>
    </div>
  );
}

function Sh({gold,title,right}:{gold:boolean;title:string;right:string}) {
  const color = gold ? "#C8A84B" : "#00A651";
  return (
    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"17px",letterSpacing:"3px",color,display:"flex",alignItems:"center",gap:"10px",padding:"16px 0 10px",borderBottom:`1px solid ${color}22`,marginBottom:"14px"}}>
      {title}
      <div style={{flex:1,height:"1px",background:"rgba(240,237,232,.07)"}}/>
      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,background:`${color}15`,color,border:`1px solid ${color}30`,padding:"2px 8px",borderRadius:"20px"}}>{right}</span>
    </div>
  );
}

function SFCard({m}:{m:typeof SF[0]}) {
  const T = {gold:"#C8A84B",soft:"#F0EDE8",muted:"rgba(240,237,232,.5)",dim:"rgba(240,237,232,.25)",card:"#111B2E",border:"rgba(240,237,232,.08)",borderGold:"rgba(200,168,75,.25)",red:"#E8002D"};
  const F = (n:string) => `https://flagcdn.com/96x72/${({"France":"fr","Spain":"es","England":"gb-eng","Argentina":"ar","Morocco":"ma","Belgium":"be","Norway":"no","Switzerland":"ch"})[n]||"un"}.png`;
  return (
    <div style={{background:T.card,border:`2px solid ${T.borderGold}`,borderRadius:"16px",overflow:"hidden",marginBottom:"24px",boxShadow:`0 8px 40px rgba(200,168,75,.08)`}}>
      {/* Top bar */}
      <div style={{background:"rgba(200,168,75,.06)",padding:"10px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${T.borderGold}`}}>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:T.gold,letterSpacing:".1em"}}>🏆 SEMI-FINAL {m.num}</span>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:T.gold}}>{m.ist}</span>
      </div>

      {/* Teams */}
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",alignItems:"center",padding:"28px 18px 18px",gap:"8px"}}>
        <div style={{textAlign:"center"}}>
          <img src={F(m.home)} alt={m.home} style={{width:"clamp(56px,11vw,88px)",borderRadius:"8px",border:"2px solid rgba(200,168,75,.2)",display:"block",margin:"0 auto 10px",boxShadow:"0 8px 24px rgba(0,0,0,.4)"}} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(14px,3vw,24px)",letterSpacing:"2px",color:T.soft}}>{m.home}</div>
        </div>
        <div style={{textAlign:"center",padding:"0 8px"}}>
          <div style={{background:T.gold,color:"#0C1220",fontFamily:"'Bebas Neue',sans-serif",fontSize:"12px",letterSpacing:"2px",padding:"3px 14px",borderRadius:"20px",display:"inline-block",marginBottom:"10px"}}>{m.date}</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(24px,5vw,44px)",letterSpacing:"2px",color:T.gold,lineHeight:1,textShadow:`0 0 30px rgba(200,168,75,.4)`}}>{m.ist.replace(" IST","")}</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:T.dim,marginTop:"3px",letterSpacing:".12em"}}>IST</div>
        </div>
        <div style={{textAlign:"center"}}>
          <img src={F(m.away)} alt={m.away} style={{width:"clamp(56px,11vw,88px)",borderRadius:"8px",border:"2px solid rgba(200,168,75,.2)",display:"block",margin:"0 auto 10px",boxShadow:"0 8px 24px rgba(0,0,0,.4)"}} onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(14px,3vw,24px)",letterSpacing:"2px",color:T.soft}}>{m.away}</div>
        </div>
      </div>
      <div style={{textAlign:"center",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:T.dim,padding:"0 18px 14px"}}>📍 {m.venue}</div>

      {/* Article */}
      <div style={{padding:"0 18px 18px"}}>
        <h2 style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"clamp(18px,3.5vw,23px)",fontWeight:900,color:T.soft,lineHeight:1.3,marginBottom:"10px"}}>{m.headline}</h2>
        <p style={{fontSize:"13px",color:T.muted,lineHeight:1.75,marginBottom:"16px"}}>{m.lead}</p>

        {/* Form grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"12px"}}>
          {[{label:`${m.home.toUpperCase()} FORM`,text:m.homeForm},{label:`${m.away.toUpperCase()} FORM`,text:m.awayForm}].map(block=>(
            <div key={block.label} style={{background:"rgba(255,255,255,.03)",border:`1px solid ${T.border}`,borderRadius:"10px",padding:"10px 12px"}}>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:T.dim,letterSpacing:".12em",marginBottom:"4px"}}>{block.label}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:T.muted,lineHeight:1.5}}>{block.text}</div>
            </div>
          ))}
        </div>

        {/* Key battle */}
        <div style={{background:"rgba(255,255,255,.02)",border:`1px solid ${T.border}`,borderRadius:"10px",padding:"10px 12px",marginBottom:"12px"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:T.dim,letterSpacing:".12em",marginBottom:"4px"}}>⚔️ KEY BATTLE</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:800,color:T.soft}}>{m.battle}</div>
        </div>

        {/* Two star players */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"12px"}}>
          {[{flag:m.starFlag,name:m.starName,note:m.starNote},{flag:m.starFlag2,name:m.starName2,note:m.starNote2}].map(star=>(
            <div key={star.name} style={{background:`rgba(200,168,75,.05)`,border:`1px solid ${T.borderGold}`,borderRadius:"10px",padding:"12px"}}>
              <div style={{fontSize:"22px",marginBottom:"4px"}}>{star.flag}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:T.gold,letterSpacing:".1em",marginBottom:"3px",opacity:.7}}>⭐ WATCH</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:900,color:T.gold,marginBottom:"5px",lineHeight:1.2}}>{star.name}</div>
              <div style={{fontSize:"11px",color:T.muted,lineHeight:1.5}}>{star.note}</div>
            </div>
          ))}
        </div>

        {/* Our read */}
        <div style={{background:`rgba(232,0,45,.04)`,border:`1px solid rgba(232,0,45,.12)`,borderRadius:"10px",padding:"14px",marginBottom:"16px"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:"rgba(232,0,45,.7)",letterSpacing:".14em",marginBottom:"6px"}}>🔮 OUR READ — AS A FOOTBALL LOVER</div>
          <p style={{fontSize:"13px",fontWeight:600,color:T.muted,lineHeight:1.7}}>{m.read}</p>
        </div>

        {/* Buttons */}
        <div style={{display:"flex",gap:"8px"}}>
          <a href={m.gcal} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"7px",background:T.gold,borderRadius:"10px",padding:"14px",textDecoration:"none",boxShadow:`0 4px 20px rgba(200,168,75,.3)`}}>
            <span>⏰</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#0C1220",letterSpacing:".1em"}}>SET ALARM</span>
          </a>
          <a href={`https://wa.me/?text=${encodeURIComponent(m.wa)}`} target="_blank" rel="noopener noreferrer" style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"7px",background:"rgba(37,211,102,.1)",border:"1px solid rgba(37,211,102,.25)",borderRadius:"10px",padding:"14px",textDecoration:"none"}}>
            <span>💬</span><span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#25d366",letterSpacing:".1em"}}>WHATSAPP</span>
          </a>
        </div>
      </div>
    </div>
  );
}
