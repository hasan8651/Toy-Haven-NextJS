const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set in env");
  process.exit(1);
}

let db;
const client = new MongoClient(MONGODB_URI, {});

async function start() {
  await client.connect();
  db = client.db('smart_db'); // default db from connection string
  console.log("Connected to MongoDB");
  
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Backend listening on ${port}`));
}
start().catch(err => { console.error(err); process.exit(1); });

/**
 * Simple CORS for local dev
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // change in prod
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// GET /products  - list with optional ?q=
app.get('/products', async (req, res) => {
  try {
    const q = req.query.q || '';
    const filter = q ? { $text: { $search: q } } : {};
    const products = await db.collection('products')
      .find()      
      .toArray();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// GET /products/:id
app.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
    if (!product) return res.status(404).json({ error: 'not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// POST /products - add new (no auth or token for demo). In prod, enforce auth.
app.post('/products', async (req, res) => {
  try {
    const { title, shortDesc, fullDesc, price, priority, date, image } = req.body;
    if (!title || !shortDesc) return res.status(400).json({ error: 'missing fields' });
    const doc = {
      title,
      shortDesc,
      fullDesc: fullDesc || '',
      price: price || '',
      priority: priority || '',
      date: date || new Date().toISOString(),
      image: image || '',
      createdAt: new Date()
    };
    const result = await db.collection('products').insertOne(doc);
    res.json({ insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// DELETE /products/:id
app.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});
