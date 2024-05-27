const express = require("express");
const app = express();
const { userRegistration, userLogin } = require("./controllers");
const routes = express.Router();

routes.post("/registration", userRegistration);
routes.post("/login", userLogin);

module.exports = routes;
