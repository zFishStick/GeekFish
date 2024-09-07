const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config()

const app = express();
const port = 3000;

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/GamesDB';
const dbName = 'GamesDB';

console.log(url)

// Configura le credenziali AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Usa variabili d'ambiente per maggiore sicurezza
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-1' // Regione del tuo bucket S3
});

const s3 = new AWS.S3();
const bucketName = 'pesca-games-images'; // Nome del tuo bucket S3


app.use(express.static(path.join(__dirname, '/')));
app.use('/JavaScript', express.static(path.join(__dirname, '/JavaScript')));
app.use('/Css', express.static(path.join(__dirname, '/Css')));
app.use('/Pages', express.static(path.join(__dirname, '/Pages')));
app.use('/Images', express.static(path.join(__dirname, '/Images')));

// Rotta per la root per servire 'index.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Endpoint creato automaticamente
app.get('/api/games', async (req, res) => {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('games-collection');
        const games = await collection.find().toArray();

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
