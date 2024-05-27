const express = require("express");
const router = express.Router();
const app = express();

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
