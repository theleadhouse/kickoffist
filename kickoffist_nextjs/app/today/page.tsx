"use client";
import { useEffect, useState } from "react";

function Clock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => {
      const d = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      setT(`${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`);
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"3px",color:"#FF6B00"}}>{t} <span style={{fontSize:"13px",color:"#999",letterSpacing:"1px"}}>IST</span></span>;
}

const FLAGS: Record<string,string> = {
  France:"fr", Spain:"es", England:"gb-eng", Argentina:"ar"
};
const F = (n: string) => `https://flagcdn.com/128x96/${FLAGS[n]||"un"}.png`;

const MATCHES = [
  {
    stage: "SEMI-FINAL 1",
    home: "France",
    away: "Spain",
    day: "TUESDAY",
    date: "15 JULY 2026",
    time: "12:30 AM",
    venue: "AT&T Stadium · Dallas, Texas",
    color: "#1a3a6b",
    tag: "🇫🇷 vs 🇪🇸",
    fact1: "France: 7 wins, 0 losses. Mbappé 9 goals.",
    fact2: "Spain: 0 goals conceded in 7 games. Yamal, 18.",
    mustSee: "Mbappé vs Lamine Yamal — the match of the tournament",
    gcal: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+France+vs+Spain+WC+Semi-Final&dates=20260714T190000Z/20260714T210000Z",
    wa: "⚽ France 🇫🇷 vs Spain 🇪🇸\n🏆 WC 2026 Semi-Final\n📅 Tuesday 15 July · 12:30 AM IST\n📺 Zee5 India\nkickoffist.com 🇮🇳",
  },
  {
    stage: "SEMI-FINAL 2",
    home: "England",
    away: "Argentina",
    day: "WEDNESDAY",
    date: "16 JULY 2026",
    time: "12:30 AM",
    venue: "Mercedes-Benz Stadium · Atlanta, Georgia",
    color: "#1a1a3a",
    tag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 vs 🇦🇷",
    fact1: "England: Bellingham scored in every knockout game.",
    fact2: "Argentina: Messi 8 goals. Defending champions.",
    mustSee: "1966 vs 1986 — the greatest rivalry in World Cup history",
    gcal: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+England+vs+Argentina+WC+Semi-Final&dates=20260715T190000Z/20260715T210000Z",
    wa: "⚽ England 🏴󠁧󠁢󠁥󠁮󠁧󠁿 vs Argentina 🇦🇷\n🏆 WC 2026 Semi-Final\n📅 Wednesday 16 July · 12:30 AM IST\n📺 Zee5 India\nkickoffist.com 🇮🇳",
  },
];

export default function Page() {
  const [copied, setCopied] = useState<number|null>(null);

  function share(txt: string, idx: number) {
    navigator.clipboard.writeText(txt).then(() => {
      setCopied(idx);
      setTimeout(() => setCopied(null), 2000);
    }).catch(() => {});
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f8f4ef 0%, #fff8f2 50%, #f4f0eb 100%)",
      color: "#1a1a1a",
      fontFamily: "'Inter', sans-serif",
    }}>

      {/* TOP BAR */}
      <div style={{
        background: "#1a1a2e",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "10px",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{background:"#FF6B00",width:"40px",height:"40px",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",color:"#fff",lineHeight:1}}>K</span>
          </div>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"4px",color:"#fff",lineHeight:1}}>KICKOFF<span style={{color:"#FF6B00"}}>IST</span></div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"rgba(255,255,255,.4)",letterSpacing:".1em"}}>FOOTBALL IN YOUR TIME 🇮🇳</div>
          </div>
        </div>
        <Clock/>
      </div>

      {/* NAV */}
      <div style={{background:"#fff",borderBottom:"2px solid #f0ede8",display:"flex",overflowX:"auto",scrollbarWidth:"none"}}>
        {[["⚽","WC SEMIS","/today"],["🏆","NEXT SEASON","/next-season"],["📋","RESULTS","/results"],["📊","TABLES","/standings"]].map(([icon,label,href])=>(
          <a key={href} href={href} style={{
            display:"flex",alignItems:"center",gap:"6px",
            padding:"12px 20px",whiteSpace:"nowrap",textDecoration:"none",flexShrink:0,
            fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,letterSpacing:".1em",
            color:href==="/today"?"#FF6B00":"#666",
            borderBottom:href==="/today"?"3px solid #FF6B00":"3px solid transparent",
            background:href==="/today"?"rgba(255,107,0,.04)":"transparent",
          }}>{icon} {label}</a>
        ))}
      </div>

      <div style={{maxWidth:"680px",margin:"0 auto",padding:"24px 16px 100px"}}>

        {/* HEADLINE */}
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{
            display:"inline-block",
            background:"#FF6B00",color:"#fff",
            fontFamily:"'Bebas Neue',sans-serif",fontSize:"13px",letterSpacing:"3px",
            padding:"5px 18px",borderRadius:"30px",marginBottom:"14px",
          }}>🏆 FIFA WORLD CUP 2026</div>
          <h1 style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(48px,10vw,80px)",
            letterSpacing:"4px",color:"#1a1a2e",lineHeight:1,marginBottom:"10px",
          }}>SEMI-FINALS</h1>
          <p style={{
            fontFamily:"'Barlow Condensed',sans-serif",
            fontSize:"18px",fontWeight:700,color:"#666",
            letterSpacing:".04em",marginBottom:"0",
          }}>2 matches · 2 tickets to the World Cup Final · All times IST 🇮🇳</p>
        </div>

        {/* MATCH CARDS */}
        {MATCHES.map((m, idx) => (
          <div key={m.stage} style={{
            background:"#fff",
            borderRadius:"20px",
            overflow:"hidden",
            marginBottom:"24px",
            boxShadow:"0 4px 40px rgba(0,0,0,.1)",
            border:"1px solid rgba(0,0,0,.06)",
          }}>
            {/* Stage banner */}
            <div style={{
              background:m.color,
              padding:"12px 20px",
              display:"flex",alignItems:"center",justifyContent:"space-between",
            }}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"3px",color:"rgba(255,255,255,.7)"}}>{m.stage}</span>
              <span style={{fontSize:"22px"}}>{m.tag}</span>
            </div>

            {/* DATE + TIME — BIG */}
            <div style={{
              background:"linear-gradient(135deg,#1a1a2e,#2d1a4a)",
              padding:"20px",
              textAlign:"center",
            }}>
              <div style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:"clamp(13px,3vw,16px)",
                letterSpacing:"4px",color:"rgba(255,255,255,.5)",
                marginBottom:"4px",
              }}>{m.day}</div>
              <div style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:"clamp(26px,5vw,38px)",
                letterSpacing:"3px",color:"#fff",
                lineHeight:1,marginBottom:"6px",
              }}>{m.date}</div>
              <div style={{
                fontFamily:"'Bebas Neue',sans-serif",
                fontSize:"clamp(52px,12vw,88px)",
                letterSpacing:"4px",color:"#FF6B00",
                lineHeight:1,textShadow:"0 0 40px rgba(255,107,0,.4)",
              }}>{m.time}</div>
              <div style={{
                fontFamily:"'Barlow Condensed',sans-serif",
                fontSize:"16px",fontWeight:800,
                color:"rgba(255,255,255,.5)",letterSpacing:".12em",
                marginTop:"4px",
              }}>INDIAN STANDARD TIME</div>
              <div style={{
                fontFamily:"'Barlow Condensed',sans-serif",
                fontSize:"12px",fontWeight:600,
                color:"rgba(255,255,255,.3)",marginTop:"6px",
              }}>📍 {m.venue}</div>
            </div>

            {/* FLAGS + TEAMS — BIG */}
            <div style={{
              padding:"28px 20px",
              display:"grid",
              gridTemplateColumns:"1fr auto 1fr",
              alignItems:"center",
              gap:"12px",
              background:"#fff",
            }}>
              <div style={{textAlign:"center"}}>
                <img src={F(m.home)} alt={m.home}
                  style={{width:"clamp(72px,14vw,110px)",height:"auto",borderRadius:"10px",boxShadow:"0 6px 24px rgba(0,0,0,.15)",display:"block",margin:"0 auto 12px"}}
                  onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(20px,4vw,32px)",letterSpacing:"2px",color:"#1a1a2e",lineHeight:1}}>{m.home}</div>
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(32px,6vw,48px)",letterSpacing:"3px",color:"#ccc",lineHeight:1}}>VS</div>
              </div>
              <div style={{textAlign:"center"}}>
                <img src={F(m.away)} alt={m.away}
                  style={{width:"clamp(72px,14vw,110px)",height:"auto",borderRadius:"10px",boxShadow:"0 6px 24px rgba(0,0,0,.15)",display:"block",margin:"0 auto 12px"}}
                  onError={e=>{(e.target as HTMLImageElement).style.display="none";}}/>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(20px,4vw,32px)",letterSpacing:"2px",color:"#1a1a2e",lineHeight:1}}>{m.away}</div>
              </div>
            </div>

            {/* FACTS */}
            <div style={{padding:"0 20px 20px",display:"flex",flexDirection:"column",gap:"8px"}}>
              {[m.fact1, m.fact2].map((f,i)=>(
                <div key={i} style={{
                  background:"#f8f4ef",border:"1px solid #eee",borderRadius:"10px",
                  padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:"10px",
                }}>
                  <span style={{color:"#FF6B00",fontSize:"18px",flexShrink:0,lineHeight:1}}>⚽</span>
                  <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"16px",fontWeight:700,color:"#333",lineHeight:1.4}}>{f}</span>
                </div>
              ))}
              <div style={{
                background:"#fff3e0",border:"2px solid #FF6B00",borderRadius:"10px",
                padding:"12px 16px",display:"flex",alignItems:"flex-start",gap:"10px",
              }}>
                <span style={{fontSize:"18px",flexShrink:0,lineHeight:1}}>🔥</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"16px",fontWeight:800,color:"#FF6B00",lineHeight:1.4}}>{m.mustSee}</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div style={{padding:"0 20px 20px",display:"flex",gap:"8px"}}>
              <a href={m.gcal} target="_blank" rel="noopener noreferrer" style={{
                flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",
                background:"#FF6B00",borderRadius:"12px",padding:"15px",textDecoration:"none",
                boxShadow:"0 4px 20px rgba(255,107,0,.3)",
              }}>
                <span style={{fontSize:"20px"}}>⏰</span>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"2px",color:"#fff"}}>SET ALARM</span>
              </a>
              <button onClick={()=>share(m.wa, idx)} style={{
                flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",
                background:copied===idx?"#e8f5e9":"#f8f4ef",
                border:copied===idx?"2px solid #4caf50":"2px solid #e0dbd5",
                borderRadius:"12px",padding:"15px",cursor:"pointer",transition:"all .15s",
              }}>
                <span style={{fontSize:"20px"}}>{copied===idx?"✅":"📤"}</span>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"2px",color:copied===idx?"#4caf50":"#666"}}>{copied===idx?"COPIED":"SHARE"}</span>
              </button>
              <a href={`https://wa.me/?text=${encodeURIComponent(m.wa)}`} target="_blank" rel="noopener noreferrer" style={{
                flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",
                background:"#e8f5e9",border:"2px solid #4caf50",
                borderRadius:"12px",padding:"15px",textDecoration:"none",
              }}>
                <span style={{fontSize:"20px"}}>💬</span>
                <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"2px",color:"#2e7d32"}}>WA</span>
              </a>
            </div>
          </div>
        ))}

        {/* THE FINAL */}
        <div style={{
          background:"linear-gradient(135deg,#1a1a2e,#2d1a4a)",
          borderRadius:"20px",padding:"30px 20px",textAlign:"center",
          boxShadow:"0 8px 40px rgba(0,0,0,.2)",
          border:"2px solid rgba(255,107,0,.3)",
          marginBottom:"24px",
        }}>
          <div style={{fontSize:"48px",marginBottom:"12px"}}>🏆</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,color:"rgba(255,107,0,.6)",letterSpacing:".2em",marginBottom:"8px"}}>THE BIGGEST MATCH IN HISTORY</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(36px,7vw,60px)",letterSpacing:"5px",color:"#fff",marginBottom:"8px",lineHeight:1}}>THE FINAL</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(22px,4vw,36px)",letterSpacing:"3px",color:"#FF6B00",marginBottom:"10px"}}>SUNDAY 20 JULY</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(40px,8vw,64px)",letterSpacing:"4px",color:"#FF6B00",lineHeight:1,textShadow:"0 0 40px rgba(255,107,0,.4)",marginBottom:"8px"}}>12:30 AM IST</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:700,color:"rgba(255,255,255,.5)",marginBottom:"4px"}}>MetLife Stadium · East Rutherford, New Jersey</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.3)",marginBottom:"20px"}}>82,500 fans · The first Final of the 48-team era</div>
          <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=🏆+FIFA+World+Cup+2026+FINAL&dates=20260719T190000Z/20260719T210000Z&details=FIFA+WC+2026+Final+12:30+AM+IST+Zee5+India" target="_blank" rel="noopener noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:"8px",background:"#FF6B00",color:"#fff",fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"2px",padding:"14px 28px",borderRadius:"12px",textDecoration:"none",boxShadow:"0 4px 20px rgba(255,107,0,.4)"}}>
            ⏰ REMIND ME FOR THE FINAL
          </a>
        </div>

        {/* QF RESULTS */}
        <div style={{background:"#fff",borderRadius:"16px",padding:"20px",boxShadow:"0 2px 20px rgba(0,0,0,.06)",marginBottom:"24px",border:"1px solid rgba(0,0,0,.06)"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"3px",color:"#1a1a2e",marginBottom:"16px",paddingBottom:"10px",borderBottom:"2px solid #f0ede8"}}>✅ QUARTER-FINAL RESULTS</div>
          {[
            {h:"France 🇫🇷",s:"2–0",a:"🇲🇦 Morocco",n:"Mbappé · Dembélé",d:"Thu 10 Jul · 1:30 AM IST"},
            {h:"Spain 🇪🇸",s:"2–1",a:"🇧🇪 Belgium",n:"Cubarsí · Merino 88'",d:"Fri 11 Jul · 12:30 AM IST"},
            {h:"England 🏴󠁧󠁢󠁥󠁮󠁧󠁿",s:"2–1 AET",a:"🇳🇴 Norway",n:"Bellingham ×2",d:"Sat 12 Jul · 2:30 AM IST"},
            {h:"Argentina 🇦🇷",s:"3–1 AET",a:"🇨🇭 Switzerland",n:"Álvarez · Messi · Lautaro",d:"Sat 12 Jul · 6:30 AM IST"},
          ].map(r=>(
            <div key={r.h} style={{
              padding:"12px 0",borderBottom:"1px solid #f5f0eb",
              display:"flex",alignItems:"center",gap:"10px",
            }}>
              <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#4caf50",flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"17px",fontWeight:800,color:"#1a1a2e",display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
                  {r.h} <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",color:"#4caf50",letterSpacing:"1px"}}>{r.s}</span> {r.a}
                </div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"#999",marginTop:"2px"}}>{r.n}</div>
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,color:"#bbb",textAlign:"right",flexShrink:0,lineHeight:1.5}}>{r.d}</div>
            </div>
          ))}
        </div>

        {/* GOLDEN BOOT */}
        <div style={{background:"#fff",borderRadius:"16px",padding:"20px",boxShadow:"0 2px 20px rgba(0,0,0,.06)",marginBottom:"24px",border:"1px solid rgba(0,0,0,.06)"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"3px",color:"#1a1a2e",marginBottom:"16px",paddingBottom:"10px",borderBottom:"2px solid #f0ede8"}}>⚽ GOLDEN BOOT</div>
          {[
            {f:"🇫🇷",n:"Mbappé",t:"France",g:9,top:true},
            {f:"🇳🇴",n:"Haaland",t:"Norway OUT",g:9,top:true},
            {f:"🇦🇷",n:"Messi",t:"Argentina",g:8,top:false},
            {f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",n:"Kane",t:"England",g:6,top:false},
            {f:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",n:"Bellingham",t:"England",g:4,top:false},
          ].map((b,i)=>(
            <div key={b.n} style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:i<4?"1px solid #f5f0eb":"none"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",color:b.top?"#FF6B00":"#ccc",width:"20px",textAlign:"center",flexShrink:0}}>{i+1}</div>
              <div style={{fontSize:"24px",flexShrink:0}}>{b.f}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"18px",fontWeight:800,color:b.top?"#FF6B00":"#1a1a2e"}}>{b.n}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"#999"}}>{b.t}</div>
              </div>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"32px",color:b.top?"#FF6B00":"#ccc",letterSpacing:"1px",flexShrink:0}}>{b.g} <span style={{fontSize:"16px"}}>⚽</span></div>
            </div>
          ))}
        </div>

        {/* NEXT SEASON PROMO */}
        <a href="/next-season" style={{
          display:"block",textDecoration:"none",
          background:"linear-gradient(135deg,#1a1a2e,#1a3a1a)",
          borderRadius:"16px",padding:"24px 20px",
          boxShadow:"0 4px 30px rgba(0,0,0,.15)",
          border:"1px solid rgba(255,107,0,.2)",
        }}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"rgba(255,255,255,.4)",letterSpacing:".16em",marginBottom:"8px"}}>⚡ AFTER THE WORLD CUP</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(24px,5vw,36px)",letterSpacing:"3px",color:"#fff",marginBottom:"6px"}}>PREMIER LEAGUE STARTS AUG 22 →</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:700,color:"rgba(255,255,255,.5)"}}>Arsenal vs Coventry · Champions League from Sep 8 · ISL from Sep · All in IST</div>
          <div style={{marginTop:"14px",display:"inline-flex",alignItems:"center",gap:"8px",background:"#FF6B00",borderRadius:"8px",padding:"10px 18px"}}>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"2px",color:"#fff"}}>SEE NEXT SEASON SCHEDULE →</span>
          </div>
        </a>

        {/* WATCH */}
        <div style={{background:"#fff3e0",borderRadius:"14px",padding:"18px",textAlign:"center",marginTop:"20px",border:"2px solid rgba(255,107,0,.2)"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"3px",color:"#FF6B00",marginBottom:"6px"}}>📺 WATCH IN INDIA</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"28px",letterSpacing:"3px",color:"#FF6B00",marginBottom:"4px"}}>ZEE5</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#666"}}>Exclusive FIFA WC 2026 rights · All matches live · zee5.com</div>
        </div>

      </div>

      {/* BOTTOM NAV */}
      <nav style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"2px solid #f0ede8",display:"flex",boxShadow:"0 -4px 20px rgba(0,0,0,.08)"}}>
        {[["⚽","WC","/today"],["🏆","Next Season","/next-season"],["📋","Results","/results"],["📊","Tables","/standings"]].map(([icon,label,href])=>(
          <a key={href} href={href} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2px",padding:"10px 4px",textDecoration:"none",color:href==="/today"?"#FF6B00":"#999",borderTop:href==="/today"?"3px solid #FF6B00":"3px solid transparent",background:href==="/today"?"rgba(255,107,0,.04)":"transparent"}}>
            <span style={{fontSize:"20px",lineHeight:1}}>{icon}</span>
            <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:700,letterSpacing:".04em"}}>{label}</span>
          </a>
        ))}
      </nav>

    </div>
  );
}
