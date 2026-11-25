// kp-nube.js — puente entre los universos (Pikitipu, Musicosmos, Mundo Interior…) y la nube de Killer Pendiente.
//
// Los universos primero hablan con KP del PC (http://127.0.0.1:5000). Si KP no está abierto,
// usan este puente: lee la sesión de Firebase de kpweb (mismo origen = misma sesión) y permite
//   · ver el Mu del aspecto y gastarlo (portales, viajes…)
//   · leer la bolsa comprada en la Botica y consumir objetos (darle de comer a Pikitipu, usar un portal propio…)
// Todo se registra en aspectos/{aspecto}/movimientos y avisa a los demás universos con un pulso.
// Si no hay sesión en kpweb, cada función responde null y el universo sigue funcionando libre.
(function () {
  'use strict';
  if (window.KPNube) return;
  const BASE = (function () {
    const s = document.currentScript && document.currentScript.src;
    try { return s ? new URL('.', s).href : new URL('./', location.href).href; } catch (e) { return './'; }
  })();
  const SDK = ['kpweb/vendor/firebase-app-compat.js', 'kpweb/vendor/firebase-auth-compat.js',
    'kpweb/vendor/firebase-firestore-compat.js', 'kpweb/config.js'];

  function cargarScript(src) {
    return new Promise((ok, mal) => {
      const s = document.createElement('script'); s.src = src; s.async = false;
      s.onload = ok; s.onerror = () => mal(new Error('no cargó ' + src)); document.head.appendChild(s);
    });
  }

  let arranque = null;
  function iniciar() {
    if (arranque) return arranque;
    arranque = (async () => {
      if (!(window.firebase && firebase.firestore)) { for (const f of SDK) await cargarScript(BASE + f); }
      else if (!window.KP_FIREBASE) await cargarScript(BASE + 'kpweb/config.js');
      // la app por defecto: Firebase guarda la sesión por nombre de app, y kpweb usa la por defecto
      const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(window.KP_FIREBASE);
      const auth = app.auth(), db = app.firestore();
      const user = await new Promise((ok) => { let off = null; off = auth.onAuthStateChanged((u) => { if (typeof off === 'function') off(); ok(u); }); });
      if (!user) return null;
      const tok = await user.getIdTokenResult();
      const aspecto = tok.claims && tok.claims.aspecto;
      if (!aspecto) return null;
      return { db, aspecto, FV: firebase.firestore.FieldValue };
    })().catch((e) => { console.warn('[KPNube]', e.message); return null; });
    return arranque;
  }

  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(16) + Math.random().toString(16).slice(2)).replace(/-/g, '');
  const ahora = () => Date.now();
  const refAsp = (c) => c.db.collection('aspectos').doc(c.aspecto);

  async function sesion() { const c = await iniciar(); return c ? { aspecto: c.aspecto } : null; }

  async function mu() {
    const c = await iniciar(); if (!c) return null;
    const d = await refAsp(c).get();
    return d.exists ? (d.data().mu || 0) : 0;
  }

  // → {ok:true, saldo} · {ok:false, saldo, falta} · null (sin sesión)
  async function gastar(cantidad, motivo, mundo) {
    const c = await iniciar(); if (!c) return null;
    cantidad = Math.max(0, Math.round(+cantidad || 0));
    const ref = refAsp(c);
    try {
      return await c.db.runTransaction(async (tx) => {
        const d = await tx.get(ref); const saldo = (d.exists && d.data().mu) || 0;
        if (saldo < cantidad) return { ok: false, saldo, falta: cantidad - saldo };
        tx.set(ref, { mu: saldo - cantidad, _mod: ahora() }, { merge: true });
        tx.set(ref.collection('movimientos').doc(), { tipo: 'gasto', mu: -cantidad, motivo: String(motivo || '').slice(0, 80),
          mundo: mundo || '', fecha: new Date().toISOString(), _mod: ahora() });
        return { ok: true, saldo: saldo - cantidad, cantidad };
      });
    } catch (e) { console.warn('[KPNube] gastar', e.message); return null; }
  }

  // Bolsa en el formato de /api/inventario de KP: {aspecto, items:[{id,emoji,nombre,cantidad,efectos,mundo}], horas_sin_comer, racha_cuidado}
  async function bolsa(mundo) {
    const c = await iniciar(); if (!c) return null;
    const [inv, asp] = await Promise.all([refAsp(c).collection('inventario').get(), refAsp(c).get()]);
    let items = inv.docs.map((d) => Object.assign({ id: d.id }, d.data())).filter((i) => (i.cantidad || 0) > 0);
    if (mundo) items = items.filter((i) => !i.mundo || i.mundo === mundo);
    const ult = asp.exists ? asp.data().ultima_comida : null;
    return { aspecto: c.aspecto, items: items.map((i) => ({ id: i.id, emoji: i.emoji, nombre: i.nombre, cantidad: i.cantidad, efectos: i.efectos || {}, mundo: i.mundo || '' })),
      horas_sin_comer: ult ? Math.max(0, (ahora() - ult) / 3600000) : null, racha_cuidado: 0 };
  }

  // Consume 1 unidad. Devuelve {ok, evento} (evento FEED/USO igual al de KP) · {ok:false, error} · null (sin sesión)
  async function consumir(itemId, destino) {
    const c = await iniciar(); if (!c) return null;
    const ref = refAsp(c), refItem = ref.collection('inventario').doc(String(itemId));
    try {
      const item = await c.db.runTransaction(async (tx) => {
        const d = await tx.get(refItem);
        if (!d.exists || (d.data().cantidad || 0) < 1) return null;
        const it = Object.assign({ id: d.id }, d.data());
        tx.set(refItem, { cantidad: it.cantidad - 1, _mod: ahora() }, { merge: true });
        if (it.mundo === 'pikitipu') tx.set(ref, { ultima_comida: ahora(), _mod: ahora() }, { merge: true });
        tx.set(ref.collection('movimientos').doc(), { tipo: 'uso', item: it.id, nombre: it.nombre, emoji: it.emoji || '',
          destino: String(destino || '').slice(0, 20), fecha: new Date().toISOString(), _mod: ahora() });
        return it;
      });
      if (!item) return { ok: false, error: 'No queda ese objeto en la bolsa' };
      const evento = { type: item.mundo === 'pikitipu' ? 'FEED' : 'USO', event_id: uuid(), user: c.aspecto,
        item: { id: item.id, emoji: item.emoji, nombre: item.nombre, efectos: item.efectos || {} }, destino: destino || '',
        timestamp: new Date().toISOString() };
      c.db.collection('pulsos').add(Object.assign({}, evento, { origen: 'universo', _mod: ahora() })).catch(() => { });
      return { ok: true, evento };
    } catch (e) { console.warn('[KPNube] consumir', e.message); return null; }
  }

  window.KPNube = { sesion, mu, gastar, bolsa, consumir };
})();
