"use client";
import { useState } from "react";
import { Match } from "@/lib/types";

// Match-specific info for remaining group stage matches
// Format: matchId -> { home notes, away notes, context }
const MATCH_INFO: Record<number,{
  homeNotes: string;
  awayNotes: string;
  context: string;
  h2h?: string;
  keyPlayer?: {team:string;name:string;note:string};
}> = {
  // Group D MD3 - June 26 IST
  59: { // Turkey vs USA
    homeNotes: "Eliminated after two losses. Yildiz was bright in patches but Turkey lacked end product. Nothing to lose — could be dangerous.",
    awayNotes: "Already qualified and through as group winners. Balogun leads their attack with 2 goals. Likely to rotate squad ahead of knockouts.",
    context: "USA have nothing to prove. Group D winners regardless. Turkey are out — pride only.",
    h2h: "USA have won their last 3 meetings with Turkey.",
    keyPlayer: {team:"USA",name:"Christian Pulisic",note:"Captain looking to set the tone ahead of knockouts."},
  },
  60: { // Paraguay vs Australia
    homeNotes: "Beat Turkey but lost heavily to USA 4-1. Need a win to have any chance of progressing as best 3rd place. Full-backs key in attack.",
    awayNotes: "Lost to USA, beat Turkey. A win here secures safe passage. Irankunda pace on the counter dangerous. Solid defensive unit.",
    context: "Winner likely to progress as best 3rd place team. Both sides have a genuine chance — crucial match.",
    h2h: "Even record historically. Australia edge recent meetings.",
    keyPlayer: {team:"Australia",name:"Nestory Irankunda",note:"17-year-old sensation has been Australia's brightest spark."},
  },
  // Group E MD3 - June 26 IST
  55: { // Curaçao vs Ivory Coast
    homeNotes: "Historic 0-0 draw with Ecuador was their best WC result ever. Goalkeeper Eloy Room made 15 saves — a tournament record. Eliminated but playing for pride and history.",
    awayNotes: "Lost to Germany 8-2 on aggregate. Beat Ecuador in MD1 but nothing else. Need a win to have any chance as best 3rd. Kessie must lead.",
    context: "Ivory Coast must win to stay alive. Curaçao playing for history — they've already made it.",
    keyPlayer: {team:"Ivory Coast",name:"Franck Kessie",note:"Captain needs to impose himself after a quiet tournament so far."},
  },
  56: { // Ecuador vs Germany
    homeNotes: "Lost to Ivory Coast, drew with Curaçao. Must win to have any chance of progressing as best 3rd. Attack misfired badly — need goals.",
    awayNotes: "Already qualified top of Group E. Undav has 2 goals. Likely to rest Havertz and senior players ahead of knockouts. Still dangerous even with rotation.",
    context: "Germany through regardless. Ecuador must win to keep any knockout hopes alive. High stakes for one, nothing at stake for the other.",
    h2h: "Germany have won their last 4 competitive meetings with Ecuador.",
    keyPlayer: {team:"Ecuador",name:"Moisés Caicedo",note:"Brighton star must control midfield if Ecuador are to get anything."},
  },
  // Group F MD3 - June 26 IST
  57: { // Japan vs Sweden
    homeNotes: "4 points from 2 games — impressive. Beat Tunisia 4-0. Drew with Netherlands. Ueda leads with 2 WC goals. Disciplined, fast, clinical on the counter.",
    awayNotes: "Lost 5-1 to Netherlands but beat Tunisia. Gyokeres needs to step up — was quiet against Dutch. Isak dangerous when given space.",
    context: "Both need points to secure top 2. Whoever wins likely finishes 2nd. Japan slight favourites on form.",
    h2h: "Japan beat Sweden at 2022 World Cup in the group stage. Sweden looking for revenge.",
    keyPlayer: {team:"Japan",name:"Ayase Ueda",note:"2 goals in the tournament. Intelligent movement and clinical finishing."},
  },
  58: { // Tunisia vs Netherlands
    homeNotes: "Lost both games, eliminated. Tunisia conceded 9 goals in 2 matches — worst defensive record in Group F. Nothing to play for but pride.",
    awayNotes: "4 points — need a win or draw to guarantee top spot. Brobbey and Gakpo in devastating form. Van Dijk commanding at the back.",
    context: "Netherlands should win comfortably. Brobbey is on fire. Could be a big score for Netherlands trying to top Group F.",
    keyPlayer: {team:"Netherlands",name:"Brian Brobbey",note:"2 goals, physical, dominant. The in-form striker of the tournament alongside Messi."},
  },
  // Group G MD3 - June 27 IST
  63: { // Cabo Verde vs Saudi Arabia
    homeNotes: "Held Spain to 0-0, drew with Uruguay. Compact, disciplined, dangerous on counter. Eliminating Spain was the shock of MD1. Still alive for best 3rd.",
    awayNotes: "Lost 4-0 to Spain, drew with Uruguay. Conceded 5 goals, scored only 1. Al-Dawsari needs to recapture MD1 form urgently.",
    context: "Both teams fighting for best 3rd place. Cabo Verde's organisation vs Saudi attacking quality. Could go either way.",
    keyPlayer: {team:"Cabo Verde",name:"Ryan Mendes",note:"The best player at the tournament that nobody is talking about. Quick, creative, decisive."},
  },
  64: { // Uruguay vs Spain
    homeNotes: "Two draws — lost ground on Spain. Suarez playing his last WC. Nunez dangerous but needs service. Bielsa's system solid but creative spark missing.",
    awayNotes: "Beat Saudi Arabia 4-0 after surprise draw with Cabo Verde. Yamal scored his first WC goal. Morata, Williams, Fabian all contributing.",
    context: "Spain likely already qualified but want to win group. Uruguay need a result to stay in best 3rd contention. Bielsa's last WC game may be emotional.",
    h2h: "Spain have dominated recent meetings. Won 3 of last 4.",
    keyPlayer: {team:"Spain",name:"Lamine Yamal",note:"18 years old, already scored his first WC goal. The most exciting young player in the tournament."},
  },
  // Group H MD3 - June 27 IST
  65: { // Egypt vs Iran
    homeNotes: "Beat New Zealand 3-1 — only African team to win MD2. Salah 67' was brilliant. Solid in transition. Looking strong for knockouts.",
    awayNotes: "Drew both games — just 2 points. Need a win desperately. Rezaeian and Mohebbi showed quality in MD1. Can they find a goal?",
    context: "Egypt likely through regardless. Iran must win to have any knockout hope. Egypt might rest key players.",
    keyPlayer: {team:"Egypt",name:"Mohamed Salah",note:"Liverpool captain scored vs New Zealand. Egypt's entire creative output runs through him."},
  },
  66: { // New Zealand vs Belgium
    homeNotes: "Drew MD1, lost MD2. One point. Unlikely to progress but NZ have been competitive. Double Just was excellent in MD1 against Iran.",
    awayNotes: "Two draws, 2 points — disappointing for a Belgian side with this squad depth. De Bruyne must step up. Golden generation on last legs.",
    context: "Belgium need to win to have best 3rd hopes. New Zealand have little to lose — could surprise.",
    keyPlayer: {team:"Belgium",name:"Kevin De Bruyne",note:"Quiet tournament so far for City captain. This must be his moment — final World Cup for many of this Belgian generation."},
  },
  // Group I MD3 - June 27 IST
  61: { // Norway vs France
    homeNotes: "Both teams already qualified. Norway have Haaland with 4 goals. France have Mbappe with 4 goals. Battle of the Golden Boot contenders.",
    awayNotes: "6 points, qualified top alongside Norway. Mbappe-Dembele-Barcola devastating in attack. Kante marshalling midfield brilliantly.",
    context: "Top of the group, both qualified. This is about momentum, confidence and Golden Boot. Expect goals — Haaland vs Mbappe in the same game.",
    h2h: "France won their last WC meeting with Norway. Close competition always.",
    keyPlayer: {team:"Norway",name:"Erling Haaland",note:"4 WC goals. On fire. Will push Messi all the way for the Golden Boot."},
  },
  62: { // Senegal vs Iraq
    homeNotes: "Lost both games — eliminated. Senegal were expected to threaten but never fired. Sarr and Mbaye scored but defensive errors cost them dearly.",
    awayNotes: "Lost both games — eliminated. Hussein scored but Iraq conceded 11 goals. Nothing at stake.",
    context: "Dead rubber — both teams eliminated. Pride only.",
    keyPlayer: {team:"Senegal",name:"Ismaila Sarr",note:"Best Senegal player in the tournament but didn't get enough support."},
  },
  // Group J MD3 - June 28 IST
  71: { // Algeria vs Austria
    homeNotes: "Won MD2 vs Jordan after losing MD1. 3 points — need a win here to have any knockout hope as best 3rd. Benbouali and Gouiri showed quality.",
    awayNotes: "Beat Jordan in MD1, lost to Argentina. 3 points. A draw might be enough if results elsewhere go their way. Arnautovic threat from the bench.",
    context: "Both on 3 points — winner likely through. Algeria vs Austria is effectively a knockout match.",
    keyPlayer: {team:"Algeria",name:"Riyad Mahrez",note:"The most experienced Algerian by far. His creativity will be decisive in this must-win game."},
  },
  72: { // Jordan vs Argentina
    homeNotes: "Lost both games — eliminated. Jordan gave a decent account of themselves against Austria. Olwan scored but defensive frailties exposed.",
    awayNotes: "Already qualified as group winners with 6 points. Messi has 5 WC 2026 goals — the tournament's top scorer. Likely to rest stars ahead of knockouts.",
    context: "Argentina through and relaxed. Jordan have nothing to lose. Messi might not even start — but if he does, expect fireworks.",
    keyPlayer: {team:"Argentina",name:"Lionel Messi",note:"18 career WC goals — all-time record holder. May rest here but still the greatest player alive."},
  },
  // Group K MD3 - June 28 IST
  69: { // Colombia vs Portugal
    homeNotes: "Won both games — already qualified top of Group K. Diaz, Munoz and Campaz all contributing. Energetic, attacking, dangerous.",
    awayNotes: "Won MD2 vs Uzbekistan 5-0 — Ronaldo scored at 6 World Cups, historic. Need a win here to guarantee top 2. Could rest Ronaldo.",
    context: "Both likely through but order matters. Colombia-Portugal could decide who faces easier knockout opposition.",
    h2h: "First World Cup meeting between these two.",
    keyPlayer: {team:"Portugal",name:"Cristiano Ronaldo",note:"39 years old, scored at 6 World Cups. Greatest individual World Cup feat in history."},
  },
  70: { // DR Congo vs Uzbekistan
    homeNotes: "Drew MD1 with Portugal, lost MD2. Need a win and Portugal result to go their way. Mbemba showed leadership but attack needs to fire.",
    awayNotes: "Lost both games, conceded 11 goals. Fayzullayev showed bright moments but this squad is limited at this level. Eliminated.",
    context: "DR Congo need to win and hope Colombia beat Portugal. Unlikely but not impossible.",
    keyPlayer: {team:"DR Congo",name:"Chancel Mbemba",note:"Captain and talisman. Scored vs Portugal in MD1. Must lead from the front."},
  },
  // Group L MD3 - June 28 IST
  67: { // Panama vs England
    homeNotes: "Lost both games — eliminated. Showed heart vs Croatia despite the result. Hard-working side who won't give up easily. Nothing to lose.",
    awayNotes: "4 points — already through. Kane has 2 goals. Bellingham excellent. England drew vs Ghana unexpectedly — need to bounce back. Likely to rotate squad.",
    context: "England through regardless. Panama out. But Kane could break Lineker's record with one more goal. Watch for his motivation.",
    keyPlayer: {team:"England",name:"Harry Kane",note:"10 WC goals — equals Gary Lineker's England record. One more and he stands alone in history."},
  },
  68: { // Croatia vs Ghana
    homeNotes: "Beat Panama 1-0 in MD2 — back in contention. Budimir scored. A win here could see Croatia through. Modric in his final World Cup chapter.",
    awayNotes: "4 points — in strong position. Kudus and Yirenkyi created havoc. Already through if results go their way. Dangerous side.",
    context: "Both could advance — this match determines who goes through. Croatia vs Ghana is effectively a knockout. Modric's last WC dance?",
    keyPlayer: {team:"Croatia",name:"Luka Modric",note:"41 years old. This may genuinely be his final World Cup match. One of the greatest midfielders in history."},
  },
};

export default function MatchInfoPanel({ match }: { match: Match }) {
  const [open, setOpen] = useState(false);
  const info = MATCH_INFO[match.id];

  if (!info || match.status !== "UPCOMING") return null;

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:"5px",
          background:"rgba(99,102,241,.08)", border:"1px solid rgba(99,102,241,.2)",
          borderRadius:"7px", padding:"7px", cursor:"pointer", transition:"all .15s"
        }}
      >
        <span style={{fontSize:"13px"}}>📋</span>
        <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#818cf8",letterSpacing:".06em"}}>MATCH INFO</span>
      </button>

      {open && (
        <div style={{
          gridColumn:"1/-1",
          borderTop:"1px solid rgba(99,102,241,.15)",
          background:"rgba(99,102,241,.04)",
          padding:"14px 16px",
        }}>
          {/* Context */}
          <div style={{
            background:"rgba(255,153,51,.06)", border:"1px solid rgba(255,153,51,.12)",
            borderRadius:"8px", padding:"10px 12px", marginBottom:"12px",
            fontFamily:"'Inter',sans-serif", fontSize:"12px", color:"rgba(255,255,255,.7)", lineHeight:1.6,
          }}>
            <span style={{fontFamily:"'Teko',sans-serif",fontSize:"11px",fontWeight:600,color:"#FF9933",letterSpacing:".1em",display:"block",marginBottom:"4px"}}>⚽ WHAT'S AT STAKE</span>
            {info.context}
          </div>

          {/* Two team notes side by side */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",marginBottom:"10px"}}>
            <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"8px",padding:"10px 12px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"}}>
                <span style={{fontSize:"16px"}}>{match.homeTeam.flag}</span>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.6)",letterSpacing:".06em"}}>{match.homeTeam.name.toUpperCase()}</span>
              </div>
              <p style={{fontSize:"11px",color:"rgba(255,255,255,.55)",lineHeight:1.6}}>{info.homeNotes}</p>
            </div>
            <div style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"8px",padding:"10px 12px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"}}>
                <span style={{fontSize:"16px"}}>{match.awayTeam.flag}</span>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"rgba(255,255,255,.6)",letterSpacing:".06em"}}>{match.awayTeam.name.toUpperCase()}</span>
              </div>
              <p style={{fontSize:"11px",color:"rgba(255,255,255,.55)",lineHeight:1.6}}>{info.awayNotes}</p>
            </div>
          </div>

          {/* H2H + Key player */}
          <div style={{display:"grid",gridTemplateColumns:info.h2h&&info.keyPlayer?"1fr 1fr":"1fr",gap:"10px"}}>
            {info.h2h && (
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:"8px",padding:"8px 12px",fontSize:"11px",color:"rgba(255,255,255,.45)",lineHeight:1.6}}>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,.3)",letterSpacing:".1em",display:"block",marginBottom:"3px"}}>HEAD TO HEAD</span>
                {info.h2h}
              </div>
            )}
            {info.keyPlayer && (
              <div style={{background:"rgba(255,153,51,.04)",border:"1px solid rgba(255,153,51,.1)",borderRadius:"8px",padding:"8px 12px"}}>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"10px",fontWeight:600,color:"#FF9933",letterSpacing:".1em",display:"block",marginBottom:"3px"}}>⭐ KEY PLAYER · {info.keyPlayer.team.toUpperCase()}</span>
                <span style={{fontFamily:"'Teko',sans-serif",fontSize:"13px",fontWeight:600,color:"#fff",display:"block",marginBottom:"2px"}}>{info.keyPlayer.name}</span>
                <span style={{fontSize:"11px",color:"rgba(255,255,255,.45)",lineHeight:1.5}}>{info.keyPlayer.note}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
