require("dotenv").config();

const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

const URI = process.env.DB_CONNECTION_URI;
const client = new MongoClient(URI);
router.use(cors());

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
    };

    if (!newUser.name) {
      return res.send({ error: "name is required" });
    }
    if (!newUser.surname) {
      return res.send({ error: "surname is required" });
    }
    if (!newUser.email) {
      res.send({ error: "email is required" });
    }
    if (!newUser.password) {
      res.send({ error: "password is required" });
    }
    const con = await client.connect();

    const existingUser = await con
      .db("ManoDB")
      .collection("users")
      .findOne({ email: newUser.email });

    if (existingUser) {
      await con.close();
      return res.status(400).send({ error: "email is already taken" });
    }

    await con.db("ManoDB").collection("users").insertOne(newUser);

    await con.close();

    res.status(201).send({ success: "User was successfully created " });
  } catch (error) {
    res.status(500).send({ error: "something went wrond" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = { email: req.body.email, password: req.body.password };
    const con = await client.connect();
    const data = await con
      .db("ManoDB")
      .collection("users")
      .findOne({ email: user.email });
    await con.close();
    if (!data) {
      return res.status(404).send({ error: "user no found" });
    }
    const match = await bcrypt.compare(user.password, data.password);
    if (match) {
      const accessToken = jwt.sign(user, process.env.JWT_SECRET);
      return res.send({ accessToken: accessToken, data: data });
    } else {
      res.status(404).send({ error: "invalid password" });
    }
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;
