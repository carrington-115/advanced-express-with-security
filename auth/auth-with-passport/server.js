require("dotenv").config({ path: "../../.env" });
const express = require("express");
const app = express();
const { initialize, session, setUser } = require("./auth");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_API);
const authRouter = require("./authRouter");

// passport middlewares
app.use([initialize, session, setUser]);

// database
client
  .connect()
  .then(() => console.log("The database is connected"))
  .catch((err) => console.error(err));
const db = client.db("Accounts");

// linking server and db
app.use([express.json(), express.urlencoded({ extended: true })]);
app.use("/api/user", authRouter(db));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on ${process.env.PORT}`)
);
