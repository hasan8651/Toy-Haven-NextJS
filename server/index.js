require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

const port = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI, {});

app.get("/", (req, res) => {
  res.send("Toy Haven server is running");
});

async function start() {
  await client.connect();
  const db = client.db("smart_db");
  const usersCollection = db.collection("users");
  const toysCollection = db.collection("toys");

  console.log("Connected to MongoDB");

  //Middleware
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
  });

  // Register
  app.post("/register", async (req, res) => {
    try {
      const { name, email, password, image } = req.body;
        if (!name || !email || !password || !image)
        return res.status(400).json({ message: "Some fields are missing" });
      const exist = await usersCollection.findOne({ email });
      if (exist)
        return res.status(400).json({ message: "User already exists" });
      const newUser = {
        name,
        email,
        password,
        image: image || "",
        createdAt: new Date(),
      };
      await usersCollection.insertOne(newUser);
      res.json({ message: "Registered successfully", user: newUser });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Login
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await usersCollection.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
      if (user.password !== password) {
        return res.status(401).json({ message: "Wrong password" });
      }
      res.json({ message: "Login success", user });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // GET /toys  
  app.get("/toys", async (req, res) => {
    try {
      const q = req.query.q || "";
      const filter = q ? { $text: { $search: q } } : {};
      const toys = await toysCollection.find().toArray();
      res.json(toys);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "server error" });
    }
  });

  // GET /popular-toys  
  app.get("/popular-toys", async (req, res) => {
    try {
      const toys = await toysCollection.find().limit(6).toArray();
      res.json(toys);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "server error" });
    }
  });


  // GET /products/:id
  app.get("/toys/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const toy = await toysCollection.findOne({ _id: new ObjectId(id) });
      if (!toy) return res.status(404).json({ error: "not found" });
      res.json(toy);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "server error" });
    }
  });

  // POST /toys 
  app.post("/toys", async (req, res) => {
    try {
      const {
        toyName,
        Category,
        pictureURL,
        sellerName,
        sellerEmail,
        price,
        rating,
        availableQuantity,
        description,
      } = req.body;
      if (!toyName || !description)
        return res.status(400).json({ error: "missing fields" });
      const doc = {
        toyName,
        Category,
        pictureURL,
        sellerName,
        sellerEmail,
        price,
        rating,
        availableQuantity,
        description,
      };
      const result = await toysCollection.insertOne(doc);
      res.json({ insertedId: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "server error" });
    }
  });

  // DELETE /toys/:id
  app.delete("/toys/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await toysCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0)
        return res.status(404).json({ error: "not found" });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "server error" });
    }
  });

app.listen(port, () => console.log(`Toy Haven server is running on port: ${port}`));
}
start().catch((err) => {
  console.error(err);
  process.exit(1);
});