const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const URI = process.env.DB_CONNECTION_URI;
const client = new MongoClient(URI);

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("Answers")
      .findOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error: "something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newAnswer = {
      writerID: new ObjectId(req.body.writerID),
      answer: req.body.answer,
      name: req.body.name,
      surname: req.body.surname,
      isEdited: req.body.isEdited,
      createTime: req.body.createTime,
      editedAt: req.body.editedAt,
      questionID: new ObjectId(req.body.questionID),
      isLiked: false,
      isDisliked: false,
    };
    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("Answers")
      .insertOne(newAnswer);
    await con.close();
    res.status(201).send("question was successfully added");
  } catch (error) {
    res.status(400).send(console.error(error.message));
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatingAnswer = {
      answer: req.body.answer,
      isEdited: true,
      editedAt: req.body.editedAt,
      isLiked: req.body.isLiked,
      isDisliked: req.body.isDisliked,
    };
    const updateLikes = {
      isLiked: req.body.isLiked,
      isDisliked: req.body.isDisliked,
    };

    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: req.body.answer ? updatingAnswer : updateLikes };

    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("Answers")
      .updateOne(filter, updateDoc);

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await client.connect();

    const data = await client
      .db("ManoDB")
      .collection("Answers")
      .deleteOne({ _id: new ObjectId(id) });
    await client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id/answers", async (req, res) => {
  try {
    const { id } = req.params;

    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("Questions")
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
        {
          $lookup: {
            from: "Answers",
            localField: "_id",
            foreignField: "questionID",
            as: "answers",
          },
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

module.exports = router;
