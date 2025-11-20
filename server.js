function updatePlayersList() {
    const container = document.getElementById('playersOnline');
    container.innerHTML = '';
    
    // Título con conteo
    const playerCount = Object.keys(otherPlayers).length + 1;
    const title = document.createElement('div');
    title.style.borderBottom = "1px solid #557";
    title.style.paddingBottom = "5px";
    title.style.marginBottom = "10px";
    title.innerHTML = `Exploradores: <strong>${playerCount}</strong>`;
    container.appendChild(title);
    
    // 1. TÚ (Local)
    const localItem = document.createElement('div');
    localItem.className = 'midi-device-item active';
    localItem.style.flexDirection = "column";
    localItem.style.alignItems = "flex-start";
    // Nota: Tu propia ubicación la sabe el server, no el cliente local directamente,
    // así que ponemos "Transmisión Local" o esperamos a que el server nos la rebote.
    localItem.innerHTML = `
        <div style="width:100%; display:flex; justify-content:space-between;">
            <strong>${username}</strong> <span>(Tú)</span>
        </div>
        <div style="font-size: 11px; color: #aaf; margin-top: 4px;">
            📍 Origen de Señal
        </div>
    `;
    container.appendChild(localItem);
    
    // 2. LOS DEMÁS (Remotos)
    for (const playerId in galaxies) {
        if (playerId === username) continue; // Saltarnos a nosotros mismos

        const playerItem = document.createElement('div');
        playerItem.className = 'midi-device-item';
        playerItem.style.flexDirection = "column";
        playerItem.style.alignItems = "flex-start";
        
        // Recuperamos la ubicación guardada. Si no existe, ponemos "Desconocido"
        const location = playerInfo[playerId] || "Ubicación Desconocida";
        
        playerItem.innerHTML = `
            <div style="width:100%; display:flex; justify-content:space-between;">
                <strong>${playerId}</strong>
            </div>
            <div style="font-size: 11px; color: #8f8; margin-top: 4px; display:flex; align-items:center;">
                <span style="margin-right:4px">📡</span> ${location}
            </div>
        `;
        container.appendChild(playerItem);
    }
}
