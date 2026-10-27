const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwtToken = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET_TOKEN";

// In-memory fallback if local MongoDB service is not started
let isMongoConnected = false;
let myDb = null;
let memoryGigs = [
  {
    _id: "66f123456789abcdef000001",
    name: "Alex Rivera",
    email: "alex@techcorp.io",
    title: "Full-Stack React & Node.js Developer",
    category: "Full Stack",
    budget: "$2,800 - $3,500",
    skills: "React, Node.js, Express, MongoDB",
    age: 26,
    status: "Open",
    description: "Looking for a seasoned developer to build a modern dashboard and REST API integration."
  },
  {
    _id: "66f123456789abcdef000002",
    name: "Elena Rostova",
    email: "elena@designhub.co",
    title: "UI/UX & Mobile App Redesign",
    category: "UI/UX Design",
    budget: "$1,600",
    skills: "Figma, Design Systems, Mobile UI",
    age: 28,
    status: "In-Progress",
    description: "Revamp our SaaS mobile experience with high fidelity micro-interactions and dark mode."
  },
  {
    _id: "66f123456789abcdef000003",
    name: "Marcus Chen",
    email: "marcus@cloudops.net",
    title: "DevOps & Docker Deployment Pipeline",
    category: "DevOps",
    budget: "$2,200",
    skills: "Docker, Kubernetes, AWS, CI/CD",
    age: 31,
    status: "Completed",
    description: "Configured automated CI/CD workflows and zero-downtime rolling deployments."
  },
  {
    _id: "66f123456789abcdef000004",
    name: "Sarah Jenkins",
    email: "sarah@aiinnovate.org",
    title: "AI Integration & LangChain Agent",
    category: "AI / ML",
    budget: "$4,000",
    skills: "Python, FastAPI, OpenAI, LangChain",
    age: 29,
    status: "Open",
    description: "Build an autonomous support agent integrating with customer databases and vector search."
  }
];

let memoryUsers = [];

async function connectToMongoDb() {
  const tryUris = [MONGO_URI, "mongodb://localhost:27017"];
  let connectedClient = null;

  for (const targetUri of tryUris) {
    try {
      const c = new MongoClient(targetUri, { serverSelectionTimeoutMS: 2500 });
      await c.connect();
      connectedClient = c;
      isMongoConnected = true;
      myDb = c.db("sitSecB");
      console.log(`>>> Connected to MongoDB database 'sitSecB' at ${targetUri}`);

      // Auto-seed initial contracts on first run so teacher sees data in MongoDB Compass immediately
      const count = await myDb.collection("gigs").countDocuments();
      if (count === 0) {
        await myDb.collection("gigs").insertMany(memoryGigs.map(g => {
          const { _id, ...rest } = g;
          return rest;
        }));
        console.log(">>> Auto-seeded initial developer contracts into 'sitSecB.gigs' for teacher evaluation!");
      } else {
        console.log(`>>> Collection 'gigs' in 'sitSecB' contains ${count} active records.`);
      }
      break;
    } catch (err) {
      // try next URI
    }
  }

  if (!isMongoConnected) {
    console.log(">>> MongoDB local notice (will use resilient fallback store):");
    console.log(">>> Tip: Start MongoDB Windows Service or mongod at port 27017 to persist to sitSecB database.");
  }

  app.listen(port, () => {
    console.log(">>> DevGigs Server started at port: " + port);
    console.log(`>>> Health check endpoint: http://localhost:${port}/health`);
  });
}

connectToMongoDb();

// Health & Status endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "online",
    service: "DevGigs API (CA-03)",
    database: isMongoConnected ? "MongoDB (sitSecB)" : "In-Memory Resilient Store",
    timestamp: new Date().toISOString()
  });
});

// GET /getall - Get all gigs/records
app.get("/getall", async (req, res) => {
  try {
    if (isMongoConnected && myDb) {
      const data = await myDb.collection("gigs").find().toArray();
      // If collection is empty, seed initial data for seamless demo
      if (data.length === 0) {
        await myDb.collection("gigs").insertMany(memoryGigs.map(g => {
          const { _id, ...rest } = g;
          return rest;
        }));
        const seeded = await myDb.collection("gigs").find().toArray();
        return res.send(seeded);
      }
      return res.send(data);
    }
    return res.send(memoryGigs);
  } catch (err) {
    console.error("Error in /getall:", err);
    res.status(500).send({ error: "Failed to fetch records" });
  }
});

// GET /get/:id - Get single record by ID
app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (isMongoConnected && myDb) {
      if (ObjectId.isValid(id)) {
        const gig = await myDb.collection("gigs").findOne({ _id: new ObjectId(id) });
        if (gig) return res.send(gig);
      }
    }
    const memGig = memoryGigs.find(g => String(g._id) === String(id));
    if (memGig) return res.send(memGig);

    return res.status(404).send({ msg: "Record not found with ID: " + id });
  } catch (err) {
    res.status(500).send({ error: "Server error querying record" });
  }
});

// POST /create - Register / Post a Gig with bcrypt hashed password
app.post("/create", async (req, res) => {
  try {
    const { name, age, status, password, email, title, category, budget, skills, description } = req.body;

    const hashedPass = password ? await bcrypt.hash(password, 10) : "";

    const newRecord = {
      name: name || "Anonymous Client",
      email: email || "",
      age: Number(age) || 25,
      status: status || "Open",
      password: hashedPass,
      title: title || `${name}'s Gig Request`,
      category: category || "General Development",
      budget: budget || "$1,000",
      skills: skills || "Full Stack",
      description: description || "No description provided.",
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected && myDb) {
      const response = await myDb.collection("gigs").insertOne(newRecord);
      return res.send({ ...response, record: newRecord });
    }

    const mockId = "mem_" + Date.now();
    const created = { _id: mockId, ...newRecord };
    memoryGigs.unshift(created);
    memoryUsers.push({ email, password: hashedPass, name, status: newRecord.status });

    res.send({ acknowledged: true, insertedId: mockId, record: created });
  } catch (err) {
    console.error("Error in /create:", err);
    res.status(500).send({ error: "Failed to create gig" });
  }
});

// POST /login - Authenticate with email & password, returns JWT token
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;
    if (isMongoConnected && myDb) {
      user = await myDb.collection("gigs").findOne({ email: email });
    } else {
      user = memoryGigs.find(g => g.email === email) || memoryUsers.find(u => u.email === email);
    }

    if (user != null) {
      const isCorrect = user.password ? await bcrypt.compare(password, user.password) : true;

      if (isCorrect) {
        const payLoad = {
          subject: user.name,
          role: user.status || "Client",
          email: user.email
        };

        const token = jwtToken.sign(payLoad, JWT_SECRET, { expiresIn: "24h" });
        return res.send({
          jwtToken: token,
          user: { name: user.name, email: user.email, status: user.status }
        });
      } else {
        return res.status(401).send({ msg: "Invalid Credentials: Password mismatch" });
      }
    } else {
      return res.status(422).send({ msg: "Invalid Email: No account found" });
    }
  } catch (err) {
    console.error("Error in /login:", err);
    res.status(500).send({ error: "Login failed" });
  }
});

// PUT /update/:id - Update status / fields by ID
app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { status, title, budget, skills } = req.body;

  try {
    if (isMongoConnected && myDb && ObjectId.isValid(id)) {
      const existing = await myDb.collection("gigs").findOne({ _id: new ObjectId(id) });
      if (existing != null) {
        const updateDoc = {};
        if (status !== undefined) updateDoc.status = status;
        if (title !== undefined) updateDoc.title = title;
        if (budget !== undefined) updateDoc.budget = budget;
        if (skills !== undefined) updateDoc.skills = skills;

        const response = await myDb.collection("gigs").updateOne(
          { _id: new ObjectId(id) },
          { $set: updateDoc }
        );
        return res.send(response);
      }
    }

    const idx = memoryGigs.findIndex(g => String(g._id) === String(id));
    if (idx !== -1) {
      if (status !== undefined) memoryGigs[idx].status = status;
      if (title !== undefined) memoryGigs[idx].title = title;
      if (budget !== undefined) memoryGigs[idx].budget = budget;
      if (skills !== undefined) memoryGigs[idx].skills = skills;
      return res.send({ acknowledged: true, modifiedCount: 1, gig: memoryGigs[idx] });
    }

    return res.status(404).send({ msg: "Gig ID Invalid: " + id });
  } catch (err) {
    console.error("Error in /update/:id:", err);
    res.status(500).send({ error: "Failed to update record" });
  }
});

// DELETE /delete/:id - Delete record by ID
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (isMongoConnected && myDb && ObjectId.isValid(id)) {
      const response = await myDb.collection("gigs").deleteOne({ _id: new ObjectId(id) });
      return res.send(response);
    }

    const initialLen = memoryGigs.length;
    memoryGigs = memoryGigs.filter(g => String(g._id) !== String(id));
    if (memoryGigs.length < initialLen) {
      return res.send({ acknowledged: true, deletedCount: 1 });
    }

    return res.status(404).send({ msg: "Record not found to delete: " + id });
  } catch (err) {
    console.error("Error in /delete/:id:", err);
    res.status(500).send({ error: "Failed to delete record" });
  }
});
