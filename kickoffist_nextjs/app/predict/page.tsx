import { getMatchesForToday, getMatchesForTomorrow } from "@/lib/api";
import PredictorClient from "@/components/PredictorClient";

export default async function PredictPage() {
  const [today, tmrw] = await Promise.all([
    getMatchesForToday(),
    getMatchesForTomorrow(),
  ]);
  const upcoming = [...today, ...tmrw].filter(m => m.status === "UPCOMING");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">🔮 Match Predictor</h1>
        <p className="text-sm text-slate-500 mt-1">AI analysis — no betting language, ever.</p>
      </div>
      <PredictorClient matches={upcoming} />
    </div>
  );
}
