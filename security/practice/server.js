require("dotenv").config({ path: "../.env" });
const express = require("express");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_API);
const app = express();
app.use([express.json(), express.urlencoded({ extended: true })]);

app.listen(process.env.PORT, (error) => {
  if (error) console.error(error);
  console.log("The app is running on port", process.env.PORT);
});
