const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT;
const URI = process.env.DB_CONNECTION_URI;
const client = new MongoClient(URI);

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("Questions")
      .findOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const quertString = req.query;

    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("Questions")
      .aggregate([
        {
          $lookup: {
            from: "Answers",
            localField: "_id",
            foreignField: "questionID",
            as: "answers",
          },
        },
        {
          $sort: { createTime: quertString.asc === "true" ? 1 : -1 },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTodo = {
      name: req.body.name,
      surname: req.body.surname,
      isEdited: req.body.isEdited,
      createTime: req.body.createTime,
      editedAt: req.body.editedAt,
      title: req.body.title,
      question: req.body.question,
      writerID: new ObjectId(req.body.writerID),
    };
    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("Questions")
      .insertOne(newTodo);
    await con.close();
    res.status(201).send("question was successfully added");
  } catch (error) {
    res.status(400).send(console.error(error.message));
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatingTodo = {
      title: req.body.title,
      question: req.body.question,
      isEdited: true,
      editedAt: req.body.editedAt,
    };

    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: updatingTodo };

    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("Questions")
      .updateOne(filter, updateDoc);

    await con.close();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("Questions")
      .deleteOne({ _id: new ObjectId(id) });
    await client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
