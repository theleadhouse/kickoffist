"use client";
import { useState, useEffect } from "react";

export default function PWAInstallBanner() {
  const [show, setShow] = useState(false);
  const [prompt, setPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    // iOS detection
    const ios = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    setIsIOS(ios);

    // Android/Chrome install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setPrompt(e);
      const dismissed = localStorage.getItem("pwa-dismissed");
      if (!dismissed) setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Show iOS instructions after 3 seconds
    if (ios) {
      const dismissed = localStorage.getItem("pwa-dismissed");
      if (!dismissed) setTimeout(() => setShow(true), 3000);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (prompt) {
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === "accepted") setShow(false);
    }
    setShow(false);
    localStorage.setItem("pwa-dismissed", "1");
  };

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("pwa-dismissed", "1");
  };

  if (!show || installed) return null;

  return (
    <div style={{
      position: "fixed", bottom: "70px", left: "12px", right: "12px",
      background: "linear-gradient(135deg,#0d1a0d,#1a2a0d)",
      border: "1px solid rgba(255,153,51,.3)",
      borderRadius: "14px", padding: "14px 16px",
      zIndex: 200, boxShadow: "0 8px 32px rgba(0,0,0,.5)",
      display: "flex", alignItems: "center", gap: "12px",
    }}>
      {/* Tricolor icon */}
      <div style={{width:"40px",height:"40px",borderRadius:"10px",overflow:"hidden",display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{flex:1,background:"#FF9933"}}/>
        <div style={{flex:1,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontWeight:"900",color:"#000080",fontSize:"13px"}}>K</span>
        </div>
        <div style={{flex:1,background:"#138808"}}/>
      </div>

      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:"13px",fontWeight:"800",color:"#fff",marginBottom:"2px",fontFamily:"'Barlow Condensed','Oswald',sans-serif",letterSpacing:".04em"}}>
          Install KickoffIST
        </div>
        <div style={{fontSize:"11px",color:"rgba(255,255,255,.5)"}}>
          {isIOS
            ? "Tap Share → Add to Home Screen"
            : "Add to home screen for instant access"
          }
        </div>
      </div>

      {!isIOS && (
        <button onClick={install} style={{
          background:"#FF9933",color:"#000",
          fontFamily:"'Barlow Condensed','Oswald',sans-serif",
          fontSize:"12px",fontWeight:"800",padding:"8px 14px",
          borderRadius:"8px",border:"none",cursor:"pointer",
          flexShrink:0,letterSpacing:".04em",
        }}>
          INSTALL
        </button>
      )}

      <button onClick={dismiss} style={{
        background:"transparent",border:"none",cursor:"pointer",
        color:"rgba(255,255,255,.3)",fontSize:"18px",padding:"4px",flexShrink:0,
      }}>✕</button>
    </div>
  );
}
