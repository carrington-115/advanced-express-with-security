require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

app.use("./server/views");
app.use(cookieParser());
app.use(
  session({
    secret: "very secret key",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => console.log("server is running..."));
