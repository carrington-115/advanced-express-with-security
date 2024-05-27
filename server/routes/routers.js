const express = require("express");
const app = express();
const {
  userRegistration,
  userLogin,
  userRegistered,
} = require("./controllers");
const routes = express.Router();

routes.post("/registration", userRegistration);
routes.post("/login", userLogin);
routes.get("/registration/success", userRegistered);

module.exports = routes;
