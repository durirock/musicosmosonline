<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>🌿 Pikitipu 2.0 — Chamalnquimyst Labs</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --mint:#63f5a1; --cyan:#5ce6ff; --gold:#ffd700;
  --pink:#ff8da1; --lav:#d39eff; --ice:#bbe3ff;
  --panel:rgba(6,6,20,0.88); --border:rgba(82,214,138,0.22);
}
*{box-sizing:border-box;margin:0;padding:0}
body{overflow:hidden;background:#03030d;color:#f0f0ff;font-family:'Quicksand',sans-serif;user-select:none}
#c{position:fixed;inset:0;z-index:0}

/* ── SETTINGS ── */
#settings-btn{
  position:fixed;top:22px;right:22px;z-index:500;
  background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
  color:#fff;font-size:1.4rem;border-radius:50%;width:45px;height:45px;
  cursor:pointer;backdrop-filter:blur(10px);transition:all 0.3s;
  display:flex;align-items:center;justify-content:center;
}
#settings-btn:hover{background:rgba(255,255,255,0.15);transform:rotate(45deg);}
#settings-panel{
  position:fixed;top:75px;right:22px;width:260px;max-height:80vh;overflow-y:auto;z-index:490;
  background:rgba(6,6,20,0.9);border:1px solid rgba(255,255,255,0.12);
  border-radius:14px;padding:16px;backdrop-filter:blur(14px);
  opacity:0;pointer-events:none;transform:translateY(-10px);transition:all 0.3s;
}
#settings-panel.open{opacity:1;pointer-events:auto;transform:translateY(0);}
.set-group{margin-bottom:14px;}
.set-label{font-family:'Fredoka',sans-serif;font-size:0.85rem;color:var(--ice);margin-bottom:6px;display:flex;justify-content:space-between;}
.set-slider{width:100%;cursor:pointer;accent-color:var(--cyan);}
.set-title{font-family:'Fredoka',sans-serif;font-size:1rem;color:var(--mint);text-align:center;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:10px;}

/* ── FLASH ── */
#flash{position:fixed;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:999;transition:opacity .15s}
#flash.on{opacity:1}

/* ── DROPMASK — huevo durmiente ── */
#dropmask{
  position:fixed;inset:0;z-index:800;display:flex;align-items:center;justify-content:center;
  background:rgba(3,3,13,.97);transition:opacity .8s,pointer-events .8s;
  cursor:pointer;
}
#dropmask.hidden{opacity:0;pointer-events:none}

/* Huevo durmiente */
.egg-scene{position:relative;margin-bottom:28px;}
.sleep-egg{
  width:110px;height:145px;margin:0 auto;
  background:linear-gradient(160deg,rgba(99,245,161,.12) 0%,rgba(92,230,255,.08) 50%,rgba(211,158,255,.12) 100%);
  border-radius:50% 50% 50% 50%/60% 60% 40% 40%;
  border:1px solid rgba(99,245,161,.25);
  box-shadow:0 0 45px rgba(92,230,255,.12),0 0 90px rgba(99,245,161,.06),
             inset 0 0 25px rgba(255,255,255,.03);
  position:relative;overflow:hidden;
  animation:eggBreathe 3.8s ease-in-out infinite;
}
@keyframes eggBreathe{
  0%,100%{transform:scaleX(1) scaleY(1) rotate(-1.5deg)}
  50%     {transform:scaleX(1.03) scaleY(1.04) rotate(1.5deg)}
}
/* Brillo interno pulsante */
.sleep-egg::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 40% 35%,rgba(200,255,220,.12) 0%,transparent 70%);
  animation:eggGlow 3.8s ease-in-out infinite;
}
@keyframes eggGlow{0%,100%{opacity:.6}50%{opacity:1}}
/* Ojos dormidos — dos arcos suaves */
.egg-eyes{
  position:absolute;top:52%;left:50%;transform:translate(-50%,-50%);
  display:flex;gap:22px;align-items:center;
}
.egg-eye{
  width:18px;height:6px;
  border-bottom:2px solid rgba(99,245,161,.7);
  border-radius:0 0 18px 18px;
  animation:eyeDroop 3.8s ease-in-out infinite;
}
@keyframes eyeDroop{0%,100%{opacity:.7;transform:scaleY(1)}50%{opacity:.4;transform:scaleY(.7)}}
/* ZZZ flotantes */
.zzz-wrap{
  position:absolute;top:-8px;right:-10px;
  display:flex;flex-direction:column;gap:2px;align-items:flex-end;
}
.zzz-wrap span{
  font-size:.7rem;color:rgba(92,230,255,.6);
  font-family:'Fredoka',sans-serif;font-weight:300;
  animation:floatZ 2.4s ease-in-out infinite;
}
.zzz-wrap span:nth-child(1){animation-delay:0s;font-size:.6rem}
.zzz-wrap span:nth-child(2){animation-delay:.4s;font-size:.75rem}
.zzz-wrap span:nth-child(3){animation-delay:.8s;font-size:.9rem}
@keyframes floatZ{
  0%  {opacity:0;transform:translateY(0) translateX(0)}
  30% {opacity:.8}
  100%{opacity:0;transform:translateY(-22px) translateX(6px)}
}
/* Crack de eclosión */
.sleep-egg.hatching{animation:hatchShake .15s ease-in-out 4;}
@keyframes hatchShake{
  0%,100%{transform:rotate(-1.5deg) translateX(0)}
  25%    {transform:rotate(3deg) translateX(-3px)}
  75%    {transform:rotate(-3deg) translateX(3px)}
}
.sleep-egg.hatching::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse,rgba(200,255,220,.4) 0%,transparent 70%);
  animation:hatchFlash .6s ease-out;
}
@keyframes hatchFlash{0%{opacity:0}30%{opacity:1}100%{opacity:0}}

/* Textos */
.egg-title{font-family:'Fredoka',sans-serif;font-size:1.85rem;font-weight:400;
  background:linear-gradient(90deg,var(--mint),var(--cyan));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:6px;text-align:center;}
.egg-sub{font-size:.8rem;opacity:.38;margin-bottom:24px;text-align:center;letter-spacing:.04em;}

/* Botón principal conectar */
.btn-connect{
  padding:13px 36px;border:none;border-radius:50px;cursor:pointer;
  background:linear-gradient(135deg,rgba(99,245,161,.15),rgba(92,230,255,.15));
  border:1px solid rgba(99,245,161,.4);
  color:var(--mint);font-family:'Fredoka',sans-serif;font-size:1.05rem;font-weight:500;
  letter-spacing:.08em;backdrop-filter:blur(10px);
  box-shadow:0 4px 28px rgba(99,245,161,.12);transition:all .35s;display:block;margin:0 auto 14px;
}
.btn-connect:hover{background:linear-gradient(135deg,rgba(99,245,161,.28),rgba(92,230,255,.2));
  box-shadow:0 6px 40px rgba(99,245,161,.28);color:#fff;border-color:rgba(255,255,255,.5);}
.btn-connect:disabled{opacity:.4;cursor:default}
.btn-connect.connecting{
  animation:connectPulse 1s ease-in-out infinite;
  color:var(--cyan);border-color:rgba(92,230,255,.5);
}
@keyframes connectPulse{0%,100%{box-shadow:0 4px 28px rgba(92,230,255,.15)}
                         50%{box-shadow:0 4px 50px rgba(92,230,255,.45)}}

/* Opciones secundarias */
.egg-opts{display:flex;align-items:center;gap:12px;justify-content:center;margin-top:4px;}
.egg-opts-sep{font-size:.7rem;opacity:.25;}
.cegg-link,.skip-link{
  font-size:.75rem;opacity:.38;cursor:pointer;background:none;border:none;
  color:#f0f0ff;font-family:'Quicksand',sans-serif;transition:opacity .2s;
}
.cegg-link:hover,.skip-link:hover{opacity:.7;}
#file-input{display:none}

/* ── HUD ── */
#hud{
  position:fixed;left:16px;top:50%;transform:translateY(-50%);
  width:215px;padding:14px 16px 16px;
  background:rgba(6,6,20,0.45);border:1px solid rgba(82,214,138,0.15);
  border-radius:18px;backdrop-filter:blur(14px);z-index:200;
  transition:opacity .6s ease,border-color .8s;opacity:0.08;
}
#hud:hover,#hud.active{opacity:1!important}
#hud.dragon{border-color:rgba(170,221,255,.4);}
#hud.minimized .hud-body{display:none}
#hud.minimized{padding:10px 14px}
#hud-toggle{position:absolute;top:8px;right:10px;background:none;border:none;color:rgba(255,255,255,.35);font-size:.8rem;cursor:pointer;transition:color .2s;}
#hud-toggle:hover{color:rgba(255,255,255,.8)}
.hud-name{font-family:'Fredoka',sans-serif;font-size:1.05rem;font-weight:500;text-align:center;margin-bottom:10px;padding-right:16px;
  background:linear-gradient(90deg,var(--mint),var(--cyan),var(--lav));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;transition:all .8s;}
.hud-name.dragon{background:linear-gradient(90deg,#aaddff,#fff,#aaddff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.stats-row{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;margin-bottom:10px}
.sp{text-align:center;padding:6px 4px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:9px}
.sp i{font-size:.9rem;display:block;margin-bottom:1px}
.sp b{font-family:'Fredoka',sans-serif;font-size:.85rem;font-weight:500;color:var(--cyan);display:block}
.sp small{font-size:.55rem;opacity:.4;text-transform:uppercase;letter-spacing:.04em}
.bar-g{margin-bottom:7px}
.bar-h{display:flex;justify-content:space-between;font-size:.67rem;margin-bottom:2px;font-weight:600}
.bar-v{font-family:'Fredoka',sans-serif;font-size:.7rem;opacity:.6}
.bar-t{width:100%;height:5px;background:rgba(255,255,255,.07);border-radius:6px;overflow:hidden}
.bar-f{height:100%;border-radius:6px;transition:width .5s ease-out}
#bf-h{background:linear-gradient(90deg,#ff8da1,#ffaac5)}
#bf-e{background:linear-gradient(90deg,var(--mint),var(--cyan))}
#bf-bond{background:linear-gradient(90deg,var(--lav),#e0b0ff)}
#bf-love{background:linear-gradient(90deg,var(--gold),#ffec6e)}
/* Barra de energía del dragón — solo visible en dragon mode */
.dragon-bar-g{ margin-bottom:7px; display:none; }
#hud.dragon .dragon-bar-g{ display:block; }
#bf-drg{ background:linear-gradient(90deg,#ff8c00,#ffd700); }
#bf-drg.critical{ background:linear-gradient(90deg,#ff2200,#ff6600); animation:drgPulse .6s ease-in-out infinite; }
@keyframes drgPulse{ 0%,100%{opacity:1} 50%{opacity:.4} }

/* ── TOP CONTROLS ── */
.top-controls{
  position:fixed;top:22px;left:0;right:0;
  display:flex;justify-content:center;align-items:center;gap:40px;
  z-index:300;transition:opacity 1s,transform 1s;pointer-events:auto;
}
.top-controls.fade-out{opacity:0;transform:translateY(-20px);pointer-events:none;}
#btn-evo{
  padding:13px 34px;background:rgba(170,221,255,.1);border:1px solid rgba(170,221,255,.4);border-radius:50px;
  color:#aaddff;font-family:'Fredoka',sans-serif;font-size:1.05rem;font-weight:500;
  letter-spacing:.12em;cursor:pointer;backdrop-filter:blur(12px);box-shadow:0 4px 25px rgba(100,180,255,.18);
  transition:all .35s cubic-bezier(.34,1.56,.64,1);
}
#btn-evo:not(:disabled):hover{background:rgba(170,221,255,.28);border-color:rgba(255,255,255,.8);color:#fff;box-shadow:0 8px 45px rgba(100,180,255,.5);transform:scale(1.06)}
#btn-evo:disabled{opacity:.25;cursor:not-allowed}
#btn-evo.pulsing{animation:evoGlow 1.2s ease-in-out infinite;border-color:rgba(255,215,0,.7);color:var(--gold)}
@keyframes evoGlow{0%,100%{box-shadow:0 4px 25px rgba(255,215,0,.2)}50%{box-shadow:0 4px 50px rgba(255,215,0,.7)}}
#ws{display:flex;align-items:center;gap:7px;padding:8px 15px;background:rgba(6,6,20,.75);border:1px solid rgba(255,255,255,.09);border-radius:30px;font-size:.73rem;font-weight:600;backdrop-filter:blur(10px);}
.ws-dot{width:8px;height:8px;border-radius:50%;background:var(--pink);animation:wsPulse 1.5s infinite}
.ws-dot.on{background:var(--mint)}
@keyframes wsPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}

/* ── DRAGON UI ── */
#dragon-ui{
  position:fixed;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  z-index:400;pointer-events:none;opacity:0;transition:opacity 1.5s;
}
#dragon-ui.on{opacity:1;}
#dragon-ui.fade-out{opacity:0;}
#dragon-t{
  font-family:'Fredoka',sans-serif;font-size:2.8rem;font-weight:300;
  letter-spacing:.35em;color:rgba(255,255,255,.95);text-align:center;
  text-shadow:0 0 60px rgba(170,221,255,1),0 0 120px rgba(170,221,255,.5);margin-bottom:6px;
}
#dragon-s{font-size:.9rem;letter-spacing:.25em;color:rgba(200,220,255,.7);text-align:center;margin-bottom:2.5rem;}
#dragon-kanji{font-size:5rem;opacity:.25;margin-bottom:1rem;text-shadow:0 0 40px rgba(170,221,255,.6);}
.btn-return{
  position:fixed;bottom:30px;right:30px;
  padding:12px 30px;background:rgba(255,255,255,.07);border:1px solid rgba(170,221,255,.4);border-radius:40px;
  color:rgba(200,230,255,.8);font-family:'Fredoka',sans-serif;font-size:.95rem;cursor:pointer;
  backdrop-filter:blur(10px);transition:all .3s;opacity:0;pointer-events:none;z-index:450;
}
.btn-return.on{opacity:1;pointer-events:auto;}
.btn-return:hover{background:rgba(170,221,255,.18);border-color:rgba(255,255,255,.7);color:#fff;transform:scale(1.05);}

/* ── MOOD & TOASTS ── */
#mood{
  position:fixed;bottom:218px;left:50%;transform:translateX(-50%);
  padding:9px 20px;background:rgba(6,6,20,.85);border:1px solid rgba(255,255,255,.1);
  border-radius:30px;font-family:'Fredoka',sans-serif;font-size:1.05rem;
  backdrop-filter:blur(12px);z-index:250;opacity:0;pointer-events:none;
  transition:opacity .3s,transform .3s;white-space:nowrap;
}
#mood.on{opacity:1;transform:translateX(-50%) translateY(-8px)}
#toasts{position:fixed;top:80px;left:18px;width:280px;z-index:300;display:flex;flex-direction:column;gap:7px}
.toast{padding:12px 15px;background:var(--panel);border-radius:13px;border-left:4px solid var(--mint);backdrop-filter:blur(10px);font-size:.85rem;animation:tIn .4s cubic-bezier(.34,1.56,.64,1)}
.toast .tt{font-family:'Fredoka',sans-serif;font-weight:500;font-size:1rem;margin-bottom:4px;}
@keyframes tIn{from{opacity:0;transform:translateX(-55px) scale(.85)}to{opacity:1;transform:none}}
.toast.out{animation:tOut .3s ease forwards}
@keyframes tOut{to{opacity:0;transform:translateX(-40px)}}

/* ── CEGG PILL ── */
#cegg-pill{position:fixed;bottom:20px;right:18px;z-index:250;padding:8px 14px;background:rgba(6,6,20,.8);border:1px solid var(--border);border-radius:14px;font-size:.72rem;backdrop-filter:blur(10px);opacity:0;transition:opacity .5s;text-align:center;}
#cegg-pill.on{opacity:1}

/* ── PIP BUTTON ── */
#pip-btn{
  position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
  padding:10px 28px;background:rgba(6,6,20,.75);
  border:1px solid rgba(255,255,255,.15);border-radius:30px;
  color:rgba(200,220,255,.7);font-family:'Fredoka',sans-serif;font-size:.9rem;
  cursor:pointer;backdrop-filter:blur(10px);z-index:300;
  transition:all .3s;display:flex;align-items:center;gap:8px;
}
#pip-btn:hover{background:rgba(30,30,60,.9);border-color:rgba(255,255,255,.35);color:#fff;}
#pip-btn.active{border-color:var(--mint);color:var(--mint);}
#pip-video{display:none;}
</style>

<script src="https://cdn.jsdelivr.net/npm/three@0.145.0/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.145.0/examples/js/postprocessing/EffectComposer.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.145.0/examples/js/postprocessing/ShaderPass.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.145.0/examples/js/postprocessing/RenderPass.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.145.0/examples/js/shaders/CopyShader.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.145.0/examples/js/shaders/LuminosityHighPassShader.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.145.0/examples/js/postprocessing/UnrealBloomPass.js"></script>
</head>
<body>

<canvas id="c"></canvas>
<div id="flash"></div>
<video id="pip-video" muted playsinline></video>
<button id="pip-btn" onclick="togglePiP()" title="Ventana flotante siempre visible">📺 Flotar Pikitipu</button>

<button id="settings-btn" onclick="toggleSettings()" title="Ajustar Entorno">⚙️</button>
<div id="settings-panel">
  <div class="set-title">✨ Ajustes Cósmicos</div>
  <div class="set-group">
    <div class="set-label"><span>✨ Resplandor</span><span id="lbl-bloom">0.65</span></div>
    <input type="range" class="set-slider" id="sl-bloom" min="0" max="2.5" step="0.05" value="0.65" oninput="updateSettings()">
  </div>
  <div class="set-group">
    <div class="set-label"><span>💡 Exposición</span><span id="lbl-exp">1.25</span></div>
    <input type="range" class="set-slider" id="sl-exp" min="0.1" max="3.0" step="0.05" value="1.25" oninput="updateSettings()">
  </div>
  <div class="set-group">
    <div class="set-label"><span>⏳ Vel. Temporal</span><span id="lbl-speed">1.00</span></div>
    <input type="range" class="set-slider" id="sl-speed" min="0" max="5.0" step="0.1" value="1.0" oninput="updateSettings()">
  </div>
  <div class="set-group">
    <div class="set-label"><span>👻 Opacidad Base</span><span id="lbl-opacity">0.15</span></div>
    <input type="range" class="set-slider" id="sl-opacity" min="0.05" max="1.0" step="0.01" value="0.15" oninput="updateSettings()">
  </div>
  <div class="set-group">
    <div class="set-label"><span>💫 Intensidad Borde</span><span id="lbl-fresnel">0.55</span></div>
    <input type="range" class="set-slider" id="sl-fresnel" min="0" max="2.0" step="0.05" value="0.55" oninput="updateSettings()">
  </div>
  <div class="set-group">
    <div class="set-label"><span>🌈 Saturación</span><span id="lbl-sat">1.20</span></div>
    <input type="range" class="set-slider" id="sl-sat" min="0" max="2.0" step="0.1" value="1.2" oninput="updateSettings()">
  </div>
</div>

<div id="dropmask" onclick="hatchAndStart()">
  <div style="text-align:center;cursor:pointer">
    <div class="egg-scene">
      <div class="sleep-egg" id="hatch-egg">
        <div class="egg-eyes">
          <div class="egg-eye"></div>
          <div class="egg-eye"></div>
        </div>
      </div>
      <div class="zzz-wrap">
        <span>z</span><span>z</span><span>z</span>
      </div>
    </div>
    <!-- .cegg oculto: arrastrar archivo encima activa -->
    <input type="file" id="file-input" accept=".cegg,.json" style="display:none">
  </div>
</div>

<div class="top-controls" id="top-ctrls">
  <button id="btn-evo" onclick="triggerEvolution()" disabled>🐲 EVOLUCIONAR → HAKURYŪ</button>
  <div id="ws"><div class="ws-dot" id="ws-dot"></div><span id="ws-lbl">KP Desconectado</span></div>
</div>

<div id="hud">
  <button id="hud-toggle" onclick="toggleHud()" title="Minimizar/Expandir">▼</button>
  <div class="hud-name" id="hud-name">🌿 Pikitipu 2.0 🌿</div>
  <div class="hud-body">
    <div class="stats-row">
      <div class="sp"><i>⚡</i><b id="sv-pv">0</b><small>PV</small></div>
      <div class="sp"><i>✨</i><b id="sv-mu">0</b><small>MU</small></div>
      <div class="sp"><i>✅</i><b id="sv-tasks">0</b><small>Tareas</small></div>
      <div class="sp"><i>🏆</i><b id="sv-lv">1</b><small>Nivel</small></div>
    </div>
    <div class="bar-g"><div class="bar-h"><span>💚 Felicidad</span><span class="bar-v" id="bv-h">75%</span></div><div class="bar-t"><div class="bar-f" id="bf-h" style="width:75%"></div></div></div>
    <div class="bar-g"><div class="bar-h"><span>💫 Energía</span><span class="bar-v" id="bv-e">80%</span></div><div class="bar-t"><div class="bar-f" id="bf-e" style="width:80%"></div></div></div>
    <div class="bar-g"><div class="bar-h"><span>💜 Vínculo</span><span class="bar-v" id="bv-bond">0%</span></div><div class="bar-t"><div class="bar-f" id="bf-bond" style="width:0%"></div></div></div>
    <div class="bar-g"><div class="bar-h"><span>💛 Amor</span><span class="bar-v" id="bv-love">0%</span></div><div class="bar-t"><div class="bar-f" id="bf-love" style="width:0%"></div></div></div>
    <!-- Barra DragonEnergy — solo en modo dragón -->
    <div class="dragon-bar-g">
      <div class="bar-h"><span>🔥 Llama Dragona</span><span class="bar-v" id="bv-drg">100%</span></div>
      <div class="bar-t"><div class="bar-f" id="bf-drg" style="width:100%"></div></div>
    </div>
    <div class="dragon-bar-g" id="pvbonus-row">
      <div class="bar-h" style="justify-content:center">
        <span style="color:var(--gold);font-family:'Fredoka',sans-serif;font-size:.78rem">⚡ Modo Dragón: PV x1.5</span>
      </div>
    </div>
  </div>
</div>

<div id="dragon-ui">
  <div id="dragon-kanji">白龍</div>
  <div id="dragon-t">HAKURYŪ</div>
  <div id="dragon-s">Guardiana del Rendimiento · Sabiduría Celeste</div>
</div>
<button class="btn-return" id="btn-ret" onclick="returnToPikitipu()">↩ Retornar a Pikitipu</button>

<div id="mood"></div>
<div id="toasts"></div>
<div id="cegg-pill"></div>

<script>
// ══════════════════════════════════════════════════════════════
// ESTADO GLOBAL
// ══════════════════════════════════════════════════════════════
const S = {
  pv:0, mu:0, tasks:0, level:1, aspects:1,
  happiness:75, energy:80, bond:0, love:0,
  dragonEnergy:100,        // barra de energía del modo dragón (0-100)
  dragonPvBonus:0,         // PV extra acumulados con multiplicador 1.5x en modo dragón
  lastTaskTime:0,          // timestamp última tarea — para calcular inactividad
  timerActive:false,       // TRUE mientras hay timer KP corriendo → pausa decay de energía
  kpOnline:false,          // estado de conexión KP/relay
  lastUserColor:'#5ce6ff', // último color de aspecto recibido
  lastPriority:'B',        // última prioridad recibida
  form:'piki', mood:'happy',
  flashRate:2, evoPhase:'idle', evoTimer:0,
  bloomBase:0.65
};

// Uniforms compartidos — Pikitipu Y Dragona los leen simultáneamente
// FIX CRÍTICO: uTime aquí → se actualiza en el loop → el fluido anima
const sharedU = {
  uTime:             { value: 0 },      // ← NUNCA FALTARÁ ACTUALIZAR ESTO
  squish:            { value: 0 },
  happiness:         { value: 75 },
  flashInt:          { value: 0 },
  flashCol:          { value: new THREE.Color(0.4, 0.9, 0.6) },
  mood:              { value: 0 },
  uSpeed:            { value: 1.0 },
  uOpacityBase:      { value: 0.15 },
  uFresnelIntensity: { value: 0.55 },
  uColorSaturation:  { value: 1.2  }
};

// Cámara orbital
const Cam = {
  radius:11, targetRadius:11,
  theta:0,   targetTheta:0,
  phi:0,     targetPhi:0,
  yOffset:0.5, targetYOffset:0.5,
  isDragging:false, dragStartX:0, dragStartY:0,
  prevMouseX:0, prevMouseY:0
};

const HEARTS = [];

// ══════════════════════════════════════════════════════════════
// UI HELPERS — declarados ANTES de todo para garantizar hoisting
// ══════════════════════════════════════════════════════════════
let moodTout;
function showMood(txt){
  const el=document.getElementById('mood'); if(!el) return;
  el.textContent=txt; el.classList.add('on');
  clearTimeout(moodTout); moodTout=setTimeout(()=>el.classList.remove('on'),2200);
}
function toast(title,body,color='#63f5a1'){
  const feed=document.getElementById('toasts'); if(!feed) return;
  const t=document.createElement('div'); t.className='toast'; t.style.borderLeftColor=color;
  t.innerHTML=`<div class="tt">${title}</div><div>${body}</div>`; feed.prepend(t);
  setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),350);},4500);
}
function fmt(n){ return n>9999?Math.round(n/1000)+'k':n; }

// ══════════════════════════════════════════════════════════════
// SCENE & RENDERER
// ══════════════════════════════════════════════════════════════
const canvas   = document.getElementById('c');
const scene    = new THREE.Scene();
scene.fog      = new THREE.FogExp2(0x03030d, 0.018);
const camera   = new THREE.PerspectiveCamera(48, innerWidth/innerHeight, 0.1, 600);
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping        = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

const composer   = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
const bloom      = new THREE.UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight), S.bloomBase, 0.5, 0.45);
composer.addPass(renderPass);
composer.addPass(bloom);

// Luces
const ambL   = new THREE.AmbientLight(0x4a3b5c, 2.8);
const dirL   = new THREE.DirectionalLight(0xfff0f5, 1.5); dirL.position.set(5,10,7);
const rimL   = new THREE.PointLight(0xa6c5ff, 3.5, 25); rimL.position.set(-6,3,-5);
const frontL = new THREE.PointLight(0x7df9b6, 1.8, 18); frontL.position.set(0,0,6);
const drgL   = new THREE.PointLight(0xcce6ff, 0,   35); drgL.position.set(0,3,4);
scene.add(ambL, dirL, rimL, frontL, drgL);

// Sprite circular para partículas
const _cTex = (()=>{
  const cv=document.createElement('canvas'); cv.width=64; cv.height=64;
  const cx=cv.getContext('2d'); const g=cx.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,'rgba(255,255,255,1)'); g.addColorStop(.3,'rgba(255,255,255,.8)'); g.addColorStop(1,'rgba(255,255,255,0)');
  cx.fillStyle=g; cx.fillRect(0,0,64,64); return new THREE.CanvasTexture(cv);
})();

// Estrellas
(()=>{
  const geo=new THREE.BufferGeometry(); const v=[],c=[];
  for(let i=0;i<4500;i++){ v.push((Math.random()-.5)*500,(Math.random()-.5)*500,(Math.random()-.5)*500); const col=new THREE.Color().setHSL(.6+Math.random()*.15,.5,.8); c.push(col.r,col.g,col.b); }
  geo.setAttribute('position',new THREE.Float32BufferAttribute(v,3)); geo.setAttribute('color',new THREE.Float32BufferAttribute(c,3));
  scene.add(new THREE.Points(geo,new THREE.PointsMaterial({size:.65,vertexColors:true,map:_cTex,transparent:true,opacity:.65,depthWrite:false})));
})();

const clock    = new THREE.Clock();
const mouse    = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let isDown=false, isHover=false;

// ══════════════════════════════════════════════════════════════
// SIMPLEX NOISE GLSL (Ashima Arts)
// ══════════════════════════════════════════════════════════════
const SNOISE_GLSL = `
vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289v4(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289v3(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

// ══════════════════════════════════════════════════════════════
// VERTEX SHADER ETÉREO COMPARTIDO
// ══════════════════════════════════════════════════════════════
const ETERNAL_VERT = `
varying vec2 vUv; varying vec3 vNorm; varying vec3 vViewPosition; varying vec3 vPos;
uniform float uTime; uniform float uSpeed; uniform float squish;
void main(){
  vUv=uv; vNorm=normalize(normalMatrix*normal); vPos=position;
  float ts=uTime*uSpeed;
  float breath=sin(ts*.3)*.08+sin(ts*.4+position.y*.4+position.x*.4)*.05;
  vec3 np=position+normal*breath;
  np.y*=(1.-squish*.3); np.xz*=(1.+squish*.15);
  vec4 mv=modelViewMatrix*vec4(np,1.); vViewPosition=-mv.xyz;
  gl_Position=projectionMatrix*mv;
}`;

// ══════════════════════════════════════════════════════════════
// FRAGMENT SHADER PIKITIPU — paleta espectral + mejillas + flash
// ══════════════════════════════════════════════════════════════
const PIKI_FRAG = `
${SNOISE_GLSL}
uniform float uTime; uniform float uSpeed; uniform float uOpacityBase;
uniform float uFresnelIntensity; uniform float uColorSaturation;
uniform float happiness; uniform float flashInt; uniform vec3 flashCol; uniform int mood;
varying vec2 vUv; varying vec3 vNorm; varying vec3 vViewPosition; varying vec3 vPos;

vec3 spectralPalette(float t){
  vec3 a=vec3(.5,.5,.5),b=vec3(.5,.5,.5),c=vec3(1.,1.,1.),d=vec3(.00,.33,.67);
  return a+b*cos(6.28318*(c*t+d));
}
void main(){
  vec3 viewDir=normalize(vViewPosition); vec3 normal=normalize(vNorm);
  float ts=uTime*uSpeed*.1;
  // Noise fluido — el "plasma vivo" de Pikitipu
  float n1=snoise(vPos*.6+ts); float n2=snoise(vPos*.9-ts*1.2);
  float fluid=n1*.6+n2*.4;
  vec3 baseColor=spectralPalette(fluid*.8+ts*.5);
  vec3 color=pow(baseColor,vec3(2.-uColorSaturation));

  // Mejillas rosadas que brillan con la felicidad — ternura máxima
  float dL=distance(vUv,vec2(.35,.52)); float dR=distance(vUv,vec2(.65,.52));
  float cheeks=smoothstep(.09,.0,dL)+smoothstep(.09,.0,dR);
  color=mix(color,vec3(1.,.45,.6),cheeks*.55*(.4+happiness/100.*.6));

  // Fresnel: corona de luz en los bordes
  float fres=pow(1.-abs(dot(normal,viewDir)),2.5);
  vec3 finalColor=color+vec3(.8)*fres;
  float alpha=uOpacityBase+fres*uFresnelIntensity;

  // Modificadores de mood
  if(mood==1){float g=dot(finalColor,vec3(.3,.59,.11));finalColor=mix(finalColor,vec3(g*.6,g*.65,g*.85),.55);}
  if(mood==3){float g=dot(finalColor,vec3(.3,.59,.11));finalColor=mix(finalColor,vec3(g*.4),.6);}
  if(mood==2) finalColor+=vec3(.1,.15,.05);
  if(mood==4) finalColor=mix(finalColor,vec3(1.,.6,.75),.25);

  finalColor=mix(finalColor,flashCol,flashInt);
  gl_FragColor=vec4(finalColor,clamp(alpha,0.,1.));
}`;

// ══════════════════════════════════════════════════════════════
// FRAGMENT SHADER HAKURYŪ — nácar blanco + oro áurico
// ══════════════════════════════════════════════════════════════
const DRAGON_FRAG = `
${SNOISE_GLSL}
uniform float uTime; uniform float uSpeed; uniform float uOpacityBase;
uniform float uFresnelIntensity; uniform float uColorSaturation;
varying vec2 vUv; varying vec3 vNorm; varying vec3 vViewPosition; varying vec3 vPos;
void main(){
  vec3 viewDir=normalize(vViewPosition); vec3 normal=normalize(vNorm);
  float ts=uTime*uSpeed*.1;
  float n1=snoise(vPos*.5+ts); float n2=snoise(vPos*.75-ts*1.2);
  float fluid=n1*.6+n2*.4; float f=(fluid+1.)*.5;

  // Paleta guardiana: blanco nacarado ↔ oro ↔ azul celeste
  vec3 colorW=vec3(1.,1.,1.);
  vec3 colorG=vec3(1.,.85,.3);
  vec3 colorC=vec3(.8,.95,1.);
  vec3 base=mix(colorW,colorG,f*.8); base=mix(base,colorC,(1.-f)*.2);
  vec3 color=pow(base,vec3(2.-uColorSaturation));

  float fres=pow(1.-abs(dot(normal,viewDir)),2.5);
  vec3 finalColor=color+vec3(1.,.9,.5)*fres;
  float alpha=uOpacityBase*1.2+fres*uFresnelIntensity*1.5;
  gl_FragColor=vec4(finalColor,clamp(alpha,0.,1.));
}`;

// ══════════════════════════════════════════════════════════════
// CLASE PIKITIPU
// ══════════════════════════════════════════════════════════════
class Pikitipu {
  constructor(){
    this.g=new THREE.Group();
    this.blinkTimer=0; this.isBlinking=false; this.squish=0; this.bPhase=0; this.wPhase=0;
    this.mat=new THREE.ShaderMaterial({
      uniforms:sharedU, vertexShader:ETERNAL_VERT, fragmentShader:PIKI_FRAG,
      transparent:true, blending:THREE.NormalBlending, side:THREE.DoubleSide, depthWrite:false
    });
    this._body(); this._eyes(); this._mouth(); this._arms(); this._aura();
    scene.add(this.g);
  }
  _body(){
    const geo=new THREE.SphereGeometry(2.0,64,64); geo.scale(1.12,.96,1.05);
    this.body=new THREE.Mesh(geo,this.mat); this.g.add(this.body);
  }
  _eyes(){
    // Ojos con depthTest:false para superponer sobre el shader transparente del cuerpo.
    // El LID (párpado negro) fue eliminado — era la fuente de los "bloques negros"
    const makeEye=(x)=>{
      const eg=new THREE.Group();

      // Esclera oscura
      const base=new THREE.Mesh(
        new THREE.SphereGeometry(.38,32,32),
        new THREE.MeshStandardMaterial({color:0x0c0c22,roughness:.05,depthTest:false})
      );
      base.scale.set(1.0,1.15,.8); base.renderOrder=2; eg.add(base);

      // Iris — color ciclante arcoíris (se actualiza en _eyeAnim cada frame)
      const iMat=new THREE.MeshStandardMaterial({
        color:0x3ae0d6,emissive:0x137880,emissiveIntensity:.8,roughness:0,depthTest:false
      });
      const iris=new THREE.Mesh(new THREE.SphereGeometry(.24,24,24),iMat);
      iris.position.set(x>0?-.03:.03,-.02,.12); iris.renderOrder=3; eg.add(iris);
      eg.userData.irisMat=iMat;

      // Pupila — sin lid = sin bloques negros
      const pup=new THREE.Mesh(
        new THREE.SphereGeometry(.135,32,32),
        new THREE.MeshBasicMaterial({color:0x010106,depthTest:false})
      );
      pup.position.set(x>0?-.03:.03,-.02,.205); pup.renderOrder=4; eg.add(pup);

      // Brillos de ternura (estrellita)
      const s1=new THREE.Mesh(
        new THREE.SphereGeometry(.072,12,12),
        new THREE.MeshBasicMaterial({color:0xffffff,depthTest:false})
      );
      s1.position.set(.085,.115,.265); s1.renderOrder=5; eg.add(s1);
      const s2=new THREE.Mesh(
        new THREE.SphereGeometry(.036,8,8),
        new THREE.MeshBasicMaterial({color:0xffffff,depthTest:false})
      );
      s2.position.set(-.08,-.08,.265); s2.renderOrder=5; eg.add(s2);

      // NO hay lid — era el origen de los bloques negros parpadeantes
      eg.userData.lid = null; // mantener compatibilidad con _eyeAnim

      eg.position.set(x,.15,1.82);
      this.g.add(eg); return eg;
    };
    this.eyeL=makeEye(-.82); this.eyeR=makeEye(.82);
  }
  _mouth(){
    this.mouthG=new THREE.Group();
    const shape=new THREE.Shape();
    shape.moveTo(-.15,0); shape.quadraticCurveTo(0,-.12,.15,0); shape.quadraticCurveTo(0,-.03,-.15,0);
    const mesh=new THREE.Mesh(new THREE.ShapeGeometry(shape),new THREE.MeshBasicMaterial({color:0x160a24,side:THREE.DoubleSide}));
    this.mouthG.add(mesh); this.mouthG.position.set(0,-.22,1.94); this.g.add(this.mouthG);
  }
  _arms(){
    const makeArm=(x)=>{
      const ag=new THREE.Group();
      const arm=new THREE.Mesh(new THREE.CapsuleGeometry(.22,.35,10,12),this.mat);
      arm.rotation.z=x>0?-.9:.9; ag.add(arm);
      const hand=new THREE.Mesh(new THREE.SphereGeometry(.25,16,16),this.mat); hand.position.y=-.35; ag.add(hand);
      ag.position.set(x*1.9,-.45,.65); ag.userData.baseY=-.45; return ag;
    };
    this.armL=makeArm(-1); this.armR=makeArm(1); this.g.add(this.armL,this.armR);
  }
  _aura(){
    this.auraMat=new THREE.PointsMaterial({map:_cTex,size:.5,color:0x6df0b5,transparent:true,opacity:.1,depthWrite:false,blending:THREE.AdditiveBlending});
    const geo=new THREE.BufferGeometry(); const pos=new Float32Array(50*3);
    for(let i=0;i<50;i++){pos[i*3]=(Math.random()-.5)*5;pos[i*3+1]=(Math.random()-.5)*5;pos[i*3+2]=(Math.random()-.5)*5;}
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    this.aura=new THREE.Points(geo,this.auraMat); this.g.add(this.aura);
  }
  // ── Flash mezclado: 60% color usuario + 40% color prioridad ──
  flash(hex, intensity=.88, dur=.65){
    sharedU.flashCol.value.set(hex);
    sharedU.flashInt.value=intensity;
    S.flashRate=intensity/dur;
  }
  flashMixed(userColorHex, priority, intensity=.88, dur=.65){
    const PRIO = {A:0xff6bca, B:0x5ce6ff, C:0x63f5a1};
    const isRubedo = !userColorHex || userColorHex==='#000000';
    if(isRubedo){ this._triggerRubedo(); return; }
    const uc = new THREE.Color(userColorHex);
    const pc = new THREE.Color(PRIO[priority]||0x5ce6ff);
    // Brillo del color del usuario
    const brightness = uc.r*.299 + uc.g*.587 + uc.b*.114;
    let mixed;
    if(brightness < 0.2){
      // Color muy oscuro → usar color de prioridad con leve tinte del aspecto
      mixed = pc.clone().lerp(uc, 0.12);
    } else {
      // 60% usuario, 40% prioridad
      mixed = uc.clone().lerp(pc, 0.4);
    }
    // Garantizar brillo mínimo visible (evita grises)
    const m = mixed.r*.299 + mixed.g*.587 + mixed.b*.114;
    if(m < 0.35) mixed.multiplyScalar(0.35 / Math.max(m, 0.001));
    this.flash(mixed.getHex(), intensity, dur);
  }
  _triggerRubedo(){
    // Pulsar Rubedo: calipso verde → fucsia — firma alquímica
    const seq = [0x00d4aa, 0xff2d9e, 0x00d4aa];
    seq.forEach((col,i)=>{
      setTimeout(()=> this.flash(col, 0.85, 0.3), i*320);
    });
  }

  // ── Catarsis proporcional a días de resistencia ────────────
  _catharsis(days, pvDelta=0){
    const tier = days>=61 ? 'mega' : days>=15 ? 'alta' : days>=4 ? 'media' : 'leve';
    const energyBase = {leve:12, media:20, alta:30, mega:42}[tier];
    // +1 energía por cada 30 PV ganados (proporcional a voluntad invertida)
    const energyFromPV = Math.min(20, Math.floor(pvDelta / 30));
    const energyGain   = energyBase + energyFromPV;
    const hearts       = {leve:3,  media:6,  alta:10, mega:15}[tier];
    const msg          = days===0
      ? '✨ ¡Tarea completada!'
      : `✨ ¡${days} días liberados!`;

    S.energy    = Math.min(100, S.energy+energyGain);
    S.happiness = Math.min(100, S.happiness+14);
    S.bond      = Math.min(100, S.bond+4);

    spawnHearts(hearts);
    showMood(msg);

    if(tier==='alta'||tier==='mega'){
      let shakes=0; const shakeInt=setInterval(()=>{
        this.g.position.x=Math.sin(shakes*8)*.18;
        if(++shakes>8){this.g.position.x=0;clearInterval(shakeInt);}
      },40);
      setTimeout(()=>this.flash(0xffffff,.9,.3), 160);
    }
    if(tier==='mega'){
      this.g.scale.set(1.3,1.3,1.3);
      setTimeout(()=>this.g.scale.set(1,1,1), 400);
      toast('🌟 ¡Resistencia épica!',`${days} días superados. ¡Pikitipu explota de alegría!`,'#ffd700');
      if(S.energy>70) _checkEvolutionReady();
    }
  }

  // ── Reacciones a eventos KP ───────────────────────────────
  onTaskComplete(msg={}){
    const pvNew      = msg.pv          || 0;
    const mu         = msg.mu          || 0;
    const days       = msg.days_delayed|| 0;
    const priority   = msg.priority    || 'B';
    const userColor  = msg.user_color  || '#5ce6ff';

    // Delta de PV: cuántos PV ganó esta tarea específica
    const pvDelta    = pvNew > S.pv ? pvNew - S.pv : 0;

    S.lastUserColor = userColor;
    S.lastPriority  = priority;
    S.lastTaskTime  = _elapsed;
    if(pvNew) S.pv=pvNew; if(mu) S.mu=mu;
    S.tasks++;
    this.squish=.25;

    this.flashMixed(userColor, priority, .88, .7);
    // Catarsis proporcional a días + PV
    this._catharsis(days, pvDelta);

    if(S.form==='dragon'){
      const bonus=Math.round((pvNew||0)*.5);
      S.dragonPvBonus+=bonus;
      // Recarga energía dragón también proporcional a PV delta
      const drgBase = days>=61?80:days>=15?55:days>=4?30:20;
      const drgPVBonus = Math.min(20, Math.floor(pvDelta / 50)); // +1 por cada 50 PV
      const drgGain = drgBase + drgPVBonus;
      S.dragonEnergy=Math.min(100,S.dragonEnergy+drgGain);
      updateDragonEnergyBar();
      showMood(`🔥 PV x1.5 +${bonus} · 🐲+${drgGain}`);
    }

    this._syncHUDStats();
    _checkEvolutionReady();
  }

  onLevelUp(lv){
    this.flash(0xffd700,.92,1.1);
    S.energy    = Math.min(100, S.energy+25);
    S.happiness = Math.min(100, S.happiness+28);
    S.level=lv; document.getElementById('sv-lv').textContent=lv;
    showMood(`🌟 ¡Nivel ${lv}!`); spawnHearts(12);
    toast('🏆 ¡Nivel Alcanzado!','Pikitipu irradia luz dorada.','#ffd700');
    if(S.form==='dragon'){ S.dragonEnergy=Math.min(100,S.dragonEnergy+40); updateDragonEnergyBar(); }
    _checkEvolutionReady();
  }
  onWildEncounter(){ this.flashMixed(S.lastUserColor,'A',.78,.45); showMood('😰 ¡Wild Encounter!'); }
  onNinjaStart(){
    S.timerActive=true;   // ← timer activo: pausa decay de energía
    this.flash(0x00ffff,.65,.85); showMood('🥷 Ninja Mode ON');
  }
  onNinjaEnd(){
    S.timerActive=false;  // ← timer termina: decay reanuda
    S.energy=Math.min(100,S.energy+18);
    this.flashMixed(S.lastUserColor,S.lastPriority,.72,1.0);
    spawnHearts(7); showMood('🎯 ¡Quest lograda!');
    if(S.form==='dragon'){
      S.dragonEnergy=Math.min(100,S.dragonEnergy+30);
      updateDragonEnergyBar();
      toast('🐲 Ninja Quest','Llama dragona +30','#5ce6ff');
    }
    _checkEvolutionReady();
  }
  onTimerTick(){ S.timerActive=true; }   // KP envía mientras timer corre
  onTimerStop(){ S.timerActive=false; }
  onKPStatus(online){
    S.kpOnline=online;
    this.auraMat.color.set(online ? 0x6df0b5 : 0x334455);
    if(online) this.auraMat.opacity=0.22;
    showMood(online?'🟢 KP conectado':'🔴 KP desconectado');
  }

  pet(dt){
    S.happiness=Math.min(100,S.happiness+32*dt); S.bond=Math.min(100,S.bond+14*dt); S.love=Math.min(100,S.love+10*dt);
    this.squish=Math.min(.26,this.squish+dt*4.5); if(Math.random()<dt*3.5) spawnHearts(1);
    _checkEvolutionReady();
  }
  _syncHUDStats(){
    document.getElementById('sv-pv').textContent=fmt(S.pv); document.getElementById('sv-mu').textContent=fmt(S.mu);
    document.getElementById('sv-tasks').textContent=S.tasks; document.getElementById('sv-lv').textContent=S.level;
  }
  update(t,dt,isPetting){
    // Decay: pausa si hay timer KP activo O si se está acariciando
    if(!isPetting && !S.timerActive){
      S.happiness=Math.max(0,S.happiness-.75*dt);
      S.energy   =Math.max(0,S.energy-.18*dt);
    }
    S.bond=Math.max(0,S.bond-.04*dt); this.squish=Math.max(0,this.squish-dt*2.5);
    // ★ FIX CRÍTICO: uTime se actualiza AQUÍ — sin esto el shader está congelado
    sharedU.uTime.value     = t;
    sharedU.happiness.value = S.happiness;
    sharedU.squish.value    = this.squish;
    if(sharedU.flashInt.value>0) sharedU.flashInt.value=Math.max(0,sharedU.flashInt.value-S.flashRate*dt);

    // Mood
    if(S.energy<=0)         S.mood='sleepy';
    else if(S.energy<12)    S.mood='sleepy';
    else if(S.happiness<18) S.mood='sad';
    else if(isPetting)      S.mood='love';
    else if(S.happiness>75) S.mood='happy';
    else                    S.mood='neutral';
    sharedU.mood.value={happy:0,sad:1,excited:2,sleepy:3,love:4,neutral:0}[S.mood]||0;

    const spd=S.mood==='excited'?6:S.mood==='sleepy'?.4:1.4; this.bPhase+=dt*spd;
    this.g.position.y=Math.sin(this.bPhase)*(S.mood==='sleepy'?.05:.32);
    this.wPhase+=dt*1.8; this.g.rotation.z=Math.sin(this.wPhase*2.5)*.025;
    if(S.evoPhase==='idle'||S.evoPhase==='preflash'){
      const sc={happy:1.02,sad:.86,excited:1.15,sleepy:.85,love:1.08,neutral:1.0}[S.mood]||1;
      this.g.scale.lerp(new THREE.Vector3(sc,sc,sc),.06);
    }
    this._eyeAnim(t,dt);
    const exc=isPetting||S.mood==='excited';
    [this.armL,this.armR].forEach((arm,i)=>{
      if(exc){ arm.position.y=arm.userData.baseY+1.1+Math.sin(t*8+i*Math.PI)*.3; arm.rotation.z=(i===0?1:-1)*(.7+Math.sin(t*6)*.25); }
      else   { arm.position.y=arm.userData.baseY+Math.sin(t*1.2+i*Math.PI)*.18;  arm.rotation.z=(i===0?.8:-.8); }
    });
    this.aura.rotation.y+=dt*.15;
    this.auraMat.opacity+=((S.mood==='sleepy'?.05:.15)-this.auraMat.opacity)*.05;
    if(S.mood==='excited') this.mouthG.scale.set(1.3,1.8,1);
    else if(S.mood==='sad') this.mouthG.scale.set(1,-0.8,1);
    else this.mouthG.scale.set(1,1,1);
    this._updateHUD();
  }
  _eyeAnim(t,dt){
    const readyToEvolve=(S.love>=95&&S.bond>=95&&S.energy>=95);
    [this.eyeL,this.eyeR].forEach(eg=>{
      // Lid eliminado — era la fuente de los bloques negros parpadeantes
      // Expresión via escala vertical del grupo de ojo completo
      const forceSleep=(S.energy<=0);
      const tScaleY = forceSleep?0.10:S.mood==='sleepy'?0.24:S.mood==='sad'?0.62:1.0;
      eg.scale.y += (tScaleY - eg.scale.y) * 0.1;
      if(readyToEvolve){
        eg.userData.irisMat.color.setRGB(2.5,2.5,2.5);
        eg.userData.irisMat.emissive.setRGB(2.0,2.0,2.0);
        eg.userData.irisMat.emissiveIntensity=3.0;
      } else {
        eg.userData.irisMat.emissiveIntensity=.8;
        const h=(t*.03+(eg===this.eyeL?0:.5))%1;
        eg.userData.irisMat.color.setHSL(h,.7,.6);
        eg.userData.irisMat.emissive.setHSL(h,.7,.5);
      }
    });
  }
  _updateHUD(){
    const b=(id,v)=>{ const f=document.getElementById('bf-'+id),l=document.getElementById('bv-'+id); if(f)f.style.width=v+'%'; if(l)l.textContent=Math.round(v)+'%'; };
    b('h',S.happiness); b('e',S.energy); b('bond',S.bond); b('love',S.love);
  }
  setVisible(v){ this.g.visible=v; }
}

// ══════════════════════════════════════════════════════════════
// CLASE DRAGONA HAKURYŪ
// ══════════════════════════════════════════════════════════════
class DragonaHakuryu {
  constructor(){
    this.g=new THREE.Group(); this.g.visible=false; this.breathPhase=0;
    this.dragonMat=new THREE.ShaderMaterial({
      uniforms:sharedU, vertexShader:ETERNAL_VERT, fragmentShader:DRAGON_FRAG,
      transparent:true, blending:THREE.NormalBlending, side:THREE.DoubleSide, depthWrite:false
    });
    this.gold=new THREE.MeshStandardMaterial({color:0xffd700,emissive:0x995500,emissiveIntensity:.5,roughness:.1,metalness:.95});
    this._unifiedBody(); this._majesticHead(); this._organicLimbs(); this._celestialWings(); this._aura();
    scene.add(this.g);
  }
  _unifiedBody(){
    const pts=[
      new THREE.Vector3(0,-4.5,-5.5), new THREE.Vector3(0,-4.0,-3.5),
      new THREE.Vector3(0,-3.2,-1.8), new THREE.Vector3(0,-2.0,-0.2),
      new THREE.Vector3(-.15,0.0,.1),  new THREE.Vector3(.0,1.2,-.2),
      new THREE.Vector3(.15,2.5,.0),   new THREE.Vector3(.08,3.8,.2),
      new THREE.Vector3(-.05,4.8,.15), new THREE.Vector3(0.,5.8,.0),
    ];
    this.bodyCurve=new THREE.CatmullRomCurve3(pts);
    const tubeGeo=new THREE.TubeGeometry(this.bodyCurve,100,.6,24,false);
    const posAttr=tubeGeo.attributes.position;
    const uvAttr =tubeGeo.attributes.uv;
    const p=new THREE.Vector3();
    for(let i=0;i<posAttr.count;i++){
      p.fromBufferAttribute(posAttr,i);
      const t=uvAttr.getX(i); let rs=1.0;
      if     (t<.35)  rs=THREE.MathUtils.lerp(.05,.90,t/.35);
      else if(t<.55)  rs=THREE.MathUtils.lerp(.90,1.35,(t-.35)/.2);
      else if(t<.80)  rs=THREE.MathUtils.lerp(1.35,.65,(t-.55)/.25);
      else            rs=THREE.MathUtils.lerp(.65,.45,(t-.80)/.2);
      const cp=this.bodyCurve.getPointAt(t);
      p.sub(cp).multiplyScalar(rs).add(cp); posAttr.setXYZ(i,p.x,p.y,p.z);
    }
    tubeGeo.computeVertexNormals();
    this.g.add(new THREE.Mesh(tubeGeo,this.dragonMat));
  }
  _majesticHead(){
    this.headG=new THREE.Group(); this.headG.position.set(0,6.2,.1);
    const skull=new THREE.Mesh(new THREE.SphereGeometry(.75,32,24),this.dragonMat); skull.scale.set(1.0,.85,1.2); this.headG.add(skull);
    const snout=new THREE.Mesh(new THREE.SphereGeometry(.42,24,16),this.dragonMat); snout.position.set(0,-.15,.75); snout.scale.set(.8,.7,1.3); this.headG.add(snout);
    // Cejas
    [-1,1].forEach(s=>{
      const b=new THREE.Mesh(new THREE.CapsuleGeometry(.12,.3,8,8),this.dragonMat);
      b.position.set(s*.35,.35,.6); b.rotation.set(-.3,s*.4,s*.6); this.headG.add(b);
    });
    // Cuernos en oro
    [-1,1].forEach(s=>{
      const hPts=[]; for(let i=0;i<6;i++){ const t=i/5; hPts.push(new THREE.Vector3(s*(.35+Math.pow(t,1.5)*.7),.3+t*.9-Math.pow(t,2)*.15,-.1-t*.6)); }
      this.headG.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(hPts),16,.09,8,false),this.gold));
    });
    // Ojos dorados de sabiduría
    [-1,1].forEach(s=>{
      const eg=new THREE.Group();
      eg.add(new THREE.Mesh(new THREE.SphereGeometry(.18,24,24),new THREE.MeshStandardMaterial({color:0x221100,roughness:.5})));
      const iris=new THREE.Mesh(new THREE.SphereGeometry(.12,16,16),new THREE.MeshStandardMaterial({color:0xffd700,emissive:0xffaa00,emissiveIntensity:1.8}));
      iris.position.z=.08; eg.add(iris);
      const pup=new THREE.Mesh(new THREE.CapsuleGeometry(.025,.07,4,8),new THREE.MeshBasicMaterial({color:0x000000}));
      pup.position.z=.13; eg.add(pup);
      eg.position.set(s*.42,.18,.55); eg.rotation.z=s*-.2;
      this.headG.add(eg);
    });
    // Bigotes de oro
    [-1,1].forEach(s=>{
      const pts=[new THREE.Vector3(0,0,0),new THREE.Vector3(s*.6,-.2,.5),new THREE.Vector3(s*1.4,-.6,.9),new THREE.Vector3(s*2.2,-1.2,.8)];
      const w=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),20,.025,6,false),this.gold);
      w.position.set(s*.25,-.2,.8); this.headG.add(w);
    });
    this.g.add(this.headG);
  }
  _organicLimbs(){
    [-1,1].forEach(s=>{
      const lg=new THREE.Group();
      const th=new THREE.Mesh(new THREE.CapsuleGeometry(.35,.8,12,16),this.dragonMat); th.rotation.z=s*.25; lg.add(th);
      const ca=new THREE.Mesh(new THREE.CapsuleGeometry(.25,.7,12,16),this.dragonMat); ca.position.set(s*.15,-.6,.15); ca.rotation.z=s*-.2; lg.add(ca);
      const ft=new THREE.Mesh(new THREE.SphereGeometry(.28,16,16),this.dragonMat); ft.scale.set(1.1,.6,1.4); ft.position.set(s*.25,-1.1,.3); lg.add(ft);
      [-1,0,1].forEach(c=>{ const cl=new THREE.Mesh(new THREE.ConeGeometry(.04,.2,8),this.gold); cl.position.set(s*.25+c*.1,-1.25,.5); cl.rotation.x=-.5; cl.rotation.z=c*.1; lg.add(cl); });
      lg.position.set(s*.4,-1.6,.1); this.g.add(lg);
    });
    [-1,1].forEach(s=>{
      const ag=new THREE.Group();
      const sh=new THREE.Mesh(new THREE.SphereGeometry(.3,16,16),this.dragonMat); sh.scale.set(1.2,1.2,.8); ag.add(sh);
      const fa=new THREE.Mesh(new THREE.CapsuleGeometry(.2,.65,10,14),this.dragonMat); fa.position.set(s*.2,-.4,.2); fa.rotation.set(.3,0,s*-.4); ag.add(fa);
      const ha=new THREE.Mesh(new THREE.SphereGeometry(.18,12,12),this.dragonMat); ha.position.set(s*.35,-.8,.4); ag.add(ha);
      for(let c=0;c<3;c++){ const cl=new THREE.Mesh(new THREE.ConeGeometry(.035,.15,6),this.gold); cl.position.set(s*.35+(c-1)*.07,-.95,.48); cl.rotation.x=-.8; ag.add(cl); }
      ag.position.set(s*.45,1.8,.2); this.g.add(ag);
    });
  }
  _celestialWings(){
    this.wings=new THREE.Group();
    [-1,1].forEach(side=>{
      const ws=new THREE.Group();
      for(let i=0;i<6;i++){
        const len=7.5-i*.8;
        const shape=new THREE.Shape();
        shape.moveTo(0,0); shape.quadraticCurveTo(.8,len*.4,.2,len); shape.quadraticCurveTo(-.6,len*.5,0,0);
        const f=new THREE.Mesh(new THREE.ShapeGeometry(shape),this.dragonMat);
        f.position.set(side*.15,i*.12,-.05);
        f.rotation.z=side*(Math.PI*.82-i*.12); f.rotation.x=.3+i*.05; f.rotation.y=side*.2;
        f.userData={phaseOffset:i*.3, baseRy:f.rotation.y, baseRz:f.rotation.z, idx:i}; ws.add(f);
      }
      ws.position.set(0,3.8,-.1); this.wings.add(ws);
    });
    this.g.add(this.wings);
  }
  _aura(){
    this.pCloud=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({map:_cTex,color:0xfff5cc,size:.4,transparent:true,opacity:.6,sizeAttenuation:true,depthWrite:false,blending:THREE.AdditiveBlending}));
    const pos=new Float32Array(200*3);
    for(let i=0;i<200;i++){pos[i*3]=(Math.random()-.5)*12;pos[i*3+1]=Math.random()*15-5;pos[i*3+2]=(Math.random()-.5)*12;}
    this.pCloud.geometry.setAttribute('position',new THREE.BufferAttribute(pos,3)); this.g.add(this.pCloud);
  }
  update(t,dt){
    if(!this.g.visible) return;
    // uTime ya fue actualizado por piki.update → compartido
    this.breathPhase+=dt*.4;

    // ── DRAGON ENERGY DECAY ───────────────────────────────────
    // Timer activo (tarea corriendo): ~3%/min — se sostiene
    // Sin timer + pendientes: ~70%/min (~1.4min desde 100%)
    // Sin timer + sin pendientes: ~100%/min (~1min desde 100%) — máxima urgencia
    // Extra si inactivo >30s: x1.5
    const inactiveTime = t - S.lastTaskTime;
    const noPendientes = (S.pendientes===0);
    let decayRate;
    if(S.timerActive){
      decayRate = 0.0005;                               // ~3%/min — trabajando
    } else if(noPendientes){
      decayRate = 0.017 * (inactiveTime>30?1.5:1.0);   // ~100-150%/min
    } else {
      decayRate = 0.012 * (inactiveTime>30?1.5:1.0);   // ~70-105%/min
    }
    S.dragonEnergy = Math.max(0, S.dragonEnergy - decayRate * dt * 60);
    updateDragonEnergyBar();

    // Feedback visual proporcional a la energía
    const eRatio = S.dragonEnergy / 100;
    sharedU.uOpacityBase.value    = 0.15 * (0.4 + eRatio * 0.6);
    sharedU.uFresnelIntensity.value = 0.55 * (0.5 + eRatio * 0.5);
    const moveScale = 0.4 + eRatio * 0.6;

    this.g.scale.setScalar((1.0+Math.sin(this.breathPhase)*.015) * (0.85 + eRatio * 0.15));
    this.g.position.y=Math.sin(t*1.5*moveScale)*.15;
    this.g.rotation.z=Math.sin(t*1.2*moveScale)*.02;
    this.g.rotation.y=Math.sin(t*.2*moveScale)*.03;

    // ── ALERTAS VISUALES POR UMBRAL ──────────────────────────
    if(S.dragonEnergy < 8 && S.dragonEnergy > 0){
      // <8%: rojo intenso pulsante rápido — involución inminente
      drgL.color.setRGB(1,0.1,0);
      drgL.intensity = 5 + Math.abs(Math.sin(t*8)) * 4;
      bloom.strength = S.bloomBase + 1.2 + Math.abs(Math.sin(t*8)) * 0.8;
    } else if(S.dragonEnergy < 20){
      // <20%: rojo suave pulsante — alerta
      drgL.color.setRGB(1, 0.25 + eRatio*0.5, 0);
      drgL.intensity = 3.5 + Math.abs(Math.sin(t*4)) * 2.5;
      bloom.strength = S.bloomBase + 0.5;
    } else {
      // Normal: luz celeste
      drgL.color.setRGB(0.8, 0.9, 1.0);
      drgL.intensity = 4 + Math.sin(t*.7)*.8;
      bloom.strength = S.bloomBase + 0.3;
    }

    // ── AUTO-RETORNO: involución al llegar a 8% ───────────────
    if(S.dragonEnergy <= 8 && S.evoPhase === 'dragon'){
      _triggerDragonReturn('depletion');
    }

    if(this.wings){
      // Aleteo idle suave + aleteo fuerte al hacer click (_wflap timer)
      const flapExtra = (this._wflap > 0)
        ? Math.sin((1-(this._wflap/2.8)) * Math.PI * 3) * 0.55  // 3 aleteos rápidos
        : 0;
      if(this._wflap > 0) this._wflap -= dt;

      this.wings.children.forEach((ws,si)=>{
        const side = si===0 ? -1 : 1;
        ws.children.forEach(f=>{
          // Movimiento idle
          const idleY = f.userData.baseRy + Math.sin(t*1.5*moveScale+f.userData.phaseOffset)*.1;
          // Aleteo: las plumas de afuera se mueven más
          const flapMult = 0.5 + (f.userData.idx||0) * 0.12;
          f.rotation.y = idleY + flapExtra * side * flapMult * 0.4;
          // Z del ala también se mueve (apertura)
          f.rotation.z = f.userData.baseRz + flapExtra * side * flapMult * 0.25;
        });
      });
    }
    const pp=this.pCloud.geometry.attributes.position;
    for(let i=0;i<pp.count;i++){ pp.setY(i,pp.getY(i)+dt*.5*eRatio); if(pp.getY(i)>8)pp.setY(i,-5); }
    pp.needsUpdate=true;
  }

  flapWings(){
    this._wflap = 2.8; // duración más larga — el dragón te reconoce con calma
    // Flash dorado al aletear — el dragón te reconoce
    sharedU.flashCol.value.set(0xffd700);
    sharedU.flashInt.value = 0.38;
    S.flashRate = 0.38 / 0.5;
    S.love = Math.min(100, S.love + 5);
  }

  setVisible(v){ this.g.visible=v; }
}

// ══════════════════════════════════════════════════════════════
// PARTÍCULAS EVOLUCIÓN
// ══════════════════════════════════════════════════════════════
class EvoParticles {
  constructor(){
    this.count=350; this.vel=[];
    const pos=new Float32Array(this.count*3);
    for(let i=0;i<this.count;i++){
      pos[i*3]=pos[i*3+1]=pos[i*3+2]=0;
      const theta=Math.random()*Math.PI*2,phi=Math.acos(2*Math.random()-1),spd=3+Math.random()*5;
      this.vel.push(new THREE.Vector3(Math.sin(phi)*Math.cos(theta)*spd,Math.sin(phi)*Math.sin(theta)*spd,Math.cos(phi)*spd*.5));
    }
    this.pts=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({map:_cTex,color:0xcce6ff,size:.4,transparent:true,opacity:.95,depthWrite:false,blending:THREE.AdditiveBlending}));
    this.pts.geometry.setAttribute('position',new THREE.BufferAttribute(pos,3));
    this.pts.visible=false; scene.add(this.pts); this.phase='idle'; this.et=0;
  }
  trigger(){ this.phase='explode';this.et=0;this.pts.visible=true;this.pts.material.opacity=.95; const pos=this.pts.geometry.attributes.position; for(let i=0;i<this.count;i++)pos.setXYZ(i,0,0,0); pos.needsUpdate=true; }
  update(dt){
    if(this.phase==='idle')return; this.et+=dt; const pos=this.pts.geometry.attributes.position;
    if(this.phase==='explode'){ for(let i=0;i<this.count;i++)pos.setXYZ(i,pos.getX(i)+this.vel[i].x*dt,pos.getY(i)+this.vel[i].y*dt,pos.getZ(i)+this.vel[i].z*dt); if(this.et>.75){this.phase='converge';this.et=0;} }
    else if(this.phase==='converge'){ for(let i=0;i<this.count;i++)pos.setXYZ(i,pos.getX(i)+(0-pos.getX(i))*dt*4,pos.getY(i)+(.5-pos.getY(i))*dt*4,pos.getZ(i)+(0-pos.getZ(i))*dt*4); this.pts.material.opacity=Math.max(0,.95-this.et*1.2); if(this.et>1.0){this.phase='idle';this.pts.visible=false;} }
    pos.needsUpdate=true;
  }
}

// ══════════════════════════════════════════════════════════════
// HELPERS GLOBALES — corazones
// ══════════════════════════════════════════════════════════════
function spawnHearts(n=3){
  for(let i=0;i<n;i++){
    const m=new THREE.Mesh(new THREE.SphereGeometry(.12,8,8),new THREE.MeshBasicMaterial({color:new THREE.Color().setHSL(.95+Math.random()*.08,.85,.75),transparent:true,opacity:1}));
    const a=Math.random()*Math.PI*2, r=2.2+Math.random()*1.2;
    m.position.set(Math.cos(a)*r,Math.random()*1.8,Math.sin(a)*r);
    m.userData={vel:new THREE.Vector3((Math.random()-.5)*.8,1.5+Math.random(),(Math.random()-.5)*.8),life:1.0};
    scene.add(m); HEARTS.push(m);
  }
}
function updateHearts(dt){
  for(let i=HEARTS.length-1;i>=0;i--){
    const h=HEARTS[i]; h.position.add(h.userData.vel.clone().multiplyScalar(dt));
    h.userData.life-=dt*.75; h.material.opacity=h.userData.life;
    if(h.userData.life<=0){scene.remove(h);HEARTS.splice(i,1);}
  }
}

// ══════════════════════════════════════════════════════════════
// CÁMARA ORBITAL
// ══════════════════════════════════════════════════════════════
function updateCamera(){
  camera.position.x=Cam.radius*Math.sin(Cam.theta)*Math.cos(Cam.phi);
  camera.position.z=Cam.radius*Math.cos(Cam.theta)*Math.cos(Cam.phi);
  camera.position.y=Cam.radius*Math.sin(Cam.phi)+Cam.yOffset;
  camera.lookAt(0,Cam.yOffset,0);
}

// ══════════════════════════════════════════════════════════════
// LOOP PRINCIPAL
// ══════════════════════════════════════════════════════════════
let _elapsed=0;
function animate(){
  requestAnimationFrame(animate);
  const dt=Math.min(clock.getDelta(),.05); _elapsed+=dt; const t=_elapsed;

  Cam.radius  +=(Cam.targetRadius-Cam.radius)*.08;
  Cam.theta   +=(Cam.targetTheta-Cam.theta)*.08;
  Cam.phi     +=(Cam.targetPhi-Cam.phi)*.08;
  Cam.yOffset +=(Cam.targetYOffset-Cam.yOffset)*.08;
  updateCamera();

  let isPetting=false;
  if(piki.g.visible&&piki.body&&S.evoPhase==='idle'){
    raycaster.setFromCamera(mouse,camera); isHover=raycaster.intersectObject(piki.body,false).length>0;
    if(isHover&&isDown&&!Cam.isDragging){isPetting=true;document.body.classList.add('petting');piki.pet(dt);}
  }
  // Cariño desde ventana PiP — window._pipPetting es escrito por el pip window
  if(window._pipPetting && _pipActive && S.evoPhase==='idle'){
    isPetting=true;
    if(S.form==='piki') piki.pet(dt);
    // En modo dragón: cariño aumenta felicidad (y el dragón reacciona)
    if(S.form==='dragon'){
      S.happiness = Math.min(100, S.happiness + 20*dt);
      S.love      = Math.min(100, S.love + 8*dt);
    }
  }
  // Cariño al dragón desde canvas principal (click en canvas ya llama flapWings, esto da felicidad continua)
  if(isDown && S.form==='dragon' && S.evoPhase==='dragon'){
    S.happiness = Math.min(100, S.happiness + 15*dt);
  }
  if(!isPetting) document.body.classList.remove('petting');

  piki.update(t,dt,isPetting); drg.update(t,dt);
  evoPart.update(dt); updateEvolution(dt); updateHearts(dt);

  // Actualizar stats visuales en ventana PiP (throttled ~500ms)
  if(_pipWin && !_pipWin.closed && _pipWin._statsBar && Math.floor(t*2)!==_pipStatsTick){
    _pipStatsTick=Math.floor(t*2);
    try{
      const sb=_pipWin._statsBar;
      const h=sb.querySelector('#pb-h'), e=sb.querySelector('#pb-e'),
            b=sb.querySelector('#pb-bond'), l=sb.querySelector('#pb-love');
      if(h)h.style.width=S.happiness+'%'; if(e)e.style.width=S.energy+'%';
      if(b)b.style.width=S.bond+'%';     if(l)l.style.width=S.love+'%';
    }catch(_){}
  }

  composer.render();
}

// ══════════════════════════════════════════════════════════════
// EVOLUCIÓN — morphing simultáneo Pikitipu ↔ Dragona
// ══════════════════════════════════════════════════════════════
function triggerEvolution(){
  if(S.evoPhase!=='idle'||S.form!=='piki') return;
  document.getElementById('top-ctrls').classList.add('fade-out');
  document.getElementById('settings-btn').style.opacity='0';
  document.getElementById('settings-panel').classList.remove('open');
  S.evoPhase='preflash'; S.evoTimer=0;
  playEvoSound();
}
function returnToPikitipu(){
  if(S.evoPhase!=='dragon') return;
  S.evoPhase='return'; S.evoTimer=0;
  document.getElementById('btn-ret').classList.remove('on');
}
function updateEvolution(dt){
  if(S.evoPhase==='idle') return;
  S.evoTimer+=dt;
  if(S.evoPhase==='preflash'){
    piki.squish=.25*Math.abs(Math.sin(S.evoTimer*18));
    sharedU.flashInt.value=Math.abs(Math.sin(S.evoTimer*10))*.6+.2;
    sharedU.flashCol.value.setHSL((S.evoTimer*.3)%1,.9,.7);
    bloom.strength=S.bloomBase+S.evoTimer*1.5;
    if(S.evoTimer>1.8){S.evoPhase='flash';S.evoTimer=0;}
  }
  else if(S.evoPhase==='flash'){
    document.getElementById('flash').classList.add('on');
    if(S.evoTimer>.15){
      evoPart.trigger(); document.getElementById('flash').classList.remove('on');
      Cam.targetRadius=18; Cam.targetYOffset=1.0;
      S.evoPhase='materialize'; S.evoTimer=0;
    }
  }
  else if(S.evoPhase==='materialize'){
    bloom.strength=S.bloomBase+2.0;
    if(!drg.g.visible){drg.setVisible(true);drg.g.scale.setScalar(.01);}
    if(S.evoTimer<2.0){
      const prog=S.evoTimer/2.0;
      drg.g.scale.setScalar(1-Math.pow(1-prog,3));
      piki.g.scale.setScalar(Math.pow(1-prog,3));
    }
    if(S.evoTimer>2.4){
      drg.g.scale.setScalar(1.0); piki.setVisible(false);
      const dUi=document.getElementById('dragon-ui');
      dUi.classList.remove('fade-out'); dUi.classList.add('on');
      document.getElementById('hud').classList.add('dragon');
      document.getElementById('hud-name').textContent='🐲 Hakuryū 白龍 🐲';
      bloom.strength=S.bloomBase+.5;
      // Inicializar energía dragón + reset de guardia de retorno
      S.dragonEnergy = 100; S.dragonPvBonus = 0; _dragonReturnPending = false;
      updateDragonEnergyBar();
      setTimeout(()=>{ dUi.classList.add('fade-out'); document.getElementById('btn-ret').classList.add('on'); },5000);
      S.form='dragon'; S.evoPhase='dragon'; S.evoTimer=0;
    }
  }
  else if(S.evoPhase==='dragon'){
    bloom.strength=(S.bloomBase+.3)+Math.sin(S.evoTimer*.4)*.1;
  }
  else if(S.evoPhase==='return'){
    const fl=document.getElementById('flash');
    if(!piki.g.visible){piki.setVisible(true);piki.g.scale.setScalar(.01);}
    if(S.evoTimer<.8){
      const prog=S.evoTimer/.8;
      drg.g.scale.setScalar(1-Math.pow(prog,3));
      piki.g.scale.setScalar(Math.pow(prog,3));
    }
    if(S.evoTimer>.4) fl.style.opacity=Math.min(1,(S.evoTimer-.4)*4).toString();
    if(S.evoTimer>.8){
      drg.setVisible(false); piki.g.scale.setScalar(1.0);
      sharedU.flashInt.value=0; fl.style.opacity='0';
      document.getElementById('hud').classList.remove('dragon');
      document.getElementById('hud-name').textContent='🌿 Pikitipu 2.0 🌿';
      Cam.targetRadius=11; Cam.targetYOffset=.5;
      document.getElementById('top-ctrls').classList.remove('fade-out');
      document.getElementById('settings-btn').style.opacity='1';
      S.form='piki'; S.evoPhase='idle'; S.evoTimer=0;
      bloom.strength=S.bloomBase;
      sendDragonBonusToKP(); // ← enviar bonus acumulado de vuelta a KP
      showMood('💚 Pikitipu regresó');
    }
  }
}

// ══════════════════════════════════════════════════════════════
// AUDIO SINTÉTICO
// ══════════════════════════════════════════════════════════════
let audioCtx=null;
function playEvoSound(){
  audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  const notes=[261,329,392,523,659,784,1046];
  notes.forEach((freq,i)=>{
    const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
    osc.connect(gain);gain.connect(audioCtx.destination);osc.type='sine';
    osc.frequency.setValueAtTime(freq,audioCtx.currentTime+i*.14);
    gain.gain.setValueAtTime(0,audioCtx.currentTime+i*.14);
    gain.gain.linearRampToValueAtTime(.12,audioCtx.currentTime+i*.14+.05);
    gain.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+i*.14+.6);
    osc.start(audioCtx.currentTime+i*.14); osc.stop(audioCtx.currentTime+i*.14+.7);
  });
}

// ══════════════════════════════════════════════════════════════
// EVENTOS DE MOUSE/TECLADO
// ══════════════════════════════════════════════════════════════
window.addEventListener('mousedown',e=>{
  if(e.target.tagName!=='CANVAS') return;
  isDown=true; Cam.dragStartX=e.clientX; Cam.dragStartY=e.clientY;
  Cam.prevMouseX=e.clientX; Cam.prevMouseY=e.clientY; Cam.isDragging=false;
});
window.addEventListener('mousemove',e=>{
  mouse.x=(e.clientX/innerWidth)*2-1; mouse.y=-(e.clientY/innerHeight)*2+1;
  if(isDown){
    if(Math.abs(e.clientX-Cam.dragStartX)>5||Math.abs(e.clientY-Cam.dragStartY)>5) Cam.isDragging=true;
    if(Cam.isDragging){ Cam.targetTheta-=(e.clientX-Cam.prevMouseX)*.007; Cam.targetPhi+=(e.clientY-Cam.prevMouseY)*.007; Cam.targetPhi=Math.max(-.4,Math.min(.8,Cam.targetPhi)); }
    Cam.prevMouseX=e.clientX; Cam.prevMouseY=e.clientY;
  }
  // HUD auto-wake
  const h=document.getElementById('hud'); h.classList.add('active');
  clearTimeout(h._t); h._t=setTimeout(()=>h.classList.remove('active'),3000);
});
window.addEventListener('mouseup',()=>{isDown=false;Cam.isDragging=false;});
window.addEventListener('wheel',e=>{
  Cam.targetRadius+=e.deltaY*.006;
  Cam.targetRadius=Math.max(S.form==='dragon'?10:5,Math.min(S.form==='dragon'?28:20,Cam.targetRadius));
},{passive:true});
window.addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight); composer.setSize(innerWidth,innerHeight); bloom.setSize(innerWidth,innerHeight);
});

// ══════════════════════════════════════════════════════════════
// SETTINGS PANEL
// ══════════════════════════════════════════════════════════════
window.toggleSettings=()=>document.getElementById('settings-panel').classList.toggle('open');
window.updateSettings=()=>{
  const bVal=parseFloat(document.getElementById('sl-bloom').value);
  const eVal=parseFloat(document.getElementById('sl-exp').value);
  S.bloomBase=bVal; bloom.strength=bVal; renderer.toneMappingExposure=eVal;
  document.getElementById('lbl-bloom').textContent=bVal.toFixed(2);
  document.getElementById('lbl-exp').textContent=eVal.toFixed(2);
  sharedU.uSpeed.value=parseFloat(document.getElementById('sl-speed').value);
  document.getElementById('lbl-speed').textContent=sharedU.uSpeed.value.toFixed(2);
  sharedU.uOpacityBase.value=parseFloat(document.getElementById('sl-opacity').value);
  document.getElementById('lbl-opacity').textContent=sharedU.uOpacityBase.value.toFixed(2);
  sharedU.uFresnelIntensity.value=parseFloat(document.getElementById('sl-fresnel').value);
  document.getElementById('lbl-fresnel').textContent=sharedU.uFresnelIntensity.value.toFixed(2);
  sharedU.uColorSaturation.value=parseFloat(document.getElementById('sl-sat').value);
  document.getElementById('lbl-sat').textContent=sharedU.uColorSaturation.value.toFixed(2);
};

// ══════════════════════════════════════════════════════════════
// CEGG PARSER
// ══════════════════════════════════════════════════════════════
function parseCegg(raw){
  try{
    const data=JSON.parse(raw.substring(raw.indexOf('{'),raw.lastIndexOf('}')+1));
    const eg=data.perfil_global?.estadisticas_globales||{};
    const users=data.perfiles_usuarios||{};
    S.pv=eg.total_pv_acumulado||0; S.aspects=Object.keys(users).length||1;
    let totalMu=0,totalTasks=0;
    Object.values(users).forEach(u=>{const dq=u.datos_cuantitativos||{},xp=dq.nivel_y_xp||{},st=dq.estadisticas_tareas||{};totalMu+=xp.mu_disponibles||0;totalTasks+=st.completadas||0;});
    S.mu=totalMu; S.tasks=totalTasks; S.level=Math.max(1,Math.floor(Math.log(S.pv/100+1)*4+1));
    const ratio=totalTasks/(totalTasks+(Object.values(users).reduce((a,u)=>a+(u.datos_cuantitativos?.estadisticas_tareas?.pendientes||0),0))+1);
    S.happiness=40+ratio*55; S.energy=60+Math.min(30,S.aspects*2); S.bond=Math.min(80,S.aspects*6);
    piki._syncHUDStats();
    const pill=document.getElementById('cegg-pill');
    pill.innerHTML=`🥚 ${S.aspects} aspectos<br>⚡ ${fmt(S.pv)} PV<br>✅ ${totalTasks} tareas`;
    pill.classList.add('on');
    toast('🥚 Huevo Cargado',`${S.aspects} aspectos · ${fmt(S.pv)} PV listos.`,'#63f5a1');
    hideDrop();
  }catch(e){toast('⚠️ Error CEGG','Estructura inválida.','#ff8da1');}
}
document.getElementById('file-input').addEventListener('change',e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>parseCegg(ev.target.result);r.readAsText(f);}});
window.addEventListener('dragover',e=>e.preventDefault());
window.addEventListener('drop',e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f){const r=new FileReader();r.onload=ev=>parseCegg(ev.target.result);r.readAsText(f);}});
function hideDrop(){ document.getElementById('dropmask').classList.add('hidden'); }
window.skipCegg=()=>{ hideDrop(); showMood('💚 Hola, Pikitipu'); };

// Click en el huevo → hatch + conectar WS en background
function hatchAndStart(){
  _hatchEgg(()=>{
    connectWS(); // intenta en background, sin bloquear
  });
}

// Eclosión del huevo al conectar
function _hatchEgg(onComplete){
  const egg = document.getElementById('hatch-egg');
  const btn = document.getElementById('btn-connect');
  if(btn){ btn.disabled=true; }

  // 1. Temblor
  egg.classList.add('hatching');

  // 2. Flash blanco + ocultar dropmask
  setTimeout(()=>{
    const fl = document.getElementById('flash');
    fl.classList.add('on');
    setTimeout(()=>{
      fl.classList.remove('on');
      hideDrop();
      showMood('💚 ¡Pikitipu despertó!');
      if(onComplete) onComplete();
    }, 220);
  }, 700);
}

// Botón principal del dropmask: conectar a KP con animación
function startKPConnection(){
  const btn = document.getElementById('btn-connect');
  if(!btn) return;
  btn.textContent = '⏳ Conectando...';
  btn.classList.add('connecting');
  btn.disabled = true;

  // Iniciar WS — al conectar eclosiona el huevo
  const _onFirstConnect = ()=>{
    _hatchEgg(()=>{
      toast('🔌 KP conectado','El ecosistema está vivo.','#63f5a1');
    });
  };

  // Hook de un solo uso en el evento de conexión
  const _origSetStatus = _setWSStatus;
  let _hooked = false;
  window._onWSFirstConnect = ()=>{
    if(_hooked) return; _hooked=true;
    _onFirstConnect();
  };

  // Intentar conexión
  connectWS();

  // Si no conecta en 6s → eclosionar de todas formas (offline mode)
  setTimeout(()=>{
    if(!_wsReady && document.getElementById('dropmask') && !document.getElementById('dropmask').classList.contains('hidden')){
      btn.textContent='🔌 Conectar a KP';
      btn.classList.remove('connecting');
      btn.disabled=false;
      toast('⚠️ Sin conexión','KP no encontrado. Puedes continuar igual.','#ff8da1');
    }
  }, 6000);
}

// ══════════════════════════════════════════════════════════════
// WEBSOCKET KP
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// DRAGON ENERGY — helpers de UI y retorno narrativo
// ══════════════════════════════════════════════════════════════
function updateDragonEnergyBar(){
  const v = S.dragonEnergy;
  const fill = document.getElementById('bf-drg');
  const lbl  = document.getElementById('bv-drg');
  if(fill){ fill.style.width = v + '%'; fill.classList.toggle('critical', v < 25); }
  if(lbl)  lbl.textContent = Math.round(v) + '%';
}

// Retorno narrativo al agotarse la energía del dragón
// "Hakuryū no muere — planta su semilla de poder en Pikitipu"
let _dragonReturnPending = false;
function _triggerDragonReturn(reason){
  if(_dragonReturnPending || S.evoPhase !== 'dragon') return;
  _dragonReturnPending = true;

  const msg = reason === 'depletion'
    ? '✨ Hakuryū planta su llama en ti...'
    : '🌿 La dragona regresa a su semilla';
  showMood(msg);

  // Toast narrativo — sin culpa
  setTimeout(()=>{
    toast(
      '🌱 Semilla de Luz',
      'Hakuryū plantó su poder en Pikitipu. La llama sigue viva en ti. +20 Amor acumulado.',
      '#ffd700'
    );
    // Buff post-evolución: amor acumulado
    S.love = Math.min(100, S.love + 20);
    S.happiness = Math.min(100, S.happiness + 15);
  }, 1200);

  // Esperar un momento antes del retorno para que el mensaje sea leído
  setTimeout(()=>{
    if(S.evoPhase === 'dragon'){
      returnToPikitipu();
      _dragonReturnPending = false;
      // Reiniciar energía del dragón para la próxima evolución
      setTimeout(()=>{ S.dragonEnergy = 100; S.dragonPvBonus = 0; }, 3000);
    }
  }, 2500);
}

// Llamar desde el loop cuando la energía cae a 0
// (protegida contra llamadas múltiples con _dragonReturnPending)

// ══════════════════════════════════════════════════════════════
// PICTURE-IN-PICTURE — ventana flotante con zoom e interacción
// Estrategia: al activar PiP, la cámara hace zoom close-up.
// El stream del canvas captura esa vista ampliada (sin HTML overlays).
// En Document PiP: overlay táctil que llama de vuelta al main window.
// ══════════════════════════════════════════════════════════════
let _pipStream    = null;
let _pipActive    = false;
let _pipPetting   = false;
let _pipWin       = null;
let _savedRadius  = 11;
let _savedYOffset = 0.5;
let _savedTheta   = 0;
let _savedPhi     = 0;
let _pipStatsTick = -1;  // para throttle de stats en PiP

// Zoom params para PiP — Pikitipu llena casi todo el frame
const PIP_RADIUS  = 7.5;   // zoom suave — Pikitipu más grande sin pixelar
const PIP_YOFFSET = 0.4;

function _pipZoomIn(){
  _savedRadius  = Cam.targetRadius;
  _savedYOffset = Cam.targetYOffset;
  _savedTheta   = Cam.targetTheta;
  _savedPhi     = Cam.targetPhi;
  Cam.targetRadius  = PIP_RADIUS;
  Cam.targetYOffset = PIP_YOFFSET;
  Cam.targetTheta   = 0;
  Cam.targetPhi     = 0;
}
function _pipZoomOut(){
  Cam.targetRadius  = _savedRadius;
  Cam.targetYOffset = _savedYOffset;
  Cam.targetTheta   = _savedTheta;
  Cam.targetPhi     = _savedPhi;
}

function _pipClose(btn){
  _pipActive  = false;
  _pipPetting = false;
  _pipWin     = null;
  _pipZoomOut();
  if(btn){ btn.textContent='📺 Flotar Pikitipu'; btn.classList.remove('active'); }
  showMood('🌿 Pikitipu de vuelta');
}

// Overlay interactivo para el Document PiP window
function _buildPipOverlay(pipWin, btn){
  const doc  = pipWin.document;
  const body = doc.body;

  // ── Barra de stats visual (4 líneas de color sin texto) ──
  const statsBar = doc.createElement('div');
  statsBar.id='pip-stats';
  statsBar.style.cssText=`position:fixed;top:0;left:0;right:0;padding:7px 7px 0;
    display:flex;gap:3px;opacity:0;transition:opacity .35s;z-index:30;pointer-events:none;`;
  statsBar.innerHTML=`
    <div style="flex:1;height:3px;background:rgba(255,255,255,.08);border-radius:3px">
      <div id="pb-h"    style="height:100%;width:${S.happiness}%;background:linear-gradient(90deg,#ff8da1,#ffaac5);border-radius:3px;transition:width .6s"></div></div>
    <div style="flex:1;height:3px;background:rgba(255,255,255,.08);border-radius:3px">
      <div id="pb-e"    style="height:100%;width:${S.energy}%;background:linear-gradient(90deg,#63f5a1,#5ce6ff);border-radius:3px;transition:width .6s"></div></div>
    <div style="flex:1;height:3px;background:rgba(255,255,255,.08);border-radius:3px">
      <div id="pb-bond" style="height:100%;width:${S.bond}%;background:linear-gradient(90deg,#d39eff,#e0b0ff);border-radius:3px;transition:width .6s"></div></div>
    <div style="flex:1;height:3px;background:rgba(255,255,255,.08);border-radius:3px">
      <div id="pb-love" style="height:100%;width:${S.love}%;background:linear-gradient(90deg,#ffd700,#ffec6e);border-radius:3px;transition:width .6s"></div></div>`;
  body.appendChild(statsBar);

  evoBtn.addEventListener('click', ()=>{ if(window.opener) window.opener.triggerEvolution(); });

  // ── Overlay táctil: drag = rotar cámara · click sin drag = acariciar ──
  const ov = doc.createElement('div');
  ov.style.cssText=`position:fixed;inset:0;z-index:10;cursor:grab;background:transparent;touch-action:none;`;
  body.appendChild(ov);

  let dragX=0, dragY=0, didDrag=false;
  let _hideStats;

  const showStats=()=>{
    statsBar.style.opacity='1';
    clearTimeout(_hideStats);
    _hideStats=setTimeout(()=>statsBar.style.opacity='0',2000);
  };

  ov.addEventListener('mousemove', e=>{
    showStats();
    if(!window._pipDragging) return;
    const dx=e.clientX-dragX, dy=e.clientY-dragY;
    dragX=e.clientX; dragY=e.clientY;
    if(Math.abs(dx)>2||Math.abs(dy)>2) didDrag=true;
    // Rotar cámara en la ventana principal
    if(window.opener && window.opener.Cam){
      window.opener.Cam.targetTheta -= dx*0.012;
      window.opener.Cam.targetPhi   += dy*0.012;
      window.opener.Cam.targetPhi=Math.max(-0.4,Math.min(0.8,window.opener.Cam.targetPhi));
    }
  });
  ov.addEventListener('mousedown', e=>{
    dragX=e.clientX; dragY=e.clientY; didDrag=false;
    window._pipDragging=true; ov.style.cursor='grabbing';
  });
  ov.addEventListener('mouseup', ()=>{
    window._pipDragging=false; ov.style.cursor='grab';
    if(!didDrag){
      // Click sin drag → acariciar
      window._pipPetting=true;
      ov.style.background='rgba(99,245,161,.04)';
      // Dragon: aleteo al hacer click
      if(window.opener && window.opener.S && window.opener.S.form==='dragon' && window.opener.drg){
        window.opener.drg.flapWings();
      }
      setTimeout(()=>{ window._pipPetting=false; ov.style.background='transparent'; },300);
    }
  });
  ov.addEventListener('mouseleave', ()=>{
    window._pipDragging=false; window._pipPetting=false;
    statsBar.style.opacity='0'; ov.style.cursor='grab'; ov.style.background='transparent';
  });
  // Touch
  ov.addEventListener('touchstart',e=>{e.preventDefault();
    dragX=e.touches[0].clientX; dragY=e.touches[0].clientY; didDrag=false;
    window._pipDragging=true; window._pipPetting=true;
    ov.style.background='rgba(99,245,161,.04)';
  },{passive:false});
  ov.addEventListener('touchmove',e=>{e.preventDefault();
    const dx=e.touches[0].clientX-dragX, dy=e.touches[0].clientY-dragY;
    dragX=e.touches[0].clientX; dragY=e.touches[0].clientY;
    if(Math.abs(dx)>4||Math.abs(dy)>4){
      didDrag=true; window._pipPetting=false;
      if(window.opener&&window.opener.Cam){
        window.opener.Cam.targetTheta-=dx*0.012;
        window.opener.Cam.targetPhi=Math.max(-0.4,Math.min(0.8,window.opener.Cam.targetPhi+dy*0.012));
      }
    }
  },{passive:false});
  ov.addEventListener('touchend',()=>{
    window._pipDragging=false; window._pipPetting=false;
    ov.style.background='transparent';
    if(!didDrag && window.opener && window.opener.S && window.opener.S.form==='dragon' && window.opener.drg)
      window.opener.drg.flapWings();
  });

  pipWin._mainBtn  = btn;
  pipWin._statsBar = statsBar;
  pipWin.addEventListener('pagehide', ()=>{ window._pipPetting=false; window._pipDragging=false; _pipClose(btn); });
}

async function togglePiP(){
  const btn = document.getElementById('pip-btn');
  const vid = document.getElementById('pip-video');

  // ── CERRAR ───────────────────────────────────────────────
  if(_pipActive){
    if(_pipWin && !_pipWin.closed) _pipWin.close();
    if(document.pictureInPictureElement) await document.exitPictureInPicture().catch(()=>{});
    _pipClose(btn);
    return;
  }

  // ── ABRIR ─────────────────────────────────────────────────
  try{
    // Stream del canvas sin modificar la cámara → sin pixelación
    if(!_pipStream){
      _pipStream    = canvas.captureStream(30);
      vid.srcObject = _pipStream;
    }
    await vid.play().catch(()=>{});

    _pipActive = true;
    btn.textContent = '✖ Cerrar flotante';
    btn.classList.add('active');

    // ── Intento 1: Document PiP API (Chrome 116+) — interactivo ──
    if('documentPictureInPicture' in window){
      _pipWin = await window.documentPictureInPicture.requestWindow({
        width: 260, height: 280,   // pequeño y centrado
        disallowReturnToOpener: false,
      });
      const d = _pipWin.document;
      d.head.innerHTML=`<style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{background:#03030d;overflow:hidden;width:100%;height:100%}
        video{position:fixed;inset:0;width:100%;height:100%;object-fit:cover}
        body::after{content:'';position:fixed;inset:0;
          border:1px solid rgba(99,245,161,.1);border-radius:6px;
          pointer-events:none;z-index:20}
      </style>`;
      const pipVid = d.createElement('video');
      pipVid.srcObject = _pipStream;
      pipVid.muted=true; pipVid.autoplay=true; pipVid.playsinline=true;
      pipVid.style.cssText='position:fixed;inset:0;width:100%;height:100%;object-fit:cover';
      d.body.appendChild(pipVid);
      pipVid.play().catch(()=>{});
      _buildPipOverlay(_pipWin, btn);
      showMood('📺 Pikitipu flotando — ¡dale cariño!');
      return;
    }

    // ── Fallback: Video PiP clásico ──
    await vid.requestPictureInPicture();
    showMood('📺 Pikitipu flotando');
    vid.addEventListener('leavepictureinpicture', ()=>_pipClose(btn), {once:true});

  } catch(err){
    console.warn('[PiP]', err);
    _pipActive=false; btn.textContent='📺 Flotar Pikitipu'; btn.classList.remove('active');
    _pipPopupFallback(btn);
  }
}

function _pipPopupFallback(btn){
  const pw = window.open('','_pikitipu_pip',
    'width=290,height=310,resizable=yes,toolbar=no,menubar=no,location=no,status=no');
  if(!pw){
    toast('⚠️ PiP','Permite ventanas emergentes.','#ff8da1');
    _pipActive=false; btn.textContent='📺 Flotar Pikitipu'; btn.classList.remove('active');
    return;
  }
  pw.document.write(`<!DOCTYPE html><html><head>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#03030d;overflow:hidden;touch-action:none;cursor:grab}
    body:active{cursor:grabbing}
    canvas{display:block;width:100vw;height:100vh}
    /* Stats bar — sin texto, solo colores */
    #sb{position:fixed;top:0;left:0;right:0;padding:7px 7px 0;
      display:flex;gap:3px;opacity:0;transition:opacity .35s;pointer-events:none}
    body:hover #sb{opacity:1}
    .sl{flex:1;height:3px;background:rgba(255,255,255,.08);border-radius:3px}
    .sf{height:100%;border-radius:3px;transition:width .6s}
    /* Glow petting */
    body.petting{background:rgba(99,245,161,.03)}
  </style></head>
  <body>
  <canvas id="pc"></canvas>
  <div id="sb">
    <div class="sl"><div id="ph" class="sf" style="width:0%;background:linear-gradient(90deg,#ff8da1,#ffaac5)"></div></div>
    <div class="sl"><div id="pe" class="sf" style="width:0%;background:linear-gradient(90deg,#63f5a1,#5ce6ff)"></div></div>
    <div class="sl"><div id="pb" class="sf" style="width:0%;background:linear-gradient(90deg,#d39eff,#e0b0ff)"></div></div>
    <div class="sl"><div id="pl" class="sf" style="width:0%;background:linear-gradient(90deg,#ffd700,#ffec6e)"></div></div>
  </div>
  <script>
    const src=window.opener.document.getElementById('c');
    const dst=document.getElementById('pc');
    dst.width=290; dst.height=310;
    const ctx=dst.getContext('2d');
    // Mirror canvas + actualizar stats
    (function draw(){
      if(!window.opener||window.opener.closed){window.close();return;}
      ctx.drawImage(src,0,0,290,310);
      // Stats desde main window
      const S=window.opener.S||{};
      const set=(id,v)=>{const el=document.getElementById(id);if(el)el.style.width=(v||0)+'%';};
      set('ph',S.happiness); set('pe',S.energy); set('pb',S.bond); set('pl',S.love);
      requestAnimationFrame(draw);
    })();
    ['mousedown','touchstart'].forEach(ev=>
      document.addEventListener(ev,e=>{e.preventDefault();
        window.opener._pipPetting=true;document.body.classList.add('petting');
      },{passive:false})
    );
    ['mouseup','touchend','mouseleave'].forEach(ev=>
      document.addEventListener(ev,()=>{
        window.opener._pipPetting=false;document.body.classList.remove('petting');
      })
    );
    window.addEventListener('beforeunload',()=>{window.opener._pipPetting=false;});
  <\/script></body></html>`);
  pw.document.close();
  showMood('📺 Pikitipu flotando');
}

window.togglePiP   = togglePiP;
window._pipPetting = false; // leído por el animate loop desde el pip window



// ══════════════════════════════════════════════════════════════
// CANAL INVERSO — Bonus dragón de vuelta al ecosistema KP
// KP necesita: POST /api/dragon_bonus {pv_bonus, user, timestamp}
// ══════════════════════════════════════════════════════════════
function sendDragonBonusToKP(){
  if(S.dragonPvBonus <= 0) return;
  const payload = {
    type:'DRAGON_BONUS', pv_bonus:S.dragonPvBonus,
    user:S.lastUser||'unknown', timestamp:Date.now()
  };
  // Canal 1: WS local directo
  if(ws && ws.readyState===1 && _wsSource==='local'){
    try{ ws.send(JSON.stringify(payload)); }catch(e){}
  }
  // Canal 2: HTTP Flask KP localhost:5000
  fetch('http://localhost:5000/api/dragon_bonus',{
    method:'POST', headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload)
  }).then(r=>{
    if(r.ok) toast('🐲→⚡','Dragon bonus enviado: +'+S.dragonPvBonus+' PV','#ffd700');
  }).catch(()=>{
    // Sin Flask → guardar pendiente en localStorage para sync futuro
    const p=JSON.parse(localStorage.getItem('piki_pending_bonus')||'[]');
    p.push(payload); localStorage.setItem('piki_pending_bonus',JSON.stringify(p));
  });
  const sent = S.dragonPvBonus;
  S.dragonPvBonus=0;
  console.log('[Pikitipu→KP] DragonBonus enviado:',sent,'PV');
}

// ══════════════════════════════════════════════════════════════
function _checkEvolutionReady(){
  const ready = S.energy>80 && S.happiness>80 && S.bond>80 && S.love>80;
  const btn = document.getElementById('btn-evo');
  if(!btn) return;
  btn.disabled = !(ready && S.form==='piki');
  btn.classList.toggle('pulsing', ready && S.form==='piki');
  if(ready && S.form==='piki') showMood('🐲 ¡Pikitipu listo para evolucionar!');
}

// ══════════════════════════════════════════════════════════════
// WEBSOCKET — Relay cloud primario + local fallback automático
// ══════════════════════════════════════════════════════════════
const WS_RELAY = 'wss://musicosmosonline.com';
const WS_LOCAL = 'ws://localhost:8765';
let ws=null, _wsSource=null, _wsRetryMs=5000, _wsReady=false;

function _setWSStatus(online, source){
  _wsReady=online; _wsSource=source;
  const dot=document.getElementById('ws-dot');
  const lbl=document.getElementById('ws-lbl');
  if(!dot||!lbl) return;
  if(online){
    dot.classList.add('on');
    // Verde suave=relay, verde brillante=local
    dot.style.boxShadow = source==='relay'
      ? '0 0 6px #63f5a1' : '0 0 12px #63f5a1, 0 0 24px #63f5a1';
    lbl.textContent = source==='relay' ? '🌐 Relay conectado' : '⚡ KP local conectado';
    _wsRetryMs=5000;
    if(piki) piki.onKPStatus(true);
    // Eclosión si el dropmask sigue visible (primera conexión desde botón)
    const dm = document.getElementById('dropmask');
    if(dm && !dm.classList.contains('hidden') && window._onWSFirstConnect){
      window._onWSFirstConnect();
    }
  } else {
    dot.classList.remove('on');
    dot.style.boxShadow='';
    lbl.textContent='KP Desconectado';
    if(piki) piki.onKPStatus(false);
  }
}

function _dispatchKP(msg){
  // Deduplicación: ignorar si el mismo event_id ya fue procesado
  if(msg.event_id){
    if(_seen.has(msg.event_id)) return;
    _seen.add(msg.event_id);
    if(_seen.size>200) _seen.clear();
  }
  const t=msg.type||'';
  if(t==='TASK_COMPLETE')                            piki.onTaskComplete(msg);
  if(t==='LEVEL_UP')                                 piki.onLevelUp(msg.level||S.level+1);
  if(t==='WILD_ENCOUNTER')                           piki.onWildEncounter();
  if(t==='ninja_start'||t==='NINJA_START')           piki.onNinjaStart();
  if(t==='ninja_end'||t==='NINJA_END')               piki.onNinjaEnd();
  if(t==='timer_tick'||t==='TIMER_TICK')             piki.onTimerTick();
  if(t==='timer_stop'||t==='TIMER_STOP')             piki.onTimerStop();
  if(t==='PV_GAIN')                                  { S.energy=Math.min(100,S.energy+5); piki.flashMixed(S.lastUserColor,S.lastPriority,.35,.4); _checkEvolutionReady(); }
  if(t==='KP_STATUS')                                piki.onKPStatus(!!msg.active);
  if(t==='KP_HELLO'||t==='PIKI_HELLO')               _setWSStatus(true, _wsSource);
}
const _seen = new Set();

function _openWS(url, source, onFail){
  try{
    const sock=new WebSocket(url);
    const timeout=setTimeout(()=>{ sock.close(); onFail && onFail(); }, 4500);
    sock.onopen=()=>{
      clearTimeout(timeout);
      ws=sock; _wsSource=source;
      _setWSStatus(true, source);
    };
    sock.onmessage=e=>{
      try{ _dispatchKP(JSON.parse(e.data)); }catch(_){}
    };
    sock.onclose=()=>{
      clearTimeout(timeout);
      if(ws===sock){ ws=null; _setWSStatus(false,null); _scheduleReconnect(); }
    };
    sock.onerror=()=>{ clearTimeout(timeout); sock.close(); };
  }catch(e){ onFail && onFail(); }
}

function _scheduleReconnect(){
  setTimeout(connectWS, _wsRetryMs);
  _wsRetryMs=Math.min(_wsRetryMs*1.5, 30000);
}

function connectWS(){
  if(ws && ws.readyState<=1) return; // ya conectado/conectando
  _openWS(WS_RELAY,'relay', ()=>{
    // relay falló → intentar local
    _openWS(WS_LOCAL,'local', ()=>{
      // ambos fallaron → reintentar
      _scheduleReconnect();
    });
  });
}

// ══════════════════════════════════════════════════════════════
// HUD TOGGLE
// ══════════════════════════════════════════════════════════════
let hudMin=false;
window.toggleHud=()=>{
  hudMin=!hudMin;
  document.getElementById('hud').classList.toggle('minimized',hudMin);
  document.getElementById('hud-toggle').textContent=hudMin?'▶':'▼';
};

// ══════════════════════════════════════════════════════════════
// EXPONER Y ARRANCAR
// ══════════════════════════════════════════════════════════════
window.triggerEvolution=triggerEvolution;
window.returnToPikitipu=returnToPikitipu;
window.startKPConnection=startKPConnection;
window.hatchAndStart=hatchAndStart;
window.S=S;
window.Cam=Cam;    // popup PiP accede a Cam para drag
window.drg=null;   // se asigna tras inicializar

// Click en canvas: si dragón visible → aleteo
canvas.addEventListener('click', ()=>{
  if(S.form==='dragon' && drg) drg.flapWings();
});

const piki    = new Pikitipu();
const drg     = new DragonaHakuryu();
const evoPart = new EvoParticles();
window.drg = drg; // expuesto para PiP click

connectWS();
animate();
</script>
</body>
</html>
