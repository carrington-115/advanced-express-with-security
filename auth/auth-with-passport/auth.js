const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.PORT);
const accountsCollection = client.db("users").collection("accounts");
const bcrypt = require("bcrypt");

passport.use(
  new localStrategy(
    { usernameField: "email" },
    async (username, password, callback) => {
      try {
        const user = await accountsCollection.findOne({ email: username });
        if (!user) {
          return callback(null, false, {
            message: "Invalid username or password",
          });
        }

        const passwordOk = await bcrypt.compare(password, user.password);
        if (!passwordOk) {
          return callback(null, false, {
            message: "invalid username and password",
          });
        }
        return callback(null, user);
      } catch (error) {
        return callback(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await accountsCollection.findOne({ _id: id });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = {
  initialize: passport.initialize(),
  session: passport.session(),
  setUser: (req, res, next) => {
    res.locals.user = req.user;
    return next();
  },
};
