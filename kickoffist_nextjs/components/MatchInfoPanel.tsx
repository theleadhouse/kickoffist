"use client";
import { useState } from "react";
import { Match } from "@/lib/types";

const INFO: Record<number,{
  context: string;
  homeNotes: string;
  awayNotes: string;
  h2h?: string;
  keyPlayer?: {team:string;name:string;note:string};
}> = {
  // ═══ GROUP STAGE REMAINING ═══
  // Group G MD3
  63:{context:"Cabo Verde need a win to stay alive as best 3rd. Saudi Arabia are out. Expect attacking football.",homeNotes:"Historic debutants. Held Spain to 0-0 and drew with Uruguay. Ryan Mendes dangerous on the left.",awayNotes:"Failed to win a game. Al-Dawsari misfired badly. Nothing to play for.",keyPlayer:{team:"Cabo Verde",name:"Ryan Mendes",note:"The most underrated player of the tournament. Explosive winger."}},
  64:{context:"Spain need only a draw to qualify. Uruguay must win and hope other results go their way. Pressure on Bielsa.",homeNotes:"0-0 and 4-0 wins — clinical when they click. Yamal scored his first WC goal. Morata the target man.",awayNotes:"2 draws — not enough. Nunez needs goals. Suarez may play his last World Cup match.",h2h:"Spain won last 3 of 4 competitive meetings.",keyPlayer:{team:"Spain",name:"Lamine Yamal",note:"18 years old. Already scored his first WC goal. The future of football, playing right now."}},
  // Group H MD3
  65:{context:"Egypt likely through. Iran need to win. Both sides solid defensively — could be tight.",homeNotes:"Beat New Zealand 3-1. Salah has been outstanding. Solid at the back. Should qualify regardless.",awayNotes:"Two draws — 2 points. Need a win. Rezaeian and Mohebbi showed quality but lack of cutting edge.",keyPlayer:{team:"Egypt",name:"Mohamed Salah",note:"Liverpool captain. Egypt's entire creative output runs through him. World class."}},
  66:{context:"Belgium need to win to guarantee best 3rd spot. New Zealand have surprised everyone — they can still cause an upset.",homeNotes:"Two draws — De Bruyne below his best. Lukaku and Openda must fire. This is Belgium's last chance.",awayNotes:"Drew with Iran, lost to Egypt. Compact, hard working. Dutch and kiwi styles combined.",h2h:"Belgium have won last 5 meetings with New Zealand.",keyPlayer:{team:"Belgium",name:"Kevin De Bruyne",note:"Manchester City captain. Below his best this tournament. This must be his defining moment."}},
  // Group I MD3
  61:{context:"BOTH QUALIFIED. Norway top, France second. But Norway are 4 points, France 6. Battle for group position matters for R32 draw.",homeNotes:"Haaland on fire — 4 goals in 2 games. Odegaard controlling midfield. Playing with freedom.",awayNotes:"Qualified comfortably. Mbappe 4 goals. Kante marshalling midfield. Barcola dangerous from the bench.",h2h:"Classic matchup. Haaland vs Mbappe. Golden Boot battle within a WC group game.",keyPlayer:{team:"Norway",name:"Erling Haaland",note:"4 WC 2026 goals. On pace to challenge Messi for Golden Boot. Physical force of nature."}},
  62:{context:"Both eliminated. Dead rubber. Senegal vs Iraq — pride only.",homeNotes:"Lost both games despite Sarr and Mbaye's goals. Defensive errors proved fatal.",awayNotes:"Lost both games — conceded 11 goals. No route forward.",keyPlayer:{team:"Senegal",name:"Ismaila Sarr",note:"Best player in a disappointing Senegal campaign."}},
  // Group J MD3
  71:{context:"MUST WIN for Algeria. Austria need a result too. Winner likely through. Like a knockout match in the group stage.",homeNotes:"Won vs Jordan but lost to Argentina. Mahrez the danger — set pieces are deadly. Physical midfield.",awayNotes:"Beat Jordan in MD1, lost to Argentina. 3 points. A draw might be enough on goal difference.",h2h:"First competitive meeting. Both need this.",keyPlayer:{team:"Algeria",name:"Riyad Mahrez",note:"Most experienced Algerian at this level. Free kicks and creativity decisive."}},
  72:{context:"Argentina already qualified as winners with perfect 6 points. Jordan eliminated. Messi likely rested.",homeNotes:"6 points, Messi 5 WC goals, all-time record. Likely to rotate. Martinez and Lautaro to lead.",awayNotes:"Lost both games. Nothing at stake. Olwan showed quality but Jordan struggled defensively.",keyPlayer:{team:"Argentina",name:"Lionel Messi",note:"18 career WC goals — all-time record. May rest. If he plays, anything can happen."}},
  // Group K MD3
  69:{context:"Colombia top (6pts) vs Portugal (4pts). Both through — but winner gets a potentially easier R32 draw.",homeNotes:"Won both games. Diaz and Munoz electric in attack. Energy and pressing relentless.",awayNotes:"Won MD2 5-0 vs Uzbekistan. Ronaldo scored at 6 WCs — historic. Need a result to solidify group position.",h2h:"First World Cup meeting between these nations.",keyPlayer:{team:"Portugal",name:"Cristiano Ronaldo",note:"Scored at 6 World Cups — a record that may never be broken. 39 years old and still delivering."}},
  70:{context:"DR Congo need a win and favour from Portugal to have any hope. Uzbekistan are eliminated.",homeNotes:"Drew with Portugal in MD1 — showed they belong. Mbemba leads with experience and quality.",awayNotes:"Lost both games, conceded 11 goals. First World Cup, historic debut despite results.",keyPlayer:{team:"DR Congo",name:"Chancel Mbemba",note:"Captain and heart of the team. Scored vs Portugal. Leader."}},
  // Group L MD3
  67:{context:"Panama eliminated. England through but group position still matters — want to avoid best bracket matchup.",homeNotes:"Lost both games. Hard workers. Nothing to lose — could be dangerous for England rotated XI.",awayNotes:"4 points but not at their best. Kane close to Lineker England record. Likely to rotate key players.",keyPlayer:{team:"England",name:"Harry Kane",note:"10 WC goals — equals Lineker's England all-time record. One more makes him the greatest."}},
  68:{context:"MUST WIN for Croatia — Modric's farewell? Both Ghana and Croatia need points. High stakes, high drama.",homeNotes:"Beat Panama 1-0. Budimir scored. Modric still pulling strings at 41. Last WC for a generation.",awayNotes:"4 points — already through. Kudus and Yirenkyi have been excellent. Can afford to rotate.",h2h:"First World Cup meeting. Both dangerous sides.",keyPlayer:{team:"Croatia",name:"Luka Modric",note:"41 years old. Possibly his final World Cup match. One of the greatest midfielders in history."}},
  // ═══ ROUND OF 32 ═══
  101:{context:"South Africa's first ever World Cup knockout match vs Canada in their own. Incredible occasion. Both looking for history.",homeNotes:"Beat South Korea 1-0 in MD3 — Maseko the hero. First time SA through to knockouts. Compact, physical, dangerous on the counter.",awayNotes:"Lost to Switzerland MD3 but qualified as runners-up. David leads attack with 3 goals. Quick and dangerous.",h2h:"First World Cup meeting. Canada slight favourites.",keyPlayer:{team:"South Africa",name:"Themba Zwane",note:"The creative spark. If Bafana Bafana are to cause a shock, it runs through Zwane."}},
  102:{context:"The biggest match of Round of 32. Brazil vs Japan — Vinicius vs Ueda. Samba vs Samurai Blue. One of them goes home.",homeNotes:"Top of Group C with 7pts. Vinicius has 3 WC goals. Rodrygo, Endrick showing maturity. Ancelotti's system working.",awayNotes:"4pts from Group F. Beat Tunisia 4-0. Ueda and Maeda clinical. Disciplined, counter-attacking, dangerous.",h2h:"Brazil have won their last 4 competitive meetings with Japan.",keyPlayer:{team:"Brazil",name:"Vinícius Jr",note:"3 WC goals already. Electric pace. The best wide attacker at this tournament."}},
  103:{context:"Germany vs Paraguay — clinical efficiency vs South American grit. Germany slight favourites but Paraguay can upset.",homeNotes:"Top of Group E despite shock loss to Ecuador MD3. Havertz and Undav clinical. Kroos pulling strings.",awayNotes:"Third in Group D with 4pts. Beat Turkey, drew with Australia. Aguero and Almada their creative forces.",h2h:"Germany have won their last 5 meetings with Paraguay.",keyPlayer:{team:"Germany",name:"Florian Wirtz",note:"The most technically gifted player in the German squad. Can unlock any defence."}},
  104:{context:"Netherlands vs Morocco — European power vs African lions. Louis van Gaal's Dutch side favoured but Morocco always dangerous.",homeNotes:"Top of Group F. Brobbey on fire — 3 goals. Gakpo and Depay clinical. Van Dijk commanding at back.",awayNotes:"Equal on points with Brazil in Group C. Amrabat controlling midfield. Bounou exceptional in goal.",h2h:"First World Cup knockout meeting. Morocco beat Spain in 2022 — they fear nobody.",keyPlayer:{team:"Netherlands",name:"Brian Brobbey",note:"The in-form striker of the tournament — 3 goals. Physical, powerful, clinical."}},
  105:{context:"Ivory Coast vs Norway — Elephants roar against Haaland's Norway. A clash of attacking football philosophies.",homeNotes:"Qualified from Group E with 6pts. Kessie leads the midfield. Pepe and Kessie goals in MD3.",awayNotes:"Norway top Group I. Haaland with 4 WC goals. SHOCK result: Beat France 4-1 in final group game.",h2h:"First World Cup knockout meeting.",keyPlayer:{team:"Norway",name:"Erling Haaland",note:"4 WC 2026 goals. In the form of his career. The most unstoppable striker in world football right now."}},
  106:{context:"France vs Sweden — Mbappe's France should advance but Sweden proved they belong. Graham Potter's side no pushovers.",homeNotes:"France runners-up in Group I after shock 1-4 loss to Norway MD3. Mbappe 4 goals but France rattled.",awayNotes:"3rd place in Group F with 4pts. Isak and Gyokeres dangerous. Beat Tunisia, drew with Japan. Organised.",h2h:"France won their last 3 competitive meetings.",keyPlayer:{team:"France",name:"Kylian Mbappé",note:"4 WC 2026 goals. France shaky but Mbappe is always the difference — can win a match on his own."}},
  107:{context:"Mexico vs Ecuador — home crowd advantage at Estadio Azteca. 80,000 fans in Mexico City. This is the biggest match in Mexico's history.",homeNotes:"Top of Group A — perfect 9 points. Chavez, Quinones, Fidalgo all goals. Playing with freedom at home.",awayNotes:"Qualified as best 3rd from Group E. Caicedo the heartbeat. Plata scored the winner vs Germany — a WC shock.",h2h:"Last 5 meetings: Mexico won 3, Ecuador won 2. Balanced.",keyPlayer:{team:"Ecuador",name:"Moisés Caicedo",note:"Brighton captain. World class midfielder. Will Ecuador cause another upset? He's the key."}},
  108:{context:"England vs Senegal — Three Lions favoured but Sarr and Dia are dangerous. Tuchel must get it right.",homeNotes:"4pts from Group L. Kane 10 WC goals — equals Lineker record. Bellingham and Saka in form.",awayNotes:"Beat Iraq 5-0 in final group game after 2 losses. Sarr hat-trick. In brilliant form going into knockouts.",h2h:"England beat Senegal 3-0 in 2022 Round of 16.",keyPlayer:{team:"England",name:"Harry Kane",note:"10 WC goals — equals Lineker England record. One more makes him the greatest England WC scorer ever."}},
  109:{context:"Belgium vs Bosnia — De Bruyne's Belgium should progress but Bosnia showed quality throughout group stage.",homeNotes:"Belgium qualified as Group G runners-up. De Bruyne and Lukaku finally firing. 5-1 vs New Zealand MD3.",awayNotes:"Qualified as best 3rd from Group B. Beat Qatar, drew with Canada. Dzeko the experienced leader.",h2h:"Belgium won last 2 competitive meetings.",keyPlayer:{team:"Belgium",name:"Kevin De Bruyne",note:"Finally showing his best. Manchester City captain. When he plays like this, Belgium can beat anyone."}},
  110:{context:"USA vs Bosnia — Home crowd at Levi's Stadium. USMNT backed by 70,000 fans. Pulisic and Balogun ready.",homeNotes:"Top of Group D — 6pts then lost to Turkey MD3. Balogun 2 goals. Pulisic captain and creator. Home advantage.",awayNotes:"Best 3rd from Group B — 4pts. Dzeko, Pjanic experience key. Surprised everyone by qualifying.",h2h:"USA won last competitive meeting.",keyPlayer:{team:"USA",name:"Christian Pulisic",note:"Captain. The most important player for the USMNT. Playing on home soil — this is his moment."}},
  111:{context:"Spain vs Cape Verde — Spain massive favourites but Cabo Verde shocked the world already. Don't write them off.",homeNotes:"Top of Group H. Yamal, Morata, Williams all contributing. Spain look like genuine tournament favourites.",awayNotes:"Historic debutants. 0-0 with Spain MD1 — the shock of the group stage. Mendes and Andrade dangerous.",h2h:"First competitive meeting.",keyPlayer:{team:"Spain",name:"Lamine Yamal",note:"18 years old. WC goal already. The most exciting young talent at the tournament. Generational."}},
  112:{context:"Switzerland vs Ecuador — European precision vs South American passion. Both capable of causing upsets.",homeNotes:"Winners of Group B. Xhaka the leader. Freuler and Akanji solid. Embolo the attacking threat.",awayNotes:"Best 3rd from Group E. Beat Germany. Caicedo exceptional. Playing with nothing to lose.",h2h:"First World Cup knockout meeting.",keyPlayer:{team:"Switzerland",name:"Granit Xhaka",note:"Captain and heart of Switzerland. Bayer Leverkusen form continues at WC level."}},
  113:{context:"Argentina vs Egypt — Messi seeking his last World Cup title. Egypt want to write history. Cairo vs Buenos Aires.",homeNotes:"Perfect group stage — 6pts. Messi 5 goals but likely rested MD3. Martinez and Lautaro fresh.",awayNotes:"Runners-up in Group G. Salah crucial — Liverpool captain at his best. Solid defensive unit.",h2h:"Argentina won last 4 competitive meetings.",keyPlayer:{team:"Argentina",name:"Lionel Messi",note:"The greatest of all time. 18 career WC goals. One final shot at glory at age 38."}},
  114:{context:"Colombia vs Australia — South American energy vs Socceroos surprise of the tournament.",homeNotes:"Top of Group K — 6pts. Diaz and Munoz electric. One of the most exciting teams in the tournament.",awayNotes:"Runners-up in Group D. Irankunda, 17, has been the revelation. Beat Turkey. Organised and dangerous.",h2h:"Colombia won last 2 competitive meetings.",keyPlayer:{team:"Colombia",name:"Luis Diaz",note:"Liverpool winger. The most dangerous wide player in the Colombian squad. Direct, fast, clinical."}},
  115:{context:"Portugal vs Cape Verde — Ronaldo vs debutants. Can Cape Verde cause another shock? Or does Ronaldo shine?",homeNotes:"Runners-up in Group K. Ronaldo brace vs Uzbekistan. 6 WC goals across 6 WCs — history made.",awayNotes:"Qualified from Group H. Incredible debut tournament. Mendes has been the standout player.",h2h:"First competitive meeting.",keyPlayer:{team:"Portugal",name:"Cristiano Ronaldo",note:"Scored at 6 World Cups. 39 years old. This could be his last WC knockout match. Give everything."}},
  116:{context:"Croatia vs South Korea — Modric's farewell vs Son's final WC dance. Two legends, one last chance.",homeNotes:"3rd in Group L with 3pts. Beat Panama 1-0. Modric, 41 — playing his final WC. Budimir the striker.",awayNotes:"3pts from Group A. Defensive and organised. Son Heung-min leads the attack. Clinical on the counter.",h2h:"Croatia beat South Korea on penalties in 2022 Round of 16.",keyPlayer:{team:"Croatia",name:"Luka Modric",note:"41 years old. The last dance for one of the greatest players to ever play football. Give him a sendoff."}},
};

export default function MatchInfoPanel({ match }: { match: Match }) {
  const [open, setOpen] = useState(false);
  const info = INFO[match.id];
  if (!info || match.status === "FINISHED") return null;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",
          background:open?"#F0F0FF":"#F5F5FF",
          border:`1px solid ${open?"#6366f1":"#C7D2FE"}`,
          borderRadius:"6px",padding:"8px",cursor:"pointer",transition:"all .15s",
        }}
      >
        <span style={{fontSize:"13px"}}>📋</span>
        <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"12px",fontWeight:800,color:"#818cf8",letterSpacing:".08em"}}>
          {open?"CLOSE INFO":"MATCH INFO"}
        </span>
      </button>

      {open && (
        <div style={{
          gridColumn:"1/-1",
          borderTop:"1px solid #E5E5E0",
          background:"#F8F8F5",
          padding:"14px 16px",
          marginTop:"0",
        }}>
          {/* Context */}
          <div style={{background:"#FFF9F0",border:"1px solid rgba(255,153,51,.2)",borderRadius:"8px",padding:"10px 14px",marginBottom:"12px"}}>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"#FF9933",letterSpacing:".14em",marginBottom:"4px"}}>⚽ WHAT'S AT STAKE</div>
            <p style={{fontSize:"12px",color:"#333",lineHeight:1.6}}>{info.context}</p>
          </div>

          {/* Team notes */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"8px"}}>
            <div style={{background:"#fff",border:"1px solid #E5E5E0",borderRadius:"8px",padding:"10px 12px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"}}>
                <span style={{fontSize:"16px"}}>{match.homeTeam.flag}</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#666",letterSpacing:".1em"}}>{match.homeTeam.name.toUpperCase()}</span>
              </div>
              <p style={{fontSize:"11px",color:"#555",lineHeight:1.6}}>{info.homeNotes}</p>
            </div>
            <div style={{background:"#fff",border:"1px solid #E5E5E0",borderRadius:"8px",padding:"10px 12px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"}}>
                <span style={{fontSize:"16px"}}>{match.awayTeam.flag}</span>
                <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"11px",fontWeight:800,color:"#666",letterSpacing:".1em"}}>{match.awayTeam.name.toUpperCase()}</span>
              </div>
              <p style={{fontSize:"11px",color:"#555",lineHeight:1.6}}>{info.awayNotes}</p>
            </div>
          </div>

          {/* H2H + Key Player */}
          <div style={{display:"grid",gridTemplateColumns:info.h2h&&info.keyPlayer?"1fr 1fr":"1fr",gap:"8px"}}>
            {info.h2h&&(
              <div style={{background:"#FAFAF8",border:"1px solid #E5E5E0",borderRadius:"8px",padding:"8px 12px"}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"#999",letterSpacing:".12em",marginBottom:"4px"}}>HEAD TO HEAD</div>
                <p style={{fontSize:"11px",color:"#555",lineHeight:1.5}}>{info.h2h}</p>
              </div>
            )}
            {info.keyPlayer&&(
              <div style={{background:"#FFF9F0",border:"1px solid rgba(255,153,51,.25)",borderRadius:"8px",padding:"8px 12px"}}>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"10px",fontWeight:800,color:"#FF9933",letterSpacing:".12em",marginBottom:"2px"}}>
                  ⭐ KEY PLAYER · {info.keyPlayer.team.toUpperCase()}
                </div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"14px",fontWeight:700,color:"#fff",marginBottom:"2px"}}>{info.keyPlayer.name}</div>
                <p style={{fontSize:"11px",color:"#555",lineHeight:1.5}}>{info.keyPlayer.note}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
