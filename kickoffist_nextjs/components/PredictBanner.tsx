"use client";
import { useState, useEffect } from "react";
import { Match } from "@/lib/types";

export default function PredictBanner({ matches }: { matches: Match[] }) {
  const [picks, setPicks] = useState<Record<number,string>>({});
  const [submitted, setSubmitted] = useState<Record<number,boolean>>({});
  const [points, setPoints] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kist-picks");
      const savedPts = localStorage.getItem("kist-points");
      if (saved) setPicks(JSON.parse(saved));
      if (savedPts) setPoints(parseInt(savedPts));
    } catch {}
  }, []);

  const pick = (matchId: number, team: string) => {
    const next = { ...picks, [matchId]: team };
    setPicks(next);
    try { localStorage.setItem("kist-picks", JSON.stringify(next)); } catch {}
  };

  const submit = (matchId: number) => {
    setSubmitted(s => ({ ...s, [matchId]: true }));
  };

  const upcoming = matches.filter(m => m.status === "UPCOMING").slice(0, 3);
  if (upcoming.length === 0 || !show) return null;

  return (
    <div style={{ marginBottom: "20px", background: "rgba(19,136,8,.06)", border: "1px solid rgba(19,136,8,.2)", borderRadius: "14px", overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(19,136,8,.15)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "20px", letterSpacing: "1px", color: "#4ade80", marginBottom: "2px" }}>🔮 PREDICT & WIN</div>
          <div style={{ fontSize: "11px", color: "rgba(200,212,232,.5)" }}>Pick the winner before kickoff · Earn points · Top scorer wins</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "24px", letterSpacing: "1px", color: "#4ade80", lineHeight: 1 }}>{points}</div>
          <div style={{ fontSize: "9px", color: "rgba(200,212,232,.4)" }}>YOUR POINTS</div>
        </div>
      </div>
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {upcoming.map(m => {
          const myPick = picks[m.id];
          const done = submitted[m.id];
          return (
            <div key={m.id} style={{ background: "rgba(0,0,0,.2)", borderRadius: "10px", padding: "12px" }}>
              <div style={{ fontSize: "10px", color: "rgba(200,212,232,.4)", marginBottom: "8px", fontFamily: "'Teko',sans-serif", letterSpacing: ".06em" }}>
                {m.group} · {m.istTime} IST
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                {[m.homeTeam, { name: "Draw", flag: "🤝", id: -1, shortName: "Draw", crest: "" }, m.awayTeam].map(t => (
                  <button key={t.name} onClick={() => !done && pick(m.id, t.name)} style={{
                    flex: 1, padding: "10px 6px", borderRadius: "8px", border: "none", cursor: done ? "default" : "pointer",
                    background: myPick === t.name ? "rgba(255,153,51,.2)" : "rgba(255,255,255,.05)",
                    outline: myPick === t.name ? "1px solid rgba(255,153,51,.4)" : "1px solid rgba(255,255,255,.07)",
                    transition: "all .15s",
                  }}>
                    <div style={{ fontSize: "18px", marginBottom: "3px" }}>{t.flag || "🤝"}</div>
                    <div style={{ fontFamily: "'Teko',sans-serif", fontSize: "11px", fontWeight: 600, color: myPick === t.name ? "#FF9933" : "rgba(200,212,232,.6)", lineHeight: 1.2 }}>
                      {t.name === "Draw" ? "Draw" : t.name.length > 8 ? t.name.slice(0, 8) : t.name}
                    </div>
                  </button>
                ))}
              </div>
              {myPick && !done && (
                <button onClick={() => submit(m.id)} style={{
                  width: "100%", padding: "8px", background: "#FF9933", color: "#000",
                  fontFamily: "'Teko',sans-serif", fontSize: "14px", fontWeight: 600, letterSpacing: ".06em",
                  border: "none", borderRadius: "8px", cursor: "pointer",
                }}>
                  LOCK IN {myPick.toUpperCase()} →
                </button>
              )}
              {done && (
                <div style={{ textAlign: "center", fontSize: "12px", color: "#4ade80", fontFamily: "'Teko',sans-serif", letterSpacing: ".06em" }}>
                  ✅ LOCKED IN: {myPick} · Check result after FT
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
