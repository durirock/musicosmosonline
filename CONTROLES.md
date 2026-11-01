# Controles de Musicosmos: joypad y MIDI

Musicosmos se puede manejar con cualquier joypad (USB o Bluetooth) y con cualquier
teclado o controlador MIDI. El preset de fábrica está pensado para el **Akai MPK mini Plus**.
Todo se configura en **⚙ Configuración → Controles** y queda guardado en el navegador.

## Dónde vive el código

Todo está dentro de `public/index.html`, en el bloque `CONTROL HUB v1.2`, justo después
del cierre del bloque `MUSIC FLIGHT`. Tiene que ir dentro del HTML porque `server.js` solo
sirve esa página: cualquier otro archivo devuelve 404.

## Joypad

### Conectarlo
1. Conecta el mando con un cable mini USB **de datos** (los cables que solo cargan no sirven).
   En Windows puedes comprobarlo con `Win + R` → `joy.cpl`.
2. Abre Musicosmos en Chrome, Edge o Firefox.
3. **Aprieta cualquier botón.** El navegador no muestra el mando hasta que lo tocas.
4. Abre ⚙ → Controles. Arriba aparece el nombre del mando, una barra por cada eje y una
   casilla numerada por cada botón, que se ilumina al apretarlo.
5. Si los sticks no responden, presiona **ANALOG/MODE** en el mando (debe encenderse la luz).
   Si una barra queda corrida estando quieto el stick, usa **Calibrar centro**.

### Modo Automático
Al conectar un mando, Musicosmos reconoce de qué tipo es y le aplica un perfil:
- **Estándar** (Xbox, PlayStation, 8BitDo, Switch Pro): botones 0–9 y cruceta como botones 12–15.
- **Genérico USB** (como el Ultra Game y la mayoría de los mandos baratos): reconoce la
  cruceta tipo *hat* en el eje en que venga y ordena los botones por su posición física.

| Control | Acción |
|---|---|
| Stick izquierdo | mover (en órbita: velocidad y distancia) |
| Stick derecho | girar y mirar |
| ✕ / A | hipersalto (mantener) |
| ○ / B | cambiar vista |
| □ / X | orbitar púlsar cercano |
| △ / Y | salir de órbita |
| L1 / R1 | bajar / subir |
| L2 / R2 | estela / reproducir trazo |
| Select / Start | configuración / vuelo musical |
| Cruceta ↑ ↓ | subir / bajar |
| Cruceta ← → | octava del XenoSynth − / + |

### Modo Manual
Cada fila tiene dos líneas:
- **Arriba, la entrada:** tipo (Botón, Cruceta, Eje +, Eje −), su número y, si es cruceta,
  la dirección. El número es el que se ilumina en la vista en vivo. También puedes pulsar
  **Asignar** y apretar el botón físico.
- **Abajo, la acción:** lo que hace esa entrada.

Los ejes analógicos se editan escribiendo su número; marca **inv** si van al revés.

Si cambias cualquier fila estando en Automático, ese mando pasa a Manual. Cada mando
guarda su propia configuración. Al volver a Automático, tu configuración manual queda
guardada y reaparece al elegir Manual otra vez. **Restaurar automático** la borra.

## MIDI

Todos los dispositivos MIDI se activan solos al conectarlos (se puede desactivar).
El **monitor** muestra cada mensaje que entra: canal, nota o CC, y valor.

Preset para el MPK mini Plus:
- **Teclas:** tocan notas.
- **Pads banco A** (notas 36–43, canal 10): hipersalto, vista, orbitar, salir de órbita,
  vuelo musical, estela, reproducir trazo, órbita fija/cometa.
- **Pads banco B** (notas 44–51): subir, bajar, XenoSynth, configuración, teletransporte,
  play y stop del MIDI, estéreo 3D.
- **Perillas K1–K8** (CC 70–77): sensibilidad del vuelo, tamaño de galaxia, volumen de
  púlsares, volumen de playlist, zoom, velocidad máxima, distancia de órbita, volumen del XenoSynth.
- **Joystick:** el eje X (pitch bend) hace virar el vuelo; el eje Y (CC1/CC2) sube y baja.

Cada fila se edita a mano: tipo (Nota o CC), canal (`ch *` = cualquiera), número y
acción o parámetro. **Aprender** asigna el próximo pad o perilla que toques, y
**+ Fila manual** crea una asignación desde cero. Los pads pueden disparar acciones, tocar
notas o hacer ambas cosas. Si las perillas de tu controlador son relativas, cambia la fila
a `rel` o `rel64`.

Con otro teclado MIDI, mira en el monitor qué manda cada control y ajusta las filas.
