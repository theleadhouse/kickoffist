export const revalidate = 3600;
const NEWS = [
  {id:1,tag:"🐐 HISTORY",title:"Messi Breaks the All-Time World Cup Scoring Record",body:"Lionel Messi scored twice against Austria on June 22, taking his career World Cup tally to 18 goals — surpassing Germany's Miroslav Klose (17). At 38, in his fifth World Cup, he now has 5 goals in just 2 games at WC 2026. He scored in the 67th and 90th minute to send Argentina into the Round of 32.",meta:"June 22 · Group J · AT&T Stadium Dallas",hot:true},
  {id:2,tag:"🇫🇷 FRANCE",title:"France 3–0 Iraq After 2-Hour Storm Delay in Philadelphia",body:"Kylian Mbappe scored twice and Ousmane Dembele added his first World Cup goal as France beat Iraq 3-0 despite a 2-hour weather delay. Play was suspended at halftime when a severe thunderstorm hit Philadelphia. Mbappe now has 4 goals in 2 games. France are through to the Round of 32.",meta:"June 22 · Group I · Lincoln Financial Field Philadelphia",hot:true},
  {id:3,tag:"🇳🇴 NORWAY",title:"Haaland Brace Fires Norway Past Senegal 3–2 in Thriller",body:"Erling Haaland scored twice as Norway beat Senegal 3-2 in an exciting match at MetLife Stadium. Haaland now has 4 World Cup goals — level with Mbappe in the Golden Boot race. Norway are through to the knockouts. Senegal must beat Iraq in their final group game.",meta:"June 22 · Group I · MetLife Stadium New Jersey",hot:false},
  {id:4,tag:"🇩🇿 ALGERIA",title:"Algeria Comeback: 2–1 Win Over Jordan Keeps Hopes Alive",body:"Algeria came from behind to beat Jordan 2-1 through goals from Benbouali (69') and Gouiri (82'). Algeria now have 3 points and stay alive for a best third-place spot. Jordan are eliminated with 0 points from 2 games.",meta:"June 22 · Group J · Levi's Stadium Santa Clara",hot:false},
  {id:5,tag:"☀️ MORNING READ",title:"What You Missed Overnight: 4 Huge Results on Day 12",body:"Monday June 22 (IST) was the most dramatic day of the 2026 World Cup so far. Messi broke the all-time record. France survived a storm delay. Haaland struck twice again. And Algeria came from behind. Argentina, France and Norway all qualified for the Round of 32.",meta:"June 23 morning · Day 12 summary",hot:false},
  {id:6,tag:"📊 GOLDEN BOOT",title:"Messi Leads Golden Boot Race with 5 Goals — Haaland & Mbappe Have 4",body:"After Day 12, Messi leads with 5 goals. Haaland and Mbappe are joint second with 4 each. Jonathan David (Canada) has 3. This is shaping up to be the most competitive Golden Boot race in World Cup history with three generational superstars all in contention.",meta:"Updated June 22 · After MD2",hot:false},
  {id:7,tag:"🇪🇸 YAMAL",title:"Lamine Yamal Scores His First World Cup Goal at 18",body:"Barcelona's Lamine Yamal scored his first ever World Cup goal as Spain demolished Saudi Arabia 4-0. At 18, he is one of the most electric players at the tournament. Spain are Group G leaders with 4 points.",meta:"June 21 · Group G · Mercedes-Benz Stadium Atlanta",hot:false},
  {id:8,tag:"🇮🇳 INDIA",title:"How to Watch World Cup 2026 Free in India — All Options",body:"JioCinema is streaming all 104 matches FREE on mobile — no subscription needed. Sports18 has full TV coverage. DD Sports has free-to-air coverage of selected matches. All times on KickoffIST.com are in Indian Standard Time (IST). India is 9.5 hours ahead of US Eastern Time — most big matches start between 10 PM and 9 AM IST.",meta:"Viewing guide for Indian fans 🇮🇳",hot:false},
];
export default function NewsPage() {
  return (
    <div style={{ maxWidth: "760px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "12px", fontWeight: 600, color: "#FF9933", letterSpacing: ".14em", marginBottom: "4px" }}>FIFA WORLD CUP 2026</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(28px,4vw,44px)", letterSpacing: "2px", color: "#fff", lineHeight: 1, marginBottom: "6px" }}>NEWS & STORIES</h1>
        <p style={{ fontSize: "12px", color: "rgba(200,212,232,.35)" }}>Latest · Updated June 22 2026 IST · Written for Indian fans</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {NEWS.map((item, i) => (
          <div key={item.id} style={{
            background: item.hot ? "rgba(255,153,51,.06)" : "#112040",
            border: `1px solid ${item.hot ? "rgba(255,153,51,.2)" : "rgba(255,255,255,.07)"}`,
            borderRadius: "14px", padding: "18px 20px",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "32px", letterSpacing: "1px", color: item.hot ? "#FF9933" : "rgba(200,212,232,.1)", lineHeight: 1, flexShrink: 0, minWidth: "28px" }}>{i+1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "11px", fontWeight: 600, color: item.hot ? "#FF9933" : "rgba(255,153,51,.7)", letterSpacing: ".1em", marginBottom: "5px" }}>{item.tag}</div>
                <h2 style={{ fontFamily: "'Teko',sans-serif", fontSize: "clamp(17px,3vw,22px)", fontWeight: 600, color: "#fff", letterSpacing: ".02em", lineHeight: 1.2, marginBottom: "8px" }}>{item.title}</h2>
                <p style={{ fontSize: "13px", color: "rgba(200,212,232,.55)", lineHeight: 1.7, marginBottom: "10px" }}>{item.body}</p>
                <div style={{ fontSize: "10px", color: "rgba(200,212,232,.28)", fontWeight: 600 }}>📍 {item.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", padding: "14px", background: "rgba(255,153,51,.05)", border: "1px solid rgba(255,153,51,.12)", borderRadius: "12px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "14px", fontWeight: 600, color: "#FF9933", marginBottom: "4px" }}>📱 Install KickoffIST on your phone</div>
        <div style={{ fontSize: "11px", color: "rgba(200,212,232,.4)" }}>Chrome → Menu → Add to Home Screen · Safari → Share → Add to Home Screen</div>
      </div>
    </div>
  );
}
