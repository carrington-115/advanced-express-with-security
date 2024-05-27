require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

app.use(cookieParser());
app.use(
  session({
    secret: "very secret key",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(async (req, res, next) => {
  try {
    req.session.name = req.session.name ? "Mark" : "Mark";
    console.log("The cookie name is: ", req.session.name);
    return next();
  } catch (error) {
    return next(error);
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, () => console.log("server is running..."));
