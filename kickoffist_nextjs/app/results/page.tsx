import { getStaticWCMatches } from "@/lib/api";
import PortalMatchCard from "@/components/PortalMatchCard";

export const revalidate = 60;

export default async function ResultsPage() {
  const all = await getStaticWCMatches();
  const finished = all
    .filter(m=>m.status==="FINISHED")
    .sort((a,b)=>new Date(b.utcDate).getTime()-new Date(a.utcDate).getTime());

  // Group by IST date
  const byDate: Record<string,typeof finished> = {};
  for(const m of finished){
    if(!byDate[m.istDateLabel]) byDate[m.istDateLabel]=[];
    byDate[m.istDateLabel].push(m);
  }

  const totalGoals = finished.reduce((acc,m)=>(m.score.home||0)+(m.score.away||0)+acc,0);

  return(
    <div style={{maxWidth:"800px",margin:"0 auto"}}>
      <div style={{marginBottom:"20px",paddingBottom:"14px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
        <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"10px",fontWeight:800,color:"#FF9933",letterSpacing:".14em",textTransform:"uppercase",marginBottom:"4px"}}>FIFA World Cup 2026</div>
        <h1 style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"clamp(24px,4vw,38px)",fontWeight:900,color:"#fff",letterSpacing:"1px",lineHeight:1,marginBottom:"6px"}}>ALL RESULTS</h1>
        <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
          {[
            {n:`${finished.length}`,l:"Matches Played"},
            {n:`${totalGoals}`,l:"Total Goals"},
            {n:`${(totalGoals/Math.max(finished.length,1)).toFixed(1)}`,l:"Goals/Match"},
          ].map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"6px"}}>
              <span style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"20px",fontWeight:900,color:"#FF9933"}}>{s.n}</span>
              <span style={{fontSize:"11px",color:"rgba(255,255,255,.3)"}}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {Object.entries(byDate).map(([date,matches])=>(
        <div key={date} style={{marginBottom:"20px"}}>
          <div className="sh">
            <span>📅</span>
            <span style={{color:"#fff",fontWeight:900}}>{date}</span>
            <span className="badge-ft">{matches.length} MATCHES</span>
            <div className="sh-line"/>
          </div>
          {matches.map(m=><PortalMatchCard key={m.id} match={m}/>)}
        </div>
      ))}

      {finished.length===0&&(
        <div className="card" style={{padding:"40px",textAlign:"center"}}>
          <div style={{fontSize:"40px",marginBottom:"12px"}}>⚽</div>
          <div style={{fontFamily:"'Barlow Condensed','Oswald',sans-serif",fontSize:"18px",color:"rgba(255,255,255,.4)"}}>No results yet</div>
        </div>
      )}
    </div>
  );
}
