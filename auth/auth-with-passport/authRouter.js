const express = require("express");
const passport = require("passport");
const router = express.Router();

module.exports = (db) => {
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/registerSuccess",
      failureRedirect: "/registerFailure",
    })
  );
  router.post("/signup", (req, res) => registerUser(req, res, db));
  router.post("/login", (req, res) => loginUsers(req, res, db));
  return router;
};
