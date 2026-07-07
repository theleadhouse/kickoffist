import { getStaticWCMatches, getStaticTodayMatches, getStaticTomorrowMatches, getLiveMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";
import HeroMatch from "@/components/HeroMatch";
import LiveSection from "@/components/LiveSection";
import MiniStandings from "@/components/MiniStandings";
import TopScorers from "@/components/TopScorers";
import Link from "next/link";

export const revalidate = 0;

// Match previews - real form, real facts, no betting language
const PREVIEWS: Record<number,{
  headline: string;
  homeForm: string;
  awayForm: string;
  context: string;
  keyBattle: string;
  oneToWatch: {team:string;name:string;note:string};
  prediction: string;
}> = {
  // QF matches
  301:{
    headline:"France vs Morocco — The Atlas Lions seek revenge on Deschamps' side",
    homeForm:"France: Beat Paraguay 1-0, Sweden 3-0, Ivory Coast 2-1. Mbappe with 7 goals. Deschamps' system finally clicking.",
    awayForm:"Morocco: Stunning 3-0 win vs Canada R16. Ounahi, Ziyech, En-Nesyri all scoring. Best African team in WC history.",
    context:"Morocco are the first African nation to reach a WC Quarter-Final since 2022. They knocked out Netherlands in R32. France have won all 4 knockout games since 2018 Final defeat.",
    keyBattle:"Ounahi vs Rabiot in central midfield — the engine rooms of both sides battle for control.",
    oneToWatch:{team:"Morocco",name:"Azzedine Ounahi",note:"The most underrated player at this WC. Scored vs Canada, links everything for Morocco."},
    prediction:"France narrow favourites based on squad depth, but Morocco have defied every prediction. Expect a tight game.",
  },
  302:{
    headline:"Spain vs Belgium — The tournament favourites against Europe's most dangerous attack",
    homeForm:"Spain: Beat Austria 3-0, Portugal 1-0 (Merino 90+1'). Yamal and Oyarzabal in form. Most clinical team left.",
    awayForm:"Belgium: Demolished USA 4-1. De Ketelaere with 3 goals. De Bruyne finally finding his best form of the tournament.",
    context:"Spain have the best defensive record in the tournament — conceded just 1 goal. Belgium's De Bruyne is arguably the best player still standing.",
    keyBattle:"Pedri vs De Bruyne — two of Europe's best midfielders in a generational clash.",
    oneToWatch:{team:"Spain",name:"Lamine Yamal",note:"18 years old. Already the best young player in the world. Spain's creative spark and the player every defender fears."},
    prediction:"Spain are slight favourites — their defensive organisation has been exceptional. But Belgium have the firepower to hurt anyone.",
  },
  303:{
    headline:"Norway vs England — Haaland's machine vs England's Three Lions dream",
    homeForm:"Norway: SHOCK 2-1 win over Brazil. Haaland now with 9 goals — golden boot runaway leader. Odegaard controlling midfield.",
    awayForm:"England: Dramatic 3-2 win in Mexico City. Kane 6 goals, Bellingham match-winner. Tuchel's side improving every game.",
    context:"The biggest shock of the tournament — Norway eliminated Brazil. England's best win on foreign soil in their history in Mexico City. Two sides in brilliant form.",
    keyBattle:"Haaland vs Guehi/Konsa — England's centre-backs must contain the most unstoppable striker on the planet right now.",
    oneToWatch:{team:"Norway",name:"Erling Haaland",note:"9 WC goals. A record-breaking pace. If Norway are to reach the semi-final, it goes through him."},
    prediction:"The most unpredictable QF. Norway have momentum and Haaland. England have experience and depth. Could go either way.",
  },
  304:{
    headline:"Argentina vs Egypt / Switzerland vs Colombia — Last QF spot up for grabs",
    homeForm:"Argentina: Survived Cape Verde scare (3-2 AET). Messi 5 goals but showing age. Lautaro and L.Martinez stepped up.",
    awayForm:"Switzerland: Beat Algeria 2-0 in R32. Xhaka the leader. Compact, organised, dangerous on the counter.",
    context:"Argentina are defending champions but have struggled. Egypt beat Australia on penalties. Switzerland beat Algeria. Colombia beat Ghana 1-0 through Luis Diaz.",
    keyBattle:"Messi vs Xhaka/Freuler — if Argentina face Switzerland. Or Salah vs Diaz in an alternative dream matchup.",
    oneToWatch:{team:"Argentina",name:"Lionel Messi",note:"The greatest of all time playing his final World Cup. 19 career WC goals. Every touch could be his last on this stage."},
    prediction:"Argentina favourites if they come through. Switzerland or Colombia would be a massive upset.",
  },
};

export default async function TodayPage() {
  const [today, tomorrow, all, live] = await Promise.all([
    getStaticTodayMatches(), getStaticTomorrowMatches(),
    getStaticWCMatches(), getLiveMatches(),
  ]);

  const played = all.filter(m=>m.status==="FINISHED").length;
  const todayUp = today.filter(m=>m.status==="UPCOMING"&&m.homeTeam.name!=="TBD");
  const heroMatch = live[0]||todayUp[0]||null;
  const otherToday = todayUp.filter(m=>m.id!==heroMatch?.id);

  const r16Done = all.filter(m=>m.group==="R16"&&m.status==="FINISHED");
  const r16Up = all.filter(m=>m.group==="R16"&&m.status==="UPCOMING"&&m.homeTeam.name!=="TBD")
    .sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime());
  const qfAll = all.filter(m=>m.group==="QF"&&m.homeTeam.name!=="TBD")
    .sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime());
  const qfUp = qfAll.filter(m=>m.status==="UPCOMING");
  const qfDone = qfAll.filter(m=>m.status==="FINISHED");

  const istNow = new Date(Date.now()+5.5*3600000);
  const isMorning = istNow.getUTCHours()>=5&&istNow.getUTCHours()<12;
  const yesterday = new Date(Date.now()+5.5*3600000-86400000).toISOString().slice(0,10);
  const overnight = all.filter(m=>m.status==="FINISHED"&&m.istDate===yesterday)
    .sort((a,b)=>new Date(b.utcDate).getTime()-new Date(a.utcDate).getTime()).slice(0,3);
  const dateStr = istNow.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});

  const FLAGS:Record<string,string>={
    "Argentina":"ar","Brazil":"br","France":"fr","England":"gb-eng","Germany":"de",
    "Spain":"es","Portugal":"pt","Netherlands":"nl","Norway":"no","USA":"us",
    "Morocco":"ma","Colombia":"co","Belgium":"be","Switzerland":"ch",
    "Egypt":"eg","Mexico":"mx",
  };

  return(
    <div>
      {/* MASTHEAD */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0 12px",borderBottom:"1px solid rgba(255,153,51,.12)",marginBottom:"14px",flexWrap:"wrap",gap:"8px"}}>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(11px,2.5vw,13px)",letterSpacing:"4px",color:"rgba(255,153,51,.6)",marginBottom:"2px"}}>
            {qfUp.length>0?"QUARTER-FINALS":"ROUND OF 16"} · FIFA WORLD CUP 2026
          </div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.35)",letterSpacing:".04em"}}>{dateStr} · IST 🇮🇳</div>
        </div>
        <div style={{display:"flex",gap:"14px"}}>
          {[{n:`${r16Done.length}/8`,l:"R16 DONE"},{n:`${played}`,l:"PLAYED"},{n:`${104-played}`,l:"LEFT"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"21px",letterSpacing:"1px",color:"#FF9933",lineHeight:1}}>{s.n}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"8px",fontWeight:700,color:"rgba(255,255,255,.3)",letterSpacing:".1em"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {live.length>0&&<LiveSection initialMatches={live}/>}

      {/* HERO */}
      {heroMatch
        ?<HeroMatch match={heroMatch} played={played} total={104}/>
        :<div style={{background:"linear-gradient(150deg,#0d1f10 0%,#0a1a0c 50%,#080f09 100%)",borderRadius:"16px",padding:"32px 20px",textAlign:"center",marginBottom:"16px",border:"1px solid rgba(0,166,81,.2)"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(22px,4vw,36px)",letterSpacing:"4px",color:"#fff",marginBottom:"6px"}}>🏆 FIFA WORLD CUP 2026</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",color:"rgba(255,255,255,.4)",marginBottom:"16px"}}>Quarter-Finals begin July 9 · {played} matches played</div>
          <div style={{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/results" style={{background:"#FF9933",color:"#000",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"10px 20px",borderRadius:"8px",textDecoration:"none",letterSpacing:".08em"}}>ALL RESULTS →</Link>
            <Link href="/world-cup" style={{background:"rgba(255,255,255,.08)",color:"#fff",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,padding:"10px 20px",borderRadius:"8px",textDecoration:"none",letterSpacing:".08em",border:"1px solid rgba(255,255,255,.12)"}}>BRACKET →</Link>
          </div>
        </div>
      }

      <div style={{display:"grid",gap:"20px"}} className="lg:grid-cols-[1fr_280px]">
        <div>

          {/* OVERNIGHT RESULTS */}
          {isMorning&&overnight.length>0&&(
            <div style={{marginBottom:"18px",background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"12px",overflow:"hidden"}}>
              <div style={{padding:"10px 14px",background:"rgba(255,153,51,.08)",borderBottom:"1px solid rgba(255,153,51,.1)"}}><div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",letterSpacing:"3px",color:"#FF9933"}}>☀️ OVERNIGHT RESULTS</div></div>
              <div style={{padding:"12px"}}>{overnight.map(m=><PortalMatchCard key={m.id} match={m}/>)}</div>
            </div>
          )}

          {/* TODAY UPCOMING */}
          {otherToday.length>0&&(
            <div style={{marginBottom:"18px"}}>
              <div className="sh">⚡ MORE TODAY<span className="badge-up">{otherToday.length}</span><div className="sh-line"/></div>
              {otherToday.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* R16 UPCOMING WITH PREVIEWS */}
          {r16Up.length>0&&(
            <div style={{marginBottom:"22px"}}>
              <div className="sh">
                <span className="badge-r16" style={{fontSize:"12px",padding:"2px 10px"}}>R16</span>
                UPCOMING MATCHES
                <div className="sh-line"/>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:700,color:"rgba(99,102,241,.7)",flexShrink:0}}>{r16Done.length}/8 DONE</span>
              </div>
              {r16Up.map(m=>(
                <div key={m.id} style={{marginBottom:"12px"}}>
                  <PortalMatchCard match={m} showDate/>
                </div>
              ))}
            </div>
          )}

          {/* QF MATCHES WITH DEEP PREVIEWS */}
          {qfUp.length>0&&(
            <div style={{marginBottom:"22px"}}>
              <div className="sh">
                <span style={{background:"#FF9933",color:"#000",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,padding:"2px 10px",borderRadius:"20px",letterSpacing:".06em"}}>QF</span>
                QUARTER-FINALS
                <div className="sh-line"/>
                <Link href="/world-cup" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",flexShrink:0}}>BRACKET →</Link>
              </div>

              {qfUp.map(m=>{
                const preview = PREVIEWS[m.id];
                return(
                  <div key={m.id} style={{marginBottom:"14px"}}>
                    <PortalMatchCard match={m} showDate/>
                    {preview&&(
                      <div style={{background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.1)",borderRadius:"0 0 12px 12px",marginTop:"-6px",padding:"14px",borderTop:"none"}}>
                        {/* Headline */}
                        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:"#fff",letterSpacing:".02em",marginBottom:"10px",lineHeight:1.3}}>{preview.headline}</div>

                        {/* Form */}
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"10px"}}>
                          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"8px",padding:"8px 10px"}}>
                            <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"}}>
                              <img src={`https://flagcdn.com/20x15/${FLAGS[m.homeTeam.name]||"un"}.png`} alt="" style={{width:"20px",borderRadius:"2px"}} onError={e=>{e.currentTarget.style.display="none";}}/>
                              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.5)",letterSpacing:".08em"}}>{m.homeTeam.name.toUpperCase()}</span>
                            </div>
                            <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:500,color:"rgba(255,255,255,.55)",lineHeight:1.5}}>{preview.homeForm}</p>
                          </div>
                          <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"8px",padding:"8px 10px"}}>
                            <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"}}>
                              <img src={`https://flagcdn.com/20x15/${FLAGS[m.awayTeam.name]||"un"}.png`} alt="" style={{width:"20px",borderRadius:"2px"}} onError={e=>{e.currentTarget.style.display="none";}}/>
                              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"rgba(255,255,255,.5)",letterSpacing:".08em"}}>{m.awayTeam.name.toUpperCase()}</span>
                            </div>
                            <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:500,color:"rgba(255,255,255,.55)",lineHeight:1.5}}>{preview.awayForm}</p>
                          </div>
                        </div>

                        {/* Context */}
                        <div style={{background:"rgba(0,166,81,.06)",border:"1px solid rgba(0,166,81,.12)",borderRadius:"8px",padding:"8px 10px",marginBottom:"8px"}}>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"rgba(0,166,81,.8)",letterSpacing:".1em",marginBottom:"3px"}}>⚽ THE STORY</div>
                          <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:500,color:"rgba(255,255,255,.65)",lineHeight:1.5}}>{preview.context}</p>
                        </div>

                        {/* Key battle + One to watch */}
                        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"8px"}}>
                          <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:"8px",padding:"8px 10px"}}>
                            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"rgba(255,255,255,.35)",letterSpacing:".1em",marginBottom:"3px"}}>⚔️ KEY BATTLE</div>
                            <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:500,color:"rgba(255,255,255,.55)",lineHeight:1.5}}>{preview.keyBattle}</p>
                          </div>
                          <div style={{background:"rgba(255,153,51,.05)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"8px",padding:"8px 10px"}}>
                            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"#FF9933",letterSpacing:".1em",marginBottom:"2px"}}>⭐ ONE TO WATCH</div>
                            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,color:"#fff",marginBottom:"2px"}}>{preview.oneToWatch.name} · {preview.oneToWatch.team}</div>
                            <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:500,color:"rgba(255,255,255,.5)",lineHeight:1.4}}>{preview.oneToWatch.note}</p>
                          </div>
                        </div>

                        {/* Prediction */}
                        <div style={{background:"rgba(255,153,51,.08)",border:"1px solid rgba(255,153,51,.15)",borderRadius:"8px",padding:"8px 12px",display:"flex",alignItems:"flex-start",gap:"8px"}}>
                          <span style={{fontSize:"16px",flexShrink:0}}>🔮</span>
                          <div>
                            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"#FF9933",letterSpacing:".1em",marginBottom:"2px"}}>OUR READ</div>
                            <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.7)",lineHeight:1.5}}>{preview.prediction}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* QF DONE */}
          {qfDone.length>0&&(
            <div style={{marginBottom:"18px"}}>
              <div className="sh">✅ QF RESULTS<div className="sh-line"/></div>
              {qfDone.map(m=><PortalMatchCard key={m.id} match={m}/>)}
            </div>
          )}

          {/* R16 DONE */}
          {r16Done.length>0&&(
            <div style={{marginBottom:"18px"}}>
              <div className="sh">
                <span className="badge-r16" style={{fontSize:"11px",padding:"1px 8px"}}>R16</span>
                RESULTS
                <div className="sh-line"/>
                <Link href="/results" style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#FF9933",textDecoration:"none",flexShrink:0}}>ALL →</Link>
              </div>
              {r16Done.slice(0,4).map(m=><PortalMatchCard key={m.id} match={m}/>)}
              {r16Done.length>4&&<Link href="/results" style={{display:"block",textAlign:"center",padding:"10px",fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:800,color:"#FF9933",textDecoration:"none",letterSpacing:".06em"}}>+ {r16Done.length-4} MORE RESULTS →</Link>}
            </div>
          )}

          {/* WATCH */}
          <div style={{background:"rgba(255,153,51,.06)",border:"1px solid rgba(255,153,51,.12)",borderRadius:"12px",padding:"14px",marginBottom:"14px"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",letterSpacing:"3px",color:"#FF9933",marginBottom:"8px"}}>📺 WATCH IN INDIA</div>
            <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
              <div style={{background:"rgba(0,0,0,.3)",border:"1px solid rgba(255,153,51,.18)",borderRadius:"8px",padding:"8px 16px"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"19px",letterSpacing:"3px",color:"#FF9933"}}>ZEE5</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,.45)"}}>Exclusive · India · zee5.com</div>
              </div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",color:"rgba(255,255,255,.35)",lineHeight:1.6}}>Every WC 2026 match live. All times in IST.</div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
            {[
              {href:"/results",  icon:"📋",label:"All Results",  sub:"Every score · Goals"},
              {href:"/world-cup",icon:"🏆",label:"Full Bracket",  sub:"QF · SF · Final"},
              {href:"/standings",icon:"📊",label:"Group Tables",  sub:"Final standings"},
              {href:"/news",     icon:"🇮🇳",label:"IST Guide",   sub:"When to watch"},
            ].map(l=>(
              <Link key={l.href} href={l.href} style={{textDecoration:"none"}}>
                <div className="card card-hover" style={{padding:"13px"}}>
                  <div style={{fontSize:"18px",marginBottom:"4px"}}>{l.icon}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:800,color:"#fff",letterSpacing:".04em"}}>{l.label}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,.3)",marginTop:"2px"}}>{l.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{display:"none"}} className="lg:block">
          <div style={{position:"sticky",top:"76px",display:"flex",flexDirection:"column",gap:"14px"}}>
            <MiniStandings/>
            <TopScorers/>
          </div>
        </div>
      </div>
    </div>
  );
}
