require("dotenv").config({ path: "../../.env" });
const express = require("express");
const app = express();

// to use the connect-mongo, the express-session library is need
// The mongo-connect lib stores the session data in the mongodb database
// All these are included when working with the db credentials

const session = require("express-session");
const MongoStore = require("connect-mongo");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_API);
const dbName = "userSession";

// pass all the middlewares
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ client: client, dbName: dbName }),
    cookie: { secure: false },
  }),
]);

const setTheConnectServerFunction = async () => {
  try {
    const clientConnect = await client.connect();
    console.log("The client has successfully connected to the server");
    const sessionDb = client.db(dbName);
  } catch (error) {
    console.error(error);
  }
};

setTheConnectServerFunction();

app.get("/set-session", (req, res) => {
  req.session.username = "Mark Carrington";
  res.send("The session has been created");
});

app.get("/get-session", (req, res) => {
  const username = req.session.username;
  if (username) {
    return res.status(200).json({ success: true, username: username });
  }
  res.send("No session data");
});

app.get("/destroy-session", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.send("An error occured");
    }
    res.send("The session data is destroyed");
  });
});

app.listen(process.env.PORT, (error) => {
  if (error) console.error(error);
  console.log("The app is running on port", process.env.PORT);
});
