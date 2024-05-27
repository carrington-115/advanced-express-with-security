require("dotenv").config({ path: "./.env" });
const express = require("express");
const { connectDatabase } = require("./server/data/db");
const app = express();

app.use("./server/views");
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => console.log("server is running..."));
