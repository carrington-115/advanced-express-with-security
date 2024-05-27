require("dotenv").config({ path: "../../.env" });
const express = require("express");
const routes = require("./routers");
const app = express();

app.use(express.static("../views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", routes);

app.listen(process.env.PORT, () => {
  console.log("server is running on", process.env.PORT);
});
