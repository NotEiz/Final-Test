require("dotenv").config();

const express = require("express");
const cors = require("cors");
const users = require("./routes/users");
const Questions = require("./routes/questions");
const Answers = require("./routes/answers");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;

app.use("/", users);
app.use("/Questions", Questions);
app.use("/Answers", Answers);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
