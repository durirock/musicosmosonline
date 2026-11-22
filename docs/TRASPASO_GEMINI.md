# Traspaso para Gemini · Chamalnquimyst · noviembre 2026

Este documento deja todo listo para continuar sin perder contexto. Lo escribió Claude el
22-nov-2026 antes de quedarse sin créditos. Léelo entero antes de tocar código.

---

## 0. Con quién trabajas y cómo

Andrés (durirock), creador y programador del ecosistema. Su ecosistema se llama **Chamalnquimyst Labs**. El centro es **Killer
Pendiente (KP)**, una app Python de tareas gamificadas. A su alrededor hay universos 3D en
el navegador que reaccionan a lo que haces en KP.

Reglas de colaboración (importantes, él las pidió):

- **Español** siempre. Registro poético-técnico: traduce sus metáforas a ingeniería sin aplanarlas.
- **Bisturí, no reescritura.** Antes de cambiar algo, mira el archivo real (`grep -n`, rangos de
  líneas). Cambios quirúrgicos con buscar/reemplazar. Si debe pegarlos él, dale instrucciones
  paso a paso compatibles con Cursor.
- **Devolución antes de implementar** cuando la decisión es arquitectónica o ambigua.
- **Haz solo lo que pide.** Nada de funciones extra por iniciativa propia.
- **Sin emojis** en sus juegos y visuales. Usa símbolos: ◆ ◇ ◈ ✦ ◎ ♪ ⟋.
- Es búho: no diseñes nada asumiendo que de noche no se usa.
- Nunca subas secretos a GitHub (`firebase_clave.json` jamás).

---

## 1. Mapa del territorio

### Repositorios (GitHub, usuario `durirock`)

| Repo | Qué es | Publica en |
|---|---|---|
| `musicosmosonline` | Los universos 3D, carpeta `public/` | https://durirock.github.io/musicosmosonline/public/ |
| `chamlanquimyxperiments` | El sitio, incluye la app web de KP en `kpmovil/` | https://chamalnquimyst.com (y `/kpmovil/`) |

KP del PC **no está en GitHub**. Vive en el PC de Andrés (`kp826.py` es la versión más
reciente conocida; hay copia en el Proyecto de Claude). `kp_nube.py` debe estar en la misma
carpeta (KP ya lo importa al arrancar).

### Los universos (`musicosmosonline/public/`)

| id | archivo | nombre |
|---|---|---|
| sol | `chamalnquimyst.html` | El Sol de Voluntad (mapa central; v5.3 con Durakinesis) |
| musicosmos | `index.html` | Musicosmos |
| kalpa | `kalpa.html` | Kalpa (túnel entre mundos) |
| planetafunk | `aerocosmos.html` | Planeta Funk / Cartógrafo |
| sagitario | `sinfonia_gravitacional.html` | Sagitario A* (agujero negro) |
| mundointerior | `mundointerior_completo.html` | Mundo Interior |
| pikitipu | `pikitipu2.html` | Pikitipu |
| kairos | `tiempo.html` | Kairós |

Todos cargan **`portal.js`** (`<script src="portal.js" data-mundo="...">`). Ese archivo es el
"tejido conectivo": portales 3D, transiciones, astrolabio (tecla º), radio continua, Mu,
viaje iniciático, creación de portales y el modo "Viaje por los universos". Expone
`window.Portal`. Léelo completo antes de tocar el ecosistema: está comentado en español.

### Cómo hablan hoy los universos con KP del PC

- HTTP `http://127.0.0.1:5000/api/...` (Flask dentro de KP): `/api/egg` (huevo vivo),
  `/api/pendientes`, `/api/micelator-task`, `/api/alimentar`, `/api/recoger`, etc.
- WebSocket `ws://127.0.0.1:8765`: KP emite pulsos `{"type":"TASK_COMPLETE", "pv":…, "user":…, …}`.
- Chrome exige permiso de "Acceso a red local" la primera vez (sitio público → localhost).

### La nube ya construida (12-nov-2026, PR #7 de `chamlanquimyxperiments`, fusionado)

- **App web de KP**: `chamlanquimyxperiments/kpmovil/` (`index.html`, `app.js`, `estilo.css`,
  `config.js`, `firestore.rules`, `vendor/` con Firebase compat 9.x: app, auth, firestore).
  Tareas A/B/C, timer, niveles, Pv, Mu, chat, correo, zazen ($D), huevo.
- **`kp_nube.py`** (en el PC, junto a KP): sincroniza KP ⇄ Firestore cada ~10 s con la cuenta
  de servicio. Regenera el `.cegg`. Reenvía al juego Godot y a los universos lo que llega del
  celular. Comandos: `python kp_nube.py crear-cuenta <Aspecto> <correo> <clave>` y
  `python kp_nube.py probar`.
- Guía de puesta en marcha para Andrés: Proyecto de Claude → `claude/kp-nube-guia.md`.

Esquema Firestore (de `kpmovil/firestore.rules` y `app.js`):

```
aspectos/{nombre}                 pv, pv_canjeables, mu, nivel…, _mod (ms)
aspectos/{nombre}/tareas/{id}     campos de tarea de KP + _mod; _borrada:true = borrada
chat_general/{id}                 sender, text, timestamp…
chat_privado/{id}                 sender, recipient, chat_id
correos/{id}                      sender, recipient, subject, read
dhana/{id}                        aspecto, fecha, plan_seg, real_seg, completa
huevos/{nombre}                   el .cegg del aspecto (JSON) + _mod
pulsos/{id}                       type:'TASK_COMPLETE', event_id, pv, user, user_color,
                                  task_name, task_id, priority, days_delayed,
                                  timestamp (ISO), origen:'celular', _mod
```

Cada cuenta de Auth (correo/contraseña) lleva el **claim `aspecto`**: las reglas usan
`request.auth.token.aspecto`. Un aspecto = una cuenta.

---

## 2. Estado exacto al 22-nov-2026

### Hecho y publicado
- PR #3, #4, #5 de `musicosmosonline` fusionados: portales, transiciones, radio continua.
- `kpmovil` publicado (PR #7 del sitio).

### Hecho, esperando que Andrés fusione
- **PR #6 de `musicosmosonline`** (rama `portales-semilla`): Sol con Durakinesis, grieta
  ramificada, portales con **botón de entrada**, viaje iniciático, crear portales (◎),
  Deriva por Kalpa, navegación invertida (tecla I), Planeta Funk precalentado en el túnel,
  relevo radio ⇄ groove, sol y luna con la radio, **Mu por cruzar (1) y crear (2)**,
  energía de Musicosmos (30) por crear, **Viaje por los universos**. Este documento va ahí.

### Pendiente del lado de Andrés (sin esto la nube no arranca)
1. Crear el proyecto Firebase `killer-pendiente` (Auth correo/contraseña + Firestore en
   `southamerica-east1`), pegar `firestore.rules`, y autorizar los dominios
   `chamalnquimyst.com` **y `durirock.github.io`** (este último hace falta para la fase B).
2. Pegar el `firebaseConfig` en `kpmovil/config.js` (no es secreto).
3. Descargar `firebase_clave.json` (secreto) a la carpeta de KP; `pip install firebase-admin`.
4. `python kp_nube.py crear-cuenta Ralok correo clave` (una por aspecto); `python kp_nube.py probar`.
5. Pegar en KP el parche `kp/parche_api_mu.py` (rutas `/api/mu` y `/api/gastar`), justo
   después de la ruta `/api/recoger`. Sin él, los portales no cobran (viaje libre).

---

## 3. El objetivo que sigue

> "Dejar Firebase funcional y que KP web se entrelace con el ecosistema: que al abrirlo,
> Musicosmos y todos los universos lo detecten conectado, como cuando está KP en el PC."

Hoy los universos solo conocen a KP del PC (localhost). Si el PC está apagado y Andrés usa
KP en el celular o la tablet, los universos no se enteran. La meta es que la nube sea un
segundo "KP" al que los universos se conectan igual.

### Fase A · Firebase funcionando (con Andrés, ~30 min)
Acompáñalo en los pasos de la sección 2. Verifica:
- `python kp_nube.py probar` responde bien.
- Entra a `https://chamalnquimyst.com/kpmovil/` con el correo del aspecto y ve sus tareas.
- Completa una tarea en el celular → en el PC aparece completada (≤10 s) y el `.cegg` se
  regenera → con KP abierto, Musicosmos recibe el pulso.
Si algo falla aquí, **no avances**: es la base.

### Fase B · `cosmos-nube.js`: los universos escuchan la nube (código nuevo)
Un solo archivo nuevo en `musicosmosonline/public/cosmos-nube.js`, cargado por `portal.js`
(no por cada mundo). Diseño recomendado (devolución ya dada a Andrés en esta línea):

1. **Detectar quién está.** Al cargar, probar KP del PC (`fetch http://127.0.0.1:5000/api/mu`
   con timeout 1,5 s). Si responde, **no hacer nada**: KP del PC ya reenvía lo del celular.
   Si no responde, activar el modo nube.
2. **Sesión.** Firebase Auth en el origen `durirock.github.io` (es otro origen que
   `chamalnquimyst.com`, así que pide iniciar sesión una vez; Firebase la recuerda).
   Reutiliza el SDK compat de `kpmovil/vendor/` (cópialo a `public/vendor/firebase/`) y el
   mismo `firebaseConfig`. Pequeño panel de entrada, sin emojis, estética de `portal.js`.
3. **Socket virtual (cero cambios por mundo).** Los mundos abren
   `new WebSocket('ws://127.0.0.1:8765')`. En modo nube, envolver `window.WebSocket` para
   esa URL y devolver un objeto falso que dispara `onmessage`/`message` con cada documento
   nuevo de `pulsos` (`where('timestamp','>', ahoraISO)`), serializado como el JSON que ya
   manda KP. Debe cargarse **antes** que los scripts del mundo (`portal.js` va primero en
   todos, así que basta con que `portal.js` lo cargue de forma síncrona o lo incluya).
4. **Huevo virtual.** Envolver `fetch` para `127.0.0.1:5000/api/egg` → responder con el
   documento `huevos/{aspecto}`. Así Musicosmos se puebla igual que con el PC.
5. **Presencia.** Mostrar en el astrolabio "◆ KP · nube · Ralok" o "◆ KP · PC". Opcional:
   documento `presencia/{aspecto}` con latido cada 30 s desde `kpmovil` para que los
   universos sepan si la app web está abierta (requiere regla nueva).
6. **Mu sin PC.** `Portal.mu` (en `portal.js`) hoy cobra en `127.0.0.1:5000/api/gastar`.
   En modo nube: **no restes directo** `aspectos/{yo}.mu`. `kp_nube.py` suma Pv/Mu de ambos
   lados, y un descuento hecho en la nube podría perderse o duplicarse al sincronizar.
   Mejor un evento: colección `gastos/{id}` `{aspecto, cantidad, motivo, mundo, _mod}` que
   `kp_nube.py` aplica una sola vez (marca `aplicado:true`), y en la nube se muestra el saldo
   estimado (`mu − gastos no aplicados`). **Revisa primero cómo `kp_nube.py` fusiona `mu`**
   (pídele el archivo a Andrés). Reglas nuevas: `gastos` crear solo con `aspecto == yo()`,
   leer solo propios.

### Fase C · KP web ve el ecosistema
- En `kpmovil`, un botón "Abrir universos" que lleve a
  `https://durirock.github.io/musicosmosonline/public/chamalnquimyst.html`.
- Si quieren ir más allá: que los universos escriban eventos (Pv por portales, fragmentos)
  en `pulsos` con `origen:'universo'` y KP web los muestre. Ya existe la regla de crear
  pulsos propios.

### Fase D (más adelante, no empezar sin que Andrés lo pida)
Godot (Guardianes del Umbral) con el plugin GodotFirebase; modo equipo/multijugador. El
diseño acordado el 6-nov: Firestore como estado vivo; el `.cegg` como "archivo de oro"
reconstruido desde un registro de eventos inmutable; KP del PC como único "escriba".

---

## 4. Cómo probar (lo que usó Claude)

- Chrome sin pantalla con Playwright (Python), WebGL por swiftshader:
  `--use-gl=swiftshader --enable-unsafe-swiftshader --autoplay-policy=no-user-gesture-required`.
- Servir `public/` con `python -m http.server` y desviar las CDN (three.js r128/r145/r165,
  tween) a copias locales de npm.
- Comparar errores de página contra `main` en los 8 mundos antes de cada PR.
- Para la radio: interceptar `**/*zeno.fm/**` y responder con un mp3 local con CORS.
- Para Firebase: usa el **emulador de Firestore/Auth** (`firebase emulators:start`) antes
  de tocar el proyecto real.
- PRs: `gh pr create` falla en este entorno; se usó
  `gh api repos/durirock/musicosmosonline/pulls -f head=RAMA -f base=main -f title=… -f body=…`.

---

## 5. Pendientes menores anotados

- Joypad (Ultra Game) para el astrolabio y para el botón "Entrar" de los portales.
- Botón táctil para la navegación invertida de Kalpa (hoy solo tecla I).
- Pilotos propios para Mundo Interior, Pikitipu y Kairós en el "Viaje por los universos"
  (hoy la cámara queda quieta en ellos): `Portal.viaje.registrar({ iniciar, detener })`.
- En Mundo Interior, si suena la radio ambiental y se enciende una radio forjada, se oyen dos.
- Confirmar con Andrés que el agujero de Sagitario A* lleve siempre a Mundo Interior.
- `chamalnquimystdurakinesis.html` quedó como copia; el Sol vigente es `chamalnquimyst.html`.

---

## 6. El sentido de todo esto

KP nació para vencer la procrastinación ante volver a estudiar. No castiga: premia cruzar
el umbral. Los universos son el espejo: cada tarea hecha puebla el cosmos, el Sol de
Voluntad crece, los portales cuestan Mu ganado con acciones reales. La nube existe para que
ese espejo esté disponible en cualquier dispositivo sin depender del archivo físico, con el
`.cegg` del PC como verdad de respaldo. Cuida esa intención por sobre cualquier detalle técnico.

La versión completa de este traspaso, con contexto personal, está en el Proyecto de Claude
(`claude/traspaso-gemini.md`). Pídesela a Andrés si no la tienes.
