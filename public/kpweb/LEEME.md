# Killer Pendiente · web (celular y PC)

Usa los mismos datos de Firebase que kpmovil (`config.js`, `firestore.rules` y `vendor/` vienen de ahí, sin cambios).
Reglas de Pv, niveles, extensiones, cierre "en mi vida", objetivos semanales y recompensas: idénticas a kp828.py.

## Dónde está
https://durirock.github.io/musicosmosonline/public/kpweb/ — mismo origen que los universos 3D,
así que comparten la sesión de Firebase (entras una vez y los universos te reconocen).
Ábrela en Chrome y elige "Instalar app" / "Agregar a pantalla de inicio".

## Bitácoras (personal, cósmica y Gran Bitácora)
Usan tres colecciones nuevas: `bitacora`, `bitacora_cosmica` y `gran_bitacora`, con el mismo formato que
history.json, cosmic_history.json y gran_history.json de KP. Para que funcionen hay que publicar las reglas
de `firestore.rules` de esta carpeta (Firebase → Firestore → Reglas → pegar → Publicar). Sin eso, todo lo
demás funciona y la bitácora avisa "No se pudo guardar".
La bitácora cósmica es compartida (todos la leen, como en KP); la personal es solo de su aspecto.
Para que el PC las vea, kp_nube.py debe sincronizar esas tres colecciones con sus archivos.

## Mega Task (jefe final, como kp828 v8.27)
Vive en el documento `mega/estado` = {activa, historial}, el mismo formato que mega_task.json.
Fase cumplida: −15 de vida (mínimo 10) y el 20% de sus Pv para cada aspecto. Vencerlo (timer o en la vida):
Pv × 2/3/5/7 al azar (50/30/15/5 %) para todos, sin calibración. Solo su dueño lo puede destronar desde la web.
Necesita la regla `match /mega/{doc}` de firestore.rules. Para que el PC lo vea, kp_nube.py debe sincronizar
`mega/estado` con mega_task.json.

## Ventana flotante
- PC (Chrome / Edge): al iniciar el timer se abre una ventana siempre encima, con "listo", "me distraje"
  y todas las preguntas de cierre dentro de ella.
- Android (Chrome): el timer flota sobre cualquier app. Si no aparece, revisa
  Ajustes de Android → Apps → Chrome → Pantalla en pantalla = permitido.
  Al terminar llega una notificación (acepta el permiso la primera vez).
- iPhone (Safari): flota como video; mismas notas.
- Botón ⧉ en el timer para abrirla a mano. Se desactiva en Ser → Ajustes.

## Captura rápida
`llamar al dentista !A 15m 40pv #semanal #grande` — si falta Pv o duración se abre el formulario (KP exige ambos).

## El Hermilaño · Semillero (escribir siembra Mu)
El botón "El Hermitaño" de KP web abre `../hermitano.html?desde=kp`: el editor toma el aspecto de la sesión
(mismo origen, misma sesión de Firebase) y muestra "escribe ◉ Aspecto" junto al título del capítulo. Esa nota
nunca entra al texto ni a lo exportado. Abierto solo (sin `?desde=kp`) es modo Dios: sin usuario, y todo lo
sembrado va al Bosque Común.

Qué escribe en Firestore (lo mismo hace la versión PC, hermitano_v3.py, con firebase_clave.json):
- `aspectos/{aspecto}`: `mu`, `pv` y `pv_canjeables` con incrementos. kp_nube.py ya los suma a KP en el PC.
- `escritores/{aspecto}`: palabras por día (la racha se comparte entre PC y celular) y totales.
- `escritura/{sesión}`: bitácora de sesiones (palabras, Mu, Pv, etapa máxima, hitos).
- `fondo/pulmon_verde`: el Bosque Común (`semillas`, `palabras`): un 10 % que pone el universo, o todo en modo Dios.
- `pulsos`: `type: "ESCRITURA_HITO"` en cada hito; KP del PC los reenvía en vivo a los universos.

Hay que publicar las reglas nuevas de `firestore.rules` (escritores, escritura, fondo). Sin ellas los Mu y Pv
del aspecto igual llegan (esa regla ya existía); lo demás queda guardado en el navegador y se reintenta.
Reglas del Semillero: ver el comentario "SEMILLERO" en hermitano.html (son las mismas del PC).
