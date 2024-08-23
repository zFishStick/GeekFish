async function getGames() {
    try {
        const response = await fetch('/api/games'); // Recupera i dati dalla collezione
        const games = await response.json();

        const grid = document.getElementById('main-grid');

        games.forEach(game => {
            const col = document.createElement('div');
            col.classList.add('col');

            // Crea l'elemento <img> e assegna l'URL dell'immagine
            const img = document.createElement('img');
            img.classList.add('game-img');
            img.src = game.img; // Assegna direttamente l'URL dell'immagine
            img.alt = game.name; // Imposta un alt tag con il nome del gioco
            col.appendChild(img);

            // Crea un div per il nome del gioco
            const row = document.createElement('div');
            row.classList.add('p-3');
            row.textContent = game.name; // Assegna direttamente il nome del gioco
            col.appendChild(row);

            grid.appendChild(col);
        });
    } catch (error) {
        console.error('Errore nel recupero dei dati:', error);
    }
}

// Carica i dati quando la pagina è pronta
window.onload = getGames;
