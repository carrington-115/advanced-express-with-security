require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();

app.use([express.json(), express.urlencoded({ extended: true })]);
