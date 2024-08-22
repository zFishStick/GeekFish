const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017'; // Cambia se usi un'URL diversa
const dbName = 'GamesDB';

app.use(express.static(path.join(__dirname, '../')));

// Rotta per la root per servire 'index.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Route per ottenere i dati dei giochi
app.get('/api/games', async (req, res) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('games-collection');
        const games = await collection.find({ name: "Minecraft" }).toArray();

        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
