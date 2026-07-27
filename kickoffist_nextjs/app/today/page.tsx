"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const s = document.createElement('style');
    s.innerHTML = CSS;
    document.head.appendChild(s);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800;900&family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(link);
    function tick() {
      const d = new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Kolkata"}));
      const el = document.getElementById("ist-clock");
      if(el) el.textContent = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")} IST`;
      // Countdown
      const targets = [
        {id:'cd-sf1', utc:'2026-07-14T19:00:00Z'},
        {id:'cd-sf2', utc:'2026-07-15T19:00:00Z'},
        {id:'cd-fin', utc:'2026-07-19T19:00:00Z'},
      ];
      targets.forEach(({id,utc})=>{
        const el2=document.getElementById(id);
        if(!el2) return;
        const diff=new Date(utc).getTime()-Date.now();
        if(diff<=0){el2.textContent='LIVE NOW';return;}
        const h=Math.floor(diff/3600000);
        const m=Math.floor((diff%3600000)/60000);
        if(h>48) el2.textContent=`${Math.floor(h/24)}d ${h%24}h`;
        else el2.textContent=`${h}h ${m}m`;
      });
    }
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[]);
  return <div dangerouslySetInnerHTML={{__html:HTML}}/>;
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html,body{overflow-x:hidden;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;}

/* ── MAGAZINE THEME ──
   Cream paper #FAF7F2 · Ink black #111 · Grass green #1A6B3C
   Match red #C8102E · Gold #B8860B · Orange accent #E85D04 */
:root{
  --paper:#FAF7F2;
  --paper2:#F2EDE6;
  --ink:#111111;
  --ink2:#333333;
  --muted:#666666;
  --dim:#999999;
  --green:#1A6B3C;
  --green2:#0F4024;
  --red:#C8102E;
  --gold:#B8860B;
  --orange:#E85D04;
  --border:#DDD5C8;
  --card:#FFFFFF;
}

body{background:var(--paper);color:var(--ink);}

/* ── MASTHEAD ── */
.masthead{
  background:var(--green2);
  border-bottom:4px solid var(--gold);
  padding:0 16px;
}
.masthead-inner{
  max-width:960px;margin:0 auto;
  height:58px;display:flex;align-items:center;
  justify-content:space-between;gap:12px;
}
.mast-logo{display:flex;align-items:center;gap:12px;text-decoration:none;}
.mast-badge{
  width:42px;height:42px;background:var(--gold);border-radius:6px;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.mast-badge span{font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--green2);line-height:1;}
.mast-name{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:5px;color:#fff;line-height:1;}
.mast-name em{color:var(--gold);font-style:normal;}
.mast-sub{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;color:rgba(255,255,255,.4);letter-spacing:.12em;margin-top:1px;}
.mast-right{display:flex;align-items:center;gap:10px;}
.mast-clock{
  font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--gold);
  background:rgba(255,255,255,.07);border:1px solid rgba(184,134,11,.3);
  border-radius:4px;padding:5px 12px;
}
.mast-watch{
  font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;
  color:var(--green2);background:var(--gold);
  border-radius:4px;padding:5px 10px;letter-spacing:.06em;text-decoration:none;
}

/* ── DATE BANNER ── */
.date-banner{
  background:var(--paper2);
  border-bottom:2px solid var(--border);
  padding:7px 16px;
  display:flex;align-items:center;justify-content:center;gap:20px;
  flex-wrap:wrap;
}
.date-banner-text{
  font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;
  color:var(--muted);letter-spacing:.14em;
}
.date-banner-issue{
  font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;
  color:var(--gold);letter-spacing:.1em;
}

/* ── MAIN ── */
main{max-width:960px;margin:0 auto;padding:0 16px 80px;}

/* ── HERO ── */
.hero{
  position:relative;overflow:hidden;
  border-radius:0 0 0 0;
  margin:0 -16px 28px;
  min-height:420px;
  background:linear-gradient(160deg, var(--green2) 0%, #0a2d1a 40%, #061a10 100%);
  display:flex;flex-direction:column;justify-content:flex-end;
  padding:28px 24px;
}
/* Pitch pattern overlay */
.hero::before{
  content:'';position:absolute;inset:0;
  background:
    repeating-linear-gradient(90deg,rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 80px),
    repeating-linear-gradient(rgba(255,255,255,.025) 0,rgba(255,255,255,.025) 1px,transparent 1px,transparent 80px);
}
/* Centre circle */
.hero::after{
  content:'';position:absolute;
  top:50%;left:50%;transform:translate(-50%,-50%);
  width:300px;height:300px;border-radius:50%;
  border:1px solid rgba(255,255,255,.07);
}
.hero-bg-flags{
  position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  gap:0;opacity:.07;pointer-events:none;overflow:hidden;
}
.hero-bg-flags img{width:200px;height:auto;filter:grayscale(100%);}
.hero-content{position:relative;z-index:1;}
.hero-kicker{
  font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:800;
  color:var(--gold);letter-spacing:.2em;margin-bottom:10px;
  display:flex;align-items:center;gap:8px;
}
.hero-kicker::before{content:'';display:inline-block;width:24px;height:2px;background:var(--gold);}
.hero-headline{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(44px,9vw,80px);
  letter-spacing:3px;color:#fff;line-height:.95;
  margin-bottom:12px;
}
.hero-headline em{color:var(--gold);font-style:normal;}
.hero-deck{
  font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:600;
  color:rgba(255,255,255,.65);margin-bottom:20px;line-height:1.4;
  max-width:520px;
}
.hero-matches{display:flex;gap:10px;flex-wrap:wrap;}
.hero-match-pill{
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);
  backdrop-filter:blur(10px);border-radius:8px;padding:10px 14px;
  display:flex;align-items:center;gap:10px;flex-shrink:0;
  text-decoration:none;transition:all .2s;
}
.hero-match-pill:hover{background:rgba(255,255,255,.14);border-color:var(--gold);}
.hmp-teams{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:2px;color:#fff;line-height:1;}
.hmp-time{text-align:right;}
.hmp-ist{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:2px;color:var(--gold);line-height:1;}
.hmp-date{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;color:rgba(255,255,255,.5);letter-spacing:.08em;}
.hmp-cd{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:800;color:rgba(184,134,11,.8);margin-top:2px;}

/* ── SECTION HEADER ── */
.sh{
  display:flex;align-items:center;gap:12px;
  margin:28px 0 16px;
  padding-bottom:10px;
  border-bottom:3px solid var(--ink);
}
.sh-number{
  font-family:'Playfair Display',serif;font-size:13px;font-weight:700;
  color:var(--muted);letter-spacing:.1em;
}
.sh-title{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:3px;color:var(--ink);}
.sh-rule{flex:1;height:1px;background:var(--border);}
.sh-tag{
  font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;
  padding:3px 10px;border-radius:3px;letter-spacing:.06em;
  background:var(--green);color:#fff;
}
.sh-tag-red{background:var(--red);}
.sh-tag-gold{background:var(--gold);color:var(--ink);}

/* ── MATCH CARD — MAGAZINE STYLE ── */
.match-card{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:10px;
  overflow:hidden;
  margin-bottom:12px;
  box-shadow:0 2px 12px rgba(0,0,0,.06);
  transition:all .2s;
}
.match-card:hover{
  box-shadow:0 6px 24px rgba(0,0,0,.12);
  transform:translateY(-2px);
  border-color:var(--green);
}

/* Stage strip */
.mc-strip{
  height:4px;
  background:var(--green);
}
.mc-strip.red{background:var(--red);}
.mc-strip.gold{background:var(--gold);}
.mc-strip.dark{background:var(--green2);}

/* Top meta row */
.mc-meta{
  background:var(--paper2);
  padding:7px 16px;
  display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--border);
}
.mc-stage{
  font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;
  color:var(--green);letter-spacing:.12em;
}
.mc-stage.red{color:var(--red);}
.mc-stage.gold{color:var(--gold);}
.mc-meta-right{
  font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;
  color:var(--muted);
}

/* Teams row — the centrepiece */
.mc-body{
  display:grid;
  grid-template-columns:1fr 140px 1fr;
  align-items:center;
  padding:20px 16px;
  gap:12px;
}
.mc-team{display:flex;flex-direction:column;align-items:center;gap:8px;}
.mc-team.home{align-items:flex-start;}
.mc-team.away{align-items:flex-end;}
.mc-flag-img{
  width:clamp(48px,9vw,72px);height:auto;
  border-radius:6px;
  border:1px solid var(--border);
  box-shadow:0 3px 12px rgba(0,0,0,.12);
}
.mc-name{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(18px,3.5vw,28px);
  letter-spacing:2px;color:var(--ink);line-height:1;
}
.mc-nation{
  font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:600;
  color:var(--muted);letter-spacing:.08em;
}

/* Centre time block */
.mc-centre{text-align:center;}
.mc-vs{
  font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;
  color:var(--dim);letter-spacing:.12em;margin-bottom:4px;
}
.mc-time-big{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(32px,6vw,48px);
  letter-spacing:3px;color:var(--green);line-height:1;
}
.mc-date-big{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(13px,2.5vw,17px);
  letter-spacing:2px;color:var(--ink2);margin-bottom:2px;line-height:1;
}
.mc-ist-label{
  font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:800;
  color:var(--dim);letter-spacing:.12em;margin-top:3px;
}
.mc-score{
  font-family:'Bebas Neue',sans-serif;
  font-size:clamp(40px,8vw,64px);
  letter-spacing:4px;color:var(--green);line-height:1;
}
.mc-ft{
  font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;
  color:var(--green);letter-spacing:.12em;
}

/* Venue */
.mc-venue{
  padding:0 16px 8px;
  font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:600;
  color:var(--dim);text-align:center;
}

/* Context strip */
.mc-context{
  background:var(--paper2);border-top:1px solid var(--border);
  padding:10px 16px;
  font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;
  color:var(--ink2);line-height:1.5;
}
.mc-context strong{color:var(--green);font-weight:800;}

/* Actions */
.mc-actions{
  border-top:1px solid var(--border);padding:8px 12px;
  display:flex;gap:7px;background:var(--paper2);
}
.abtn{
  flex:1;display:flex;align-items:center;justify-content:center;gap:5px;
  border-radius:6px;padding:9px;cursor:pointer;
  font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;letter-spacing:.06em;
  border:none;text-decoration:none;transition:all .15s;
}
.abtn-alarm{background:var(--green);color:#fff;box-shadow:0 2px 8px rgba(26,107,60,.25);}
.abtn-alarm:hover{background:var(--green2);}
.abtn-share{background:var(--card);color:var(--muted);border:1px solid var(--border);}
.abtn-share:hover{background:var(--paper2);}
.abtn-wa{background:#e8f5e9;color:#1b5e20;border:1px solid #a5d6a7;}
.abtn-wa:hover{background:#c8e6c9;}

/* ── THE FINAL BOX ── */
.final-box{
  background:var(--green2);
  border-radius:12px;
  padding:28px 24px;
  text-align:center;
  margin:28px 0;
  position:relative;overflow:hidden;
  box-shadow:0 8px 40px rgba(10,45,26,.3);
}
.final-box::before{
  content:'🏆';
  position:absolute;font-size:200px;opacity:.04;
  top:50%;left:50%;transform:translate(-50%,-50%);
  line-height:1;
}
.final-box-content{position:relative;z-index:1;}
.final-kicker{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;color:rgba(184,134,11,.7);letter-spacing:.2em;margin-bottom:8px;}
.final-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,7vw,60px);letter-spacing:5px;color:#fff;margin-bottom:6px;line-height:1;}
.final-date{font-family:'Bebas Neue',sans-serif;font-size:clamp(18px,3.5vw,28px);letter-spacing:3px;color:var(--gold);margin-bottom:6px;}
.final-time{font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,9vw,72px);letter-spacing:4px;color:var(--gold);line-height:1;margin-bottom:6px;text-shadow:0 0 40px rgba(184,134,11,.3);}
.final-venue{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;color:rgba(255,255,255,.5);margin-bottom:16px;}
.final-btn{display:inline-flex;align-items:center;gap:8px;background:var(--gold);color:var(--green2);font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;padding:13px 24px;border-radius:8px;text-decoration:none;box-shadow:0 4px 16px rgba(184,134,11,.3);}

/* ── RESULTS TABLE ── */
.results-table{background:var(--card);border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:16px;}
.result-row{
  display:flex;align-items:center;gap:10px;
  padding:12px 16px;border-bottom:1px solid var(--border);
  transition:background .15s;
}
.result-row:last-child{border:none;}
.result-row:hover{background:var(--paper2);}
.result-stage{
  font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:800;
  color:var(--muted);letter-spacing:.1em;
  writing-mode:vertical-rl;transform:rotate(180deg);
  flex-shrink:0;
}
.result-teams{flex:1;min-width:0;}
.result-match{
  font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:800;
  color:var(--ink);display:flex;align-items:center;gap:8px;flex-wrap:wrap;
}
.result-score{
  font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px;color:var(--green);
}
.result-scorers{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:600;color:var(--dim);margin-top:1px;}
.result-date{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;color:var(--dim);text-align:right;flex-shrink:0;line-height:1.6;}

/* ── GOLDEN BOOT ── */
.boot-row{
  display:flex;align-items:center;gap:12px;
  padding:12px 16px;border-bottom:1px solid var(--border);
  background:var(--card);transition:background .15s;
}
.boot-row:hover{background:var(--paper2);}
.boot-row:last-child{border:none;}
.boot-pos{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--dim);width:22px;text-align:center;flex-shrink:0;}
.boot-pos.gold{color:var(--gold);}
.boot-flag{font-size:22px;flex-shrink:0;line-height:1;}
.boot-info{flex:1;min-width:0;}
.boot-name{font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:800;color:var(--ink);}
.boot-team{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:600;color:var(--muted);}
.boot-goals{font-family:'Bebas Neue',sans-serif;font-size:32px;color:var(--green);flex-shrink:0;line-height:1;}
.boot-goals.gold{color:var(--gold);}

/* ── EPL FIXTURES ── */
.day-label{
  background:var(--green);color:#fff;
  font-family:'Bebas Neue',sans-serif;font-size:13px;letter-spacing:3px;
  padding:7px 14px;border-radius:6px;
  margin:12px 0 8px;display:inline-block;
}

/* ── WATCH BOX ── */
.watch-box{
  background:var(--paper2);border:2px solid var(--border);
  border-radius:10px;padding:16px;text-align:center;margin:20px 0;
}
.watch-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;color:var(--green);margin-bottom:8px;}
.watch-badge{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:3px;color:var(--green);display:block;margin-bottom:4px;}
.watch-note{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:600;color:var(--muted);}

/* ── NEXT SEASON PROMO ── */
.next-promo{
  background:linear-gradient(135deg,var(--green2),#0a2d1a);
  border-radius:10px;padding:20px;
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  flex-wrap:wrap;margin:20px 0;
  text-decoration:none;transition:all .2s;
  box-shadow:0 4px 20px rgba(10,45,26,.2);
}
.next-promo:hover{box-shadow:0 8px 32px rgba(10,45,26,.3);}
.next-promo-text{flex:1;}
.next-promo-kicker{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;color:rgba(184,134,11,.7);letter-spacing:.14em;margin-bottom:6px;}
.next-promo-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,4vw,30px);letter-spacing:2px;color:#fff;line-height:1;}
.next-promo-sub{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;color:rgba(255,255,255,.5);margin-top:4px;}
.next-promo-arrow{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:2px;color:var(--green2);background:var(--gold);padding:10px 16px;border-radius:6px;flex-shrink:0;}

/* ── BOTTOM NAV ── */
.bnav{
  position:fixed;bottom:0;left:0;right:0;z-index:100;
  background:#fff;border-top:3px solid var(--green2);
  display:flex;box-shadow:0 -4px 20px rgba(0,0,0,.1);
}
.bnav-item{
  flex:1;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:2px;padding:9px 4px;
  color:var(--dim);cursor:pointer;transition:all .15s;
  border-top:3px solid transparent;margin-top:-3px;
  background:none;border-left:none;border-right:none;border-bottom:none;
}
.bnav-item.active{color:var(--green);border-top-color:var(--green);background:rgba(26,107,60,.04);}
.bnav-icon{font-size:19px;line-height:1;}
.bnav-label{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:.04em;}

/* ── PAGES ── */
.page{display:none;}.page.active{display:block;}

/* ── RESPONSIVE ── */
@media(max-width:520px){
  .mc-body{grid-template-columns:1fr 110px 1fr;gap:6px;padding:16px 12px;}
  .mc-time-big{font-size:28px;}
  .hero{padding:20px 16px;min-height:340px;}
  .hero-match-pill{padding:8px 10px;}
  .hmp-ist{font-size:18px;}
}
`;

const HTML = `
<!-- MASTHEAD -->
<header class="masthead">
  <div class="masthead-inner">
    <a href="#" class="mast-logo" onclick="showPage('wc',null);return false;">
      <div class="mast-badge"><span>K</span></div>
      <div>
        <div class="mast-name">KICKOFF<em>IST</em></div>
        <div class="mast-sub">FOOTBALL IN YOUR TIME · INDIA 🇮🇳</div>
      </div>
    </a>
    <div class="mast-right">
      <div class="mast-clock" id="ist-clock">--:--:-- IST</div>
      <a href="https://zee5.com" target="_blank" class="mast-watch">📺 ZEE5</a>
    </div>
  </div>
</header>

<!-- DATE BANNER -->
<div class="date-banner">
  <span class="date-banner-text">TUESDAY, 15 JULY 2026</span>
  <span class="date-banner-issue">⚽ FIFA WORLD CUP 2026 — SEMI-FINALS EDITION</span>
  <span class="date-banner-text">EST. 2026 · KICKOFFIST.COM</span>
</div>

<main>

<!-- ══ PAGE: WC ══ -->
<div id="page-wc" class="page active">

  <!-- HERO -->
  <div class="hero">
    <div class="hero-bg-flags">
      <img src="https://flagcdn.com/160x120/fr.png" onerror="this.style.display='none'" alt="">
      <img src="https://flagcdn.com/160x120/es.png" onerror="this.style.display='none'" alt="">
      <img src="https://flagcdn.com/160x120/gb-eng.png" onerror="this.style.display='none'" alt="">
      <img src="https://flagcdn.com/160x120/ar.png" onerror="this.style.display='none'" alt="">
    </div>
    <div class="hero-content">
      <div class="hero-kicker">FIFA WORLD CUP 2026 · SEMI-FINALS</div>
      <h1 class="hero-headline">THE LAST<br><em>FOUR</em></h1>
      <p class="hero-deck">Two semi-finals. Four nations. One trophy. The biggest matches of 2026 — and you can watch them all from India on Zee5.</p>
      <div class="hero-matches">
        <div class="hero-match-pill">
          <div>
            <div class="hmp-teams">FRANCE vs SPAIN</div>
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;color:rgba(255,255,255,.4);letter-spacing:.08em;">SEMI-FINAL 1</div>
          </div>
          <div class="hmp-time">
            <div class="hmp-ist">12:30AM</div>
            <div class="hmp-date">TUE 15 JUL · IST</div>
            <div class="hmp-cd" id="cd-sf1">--h --m</div>
          </div>
        </div>
        <div class="hero-match-pill">
          <div>
            <div class="hmp-teams">ENGLAND vs ARGENTINA</div>
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;color:rgba(255,255,255,.4);letter-spacing:.08em;">SEMI-FINAL 2</div>
          </div>
          <div class="hmp-time">
            <div class="hmp-ist">12:30AM</div>
            <div class="hmp-date">WED 16 JUL · IST</div>
            <div class="hmp-cd" id="cd-sf2">--h --m</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SF 1 -->
  <div class="sh">
    <span class="sh-number">01</span>
    <span class="sh-title">SEMI-FINAL 1</span>
    <div class="sh-rule"></div>
    <span class="sh-tag sh-tag-gold">TONIGHT</span>
  </div>

  <div class="match-card">
    <div class="mc-strip dark"></div>
    <div class="mc-meta">
      <span class="mc-stage">🏆 SEMI-FINAL 1 · FIFA WORLD CUP 2026</span>
      <span class="mc-meta-right">AT&amp;T Stadium · Dallas, Texas</span>
    </div>
    <div class="mc-body">
      <div class="mc-team home">
        <img src="https://flagcdn.com/96x72/fr.png" alt="France" class="mc-flag-img" onerror="this.style.display='none'">
        <div class="mc-name">FRANCE</div>
        <div class="mc-nation">🇫🇷 Les Bleus</div>
      </div>
      <div class="mc-centre">
        <div class="mc-vs">VERSUS</div>
        <div class="mc-date-big">TUE 15 JUL</div>
        <div class="mc-time-big">12:30AM</div>
        <div class="mc-ist-label">INDIAN STD TIME</div>
      </div>
      <div class="mc-team away">
        <img src="https://flagcdn.com/96x72/es.png" alt="Spain" class="mc-flag-img" onerror="this.style.display='none'">
        <div class="mc-name">SPAIN</div>
        <div class="mc-nation">🇪🇸 La Roja</div>
      </div>
    </div>
    <div class="mc-context">
      <strong>France:</strong> 7 wins, 0 losses. Mbappé 9 goals — golden boot leader. Unbeaten in 90 mins all tournament. &nbsp;·&nbsp;
      <strong>Spain:</strong> 0 goals conceded in 7 games. Lamine Yamal, 18. The most clinical defence left. &nbsp;·&nbsp;
      🔥 <strong>The match of the tournament.</strong> Mbappé vs Yamal.
    </div>
    <div class="mc-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+France+vs+Spain+WC+SF1&dates=20260714T190000Z/20260714T210000Z&details=FIFA+WC+2026+Semi-Final+1%0AWatch+on+Zee5+India%0Akickoffist.com" target="_blank" class="abtn abtn-alarm">⏰ SET ALARM</a>
      <a href="https://wa.me/?text=⚽ France 🇫🇷 vs Spain 🇪🇸%0A🏆 WC 2026 Semi-Final 1%0A📅 Tuesday 15 July · 12:30 AM IST%0A📺 Zee5 India%0Akickoffist.com 🇮🇳" target="_blank" class="abtn abtn-wa">💬 WHATSAPP</a>
    </div>
  </div>

  <!-- SF 2 -->
  <div class="sh">
    <span class="sh-number">02</span>
    <span class="sh-title">SEMI-FINAL 2</span>
    <div class="sh-rule"></div>
    <span class="sh-tag sh-tag-gold">TOMORROW NIGHT</span>
  </div>

  <div class="match-card">
    <div class="mc-strip red"></div>
    <div class="mc-meta">
      <span class="mc-stage red">🏆 SEMI-FINAL 2 · FIFA WORLD CUP 2026</span>
      <span class="mc-meta-right">Mercedes-Benz Stadium · Atlanta, Georgia</span>
    </div>
    <div class="mc-body">
      <div class="mc-team home">
        <img src="https://flagcdn.com/96x72/gb-eng.png" alt="England" class="mc-flag-img" onerror="this.style.display='none'">
        <div class="mc-name">ENGLAND</div>
        <div class="mc-nation">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Three Lions</div>
      </div>
      <div class="mc-centre">
        <div class="mc-vs">VERSUS</div>
        <div class="mc-date-big">WED 16 JUL</div>
        <div class="mc-time-big">12:30AM</div>
        <div class="mc-ist-label">INDIAN STD TIME</div>
      </div>
      <div class="mc-team away">
        <img src="https://flagcdn.com/96x72/ar.png" alt="Argentina" class="mc-flag-img" onerror="this.style.display='none'">
        <div class="mc-name">ARGENTINA</div>
        <div class="mc-nation">🇦🇷 La Albiceleste</div>
      </div>
    </div>
    <div class="mc-context">
      <strong>England:</strong> Beat Norway 2-1 AET. Bellingham scored in every knockout game. Kane 6 WC goals — England all-time record. &nbsp;·&nbsp;
      <strong>Argentina:</strong> Defending champions. Messi 8 goals. Came back from 0-2 vs Egypt. &nbsp;·&nbsp;
      🔥 <strong>1966 vs 1986.</strong> The greatest rivalry in World Cup history.
    </div>
    <div class="mc-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+England+vs+Argentina+WC+SF2&dates=20260715T190000Z/20260715T210000Z&details=FIFA+WC+2026+Semi-Final+2%0AWatch+on+Zee5+India%0Akickoffist.com" target="_blank" class="abtn abtn-alarm">⏰ SET ALARM</a>
      <a href="https://wa.me/?text=⚽ England 🏴󠁧󠁢󠁥󠁮󠁧󠁿 vs Argentina 🇦🇷%0A🏆 WC 2026 Semi-Final 2%0A📅 Wednesday 16 July · 12:30 AM IST%0A📺 Zee5 India%0Akickoffist.com 🇮🇳" target="_blank" class="abtn abtn-wa">💬 WHATSAPP</a>
    </div>
  </div>

  <!-- THE FINAL -->
  <div class="final-box">
    <div class="final-box-content">
      <div class="final-kicker">THE MOMENT EVERYTHING BUILDS TO</div>
      <div class="final-title">THE FINAL</div>
      <div class="final-date">SUNDAY · 20 JULY 2026</div>
      <div class="final-time" id="cd-fin">12:30 AM IST</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;color:var(--gold);margin-bottom:6px;">12:30 AM INDIAN STANDARD TIME</div>
      <div class="final-venue">MetLife Stadium · East Rutherford, New Jersey · 82,500 fans</div>
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=🏆+FIFA+World+Cup+2026+FINAL&dates=20260719T190000Z/20260719T210000Z&details=Watch+on+Zee5+India%0Akickoffist.com+🇮🇳" target="_blank" class="final-btn">⏰ SET THE FINAL ALARM</a>
    </div>
  </div>

  <!-- QF RESULTS -->
  <div class="sh">
    <span class="sh-number">03</span>
    <span class="sh-title">QUARTER-FINAL RESULTS</span>
    <div class="sh-rule"></div>
    <span class="sh-tag">ALL DONE</span>
  </div>
  <div class="results-table">
    <div class="result-row"><div class="result-stage">QF</div><div class="result-teams"><div class="result-match">🇫🇷 France <span class="result-score">2–0</span> Morocco 🇲🇦</div><div class="result-scorers">Mbappé 60' · Dembélé 84'</div></div><div class="result-date">Thu 10 Jul<br>1:30 AM IST</div></div>
    <div class="result-row"><div class="result-stage">QF</div><div class="result-teams"><div class="result-match">🇪🇸 Spain <span class="result-score">2–1</span> Belgium 🇧🇪</div><div class="result-scorers">Cubarsí 34' · De Ketelaere 71' · Merino 88'</div></div><div class="result-date">Fri 11 Jul<br>12:30 AM IST</div></div>
    <div class="result-row"><div class="result-stage">QF</div><div class="result-teams"><div class="result-match">🏴󠁧󠁢󠁥󠁮󠁧󠁿 England <span class="result-score">2–1 AET</span> Norway 🇳🇴</div><div class="result-scorers">Bellingham ×2 · Haaland</div></div><div class="result-date">Sat 12 Jul<br>2:30 AM IST</div></div>
    <div class="result-row"><div class="result-stage">QF</div><div class="result-teams"><div class="result-match">🇦🇷 Argentina <span class="result-score">3–1 AET</span> Switzerland 🇨🇭</div><div class="result-scorers">Álvarez · Messi · Lautaro</div></div><div class="result-date">Sat 12 Jul<br>6:30 AM IST</div></div>
  </div>

  <!-- GOLDEN BOOT -->
  <div class="sh">
    <span class="sh-number">04</span>
    <span class="sh-title">GOLDEN BOOT RACE</span>
    <div class="sh-rule"></div>
    <span class="sh-tag sh-tag-gold">JUL 12</span>
  </div>
  <div class="results-table">
    <div class="boot-row"><div class="boot-pos gold">1</div><div class="boot-flag">🇫🇷</div><div class="boot-info"><div class="boot-name">Kylian Mbappé</div><div class="boot-team">France · Semi-Final</div></div><div class="boot-goals gold">9</div></div>
    <div class="boot-row"><div class="boot-pos gold">1</div><div class="boot-flag">🇳🇴</div><div class="boot-info"><div class="boot-name">Erling Haaland</div><div class="boot-team">Norway — Eliminated QF</div></div><div class="boot-goals gold">9</div></div>
    <div class="boot-row"><div class="boot-pos">3</div><div class="boot-flag">🇦🇷</div><div class="boot-info"><div class="boot-name">Lionel Messi</div><div class="boot-team">Argentina · Semi-Final</div></div><div class="boot-goals">8</div></div>
    <div class="boot-row"><div class="boot-pos">4</div><div class="boot-flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div><div class="boot-info"><div class="boot-name">Harry Kane</div><div class="boot-team">England · Semi-Final · All-time record</div></div><div class="boot-goals">6</div></div>
    <div class="boot-row"><div class="boot-pos">5</div><div class="boot-flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div><div class="boot-info"><div class="boot-name">Jude Bellingham</div><div class="boot-team">England · Semi-Final</div></div><div class="boot-goals">4</div></div>
  </div>

  <!-- WATCH -->
  <div class="watch-box">
    <div class="watch-title">📺 WATCH IN INDIA</div>
    <div class="watch-badge">ZEE5</div>
    <div class="watch-note">Exclusive FIFA World Cup 2026 broadcast rights in India · Every match live · zee5.com</div>
  </div>

  <!-- NEXT SEASON PROMO -->
  <a href="#" onclick="showPage('epl',null);return false;" class="next-promo">
    <div class="next-promo-text">
      <div class="next-promo-kicker">⚡ AFTER THE WORLD CUP</div>
      <div class="next-promo-title">PREMIER LEAGUE STARTS 21 AUG 2026</div>
      <div class="next-promo-sub">Arsenal vs Coventry · Haaland back at Man City · UCL from Sep 8 · All in IST</div>
    </div>
    <div class="next-promo-arrow">SEE FIXTURES →</div>
  </a>

</div>

<!-- ══ PAGE: EPL ══ -->
<div id="page-epl" class="page">

  <div class="hero" style="min-height:280px;">
    <div class="hero-content">
      <div class="hero-kicker">ENGLISH PREMIER LEAGUE 2026–27</div>
      <h1 class="hero-headline">BACK IN <em>AUG</em></h1>
      <p class="hero-deck">Arsenal defending champions. Haaland returns. All WC stars back. Season opens Friday 21 August — here are all the IST times you need.</p>
    </div>
  </div>

  <div class="sh"><span class="sh-number">01</span><span class="sh-title">COMMUNITY SHIELD</span><div class="sh-rule"></div><span class="sh-tag sh-tag-gold">16 AUG · 8:30 PM IST</span></div>

  <div class="match-card">
    <div class="mc-strip gold"></div>
    <div class="mc-meta"><span class="mc-stage gold">🛡 COMMUNITY SHIELD 2026</span><span class="mc-meta-right">Principality Stadium · Cardiff, Wales</span></div>
    <div class="mc-body">
      <div class="mc-team home">
        <div style="font-size:36px;line-height:1;">🔴</div>
        <div class="mc-name">ARSENAL</div>
        <div class="mc-nation">PL Champions</div>
      </div>
      <div class="mc-centre">
        <div class="mc-vs">VERSUS</div>
        <div class="mc-date-big">SUN 16 AUG</div>
        <div class="mc-time-big">8:30PM</div>
        <div class="mc-ist-label">INDIAN STD TIME</div>
      </div>
      <div class="mc-team away">
        <div style="font-size:36px;line-height:1;">🔵</div>
        <div class="mc-name">MAN CITY</div>
        <div class="mc-nation">FA Cup Winners</div>
      </div>
    </div>
    <div class="mc-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+Arsenal+vs+Man+City+Community+Shield&dates=20260816T150000Z/20260816T170000Z" target="_blank" class="abtn abtn-alarm">⏰ SET ALARM</a>
      <a href="https://wa.me/?text=⚽ Arsenal 🔴 vs Man City 🔵%0A🛡 Community Shield%0A📅 Sun 16 Aug · 8:30 PM IST%0Akickoffist.com 🇮🇳" target="_blank" class="abtn abtn-wa">💬 WA</a>
    </div>
  </div>

  <div class="sh"><span class="sh-number">02</span><span class="sh-title">GAMEWEEK 1</span><div class="sh-rule"></div><span class="sh-tag">21–24 AUG 2026</span></div>

  <div class="day-label">🔥 FRIDAY 21 AUGUST — SEASON OPENER</div>
  <div class="match-card">
    <div class="mc-strip dark"></div>
    <div class="mc-meta"><span class="mc-stage">🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE GW1 · SEASON OPENER</span><span class="mc-meta-right">Emirates Stadium · London · Sky Sports</span></div>
    <div class="mc-body">
      <div class="mc-team home"><div style="font-size:36px;">🔴</div><div class="mc-name">ARSENAL</div><div class="mc-nation">Champions</div></div>
      <div class="mc-centre"><div class="mc-vs">VERSUS</div><div class="mc-date-big">FRI 21 AUG</div><div class="mc-time-big">12:30AM</div><div class="mc-ist-label">IST (SATURDAY)</div></div>
      <div class="mc-team away"><div style="font-size:36px;">🩵</div><div class="mc-name">COVENTRY</div><div class="mc-nation">Promoted</div></div>
    </div>
    <div class="mc-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+Arsenal+vs+Coventry+EPL+Opener&dates=20260821T190000Z/20260821T210000Z" target="_blank" class="abtn abtn-alarm">⏰ ALARM</a>
      <a href="https://wa.me/?text=⚽ Arsenal vs Coventry%0A🏴󠁧󠁢󠁥󠁮󠁧󠁿 EPL Season Opener%0A📅 Sat 22 Aug · 12:30 AM IST%0Akickoffist.com 🇮🇳" target="_blank" class="abtn abtn-wa">💬 WA</a>
    </div>
  </div>

  <div class="day-label">📅 SATURDAY 22 AUGUST</div>
  <div class="results-table">
    <div class="result-row"><div class="result-stage">EPL</div><div class="result-teams"><div class="result-match">🔴 Hull City vs Man United 🔴</div><div class="result-scorers">MKM Stadium · Hull · TNT Sports</div></div><div class="result-date"><strong>6:00PM</strong><br>IST SAT</div></div>
    <div class="result-row"><div class="result-stage">EPL</div><div class="result-teams"><div class="result-match">🔵 Everton vs Crystal Palace 🔴</div><div class="result-scorers">Goodison Park · Liverpool</div></div><div class="result-date"><strong>8:30PM</strong><br>IST SAT</div></div>
    <div class="result-row"><div class="result-stage">EPL</div><div class="result-teams"><div class="result-match">🔵 Ipswich Town vs Sunderland 🔴</div><div class="result-scorers">Portman Road · Ipswich</div></div><div class="result-date"><strong>8:30PM</strong><br>IST SAT</div></div>
    <div class="result-row"><div class="result-stage">EPL</div><div class="result-teams"><div class="result-match">🔴 Nottm Forest vs Leeds United ⚪</div><div class="result-scorers">City Ground · Nottingham</div></div><div class="result-date"><strong>8:30PM</strong><br>IST SAT</div></div>
    <div class="result-row"><div class="result-stage">EPL</div><div class="result-teams"><div class="result-match">🔴 Brentford vs Tottenham Hotspur ⚪</div><div class="result-scorers">Gtech Stadium · London · Sky Sports</div></div><div class="result-date"><strong>11:00PM</strong><br>IST SAT</div></div>
  </div>

  <div class="day-label">📅 SUNDAY 23 AUGUST</div>
  <div class="results-table">
    <div class="result-row"><div class="result-stage">EPL</div><div class="result-teams"><div class="result-match">🔵 Brighton vs Aston Villa 🟣</div><div class="result-scorers">Amex Stadium · Brighton · Sky Sports</div></div><div class="result-date"><strong>7:30PM</strong><br>IST SUN</div></div>
    <div class="result-row"><div class="result-stage">EPL</div><div class="result-teams"><div class="result-match">🔵 Man City vs Bournemouth 🔴</div><div class="result-scorers">Etihad Stadium · Manchester · Sky Sports · Haaland!</div></div><div class="result-date"><strong>7:30PM</strong><br>IST SUN</div></div>
    <div class="result-row"><div class="result-stage">EPL</div><div class="result-teams"><div class="result-match">⚫ Newcastle vs Liverpool 🔴</div><div class="result-scorers">St James' Park · Newcastle · Sky Sports · Salah returns!</div></div><div class="result-date"><strong>10:00PM</strong><br>IST SUN</div></div>
  </div>

  <div class="day-label">📅 MONDAY 24 AUGUST</div>
  <div class="match-card">
    <div class="mc-strip dark"></div>
    <div class="mc-meta"><span class="mc-stage">🏴󠁧󠁢󠁥󠁮󠁧󠁿 EPL GW1 · 🔥 LONDON DERBY</span><span class="mc-meta-right">Craven Cottage · London · Sky Sports</span></div>
    <div class="mc-body">
      <div class="mc-team home"><div style="font-size:36px;">⚪</div><div class="mc-name">FULHAM</div><div class="mc-nation">London</div></div>
      <div class="mc-centre"><div class="mc-vs">LONDON DERBY</div><div class="mc-date-big">MON 24 AUG</div><div class="mc-time-big">12:30AM</div><div class="mc-ist-label">IST (TUESDAY)</div></div>
      <div class="mc-team away"><div style="font-size:36px;">🔵</div><div class="mc-name">CHELSEA</div><div class="mc-nation">London</div></div>
    </div>
    <div class="mc-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+Fulham+vs+Chelsea+London+Derby+EPL&dates=20260824T190000Z/20260824T210000Z" target="_blank" class="abtn abtn-alarm">⏰ ALARM</a>
      <a href="https://wa.me/?text=⚽ Fulham vs Chelsea 🔵%0A🏴󠁧󠁢󠁥󠁮󠁧󠁿 London Derby · EPL GW1%0A📅 Tue 25 Aug · 12:30 AM IST%0Akickoffist.com 🇮🇳" target="_blank" class="abtn abtn-wa">💬 WA</a>
    </div>
  </div>

  <div class="results-table" style="margin-top:20px;">
    <div style="padding:12px 16px;background:#f9f5f0;border-bottom:1px solid var(--border);font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--ink);">🕐 EPL IN IST — QUICK GUIDE</div>
    <div class="result-row"><div class="result-stage">BST</div><div class="result-teams"><div class="result-match" style="font-size:14px;">Fri/Mon 8:00pm BST</div></div><div class="result-date"><strong>12:30AM IST</strong><br>next day</div></div>
    <div class="result-row"><div class="result-stage">BST</div><div class="result-teams"><div class="result-match" style="font-size:14px;">Saturday 12:30pm BST</div></div><div class="result-date"><strong>6:00PM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">BST</div><div class="result-teams"><div class="result-match" style="font-size:14px;">Saturday 3:00pm BST</div></div><div class="result-date"><strong>8:30PM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">BST</div><div class="result-teams"><div class="result-match" style="font-size:14px;">Saturday 5:30pm BST</div></div><div class="result-date"><strong>11:00PM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">BST</div><div class="result-teams"><div class="result-match" style="font-size:14px;">Sunday 2:00pm BST</div></div><div class="result-date"><strong>7:30PM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">BST</div><div class="result-teams"><div class="result-match" style="font-size:14px;">Sunday 4:30pm BST</div></div><div class="result-date"><strong>10:00PM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">📺</div><div class="result-teams"><div class="result-match" style="font-size:14px;">Watch on</div><div class="result-scorers">Star Sports · Disney+ Hotstar in India</div></div><div class="result-date">All EPL<br>matches</div></div>
  </div>

</div>

<!-- ══ PAGE: UCL ══ -->
<div id="page-ucl" class="page">
  <div class="hero" style="min-height:260px;">
    <div class="hero-content">
      <div class="hero-kicker">UEFA CHAMPIONS LEAGUE 2026–27</div>
      <h1 class="hero-headline">EUROPE'S <em>ELITE</em></h1>
      <p class="hero-deck">36 clubs. 8 matchdays. Every game at 12:30 AM IST on Tuesday and Wednesday nights. The UCL is back from 8 September.</p>
    </div>
  </div>
  <div class="sh"><span class="sh-number">01</span><span class="sh-title">ALL MATCHDAY DATES</span><div class="sh-rule"></div><span class="sh-tag">12:30 AM IST</span></div>
  <div class="results-table">
    <div class="result-row"><div class="result-stage">MD1</div><div class="result-teams"><div class="result-match">8–10 September 2026</div><div class="result-scorers">UCL returns! First midweek nights of the season</div></div><div class="result-date"><strong>12:30AM</strong><br>IST Tue/Wed</div></div>
    <div class="result-row"><div class="result-stage">MD2</div><div class="result-teams"><div class="result-match">13–14 October 2026</div></div><div class="result-date"><strong>12:30AM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">MD3</div><div class="result-teams"><div class="result-match">20–21 October 2026</div></div><div class="result-date"><strong>12:30AM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">MD4</div><div class="result-teams"><div class="result-match">3–4 November 2026</div></div><div class="result-date"><strong>12:30AM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">MD5</div><div class="result-teams"><div class="result-match">24–25 November 2026</div></div><div class="result-date"><strong>12:30AM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">MD6</div><div class="result-teams"><div class="result-match">8–9 December 2026</div></div><div class="result-date"><strong>12:30AM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">MD7</div><div class="result-teams"><div class="result-match">19–20 January 2027</div></div><div class="result-date"><strong>12:30AM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">MD8</div><div class="result-teams"><div class="result-match">27 January 2027</div><div class="result-scorers">All 18 games same time</div></div><div class="result-date"><strong>12:30AM IST</strong></div></div>
    <div class="result-row"><div class="result-stage">🏆</div><div class="result-teams"><div class="result-match">Final · 5 June 2027</div><div class="result-scorers">Estadio Metropolitano · Madrid, Spain</div></div><div class="result-date"><strong>12:30AM IST</strong><br>Sun 6 Jun</div></div>
  </div>
  <div class="sh"><span class="sh-number">02</span><span class="sh-title">ENGLISH CLUBS IN UCL</span><div class="sh-rule"></div></div>
  <div class="results-table">
    <div class="result-row"><div class="result-stage">UCL</div><div class="result-teams"><div class="result-match">🔴 Arsenal</div><div class="result-scorers">League phase · Defending PL champions · Havertz · Saka · Odegaard</div></div><div class="result-date">From<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage">UCL</div><div class="result-teams"><div class="result-match">🔵 Manchester City</div><div class="result-scorers">League phase · Haaland back after WC · Guardiola masterplan</div></div><div class="result-date">From<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage">UCL</div><div class="result-teams"><div class="result-match">🔴 Liverpool</div><div class="result-scorers">League phase · Salah · Díaz · Slot era year 2</div></div><div class="result-date">From<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage">UCL</div><div class="result-teams"><div class="result-match">🟣 Aston Villa</div><div class="result-scorers">League phase · Watkins · McGinn · Unai Emery</div></div><div class="result-date">From<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage">UCL</div><div class="result-teams"><div class="result-match">🔴 Manchester United</div><div class="result-scorers">League phase · Amorim revolution · Rebuilding era</div></div><div class="result-date">From<br>8 Sep</div></div>
  </div>
  <div class="watch-box">
    <div class="watch-title">📺 WATCH UCL IN INDIA</div>
    <div class="watch-badge">SONY SPORTS · LIV SPORTS</div>
    <div class="watch-note">All Champions League games from 12:30 AM IST · Tuesday &amp; Wednesday nights</div>
  </div>
</div>

<!-- ══ PAGE: PLAYERS ══ -->
<div id="page-players" class="page">
  <div class="hero" style="min-height:240px;">
    <div class="hero-content">
      <div class="hero-kicker">WORLD CUP 2026 STARS</div>
      <h1 class="hero-headline">WATCH <em>THEM</em><br>IN AUGUST</h1>
      <p class="hero-deck">The players who lit up WC 2026 — back at their clubs for the new season.</p>
    </div>
  </div>
  <div class="sh"><span class="sh-number">01</span><span class="sh-title">STARS · CLUBS · NEXT MATCH</span><div class="sh-rule"></div></div>
  <div class="results-table">
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇫🇷</div><div class="result-teams"><div class="result-match">Kylian Mbappé</div><div class="result-scorers">Real Madrid · 9 WC goals · Golden Boot leader · WC Semi-Final vs Spain</div></div><div class="result-date">UCL<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇦🇷</div><div class="result-teams"><div class="result-match">Lionel Messi</div><div class="result-scorers">Inter Miami · 8 WC goals · 19 career WC goals — all-time record · The GOAT</div></div><div class="result-date">MLS<br>ongoing</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇳🇴</div><div class="result-teams"><div class="result-match">Erling Haaland</div><div class="result-scorers">Man City · 9 WC goals · Eliminated Brazil · EPL vs Bournemouth 7:30 PM IST Sun 23 Aug</div></div><div class="result-date">EPL<br>23 Aug</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div><div class="result-teams"><div class="result-match">Jude Bellingham</div><div class="result-scorers">Real Madrid · 3 knockout goals · England's best WC player · WC Semi-Final vs Argentina</div></div><div class="result-date">UCL<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇪🇸</div><div class="result-teams"><div class="result-match">Lamine Yamal</div><div class="result-scorers">Barcelona · 18 years old · WC Semi-Final · The future of world football</div></div><div class="result-date">UCL<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div><div class="result-teams"><div class="result-match">Harry Kane</div><div class="result-scorers">Bayern Munich · 6 WC goals · England all-time WC record · WC SF vs Argentina</div></div><div class="result-date">UCL<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇪🇬</div><div class="result-teams"><div class="result-match">Mohamed Salah</div><div class="result-scorers">Liverpool · Back for EPL · Newcastle vs Liverpool 10:00 PM IST Sunday 23 Aug</div></div><div class="result-date">EPL<br>23 Aug</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇧🇷</div><div class="result-teams"><div class="result-match">Vinicius Jr</div><div class="result-scorers">Real Madrid · Brazil eliminated by Norway in R16 · UCL contender</div></div><div class="result-date">UCL<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇦🇷</div><div class="result-teams"><div class="result-match">Julián Álvarez</div><div class="result-scorers">Atlético Madrid · Scored vs Switzerland QF · Argentina WC SF</div></div><div class="result-date">UCL<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇩🇪</div><div class="result-teams"><div class="result-match">Florian Wirtz</div><div class="result-scorers">Bayern Munich · Germany eliminated R32 · Best young midfielder in Europe</div></div><div class="result-date">UCL<br>8 Sep</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇨🇴</div><div class="result-teams"><div class="result-match">Luis Díaz</div><div class="result-scorers">Liverpool · Colombia WC R16 · Electric winger · Back for EPL 23 Aug</div></div><div class="result-date">EPL<br>23 Aug</div></div>
    <div class="result-row"><div class="result-stage" style="font-size:16px;">🇵🇹</div><div class="result-teams"><div class="result-match">Cristiano Ronaldo</div><div class="result-scorers">Al-Nassr · WC R16 exit vs Spain · Possibly his last World Cup · A legend farewell</div></div><div class="result-date">Saudi<br>Pro Lg</div></div>
  </div>
  <div class="results-table" style="margin-top:20px;">
    <div style="padding:12px 16px;background:#f9f5f0;border-bottom:1px solid var(--border);font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--ink);">📺 WHERE TO WATCH IN INDIA</div>
    <div class="result-row"><div class="result-stage">WC</div><div class="result-teams"><div class="result-match">FIFA World Cup 2026</div></div><div class="result-date">Zee5</div></div>
    <div class="result-row"><div class="result-stage">EPL</div><div class="result-teams"><div class="result-match">Premier League</div></div><div class="result-date">Star Sports<br>Hotstar</div></div>
    <div class="result-row"><div class="result-stage">UCL</div><div class="result-teams"><div class="result-match">Champions League</div></div><div class="result-date">Sony Sports<br>LIV Sports</div></div>
    <div class="result-row"><div class="result-stage">ISL</div><div class="result-teams"><div class="result-match">Indian Super League</div><div class="result-scorers">FREE</div></div><div class="result-date">JioCinema<br>Sports18</div></div>
    <div class="result-row"><div class="result-stage">LAL</div><div class="result-teams"><div class="result-match">La Liga</div></div><div class="result-date">GXR World<br>Voot</div></div>
  </div>
</div>

</main>

<!-- BOTTOM NAV -->
<nav class="bnav">
  <button class="bnav-item active" onclick="showPage('wc',this)"><span class="bnav-icon">⚽</span><span class="bnav-label">WC 2026</span></button>
  <button class="bnav-item" onclick="showPage('epl',this)"><span class="bnav-icon">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span><span class="bnav-label">EPL</span></button>
  <button class="bnav-item" onclick="showPage('ucl',this)"><span class="bnav-icon">⭐</span><span class="bnav-label">UCL</span></button>
  <button class="bnav-item" onclick="showPage('players',this)"><span class="bnav-icon">🌟</span><span class="bnav-label">Players</span></button>
</nav>

<script>
function showPage(id,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('.bnav-item').forEach(b=>b.classList.remove('active'));
  const items=document.querySelectorAll('.bnav-item');
  const idx={wc:0,epl:1,ucl:2,players:3}[id]||0;
  if(items[idx]) items[idx].classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
</script>
`;
