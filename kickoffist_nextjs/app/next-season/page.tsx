"use client";
import { useState } from "react";

// IST offset: BST (UTC+1) + 4:30 = UTC+5:30
// EPL kick-off 12:30 BST = 17:00 IST
// EPL kick-off 15:00 BST = 19:30 IST  
// EPL kick-off 17:30 BST = 22:00 IST
// EPL kick-off 20:00 BST = 00:30 IST next day
// UCL 20:00 CET (UTC+2) = 00:30 IST next day

const LEAGUES = [
  {
    id:"epl",
    name:"Premier League",
    country:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",
    season:"2026–27",
    color:"#3D185F",
    accent:"#E8002D",
    logo:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    startDate:"22 Aug 2026",
    endDate:"30 May 2027",
    broadcaster:"Star Sports / Disney+ Hotstar",
    keyFacts:[
      "Arsenal defending champions — first title in 22 years",
      "20 teams · 38 matchdays · 380 total matches",
      "3 promoted: Coventry City, Hull City, Sunderland",
      "Transfer window: 15 Jun – 1 Sep 2026",
      "Season delayed 1 week due to World Cup",
    ],
    keyDates:[
      {label:"Community Shield",date:"Sun 16 Aug 2026",ist:"8:30 PM IST",note:"Arsenal vs Man City · Principality Stadium, Cardiff"},
      {label:"Season Opener",date:"Fri 21 Aug 2026",ist:"12:30 AM IST (Sat)",note:"Arsenal vs Coventry City · Emirates Stadium"},
      {label:"Gameweek 1",date:"Sat 22 Aug 2026",ist:"6:00 PM–2:30 AM IST",note:"Hull vs Man Utd · Everton vs Palace · Brentford vs Spurs · more"},
      {label:"Gameweek 2",date:"28–30 Aug 2026",ist:"Various IST",note:"Crystal Palace vs Man City · Liverpool vs Nott'm Forest"},
      {label:"Final Day",date:"Sun 30 May 2027",ist:"7:00 PM IST",note:"All 10 games kick off simultaneously"},
    ],
    teams:[
      {name:"Arsenal",flag:"🔴",note:"Defending champions. Saka, Havertz, Odegaard. Can they retain?"},
      {name:"Man City",flag:"🔵",note:"Haaland returns from WC on fire. Guardiola rebuilding after big squad changes."},
      {name:"Liverpool",flag:"🔴",note:"Slot's second season. Salah back from WC. Title contenders."},
      {name:"Chelsea",flag:"🔵",note:"Massive summer spend. New manager. Always unpredictable."},
      {name:"Man United",flag:"🔴",note:"Amorim's revolution continues. Under pressure after WC."},
      {name:"Spurs",flag:"⚪",note:"Postecoglou aiming for European football. Kane gone but Solanke firing."},
    ],
    watchIST:"Most Saturday games: 6:00 PM, 9:30 PM, 11:00 PM IST · Late kick-offs: 1:00–2:30 AM IST · Monday Night Football: 12:30 AM IST",
  },
  {
    id:"ucl",
    name:"UEFA Champions League",
    country:"🌍 Europe",
    season:"2026–27",
    color:"#001489",
    accent:"#C8A84B",
    logo:"⭐",
    startDate:"8 Sep 2026",
    endDate:"5 Jun 2027",
    broadcaster:"Sony Sports / LIV Sports",
    keyFacts:[
      "36 teams in league phase — plays like a league, not groups",
      "Each team plays 8 matches in league phase",
      "Top 8 go straight to Round of 16 · 9–24 play knockouts",
      "Final: Estadio Metropolitano, Madrid — 5 June 2027",
      "PL clubs: Arsenal, Man City, Man Utd, Aston Villa, Liverpool",
    ],
    keyDates:[
      {label:"League Phase Draw",date:"Thu 27 Aug 2026",ist:"6:00 PM IST",note:"All 36 teams discover their 8 opponents"},
      {label:"Matchday 1",date:"8–10 Sep 2026",ist:"12:30 AM IST",note:"Champions League is back! First midweek matches"},
      {label:"Matchday 2",date:"13–14 Oct 2026",ist:"12:30 AM IST",note:"Second round of UCL fixtures"},
      {label:"Matchday 3",date:"20–21 Oct 2026",ist:"12:30 AM IST",note:"Third round"},
      {label:"Matchday 4",date:"3–4 Nov 2026",ist:"12:30 AM IST",note:"Fourth round"},
      {label:"Matchday 5",date:"24–25 Nov 2026",ist:"12:30 AM IST",note:"Fifth round"},
      {label:"Matchday 6",date:"8–9 Dec 2026",ist:"12:30 AM IST",note:"Sixth round"},
      {label:"Matchday 7",date:"19–20 Jan 2027",ist:"12:30 AM IST",note:"Seventh round"},
      {label:"Matchday 8",date:"27 Jan 2027",ist:"12:30 AM IST",note:"Final league phase round — all games same time"},
      {label:"UCL Final",date:"Sat 5 Jun 2027",ist:"12:30 AM IST (Sun)",note:"Estadio Metropolitano · Madrid, Spain"},
    ],
    teams:[
      {name:"Arsenal",flag:"🔴",note:"League phase. Defending EPL champions. Havertz, Saka, Odegaard."},
      {name:"Man City",flag:"🔵",note:"League phase. Haaland back. Always UCL contenders under Guardiola."},
      {name:"Liverpool",flag:"🔴",note:"League phase. Salah's last years at the top. Slot's system."},
      {name:"Real Madrid",flag:"⚪",note:"Always dangerous. Vinicius, Bellingham (on loan?), Mbappé."},
      {name:"Barcelona",flag:"🔵🔴",note:"Yamal at 18 will terrify UCL defenders. Flick's Barcelona are special."},
      {name:"PSG",flag:"🔵🔴",note:"Defending UCL champions. Won on pens vs Arsenal in 2026 final."},
    ],
    watchIST:"All UCL matches kick off 12:30 AM IST (Tuesday/Wednesday nights) · Perfect late night viewing for Indian fans",
  },
  {
    id:"laliga",
    name:"La Liga",
    country:"🇪🇸 Spain",
    season:"2026–27",
    color:"#EE8707",
    accent:"#C8A84B",
    logo:"🇪🇸",
    startDate:"Mid Aug 2026",
    endDate:"Late May 2027",
    broadcaster:"GXR World / Voot",
    keyFacts:[
      "20 teams · 38 matchdays",
      "Real Madrid and Barcelona the perennial title rivals",
      "Lamine Yamal, 18, returns as the biggest WC star",
      "International breaks: Sep 26, Oct 3, Nov 14 weekends off",
      "Fixtures not yet individually confirmed — watch LaLiga.com",
    ],
    keyDates:[
      {label:"Season Start",date:"Mid Aug 2026",ist:"Various IST",note:"Exact opening fixture TBC — LaLiga.com for updates"},
      {label:"El Clásico (approx)",date:"Oct/Nov 2026",ist:"1:30 AM IST",note:"Real Madrid vs Barcelona — date TBC"},
      {label:"Season End",date:"Late May 2027",ist:"Various IST",note:"Final matchday"},
    ],
    teams:[
      {name:"Real Madrid",flag:"⚪",note:"Bellingham back from WC. Vinicius. Mbappé's second full season. Powerhouse."},
      {name:"Barcelona",flag:"🔵🔴",note:"LAMINE YAMAL returns as a WC semi-finalist at 18. Flick's young Barcelona are the most exciting team to watch."},
      {name:"Atlético Madrid",flag:"🔴⚪",note:"Simeone's warriors. Always competitive. Alvarez returns from WC with Argentina."},
      {name:"Athletic Bilbao",flag:"🔴⚪",note:"Williams brothers. Exciting, physical, pure Basque football."},
    ],
    watchIST:"La Liga games typically: Fri 11:30 PM IST · Sat 6:30 PM, 9:00 PM, 1:30 AM IST · Sun 6:30 PM, 9:30 PM IST",
  },
  {
    id:"isl",
    name:"Indian Super League",
    country:"🇮🇳 India",
    season:"2026–27",
    color:"#FF6B00",
    accent:"#FF9933",
    logo:"🇮🇳",
    startDate:"~Sep 2026",
    endDate:"~May 2027",
    broadcaster:"Sports18 / JioCinema (free)",
    keyFacts:[
      "ISL 2026-27 dates not yet officially confirmed",
      "Typically starts mid-September each year",
      "13 clubs competing in India's top division",
      "Mohun Bagan and Mumbai City the powerhouses",
      "Watch for announcement at indiansuperleague.com",
    ],
    keyDates:[
      {label:"Expected Start",date:"~Sep 2026",ist:"7:30 PM IST",note:"Dates TBC — indiansuperleague.com for updates"},
      {label:"AFC Champions League",date:"14 Sep 2026",ist:"Various IST",note:"Indian clubs in AFC Champions League Elite"},
    ],
    teams:[
      {name:"Mohun Bagan",flag:"🟢",note:"India's most successful club. Always UCL-calibre in ISL context."},
      {name:"Mumbai City",flag:"🔵",note:"Des Buckingham's side. Free-flowing football. Always top 3."},
      {name:"Bengaluru FC",flag:"🔵",note:"South India's favourites. Simon Grayson era. Sunil Chhetri legend."},
      {name:"Kerala Blasters",flag:"🟡",note:"Massive fanbase. 65,000 Jawaharlal Nehru stadium. The most passionate fans in India."},
    ],
    watchIST:"ISL games typically 7:30 PM IST weekdays · 5:00 PM & 7:30 PM IST weekends · FREE on JioCinema",
  },
];

const T = {
  bg:"#0C1220", card:"#111B2E", card2:"#162038",
  gold:"#C8A84B", soft:"#F0EDE8",
  muted:"rgba(240,237,232,.55)", dim:"rgba(240,237,232,.28)",
  border:"rgba(240,237,232,.08)", borderGold:"rgba(200,168,75,.2)",
};

function Sh({title,right,color="#C8A84B"}:{title:string;right?:string;color?:string}){
  return(
    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"17px",letterSpacing:"3px",color,display:"flex",alignItems:"center",gap:"10px",padding:"16px 0 10px",borderBottom:`1px solid ${color}22`,marginBottom:"14px"}}>
      {title}
      <div style={{flex:1,height:"1px",background:"rgba(240,237,232,.07)"}}/>
      {right&&<span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,background:`${color}15`,color,border:`1px solid ${color}25`,padding:"2px 8px",borderRadius:"20px"}}>{right}</span>}
    </div>
  );
}

export default function Page(){
  const [active,setActive]=useState("epl");
  const league = LEAGUES.find(l=>l.id===active)!;

  return(
    <div style={{background:T.bg,minHeight:"100vh",color:T.soft}}>

      {/* HERO */}
      <div style={{padding:"clamp(24px,4vw,40px) 16px",textAlign:"center",borderBottom:`1px solid ${T.borderGold}`,background:"radial-gradient(ellipse 80% 50% at 50% 0%,rgba(200,168,75,.07),transparent 70%)"}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:T.gold,letterSpacing:".22em",marginBottom:"8px",opacity:.7}}>⚽ WHAT'S NEXT AFTER THE WORLD CUP</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(34px,7vw,64px)",letterSpacing:"4px",color:T.soft,lineHeight:1,marginBottom:"8px"}}>
          NEXT SEASON <span style={{color:T.gold}}>IN IST</span>
        </h1>
        <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:600,color:T.muted,marginBottom:"0",letterSpacing:".06em"}}>
          Premier League · Champions League · La Liga · ISL — all times for Indian fans 🇮🇳
        </p>
      </div>

      {/* LEAGUE TABS */}
      <div style={{position:"sticky",top:"0",zIndex:10,background:T.bg,borderBottom:`1px solid ${T.borderGold}`,overflowX:"auto",scrollbarWidth:"none"}}>
        <div style={{display:"flex",maxWidth:"780px",margin:"0 auto",padding:"0 14px"}}>
          {LEAGUES.map(l=>(
            <button key={l.id} onClick={()=>setActive(l.id)} style={{
              flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
              gap:"2px",padding:"12px 8px",whiteSpace:"nowrap",cursor:"pointer",
              background:"transparent",border:"none",
              borderBottom:active===l.id?`3px solid ${T.gold}`:"3px solid transparent",
              transition:"all .15s",
            }}>
              <span style={{fontSize:"18px",lineHeight:1}}>{l.logo}</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,letterSpacing:".08em",color:active===l.id?T.gold:T.dim}}>{l.id==="ucl"?"UCL":l.id==="isl"?"ISL":l.id==="laliga"?"LA LIGA":"EPL"}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:"780px",margin:"0 auto",padding:"20px 14px 100px"}}>

        {/* LEAGUE HEADER */}
        <div style={{background:T.card,border:`1px solid ${T.borderGold}`,borderRadius:"14px",padding:"20px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap"}}>
          <div style={{fontSize:"48px",lineHeight:1,flexShrink:0}}>{league.logo}</div>
          <div style={{flex:1,minWidth:"200px"}}>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(22px,4vw,36px)",letterSpacing:"3px",color:T.soft,lineHeight:1,marginBottom:"4px"}}>{league.name}</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:700,color:T.gold,marginBottom:"4px"}}>{league.season} · {league.country}</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:T.muted}}>{league.startDate} → {league.endDate}</div>
          </div>
          <div style={{background:`rgba(200,168,75,.08)`,border:`1px solid ${T.borderGold}`,borderRadius:"10px",padding:"10px 14px",textAlign:"center",flexShrink:0}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:800,color:T.dim,letterSpacing:".12em",marginBottom:"3px"}}>📺 IN INDIA</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:T.gold,lineHeight:1.3}}>{league.broadcaster}</div>
          </div>
        </div>

        {/* KEY FACTS */}
        <Sh title="📋 KEY FACTS" color={T.gold}/>
        <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"20px"}}>
          {league.keyFacts.map((f,i)=>(
            <div key={i} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"10px 14px",display:"flex",alignItems:"flex-start",gap:"10px"}}>
              <span style={{color:T.gold,fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",lineHeight:1,flexShrink:0,marginTop:"1px"}}>→</span>
              <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:600,color:T.muted,lineHeight:1.5}}>{f}</span>
            </div>
          ))}
        </div>

        {/* IST WATCH GUIDE */}
        <div style={{background:`rgba(200,168,75,.05)`,border:`1px solid ${T.borderGold}`,borderRadius:"12px",padding:"14px 16px",marginBottom:"20px"}}>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:T.gold,letterSpacing:".14em",marginBottom:"6px"}}>🕐 WHEN TO WATCH IN IST</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:700,color:T.soft,lineHeight:1.6}}>{league.watchIST}</div>
        </div>

        {/* KEY DATES */}
        <Sh title="📅 KEY DATES IN IST" color={T.gold}/>
        <div style={{marginBottom:"20px"}}>
          {league.keyDates.map((d,i)=>(
            <div key={i} style={{background:T.card,border:`1px solid ${T.border}`,borderLeft:`3px solid ${T.gold}`,borderRadius:"10px",padding:"12px 14px",marginBottom:"7px",display:"flex",gap:"14px",alignItems:"flex-start"}}>
              <div style={{flexShrink:0,textAlign:"right",minWidth:"80px"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"15px",letterSpacing:"1px",color:T.gold,lineHeight:1}}>{d.ist}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"9px",fontWeight:700,color:T.dim,marginTop:"2px"}}>{d.date}</div>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"15px",fontWeight:800,color:T.soft,marginBottom:"3px"}}>{d.label}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:600,color:T.muted}}>{d.note}</div>
              </div>
            </div>
          ))}
        </div>

        {/* KEY TEAMS / PLAYERS */}
        <Sh title="⭐ TEAMS TO WATCH" color={T.gold}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"8px",marginBottom:"24px"}}>
          {league.teams.map((team,i)=>(
            <div key={team.name} style={{background:T.card,border:`1px solid ${i<2?T.borderGold:T.border}`,borderRadius:"10px",padding:"14px"}}>
              <div style={{fontSize:"28px",marginBottom:"6px",lineHeight:1}}>{team.flag}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"17px",fontWeight:900,color:i<2?T.gold:T.soft,marginBottom:"5px"}}>{team.name}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:600,color:T.muted,lineHeight:1.5}}>{team.note}</div>
            </div>
          ))}
        </div>

        {/* ALL LEAGUES OVERVIEW */}
        <Sh title="📺 ALL LEAGUES AT A GLANCE" color={T.gold}/>
        <div style={{display:"flex",flexDirection:"column",gap:"7px",marginBottom:"24px"}}>
          {[
            {name:"Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿",start:"21 Aug 2026",ist:"Starts 12:30 AM IST (Fri night)",tv:"Star Sports / Disney+ Hotstar"},
            {name:"Champions League 🌍",start:"8 Sep 2026",ist:"All games 12:30 AM IST (Tue/Wed)",tv:"Sony Sports / LIV Sports"},
            {name:"La Liga 🇪🇸",start:"Mid Aug 2026",ist:"Fri 11:30 PM · Sat/Sun various IST",tv:"GXR World / Voot"},
            {name:"ISL 🇮🇳",start:"~Sep 2026",ist:"7:30 PM IST most days",tv:"Sports18 / JioCinema (FREE)"},
            {name:"Bundesliga 🇩🇪",start:"Aug 2026",ist:"Fri 11:30 PM · Sat 6:30 PM IST",tv:"Sony Sports"},
            {name:"Serie A 🇮🇹",start:"Aug 2026",ist:"Sat/Sun evenings IST",tv:"Sony Sports"},
          ].map(l=>(
            <div key={l.name} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"10px 14px",display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
              <div style={{flex:1,minWidth:"140px"}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:800,color:T.soft}}>{l.name}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:T.dim}}>Starts: {l.start}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:700,color:T.gold}}>{l.ist}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:600,color:T.dim}}>📺 {l.tv}</div>
              </div>
            </div>
          ))}
        </div>

        {/* SUBSCRIBE NOTE */}
        <div style={{background:`rgba(200,168,75,.05)`,border:`1px solid ${T.borderGold}`,borderRadius:"12px",padding:"16px",textAlign:"center"}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"16px",letterSpacing:"3px",color:T.gold,marginBottom:"6px"}}>🔔 STAY UPDATED</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:600,color:T.muted,marginBottom:"12px",lineHeight:1.6}}>
            Kickoffist.com will cover all these tournaments in IST from day one. Fixtures, results, IST times, alarms — exactly as we did for the World Cup.
          </div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",color:T.dim}}>
            Data sourced from PremierLeague.com · UEFA.com · LaLiga.com · IndianSuperLeague.com
          </div>
        </div>

      </div>
    </div>
  );
}
