const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const geoip = require('geoip-lite');

// --- CONFIGURACIÓN ---
const PORT = process.env.PORT || 8080;
const LOG_FILE = path.join(__dirname, 'historia_cosmos.jsonl');
const INDEX_FILE = path.join(__dirname, 'public', 'index.html');

// ═══════════════════════════════════════════════════════════════
// CUERPO CALLOSO — tracking de Killer Pendiente (singleton)
// ═══════════════════════════════════════════════════════════════
let kpSocket = null;

// --- SERVIDOR HTTP (Web + Logs) --- ORIGINAL INTACTO ---
const server = http.createServer((req, res) => {

    // 1. RUTA SECRETA: Descargar Logs (Estudio Sociológico) — ORIGINAL
    if (req.url === '/bita-cora-secreta') {
        fs.readFile(LOG_FILE, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("Aun no hay historia registrada.");
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Disposition': 'attachment; filename="historia_cosmos.jsonl"'
            });
            res.end(data);
        });

    // 2. NUEVO: /health para verificar estado del ecosistema
    } else if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            players: Object.keys(players).length,
            kp_connected: kpSocket !== null,
            timestamp: new Date().toISOString()
        }));

    // 3. RUTA PRINCIPAL: Mostrar el Juego (Frontend) — ORIGINAL
    } else if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(INDEX_FILE, (err, data) => {
            if (err) {
                console.error("Error leyendo HTML:", err);
                res.writeHead(404);
                res.end("Error: No encuentro el archivo 'index.html' en la carpeta 'public'.");
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });

    } else {
        res.writeHead(404);
        res.end("Ruta desconocida en el Musicosmos.");
    }
});

const wss = new WebSocket.Server({ server });

const players = {};
let playerCounter = 1;

// Función del Escriba — ORIGINAL INTACTA
function registrarEvento(tipo, datos) {
    const entrada = { ts: new Date().toISOString(), tipo: tipo, ...datos };
    fs.appendFile(LOG_FILE, JSON.stringify(entrada) + '\n', (err) => {
        if (err) console.error("Error log:", err);
    });
}

console.log(`Iniciando Observatorio en puerto ${PORT}...`);

wss.on('connection', (ws, req) => {

    // --- GEOLOCALIZACIÓN — ORIGINAL INTACTA ---
    const serverAssignedPlayerId = `Viajero-${playerCounter++}`;

    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip && ip.includes(',')) ip = ip.split(',')[0].trim();

    const geo = geoip.lookup(ip);
    let ubicacion = "Espacio Profundo";
    let pais = "XX";

    if (geo) {
        ubicacion = `${geo.city || 'Desconocido'}, ${geo.country}`;
        pais = geo.country;
    } else if (ip === '::1' || ip === '127.0.0.1') {
        ubicacion = "Base Local";
        pais = "LOC";
    }

    console.log(`Conexión: ${serverAssignedPlayerId} [${ubicacion}]`);
    registrarEvento('CONEXION', { id: serverAssignedPlayerId, ubicacion, pais });

    players[serverAssignedPlayerId] = {
        ws, username: serverAssignedPlayerId, location: ubicacion, lastPosition: null
    };

    // Sincronización inicial — ORIGINAL INTACTA
    for (const id in players) {
        if (id !== serverAssignedPlayerId && players[id].lastPosition) {
            ws.send(JSON.stringify({
                type: 'move',
                id: players[id].username,
                ...players[id].lastPosition,
                location: players[id].location
            }));
        }
    }

    ws.on('message', message => {
        try {
            const msgString = message.toString();
            const data = JSON.parse(msgString);

            // ═══════════════════════════════════════════════════
            // CUERPO CALLOSO — Bloque nuevo, no toca nada original
            // ═══════════════════════════════════════════════════

            // ¿Es KP anunciándose?
            if (data.type === 'KP_HELLO') {
                ws.isKP = true;
                kpSocket = ws;
                // Sacar de players (no es un jugador browser)
                delete players[serverAssignedPlayerId];
                console.log(`[KP] ✅ Killer Pendiente conectado [${ubicacion}]`);
                ws.send(JSON.stringify({
                    type: 'KP_ACK',
                    status: 'connected',
                    players: Object.keys(players).length
                }));
                // Avisar a browsers que KP está online
                wss.clients.forEach(client => {
                    if (client !== kpSocket && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'KP_STATUS', online: true }));
                    }
                });
                return;
            }

            // Mensajes de KP → rebroadcast a todos los browsers
            if (ws.isKP) {
                wss.clients.forEach(client => {
                    if (client !== kpSocket && client.readyState === WebSocket.OPEN) {
                        client.send(msgString);
                    }
                });
                console.log(`[KP] 📡 → ${Object.keys(players).length} browsers: ${msgString.slice(0, 60)}`);
                return;
            }

            // ═══════════════════════════════════════════════════
            // FIN BLOQUE KP — todo lo que sigue es ORIGINAL INTACTO
            // ═══════════════════════════════════════════════════

            if (data.id && players[serverAssignedPlayerId].username !== data.id) {
                players[serverAssignedPlayerId].username = data.id;
            }

            // Inyectar ubicación al mensaje — ORIGINAL
            data.location = players[serverAssignedPlayerId].location;

            if (data.type === 'move') {
                players[serverAssignedPlayerId].lastPosition = {
                    x: data.x, y: data.y, z: data.z, yaw: data.yaw, pitch: data.pitch
                };
            } else if (data.type === 'note_on') {
                registrarEvento('INTERACCION_MUSICAL', {
                    autor: data.id,
                    origen: players[serverAssignedPlayerId].location,
                    nota: data.note,
                    velocidad: data.velocity
                });
            }

            // Broadcast a TODOS — ORIGINAL INTACTO (KP excluido)
            const finalMsg = JSON.stringify(data);
            wss.clients.forEach(client => {
                if (client !== kpSocket && client.readyState === WebSocket.OPEN) {
                    client.send(finalMsg);
                }
            });

        } catch (e) { console.error(e); }
    });

    ws.on('close', () => {
        // ¿Era KP?
        if (ws.isKP) {
            kpSocket = null;
            console.log('[KP] ⚠️  Killer Pendiente desconectado.');
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'KP_STATUS', online: false }));
                }
            });
            return;
        }

        // Era browser — ORIGINAL INTACTO
        const p = players[serverAssignedPlayerId];
        if (p) {
            registrarEvento('DESCONEXION', { id: p.username });
            delete players[serverAssignedPlayerId];
            const disconnectMsg = JSON.stringify({ type: 'disconnect', id: p.username });
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) client.send(disconnectMsg);
            });
        }
    });
});

// ORIGINAL INTACTO
server.listen(PORT, '0.0.0.0', () => {
    console.log(`--> Servidor listo en puerto ${PORT}`);
    console.log(`--> Sirviendo desde: ${INDEX_FILE}`);
    console.log(`--> /health para estado del ecosistema`);
    console.log(`--> /bita-cora-secreta para logs`);
});
