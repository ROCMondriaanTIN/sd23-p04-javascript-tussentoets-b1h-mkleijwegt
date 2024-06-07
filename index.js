import express from 'express';
import {} from 'dotenv/config';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const databaseUrl = process.env.CONNECTION_URL;
const client = new MongoClient(databaseUrl);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/icecreams', (req, res) => {
    fetchDocuments().then(icecreams => {
        res.json(icecreams);
    });
});

app.get('/cheap-icecreams', (req, res) => {
    fetchCheapDocuments().then(icecreams => {
        res.json(icecreams);
    });
});

app.post('/icecream-add', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;

    console.log(name);
    console.log(description);
    console.log(price);

    insertDocument(name, description, price).then(res.send({icecreamAdded: true}))

    ;
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
                
            
async function fetchDocuments() {
    try {
        // we verbinden de client met de server
        await client.connect();
        //hier verbinden we met de database, je moet nog wel een naam invullen
        const database = client.db('tussentoets');
        //hier verbinden we met de collectie, je moet nog wel een naam invullen
        const collection = database.collection('icecream');
        //hier halen we de documenten uit de collectie in de vorm van een array
        const documents = await collection.find().toArray();
        //uiteindelijk geven we de documenten terug
        return documents;
    } finally {
        //we zorgen ervoor dat aan het einde de database verbinding weer wordt gesloten
        await client.close();
    }
}

async function fetchCheapDocuments() {
    try {
        // we verbinden de client met de server
        await client.connect();
        //hier verbinden we met de database, je moet nog wel een naam invullen
        const database = client.db('tussentoets');
        //hier verbinden we met de collectie, je moet nog wel een naam invullen
        const collection = database.collection('icecream');
        //hier halen we de documenten uit de collectie in de vorm van een array
        const documents = await collection.find({ price: { $lt: 5 } }).toArray();
        //uiteindelijk geven we de documenten terug
        return documents;
    } finally {
        //we zorgen ervoor dat aan het einde de database verbinding weer wordt gesloten
        await client.close();
    }
}

async function insertDocument(name, description, price) {
    try {
        // we verbinden de client met de server
        await client.connect();
        //hier verbinden we met de database, je moet nog wel een naam invullen
        const database = client.db('tussentoets');
        //hier verbinden we met de collectie, je moet nog wel een naam invullen
        const collection = database.collection('icecream');

        //het document wordt opgeslagen met insertOne
        await collection.insertOne({
            icecream: name,
            description: description,
            price: price
        });
    } finally {
        //we zorgen ervoor dat aan het einde de database verbinding weer wordt gesloten
        await client.close();
    }
}