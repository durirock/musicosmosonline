/* ══════════════════════════════════════════════════════════════════════════
   portal.js · Chamalnquimyst Labs — entrelazamiento de mundos  (v2)
   ──────────────────────────────────────────────────────────────────────────
   Cada mundo lo carga en su <head>, ANTES de sus propios scripts:

       <script src="portal.js" data-mundo="musicosmos"></script>

   Atributos opcionales del <script>:
       data-listo="manual"    el mundo llama Portal.listo() cuando su escena está lista
       data-astrolabio="no"   sin botón de astrolabio (el Sol ya es el mapa)
       data-audio="no"        no tocar el audio (sin fundido de salida)
       data-grieta="mundointerior"   habilita la grieta hacia ese mundo

   Transición: la escena misma se difumina (desenfoque, brillo, zoom hacia
   adentro) mientras un vórtice con los colores del destino la envuelve; al
   llegar, el mundo nuevo nace desenfocado y se aclara lentamente.

   Portales 3D (el mundo registra su escena con Portal.escenario y siembra):
       estilo 'anillo'   aro con remolino del color del destino
       estilo 'kalpa'    aro que insinúa el túnel de colores de Kalpa
       estilo 'fractura' grieta viva de violetas e índigos
       estilo 'agujero'  agujero negro con lente gravitacional y absorción
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';
    if (window.Portal) return;

    const script = document.currentScript;
    const ds = (script && script.dataset) || {};

    // Archivos en public/. Si renombras un mundo, cámbialo solo aquí.
    // c2 = segundo color del vórtice de transición.
    const MUNDOS = {
        sol:           { archivo: 'chamalnquimyst.html',         nombre: 'Sol de Voluntad', color: '#FFCC55', c2: '#FF7A2A' },
        musicosmos:    { archivo: 'index.html',                  nombre: 'Musicosmos',      color: '#A87FFF', c2: '#3FD0FF' },
        kalpa:         { archivo: 'kalpa.html',                  nombre: 'Kalpa',           color: '#FF6A5A', c2: '#38E1FF' },
        planetafunk:   { archivo: 'aerocosmos.html',             nombre: 'Planeta Funk',    color: '#66FF99', c2: '#FFB347' },
        sagitario:     { archivo: 'sinfonia_gravitacional.html', nombre: 'Sagitario A*',    color: '#D9C8FF', c2: '#FF9A3C' },
        mundointerior: { archivo: 'mundointerior_completo.html', nombre: 'Mundo Interior',  color: '#00E5CC', c2: '#7B3FE4' },
        pikitipu:      { archivo: 'pikitipu2.html',              nombre: 'Pikitipu',        color: '#B8FF5A', c2: '#FF6FD8' },
        kairos:        { archivo: 'tiempo.html',                 nombre: 'Kairós',          color: '#5AD1FF', c2: '#C8A2FF' }
    };
    const ORDEN = ['sol', 'musicosmos', 'kalpa', 'planetafunk', 'sagitario', 'mundointerior', 'pikitipu', 'kairos'];
    const GRIETA = { color: '#7B2FFF', c2: '#4B0082' };
    const VIAJAN = ['pv', 'seq', 'aspecto'];

    function detectarMundo() {
        const arch = (location.pathname.split('/').pop() || 'index.html');
        for (const id in MUNDOS) if (MUNDOS[id].archivo === arch) return id;
        return null;
    }
    const AQUI = MUNDOS[ds.mundo] ? ds.mundo : detectarMundo();
    let enMarco = false;
    try { enMarco = window.self !== window.top; } catch (_) { enMarco = true; }   // vista previa dentro de otro mundo

    const qs = new URLSearchParams(location.search);
    const maleta = {};
    qs.forEach((v, k) => { maleta[k] = v; });

    // ── Direcciones (deterministas: la precarga exige la URL exacta) ──
    function url(id, extra) {
        if (!MUNDOS[id]) return null;
        const p = new URLSearchParams();
        if (AQUI) p.set('desde', AQUI);
        if (extra) Object.keys(extra).forEach(k => { if (extra[k] !== undefined && extra[k] !== null) p.set(k, extra[k]); });
        VIAJAN.forEach(k => { if (maleta[k] !== undefined && !p.has(k)) p.set(k, maleta[k]); });
        return new URL(MUNDOS[id].archivo + '?' + p.toString(), location.href).href;
    }

    // ══ Estilos ═══════════════════════════════════════════════════════════════
    const CURVA_SALIDA = 'cubic-bezier(.55,0,.85,.35)';
    const CURVA_LLEGADA = 'cubic-bezier(.16,.72,.22,1)';
    const css = `
    html.pt-llega canvas,html.pt-llega .pt-difumina{filter:blur(28px) brightness(.32) saturate(1.9);transform:scale(1.14)}
    html.pt-revela canvas,html.pt-revela .pt-difumina{transition:filter 2.6s ${CURVA_LLEGADA},transform 3s ${CURVA_LLEGADA}}
    html.pt-sale canvas,html.pt-sale .pt-difumina{filter:blur(24px) brightness(1.55) saturate(2.3) hue-rotate(-12deg);transform:scale(1.22);
        transition:filter 1.7s ${CURVA_SALIDA},transform 1.8s ${CURVA_SALIDA}}
    .pt-capa{position:fixed;pointer-events:none;z-index:2147483000}
    .pt-vortice{inset:-30%;opacity:0;mix-blend-mode:screen;filter:blur(38px);
        background:conic-gradient(from 0deg,var(--c1) 0%,transparent 11%,var(--c2) 22%,transparent 34%,#fff 41%,transparent 47%,
            var(--c1) 58%,transparent 70%,var(--c2) 81%,transparent 92%,var(--c1) 100%);
        animation:ptGiro 7s linear infinite}
    .pt-vortice.b{filter:blur(56px);animation:ptGiro 11s linear infinite reverse;
        background:conic-gradient(from 90deg,transparent,var(--c2),transparent 30%,var(--c1),transparent 60%,#fff,transparent 85%)}
    .pt-nucleo{inset:0;opacity:0;mix-blend-mode:screen;
        background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.95) 0%,var(--c1) 9%,rgba(0,0,0,0) 34%)}
    .pt-sombra{inset:0;opacity:0;background:radial-gradient(circle at 50% 50%,rgba(0,0,0,0) 14%,rgba(0,0,0,.55) 46%,#000 82%)}
    .pt-polvo{inset:0;opacity:0}
    .pt-luz{left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;opacity:0;
        background:radial-gradient(circle,#fff 0%,rgba(255,255,255,.8) 35%,rgba(160,255,240,0) 70%)}
    .pt-btn{position:fixed;z-index:2147482990;width:36px;height:36px;border-radius:50%;cursor:pointer;display:flex;
        align-items:center;justify-content:center;font:16px/1 Georgia,serif;color:rgba(255,236,190,.85);
        background:rgba(6,8,18,.55);border:1px solid rgba(255,220,150,.35);box-shadow:0 0 16px -6px rgba(255,210,120,.7);
        backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);transition:transform .25s,box-shadow .25s;
        -webkit-tap-highlight-color:transparent;padding:0}
    .pt-btn:hover{transform:scale(1.12);box-shadow:0 0 22px -4px rgba(255,210,120,.9)}
    .pt-btn.grieta{color:#c9a3ff;border-color:rgba(150,90,255,.55);box-shadow:0 0 16px -6px #7b3fe4;font-size:13px}
    .pt-astro{position:fixed;inset:0;z-index:2147482995;display:none;align-items:center;justify-content:center;
        background:radial-gradient(circle at 50% 50%,rgba(10,8,24,.55),rgba(0,0,0,.82));backdrop-filter:blur(7px);
        -webkit-backdrop-filter:blur(7px);font-family:'Courier New',monospace}
    .pt-astro.on{display:flex;animation:ptAparece .45s ease both}
    .pt-rueda{position:relative;width:min(84vmin,520px);height:min(84vmin,520px)}
    .pt-orbita{position:absolute;inset:12%;border-radius:50%;border:1px solid rgba(255,220,150,.14)}
    .pt-orbita.b{inset:30%;border-color:rgba(255,220,150,.08)}
    .pt-sol{position:absolute;left:50%;top:50%;width:84px;height:84px;margin:-42px 0 0 -42px;border-radius:50%;
        background:radial-gradient(circle,#fff6d8 0%,#ffcc55 38%,rgba(255,140,40,.35) 66%,rgba(255,120,30,0) 72%);
        display:flex;align-items:center;justify-content:center;flex-direction:column;color:#3a2200;font-size:10px;
        letter-spacing:2px;animation:ptLatido 4s ease-in-out infinite;cursor:pointer}
    .pt-sol b{font-size:13px;letter-spacing:1px}
    .pt-m{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:6px;
        cursor:pointer;background:none;border:0;color:rgba(255,255,255,.78);font:10px 'Courier New',monospace;
        letter-spacing:2px;text-transform:uppercase;padding:6px;-webkit-tap-highlight-color:transparent}
    .pt-m i{display:block;width:16px;height:16px;border-radius:50%;background:var(--c);box-shadow:0 0 14px var(--c);
        transition:transform .25s,box-shadow .25s}
    .pt-m:hover i,.pt-m:focus i{transform:scale(1.5);box-shadow:0 0 24px var(--c)}
    .pt-m:hover,.pt-m:focus{color:#fff;outline:none}
    .pt-m.aqui{cursor:default;color:rgba(255,255,255,.4)}
    .pt-m.aqui i{box-shadow:0 0 0 3px rgba(0,0,0,.6),0 0 0 4px var(--c)}
    .pt-m.aqui:hover i{transform:none}
    .pt-pie{position:absolute;left:50%;bottom:-46px;transform:translateX(-50%);white-space:nowrap;font-size:10px;
        letter-spacing:2px;color:rgba(255,236,190,.5);text-align:center}
    .pt-pie button{background:none;border:1px solid rgba(150,90,255,.6);color:#c9a3ff;border-radius:999px;padding:6px 14px;
        font:10px 'Courier New',monospace;letter-spacing:2px;text-transform:uppercase;cursor:pointer;margin-bottom:10px}
    .pt-pista{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);z-index:2147482980;pointer-events:none;
        padding:8px 18px;border-radius:999px;background:rgba(5,8,20,.6);border:1px solid var(--c,#fff);
        color:#fff;font:11px 'Courier New',monospace;letter-spacing:3px;text-transform:uppercase;opacity:0;
        transition:opacity .6s ease;box-shadow:0 0 22px -8px var(--c,#fff);white-space:nowrap}
    .pt-pista.on{opacity:1}
    @keyframes ptGiro{to{transform:rotate(360deg)}}
    @keyframes ptAparece{from{opacity:0}to{opacity:1}}
    @keyframes ptLatido{0%,100%{box-shadow:0 0 40px 6px rgba(255,190,80,.35)}50%{box-shadow:0 0 70px 16px rgba(255,190,80,.55)}}
    @media (pointer:coarse){.pt-btn{width:42px;height:42px}}`;
    const estilo = document.createElement('style');
    estilo.textContent = css;
    (document.head || document.documentElement).appendChild(estilo);

    function nodo(tag, clase, padre) {
        const el = document.createElement(tag);
        if (clase) el.className = clase;
        (padre || document.body || document.documentElement).appendChild(el);
        return el;
    }

    // ══ Audio: filtro + ganancia maestros por cada AudioContext ══════════════
    const contextos = new Set();
    let ajusteAudio = { ganancia: 1, corte: null };
    (function parchearAudio() {
        if (ds.audio === 'no' || !window.AudioNode || !window.AudioDestinationNode) return;
        const conectar = AudioNode.prototype.connect;
        const desconectar = AudioNode.prototype.disconnect;
        function maestro(ctx) {
            if (ctx.__portal) return ctx.__portal;
            const f = ctx.createBiquadFilter();
            f.type = 'lowpass'; f.Q.value = 0.7071;
            f.frequency.value = ctx.sampleRate / 2;
            const g = ctx.createGain();
            conectar.call(f, g);
            conectar.call(g, ctx.destination);
            ctx.__portal = { f, g };
            contextos.add(ctx);
            aplicarAudio(ctx, 0);
            return ctx.__portal;
        }
        AudioNode.prototype.connect = function (destino) {
            try {
                if (destino instanceof AudioDestinationNode && destino.context === this.context && !(this.context instanceof OfflineAudioContext)) {
                    const args = Array.prototype.slice.call(arguments);
                    args[0] = maestro(this.context).f;
                    conectar.apply(this, args);
                    return destino;
                }
            } catch (_) {}
            return conectar.apply(this, arguments);
        };
        AudioNode.prototype.disconnect = function (destino) {
            try {
                if (destino instanceof AudioDestinationNode && this.context.__portal) {
                    const args = Array.prototype.slice.call(arguments);
                    args[0] = this.context.__portal.f;
                    return desconectar.apply(this, args);
                }
            } catch (_) {}
            return desconectar.apply(this, arguments);
        };
    })();
    function aplicarAudio(ctx, segundos) {
        const m = ctx.__portal; if (!m) return;
        const t = ctx.currentTime, dur = Math.max(0.01, segundos || 0.01);
        const nyq = ctx.sampleRate / 2;
        const corte = ajusteAudio.corte ? Math.min(nyq, ajusteAudio.corte) : nyq;
        try {
            m.g.gain.cancelScheduledValues(t); m.g.gain.setValueAtTime(m.g.gain.value, t);
            m.g.gain.linearRampToValueAtTime(ajusteAudio.ganancia, t + dur);
            m.f.frequency.cancelScheduledValues(t); m.f.frequency.setValueAtTime(m.f.frequency.value, t);
            m.f.frequency.exponentialRampToValueAtTime(Math.max(40, corte), t + dur);
        } catch (_) {}
    }
    function audio(opciones, segundos) {
        ajusteAudio = Object.assign({}, ajusteAudio, opciones || {});
        contextos.forEach(c => aplicarAudio(c, segundos));
        document.querySelectorAll('audio,video').forEach(m => {
            if (m.__portalVol === undefined) m.__portalVol = m.volume;
            try { m.volume = Math.max(0, Math.min(1, m.__portalVol * ajusteAudio.ganancia)); } catch (_) {}
        });
    }

    // ══ Precarga ═════════════════════════════════════════════════════════════
    const puedePrecargar = !!(window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules'));
    const precargados = new Set();
    function precargar(destino) {
        const u = MUNDOS[destino] ? url(destino) : destino;
        if (!u || precargados.has(u) || enMarco) return;
        precargados.add(u);
        if (puedePrecargar) {
            const s = document.createElement('script');
            s.type = 'speculationrules';
            s.textContent = JSON.stringify({ prerender: [{ source: 'list', urls: [u] }] });
            document.head.appendChild(s);
        } else {
            const l = document.createElement('link');
            l.rel = 'prefetch'; l.href = u;
            document.head.appendChild(l);
        }
    }

    // ══ Transición: la escena se difumina y renace ══════════════════════════
    const raiz = document.documentElement;
    let capas = null;
    function asegurarCapas() {
        if (capas) return capas;
        capas = {
            sombra: nodo('div', 'pt-capa pt-sombra', raiz),
            vortice: nodo('div', 'pt-capa pt-vortice', raiz),
            vortice2: nodo('div', 'pt-capa pt-vortice b', raiz),
            nucleo: nodo('div', 'pt-capa pt-nucleo', raiz),
            polvo: nodo('canvas', 'pt-capa pt-polvo', raiz),
            luz: nodo('div', 'pt-capa pt-luz', raiz)
        };
        return capas;
    }
    function colores(c1, c2) {
        const k = asegurarCapas();
        [k.vortice, k.vortice2, k.nucleo].forEach(el => { el.style.setProperty('--c1', c1); el.style.setProperty('--c2', c2); });
    }
    function animar(dur, fn, fin) {
        const t0 = performance.now();
        (function paso(ahora) {
            const k = Math.min(1, Math.max(0, (ahora - t0) / dur));
            fn(k);
            if (k < 1) requestAnimationFrame(paso); else if (fin) fin();
        })(t0);
    }
    const suave = k => k * k * (3 - 2 * k);

    // Polvo de luz: partículas que se precipitan hacia el centro (salida) o brotan de él (llegada)
    let polvoVivo = null;
    function polvo(c1, c2, hacia, dur) {
        const cv = asegurarCapas().polvo;
        const W = cv.width = Math.round(innerWidth * Math.min(devicePixelRatio || 1, 1.5));
        const H = cv.height = Math.round(innerHeight * Math.min(devicePixelRatio || 1, 1.5));
        cv.style.width = '100%'; cv.style.height = '100%';
        const g = cv.getContext('2d');
        const N = 260, P = [];
        for (let i = 0; i < N; i++) P.push({ a: Math.random() * 6.283, r: Math.random(), v: 0.4 + Math.random(), c: Math.random() < 0.5 ? c1 : (Math.random() < 0.6 ? c2 : '#ffffff'), s: 0.6 + Math.random() * 1.8 });
        const t0 = performance.now(), R = Math.hypot(W, H) * 0.6;
        const id = Symbol(); polvoVivo = id;
        cv.style.opacity = 1;
        (function paso(ahora) {
            if (polvoVivo !== id) return;
            const k = Math.min(1, (ahora - t0) / dur);
            g.globalCompositeOperation = 'source-over';
            g.fillStyle = 'rgba(0,0,0,0.18)'; g.clearRect(0, 0, W, H);
            g.globalCompositeOperation = 'lighter';
            for (const p of P) {
                const fase = hacia === 'adentro' ? (1 - ((p.r + k * p.v * 1.4) % 1)) : ((p.r + k * p.v * 1.2) % 1);
                const r = R * Math.pow(fase, 1.6);
                const a = p.a + (1 - fase) * 2.4 * (hacia === 'adentro' ? 1 : -1);
                const x = W / 2 + Math.cos(a) * r, y = H / 2 + Math.sin(a) * r;
                const largo = 6 + 26 * (1 - fase);
                const x2 = W / 2 + Math.cos(a - 0.05) * (r + largo), y2 = H / 2 + Math.sin(a - 0.05) * (r + largo);
                g.strokeStyle = p.c; g.globalAlpha = 0.25 + 0.6 * (1 - fase) * (hacia === 'adentro' ? k : 1 - k);
                g.lineWidth = p.s; g.beginPath(); g.moveTo(x, y); g.lineTo(x2, y2); g.stroke();
            }
            g.globalAlpha = 1;
            if (k < 1) requestAnimationFrame(paso);
            else { cv.style.transition = 'opacity .6s'; cv.style.opacity = 0; }
        })(t0);
    }

    let saliendo = false, timerSalida = null;
    function salir(destinoUrl, opciones) {
        if (saliendo || !destinoUrl) return;
        saliendo = true;
        opciones = opciones || {};
        const c1 = opciones.color || '#ffffff', c2 = opciones.color2 || c1;
        const DUR = opciones.duracion || 1750;
        const k = asegurarCapas();
        colores(c1, c2);
        audio({ ganancia: 0 }, DUR / 1000);
        raiz.classList.remove('pt-llega', 'pt-revela');
        raiz.classList.add('pt-sale');                      // la escena se difumina, se enciende y se acerca
        polvo(c1, c2, 'adentro', DUR);
        animar(DUR, t => {
            const e = suave(t);
            k.vortice.style.opacity = (Math.pow(e, 1.3) * 0.85).toFixed(3);
            k.vortice2.style.opacity = (Math.pow(e, 1.6) * 0.6).toFixed(3);
            k.nucleo.style.opacity = (Math.pow(e, 2.2) * 0.9).toFixed(3);
            k.nucleo.style.transform = `scale(${(0.6 + e * 0.9).toFixed(3)})`;
            k.sombra.style.opacity = (Math.pow(t, 2.6) * 0.95).toFixed(3);
        });
        timerSalida = setTimeout(() => {
            if (opciones.porHistoria) {
                history.back();
                timerSalida = setTimeout(() => { location.href = destinoUrl; }, 1500);
            } else {
                location.href = destinoUrl;
            }
        }, DUR);
    }

    function ir(destino, opciones) {
        opciones = opciones || {};
        if (!MUNDOS[destino] || destino === AQUI) return;
        let via = opciones.via || 'directo';
        if (destino === 'kalpa' || AQUI === 'kalpa') via = (via === 'kalpa') ? 'directo' : via;
        if (via === 'kalpa') {
            const extra = { hacia: destino };
            if (opciones.breve) extra.breve = '1';
            salir(url('kalpa', extra), { color: MUNDOS.kalpa.color, color2: MUNDOS.kalpa.c2 });
        } else if (via === 'grieta') {
            salir(url(destino, { via: 'grieta' }), { color: GRIETA.color, color2: GRIETA.c2 });
        } else if (via === 'horizonte') {
            salir(url(destino, { via: 'horizonte' }), { color: '#FFB070', color2: '#1a0010', duracion: 1500 });
        } else {
            salir(url(destino, { via: via }), { color: MUNDOS[destino].color, color2: MUNDOS[destino].c2 });
        }
    }
    function irUrl(direccion, opciones) {
        salir(new URL(direccion, location.href).href, opciones || {});
    }

    // ── Llegada ──
    let estaListo = false, revelado = false;
    const llegaPorPortal = !!maleta.desde && !enMarco;
    const viaLlegada = maleta.via || '';
    const colLlegada = viaLlegada === 'grieta' ? GRIETA : (MUNDOS[AQUI] || { color: '#ffffff', c2: '#ffffff' });
    if (llegaPorPortal) {
        const k = asegurarCapas();
        raiz.classList.add('pt-llega');                    // el mundo nace desenfocado y oscuro
        colores(colLlegada.color, colLlegada.c2 || colLlegada.color);
        k.vortice.style.opacity = 0.8; k.vortice2.style.opacity = 0.55;
        k.nucleo.style.opacity = 0.75; k.sombra.style.opacity = viaLlegada === 'horizonte' ? 1 : 0.85;
    }
    function revelar() {
        if (revelado || !llegaPorPortal) return;
        if (document.prerendering) return;                  // se revela al activarse
        revelado = true;
        const k = asegurarCapas();
        requestAnimationFrame(() => requestAnimationFrame(() => {
            raiz.classList.add('pt-revela');
            raiz.classList.remove('pt-llega');
            const v0 = parseFloat(k.vortice.style.opacity) || 0.8;
            if (viaLlegada === 'horizonte') {
                k.luz.style.opacity = 1;                    // desde la singularidad nace un punto de luz
                animar(2800, t => {
                    const e = suave(t);
                    k.luz.style.transform = `scale(${1 + e * 240})`;
                    k.luz.style.opacity = String(Math.max(0, 1 - Math.max(0, t - 0.3) / 0.7));
                    k.sombra.style.opacity = (1 - e).toFixed(3);
                });
            } else {
                polvo(colLlegada.color, colLlegada.c2 || colLlegada.color, 'afuera', 2200);
            }
            animar(3000, t => {
                const e = suave(t);
                k.vortice.style.opacity = (v0 * (1 - e)).toFixed(3);
                k.vortice2.style.opacity = (0.55 * (1 - e)).toFixed(3);
                k.nucleo.style.opacity = (0.75 * Math.pow(1 - t, 2)).toFixed(3);
                k.nucleo.style.transform = `scale(${(1.5 + e * 2.5).toFixed(3)})`;
                if (viaLlegada !== 'horizonte') k.sombra.style.opacity = (0.85 * (1 - e)).toFixed(3);
            }, () => setTimeout(() => raiz.classList.remove('pt-revela'), 400));
        }));
    }
    function listo() {
        if (!estaListo) {
            estaListo = true;
            try { new BroadcastChannel('cosmos-portal').postMessage({ tipo: 'listo', mundo: AQUI }); } catch (_) {}
        }
        revelar();
    }
    if (document.prerendering) {
        document.addEventListener('prerenderingchange', () => { if (estaListo) revelar(); }, { once: true });
        document.addEventListener('prerenderingchange', () => setTimeout(listo, 7000), { once: true });
    }
    if (ds.listo !== 'manual') window.addEventListener('load', () => setTimeout(listo, 350));
    setTimeout(() => { if (!document.prerendering) listo(); }, 7000);   // respaldo: nunca dejar la escena velada

    // Volver con el botón atrás del navegador
    window.addEventListener('pageshow', e => {
        if (!e.persisted) return;
        saliendo = false;
        audio({ ganancia: 1, corte: null }, 0.3);
        raiz.classList.remove('pt-sale', 'pt-llega');
        if (capas) ['sombra', 'vortice', 'vortice2', 'nucleo', 'polvo', 'luz'].forEach(n => { capas[n].style.opacity = 0; });
    });
    window.addEventListener('pagehide', () => clearTimeout(timerSalida));

    // ══ Astrolabio y grieta ═════════════════════════════════════════════════
    let astro = null, btnAstro = null, btnGrieta = null;
    const grietaHacia = MUNDOS[ds.grieta] ? ds.grieta : null;

    function construirAstrolabio() {
        astro = nodo('div', 'pt-astro');
        const rueda = nodo('div', 'pt-rueda', astro);
        nodo('div', 'pt-orbita', rueda);
        nodo('div', 'pt-orbita b', rueda);
        const sol = nodo('div', 'pt-sol', rueda);
        sol.innerHTML = maleta.pv ? `<b>${Number(maleta.pv).toLocaleString('es-CL')}</b>PV` : '<b>✦</b>';
        sol.title = MUNDOS.sol.nombre;
        sol.addEventListener('click', () => { cerrarAstrolabio(); if (AQUI !== 'sol') ir('sol'); });
        const lista = ORDEN.filter(id => id !== 'sol');
        lista.forEach((id, i) => {
            const a = -Math.PI / 2 + i * (2 * Math.PI / lista.length);
            const b = nodo('button', 'pt-m' + (id === AQUI ? ' aqui' : ''), rueda);
            b.style.left = (50 + Math.cos(a) * 38) + '%';
            b.style.top = (50 + Math.sin(a) * 38) + '%';
            b.style.setProperty('--c', MUNDOS[id].color);
            b.innerHTML = `<i></i>${MUNDOS[id].nombre}${id === AQUI ? '<br>· aquí ·' : ''}`;
            if (id === AQUI) return;
            const pre = () => precargar(url(id, { via: 'directo' }));
            b.addEventListener('pointerenter', pre);
            b.addEventListener('focus', pre);
            b.addEventListener('click', () => { cerrarAstrolabio(); ir(id); });
        });
        const pie = nodo('div', 'pt-pie', rueda);
        if (grietaHacia) {
            const g = nodo('button', '', pie);
            g.textContent = 'Grieta → ' + MUNDOS[grietaHacia].nombre;
            g.addEventListener('click', () => { cerrarAstrolabio(); abrirGrieta(); });
            nodo('br', '', pie);
        }
        const t = nodo('span', '', pie);
        t.textContent = 'astrolabio · º para cerrar';
        astro.addEventListener('click', e => { if (e.target === astro) cerrarAstrolabio(); });
    }
    function abrirAstrolabio() { if (!astro) construirAstrolabio(); astro.classList.add('on'); }
    function cerrarAstrolabio() { if (astro) astro.classList.remove('on'); }
    function alternarAstrolabio() { if (astro && astro.classList.contains('on')) cerrarAstrolabio(); else abrirAstrolabio(); }

    function escribiendo(e) {
        const t = e.target;
        return t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    }
    window.addEventListener('keydown', e => {
        if (enMarco || escribiendo(e)) return;
        if (e.code === 'Backquote' || e.key === 'º' || e.key === 'ª') {
            e.preventDefault(); e.stopPropagation();
            if (e.shiftKey && grietaHacia) { cerrarAstrolabio(); abrirGrieta(); return; }
            if (ds.astrolabio !== 'no') alternarAstrolabio();
        } else if (e.code === 'Escape' && astro && astro.classList.contains('on')) {
            e.preventDefault(); e.stopPropagation();
            cerrarAstrolabio();
        }
    }, true);

    function ponerBotones() {
        if (ds.astrolabio !== 'no') {
            btnAstro = nodo('button', 'pt-btn');
            btnAstro.textContent = '✦';
            btnAstro.title = 'Astrolabio (º)';
            btnAstro.style.left = '12px'; btnAstro.style.top = '50%'; btnAstro.style.marginTop = '-18px';
            btnAstro.addEventListener('click', e => { e.stopPropagation(); alternarAstrolabio(); });
        }
        if (grietaHacia) {
            btnGrieta = nodo('button', 'pt-btn grieta');
            btnGrieta.textContent = '⟋';
            btnGrieta.title = 'Grieta → ' + MUNDOS[grietaHacia].nombre + ' (Shift+º)';
            btnGrieta.style.left = '12px'; btnGrieta.style.top = 'calc(50% + 28px)';
            btnGrieta.addEventListener('click', e => { e.stopPropagation(); abrirGrieta(); });
        }
    }
    if (!enMarco) { if (document.body) ponerBotones(); else document.addEventListener('DOMContentLoaded', ponerBotones); }

    // ══ Portales 3D ═══════════════════════════════════════════════════════════
    const portales = [];
    let escena3D = null;               // { THREE, escena, camara, viajero, renderer, mover, escala }
    let pista = null, relojAnillos = null;

    const VS = 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }';

    // Aro con remolino del color del destino
    function hacerAnillo(T, R, color) {
        const g = new T.Group();
        const aro = new T.Mesh(new T.TorusGeometry(R, R * 0.055, 16, 160),
            new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, blending: T.AdditiveBlending, depthWrite: false, fog: false }));
        const aro2 = new T.Mesh(new T.TorusGeometry(R * 1.12, R * 0.012, 8, 160),
            new T.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false, fog: false }));
        const disco = new T.Mesh(new T.CircleGeometry(R * 0.97, 96), new T.ShaderMaterial({
            transparent: true, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending, fog: false,
            uniforms: { uT: { value: 0 }, uC: { value: color }, uK: { value: 0 } },
            vertexShader: VS,
            fragmentShader: 'uniform float uT; uniform vec3 uC; uniform float uK; varying vec2 vUv; void main(){ vec2 p=vUv-0.5; float r=length(p)*2.0; float a=atan(p.y,p.x);' +
                'float s=sin(a*5.0+r*9.0-uT*2.6)*0.5+0.5; float s2=sin(a*3.0-r*14.0+uT*1.7)*0.5+0.5; float hole=smoothstep(0.0,0.35,r);' +
                'vec3 col=mix(vec3(1.0),uC,smoothstep(0.0,0.6,r)); float al=(0.18+0.5*s*s2)*hole*(1.0-smoothstep(0.85,1.0,r))+(1.0-hole)*(0.35+0.5*uK);' +
                'gl_FragColor=vec4(col*(0.7+0.6*s),al*(0.75+0.5*uK)); }'
        }));
        g.add(aro, aro2, disco);
        return { g, aro, aro2, disco };
    }

    // Aro que insinúa el túnel de Kalpa: espiral de colores que se hunde hacia el centro
    function hacerKalpa(T, R) {
        const g = new T.Group();
        const aro = new T.Mesh(new T.TorusGeometry(R, R * 0.05, 16, 180), new T.ShaderMaterial({
            transparent: true, depthWrite: false, blending: T.AdditiveBlending, fog: false, uniforms: { uT: { value: 0 } },
            vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
            fragmentShader: 'uniform float uT; varying vec2 vUv; vec3 pal(float t){ return 0.55+0.45*cos(6.2831*(vec3(0.0,0.33,0.67)+t)); }' +
                'void main(){ vec3 c=pal(vUv.x*3.0-uT*0.25); gl_FragColor=vec4(mix(c,vec3(1.0,0.5,0.42),0.35)*1.3,0.95); }'
        }));
        const tunel = new T.Mesh(new T.CircleGeometry(R * 0.98, 128), new T.ShaderMaterial({
            transparent: true, depthWrite: false, side: T.DoubleSide, fog: false, uniforms: { uT: { value: 0 }, uK: { value: 0 } },
            vertexShader: VS,
            fragmentShader: [
                'uniform float uT; uniform float uK; varying vec2 vUv;',
                'vec3 pal(float t){ return 0.55+0.45*cos(6.2831*(vec3(0.02,0.36,0.68)+t)); }',
                'void main(){',
                '  vec2 p=(vUv-0.5)*2.0; float r=length(p); float a=atan(p.y,p.x);',
                '  float z=0.35/(r+0.04)+uT*(1.4+uK*2.0);',                         // profundidad del túnel
                '  float hel=sin(a*3.0+z*2.6)*0.5+0.5;',                            // la espiral de Kalpa
                '  float anillos=pow(sin(z*5.0)*0.5+0.5,3.0);',
                '  vec3 col=pal(z*0.12+hel*0.25);',
                '  col=mix(col,vec3(1.0,0.42,0.36),0.25+0.25*hel);',
                '  col*=0.35+0.9*hel+0.6*anillos;',
                '  col*=smoothstep(1.0,0.15,r)*1.2+0.15;',                          // oscuro en el borde, luz en el fondo
                '  col+=vec3(1.0,0.95,0.9)*exp(-r*7.0)*(0.9+uK);',
                '  float al=(1.0-smoothstep(0.93,1.0,r));',
                '  gl_FragColor=vec4(col,al);',
                '}'].join('\n')
        }));
        g.add(tunel, aro);
        return { g, aro, disco: tunel };
    }

    // Fractura: una grieta viva en el espacio, de violetas e índigos
    function hacerFractura(T, R) {
        const g = new T.Group();
        const semilla = Math.random() * 100;
        const plano = new T.Mesh(new T.PlaneGeometry(R * 1.4, R * 2.6), new T.ShaderMaterial({
            transparent: true, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending, fog: false,
            uniforms: { uT: { value: 0 }, uA: { value: 0 }, uS: { value: semilla }, uK: { value: 0 } },
            vertexShader: VS,
            fragmentShader: [
                'uniform float uT; uniform float uA; uniform float uS; uniform float uK; varying vec2 vUv;',
                'float h(float n){ return fract(sin(n)*43758.5453); }',
                'float ruido(float x){ float i=floor(x); float f=fract(x); f=f*f*(3.0-2.0*f); return mix(h(i+uS),h(i+1.0+uS),f); }',
                'float zig(float y){ return (ruido(y*9.0)-0.5)*0.16+(ruido(y*27.0)-0.5)*0.06+(ruido(y*71.0)-0.5)*0.02; }',
                'void main(){',
                '  vec2 p=vUv; float y=p.y;',
                '  float env=smoothstep(0.0,0.18,y)*smoothstep(1.0,0.82,y);',
                '  float cx=0.5+zig(y+uT*0.03)*env;',
                '  float ancho=uA*(0.012+0.15*pow(sin(y*3.14159),1.6))*(0.85+0.3*uK);',     // se abre como una herida de luz
                '  float d=abs(p.x-cx);',
                '  float dentro=1.0-smoothstep(ancho*0.75,ancho,d);',
                '  float borde=exp(-pow((d-ancho)/(0.004+0.012*uA),2.0))*env;',
                '  float rama=0.0;',                                                         // grietas secundarias
                '  for(int i=0;i<4;i++){ float fi=float(i); float yb=0.2+0.6*h(fi*7.3+uS); float lado=h(fi*3.1+uS)<0.5?-1.0:1.0;',
                '    float t=(p.x-cx)*lado; if(t>0.0){ float yy=yb+t*(0.8*h(fi+uS)-0.4)+zig(t*3.0+fi)*0.4; float L=0.08+0.18*h(fi*1.7+uS);',
                '      rama+=exp(-pow((y-yy)/0.0035,2.0))*smoothstep(L*uA,0.0,t)*uA; } }',
                '  vec2 q=vec2((p.x-cx)/(ancho+1e-3),y);',
                '  float e1=sin(q.y*24.0-uT*3.2+sin(q.x*4.0+uT*1.3)*2.2)*0.5+0.5;',
                '  float e2=sin(q.y*9.0+uT*1.7+q.x*3.0)*0.5+0.5;',
                '  vec3 indigo=vec3(0.29,0.0,0.62), violeta=vec3(0.62,0.18,1.0), magenta=vec3(0.95,0.32,1.0), lila=vec3(0.86,0.74,1.0);',
                '  vec3 interior=mix(indigo,violeta,e1); interior=mix(interior,magenta,pow(e2,3.0)*0.8);',
                '  interior+=lila*pow(max(0.0,1.0-abs(q.x)),5.0)*0.9;',
                '  float halo=exp(-d*16.0)*uA*env*0.65;',
                '  vec3 col=interior*dentro*env+vec3(1.0,0.88,1.0)*(borde+rama)*1.4+violeta*halo;',
                '  float al=clamp(dentro*env+borde+rama+halo,0.0,1.0);',
                '  gl_FragColor=vec4(col,al);',
                '}'].join('\n')
        }));
        g.add(plano);
        return { g, disco: plano, fractura: true };
    }

    // Agujero negro: horizonte, disco de acreción y lente gravitacional (como en el Sol)
    function hacerAgujero(T, R, renderer) {
        const g = new T.Group();
        const nucleo = new T.Mesh(new T.SphereGeometry(R * 0.55, 48, 32), new T.MeshBasicMaterial({ color: 0x000000, fog: false }));
        g.add(nucleo);
        const disco = new T.Mesh(new T.RingGeometry(R * 0.75, R * 2.1, 160, 1), new T.ShaderMaterial({
            transparent: true, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending, fog: false,
            uniforms: { uT: { value: 0 }, uC: { value: new T.Color(0xffb060) } },
            vertexShader: 'varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
            fragmentShader: 'uniform float uT; uniform vec3 uC; varying vec3 vP; void main(){ float r=length(vP.xy); float a=atan(vP.y,vP.x);' +
                'float n=0.5+0.5*sin(a*7.0-uT*2.2+r*1.3)*sin(a*3.0+uT*1.1); float rr=r/' + (R * 2.1).toFixed(3) + ';' +
                'float f=smoothstep(0.34,0.42,rr)*(1.0-smoothstep(0.62,1.0,rr)); vec3 col=mix(uC,vec3(1.0,0.95,0.85),smoothstep(0.55,0.36,rr));' +
                'gl_FragColor=vec4(col*(0.6+0.8*n),f*(0.55+0.45*n)); }'
        }));
        disco.rotation.x = -Math.PI / 2 + 0.32;
        g.add(disco);
        let lente = null;
        if (renderer && renderer.copyFramebufferToTexture) {
            const uni = { tFondo: { value: null }, uRes: { value: new T.Vector2(1, 1) }, uCentro: { value: new T.Vector2() }, uRs: { value: 0 }, uFlare: { value: 0 } };
            lente = new T.Mesh(new T.PlaneGeometry(R * 9, R * 9), new T.ShaderMaterial({
                transparent: true, depthWrite: false, depthTest: true, fog: false, uniforms: uni,
                vertexShader: 'void main(){ gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
                fragmentShader: [
                    'uniform sampler2D tFondo; uniform vec2 uRes; uniform vec2 uCentro; uniform float uRs; uniform float uFlare;',
                    'void main(){',
                    '  vec2 d=gl_FragCoord.xy-uCentro; float r=length(d);',
                    '  if(uRs<=0.5){ discard; }',
                    '  float fade=1.0-smoothstep(uRs*5.0,uRs*7.5,r);',
                    '  vec2 dir=d/max(r,1e-3);',
                    '  float defl=(uRs*uRs*1.5/max(r,1e-3))*fade;',                  // α ∝ Rs²/b, igual que en el Sol
                    '  vec2 s=uCentro+dir*(r-defl);',
                    '  vec3 col=texture2D(tFondo,clamp(s/uRes,0.001,0.999)).rgb;',
                    '  float ring=exp(-pow((r-uRs*1.32)/(uRs*0.07),2.0));',            // anillo de fotones
                    '  float ring2=exp(-pow((r-uRs*1.55)/(uRs*0.25),2.0));',
                    '  col+=vec3(1.0,0.86,0.72)*(ring*(0.55+uFlare)+ring2*0.08)*fade;',
                    '  col*=smoothstep(uRs*0.92,uRs*1.06,r);',                       // horizonte de eventos
                    '  gl_FragColor=vec4(col,fade);',
                    '}'].join('\n')
            }));
            lente.renderOrder = 9999;
            lente.frustumCulled = false;
            const v2 = new T.Vector2(), v3 = new T.Vector3(), lado = new T.Vector3(), origen = new T.Vector2(0, 0);
            let tex = null;
            lente.onBeforeRender = (ren, esc, cam) => {
                try {
                    const rt = ren.getRenderTarget();
                    let w, h;
                    if (rt) { w = rt.width; h = rt.height; } else { ren.getDrawingBufferSize(v2); w = v2.x; h = v2.y; }
                    // el formato de la copia debe coincidir con el del framebuffer (lienzo sin alfa → RGB)
                    let conAlfa = true;
                    if (!rt) { try { conAlfa = !!ren.getContext().getContextAttributes().alpha; } catch (_) {} }
                    const fmt = conAlfa ? T.RGBAFormat : T.RGBFormat;
                    if (!tex || tex.image.width !== w || tex.image.height !== h || tex.format !== fmt) {
                        if (tex) tex.dispose();
                        tex = new T.DataTexture(new Uint8Array(w * h * (conAlfa ? 4 : 3)), w, h, fmt);
                        tex.minFilter = tex.magFilter = T.LinearFilter; tex.generateMipmaps = false;
                        uni.tFondo.value = tex;
                    }
                    ren.copyFramebufferToTexture(origen, tex);
                    nucleo.getWorldPosition(v3);
                    const c = v3.clone().project(cam);
                    uni.uCentro.value.set((c.x * 0.5 + 0.5) * w, (c.y * 0.5 + 0.5) * h);
                    lado.setFromMatrixColumn(cam.matrixWorld, 0).multiplyScalar(R * 0.55 * g.scale.x).add(v3).project(cam);
                    uni.uRs.value = c.z > 1 ? 0 : Math.hypot((lado.x - c.x) * 0.5 * w, (lado.y - c.y) * 0.5 * h);
                    uni.uRes.value.set(w, h);
                } catch (_) { uni.uRs.value = 0; }
            };
            g.add(lente);
        }
        return { g, disco, nucleo, lente, agujero: true };
    }

    function anillo(o) {
        const T = o.THREE || window.THREE;
        const esc = o.escena || (escena3D && escena3D.escena);
        if (!T || !esc || !MUNDOS[o.destino]) return null;
        const estiloP = o.estilo || 'anillo';
        const via = o.via || (estiloP === 'kalpa' ? 'kalpa' : estiloP === 'fractura' ? 'grieta' : 'directo');
        const R = o.radio || 10;
        const color = new T.Color(o.color || (via === 'kalpa' ? MUNDOS.kalpa.color : MUNDOS[o.destino].color));
        const partes = estiloP === 'kalpa' ? hacerKalpa(T, R)
            : estiloP === 'fractura' ? hacerFractura(T, R)
            : estiloP === 'agujero' ? hacerAgujero(T, R, o.renderer || (escena3D && escena3D.renderer))
            : hacerAnillo(T, R, color);
        const grupo = partes.g;
        grupo.position.copy(o.posicion);
        grupo.scale.setScalar(o.aparecer === false ? 1 : 0.001);
        esc.add(grupo);

        // partículas que giran hacia el centro (anillos y túnel)
        let puntos = null;
        if (!partes.agujero) {
            const n = partes.fractura ? 180 : 360, pos = new Float32Array(n * 3), fase = new Float32Array(n);
            for (let i = 0; i < n; i++) fase[i] = Math.random();
            const gg = new T.BufferGeometry();
            gg.setAttribute('position', new T.BufferAttribute(pos, 3));
            puntos = new T.Points(gg, new T.PointsMaterial({ color: partes.fractura ? 0xb07bff : color, size: R * 0.035, transparent: true,
                opacity: 0.85, blending: T.AdditiveBlending, depthWrite: false, fog: false, sizeAttenuation: true }));
            puntos.userData.fase = fase;
            grupo.add(puntos);
        }

        const p = {
            o, grupo, partes, puntos, R, via, estilo: estiloP, escena: esc,
            tibio: o.tibio || R * 14, cruce: o.cruce || R * 0.8,
            urlDestino: via === 'kalpa' ? url('kalpa', { hacia: o.destino }) : url(o.destino, { via: via }),
            etiqueta: o.etiqueta || (via === 'kalpa' ? 'Kalpa → ' + MUNDOS[o.destino].nombre
                : estiloP === 'fractura' ? 'Grieta → ' + MUNDOS[o.destino].nombre : MUNDOS[o.destino].nombre),
            cColor: estiloP === 'fractura' ? '#9b5cff' : estiloP === 'kalpa' ? MUNDOS.kalpa.color : '#' + color.getHexString(),
            activo: true, nace: performance.now(), dNace: o.dNace || 1800, muere: null, abre: o.abre !== undefined ? o.abre : 1,
            gravedad: o.gravedad || null, viajero: o.viajero, camara: o.camara, mover: o.mover, acercar: o.acercar || 0
        };
        portales.push(p);
        if (!relojAnillos) relojAnillos = requestAnimationFrame(cuidarAnillos);
        return {
            grupo,
            cerrar: () => { if (!p.muere) p.muere = performance.now(); },
            portal: p
        };
    }

    const _a = { v: null, w: null, d: null };
    function posViajero(p) {
        const vj = p.viajero || (escena3D && escena3D.viajero);
        const cam = p.camara || (escena3D && escena3D.camara);
        if (typeof vj === 'function') return vj();
        if (cam) { cam.updateMatrixWorld(); return _a.v.setFromMatrixPosition(cam.matrixWorld); }
        return null;
    }
    function moverViajero(p, delta) {
        const mv = p.mover || (escena3D && escena3D.mover);
        if (mv) return mv(delta);
        const vj = p.viajero || (escena3D && escena3D.viajero);
        const cam = p.camara || (escena3D && escena3D.camara);
        if (typeof vj === 'function') { const v = vj(); if (v && v.add) v.add(delta); return; }
        if (cam) cam.position.add(delta);
    }

    let tPrevio = performance.now();
    function cuidarAnillos(ahora) {
        relojAnillos = requestAnimationFrame(cuidarAnillos);
        const T = window.THREE; if (!T) return;
        if (!_a.v) { _a.v = new T.Vector3(); _a.w = new T.Vector3(); _a.d = new T.Vector3(); }
        const dt = Math.min(0.25, (ahora - tPrevio) / 1000); tPrevio = ahora;
        const t = ahora / 1000;
        sembrarTick(ahora);
        let masCercano = null, dMin = Infinity;
        for (let i = portales.length - 1; i >= 0; i--) {
            const p = portales[i];
            const pos = posViajero(p); if (!pos) continue;
            const posV = _a.w.copy(pos);
            // nacer y morir
            let s = Math.min(1, (ahora - p.nace) / p.dNace);
            s = 1 - Math.pow(1 - s, 3);
            if (p.muere) {
                const m = Math.min(1, (ahora - p.muere) / 1400);
                s *= 1 - suave(m);
                if (m >= 1) { p.escena.remove(p.grupo); portales.splice(i, 1); continue; }
            }
            // una grieta invocada se acerca sola al viajero
            if (p.acercar && s > 0.95 && !p.muere) {
                _a.d.subVectors(posV, p.grupo.position);
                const L = _a.d.length();
                if (L > 0.01) p.grupo.position.addScaledVector(_a.d.multiplyScalar(1 / L), Math.min(L, p.acercar * dt));
            }
            const d = posV.distanceTo(p.grupo.position);
            const k = Math.max(0, Math.min(1, 1 - (d - p.cruce) / (p.tibio - p.cruce)));
            const pulso = 1 + Math.sin(t * 2.1) * 0.025 + k * 0.06;
            const pa = p.partes;
            if (!pa.agujero) {
                p.grupo.lookAt(posV.x, p.grupo.position.y + (posV.y - p.grupo.position.y) * 0.3, posV.z);
                p.grupo.scale.setScalar(Math.max(0.001, s * pulso));
                if (pa.aro) { pa.aro.rotation.z += dt * 0.25; if (pa.aro.material.uniforms) pa.aro.material.uniforms.uT.value = t; }
                if (pa.aro2) pa.aro2.rotation.z -= dt * 0.12;
                const u = pa.disco.material.uniforms;
                u.uT.value = t;
                if (u.uK) u.uK.value = k;
                if (u.uA) u.uA.value = suave(Math.min(1, s * 1.15)) * p.abre * (p.muere ? s : 1);
                const arr = p.puntos.geometry.attributes.position.array, fase = p.puntos.userData.fase;
                for (let j = 0; j < fase.length; j++) {
                    const f = (fase[j] + t * 0.07 * (1 + k)) % 1;
                    if (pa.fractura) {           // chispas que escapan de la grieta
                        arr[j * 3] = (Math.sin(fase[j] * 91.0) * 0.12 + (fase[j] - 0.5) * f * 0.9) * p.R;
                        arr[j * 3 + 1] = (fase[j] * 2.4 - 1.2) * p.R;
                        arr[j * 3 + 2] = f * p.R * 0.5;
                    } else {
                        const ang = fase[j] * 40 + t * (0.6 + k);
                        const rr = p.R * (1.6 - f * 1.5);
                        arr[j * 3] = Math.cos(ang) * rr; arr[j * 3 + 1] = Math.sin(ang) * rr; arr[j * 3 + 2] = (1 - f) * p.R * 0.6;
                    }
                }
                p.puntos.material.opacity = 0.85 * s;
                p.puntos.geometry.attributes.position.needsUpdate = true;
            } else {
                p.grupo.scale.setScalar(Math.max(0.001, s));
                pa.disco.material.uniforms.uT.value = t;
                pa.disco.rotation.z += dt * 0.15;
                if (pa.lente) pa.lente.lookAt(posV);
                // Absorción gravitacional: te atrae, y desde el punto sin retorno ya no hay escape
                const gv = p.gravedad;
                if (gv && !saliendo && !enMarco && s > 0.9) {
                    const rel = d / p.R;
                    if (rel < gv.alcance) {
                        const kk = 1 - (rel - gv.sinRetorno) / (gv.alcance - gv.sinRetorno);
                        const fuerza = rel <= gv.sinRetorno ? gv.caida : gv.tiron * Math.pow(Math.max(0, kk), 2.2);
                        _a.d.subVectors(p.grupo.position, posV);
                        const L = _a.d.length();
                        if (L > 0.001) {
                            _a.d.multiplyScalar(1 / L);
                            const tang = new T.Vector3().crossVectors(_a.d, new T.Vector3(0, 1, 0)).normalize();
                            const paso = Math.min(L * 0.5, fuerza * p.R * dt);
                            const delta = _a.d.clone().multiplyScalar(paso).addScaledVector(tang, paso * 0.45);
                            moverViajero(p, delta);
                        }
                        if (pa.lente) pa.lente.material.uniforms.uFlare.value = Math.max(0, kk) * 0.8;
                    }
                }
            }
            if (enMarco || s < 0.8) continue;
            if (!p.activo) {
                if (!saliendo && d > p.cruce * 2.5) p.activo = true;
                else continue;
            }
            if (d < p.tibio) precargar(p.urlDestino);
            if (d < dMin) { dMin = d; masCercano = p; }
            if (d < p.cruce && !saliendo) {
                p.activo = false;
                ir(p.o.destino, { via: p.via });
            }
        }
        const mostrar = masCercano && dMin < masCercano.tibio;
        if (mostrar && !pista) pista = nodo('div', 'pt-pista', raiz);
        if (pista) {
            if (mostrar) {
                const gv = masCercano.gravedad;
                const sinVuelta = gv && dMin / masCercano.R < gv.sinRetorno;
                pista.textContent = (sinVuelta ? '◆ ' : '◇ ') + masCercano.etiqueta + (sinVuelta ? ' · sin retorno' : '');
                pista.style.setProperty('--c', masCercano.cColor);
            }
            pista.classList.toggle('on', !!mostrar);
        }
    }

    // ── Siembra de portales: aparecen al azar alrededor del viajero ──
    const siembras = [];
    function sembrar(cfg) {
        const c = Object.assign({ max: 3, distancia: [150, 350], altura: [0, 0], vida: [70, 140], intervalo: [10, 25],
            primero: 2.5, abanico: 70, tipos: [] }, cfg);
        c.proximo = performance.now() + c.primero * 1000;
        c.vivos = [];
        siembras.push(c);
        if (!relojAnillos) relojAnillos = requestAnimationFrame(cuidarAnillos);
        return c;
    }
    const azar = (a, b) => a + Math.random() * (b - a);
    function elegir(tipos) {
        const total = tipos.reduce((s, x) => s + (x.peso || 1), 0);
        let r = Math.random() * total;
        for (const x of tipos) { r -= (x.peso || 1); if (r <= 0) return x; }
        return tipos[0];
    }
    function sembrarTick(ahora) {
        if (enMarco || !escena3D || saliendo) return;
        const T = escena3D.THREE || window.THREE;
        siembras.forEach(c => {
            const pos = escena3D.viajero ? escena3D.viajero() : (escena3D.camara && escena3D.camara.position);
            if (!pos) return;
            // retirar los que vencieron o quedaron muy atrás
            c.vivos = c.vivos.filter(h => {
                const p = h.portal;
                if (!portales.includes(p)) return false;
                const d = pos.distanceTo(p.grupo.position);
                if (!p.muere && ((ahora > h.vence && d > p.tibio) || d > c.distancia[1] * 3)) h.cerrar();
                return true;
            });
            if (ahora < c.proximo || c.vivos.length >= c.max || !c.tipos.length) return;
            c.proximo = ahora + azar(c.intervalo[0], c.intervalo[1]) * 1000;
            const tipo = elegir(c.tipos);
            // en un abanico frente a la mirada, para que se vea nacer
            const fwd = new T.Vector3();
            if (escena3D.camara) escena3D.camara.getWorldDirection(fwd); else fwd.set(0, 0, -1);
            fwd.y = 0; if (fwd.lengthSq() < 1e-4) fwd.set(0, 0, -1); fwd.normalize();
            fwd.applyAxisAngle(new T.Vector3(0, 1, 0), (Math.random() * 2 - 1) * c.abanico * Math.PI / 180);
            const dist = azar(tipo.distancia ? tipo.distancia[0] : c.distancia[0], tipo.distancia ? tipo.distancia[1] : c.distancia[1]);
            const alto = tipo.altura ? azar(tipo.altura[0], tipo.altura[1]) : azar(c.altura[0], c.altura[1]);
            const donde = pos.clone().addScaledVector(fwd, dist); donde.y = pos.y + alto;
            const h = anillo(Object.assign({}, tipo, { posicion: donde, dNace: tipo.estilo === 'agujero' ? 4000 : 2200 }));
            if (!h) return;
            h.vence = ahora + azar(tipo.vida ? tipo.vida[0] : c.vida[0], tipo.vida ? tipo.vida[1] : c.vida[1]) * 1000;
            c.vivos.push(h);
        });
    }

    // El mundo registra su escena: desde aquí nacen las grietas y la siembra
    function escenario(cfg) {
        escena3D = Object.assign({ THREE: window.THREE }, cfg);
        (cfg.difuminar || []).forEach(el => el && el.classList && el.classList.add('pt-difumina'));   // capas DOM (CSS3D) que también se difuminan
        // Si llegaste por la grieta, la ves cerrarse detrás de ti
        if (viaLlegada === 'grieta' && !enMarco) {
            const T = escena3D.THREE, cam = escena3D.camara;
            if (T && cam) {
                const fwd = new T.Vector3(); cam.getWorldDirection(fwd);
                const pos = posViajero({});
                const h = anillo({ destino: maleta.desde && MUNDOS[maleta.desde] ? maleta.desde : (grietaHacia || 'musicosmos'),
                    estilo: 'fractura', radio: (cfg.radioGrieta || 8), posicion: pos.clone().addScaledVector(fwd, (cfg.distanciaGrieta || 14) * 0.8),
                    aparecer: false, tibio: 1e-6, cruce: -1 });
                if (h) setTimeout(() => h.cerrar(), 2600);
            }
        }
    }

    // La grieta: se abre una fractura frente a ti y se acerca hasta tragarte
    let grietaAbierta = null;
    function abrirGrieta() {
        if (!grietaHacia || saliendo) return;
        if (!escena3D || !escena3D.camara) { ir(grietaHacia, { via: 'grieta' }); return; }
        if (grietaAbierta && portales.includes(grietaAbierta.portal)) return;
        const T = escena3D.THREE || window.THREE, cam = escena3D.camara;
        const fwd = new T.Vector3(); cam.getWorldDirection(fwd);
        const pos = posViajero({}).clone();
        const R = escena3D.radioGrieta || 8, D = escena3D.distanciaGrieta || 14;
        grietaAbierta = anillo({ destino: grietaHacia, estilo: 'fractura', radio: R,
            posicion: pos.addScaledVector(fwd, D), dNace: 1600, acercar: D * 0.55, tibio: D * 3, cruce: R * 0.35 });
        precargar(url(grietaHacia, { via: 'grieta' }));
    }

    // ══ API ══════════════════════════════════════════════════════════════════
    window.Portal = {
        MUNDOS, ORDEN, aqui: AQUI, maleta, url, ir, irUrl, salir, precargar, listo, audio,
        anillo, sembrar, escenario, abrirGrieta, abrirAstrolabio, cerrarAstrolabio,
        get saliendo() { return saliendo; },
        _portales: portales   // para depurar
    };
})();
