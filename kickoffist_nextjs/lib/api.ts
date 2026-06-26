import { Match, MatchStatus } from "./types";
import { toISTTime, toISTDate, toISTDateLabel, getFlag, COMPETITIONS, todayIST, tomorrowIST } from "./utils";

const FIXTURES: {
  id:number; h:string; a:string; utc:string;
  group:string; stage:string; venue:string; city:string;
  res?:[number,number];
  goals?:{team:string;player:string;minute:number}[];
}[] = [
  // MD1
  {id:1, h:"Mexico",       a:"South Africa",   utc:"2026-06-11T19:00:00Z",group:"A",stage:"Group Stage",venue:"Estadio Azteca",           city:"Mexico City",         res:[2,0],goals:[{team:"Mexico",player:"Jiménez",minute:23},{team:"Mexico",player:"Quiñones",minute:71}]},
  {id:2, h:"South Korea",  a:"Czechia",        utc:"2026-06-12T02:00:00Z",group:"A",stage:"Group Stage",venue:"Estadio Akron",            city:"Guadalajara",         res:[2,1],goals:[{team:"South Korea",player:"Hwang",minute:44},{team:"South Korea",player:"Oh",minute:71},{team:"Czechia",player:"Schick",minute:60}]},
  {id:3, h:"Canada",       a:"Bosnia & Herz.", utc:"2026-06-12T19:00:00Z",group:"B",stage:"Group Stage",venue:"BMO Field",                city:"Toronto",             res:[1,1]},
  {id:4, h:"Qatar",        a:"Switzerland",    utc:"2026-06-12T22:00:00Z",group:"B",stage:"Group Stage",venue:"Bay Area Stadium",         city:"San Francisco",       res:[1,1]},
  {id:5, h:"USA",          a:"Paraguay",       utc:"2026-06-13T01:00:00Z",group:"D",stage:"Group Stage",venue:"SoFi Stadium",             city:"Los Angeles",         res:[4,1],goals:[{team:"USA",player:"Balogun",minute:12},{team:"USA",player:"Balogun",minute:45},{team:"USA",player:"Reyna",minute:60},{team:"USA",player:"Pulisic",minute:88},{team:"Paraguay",player:"Enciso",minute:70}]},
  {id:6, h:"Brazil",       a:"Morocco",        utc:"2026-06-13T22:00:00Z",group:"C",stage:"Group Stage",venue:"MetLife Stadium",          city:"East Rutherford, NJ", res:[1,1]},
  {id:7, h:"Haiti",        a:"Scotland",       utc:"2026-06-14T01:00:00Z",group:"C",stage:"Group Stage",venue:"Gillette Stadium",         city:"Foxborough, MA",      res:[0,1],goals:[{team:"Scotland",player:"McGinn",minute:28}]},
  {id:8, h:"Australia",    a:"Turkey",         utc:"2026-06-14T04:00:00Z",group:"D",stage:"Group Stage",venue:"BC Place",                 city:"Vancouver",           res:[2,0],goals:[{team:"Australia",player:"Irankunda",minute:27},{team:"Australia",player:"Metcalfe",minute:75}]},
  {id:9, h:"Germany",      a:"Curaçao",        utc:"2026-06-14T17:00:00Z",group:"E",stage:"Group Stage",venue:"NRG Stadium",              city:"Houston",             res:[7,1],goals:[{team:"Germany",player:"Havertz",minute:8},{team:"Germany",player:"Havertz",minute:34},{team:"Germany",player:"Müller",minute:45},{team:"Germany",player:"Gnabry",minute:52},{team:"Germany",player:"Musiala",minute:61},{team:"Germany",player:"Sané",minute:74},{team:"Germany",player:"Wirtz",minute:82},{team:"Curaçao",player:"Comenencia",minute:89}]},
  {id:10,h:"Netherlands",  a:"Japan",          utc:"2026-06-14T20:00:00Z",group:"F",stage:"Group Stage",venue:"AT&T Stadium",            city:"Dallas",              res:[2,2]},
  {id:11,h:"Ivory Coast",  a:"Ecuador",        utc:"2026-06-14T23:00:00Z",group:"E",stage:"Group Stage",venue:"Lincoln Financial Field",  city:"Philadelphia",        res:[1,0]},
  {id:12,h:"Sweden",       a:"Tunisia",        utc:"2026-06-15T02:00:00Z",group:"F",stage:"Group Stage",venue:"Estadio BBVA",            city:"Monterrey",           res:[5,1],goals:[{team:"Sweden",player:"Isak",minute:15},{team:"Sweden",player:"Ayari",minute:29},{team:"Sweden",player:"Ayari",minute:44},{team:"Sweden",player:"Gyokeres",minute:67},{team:"Sweden",player:"Svanberg",minute:88},{team:"Tunisia",player:"Rekik",minute:55}]},
  {id:13,h:"Spain",        a:"Cabo Verde",     utc:"2026-06-15T16:00:00Z",group:"G",stage:"Group Stage",venue:"Mercedes-Benz Stadium",   city:"Atlanta",             res:[0,0]},
  {id:14,h:"Belgium",      a:"Egypt",          utc:"2026-06-15T19:00:00Z",group:"H",stage:"Group Stage",venue:"Lumen Field",             city:"Seattle",             res:[1,1]},
  {id:15,h:"Saudi Arabia", a:"Uruguay",        utc:"2026-06-15T22:00:00Z",group:"G",stage:"Group Stage",venue:"Hard Rock Stadium",       city:"Miami Gardens, FL",   res:[1,1]},
  {id:16,h:"Iran",         a:"New Zealand",    utc:"2026-06-16T01:00:00Z",group:"H",stage:"Group Stage",venue:"SoFi Stadium",            city:"Los Angeles",         res:[2,2],goals:[{team:"New Zealand",player:"Just",minute:7},{team:"Iran",player:"Rezaeian",minute:32},{team:"New Zealand",player:"Just",minute:54},{team:"Iran",player:"Mohebbi",minute:64}]},
  // MD2
  {id:17,h:"France",       a:"Senegal",        utc:"2026-06-16T19:00:00Z",group:"I",stage:"Group Stage",venue:"MetLife Stadium",         city:"East Rutherford, NJ", res:[3,1],goals:[{team:"France",player:"Mbappe",minute:66},{team:"France",player:"Barcola",minute:82},{team:"Senegal",player:"Mbaye",minute:90},{team:"France",player:"Mbappe",minute:91}]},
  {id:18,h:"Iraq",         a:"Norway",         utc:"2026-06-16T22:00:00Z",group:"I",stage:"Group Stage",venue:"Gillette Stadium",        city:"Foxborough, MA",      res:[1,4],goals:[{team:"Norway",player:"Haaland",minute:29},{team:"Iraq",player:"Hussein",minute:39},{team:"Norway",player:"Haaland",minute:43},{team:"Norway",player:"Ostigard",minute:76}]},
  {id:19,h:"Argentina",    a:"Algeria",        utc:"2026-06-17T01:00:00Z",group:"J",stage:"Group Stage",venue:"Arrowhead Stadium",       city:"Kansas City, MO",     res:[3,0],goals:[{team:"Argentina",player:"Messi",minute:17},{team:"Argentina",player:"Messi",minute:60},{team:"Argentina",player:"Messi",minute:76}]},
  {id:20,h:"Austria",      a:"Jordan",         utc:"2026-06-17T04:00:00Z",group:"J",stage:"Group Stage",venue:"Levi's Stadium",         city:"Santa Clara, CA",     res:[3,1],goals:[{team:"Austria",player:"Schmid",minute:38},{team:"Jordan",player:"Olwan",minute:51},{team:"Austria",player:"Alarab OG",minute:76},{team:"Austria",player:"Arnautovic",minute:90}]},
  {id:21,h:"Portugal",     a:"DR Congo",       utc:"2026-06-17T17:00:00Z",group:"K",stage:"Group Stage",venue:"NRG Stadium",             city:"Houston",             res:[1,1],goals:[{team:"Portugal",player:"Neves",minute:18},{team:"DR Congo",player:"Mbemba",minute:52}]},
  {id:22,h:"England",      a:"Croatia",        utc:"2026-06-17T20:00:00Z",group:"L",stage:"Group Stage",venue:"AT&T Stadium",           city:"Dallas",              res:[4,2],goals:[{team:"England",player:"Kane",minute:12},{team:"Croatia",player:"Baturina",minute:36},{team:"England",player:"Kane",minute:42},{team:"Croatia",player:"Musa",minute:45},{team:"England",player:"Bellingham",minute:55},{team:"England",player:"Rashford",minute:72}]},
  {id:23,h:"Ghana",        a:"Panama",         utc:"2026-06-17T23:00:00Z",group:"A",stage:"Group Stage",venue:"BMO Field",               city:"Toronto",             res:[1,0],goals:[{team:"Ghana",player:"Yirenkyi",minute:88}]},
  {id:24,h:"Uzbekistan",   a:"Colombia",       utc:"2026-06-18T02:00:00Z",group:"K",stage:"Group Stage",venue:"Estadio Azteca",          city:"Mexico City",         res:[1,3],goals:[{team:"Colombia",player:"Munoz",minute:28},{team:"Uzbekistan",player:"Fayzullayev",minute:58},{team:"Colombia",player:"Diaz",minute:67},{team:"Colombia",player:"Campaz",minute:85}]},
  {id:25,h:"Czechia",      a:"South Africa",   utc:"2026-06-18T16:00:00Z",group:"A",stage:"Group Stage",venue:"Mercedes-Benz Stadium",  city:"Atlanta",             res:[1,1]},
  {id:26,h:"Switzerland",  a:"Bosnia & Herz.", utc:"2026-06-18T19:00:00Z",group:"B",stage:"Group Stage",venue:"SoFi Stadium",           city:"Los Angeles",         res:[4,1],goals:[{team:"Switzerland",player:"Manzambi",minute:74},{team:"Switzerland",player:"Vargas",minute:82},{team:"Switzerland",player:"Manzambi",minute:90},{team:"Bosnia & Herz.",player:"Mahmic",minute:88}]},
  {id:27,h:"Canada",       a:"Qatar",          utc:"2026-06-18T22:00:00Z",group:"B",stage:"Group Stage",venue:"BC Place",               city:"Vancouver",           res:[6,0],goals:[{team:"Canada",player:"Larin",minute:18},{team:"Canada",player:"David",minute:34},{team:"Canada",player:"David",minute:45},{team:"Canada",player:"Saliba",minute:71},{team:"Canada",player:"David",minute:82}]},
  {id:28,h:"Mexico",       a:"South Korea",    utc:"2026-06-19T01:00:00Z",group:"A",stage:"Group Stage",venue:"Estadio Akron",           city:"Guadalajara",         res:[1,0],goals:[{team:"Mexico",player:"Romo",minute:50}]},
  {id:29,h:"USA",          a:"Australia",      utc:"2026-06-19T19:00:00Z",group:"D",stage:"Group Stage",venue:"Lumen Field",            city:"Seattle",             res:[2,0],goals:[{team:"USA",player:"Burgess OG",minute:11},{team:"USA",player:"Freeman",minute:43}]},
  {id:30,h:"Scotland",     a:"Morocco",        utc:"2026-06-19T22:00:00Z",group:"C",stage:"Group Stage",venue:"Gillette Stadium",        city:"Foxborough, MA",      res:[0,1],goals:[{team:"Morocco",player:"Dari",minute:1}]},
  {id:31,h:"Brazil",       a:"Haiti",          utc:"2026-06-20T01:00:00Z",group:"C",stage:"Group Stage",venue:"Lincoln Financial Field", city:"Philadelphia",        res:[3,0],goals:[{team:"Brazil",player:"Vinicius",minute:34},{team:"Brazil",player:"Rodrygo",minute:67},{team:"Brazil",player:"Endrick",minute:88}]},
  {id:32,h:"Turkey",       a:"Paraguay",       utc:"2026-06-20T04:00:00Z",group:"D",stage:"Group Stage",venue:"Levi's Stadium",         city:"Santa Clara, CA",     res:[0,1],goals:[{team:"Paraguay",player:"Almirón",minute:59}]},
  {id:33,h:"Netherlands",  a:"Sweden",         utc:"2026-06-20T17:00:00Z",group:"F",stage:"Group Stage",venue:"NRG Stadium",            city:"Houston",             res:[5,1],goals:[{team:"Netherlands",player:"Gakpo",minute:18},{team:"Netherlands",player:"Brobbey",minute:34},{team:"Netherlands",player:"Brobbey",minute:56},{team:"Netherlands",player:"Malen",minute:71},{team:"Netherlands",player:"Depay",minute:84},{team:"Sweden",player:"Isak",minute:44}]},
  {id:34,h:"Germany",      a:"Ivory Coast",    utc:"2026-06-20T20:00:00Z",group:"E",stage:"Group Stage",venue:"BMO Field",              city:"Toronto",             res:[2,1],goals:[{team:"Ivory Coast",player:"Kessie",minute:34},{team:"Germany",player:"Undav",minute:71},{team:"Germany",player:"Undav",minute:90}]},
  {id:35,h:"Ecuador",      a:"Curaçao",        utc:"2026-06-21T00:00:00Z",group:"E",stage:"Group Stage",venue:"Arrowhead Stadium",      city:"Kansas City, MO",     res:[0,0]},
  {id:36,h:"Tunisia",      a:"Japan",          utc:"2026-06-21T04:00:00Z",group:"F",stage:"Group Stage",venue:"Estadio BBVA",           city:"Monterrey",           res:[0,4],goals:[{team:"Japan",player:"Ueda",minute:18},{team:"Japan",player:"Ueda",minute:55},{team:"Japan",player:"Ito",minute:67},{team:"Japan",player:"Nakamura",minute:88}]},
  {id:37,h:"Spain",        a:"Saudi Arabia",   utc:"2026-06-21T16:00:00Z",group:"G",stage:"Group Stage",venue:"Mercedes-Benz Stadium",  city:"Atlanta",             res:[4,0],goals:[{team:"Spain",player:"Yamal",minute:12},{team:"Spain",player:"Morata",minute:45},{team:"Spain",player:"Williams",minute:67},{team:"Spain",player:"Fabián",minute:82}]},
  {id:38,h:"Belgium",      a:"Iran",           utc:"2026-06-21T19:00:00Z",group:"H",stage:"Group Stage",venue:"SoFi Stadium",           city:"Los Angeles",         res:[1,1]},
  {id:39,h:"Uruguay",      a:"Cabo Verde",     utc:"2026-06-21T22:00:00Z",group:"G",stage:"Group Stage",venue:"Hard Rock Stadium",      city:"Miami Gardens, FL",   res:[2,2]},
  {id:40,h:"New Zealand",  a:"Egypt",          utc:"2026-06-22T01:00:00Z",group:"H",stage:"Group Stage",venue:"BC Place",               city:"Vancouver",           res:[1,3],goals:[{team:"Egypt",player:"Trezeguet",minute:22},{team:"New Zealand",player:"Wood",minute:44},{team:"Egypt",player:"Salah",minute:67},{team:"Egypt",player:"Mostafa",minute:82}]},
  // MD2 Jun 22 IST — today
  {id:41,h:"Argentina",    a:"Austria",        utc:"2026-06-22T17:00:00Z",group:"J",stage:"Group Stage",venue:"AT&T Stadium",           city:"Dallas",             res:[2,0],goals:[{team:"Argentina",player:"Messi",minute:67},{team:"Argentina",player:"Messi",minute:90}]},
  {id:42,h:"France",       a:"Iraq",           utc:"2026-06-22T21:00:00Z",group:"I",stage:"Group Stage",venue:"Lincoln Financial Field", city:"Philadelphia",        res:[3,0],goals:[{team:"France",player:"Mbappe",minute:14},{team:"France",player:"Mbappe",minute:54},{team:"France",player:"Dembele",minute:66}]},
  {id:43,h:"Norway",       a:"Senegal",        utc:"2026-06-23T00:00:00Z",group:"I",stage:"Group Stage",venue:"MetLife Stadium",        city:"East Rutherford, NJ", res:[3,2],goals:[{team:"Norway",player:"Haaland",minute:22},{team:"Norway",player:"Haaland",minute:51},{team:"Norway",player:"Ostigard",minute:76},{team:"Senegal",player:"Sarr",minute:78},{team:"Senegal",player:"Mbaye",minute:90}]},
  {id:44,h:"Jordan",       a:"Algeria",        utc:"2026-06-23T03:30:00Z",group:"J",stage:"Group Stage",venue:"Levi's Stadium",         city:"Santa Clara, CA",     res:[1,2],goals:[{team:"Jordan",player:"Al-Rashdan",minute:36},{team:"Algeria",player:"Benbouali",minute:69},{team:"Algeria",player:"Gouiri",minute:82}]},
  // MD2 Jun 23 IST
  {id:45,h:"Portugal",     a:"Uzbekistan",     utc:"2026-06-23T17:00:00Z",group:"K",stage:"Group Stage",venue:"NRG Stadium",            city:"Houston",             res:[5,0],goals:[{team:"Portugal",player:"Ronaldo",minute:31},{team:"Portugal",player:"Ronaldo",minute:67},{team:"Portugal",player:"Fernandes",minute:44},{team:"Portugal",player:"Leao",minute:78},{team:"Portugal",player:"Joao Felix",minute:88}]},
  {id:46,h:"England",      a:"Ghana",          utc:"2026-06-23T20:00:00Z",group:"L",stage:"Group Stage",venue:"Gillette Stadium",       city:"Foxborough, MA",      res:[0,0]},
  {id:47,h:"Panama",       a:"Croatia",        utc:"2026-06-23T23:00:00Z",group:"L",stage:"Group Stage",venue:"BMO Field",              city:"Toronto",             res:[0,1],goals:[{team:"Croatia",player:"Budimir",minute:61}]},
  {id:48,h:"Colombia",     a:"DR Congo",       utc:"2026-06-24T02:00:00Z",group:"K",stage:"Group Stage",venue:"Estadio Akron",          city:"Guadalajara",         res:[1,0],goals:[{team:"Colombia",player:"Diaz",minute:73}]},
  // MD3
  {id:49,h:"Switzerland",  a:"Canada",         utc:"2026-06-24T19:00:00Z",group:"B",stage:"Group Stage",venue:"BC Place",               city:"Vancouver",res:[3,1]},
  {id:50,h:"Bosnia & Herz.",a:"Qatar",         utc:"2026-06-24T19:00:00Z",group:"B",stage:"Group Stage",venue:"Arrowhead Stadium",      city:"Kansas City, MO",res:[3,1]},
  {id:51,h:"Morocco",      a:"Haiti",          utc:"2026-06-24T22:00:00Z",group:"C",stage:"Group Stage",venue:"Mercedes-Benz Stadium",  city:"Atlanta",res:[4,2]},
  {id:52,h:"Scotland",     a:"Brazil",         utc:"2026-06-24T22:00:00Z",group:"C",stage:"Group Stage",venue:"Hard Rock Stadium",      city:"Miami Gardens, FL",res:[0,3],goals:[{team:"Brazil",player:"Vinicius",minute:34},{team:"Brazil",player:"Vinicius",minute:67},{team:"Brazil",player:"Rodrygo",minute:78}]},
  {id:53,h:"South Africa", a:"South Korea",    utc:"2026-06-25T01:00:00Z",group:"A",stage:"Group Stage",venue:"Estadio BBVA",           city:"Monterrey",           res:[1,0],goals:[{team:"South Africa",player:"Maseko",minute:63}]},
  {id:54,h:"Czechia",      a:"Mexico",         utc:"2026-06-25T01:00:00Z",group:"A",stage:"Group Stage",venue:"Estadio Azteca",         city:"Mexico City",res:[0,3],goals:[{team:"Mexico",player:"Chavez",minute:55},{team:"Mexico",player:"Quinones",minute:61},{team:"Mexico",player:"Fidalgo",minute:90}]},
  {id:55,h:"Ecuador",      a:"Germany",        utc:"2026-06-25T20:00:00Z",group:"E",stage:"Group Stage",venue:"MetLife Stadium",        city:"East Rutherford, NJ",res:[2,1],goals:[{team:"Ecuador",player:"Caicedo",minute:54},{team:"Ecuador",player:"Estrada",minute:73},{team:"Germany",player:"Undav",minute:12}]},
  {id:56,h:"Curaçao",      a:"Ivory Coast",    utc:"2026-06-25T20:00:00Z",group:"E",stage:"Group Stage",venue:"Lincoln Financial Field",city:"Philadelphia",res:[0,2],goals:[{team:"Ivory Coast",player:"Kessie",minute:67},{team:"Ivory Coast",player:"Pepe",minute:81}]},
  {id:57,h:"Japan",        a:"Sweden",         utc:"2026-06-25T23:00:00Z",group:"F",stage:"Group Stage",venue:"AT&T Stadium",           city:"Dallas",res:[1,1],goals:[{team:"Japan",player:"Maeda",minute:59},{team:"Sweden",player:"Elanga",minute:65}]},
  {id:58,h:"Tunisia",      a:"Netherlands",    utc:"2026-06-25T23:00:00Z",group:"F",stage:"Group Stage",venue:"Arrowhead Stadium",      city:"Kansas City, MO",res:[1,3],goals:[{team:"Netherlands",player:"Brobbey",minute:7},{team:"Netherlands",player:"Van Hecke",minute:62},{team:"Tunisia",player:"Mastouri",minute:54},{team:"Netherlands",player:"Reijnders",minute:78}]},
  {id:59,h:"Turkey",       a:"USA",            utc:"2026-06-26T02:00:00Z",group:"D",stage:"Group Stage",venue:"SoFi Stadium",           city:"Los Angeles",res:[0,2],goals:[{team:"Ivory Coast",player:"Kessie",minute:67},{team:"Ivory Coast",player:"Pepe",minute:81}]},
  {id:60,h:"Paraguay",     a:"Australia",      utc:"2026-06-26T02:00:00Z",group:"D",stage:"Group Stage",venue:"Levi's Stadium",         city:"Santa Clara, CA",res:[0,0]},
  {id:61,h:"Norway",       a:"France",         utc:"2026-06-26T19:00:00Z",group:"I",stage:"Group Stage",venue:"Gillette Stadium",       city:"Foxborough, MA"},
  {id:62,h:"Senegal",      a:"Iraq",           utc:"2026-06-26T19:00:00Z",group:"I",stage:"Group Stage",venue:"BMO Field",              city:"Toronto"},
  {id:63,h:"Cabo Verde",   a:"Saudi Arabia",   utc:"2026-06-27T00:00:00Z",group:"G",stage:"Group Stage",venue:"NRG Stadium",            city:"Houston"},
  {id:64,h:"Uruguay",      a:"Spain",          utc:"2026-06-27T00:00:00Z",group:"G",stage:"Group Stage",venue:"Estadio Akron",          city:"Guadalajara"},
  {id:65,h:"Egypt",        a:"Iran",           utc:"2026-06-27T03:00:00Z",group:"H",stage:"Group Stage",venue:"Lumen Field",            city:"Seattle"},
  {id:66,h:"New Zealand",  a:"Belgium",        utc:"2026-06-27T03:00:00Z",group:"H",stage:"Group Stage",venue:"BC Place",               city:"Vancouver"},
  {id:67,h:"Panama",       a:"England",        utc:"2026-06-27T21:00:00Z",group:"L",stage:"Group Stage",venue:"MetLife Stadium",        city:"East Rutherford, NJ"},
  {id:68,h:"Croatia",      a:"Ghana",          utc:"2026-06-27T21:00:00Z",group:"L",stage:"Group Stage",venue:"Lincoln Financial Field", city:"Philadelphia"},
  {id:69,h:"Colombia",     a:"Portugal",       utc:"2026-06-28T00:00:00Z",group:"K",stage:"Group Stage",venue:"Hard Rock Stadium",      city:"Miami Gardens, FL"},
  {id:70,h:"DR Congo",     a:"Uzbekistan",     utc:"2026-06-28T00:00:00Z",group:"K",stage:"Group Stage",venue:"Mercedes-Benz Stadium",  city:"Atlanta"},
  {id:71,h:"Algeria",      a:"Austria",        utc:"2026-06-28T02:00:00Z",group:"J",stage:"Group Stage",venue:"Arrowhead Stadium",      city:"Kansas City, MO"},
  {id:72,h:"Jordan",       a:"Argentina",      utc:"2026-06-28T02:00:00Z",group:"J",stage:"Group Stage",venue:"AT&T Stadium",           city:"Dallas"},
  // Knockouts
  {id:80, h:"TBD",a:"TBD",utc:"2026-06-29T21:00:00Z",group:"",stage:"Round of 32",   venue:"TBD",city:"USA"},
  {id:90, h:"TBD",a:"TBD",utc:"2026-07-04T20:00:00Z",group:"",stage:"Round of 16",   venue:"TBD",city:"USA"},
  {id:100,h:"TBD",a:"TBD",utc:"2026-07-09T20:00:00Z",group:"",stage:"Quarter-Final", venue:"TBD",city:"USA"},
  {id:110,h:"TBD",a:"TBD",utc:"2026-07-14T20:00:00Z",group:"",stage:"Semi-Final",    venue:"TBD",city:"USA"},
  {id:120,h:"TBD",a:"TBD",utc:"2026-07-19T19:00:00Z",group:"",stage:"🏆 FINAL",     venue:"MetLife Stadium",city:"East Rutherford, NJ"},
];

function fixtureToMatch(f: typeof FIXTURES[0]): Match {
  const comp = COMPETITIONS.WC;
  const now   = Date.now();
  const utcMs = new Date(f.utc).getTime();
  const diffMs = now - utcMs;
  const isFinished = !!f.res || diffMs > 130 * 60 * 1000;
  const isLive     = !f.res && diffMs > 0 && diffMs < 130 * 60 * 1000;
  const status: MatchStatus = isLive ? "LIVE" : isFinished ? "FINISHED" : "UPCOMING";
  return {
    id: f.id,
    homeTeam:{id:f.id*10,  name:f.h,shortName:f.h,crest:"",flag:getFlag(f.h)},
    awayTeam:{id:f.id*10+1,name:f.a,shortName:f.a,crest:"",flag:getFlag(f.a)},
    utcDate:f.utc,istTime:toISTTime(f.utc),istDate:toISTDate(f.utc),istDateLabel:toISTDateLabel(f.utc),
    status,
    score:{home:f.res?.[0]??null,away:f.res?.[1]??null},
    competition:{id:2000,name:comp.name,code:"WC",color:comp.color,icon:comp.icon},
    group:f.group?`Group ${f.group}`:f.stage,
    venue:f.venue,city:f.city,goals:f.goals,
  };
}

export function getStaticWCMatches():Match[]      { return FIXTURES.map(fixtureToMatch).sort((a,b)=>new Date(a.utcDate).getTime()-new Date(b.utcDate).getTime()); }
export function getStaticTodayMatches():Match[]   { return getStaticWCMatches().filter(m=>m.istDate===todayIST()); }
export function getStaticTomorrowMatches():Match[]{ return getStaticWCMatches().filter(m=>m.istDate===tomorrowIST()); }

export async function getLiveMatches():Promise<Match[]>{
  try{
    const key=process.env.RAPIDAPI_KEY||"";
    if(!key) return getStaticWCMatches().filter(m=>m.status==="LIVE");
    const r=await fetch("https://free-api-live-football-data.p.rapidapi.com/football-get-all-livescores",{
      headers:{"x-rapidapi-host":"free-api-live-football-data.p.rapidapi.com","x-rapidapi-key":key},cache:"no-store",
    });
    if(!r.ok) return getStaticWCMatches().filter(m=>m.status==="LIVE");
    const d=await r.json() as {response?:{id:number;homeTeam:{name:string};awayTeam:{name:string};homeGoals:number;awayGoals:number;minute:string;league:{name:string;id:number};events?:{type:string;player:string;time:string;team:string}[]}[]};
    const wc=(d.response||[]).filter((m:any)=>m.league?.name?.toLowerCase().includes("world cup")||m.league?.id===1);
    if(!wc.length) return getStaticWCMatches().filter(m=>m.status==="LIVE");
    return wc.map((m:any)=>({
      id:m.id,homeTeam:{id:m.id,name:m.homeTeam.name,shortName:m.homeTeam.name,crest:"",flag:getFlag(m.homeTeam.name)},
      awayTeam:{id:m.id+1,name:m.awayTeam.name,shortName:m.awayTeam.name,crest:"",flag:getFlag(m.awayTeam.name)},
      utcDate:new Date().toISOString(),istTime:toISTTime(new Date().toISOString()),
      istDate:todayIST(),istDateLabel:"Live",status:"LIVE" as MatchStatus,
      score:{home:m.homeGoals??0,away:m.awayGoals??0},
      competition:{id:2000,name:"FIFA World Cup",code:"WC",icon:"🏆",color:"amber"},
      group:"",minute:parseInt(m.minute)||undefined,
      goals:(m.events||[]).filter((e:any)=>e.type==="Goal").map((e:any)=>({team:e.team,player:e.player,minute:parseInt(e.time)||0})),
    }));
  }catch{return getStaticWCMatches().filter(m=>m.status==="LIVE");}
}

export async function getMatchesForToday():Promise<Match[]>   {return getStaticTodayMatches();}
export async function getMatchesForTomorrow():Promise<Match[]>{return getStaticTomorrowMatches();}
export async function getWCSchedule():Promise<Match[]>        {return getStaticWCMatches();}
