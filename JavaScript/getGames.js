async function getGames() {
    try {
        const response = await fetch('/api/games'); //Dove si trova la collezione
        const games = await response.json();

        const tableBody = document.querySelector('#gamesTable tbody');
        tableBody.innerHTML = '';

        games.forEach(game => {
            const row = document.createElement('tr');
            const cellName = document.createElement('td');
            const cellDetails = document.createElement('td');
            
            cellName.textContent = game.name; // Supponendo che tu abbia un campo 'name'
            cellDetails.textContent = JSON.stringify(game); // Mostra i dettagli in formato JSON
            
            row.appendChild(cellName);
            row.appendChild(cellDetails);
            
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

// Carica i dati quando la pagina è pronta
window.onload = getGames;