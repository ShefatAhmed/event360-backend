const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xak6ecy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const eventCollection = client.db("Event360").collection("event");
    const recentEventCollection = client.db("Event360").collection("recentEvent");
    const servicesCollection = client.db("Event360").collection("services");

    //event items
    app.post("/events-items", async (req, res) => {
      const event = req.body;
      const result = await eventCollection.insertOne(event);
      res.send(result);
    });

    app.get("/events-items", async (req, res) => {
      const result = await eventCollection.find().toArray();
      res.send(result);
    });

    app.delete("/events-items/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/events-items/:id", async (req, res) => {
      const id = req.params.id;
      const event = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateData = {
        $set: {
          name: event.name,
          imglink: event.imglink,
        },
      };
      const result = await eventCollection.updateOne(filter, updateData);
      res.send(result);
    });


    //recent event

    app.post("/recent-events", async (req, res) => {
      const recentEvent = req.body;
      const result = await recentEventCollection.insertOne(recentEvent);
      res.send(result);
    });

    app.get("/recent-events", async (req, res) => {
      const result = await recentEventCollection.find().toArray();
      res.send(result);
    });

    app.delete("/recent-events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await recentEventCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/recent-events/:id", async (req, res) => {
      const id = req.params.id;
      const recentEvent = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateData = {
        $set: {
          name: recentEvent.name,
          manager: recentEvent.manager,
          imglink: recentEvent.imglink,
        },
      };
      const result = await recentEventCollection.updateOne(filter, updateData);
      res.send(result);
    });

    //services

    app.post("/services", async (req, res) => {
      const services = req.body;
      const result = await servicesCollection.insertOne(services);
      res.send(result);
    });

    app.get("/services", async (req, res) => {
      const result = await servicesCollection.find().toArray();
      res.send(result);
    });

    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/services/:id", async (req, res) => {
      const id = req.params.id;
      const services = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateData = {
        $set: {
          name: services.name,
          description: services.description,
          imglink: recentEvent.imglink,
        },
      };
      const result = await recentEventCollection.updateOne(filter, updateData);
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Event 360 is running");
});

app.listen(port, () => {
  console.log(`Event 360 is running on port ${port}`);
});
