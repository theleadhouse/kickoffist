import { getStaticWCMatches } from "@/lib/api";
import ScheduleCalendar from "@/components/ScheduleCalendar";

export const revalidate = 300;

export default async function SchedulePage() {
  const matches = await getStaticWCMatches();
  const played = matches.filter(m=>m.status==="FINISHED").length;
  return <ScheduleCalendar matches={matches} played={played}/>;
}
