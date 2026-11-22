/* ══════════════════════════════════════════════════════════════════════════
   portal.js · Chamalnquimyst Labs — entrelazamiento de mundos
   ──────────────────────────────────────────────────────────────────────────
   Cada mundo lo carga en su <head>, ANTES de sus propios scripts:

       <script src="portal.js" data-mundo="musicosmos"></script>

   Atributos opcionales del <script>:
       data-velo="no"         el mundo maneja su propio velo de llegada (Kalpa)
       data-listo="manual"    el mundo llama Portal.listo() cuando su escena está lista
       data-astrolabio="no"   sin botón de astrolabio (el Sol ya es el mapa)
       data-audio="no"        no tocar el audio (sin fundido de salida)
       data-grieta="mundointerior"   habilita la grieta hacia ese mundo

   Qué hace:
     · Maleta: lee ?desde=&via=&origen= (+ pv, seq…) y la pasa al siguiente mundo.
     · Velo de salida y de llegada (color del mundo; grieta índigo; horizonte negro).
     · Fundido de audio al salir: todo lo que suena pasa por un filtro + ganancia
       maestros (Portal.audio también sirve para efectos, ej. el horizonte).
     · Precarga del siguiente mundo (Speculation Rules en Chrome/Edge).
     · Señal "listo" para Kalpa por BroadcastChannel('cosmos-portal').
     · Astrolabio: tecla º (la de la izquierda del 1) o el botón ✦ → saltar a
       cualquier mundo por un Kalpa breve. Shift+º abre la grieta si existe.
     · Portal.anillo({...}): portal 3D (anillo o agujero negro) que se precarga al
       acercarse y te lleva al cruzarlo.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';
    if (window.Portal) return;

    const script = document.currentScript;
    const ds = (script && script.dataset) || {};

    // Archivos en public/. Si renombras un mundo, cámbialo solo aquí.
    const MUNDOS = {
        sol:           { archivo: 'chamalnquimyst.html',         nombre: 'Sol de Voluntad', color: '#FFCC55' },
        musicosmos:    { archivo: 'index.html',                  nombre: 'Musicosmos',      color: '#A87FFF' },
        kalpa:         { archivo: 'kalpa.html',                  nombre: 'Kalpa',           color: '#FF6A5A' },
        planetafunk:   { archivo: 'aerocosmos.html',             nombre: 'Planeta Funk',    color: '#66FF99' },
        sagitario:     { archivo: 'sinfonia_gravitacional.html', nombre: 'Sagitario A*',    color: '#D9C8FF' },
        mundointerior: { archivo: 'mundointerior_completo.html', nombre: 'Mundo Interior',  color: '#00E5CC' },
        pikitipu:      { archivo: 'pikitipu2.html',              nombre: 'Pikitipu',        color: '#B8FF5A' },
        kairos:        { archivo: 'tiempo.html',                 nombre: 'Kairós',          color: '#5AD1FF' }
    };
    const ORDEN = ['sol', 'musicosmos', 'kalpa', 'planetafunk', 'sagitario', 'mundointerior', 'pikitipu', 'kairos'];
    const INDIGO = '#4B0082';
    const VIAJAN = ['pv', 'seq', 'aspecto'];   // datos de la maleta que pasan de mundo en mundo

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

    // ── Estilos ──
    const css = `
    .pt-velo{position:fixed;inset:0;z-index:2147483000;pointer-events:none;opacity:0;transition:opacity .9s ease;
        background:radial-gradient(circle at 50% 50%,var(--pt-c,#000) 0%,#000 72%)}
    .pt-velo.on{opacity:1}
    .pt-velo.instantaneo{transition:none}
    .pt-negro{position:fixed;inset:0;z-index:2147483001;pointer-events:none;background:#000;opacity:0}
    .pt-luz{position:fixed;left:50%;top:50%;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;z-index:2147483002;
        pointer-events:none;opacity:0;background:radial-gradient(circle,#fff 0%,rgba(255,255,255,.8) 35%,rgba(160,255,240,0) 70%)}
    .pt-grieta{position:fixed;inset:0;z-index:2147483001;pointer-events:none;opacity:0}
    .pt-grieta svg{width:100%;height:100%}
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
        if (!u || precargados.has(u)) return;
        precargados.add(u);
        const s = document.createElement('script');
        if (puedePrecargar) {
            s.type = 'speculationrules';
            s.textContent = JSON.stringify({ prerender: [{ source: 'list', urls: [u] }] });
            document.head.appendChild(s);
        } else {
            const l = document.createElement('link');
            l.rel = 'prefetch'; l.href = u;
            document.head.appendChild(l);
        }
    }

    // ══ Velos ════════════════════════════════════════════════════════════════
    let velo = null, negro = null, luz = null, grietaEl = null;
    function asegurarVelos() {
        if (velo) return;
        velo = nodo('div', 'pt-velo');
        negro = nodo('div', 'pt-negro');
        luz = nodo('div', 'pt-luz');
        grietaEl = nodo('div', 'pt-grieta');
        grietaEl.innerHTML = '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><defs><filter id="ptBrillo"><feGaussianBlur stdDeviation="0.6"/></filter></defs>' +
            '<polyline id="ptGrieta" fill="none" stroke="#d9b8ff" stroke-width="0.5" filter="url(#ptBrillo)" points="50,-2 47,12 53,24 46,37 54,49 47,61 52,73 45,86 51,102"/>' +
            '<polyline fill="none" stroke="#fff" stroke-width="0.18" points="50,-2 47,12 53,24 46,37 54,49 47,61 52,73 45,86 51,102"/></svg>';
    }
    function animar(dur, fn, fin) {
        const t0 = performance.now();
        (function paso(ahora) {
            const k = Math.min(1, (ahora - t0) / dur);
            fn(k);
            if (k < 1) requestAnimationFrame(paso); else if (fin) fin();
        })(t0);
    }
    const suave = k => k * k * (3 - 2 * k);

    // Salidas
    let saliendo = false, timerSalida = null;
    function salir(destinoUrl, opciones) {
        if (saliendo || !destinoUrl) return;
        saliendo = true;
        asegurarVelos();
        const estiloSalida = (opciones && opciones.estilo) || 'velo';
        const color = (opciones && opciones.color) || '#000';
        const dur = estiloSalida === 'horizonte' ? 1300 : estiloSalida === 'grieta' ? 1100 : 900;
        audio({ ganancia: 0 }, dur / 1000);
        if (estiloSalida === 'grieta') {
            velo.style.setProperty('--pt-c', INDIGO);
            grietaEl.style.opacity = 1;
            const linea = grietaEl.querySelector('#ptGrieta');
            animar(dur, k => {
                linea.setAttribute('stroke-width', (0.5 + suave(k) * 70).toFixed(2));
                linea.setAttribute('stroke', k < 0.5 ? '#d9b8ff' : INDIGO);
                if (k > 0.45) velo.classList.add('on');
            });
        } else if (estiloSalida === 'horizonte') {
            negro.style.background = '#000';
            animar(dur, k => {
                const r = (1 - suave(k)) * 150;
                negro.style.opacity = 1;
                negro.style.webkitMaskImage = negro.style.maskImage =
                    `radial-gradient(circle at 50% 50%, transparent ${r * 0.85}vmax, #000 ${r}vmax)`;
            });
        } else {
            velo.style.setProperty('--pt-c', color);
            velo.classList.add('on');
        }
        timerSalida = setTimeout(() => {
            if (opciones && opciones.porHistoria) {
                history.back();
                timerSalida = setTimeout(() => { location.href = destinoUrl; }, 1500);
            } else {
                location.href = destinoUrl;
            }
        }, dur);
    }

    function ir(destino, opciones) {
        opciones = opciones || {};
        if (!MUNDOS[destino] || destino === AQUI) return;
        let via = opciones.via || 'kalpa';
        if (destino === 'kalpa' || AQUI === 'kalpa') via = (via === 'kalpa') ? 'directo' : via;
        if (via === 'kalpa') {
            const extra = { hacia: destino };
            if (opciones.breve) extra.breve = '1';
            salir(url('kalpa', extra), { color: MUNDOS.kalpa.color });
        } else {
            const estiloSalida = via === 'grieta' ? 'grieta' : via === 'horizonte' ? 'horizonte' : 'velo';
            salir(url(destino, { via: via }), { estilo: estiloSalida, color: MUNDOS[destino].color });
        }
    }
    function irUrl(direccion, opciones) {
        salir(new URL(direccion, location.href).href, opciones || {});
    }

    // Llegadas
    let estaListo = false, revelado = false;
    const llegaPorPortal = !!maleta.desde && ds.velo !== 'no';
    const viaLlegada = maleta.via || '';
    if (llegaPorPortal) {
        asegurarVelos();
        if (viaLlegada === 'horizonte') {
            negro.style.opacity = 1;
        } else if (viaLlegada === 'grieta') {
            velo.classList.add('instantaneo', 'on');
            velo.style.setProperty('--pt-c', INDIGO);
        } else {
            velo.classList.add('instantaneo', 'on');
            velo.style.setProperty('--pt-c', (MUNDOS[AQUI] || {}).color || '#000');
        }
    }
    function revelar() {
        if (revelado || !llegaPorPortal) return;
        if (document.prerendering) return;          // se revela al activarse
        revelado = true;
        requestAnimationFrame(() => requestAnimationFrame(() => {
            velo.classList.remove('instantaneo');
            if (viaLlegada === 'horizonte') {
                // Desde la singularidad nace un punto de luz que se abre
                luz.style.opacity = 1;
                animar(2600, k => {
                    const e = suave(k);
                    luz.style.transform = `scale(${1 + e * 260})`;
                    luz.style.opacity = String(Math.max(0, 1 - Math.max(0, k - 0.35) / 0.65));
                    const r = e * 160;
                    negro.style.webkitMaskImage = negro.style.maskImage =
                        `radial-gradient(circle at 50% 50%, transparent ${r * 0.7}vmax, #000 ${r}vmax)`;
                }, () => { negro.style.opacity = 0; luz.style.opacity = 0; });
            } else if (viaLlegada === 'grieta') {
                grietaEl.style.opacity = 1;
                const linea = grietaEl.querySelector('#ptGrieta');
                linea.setAttribute('stroke-width', '60');
                velo.classList.remove('on');
                animar(1100, k => {
                    linea.setAttribute('stroke-width', (60 * (1 - suave(k)) + 0.3).toFixed(2));
                    grietaEl.style.opacity = String(1 - suave(k));
                });
            } else {
                velo.classList.remove('on');
            }
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
    }
    if (ds.listo !== 'manual') {
        window.addEventListener('load', () => setTimeout(listo, 350));
    }
    // Respaldo: nunca dejar la pantalla cubierta
    setTimeout(() => { if (!document.prerendering) listo(); }, 7000);
    document.addEventListener('prerenderingchange', () => setTimeout(listo, 7000), { once: true });

    // Volver con el botón atrás del navegador: levantar el velo otra vez
    window.addEventListener('pageshow', e => {
        if (!e.persisted) return;
        saliendo = false;
        audio({ ganancia: 1, corte: null }, 0.3);
        if (velo) { velo.classList.remove('on'); negro.style.opacity = 0; grietaEl.style.opacity = 0; luz.style.opacity = 0; }
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
        sol.addEventListener('click', () => { if (AQUI !== 'sol') ir('sol', { via: 'directo' }); });
        const lista = ORDEN.filter(id => id !== 'sol');
        lista.forEach((id, i) => {
            const a = -Math.PI / 2 + i * (2 * Math.PI / lista.length);
            const b = nodo('button', 'pt-m' + (id === AQUI ? ' aqui' : ''), rueda);
            b.style.left = (50 + Math.cos(a) * 38) + '%';
            b.style.top = (50 + Math.sin(a) * 38) + '%';
            b.style.setProperty('--c', MUNDOS[id].color);
            b.innerHTML = `<i></i>${MUNDOS[id].nombre}${id === AQUI ? '<br>· aquí ·' : ''}`;
            if (id === AQUI) return;
            const directo = id === 'kalpa';
            const destinoUrl = directo ? url(id) : url('kalpa', { hacia: id, breve: '1' });
            const pre = () => precargar(destinoUrl);
            b.addEventListener('pointerenter', pre);
            b.addEventListener('focus', pre);
            b.addEventListener('click', () => { cerrarAstrolabio(); directo ? ir(id, { via: 'directo' }) : ir(id, { via: 'kalpa', breve: true }); });
        });
        const pie = nodo('div', 'pt-pie', rueda);
        if (grietaHacia) {
            const g = nodo('button', '', pie);
            g.textContent = 'Grieta → ' + MUNDOS[grietaHacia].nombre;
            g.addEventListener('click', () => { cerrarAstrolabio(); ir(grietaHacia, { via: 'grieta' }); });
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
            if (e.shiftKey && grietaHacia) { cerrarAstrolabio(); ir(grietaHacia, { via: 'grieta' }); return; }
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
            const pos = ds.astroPos || 'centro-izq';
            const [v, h] = pos.split('-');
            btnAstro.style[h === 'der' ? 'right' : 'left'] = '12px';
            if (v === 'centro') { btnAstro.style.top = '50%'; btnAstro.style.marginTop = '-18px'; }
            else if (v === 'arriba') btnAstro.style.top = '12px';
            else btnAstro.style.bottom = '12px';
            btnAstro.addEventListener('click', e => { e.stopPropagation(); alternarAstrolabio(); });
        }
        if (grietaHacia) {
            btnGrieta = nodo('button', 'pt-btn grieta');
            btnGrieta.textContent = '⟋';
            btnGrieta.title = 'Grieta → ' + MUNDOS[grietaHacia].nombre + ' (Shift+º)';
            const ref = btnAstro;
            btnGrieta.style.left = ref && ref.style.left ? ref.style.left : '12px';
            if (ref && ref.style.right) { btnGrieta.style.right = ref.style.right; btnGrieta.style.left = ''; }
            btnGrieta.style.top = 'calc(50% + 28px)';
            btnGrieta.addEventListener('click', e => { e.stopPropagation(); ir(grietaHacia, { via: 'grieta' }); });
        }
    }
    if (!enMarco) { if (document.body) ponerBotones(); else document.addEventListener('DOMContentLoaded', ponerBotones); }

    // ══ Portales 3D ═══════════════════════════════════════════════════════════
    const portales = [];
    let pista = null, relojAnillos = null;

    function anillo(o) {
        const T = o.THREE || window.THREE;
        if (!T || !o.escena || !MUNDOS[o.destino]) return null;
        const via = o.via || 'kalpa';
        const color = new T.Color(o.color || (via === 'kalpa' ? MUNDOS.kalpa.color : MUNDOS[o.destino].color));
        const R = o.radio || 10;
        const grupo = new T.Group();
        grupo.position.copy(o.posicion);
        grupo.renderOrder = 10;
        let disco = null, aro = null, aro2 = null, puntos = null, nucleo = null;

        if (o.estilo === 'agujero') {
            nucleo = new T.Mesh(new T.SphereGeometry(R * 0.55, 48, 32), new T.MeshBasicMaterial({ color: 0x000000, fog: false }));
            grupo.add(nucleo);
            const disc = new T.Mesh(new T.RingGeometry(R * 0.75, R * 2.1, 128, 1),
                new T.ShaderMaterial({
                    transparent: true, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending, fog: false,
                    uniforms: { uT: { value: 0 }, uC: { value: new T.Color(0xffb060) } },
                    vertexShader: 'varying vec2 vUv; varying vec3 vP; void main(){ vUv=uv; vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
                    fragmentShader: 'uniform float uT; uniform vec3 uC; varying vec3 vP; void main(){ float r=length(vP.xy); float a=atan(vP.y,vP.x);' +
                        'float n=0.5+0.5*sin(a*7.0-uT*2.2+r*1.3)*sin(a*3.0+uT*1.1); float rr=r/' + (R * 2.1).toFixed(2) + ';' +
                        'float f=smoothstep(0.34,0.42,rr)*(1.0-smoothstep(0.62,1.0,rr)); vec3 col=mix(uC,vec3(1.0,0.95,0.85),smoothstep(0.55,0.36,rr));' +
                        'gl_FragColor=vec4(col*(0.6+0.8*n),f*(0.55+0.45*n)); }'
                }));
            disc.rotation.x = -Math.PI / 2 + 0.32;
            grupo.add(disc);
            disco = disc;
            aro = new T.Mesh(new T.TorusGeometry(R * 0.62, R * 0.03, 12, 128),
                new T.MeshBasicMaterial({ color: 0xfff1d0, transparent: true, opacity: 0.9, blending: T.AdditiveBlending, fog: false }));
            grupo.add(aro);
        } else {
            aro = new T.Mesh(new T.TorusGeometry(R, R * 0.055, 16, 160),
                new T.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.95, blending: T.AdditiveBlending, depthWrite: false, fog: false }));
            aro2 = new T.Mesh(new T.TorusGeometry(R * 1.12, R * 0.012, 8, 160),
                new T.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.5, blending: T.AdditiveBlending, depthWrite: false, fog: false }));
            disco = new T.Mesh(new T.CircleGeometry(R * 0.97, 96),
                new T.ShaderMaterial({
                    transparent: true, depthWrite: false, side: T.DoubleSide, blending: T.AdditiveBlending, fog: false,
                    uniforms: { uT: { value: 0 }, uC: { value: color }, uK: { value: 0 } },
                    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
                    fragmentShader: 'uniform float uT; uniform vec3 uC; uniform float uK; varying vec2 vUv; void main(){ vec2 p=vUv-0.5; float r=length(p)*2.0; float a=atan(p.y,p.x);' +
                        'float s=sin(a*5.0+r*9.0-uT*2.6)*0.5+0.5; float s2=sin(a*3.0-r*14.0+uT*1.7)*0.5+0.5; float hole=smoothstep(0.0,0.35,r);' +
                        'vec3 col=mix(vec3(1.0),uC,smoothstep(0.0,0.6,r)); float al=(0.18+0.5*s*s2)*hole*(1.0-smoothstep(0.85,1.0,r))+ (1.0-hole)*(0.35+0.5*uK);' +
                        'gl_FragColor=vec4(col*(0.7+0.6*s),al*(0.75+0.5*uK)); }'
                }));
            grupo.add(aro, aro2, disco);
            const n = 420, pos = new Float32Array(n * 3), fase = new Float32Array(n);
            for (let i = 0; i < n; i++) { fase[i] = Math.random(); }
            const g = new T.BufferGeometry();
            g.setAttribute('position', new T.BufferAttribute(pos, 3));
            puntos = new T.Points(g, new T.PointsMaterial({ color: color, size: R * 0.035, transparent: true, opacity: 0.85,
                blending: T.AdditiveBlending, depthWrite: false, fog: false, sizeAttenuation: true }));
            puntos.userData.fase = fase;
            grupo.add(puntos);
        }
        o.escena.add(grupo);

        const p = {
            o, grupo, disco, aro, aro2, puntos, nucleo, R, via,
            tibio: o.tibio || R * 14, cruce: o.cruce || R * 0.8,
            urlDestino: via === 'kalpa' ? url('kalpa', { hacia: o.destino }) : url(o.destino, { via: via }),
            etiqueta: o.etiqueta || (via === 'kalpa' ? 'Kalpa → ' + MUNDOS[o.destino].nombre : MUNDOS[o.destino].nombre),
            cColor: '#' + color.getHexString(), activo: true, cerca: false
        };
        portales.push(p);
        if (!relojAnillos) relojAnillos = requestAnimationFrame(cuidarAnillos);
        return grupo;
    }

    const _v = { a: null, b: null };
    function posViajero(p) {
        const o = p.o;
        if (typeof o.viajero === 'function') return o.viajero();
        if (o.camara) { o.camara.updateMatrixWorld(); return _v.a.setFromMatrixPosition(o.camara.matrixWorld); }
        return null;
    }
    let tPrevio = performance.now();
    function cuidarAnillos(ahora) {
        relojAnillos = requestAnimationFrame(cuidarAnillos);
        const T = window.THREE; if (!T) return;
        if (!_v.a) { _v.a = new T.Vector3(); _v.b = new T.Vector3(); }
        const dt = Math.min(0.1, (ahora - tPrevio) / 1000); tPrevio = ahora;
        const t = ahora / 1000;
        let masCercano = null, dMin = Infinity;
        portales.forEach(p => {
            const pos = posViajero(p); if (!pos) return;
            const d = pos.distanceTo(p.grupo.position);
            if (!p.activo) {                       // se rearma cuando el viajero se aleja del umbral
                if (!saliendo && d > p.cruce * 2.5) p.activo = true;
                else return;
            }
            const k = Math.max(0, Math.min(1, 1 - (d - p.cruce) / (p.tibio - p.cruce)));
            // mira siempre al viajero (solo giro), late, gira
            if (p.o.estilo !== 'agujero') {
                p.grupo.lookAt(pos.x, p.grupo.position.y + (pos.y - p.grupo.position.y) * 0.25, pos.z);
                p.aro.rotation.z += dt * 0.25;
                p.aro2.rotation.z -= dt * 0.12;
                const pulso = 1 + Math.sin(t * 2.1) * 0.03 + k * 0.08;
                p.aro.scale.setScalar(pulso);
                p.disco.material.uniforms.uT.value = t;
                p.disco.material.uniforms.uK.value = k;
                const arr = p.puntos.geometry.attributes.position.array, fase = p.puntos.userData.fase;
                for (let i = 0; i < fase.length; i++) {
                    const f = (fase[i] + t * 0.07 * (1 + k)) % 1;
                    const ang = fase[i] * 40 + t * (0.6 + k);
                    const rr = p.R * (1.6 - f * 1.5);
                    arr[i * 3] = Math.cos(ang) * rr; arr[i * 3 + 1] = Math.sin(ang) * rr; arr[i * 3 + 2] = (1 - f) * p.R * 0.6;
                }
                p.puntos.geometry.attributes.position.needsUpdate = true;
            } else {
                p.disco.material.uniforms.uT.value = t;
                p.grupo.rotation.y += dt * 0.05;
            }
            if (enMarco) return;
            if (d < p.tibio) precargar(p.urlDestino);
            if (d < dMin) { dMin = d; masCercano = p; }
            if (d < p.cruce && !saliendo) {
                p.activo = false;
                ir(p.o.destino, { via: p.via });
            }
        });
        // Pista en pantalla cuando un portal está cerca
        const mostrar = masCercano && dMin < masCercano.tibio;
        if (mostrar && !pista) pista = nodo('div', 'pt-pista');
        if (pista) {
            if (mostrar) { pista.textContent = '◇ ' + masCercano.etiqueta; pista.style.setProperty('--c', masCercano.cColor); }
            pista.classList.toggle('on', !!mostrar);
        }
    }

    // ══ API ══════════════════════════════════════════════════════════════════
    window.Portal = {
        MUNDOS, ORDEN, aqui: AQUI, maleta, url, ir, irUrl, salir, precargar, listo, audio, anillo,
        abrirAstrolabio, cerrarAstrolabio,
        get saliendo() { return saliendo; },
        _portales: portales   // para depurar
    };
})();
