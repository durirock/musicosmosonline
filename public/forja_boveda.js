/* ==========================================================================
   FORJA · BÓVEDA
   Respaldo en una carpeta elegida por el usuario (mismo patrón que la
   carpeta de jams de Musicosmos), para que nada dependa del caché:

   · Kairós: cada voz grabada se guarda como MP3 en  kairos/voces/
             (+ el original en kairos/_respaldo/ para restaurar sin pérdida),
             los videos en kairos/videos/, los audios de los soles con su
             nombre en kairos/soles/ y el estado completo en
             kairos/kairos-indice.json. Si el navegador borra sus datos, al
             volver a elegir la carpeta los Kairós se restauran solos.
   · Escena: tras el primer JSON creado (botón de guardar) se sigue
             autoguardando en ese archivo, con las coordenadas de cada panel
             y la posición de la cámara.
   · Archivos del escritorio: se recuerda dónde están (manija del sistema de
             archivos + ruta relativa) para reabrirlos al recargar.

   Cargar DESPUÉS de forja_kairos.js y ANTES de forja_estelar.js.
   Requiere Chrome/Edge (File System Access). En otros navegadores el resto
   de Mundo Interior sigue funcionando igual que antes.
   ========================================================================== */
(function () {
  'use strict';
  const L = window.ForjaLib || {};
  const FS = !!window.showDirectoryPicker;
  const STORES = ['blobs', 'messages', 'entities']; // orden de restauración
  const IDX_PATH = 'kairos/kairos-indice.json';
  const SCENE_IN_VAULT = 'mundointerior-escena.json';

  /* ---------------- llavero (IndexedDB propio) ---------------- */
  const kv = (mode, fn) => new Promise((res, rej) => {
    const rq = indexedDB.open('mundointerior_boveda', 1);
    rq.onupgradeneeded = () => rq.result.createObjectStore('kv');
    rq.onerror = () => rej(rq.error);
    rq.onsuccess = () => {
      const db = rq.result, tx = db.transaction('kv', mode), r = fn(tx.objectStore('kv'));
      tx.oncomplete = () => { db.close(); res(r && r.result); };
      tx.onerror = () => { db.close(); rej(tx.error); };
    };
  });
  const kvSet = (k, v) => kv('readwrite', s => s.put(v, k)).catch(() => {});
  const kvGet = k => kv('readonly', s => s.get(k)).catch(() => null);
  const uid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  /* ---------------- estado ---------------- */
  const V = {
    dir: null, perm: false, scene: null, sceneSig: '', sceneChecked: false,
    index: null, live: null, missing: [], deleted: [], hasMedia: false, asked: false,
    q: Promise.resolve(), idxTimer: 0
  };
  const queue = fn => (V.q = V.q.then(fn).catch(e => console.warn('[Bóveda]', e)));

  async function permOf(h, mode, ask) {
    if (!h) return false;
    try {
      let p = await h.queryPermission({ mode });
      if (p !== 'granted' && ask) p = await h.requestPermission({ mode });
      return p === 'granted';
    } catch (e) { return false; }
  }

  /* ---------------- archivos en la carpeta ---------------- */
  async function subdir(path, create) {
    let d = V.dir;
    for (const seg of path.split('/').filter(Boolean)) d = await d.getDirectoryHandle(seg, { create });
    return d;
  }
  async function writeFile(path, data) {
    const parts = path.split('/'), name = parts.pop();
    const fh = await (await subdir(parts.join('/'), true)).getFileHandle(name, { create: true });
    const w = await fh.createWritable(); await w.write(data); await w.close();
  }
  async function readFile(path) {
    const parts = path.split('/'), name = parts.pop();
    return (await (await subdir(parts.join('/'), false)).getFileHandle(name)).getFile();
  }

  /* ---------------- avisos ---------------- */
  function say(msg, ms) {
    const el = document.getElementById('autosave-indicator'); if (!el) return;
    el.textContent = msg; el.classList.add('visible');
    clearTimeout(say.t); say.t = setTimeout(() => el.classList.remove('visible'), ms || 3500);
  }
  // (el aviso va bajo el radar de forja_estelar.js, que ocupa la esquina superior izquierda)
  const css = document.createElement('style');
  css.textContent = `
    #boveda-chip{position:absolute;top:220px;left:16px;z-index:120;display:flex;flex-direction:column;gap:6px;font-family:'Lato',sans-serif}
    #boveda-chip button{background:rgba(2,4,10,.82);border:1px solid var(--primary-glow-color,#4DDBFF);color:var(--primary-glow-color,#4DDBFF);
      padding:6px 12px;border-radius:14px;font-size:12px;cursor:pointer;text-align:left;box-shadow:0 0 12px rgba(77,219,255,.25)}
    #boveda-chip button:hover{background:rgba(77,219,255,.14)}`;
  document.head.appendChild(css);
  const chip = document.createElement('div'); chip.id = 'boveda-chip';
  document.body.appendChild(chip);
  function pending() { try { return pendingFileItems; } catch (e) { return []; } }
  function refreshChip() {
    const acts = [];
    if (FS && !V.dir && V.hasMedia) acts.push(['◈ Elegir carpeta de respaldo para Kairós', chooseVault]);
    if (V.dir && !V.perm) acts.push([`◈ Reconectar la carpeta «${V.dir.name}»`, reconnect]);
    if (V.perm && V.missing.length) acts.push([`◈ Restaurar ${V.missing.length} recuerdo(s) de Kairós desde «${V.dir.name}»`, restore]);
    const n = pending().length;
    if (n) acts.push([`◈ Reabrir ${n} archivo(s) del escritorio`, relinkFiles]);
    chip.innerHTML = '';
    acts.forEach(([label, fn]) => {
      const b = document.createElement('button'); b.textContent = label;
      b.addEventListener('click', e => { e.stopPropagation(); fn(); });
      b.addEventListener('mousedown', e => e.stopPropagation());
      chip.appendChild(b);
    });
  }

  /* =====================================================================
     1. KAIRÓS → carpeta
     ===================================================================== */
  const raw = L.DB ? { put: L.DB.put, del: L.DB.del, all: L.DB.all } : null;
  if (raw) {
    // Se modifica el mismo objeto que usa forja_estelar.js (const DB = L.DB)
    L.DB.put = (s, v) => raw.put(s, v).then(r => { onPut(s, v); return r; });
    L.DB.del = (s, id) => raw.del(s, id).then(r => { onDel(s, id); return r; });
  } else console.warn('[Bóveda] No encuentro ForjaLib.DB: cargá forja_boveda.js después de forja_kairos.js.');

  function onPut(s, v) {
    if (!v || v.id == null) return;
    if (V.live) (V.live[s] = V.live[s] || new Set()).add(String(v.id));
    if (hasBlob(v)) { V.hasMedia = true; if (!V.dir) refreshChip(); }
    if (V.perm) queue(async () => { await loadIndex(); await upsert(s, v); scheduleIndex(); });
  }
  function onDel(s, id) {
    if (V.live && V.live[s]) V.live[s].delete(String(id));
    // borrado intencional: sale del índice (los archivos MP3/video quedan en la carpeta)
    V.deleted.push([s, String(id)]); kvSet('deleted', V.deleted);
    if (V.perm) queue(async () => { await loadIndex(); applyDeleted(); scheduleIndex(); });
  }
  function applyDeleted() {
    if (!V.index) return;
    V.deleted.forEach(([s, id]) => { if (V.index.stores[s]) delete V.index.stores[s][id]; });
    V.deleted = []; kvSet('deleted', V.deleted);
  }
  const hasBlob = v => Object.keys(v).some(k => v[k] instanceof Blob);

  async function loadIndex() {
    if (V.index) return V.index;
    let idx = null;
    try { idx = JSON.parse(await (await readFile(IDX_PATH)).text()); } catch (e) {}
    if (!idx || !idx.stores) idx = { formato: 'kairos-boveda', version: 1, stores: {} };
    STORES.forEach(s => { idx.stores[s] = idx.stores[s] || {}; });
    return (V.index = idx);
  }
  function scheduleIndex() {
    clearTimeout(V.idxTimer);
    V.idxTimer = setTimeout(() => queue(async () => {
      if (!V.index || !V.perm) return;
      V.index.actualizado = new Date().toISOString();
      await writeFile(IDX_PATH, JSON.stringify(V.index));
    }), 1500);
  }

  const pad = n => String(n).padStart(2, '0');
  const stamp = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const safe = s => String(s).replace(/[^\w\-.áéíóúñÁÉÍÓÚÑ ]+/g, '_').trim().slice(0, 60) || 'x';
  function extOf(type, name) {
    const m = name && /\.(\w{2,5})$/.exec(name); if (m) return m[1].toLowerCase();
    const t = (type || '').split(';')[0];
    return ({ 'audio/webm': 'webm', 'audio/ogg': 'ogg', 'audio/mp4': 'm4a', 'audio/mpeg': 'mp3', 'audio/wav': 'wav',
      'video/webm': 'webm', 'video/mp4': 'mp4', 'video/quicktime': 'mov', 'image/png': 'png', 'image/jpeg': 'jpg' })[t] || 'bin';
  }
  function whenOf(rec) {
    for (const k of ['created', 'createdAt', 'date', 'fecha', 'time', 't', 'ts']) {
      const d = new Date(rec[k]); if (rec[k] != null && !isNaN(d)) return d;
    }
    return new Date();
  }

  async function upsert(s, rec) {
    const prev = V.index.stores[s][rec.id], out = {};
    for (const k of Object.keys(rec)) {
      const v = rec[k];
      if (v instanceof Blob) {
        const old = prev && prev[k] && prev[k].__boveda;
        out[k] = { __boveda: (old && old.size === v.size) ? old : await saveMedia(s, rec, k, v) };
      } else out[k] = v;
    }
    V.index.stores[s][rec.id] = JSON.parse(JSON.stringify(out));
  }

  async function saveMedia(s, rec, k, blob) {
    const type = blob.type || '', tag = stamp(whenOf(rec)) + '-' + safe(rec.id).slice(-6);
    const meta = { type, size: blob.size };
    if (/^audio\//.test(type) && blob.name) {
      // archivo de audio subido (sol de audio): se respalda tal cual, con su nombre
      meta.file = `kairos/soles/${safe(blob.name.replace(/\.\w{2,5}$/, ''))}-${safe(rec.id).slice(-6)}.${extOf(type, blob.name)}`;
      await writeFile(meta.file, blob);
    } else if (/^audio\//.test(type) && !/mpeg|mp3/.test(type)) {
      meta.file = `kairos/_respaldo/${s}-${safe(rec.id)}-${k}.${extOf(type)}`;
      await writeFile(meta.file, blob);
      try {
        say('Kairós: codificando la voz en MP3…', 6000);
        const mp3 = await toMp3(blob);
        meta.mp3 = `kairos/voces/kairos-voz-${tag}.mp3`;
        await writeFile(meta.mp3, mp3);
        say(`Voz de Kairós guardada en «${V.dir.name}/${meta.mp3}»`);
      } catch (e) { console.warn('[Bóveda] MP3 no disponible, queda el original:', e); say('Voz respaldada (sin MP3: ' + e.message + ')'); }
    } else if (/^audio\//.test(type)) {
      meta.file = `kairos/audios/kairos-audio-${tag}.mp3`;
      await writeFile(meta.file, blob);
    } else if (/^video\//.test(type)) {
      const nm = blob.name || rec.name;
      const base = nm ? safe(String(nm).replace(/\.\w{2,5}$/, '')) + '-' : '';
      meta.file = `kairos/videos/kairos-video-${base}${tag}.${extOf(type, nm)}`;
      await writeFile(meta.file, blob);
      say(`Video de Kairós guardado en «${V.dir.name}/kairos/videos»`);
    } else {
      meta.file = `kairos/_respaldo/${s}-${safe(rec.id)}-${k}.${extOf(type)}`;
      await writeFile(meta.file, blob);
    }
    return meta;
  }

  /* ---- MP3 (lamejs, igual que las jams de Musicosmos) ---- */
  let lamePromise = null, decCtx = null;
  function loadLame() {
    if (window.lamejs) return Promise.resolve();
    if (!lamePromise) lamePromise = new Promise((res, rej) => {
      const sc = document.createElement('script');
      sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js';
      sc.onload = () => window.lamejs ? res() : rej(new Error('lamejs no cargó'));
      sc.onerror = () => { lamePromise = null; rej(new Error('sin conexión al codificador MP3')); };
      document.head.appendChild(sc);
    });
    return lamePromise;
  }
  function i16(src, from, n) {
    const out = new Int16Array(n);
    for (let i = 0; i < n; i++) { const x = Math.max(-1, Math.min(1, src[from + i])); out[i] = x < 0 ? x * 0x8000 : x * 0x7FFF; }
    return out;
  }
  async function toMp3(blob) {
    await loadLame();
    decCtx = decCtx || new (window.AudioContext || window.webkitAudioContext)();
    const buf = await decCtx.decodeAudioData(await blob.arrayBuffer());
    const ch = Math.min(2, buf.numberOfChannels);
    const enc = new lamejs.Mp3Encoder(ch, buf.sampleRate, ch > 1 ? 192 : 128), parts = [];
    const Lc = buf.getChannelData(0), Rc = ch > 1 ? buf.getChannelData(1) : null, step = 1152 * 16;
    for (let i = 0, k = 0; i < buf.length; i += step, k++) {
      const n = Math.min(step, buf.length - i);
      const b = Rc ? enc.encodeBuffer(i16(Lc, i, n), i16(Rc, i, n)) : enc.encodeBuffer(i16(Lc, i, n));
      if (b.length) parts.push(new Int8Array(b));
      if (k % 24 === 23) await new Promise(r => setTimeout(r, 0)); // no trabar la escena
    }
    const e = enc.flush(); if (e.length) parts.push(new Int8Array(e));
    return new Blob(parts, { type: 'audio/mpeg' });
  }

  /* ---- sincronía completa (al conectar la carpeta) ---- */
  async function sync() {
    if (!raw || !V.perm) return;
    await loadIndex();
    applyDeleted();
    V.live = {};
    let n = 0;
    for (const s of STORES) {
      const recs = await raw.all(s);
      V.live[s] = new Set(recs.map(r => String(r.id)));
      for (const r of recs) {
        if (hasBlob(r)) V.hasMedia = true;
        const before = JSON.stringify(V.index.stores[s][r.id] || null);
        await upsert(s, r);
        if (JSON.stringify(V.index.stores[s][r.id]) !== before) n++;
      }
    }
    // lo que está en la carpeta y no en el navegador: candidato a restaurar
    // (nunca se borra del índice por ausencia, solo por borrado intencional)
    V.missing = [];
    STORES.forEach(s => Object.keys(V.index.stores[s]).forEach(id => { if (!V.live[s].has(id)) V.missing.push([s, id]); }));
    if (n) scheduleIndex();
    refreshChip();
    return n;
  }

  async function restore() {
    if (!V.perm) { await reconnect(); if (!V.perm) return; }
    const list = V.missing.slice();
    if (!list.length) return;
    say(`Restaurando ${list.length} recuerdo(s) de Kairós…`, 20000);
    let ok = 0;
    for (const s of STORES) for (const [st, id] of list) {
      if (st !== s) continue;
      const rec = JSON.parse(JSON.stringify(V.index.stores[s][id]));
      try {
        for (const k of Object.keys(rec)) {
          const m = rec[k] && rec[k].__boveda; if (!m) continue;
          let f = null, type = m.type;
          try { f = await readFile(m.file); }
          catch (e) { if (!m.mp3) throw e; f = await readFile(m.mp3); type = 'audio/mpeg'; } // sin original: el MP3
          rec[k] = new Blob([f], { type: type || f.type });
        }
        await raw.put(s, rec); ok++;
      } catch (e) { console.warn('[Bóveda] no pude restaurar', s, id, e); }
    }
    say(`Kairós restaurado: ${ok} recuerdo(s). Recargando…`, 4000);
    setTimeout(() => location.reload(), 1200);
  }

  /* =====================================================================
     2. CARPETA
     ===================================================================== */
  async function chooseVault() {
    if (!FS) { say('Este navegador no permite elegir carpeta (usa Chrome o Edge).', 5000); return; }
    let d;
    try { d = await showDirectoryPicker({ id: 'mundointerior', mode: 'readwrite', startIn: 'documents' }); }
    catch (e) { if (e.name !== 'AbortError') say('No se pudo usar esa carpeta: ' + e.message, 5000); return; }
    V.dir = d; V.perm = true; V.index = null; kvSet('vault', d);
    say(`Carpeta «${d.name}»: aquí se respaldan los Kairós (MP3) y la escena.`, 5000);
    await connected(true);
  }
  async function reconnect() {
    if (!V.dir) return chooseVault();
    V.perm = await permOf(V.dir, 'readwrite', true);
    if (V.perm) { say(`Carpeta «${V.dir.name}» reconectada.`); await connected(false); }
    refreshChip();
  }
  async function connected(fresh) {
    await checkScene();
    await queue(sync);
    const liveCount = V.live ? STORES.reduce((a, s) => a + V.live[s].size, 0) : 0;
    // navegador vacío (caché borrado) + carpeta con recuerdos → restaurar sin preguntar
    if (V.missing.length && liveCount === 0 && fresh) return restore();
    refreshChip();
  }
  // Primer gesto tras recargar: pedir el permiso de la carpeta (Chrome ofrece "Permitir en cada visita")
  document.addEventListener('pointerdown', () => {
    if (V.dir && !V.perm && !V.asked) {
      V.asked = true;
      permOf(V.dir, 'readwrite', true).then(ok => { if (ok) { V.perm = true; connected(false); } refreshChip(); });
    }
  }, true);

  /* =====================================================================
     3. ESCENA (JSON con coordenadas)
     ===================================================================== */
  const pretty = text => { try { return JSON.stringify(JSON.parse(text), null, 2); } catch (e) { return text; } };
  async function checkScene() {
    // Escena vacía de fábrica (sin autoguardado en este navegador): traerla del archivo
    try {
      if (typeof sceneOrigin !== 'undefined' && sceneOrigin === 'default') {
        let f = null;
        if (V.scene && await permOf(V.scene, 'readwrite', false)) f = await V.scene.getFile();
        else if (V.dir && V.perm) f = await readFile(SCENE_IN_VAULT).catch(() => null);
        if (f) {
          applySceneDoc(JSON.parse(await f.text()));
          sceneOrigin = 'boveda';
          say(`Escena recuperada de «${f.name}»`);
        }
      }
    } catch (e) { console.warn('[Bóveda] escena no recuperada:', e); }
    V.sceneChecked = true;
  }
  async function writeScene(text, ask) {
    if (V.scene) {
      if (await permOf(V.scene, 'readwrite', ask)) {
        const w = await V.scene.createWritable(); await w.write(pretty(text)); await w.close();
        return V.scene.name;
      }
      return null;
    }
    if (V.dir && await permOf(V.dir, 'readwrite', ask)) {
      V.perm = true;
      await writeFile(SCENE_IN_VAULT, pretty(text));
      return V.dir.name + '/' + SCENE_IN_VAULT;
    }
    return null;
  }
  async function saveScene(manual, asNew) {
    const text = JSON.stringify(serializeSceneDoc());
    try {
      if (!asNew) {
        const where = await writeScene(text, manual);
        if (where) { V.sceneSig = text; say(`Escena guardada en «${where}»`); return; }
      }
      if (!manual) return;
      if (window.showSaveFilePicker) {
        V.scene = await showSaveFilePicker({ suggestedName: 'mundointerior-escena.json', id: 'mundointerior-escena',
          types: [{ description: 'Escena de Mundo Interior', accept: { 'application/json': ['.json'] } }] });
        kvSet('scene', V.scene);
        const where = await writeScene(text, true);
        if (where) { V.sceneSig = text; V.sceneChecked = true; say(`Escena guardada en «${where}» · desde ahora se autoguarda ahí`, 5000); }
        return;
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([pretty(text)], { type: 'application/json' }));
      a.download = 'chamalnquimyst-scene.json'; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } catch (e) { if (e.name !== 'AbortError') { console.warn(e); say('No se pudo guardar la escena: ' + e.message, 5000); } }
  }
  function autoSaveScene(text) {
    if (!V.sceneChecked || text === V.sceneSig || (!V.scene && !(V.dir && V.perm))) return;
    queue(async () => {
      const where = await writeScene(text, false);
      if (where) { V.sceneSig = text; say(`Autoguardado en «${where}»`, 1800); }
    });
  }

  /* =====================================================================
     4. ARCHIVOS DEL ESCRITORIO
     ===================================================================== */
  const MEDIA = /\.(png|jpe?g|gif|webp|bmp|avif|mp4|webm|mov|m4v|ogv|avi|mkv)$/i;
  async function pickFiles() {
    const hs = await showOpenFilePicker({ multiple: true, id: 'mundointerior-archivos', types: [{
      description: 'Imágenes, videos y documentos',
      accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.avif'],
                'video/*': ['.mp4', '.webm', '.mov', '.m4v', '.ogv', '.avi'],
                'application/pdf': ['.pdf'], 'text/plain': ['.txt', '.md'], 'text/html': ['.html', '.htm'] } }] });
    const out = [];
    for (const h of hs) {
      const id = uid('f:'); await kvSet(id, h);
      const f = await h.getFile();
      f._ref = { id, kind: 'file', name: f.name, path: f.name, size: f.size, mtime: f.lastModified };
      out.push(f);
    }
    return out;
  }
  async function walk(dir, base, visit, depth) {
    if (depth > 8) return;
    for await (const [name, h] of dir.entries()) {
      if (name[0] === '.') continue;
      const rel = base ? base + '/' + name : name;
      if (h.kind === 'directory') await walk(h, rel, visit, depth + 1);
      else if (await visit(h, rel) === false) return;
    }
  }
  async function scanFolder() {
    let dir;
    try { dir = await showDirectoryPicker({ id: 'mundointerior-escaneo', mode: 'read' }); }
    catch (e) { if (e.name !== 'AbortError') say('No se pudo leer la carpeta: ' + e.message, 5000); return; }
    const id = uid('d:'); await kvSet(id, dir);
    const files = [];
    await walk(dir, '', async (h, rel) => {
      if (!MEDIA.test(h.name)) return;
      const f = await h.getFile();
      f._ref = { id, kind: 'dir', root: dir.name, path: rel, name: f.name, size: f.size, mtime: f.lastModified };
      files.push(f);
      return files.length < 2000;
    }, 0);
    handleFolderScan({ target: { files } });
  }
  async function fileFromRef(ref, ask) {
    if (!ref || !ref.id) return null;
    const h = await kvGet(ref.id); if (!h) return null;
    if (!await permOf(h, 'read', ask)) return 'perm';
    if (h.kind === 'file') return h.getFile();
    const parts = ref.path.split('/'), name = parts.pop();
    let d = h; for (const p of parts) d = await d.getDirectoryHandle(p);
    return (await d.getFileHandle(name)).getFile();
  }
  async function openPending(it, f) {
    const list = pending(), i = list.indexOf(it); if (i >= 0) list.splice(i, 1);
    f._ref = it.fileRef;
    await createPanelFromFile(f, new THREE.Vector3().fromArray(it.position), it.scale); // con su tamaño guardado
  }
  async function resolvePending(ask) {
    let perm = 0;
    for (const it of pending().slice()) {
      const f = await fileFromRef(it.fileRef, ask).catch(() => null);
      if (f instanceof Blob) await openPending(it, f); else if (f === 'perm') perm++;
    }
    refreshChip();
    return perm;
  }
  async function relinkFiles() {
    await resolvePending(true);
    const left = pending(); if (!left.length) { say('Archivos del escritorio reabiertos.'); return; }
    // Sin manija (caché borrado o archivo movido): buscarlos en una carpeta por ruta y nombre
    say(`Elige la carpeta donde están ${left.length} archivo(s): los busco por nombre.`, 6000);
    const names = new Set(left.map(it => it.fileRef.name));
    const found = new Map();  // name -> [{rel, get}]
    const note = (name, rel, get) => { if (!found.has(name)) found.set(name, []); found.get(name).push({ rel, get }); };
    let root = null, rootId = null;
    if (FS) {
      try { root = await showDirectoryPicker({ id: 'mundointerior-escaneo', mode: 'read' }); } catch (e) { return; }
      rootId = uid('d:'); await kvSet(rootId, root);
      let seen = 0;
      await walk(root, '', (h, rel) => { if (names.has(h.name)) note(h.name, rel, () => h.getFile()); return ++seen < 50000; }, 0);
    } else {
      const inp = document.createElement('input'); inp.type = 'file'; inp.webkitdirectory = true;
      const files = await new Promise(res => { inp.onchange = () => res(Array.from(inp.files)); inp.click(); });
      files.forEach(f => { if (names.has(f.name)) note(f.name, f.webkitRelativePath.split('/').slice(1).join('/'), async () => f); });
    }
    let ok = 0;
    for (const it of left.slice()) {
      const r = it.fileRef, cands = found.get(r.name) || [];
      const tail = p => (p || '').split('/').slice(-2).join('/');
      const pick = cands.find(c => c.rel === r.path) || cands.find(c => tail(c.rel) === tail(r.path)) || cands[0];
      if (!pick) continue;
      const f = await pick.get();
      if (cands.length > 1 && r.size && f.size !== r.size && cands.indexOf(pick) !== cands.length - 1) continue;
      it.fileRef = rootId ? { id: rootId, kind: 'dir', root: root.name, path: pick.rel, name: f.name, size: f.size, mtime: f.lastModified }
                          : Object.assign({}, r, { path: pick.rel });
      await openPending(it, f); ok++;
    }
    say(`Reabiertos ${ok} de ${left.length} archivo(s).` + (pending().length ? ' Los demás siguen guardados en la escena.' : ''), 5000);
    refreshChip();
  }

  /* =====================================================================
     5. ARRANQUE
     ===================================================================== */
  (async () => {
    V.deleted = (await kvGet('deleted')) || [];
    V.dir = FS ? await kvGet('vault') : null;
    V.scene = window.showSaveFilePicker ? await kvGet('scene') : null;
    if (V.dir) V.perm = await permOf(V.dir, 'readwrite', false);
    if (raw) try { V.hasMedia = (await raw.all('blobs')).length > 0 || (await raw.all('messages')).some(hasBlob); } catch (e) {}
    if (V.perm) await connected(false); else await checkScene();
    await resolvePending(false);
    refreshChip();
  })();

  window.Boveda = {
    canPick: FS && !!window.showOpenFilePicker,
    chooseVault, reconnect, restore, saveScene, autoSaveScene,
    pickFiles, scanFolder, resolvePending, relinkFiles,
    get carpeta() { return V.dir ? V.dir.name : null; }
  };
})();
