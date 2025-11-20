const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const geoip = require('geoip-lite');

// --- CONFIGURACIÓN ---
const PORT = process.env.PORT || 8080;
const LOG_FILE = path.join(__dirname, 'historia_cosmos.jsonl');

// AJUSTE IMPORTANTE: Apuntamos a la carpeta 'public'
const INDEX_FILE = path.join(__dirname, 'public', 'index.html'); 

// --- SERVIDOR HTTP (Web + Logs) ---
const server = http.createServer((req, res) => {
    
    // 1. RUTA SECRETA: Descargar Logs (Estudio Sociológico)
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

    // 2. RUTA PRINCIPAL: Mostrar el Juego (Frontend)
    } else if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(INDEX_FILE, (err, data) => {
            if (err) {
                console.error("Error leyendo HTML:", err);
                res.writeHead(404);
                res.end("Error: No encuentro el archivo 'index.html' en la carpeta 'public'. Revise la estructura en GitHub.");
                return;
            }
            // Enviamos el HTML al navegador
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });

    } else {
        // 3. Servir otros archivos estáticos (si tuvieras imágenes o CSS en public)
        // Por ahora devolvemos 404 para mantenerlo simple
        res.writeHead(404);
        res.end("Ruta desconocida en el Musicosmos.");
    }
});

// Montamos el WebSocket sobre el mismo servidor
const wss = new WebSocket.Server({ server });

const players = {};
let playerCounter = 1;

// Función del Escriba (Guardar logs)
function registrarEvento(tipo, datos) {
    const entrada = { ts: new Date().toISOString(), tipo: tipo, ...datos };
    fs.appendFile(LOG_FILE, JSON.stringify(entrada) + '\n', (err) => {
        if (err) console.error("Error log:", err);
    });
}

console.log(`Iniciando Observatorio en puerto ${PORT}...`);

wss.on('connection', (ws, req) => {
    const serverAssignedPlayerId = `Viajero-${playerCounter++}`;
    
    // Geolocalización
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

    // Sincronización inicial
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

            if (data.id && players[serverAssignedPlayerId].username !== data.id) {
                players[serverAssignedPlayerId].username = data.id;
            }
            
            // Inyectar ubicación al mensaje
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

            const finalMsg = JSON.stringify(data);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) client.send(finalMsg);
            });

        } catch (e) { console.error(e); }
    });

    ws.on('close', () => {
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

// IMPORTANTE: Escuchar en 0.0.0.0 para Render
server.listen(PORT, '0.0.0.0', () => {
    console.log(`--> Servidor listo en puerto ${PORT}`);
    console.log(`--> Sirviendo desde: ${INDEX_FILE}`);
});
