require("dotenv").config({ path: "../../.env" });
const express = require("express");
const app = express();
const session = require("express-session");

// pass all the middlewares
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
]);

app.get("/set-session", (req, res) => {
  req.session.username = "mark carrington";
  res.send("The session has been set");
});
app.get("/get-session", (req, res) => {
  const username = req.session.username;
  if (username) {
    return res.status(200).json({ success: true, username: username });
  }
  res.send("No session data here");
});
app.get("/destroy-session", (req, res) => {
  req.session.destroy((error) => {
    if (error) res.send("There was an error");
    res.send("The session has been removed");
  });
});

app.listen(process.env.PORT, (error) => {
  if (error) console.error(error);
  console.log("The app is running on port", process.env.PORT);
});
