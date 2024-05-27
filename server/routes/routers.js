const express = require("express");
const app = express();
const { userRegistration } = require("./controllers");
const routes = express.Router();

routes.post("/registration", userRegistration);

module.exports = routes;
