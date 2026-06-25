"use client";
import { useState } from "react";

export default function EmailSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"done"|"error">("idle");

  const submit = async () => {
    if (!email || !email.includes("@")) return;
    setStatus("sending");
    // Send to admin via mailto link
    const subject = encodeURIComponent("KickoffIST Newsletter Signup");
    const body = encodeURIComponent(`New subscriber: ${email}\n\nThey want to receive WC 2026 updates from KickoffIST.com`);
    window.open(`mailto:admin@kickoffist.com?subject=${subject}&body=${body}`, "_blank");
    setStatus("done");
  };

  return (
    <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:"12px",padding:"16px"}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"1px",color:"#fff",marginBottom:"4px"}}>📬 STAY UPDATED</div>
      <p style={{fontSize:"12px",color:"rgba(255,255,255,.4)",lineHeight:1.6,marginBottom:"12px"}}>
        Get WC 2026 match alerts and IST schedules in your inbox. No spam — only football. Unsubscribe anytime.
      </p>
      {status === "done" ? (
        <div style={{background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",borderRadius:"8px",padding:"10px 14px",textAlign:"center"}}>
          <div style={{fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:"#22c55e",letterSpacing:".06em"}}>✅ SUBSCRIBED! CHECK YOUR EMAIL</div>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,.4)",marginTop:"3px"}}>Thank you for subscribing to KickoffIST</div>
        </div>
      ) : (
        <div style={{display:"flex",gap:"8px"}}>
          <input
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&submit()}
            placeholder="your@email.com"
            style={{flex:1,padding:"10px 12px",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"8px",color:"#fff",fontSize:"13px",fontFamily:"'Inter',sans-serif",outline:"none"}}
          />
          <button onClick={submit} disabled={status==="sending"} style={{
            padding:"10px 16px",background:"#FF9933",borderRadius:"8px",border:"none",
            fontFamily:"'Teko',sans-serif",fontSize:"14px",fontWeight:600,color:"#000",
            letterSpacing:".06em",cursor:"pointer",flexShrink:0,transition:"all .15s"
          }}>
            {status==="sending"?"...":"JOIN"}
          </button>
        </div>
      )}
      <p style={{fontSize:"9px",color:"rgba(255,255,255,.2)",marginTop:"8px",lineHeight:1.5}}>
        By subscribing you agree to our <a href="/terms" style={{color:"rgba(255,153,51,.5)"}}>Terms</a> and <a href="/privacy" style={{color:"rgba(255,153,51,.5)"}}>Privacy Policy</a>. We only send football updates and never share your data.
      </p>
    </div>
  );
}
