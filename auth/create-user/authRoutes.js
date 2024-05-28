const express = require("express");
const { registerUser, loginUsers } = require("./controllers");
const routes = express.Router();

module.exports = (db) => {
  routes.post("/signup", (req, res) => registerUser(req, res, db));
  routes.post("/signup", (req, res) => loginUsers(req, res, db));
  return routes;
};
