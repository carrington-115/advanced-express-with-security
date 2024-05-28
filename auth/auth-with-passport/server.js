const express = require("express");
const app = express();
const { initialize, session, setUser } = require("./auth");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_API);

client
  .connect()
  .then(() => console.log("The database is connected"))
  .catch((err) => console.error(err));

app.use([initialize, session, setUser]);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
