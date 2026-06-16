"use client";
import { useState } from "react";
import { Match } from "@/lib/types";

const PREDS: Record<string, { hp:number;dp:number;ap:number;analysis:string }> = {
  "Brazil|Morocco":    {hp:58,dp:22,ap:20,analysis:"Brazil arrive as tournament favourites with Vinicius Jr., Rodrygo and Endrick. Morocco proved in Qatar 2022 they never give up — Hakimi is world class at right back. AI lean: Brazil win 2–1, Morocco go down fighting with real honour."},
  "Argentina|Algeria": {hp:72,dp:18,ap:10,analysis:"Argentina are the defending champions. This could be Messi's final World Cup — he plays every game like it's sacred. Algeria qualified bravely but face the toughest possible opener. AI lean: Argentina win comfortably."},
  "France|Senegal":    {hp:55,dp:25,ap:20,analysis:"France packed with quality — Mbappé, Griezmann, Camavinga. Senegal are no pushover with Premier League quality throughout. AI lean: France win but Senegal will make it a contest."},
  "Germany|Curaçao":   {hp:88,dp:8,ap:4,analysis:"Germany are in a completely different class. Kroos and Müller lead a squad full of Champions League winners. AI lean: Germany win very comfortably — big goal difference opportunity."},
  "England|Croatia":   {hp:60,dp:22,ap:18,analysis:"England have a point to prove after Euro heartbreak. Croatia are battle-hardened veterans. Bellingham vs Modrić is the midfield battle of the match. AI lean: England edge it."},
  "default":           {hp:45,dp:28,ap:27,analysis:"Both teams are capable on the day. Form, home conditions and key player availability will be decisive. This match is genuinely too close to call — a tight contest is most likely."},
};

function getPred(home:string, away:string) {
  return PREDS[`${home}|${away}`] || PREDS[`${away}|${home}`] || PREDS["default"];
}

export default function PredictorClient({ matches }: { matches: Match[] }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<"home"|"draw"|"away"|null>(null);

  if (!matches.length) return (
    <div className="text-center py-12 bg-[#1a1f2e] rounded-2xl border border-white/8">
      <div className="text-4xl mb-3">🔮</div>
      <div className="font-bold text-white/60">No upcoming matches to predict</div>
    </div>
  );

  const match = matches[idx % matches.length];
  const pred = getPred(match.homeTeam.name, match.awayTeam.name);

  return (
    <div className="bg-[#1a1f2e] rounded-2xl border border-white/8 overflow-hidden">
      <div className="bg-gradient-to-br from-slate-800 to-[#0d1117] p-5 pitch-lines">
        <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-4">
          Match {idx+1} of {matches.length}
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="text-center flex-1">
            <span className="text-3xl block mb-1">{match.homeTeam.flag}</span>
            <span className="text-white font-bold text-sm">{match.homeTeam.shortName}</span>
          </div>
          <div className="text-center">
            <div className="text-white font-black text-lg">VS</div>
            <div className="text-green-400 text-xs mt-1">{match.istTime} IST</div>
            <div className="text-white/30 text-[10px]">{match.istDateLabel}</div>
          </div>
          <div className="text-center flex-1">
            <span className="text-3xl block mb-1">{match.awayTeam.flag}</span>
            <span className="text-white font-bold text-sm">{match.awayTeam.shortName}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-4">Your prediction</p>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {(["home","draw","away"] as const).map(pick => {
            const label = pick==="home" ? match.homeTeam.shortName : pick==="draw" ? "Draw" : match.awayTeam.shortName;
            const pct = pick==="home" ? pred.hp : pick==="draw" ? pred.dp : pred.ap;
            const sel = selected === pick;
            const colors = { home:"border-green-500 bg-green-500/10 text-green-400", draw:"border-amber-500 bg-amber-500/10 text-amber-400", away:"border-red-500 bg-red-500/10 text-red-400" };
            return (
              <button key={pick} onClick={() => setSelected(pick)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${sel ? colors[pick] : "border-white/10 bg-white/5 text-white/40 hover:border-white/20"}`}>
                <span className="block text-xl font-black">{pct}%</span>
                <span className="block text-[11px] font-bold mt-1 truncate">{label}</span>
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xs">✦</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">AI Analysis</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{pred.analysis}</p>
            <div className="mt-4">
              <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                <div className="bg-green-500 rounded-l-full" style={{width:`${pred.hp}%`}} />
                <div className="bg-white/20" style={{width:`${pred.dp}%`}} />
                <div className="bg-red-500 rounded-r-full" style={{width:`${pred.ap}%`}} />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-white/30 font-medium">
                <span>{match.homeTeam.shortName} {pred.hp}%</span>
                <span>Draw {pred.dp}%</span>
                <span>{pred.ap}% {match.awayTeam.shortName}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => {setIdx(i=>Math.max(0,i-1));setSelected(null);}} disabled={idx===0}
            className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-white/40 disabled:opacity-30">
            ← Prev
          </button>
          <button onClick={() => {setIdx(i=>(i+1)%matches.length);setSelected(null);}}
            className="flex-1 py-2.5 rounded-xl bg-green-500 text-black text-sm font-bold">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
