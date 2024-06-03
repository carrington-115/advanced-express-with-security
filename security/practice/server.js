require("dotenv").config({ path: "../../.env" });
const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// to use the connect-mongo, the express-session library is need
// The mongo-connect lib stores the session data in the mongodb database
// All these are included when working with the db credentials

const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_API);
const dbName = "userSession";

// setting of a sample database
const users = [
  { id: 1, username: "john", password: "password123" },
  { id: 2, username: "jane", password: "secret456" },
];

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
  bodyParser.urlencoded({ extended: false }),
  passport.initialize(),
  passport.session(),
]);

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => (u.username = username));
    if (!user) {
      return done(null, false, {
        message: "Incorrect username or the user does not exist",
      });
    } else if (user.password !== password) {
      return done(null, false, { password: "The password is incorrect" });
    }
    done(null, user);
  })
);

// serializing and deserializing the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => (u.id = id));
  done(null, user);
});

app.get("/", (req, res) => {
  res.send("Welcome to the application");
});

app.get("/login", (req, res) => {
  res.send(`
    <form method="post" action="/login">
      <input type="name" name="username" />
      <input type="password" name="password" />
      <input type="submit" value="submit" />
    </form>
  `);
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  }
  const { username } = req.user;
  res.status(200).json({
    success: true,
    message: `The user of ${username} has been authenticated`,
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect();
});

app.listen(process.env.PORT, (error) => {
  if (error) console.error(error);
  console.log("The app is running on port", process.env.PORT);
});
