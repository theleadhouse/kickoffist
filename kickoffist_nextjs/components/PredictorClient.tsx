"use client";
import { useState } from "react";
import { Match } from "@/lib/types";

const PREDICTIONS: Record<string, { hp: number; dp: number; ap: number; analysis: string }> = {
  "Brazil|Morocco": { hp: 58, dp: 22, ap: 20, analysis: "Brazil arrive as tournament favourites with Vinicius Jr., Rodrygo and Endrick. Morocco proved in Qatar 2022 they never give up — Hakimi is world class. AI lean: Brazil win 2–1, Morocco go down fighting." },
  "Argentina|Algeria": { hp: 72, dp: 18, ap: 10, analysis: "Argentina are the defending champions. This could be Messi's final World Cup — he plays every game like it's sacred. Algeria qualified admirably but face the toughest opener. AI lean: Argentina win comfortably." },
  "France|Senegal": { hp: 55, dp: 25, ap: 20, analysis: "France arrive packed with quality — Mbappé, Griezmann, Camavinga. Senegal are no pushover — Sadio Mané leads a team full of Premier League quality. AI lean: France win, but Senegal will make it a contest." },
  "Germany|Curaçao": { hp: 88, dp: 8, ap: 4, analysis: "Germany are in a different class to Curaçao. This is Germany's chance to set the tone with a big statement win. Toni Kroos leads midfield. AI lean: Germany win emphatically." },
  "England|Croatia": { hp: 60, dp: 22, ap: 18, analysis: "England have a point to prove after Euro heartbreak. Croatia are battle-hardened. Bellingham vs Modrić is the midfield battle. AI lean: England edge it — the squad is finally clicking." },
  "default": { hp: 45, dp: 28, ap: 27, analysis: "Both teams are capable on the day. Form, home conditions and key player availability will be decisive. This match could go either way — a close contest is most likely." },
};

function getPrediction(home: string, away: string) {
  return PREDICTIONS[`${home}|${away}`] || PREDICTIONS[`${away}|${home}`] || PREDICTIONS["default"];
}

export default function PredictorClient({ matches }: { matches: Match[] }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<"home" | "draw" | "away" | null>(null);

  if (matches.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
        <div className="text-4xl mb-3">🔮</div>
        <div className="font-bold text-slate-700">No upcoming matches to predict</div>
      </div>
    );
  }

  const match = matches[idx % matches.length];
  const pred = getPrediction(match.homeTeam.name, match.awayTeam.name);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Match {idx + 1} of {matches.length}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="text-center flex-1">
            <span className="text-3xl block mb-1">{match.homeTeam.flag}</span>
            <span className="text-white font-bold text-sm">{match.homeTeam.shortName}</span>
          </div>
          <div className="text-center">
            <div className="text-white font-black text-lg">VS</div>
            <div className="text-slate-400 text-xs mt-1">{match.istTime} IST</div>
            <div className="text-slate-500 text-[10px]">{match.istDateLabel}</div>
          </div>
          <div className="text-center flex-1">
            <span className="text-3xl block mb-1">{match.awayTeam.flag}</span>
            <span className="text-white font-bold text-sm">{match.awayTeam.shortName}</span>
          </div>
        </div>
      </div>

      {/* Pick */}
      <div className="p-5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Your prediction</p>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {(["home", "draw", "away"] as const).map(pick => {
            const label = pick === "home" ? match.homeTeam.shortName
                        : pick === "draw" ? "Draw"
                        : match.awayTeam.shortName;
            const pct = pick === "home" ? pred.hp : pick === "draw" ? pred.dp : pred.ap;
            const colors = {
              home: "border-green-500 bg-green-50 text-green-700",
              draw: "border-amber-500 bg-amber-50 text-amber-700",
              away: "border-red-500 bg-red-50 text-red-700",
            };
            return (
              <button
                key={pick}
                onClick={() => setSelected(pick)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  selected === pick ? colors[pick] : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                }`}
              >
                <span className="block text-xl font-black">{pct}%</span>
                <span className="block text-[11px] font-bold mt-1 truncate">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Analysis — shows after pick */}
        {selected && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs">✦</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">AI Analysis</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{pred.analysis}</p>

            {/* Probability bar */}
            <div className="mt-4">
              <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                <div className="bg-green-500 rounded-l-full transition-all" style={{ width: `${pred.hp}%` }} />
                <div className="bg-slate-300" style={{ width: `${pred.dp}%` }} />
                <div className="bg-red-500 rounded-r-full" style={{ width: `${pred.ap}%` }} />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-slate-500 font-medium">
                <span>{match.homeTeam.shortName} {pred.hp}%</span>
                <span>Draw {pred.dp}%</span>
                <span>{pred.ap}% {match.awayTeam.shortName}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => { setIdx(i => Math.max(0, i - 1)); setSelected(null); }}
            disabled={idx === 0}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 disabled:opacity-30"
          >
            ← Previous
          </button>
          <button
            onClick={() => { setIdx(i => (i + 1) % matches.length); setSelected(null); }}
            className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-sm font-bold"
          >
            Next Match →
          </button>
        </div>
      </div>
    </div>
  );
}
