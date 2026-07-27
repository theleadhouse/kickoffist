"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    // Inject styles
    const style = document.createElement('style');
    style.innerHTML = CSS;
    document.head.appendChild(style);
    // Start clock
    function tick() {
      const ist = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const el = document.getElementById("clock");
      if (el) el.textContent = `${String(ist.getHours()).padStart(2,"0")}:${String(ist.getMinutes()).padStart(2,"0")}:${String(ist.getSeconds()).padStart(2,"0")}`;
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => { clearInterval(id); document.head.removeChild(style); };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: HTML }} />;
}

const CSS = `
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html,body{overflow-x:hidden;font-size:14px;line-height:1.5;}
body{font-family:'Inter',sans-serif;background:#F7F3EE;color:#1A1A1A;}
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
:root{--orange:#FF6B00;--navy:#0D1B2A;--green:#00875A;--red:#CC0000;--cream:#F7F3EE;--white:#FFFFFF;--card:#FFFFFF;--border:#E8E2DA;--text:#1A1A1A;--muted:#666;--dim:#999;}
.tabs{background:#fff;border-bottom:2px solid #E8E2DA;overflow-x:auto;scrollbar-width:none;position:sticky;top:0;z-index:99;}
.tabs-inner{max-width:900px;margin:0 auto;display:flex;padding:0 16px;}
.tab{padding:12px 18px;white-space:nowrap;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:800;letter-spacing:.1em;color:#999;border-bottom:3px solid transparent;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:6px;flex-shrink:0;background:none;border-top:none;border-left:none;border-right:none;}
.tab.active{color:#FF6B00;border-bottom-color:#FF6B00;background:rgba(255,107,0,.04);}
main{max-width:900px;margin:0 auto;padding:20px 16px 100px;}
.sh{display:flex;align-items:center;gap:12px;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid #1A1A1A;}
.sh-title{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:3px;color:#1A1A1A;}
.sh-line{flex:1;height:1px;background:#E8E2DA;}
.sh-tag{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;padding:2px 10px;border-radius:20px;letter-spacing:.06em;background:#FF6B00;color:#fff;}
.mc{background:#fff;border:1px solid #E8E2DA;border-radius:14px;overflow:hidden;margin-bottom:10px;transition:all .2s;box-shadow:0 1px 6px rgba(0,0,0,.06);}
.mc:hover{border-color:#FF6B00;box-shadow:0 4px 20px rgba(0,0,0,.1);transform:translateY(-1px);}
.mc-date{background:#0D1B2A;padding:6px 14px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;color:rgba(255,255,255,.6);letter-spacing:.12em;display:flex;justify-content:space-between;align-items:center;}
.mc-date-ist{color:#FF6B00;}
.mc-row{display:flex;align-items:stretch;min-height:70px;}
.mc-league{width:58px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:6px;gap:4px;border-right:1px solid #E8E2DA;background:#FAFAF8;}
.mc-league-badge{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:800;letter-spacing:.06em;text-align:center;line-height:1.2;padding:2px 4px;border-radius:4px;}
.badge-epl{background:#3D0A72;color:#fff;}
.badge-ucl{background:#001489;color:#C8A84B;}
.badge-wc{background:#004F9F;color:#FFD700;}
.badge-cs{background:#3D0A72;color:#fff;}
.mc-teams{flex:1;min-width:0;padding:10px 14px;}
.mc-team{display:flex;align-items:center;gap:10px;margin-bottom:7px;}
.mc-team:last-child{margin-bottom:0;}
.mc-flag{font-size:18px;width:22px;text-align:center;flex-shrink:0;line-height:1;}
.mc-name{flex:1;font-family:'Barlow Condensed',sans-serif;font-size:18px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;letter-spacing:.02em;color:#1A1A1A;}
.mc-score{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:1px;flex-shrink:0;line-height:1;color:#00875A;}
.mc-venue{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:500;color:#999;margin-top:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.mc-time{flex-shrink:0;display:flex;flex-direction:column;align-items:flex-end;justify-content:center;padding:8px 14px;border-left:1px solid #E8E2DA;min-width:72px;background:#FAFAF8;text-align:right;}
.mc-time-big{font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:1px;color:#FF6B00;line-height:1;}
.mc-time-sub{font-family:'Barlow Condensed',sans-serif;font-size:8px;font-weight:700;color:#999;letter-spacing:.06em;margin-top:1px;}
.mc-time-date{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;color:rgba(255,107,0,.6);margin-top:2px;}
.mc-actions{border-top:1px solid #E8E2DA;padding:7px 10px;display:flex;gap:6px;background:#FAFAF8;}
.btn{flex:1;display:flex;align-items:center;justify-content:center;gap:4px;border-radius:7px;padding:8px;cursor:pointer;transition:all .15s;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;letter-spacing:.06em;border:none;text-decoration:none;}
.btn-alarm{background:#FF6B00;color:#fff;box-shadow:0 2px 8px rgba(255,107,0,.25);}
.btn-share{background:#fff;color:#666;border:1px solid #E8E2DA;}
.btn-wa{background:#e8f5e9;color:#2e7d32;border:1px solid #c8e6c9;}
.hero{background:#0D1B2A;border-radius:16px;padding:28px 20px;text-align:center;margin-bottom:20px;position:relative;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,.2);}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 50% 0%,rgba(255,107,0,.1),transparent 70%);}
.hero-content{position:relative;z-index:1;}
.hero-eyebrow{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;color:rgba(255,107,0,.6);letter-spacing:.2em;margin-bottom:8px;}
.hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,8vw,64px);letter-spacing:4px;color:#fff;line-height:1;margin-bottom:8px;}
.hero-title em{color:#FF6B00;font-style:normal;}
.hero-sub{font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:600;color:rgba(255,255,255,.5);letter-spacing:.06em;margin-bottom:20px;}
.hero-stats{display:flex;justify-content:center;gap:clamp(16px,4vw,32px);flex-wrap:wrap;}
.hero-stat{text-align:center;}
.hero-stat-n{font-family:'Bebas Neue',sans-serif;font-size:clamp(26px,5vw,38px);letter-spacing:2px;color:#FF6B00;line-height:1;}
.hero-stat-l{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;color:rgba(255,255,255,.35);letter-spacing:.12em;}
.player-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin-bottom:16px;}
.player-card{background:#fff;border:1px solid #E8E2DA;border-radius:12px;padding:14px;text-align:center;box-shadow:0 1px 6px rgba(0,0,0,.06);transition:all .2s;}
.player-card:hover{border-color:#FF6B00;box-shadow:0 4px 16px rgba(0,0,0,.1);}
.player-flag{font-size:28px;margin-bottom:6px;line-height:1;}
.player-name{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;color:#1A1A1A;margin-bottom:2px;}
.player-club{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:600;color:#666;margin-bottom:4px;}
.player-note{font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#999;line-height:1.4;}
.player-wc{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:800;color:#FF6B00;margin-top:4px;}
.wc-result{background:#fff;border:1px solid #E8E2DA;border-left:4px solid #00875A;border-radius:10px;padding:12px 14px;margin-bottom:7px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 4px rgba(0,0,0,.05);}
.wc-result-match{flex:1;min-width:0;}
.wc-result-teams{font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:700;color:#1A1A1A;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.wc-result-score{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px;color:#00875A;}
.wc-result-note{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:600;color:#999;margin-top:2px;}
.wc-result-time{font-family:'Barlow Condensed',sans-serif;font-size:9px;font-weight:700;color:#999;text-align:right;flex-shrink:0;line-height:1.5;}
.big-match{background:#0D1B2A;border-radius:16px;overflow:hidden;margin-bottom:12px;box-shadow:0 4px 24px rgba(0,0,0,.15);}
.big-match-top{background:rgba(255,107,0,.1);padding:10px 18px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.08);}
.big-match-stage{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;color:rgba(255,107,0,.8);letter-spacing:.1em;}
.big-match-ist{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;color:#FF6B00;}
.big-match-body{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:24px 18px 16px;gap:8px;}
.big-team{text-align:center;}
.big-flag{width:clamp(60px,12vw,90px);height:auto;border-radius:8px;border:2px solid rgba(255,255,255,.12);display:block;margin:0 auto 10px;box-shadow:0 6px 20px rgba(0,0,0,.3);}
.big-name{font-family:'Bebas Neue',sans-serif;font-size:clamp(15px,3vw,24px);letter-spacing:2px;color:#fff;line-height:1;}
.big-vs{font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,4vw,32px);letter-spacing:2px;color:rgba(255,255,255,.2);line-height:1;}
.big-time-block{text-align:center;}
.big-date-pill{display:inline-block;background:#FF6B00;color:#fff;font-family:'Bebas Neue',sans-serif;font-size:12px;letter-spacing:2px;padding:3px 14px;border-radius:20px;margin-bottom:8px;}
.big-time{font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,6vw,52px);letter-spacing:3px;color:#FF6B00;line-height:1;text-shadow:0 0 30px rgba(255,107,0,.4);}
.big-ist{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,.4);letter-spacing:.12em;margin-top:3px;}
.big-venue{text-align:center;font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:600;color:rgba(255,255,255,.25);padding:0 18px 12px;}
.big-actions{display:flex;gap:8px;padding:0 18px 18px;}
.big-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;border-radius:10px;padding:13px;text-decoration:none;border:none;cursor:pointer;font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;transition:all .15s;}
.big-btn-alarm{background:#FF6B00;color:#fff;box-shadow:0 4px 16px rgba(255,107,0,.3);}
.big-btn-wa{background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.25);color:#25d366;}
.page{display:none;}.page.active{display:block;}
.bnav{position:fixed;bottom:0;left:0;right:0;z-index:100;background:#fff;border-top:2px solid #E8E2DA;display:flex;box-shadow:0 -4px 20px rgba(0,0,0,.08);}
.bnav-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:9px 4px;color:#999;cursor:pointer;transition:color .15s;border-top:3px solid transparent;background:none;border-left:none;border-right:none;border-bottom:none;}
.bnav-item.active{color:#FF6B00;border-top-color:#FF6B00;background:rgba(255,107,0,.03);}
.bnav-icon{font-size:19px;line-height:1;}.bnav-label{font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:700;letter-spacing:.04em;}
.info-box{background:#fff;border:1px solid #E8E2DA;border-radius:12px;padding:16px;margin-bottom:14px;box-shadow:0 1px 6px rgba(0,0,0,.05);}
.info-title{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;color:#1A1A1A;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid #E8E2DA;}
.info-row{display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:1px solid #F5F0EA;}
.info-row:last-child{border:none;padding-bottom:0;}
.info-arrow{color:#FF6B00;font-family:'Bebas Neue',sans-serif;font-size:16px;flex-shrink:0;line-height:1.3;}
.info-text{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;color:#666;line-height:1.5;}
@media(max-width:480px){.big-match-body{padding:18px 14px 12px;}.big-actions{padding:0 14px 14px;gap:6px;}main{padding:16px 12px 100px;}}
`;

const HTML = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<div class="tabs">
  <div class="tabs-inner">
    <button class="tab active" onclick="showPage('wc',this)">⚽ WC 2026</button>
    <button class="tab" onclick="showPage('epl',this)">🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE</button>
    <button class="tab" onclick="showPage('ucl',this)">⭐ CHAMPIONS LEAGUE</button>
    <button class="tab" onclick="showPage('players',this)">🌟 PLAYERS</button>
  </div>
</div>

<main>

<div id="page-wc" class="page active">
  <div class="hero">
    <div class="hero-content">
      <div class="hero-eyebrow">🏆 FIFA WORLD CUP 2026 · SEMI-FINALS</div>
      <h1 class="hero-title">THE LAST <em>4</em></h1>
      <p class="hero-sub">2 semi-finals · 1 final · All times IST for India 🇮🇳</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="hero-stat-n">SUN 20 JUL</div><div class="hero-stat-l">THE FINAL</div></div>
        <div class="hero-stat"><div class="hero-stat-n">12:30AM</div><div class="hero-stat-l">FINAL IST</div></div>
        <div class="hero-stat"><div class="hero-stat-n">ZEE5</div><div class="hero-stat-l">WATCH INDIA</div></div>
      </div>
    </div>
  </div>

  <div class="big-match">
    <div class="big-match-top"><span class="big-match-stage">🏆 SEMI-FINAL 1</span><span class="big-match-ist">TUE 15 JUL · 12:30 AM IST</span></div>
    <div class="big-match-body">
      <div class="big-team"><img src="https://flagcdn.com/96x72/fr.png" alt="France" class="big-flag" onerror="this.style.display='none'"><div class="big-name">FRANCE</div></div>
      <div class="big-time-block"><div class="big-date-pill">TUE 15 JUL</div><div class="big-time">12:30AM</div><div class="big-ist">INDIAN STANDARD TIME</div></div>
      <div class="big-team"><img src="https://flagcdn.com/96x72/es.png" alt="Spain" class="big-flag" onerror="this.style.display='none'"><div class="big-name">SPAIN</div></div>
    </div>
    <div class="big-venue">📍 AT&amp;T Stadium · Dallas, Texas</div>
    <div style="padding:0 18px 12px;display:flex;flex-direction:column;gap:6px;">
      <div style="background:rgba(255,107,0,.08);border:1px solid rgba(255,107,0,.15);border-radius:8px;padding:10px 12px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;color:rgba(255,255,255,.7);line-height:1.5;">
        🇫🇷 France: 7 wins, 0 losses. Mbappé 9 goals. Unbeaten in 90 mins all tournament.<br>
        🇪🇸 Spain: 0 goals conceded in 7 games. Lamine Yamal, 18. Merino. Pedri. Cubarsí.
      </div>
      <div style="background:rgba(255,255,255,.06);border-radius:8px;padding:10px 12px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:rgba(255,107,0,.9);">
        🔥 Mbappé vs Lamine Yamal — could be the greatest semi-final ever played
      </div>
    </div>
    <div class="big-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+France+vs+Spain+WC+SF&dates=20260714T190000Z/20260714T210000Z" target="_blank" class="big-btn big-btn-alarm">⏰ SET ALARM</a>
      <a href="https://wa.me/?text=⚽ France 🇫🇷 vs Spain 🇪🇸%0A🏆 WC 2026 Semi-Final%0A📅 Tue 15 Jul · 12:30 AM IST%0A📺 Zee5 India%0Akickoffist.com 🇮🇳" target="_blank" class="big-btn big-btn-wa">💬 SHARE</a>
    </div>
  </div>

  <div class="big-match" style="margin-bottom:20px;">
    <div class="big-match-top"><span class="big-match-stage">🏆 SEMI-FINAL 2</span><span class="big-match-ist">WED 16 JUL · 12:30 AM IST</span></div>
    <div class="big-match-body">
      <div class="big-team"><img src="https://flagcdn.com/96x72/gb-eng.png" alt="England" class="big-flag" onerror="this.style.display='none'"><div class="big-name">ENGLAND</div></div>
      <div class="big-time-block"><div class="big-date-pill">WED 16 JUL</div><div class="big-time">12:30AM</div><div class="big-ist">INDIAN STANDARD TIME</div></div>
      <div class="big-team"><img src="https://flagcdn.com/96x72/ar.png" alt="Argentina" class="big-flag" onerror="this.style.display='none'"><div class="big-name">ARGENTINA</div></div>
    </div>
    <div class="big-venue">📍 Mercedes-Benz Stadium · Atlanta, Georgia</div>
    <div style="padding:0 18px 12px;display:flex;flex-direction:column;gap:6px;">
      <div style="background:rgba(255,107,0,.08);border:1px solid rgba(255,107,0,.15);border-radius:8px;padding:10px 12px;font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;color:rgba(255,255,255,.7);line-height:1.5;">
        🏴󠁧󠁢󠁥󠁮󠁧󠁿 England: Beat Norway 2-1 AET. Bellingham scored in every knockout game.<br>
        🇦🇷 Argentina: Defending champions. Messi 8 goals. Never-say-die spirit.
      </div>
      <div style="background:rgba(255,255,255,.06);border-radius:8px;padding:10px 12px;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;color:rgba(255,107,0,.9);">
        🔥 1966 vs 1986 — the greatest rivalry in World Cup history. Set your alarm.
      </div>
    </div>
    <div class="big-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+England+vs+Argentina+WC+SF&dates=20260715T190000Z/20260715T210000Z" target="_blank" class="big-btn big-btn-alarm">⏰ SET ALARM</a>
      <a href="https://wa.me/?text=⚽ England 🏴󠁧󠁢󠁥󠁮󠁧󠁿 vs Argentina 🇦🇷%0A🏆 WC 2026 Semi-Final%0A📅 Wed 16 Jul · 12:30 AM IST%0A📺 Zee5 India%0Akickoffist.com 🇮🇳" target="_blank" class="big-btn big-btn-wa">💬 SHARE</a>
    </div>
  </div>

  <div style="background:linear-gradient(135deg,#0D1B2A,#1a0d2e);border-radius:16px;padding:24px 20px;text-align:center;margin-bottom:20px;border:2px solid rgba(255,107,0,.3);box-shadow:0 8px 40px rgba(0,0,0,.2);">
    <div style="font-size:40px;margin-bottom:10px;">🏆</div>
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;color:rgba(255,107,0,.6);letter-spacing:.2em;margin-bottom:8px;">FIFA WORLD CUP 2026</div>
    <div style="font-family:'Bebas Neue',sans-serif;font-size:clamp(32px,7vw,56px);letter-spacing:5px;color:#fff;margin-bottom:6px;line-height:1;">THE FINAL</div>
    <div style="font-family:'Bebas Neue',sans-serif;font-size:clamp(20px,4vw,34px);letter-spacing:3px;color:#FF6B00;margin-bottom:6px;">SUNDAY 20 JULY</div>
    <div style="font-family:'Bebas Neue',sans-serif;font-size:clamp(44px,9vw,72px);letter-spacing:4px;color:#FF6B00;line-height:1;text-shadow:0 0 40px rgba(255,107,0,.4);margin-bottom:6px;">12:30 AM IST</div>
    <div style="font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:700;color:rgba(255,255,255,.45);margin-bottom:16px;">MetLife Stadium · East Rutherford, New Jersey</div>
    <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=🏆+FIFA+World+Cup+2026+FINAL&dates=20260719T190000Z/20260719T210000Z" target="_blank" style="display:inline-flex;align-items:center;gap:8px;background:#FF6B00;color:#fff;font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;padding:13px 24px;border-radius:10px;text-decoration:none;box-shadow:0 4px 20px rgba(255,107,0,.4);">⏰ REMIND ME FOR THE FINAL</a>
  </div>

  <div class="sh"><span class="sh-title">✅ QF RESULTS</span><div class="sh-line"></div><span class="sh-tag">ALL DONE</span></div>
  <div class="wc-result"><div class="wc-result-match"><div class="wc-result-teams">🇫🇷 France <span class="wc-result-score">2–0</span> Morocco 🇲🇦</div><div class="wc-result-note">Mbappé 60' · Dembélé 84'</div></div><div class="wc-result-time">Thu 10 Jul<br>1:30 AM IST</div></div>
  <div class="wc-result"><div class="wc-result-match"><div class="wc-result-teams">🇪🇸 Spain <span class="wc-result-score">2–1</span> Belgium 🇧🇪</div><div class="wc-result-note">Cubarsí · Merino 88'</div></div><div class="wc-result-time">Fri 11 Jul<br>12:30 AM IST</div></div>
  <div class="wc-result"><div class="wc-result-match"><div class="wc-result-teams">🏴󠁧󠁢󠁥󠁮󠁧󠁿 England <span class="wc-result-score">2–1 AET</span> Norway 🇳🇴</div><div class="wc-result-note">Bellingham ×2 · Haaland</div></div><div class="wc-result-time">Sat 12 Jul<br>2:30 AM IST</div></div>
  <div class="wc-result"><div class="wc-result-match"><div class="wc-result-teams">🇦🇷 Argentina <span class="wc-result-score">3–1 AET</span> Switzerland 🇨🇭</div><div class="wc-result-note">Álvarez · Messi · Lautaro</div></div><div class="wc-result-time">Sat 12 Jul<br>6:30 AM IST</div></div>

  <div class="sh" style="margin-top:20px;"><span class="sh-title">⚽ GOLDEN BOOT</span><div class="sh-line"></div><span class="sh-tag">JUL 12</span></div>
  <div class="info-box">
    <div class="info-row"><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:#FF6B00;width:24px;text-align:center;flex-shrink:0;">1</div><div><span style="font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;">Mbappé 🇫🇷</span> <span style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:#FF6B00;">9 ⚽</span> <span style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#999;">France · SF</span></div></div>
    <div class="info-row"><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:#FF6B00;width:24px;text-align:center;flex-shrink:0;">1</div><div><span style="font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;">Haaland 🇳🇴</span> <span style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:#FF6B00;">9 ⚽</span> <span style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#999;">Norway — OUT</span></div></div>
    <div class="info-row"><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:#ccc;width:24px;text-align:center;flex-shrink:0;">3</div><div><span style="font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;">Messi 🇦🇷</span> <span style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:#999;">8 ⚽</span> <span style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#999;">Argentina · SF</span></div></div>
    <div class="info-row"><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:#ccc;width:24px;text-align:center;flex-shrink:0;">4</div><div><span style="font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:800;">Kane 🏴󠁧󠁢󠁥󠁮󠁧󠁿</span> <span style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:#999;">6 ⚽</span> <span style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#999;">England · SF</span></div></div>
  </div>
</div>

<div id="page-epl" class="page">
  <div class="hero">
    <div class="hero-content">
      <div class="hero-eyebrow">🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE 2026–27</div>
      <h1 class="hero-title">STARTS <em>21 AUG</em></h1>
      <p class="hero-sub">Arsenal defending champions · All WC stars return · All times IST 🇮🇳</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="hero-stat-n">16 AUG</div><div class="hero-stat-l">COMMUNITY SHIELD</div></div>
        <div class="hero-stat"><div class="hero-stat-n">21 AUG</div><div class="hero-stat-l">SEASON OPENER</div></div>
        <div class="hero-stat"><div class="hero-stat-n">380</div><div class="hero-stat-l">MATCHES</div></div>
      </div>
    </div>
  </div>

  <div class="sh"><span class="sh-title">🛡 COMMUNITY SHIELD · 16 AUG</span><div class="sh-line"></div><span class="sh-tag">8:30 PM IST</span></div>
  <div class="mc">
    <div class="mc-date"><span>SUNDAY 16 AUGUST 2026 · PRINCIPALITY STADIUM, CARDIFF</span><span class="mc-date-ist">8:30 PM IST</span></div>
    <div class="mc-row">
      <div class="mc-league"><span class="mc-league-badge badge-cs">SHIELD</span></div>
      <div class="mc-teams">
        <div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name" style="font-weight:800;">Arsenal</span><span style="font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;color:#FF6B00;background:rgba(255,107,0,.08);padding:1px 7px;border-radius:8px;flex-shrink:0;">PL Champions</span></div>
        <div class="mc-team"><span class="mc-flag">🔵</span><span class="mc-name" style="font-weight:800;">Man City</span><span style="font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;color:#666;background:#f0ede8;padding:1px 7px;border-radius:8px;flex-shrink:0;">FA Cup Winners</span></div>
      </div>
      <div class="mc-time"><div class="mc-time-big">8:30PM</div><div class="mc-time-sub">IST SUN</div><div class="mc-time-date">16 Aug</div></div>
    </div>
    <div class="mc-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+Arsenal+vs+Man+City+Community+Shield&dates=20260816T150000Z/20260816T170000Z" target="_blank" class="btn btn-alarm">⏰ ALARM</a>
      <a href="https://wa.me/?text=⚽ Arsenal vs Man City%0A🛡 Community Shield%0A📅 Sun 16 Aug · 8:30 PM IST%0Akickoffist.com 🇮🇳" target="_blank" class="btn btn-wa">💬 WA</a>
    </div>
  </div>

  <div class="sh" style="margin-top:8px;"><span class="sh-title">⚽ GAMEWEEK 1 — ALL FIXTURES</span><div class="sh-line"></div><span class="sh-tag">21–24 AUG</span></div>

  <div style="background:#fff3e0;border:1px solid rgba(255,107,0,.2);border-radius:10px;padding:10px 14px;margin-bottom:8px;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;color:#CC5500;letter-spacing:.1em;">🔥 FRIDAY 21 AUGUST — SEASON OPENER</div>
  <div class="mc">
    <div class="mc-row">
      <div class="mc-league"><span class="mc-league-badge badge-epl">EPL GW1</span></div>
      <div class="mc-teams">
        <div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name">Arsenal</span><span style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:800;color:#FF6B00;background:rgba(255,107,0,.08);padding:1px 6px;border-radius:8px;flex-shrink:0;">Champions</span></div>
        <div class="mc-team"><span class="mc-flag">🩵</span><span class="mc-name">Coventry City</span></div>
        <div class="mc-venue">📍 Emirates Stadium · London · Sky Sports</div>
      </div>
      <div class="mc-time"><div class="mc-time-big">12:30AM</div><div class="mc-time-sub">IST SAT</div><div class="mc-time-date">Fri 21 Aug</div></div>
    </div>
    <div class="mc-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+Arsenal+vs+Coventry+EPL+Opener&dates=20260821T190000Z/20260821T210000Z" target="_blank" class="btn btn-alarm">⏰ ALARM</a>
      <a href="https://wa.me/?text=⚽ Arsenal vs Coventry%0A🏴󠁧󠁢󠁥󠁮󠁧󠁿 EPL Season Opener!%0A📅 Sat 22 Aug · 12:30 AM IST%0Akickoffist.com 🇮🇳" target="_blank" class="btn btn-wa">💬 WA</a>
    </div>
  </div>

  <div style="background:#fff3e0;border:1px solid rgba(255,107,0,.2);border-radius:10px;padding:10px 14px;margin:8px 0;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;color:#CC5500;letter-spacing:.1em;">📅 SATURDAY 22 AUGUST</div>
  <div class="mc"><div class="mc-row"><div class="mc-league"><span class="mc-league-badge badge-epl">EPL</span></div><div class="mc-teams"><div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name">Hull City</span></div><div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name">Manchester United</span></div><div class="mc-venue">📍 MKM Stadium · Hull · TNT Sports</div></div><div class="mc-time"><div class="mc-time-big">6:00PM</div><div class="mc-time-sub">IST SAT</div></div></div></div>
  <div class="mc"><div class="mc-row"><div class="mc-league"><span class="mc-league-badge badge-epl">EPL</span></div><div class="mc-teams"><div class="mc-team"><span class="mc-flag">🔵</span><span class="mc-name">Everton</span></div><div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name">Crystal Palace</span></div><div class="mc-venue">📍 Goodison Park · Liverpool</div></div><div class="mc-time"><div class="mc-time-big">8:30PM</div><div class="mc-time-sub">IST SAT</div></div></div></div>
  <div class="mc"><div class="mc-row"><div class="mc-league"><span class="mc-league-badge badge-epl">EPL</span></div><div class="mc-teams"><div class="mc-team"><span class="mc-flag">🔵</span><span class="mc-name">Ipswich Town</span></div><div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name">Sunderland</span></div><div class="mc-venue">📍 Portman Road · Ipswich</div></div><div class="mc-time"><div class="mc-time-big">8:30PM</div><div class="mc-time-sub">IST SAT</div></div></div></div>
  <div class="mc"><div class="mc-row"><div class="mc-league"><span class="mc-league-badge badge-epl">EPL</span></div><div class="mc-teams"><div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name">Nottingham Forest</span></div><div class="mc-team"><span class="mc-flag">⚪</span><span class="mc-name">Leeds United</span></div><div class="mc-venue">📍 City Ground · Nottingham</div></div><div class="mc-time"><div class="mc-time-big">8:30PM</div><div class="mc-time-sub">IST SAT</div></div></div></div>
  <div class="mc"><div class="mc-row"><div class="mc-league"><span class="mc-league-badge badge-epl">EPL</span></div><div class="mc-teams"><div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name">Brentford</span></div><div class="mc-team"><span class="mc-flag">⚪</span><span class="mc-name">Tottenham Hotspur</span></div><div class="mc-venue">📍 Gtech Stadium · London · Sky Sports</div></div><div class="mc-time"><div class="mc-time-big">11:00PM</div><div class="mc-time-sub">IST SAT</div></div></div></div>

  <div style="background:#fff3e0;border:1px solid rgba(255,107,0,.2);border-radius:10px;padding:10px 14px;margin:8px 0;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;color:#CC5500;letter-spacing:.1em;">📅 SUNDAY 23 AUGUST</div>
  <div class="mc"><div class="mc-row"><div class="mc-league"><span class="mc-league-badge badge-epl">EPL</span></div><div class="mc-teams"><div class="mc-team"><span class="mc-flag">🔵</span><span class="mc-name">Brighton</span></div><div class="mc-team"><span class="mc-flag">🟣</span><span class="mc-name">Aston Villa</span></div><div class="mc-venue">📍 Amex Stadium · Brighton · Sky Sports</div></div><div class="mc-time"><div class="mc-time-big">7:30PM</div><div class="mc-time-sub">IST SUN</div></div></div></div>
  <div class="mc"><div class="mc-row"><div class="mc-league"><span class="mc-league-badge badge-epl">EPL</span></div><div class="mc-teams"><div class="mc-team"><span class="mc-flag">🔵</span><span class="mc-name">Manchester City</span></div><div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name">Bournemouth</span></div><div class="mc-venue">📍 Etihad Stadium · Manchester · Sky Sports</div></div><div class="mc-time"><div class="mc-time-big">7:30PM</div><div class="mc-time-sub">IST SUN</div></div></div></div>
  <div class="mc"><div class="mc-row"><div class="mc-league"><span class="mc-league-badge badge-epl">EPL</span></div><div class="mc-teams"><div class="mc-team"><span class="mc-flag">⚫</span><span class="mc-name">Newcastle United</span></div><div class="mc-team"><span class="mc-flag">🔴</span><span class="mc-name">Liverpool</span></div><div class="mc-venue">📍 St James' Park · Newcastle · Sky Sports</div></div><div class="mc-time"><div class="mc-time-big">10:00PM</div><div class="mc-time-sub">IST SUN</div></div></div></div>

  <div style="background:#fff3e0;border:1px solid rgba(255,107,0,.2);border-radius:10px;padding:10px 14px;margin:8px 0;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:800;color:#CC5500;letter-spacing:.1em;">📅 MONDAY 24 AUGUST</div>
  <div class="mc" style="margin-bottom:20px;">
    <div class="mc-row"><div class="mc-league"><span class="mc-league-badge badge-epl">EPL</span></div><div class="mc-teams"><div class="mc-team"><span class="mc-flag">⚪</span><span class="mc-name">Fulham</span></div><div class="mc-team"><span class="mc-flag">🔵</span><span class="mc-name">Chelsea</span><span style="font-family:'Barlow Condensed',sans-serif;font-size:10px;font-weight:800;color:#CC0000;background:rgba(204,0,0,.06);padding:1px 6px;border-radius:8px;flex-shrink:0;">London Derby</span></div><div class="mc-venue">📍 Craven Cottage · London · Sky Sports</div></div><div class="mc-time"><div class="mc-time-big">12:30AM</div><div class="mc-time-sub">IST TUE</div><div class="mc-time-date">Mon 24 Aug</div></div></div>
    <div class="mc-actions">
      <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=⚽+Fulham+vs+Chelsea+London+Derby&dates=20260824T190000Z/20260824T210000Z" target="_blank" class="btn btn-alarm">⏰ ALARM</a>
      <a href="https://wa.me/?text=⚽ Fulham vs Chelsea 🔵%0A🏴󠁧󠁢󠁥󠁮󠁧󠁿 London Derby!%0A📅 Tue 25 Aug · 12:30 AM IST%0Akickoffist.com 🇮🇳" target="_blank" class="btn btn-wa">💬 WA</a>
    </div>
  </div>

  <div class="info-box">
    <div class="info-title">🕐 EPL IN IST — QUICK GUIDE</div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>Fri/Mon 8pm BST</strong> = 12:30 AM IST next day</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>Sat 12:30pm BST</strong> = 6:00 PM IST</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>Sat 3:00pm BST</strong> = 8:30 PM IST</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>Sat 5:30pm BST</strong> = 11:00 PM IST</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>Sun 2:00pm BST</strong> = 7:30 PM IST</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>Sun 4:30pm BST</strong> = 10:00 PM IST</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text">📺 <strong>Star Sports / Disney+ Hotstar</strong> in India</div></div>
  </div>
</div>

<div id="page-ucl" class="page">
  <div class="hero">
    <div class="hero-content">
      <div class="hero-eyebrow">⭐ UEFA CHAMPIONS LEAGUE 2026–27</div>
      <h1 class="hero-title">EUROPE'S <em>BEST</em></h1>
      <p class="hero-sub">36 clubs · Starts 8 Sep 2026 · All games 12:30 AM IST 🇮🇳</p>
      <div class="hero-stats">
        <div class="hero-stat"><div class="hero-stat-n">8 SEP</div><div class="hero-stat-l">MD1 STARTS</div></div>
        <div class="hero-stat"><div class="hero-stat-n">36</div><div class="hero-stat-l">CLUBS</div></div>
        <div class="hero-stat"><div class="hero-stat-n">5 JUN 27</div><div class="hero-stat-l">FINAL · MADRID</div></div>
      </div>
    </div>
  </div>
  <div class="info-box">
    <div class="info-title">📅 ALL UCL MATCHDAYS · 12:30 AM IST (TUE/WED)</div>
    <div class="info-row"><div class="info-arrow">MD1</div><div class="info-text"><strong>8–10 Sep 2026</strong> · UCL is back!</div></div>
    <div class="info-row"><div class="info-arrow">MD2</div><div class="info-text"><strong>13–14 Oct 2026</strong></div></div>
    <div class="info-row"><div class="info-arrow">MD3</div><div class="info-text"><strong>20–21 Oct 2026</strong></div></div>
    <div class="info-row"><div class="info-arrow">MD4</div><div class="info-text"><strong>3–4 Nov 2026</strong></div></div>
    <div class="info-row"><div class="info-arrow">MD5</div><div class="info-text"><strong>24–25 Nov 2026</strong></div></div>
    <div class="info-row"><div class="info-arrow">MD6</div><div class="info-text"><strong>8–9 Dec 2026</strong></div></div>
    <div class="info-row"><div class="info-arrow">MD7</div><div class="info-text"><strong>19–20 Jan 2027</strong></div></div>
    <div class="info-row"><div class="info-arrow">MD8</div><div class="info-text"><strong>27 Jan 2027</strong> · All games same time</div></div>
    <div class="info-row"><div class="info-arrow">🏆</div><div class="info-text"><strong>Final · 5 Jun 2027</strong> · Estadio Metropolitano · Madrid</div></div>
  </div>
  <div class="sh"><span class="sh-title">🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLISH CLUBS</span><div class="sh-line"></div></div>
  <div class="player-grid">
    <div class="player-card"><div class="player-flag">🔴</div><div class="player-name">Arsenal</div><div class="player-club">League Phase</div><div class="player-wc">🏆 PL Champions</div></div>
    <div class="player-card"><div class="player-flag">🔵</div><div class="player-name">Man City</div><div class="player-club">League Phase</div><div class="player-note">Haaland returns</div></div>
    <div class="player-card"><div class="player-flag">🔴</div><div class="player-name">Liverpool</div><div class="player-club">League Phase</div><div class="player-note">Salah · Slot</div></div>
    <div class="player-card"><div class="player-flag">🟣</div><div class="player-name">Aston Villa</div><div class="player-club">League Phase</div><div class="player-note">Watkins · McGinn</div></div>
    <div class="player-card"><div class="player-flag">🔴</div><div class="player-name">Man United</div><div class="player-club">League Phase</div><div class="player-note">Amorim era</div></div>
  </div>
  <div class="info-box">
    <div class="info-title">🕐 UCL IN IST</div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text">All games kick off <strong>12:30 AM IST</strong> Tuesday/Wednesday nights</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text">Perfect after-dinner viewing for Indian fans</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text">📺 <strong>Sony Sports / LIV Sports</strong> in India</div></div>
  </div>
</div>

<div id="page-players" class="page">
  <div class="hero">
    <div class="hero-content">
      <div class="hero-eyebrow">🌟 WC 2026 STARS · BACK AT THEIR CLUBS</div>
      <h1 class="hero-title">WATCH <em>THEM</em></h1>
      <p class="hero-sub">The players who shone at WC 2026 — back in club football from August</p>
    </div>
  </div>
  <div class="sh"><span class="sh-title">⭐ THE BIG NAMES</span><div class="sh-line"></div></div>
  <div class="player-grid">
    <div class="player-card" style="border-color:rgba(255,107,0,.3);"><div class="player-flag">🇫🇷</div><div class="player-name">Mbappé</div><div class="player-club">Real Madrid</div><div class="player-note">9 WC goals. SF vs Spain. Best in the world.</div><div class="player-wc">🏆 WC SF · 9 GOALS</div></div>
    <div class="player-card" style="border-color:rgba(255,107,0,.3);"><div class="player-flag">🇦🇷</div><div class="player-name">Messi</div><div class="player-club">Inter Miami</div><div class="player-note">8 WC goals. 19 career goals. The GOAT.</div><div class="player-wc">🏆 WC SF · THE GOAT</div></div>
    <div class="player-card" style="border-color:rgba(255,107,0,.3);"><div class="player-flag">🇳🇴</div><div class="player-name">Haaland</div><div class="player-club">Man City</div><div class="player-note">9 WC goals. Eliminated Brazil. Back at City Aug 22.</div><div class="player-wc">⚽ 9 GOALS · EPL AUG</div></div>
    <div class="player-card" style="border-color:rgba(255,107,0,.3);"><div class="player-flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div><div class="player-name">Bellingham</div><div class="player-club">Real Madrid</div><div class="player-note">3 knockout goals. England's best player at WC.</div><div class="player-wc">🏴󠁧󠁢󠁥󠁮󠁧󠁿 WC SF · 3 KO GOALS</div></div>
    <div class="player-card"><div class="player-flag">🇪🇸</div><div class="player-name">Lamine Yamal</div><div class="player-club">Barcelona</div><div class="player-note">18 years old. WC semi-final. Future of football.</div><div class="player-wc">🇪🇸 WC SF · 18 YRS OLD</div></div>
    <div class="player-card"><div class="player-flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div><div class="player-name">Harry Kane</div><div class="player-club">Bayern Munich</div><div class="player-note">6 WC goals. England all-time WC record.</div><div class="player-wc">🏴󠁧󠁢󠁥󠁮󠁧󠁿 WC SF · 6 GOALS</div></div>
    <div class="player-card"><div class="player-flag">🇧🇷</div><div class="player-name">Vinicius Jr</div><div class="player-club">Real Madrid</div><div class="player-note">Brazil eliminated by Norway. UCL contender.</div><div class="player-wc">🇧🇷 WC R16</div></div>
    <div class="player-card"><div class="player-flag">🇪🇬</div><div class="player-name">Salah</div><div class="player-club">Liverpool</div><div class="player-note">Back at Liverpool. EPL opener vs Newcastle 23 Aug.</div><div class="player-wc">🇪🇬 EPL · 10PM IST SUN</div></div>
    <div class="player-card"><div class="player-flag">🇨🇴</div><div class="player-name">Luis Díaz</div><div class="player-club">Liverpool</div><div class="player-note">Colombia WC R16. Liverpool's electric winger.</div><div class="player-wc">🇨🇴 WC R16</div></div>
    <div class="player-card"><div class="player-flag">🇦🇷</div><div class="player-name">Julián Álvarez</div><div class="player-club">Atlético Madrid</div><div class="player-note">Scored QF vs Switzerland. Lethal form.</div><div class="player-wc">🇦🇷 WC SF</div></div>
    <div class="player-card"><div class="player-flag">🇩🇪</div><div class="player-name">Wirtz</div><div class="player-club">Bayern Munich</div><div class="player-note">Germany's future. Best young midfielder in Europe.</div><div class="player-wc">🇩🇪 WC R32</div></div>
    <div class="player-card"><div class="player-flag">🇵🇹</div><div class="player-name">Ronaldo</div><div class="player-club">Al-Nassr</div><div class="player-note">WC R16 exit. Possibly final World Cup. Legend.</div><div class="player-wc">🇵🇹 Last WC chapter</div></div>
  </div>
  <div class="info-box">
    <div class="info-title">📺 WHERE TO WATCH IN INDIA</div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>WC 2026:</strong> Zee5 (live now)</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>Premier League:</strong> Star Sports · Disney+ Hotstar</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>Champions League:</strong> Sony Sports · LIV Sports</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>ISL:</strong> Sports18 · JioCinema (FREE)</div></div>
    <div class="info-row"><div class="info-arrow">→</div><div class="info-text"><strong>La Liga:</strong> GXR World · Voot</div></div>
  </div>
</div>

</main>

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
  document.querySelectorAll('.tab,.bnav-item').forEach(b=>b.classList.remove('active'));
  const idx={wc:0,epl:1,ucl:2,players:3}[id]||0;
  document.querySelectorAll('.tab')[idx]?.classList.add('active');
  document.querySelectorAll('.bnav-item')[idx]?.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function copyTxt(txt,btn){navigator.clipboard.writeText(txt).then(()=>{const o=btn.textContent;btn.textContent='✅ COPIED';setTimeout(()=>{btn.textContent=o;},2000);}).catch(()=>{});}
</script>
`;
