import { getStaticWCMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";

export const revalidate = 60;

export default async function ResultsPage() {
  const all = await getStaticWCMatches();
  const finished = all
    .filter(m => m.status === "FINISHED")
    .sort((a,b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime());

  // Group by IST date
  const byDate: Record<string,{label:string;matches:typeof finished}> = {};
  for (const m of finished) {
    if (!byDate[m.istDate]) byDate[m.istDate] = { label: m.istDateLabel, matches: [] };
    byDate[m.istDate].matches.push(m);
  }
  const dates = Object.keys(byDate).sort((a,b) => b.localeCompare(a));
  const totalGoals = finished.reduce((acc,m) => acc+(m.score.home||0)+(m.score.away||0), 0);

  return (
    <div style={{maxWidth:"760px",margin:"0 auto"}}>
      <div style={{marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        <div style={{fontFamily:"'Teko',sans-serif",fontSize:"12px",fontWeight:600,color:"#FF9933",letterSpacing:".14em",marginBottom:"4px"}}>FIFA WORLD CUP 2026</div>
        <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(28px,4vw,44px)",letterSpacing:"2px",color:"#fff",lineHeight:1,marginBottom:"10px"}}>ALL RESULTS</h1>
        <div style={{display:"flex",gap:"20px",flexWrap:"wrap"}}>
          {[
            {n:`${finished.length}`,l:"Matches Played"},
            {n:`${totalGoals}`,l:"Total Goals"},
            {n:`${(totalGoals/Math.max(finished.length,1)).toFixed(1)}`,l:"Per Game"},
          ].map((s,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"24px",letterSpacing:"1px",color:"#FF9933"}}>{s.n}</span>
              <span style={{fontSize:"11px",color:"rgba(200,212,232,.35)"}}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {dates.map((date,i) => (
        <div key={date} style={{marginBottom:"24px"}}>
          <div className="sh">
            <span>📅</span>
            <span style={{
              fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,letterSpacing:".1em",
              color:i===0?"#FF9933":"#fff"
            }}>
              {i===0?"LATEST RESULTS":i===1?"PREVIOUS DAY":byDate[date].label.toUpperCase()}
            </span>
            <span className="badge-ft">{byDate[date].matches.length} MATCHES</span>
            <div className="sh-line"/>
            {i===0&&<span style={{fontSize:"9px",color:"rgba(200,212,232,.3)",flexShrink:0}}>TAP FOR GOALS</span>}
          </div>
          {byDate[date].matches.map(m => <PortalMatchCard key={m.id} match={m}/>)}
        </div>
      ))}

      {finished.length===0&&(
        <div className="card" style={{padding:"40px",textAlign:"center"}}>
          <div style={{fontSize:"40px",marginBottom:"12px"}}>⚽</div>
          <div style={{fontFamily:"'Teko',sans-serif",fontSize:"20px",color:"rgba(200,212,232,.4)"}}>No results yet</div>
        </div>
      )}
    </div>
  );
}
