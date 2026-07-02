import { getStaticWCMatches } from "@/lib/api";
import BracketView from "@/components/BracketView";
import ScheduleCalendar from "@/components/ScheduleCalendar";

export const revalidate = 0;

export default async function BracketPage() {
  const all = await getStaticWCMatches();
  const played = all.filter(m=>m.status==="FINISHED").length;
  const r32 = all.filter(m=>m.group==="R32").sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime());
  const r16 = all.filter(m=>m.group==="R16").sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime());

  return (
    <div>
      {/* Header */}
      <div style={{marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,153,51,.2)"}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(11px,2vw,13px)",letterSpacing:"4px",color:"rgba(255,153,51,.7)",marginBottom:"4px"}}>FIFA WORLD CUP 2026</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,5vw,48px)",letterSpacing:"3px",color:"#fff",lineHeight:1,marginBottom:"6px"}}>KNOCKOUT BRACKET</h1>
        <p style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:"13px",fontWeight:600,color:"rgba(255,255,255,.4)"}}>All times Indian Standard Time · {played} matches played</p>
      </div>

      <BracketView r32={r32} r16={r16}/>

      {/* Full Schedule Calendar below bracket */}
      <div style={{marginTop:"32px"}}>
        <ScheduleCalendar matches={all} played={played}/>
      </div>
    </div>
  );
}
