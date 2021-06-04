import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { ObjectId } from "mongodb";
import ShoutOut from "../model/ShoutOut";
import { getClient } from "../db";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
    res.json({ message: "Hello World!" });
});

// 1. GET /shoutouts
app.get("/", async (req, res) => {
    try {
        const client = await getClient();
        const results = await client.db().collection<ShoutOut>('shoutOuts').find().toArray();
        res.json(results); // send JSON results
    } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    }
});

// 2. POST /shoutouts
app.post("/", async (req, res) => {
    const shoutout = req.body as ShoutOut;
    try {
        const client = await getClient();
        const result = await client.db().collection<ShoutOut>('shoutOuts').insertOne(shoutout);
        shoutout._id = result.insertedId;
        res.status(201).json(shoutout);
    } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    }
});

// DELETE /shoutouts:id
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const client = await getClient();
        const result = await client.db().collection<ShoutOut>('shoutOuts').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
        res.status(404).json({message: "Not Found"});
        } else {
        res.status(204).end();
        }
    } catch (err) {
        console.error("FAIL", err);
        res.status(500).json({message: "Internal Server Error"});
    }
});

export default functions.https.onRequest(app);