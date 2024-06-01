require("dotenv").config({ path: "../../.env" });
const express = require("express");
// const { MongoClient } = require("mongodb");
// const client = new MongoClient(process.env.MONGODB_API);
const app = express();
const cookieParser = require("cookie-parser");

// pass all the middlewares
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
]);

app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Mark Carrington", { maxAge: 900000, httpOnly: true });
  res.send("Cookie has been sent");
});

app.get("/get-cookie", (req, res) => {
  const username = req.cookies.username;
  if (username) {
    return res
      .status(200)
      .json({ success: true, data: { username: username } });
  }
  res.send("No cookie here");
});

app.get("/clear-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("The cookie has been cleared");
});

app.listen(process.env.PORT, (error) => {
  if (error) console.error(error);
  console.log("The app is running on port", process.env.PORT);
});
