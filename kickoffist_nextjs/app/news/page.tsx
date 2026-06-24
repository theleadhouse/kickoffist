import { getStaticWCMatches } from "@/lib/api";

export const revalidate = 300;

export default async function ISTGuidePage() {
  const all = await getStaticWCMatches();
  const upcoming = all
    .filter(m => m.status === "UPCOMING" && m.homeTeam.name !== "TBD")
    .sort((a,b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime())
    .slice(0, 20);

  // Group by IST time slot
  const primeTime    = upcoming.filter(m => { const h = parseInt(m.istTime); return h >= 18 || h <= 0; });
  const midnightMid  = upcoming.filter(m => { const h = parseInt(m.istTime.replace(':','').slice(0,2)); return (h>=0&&h<6)||m.istTime.includes("AM")&&parseInt(m.istTime)<6; });
  const morningSlot  = upcoming.filter(m => { const h = parseInt(m.istTime); return h >= 6 && h < 18; });

  const istNow = new Date(Date.now() + 5.5*3600000);
  const dateStr = istNow.toLocaleDateString("en-IN", {weekday:"long",day:"numeric",month:"long",timeZone:"UTC"});

  return (
    <div style={{ maxWidth:"760px", margin:"0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom:"20px", paddingBottom:"14px", borderBottom:"1px solid rgba(255,153,51,.15)" }}>
        <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"11px", fontWeight:600, color:"#FF9933", letterSpacing:".14em", marginBottom:"4px" }}>KICKOFFIST · INDIA EXCLUSIVE</div>
        <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(28px,4vw,44px)", letterSpacing:"2px", color:"#fff", lineHeight:1, marginBottom:"6px" }}>🇮🇳 IST GUIDE</h1>
        <p style={{ fontSize:"13px", color:"rgba(255,255,255,.4)" }}>When to watch · When to set your alarm · When to sleep · {dateStr}</p>
      </div>

      {/* Indian fan tip */}
      <div style={{ background:"rgba(255,153,51,.06)", border:"1px solid rgba(255,153,51,.15)", borderRadius:"14px", padding:"16px 18px", marginBottom:"20px" }}>
        <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"12px", fontWeight:600, color:"#FF9933", letterSpacing:".1em", marginBottom:"8px" }}>⏰ HOW TO USE THIS GUIDE</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"10px" }}>
          {[
            {icon:"🌇",label:"PRIME TIME",sub:"6 PM – 12 AM IST · Watch live"},
            {icon:"🌙",label:"SET ALARM",sub:"12 AM – 6 AM IST · Worth staying up for big ones"},
            {icon:"☀️",label:"MORNING",sub:"6 AM+ IST · Catch the result over chai"},
          ].map(s => (
            <div key={s.label} style={{ background:"rgba(0,0,0,.3)", borderRadius:"10px", padding:"10px 12px" }}>
              <div style={{ fontSize:"20px", marginBottom:"4px" }}>{s.icon}</div>
              <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"13px", fontWeight:600, color:"#fff", letterSpacing:".04em", marginBottom:"2px" }}>{s.label}</div>
              <div style={{ fontSize:"10px", color:"rgba(255,255,255,.4)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Prime Time */}
      {primeTime.length > 0 && (
        <div style={{ marginBottom:"24px" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"2px", color:"#FF9933", marginBottom:"12px", display:"flex", alignItems:"center", gap:"8px" }}>
            🌇 PRIME TIME <span style={{ fontSize:"12px", fontFamily:"'Teko',sans-serif", color:"rgba(255,255,255,.4)", letterSpacing:".06em" }}>6 PM – MIDNIGHT IST · WATCH LIVE</span>
          </div>
          {primeTime.map(m => <ISTMatchRow key={m.id} match={m} slot="prime"/>)}
        </div>
      )}

      {/* Late Night */}
      {midnightMid.length > 0 && (
        <div style={{ marginBottom:"24px" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"2px", color:"#7a8499", marginBottom:"12px", display:"flex", alignItems:"center", gap:"8px" }}>
            🌙 SET YOUR ALARM <span style={{ fontSize:"12px", fontFamily:"'Teko',sans-serif", color:"rgba(255,255,255,.3)", letterSpacing:".06em" }}>MIDNIGHT – 6 AM IST</span>
          </div>
          {midnightMid.map(m => <ISTMatchRow key={m.id} match={m} slot="alarm"/>)}
        </div>
      )}

      {/* Morning */}
      {morningSlot.length > 0 && (
        <div style={{ marginBottom:"24px" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:"2px", color:"#7a8499", marginBottom:"12px", display:"flex", alignItems:"center", gap:"8px" }}>
            ☀️ CATCH UP OVER CHAI <span style={{ fontSize:"12px", fontFamily:"'Teko',sans-serif", color:"rgba(255,255,255,.3)", letterSpacing:".06em" }}>6 AM+ IST</span>
          </div>
          {morningSlot.map(m => <ISTMatchRow key={m.id} match={m} slot="morning"/>)}
        </div>
      )}

      {/* Watch info */}
      <div style={{ background:"rgba(255,153,51,.05)", border:"1px solid rgba(255,153,51,.1)", borderRadius:"12px", padding:"14px 16px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Teko',sans-serif", fontSize:"14px", fontWeight:600, color:"#FF9933", marginBottom:"4px" }}>📺 Watch on ZEE5 India</div>
        <div style={{ fontSize:"12px", color:"rgba(255,255,255,.4)" }}>
          Zee5 holds exclusive broadcast rights for FIFA WC 2026 in India · Stream on zee5.com or the Zee5 app
        </div>
      </div>
    </div>
  );
}

function ISTMatchRow({ match, slot }: { match: any; slot: string }) {
  const colours: Record<string,string> = {
    prime:"rgba(255,153,51,.1)", alarm:"rgba(100,100,150,.08)", morning:"rgba(80,80,80,.08)"
  };
  const borders: Record<string,string> = {
    prime:"rgba(255,153,51,.2)", alarm:"rgba(255,255,255,.07)", morning:"rgba(255,255,255,.05)"
  };
  const waMsg = `⚽ ${match.homeTeam.flag} ${match.homeTeam.name} vs ${match.awayTeam.name} ${match.awayTeam.flag}\n🕐 ${match.istTime} IST · ${match.istDateLabel}\n📺 Zee5 India · kickoffist.com 🇮🇳`;

  return (
    <div style={{ background:colours[slot], border:`1px solid ${borders[slot]}`, borderRadius:"12px", padding:"12px 14px", marginBottom:"8px", display:"flex", alignItems:"center", gap:"12px" }}>
      {/* Time */}
      <div style={{ flexShrink:0, textAlign:"center", minWidth:"64px" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"20px", letterSpacing:".04em", color:slot==="prime"?"#FF9933":"rgba(255,255,255,.5)", lineHeight:1 }}>{match.istTime}</div>
        <div style={{ fontSize:"8px", color:"rgba(255,255,255,.3)", marginTop:"1px" }}>IST</div>
        {match.istDateLabel && <div style={{ fontSize:"8px", color:"rgba(255,255,255,.25)", marginTop:"2px" }}>{match.istDateLabel.slice(0,8)}</div>}
      </div>
      {/* Teams */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"4px" }}>
          <span style={{ fontSize:"18px" }}>{match.homeTeam.flag}</span>
          <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"15px", fontWeight:500, color:"#fff" }}>{match.homeTeam.name}</span>
          <span style={{ fontSize:"11px", color:"rgba(255,255,255,.3)" }}>vs</span>
          <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"15px", fontWeight:500, color:"#fff" }}>{match.awayTeam.name}</span>
          <span style={{ fontSize:"18px" }}>{match.awayTeam.flag}</span>
        </div>
        <div style={{ fontSize:"10px", color:"rgba(255,255,255,.3)" }}>{match.group} · {match.city}</div>
      </div>
      {/* Slot tag + WA */}
      <div style={{ flexShrink:0, display:"flex", flexDirection:"column", gap:"5px", alignItems:"flex-end" }}>
        <span style={{ fontFamily:"'Teko',sans-serif", fontSize:"10px", fontWeight:600, letterSpacing:".06em", padding:"2px 8px", borderRadius:"4px",
          background:slot==="prime"?"rgba(255,153,51,.15)":"rgba(255,255,255,.06)",
          color:slot==="prime"?"#FF9933":"rgba(255,255,255,.4)"
        }}>
          {slot==="prime"?"🌇 WATCH LIVE":slot==="alarm"?"⏰ SET ALARM":"☀️ MORNING"}
        </span>
        <a href={`https://wa.me/?text=${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize:"10px", color:"#25d366", textDecoration:"none", fontFamily:"'Teko',sans-serif", letterSpacing:".04em", fontWeight:600 }}>💬 Share</a>
      </div>
    </div>
  );
}
