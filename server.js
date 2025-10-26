// --- servidor.js (CORREGIDO) ---
const WebSocket = require('ws');
// Render nos da un puerto en la variable process.env.PORT
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });
const players = {};
let playerCounter = 1;

console.log(`Servidor de Musicosmos iniciado en el puerto ${PORT}...`);
console.log('Esperando conexiones...');

wss.on('connection', ws => {
    const serverAssignedPlayerId = `player-${playerCounter++}`; // Renombramos para claridad
    players[serverAssignedPlayerId] = { ws: ws, lastKnownUsername: null, lastPosition: null }; // Guardamos info
    console.log(`Jugador ${serverAssignedPlayerId} se ha conectado.`);

    // Ya no enviamos 'your_id', el cliente ya sabe su username.

    // Avisamos al nuevo jugador sobre los existentes (si tenemos su última posición)
    for (const id in players) {
        if (id !== serverAssignedPlayerId && players[id].lastPosition) {
            ws.send(JSON.stringify({
                type: 'move',
                id: players[id].lastKnownUsername || id, // Enviamos el username si lo sabemos
                ...players[id].lastPosition // Enviamos x, y, z, yaw, pitch
            }));
        }
    }

    ws.on('message', message => {
        try {
            const messageString = message.toString(); // Trabajar con el string
            console.log(`Recibido de ${serverAssignedPlayerId}:`, messageString);
            const data = JSON.parse(messageString);

            // IMPORTANTE: NO MODIFICAR data.id
            // Simplemente guardamos info relevante asociada al serverAssignedPlayerId

            if (data.id) {
                 players[serverAssignedPlayerId].lastKnownUsername = data.id; // Guardamos el username del cliente
            }

            if (data.type === 'move') {
                // Guardamos solo los datos de posición, sin el 'type' ni 'id'
                players[serverAssignedPlayerId].lastPosition = {
                    x: data.x, y: data.y, z: data.z, yaw: data.yaw, pitch: data.pitch
                };
            }

            // RETRANSMITIMOS EL MENSAJE *ORIGINAL* (messageString) A TODOS
            broadcast(messageString, ws); // Pasamos 'ws' para poder excluir al remitente si quisiéramos

        } catch (e) {
            console.error(`Error procesando mensaje de ${serverAssignedPlayerId}:`, e);
        }
    });

    ws.on('close', () => {
        console.log(`Jugador ${serverAssignedPlayerId} se ha desconectado.`);
        const usernameDisconnected = players[serverAssignedPlayerId]?.lastKnownUsername;
        delete players[serverAssignedPlayerId];

        // Avisamos a todos los demás usando el USERNAME que se desconectó
        if (usernameDisconnected) {
             broadcast(JSON.stringify({ type: 'disconnect', id: usernameDisconnected }), null); // null -> enviar a todos
        } else {
             // Si nunca supimos su username, usamos el ID del servidor como fallback
             broadcast(JSON.stringify({ type: 'disconnect', id: serverAssignedPlayerId }), null);
        }
    });

    ws.onerror = (error) => {
        console.error(`Error en WebSocket (${serverAssignedPlayerId}):`, error);
    }
});

// Función broadcast modificada: Acepta el string del mensaje y opcionalmente el remitente
function broadcast(messageString, senderWs) {
    wss.clients.forEach(client => {
        // Opcional: Si no quieres que el remitente reciba su propio mensaje (aunque para el loopback SÍ lo necesitas)
        // if (client !== senderWs && client.readyState === WebSocket.OPEN) {
        
        // Para que el filtro del cliente funcione, DEBEMOS enviarle su propio mensaje de vuelta
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageString);
        }
    });
}