require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_API);
const authRoutes = require("./create-user/authRoutes");

// connect client to db
client
  .connect()
  .then(() => {
    console.log("The db is connected");
  })
  .catch(() => console.log("The db is not connected"));
const db = client.db("Accounts");

// linking server and db
app.use([express.json(), express.urlencoded({ extended: true })]);
app.use("/api/user", authRoutes(db));

app.listen(process.env.PORT, () =>
  console.log("The server is running on", process.env.PORT)
);
