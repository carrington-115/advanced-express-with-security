require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const fs = require("fs");
const util = require("util");
const readFileFs = util.promisify(fs.readFile);
const { marked } = require("marked");

app.engine("md", async (filePath, options, callback) => {
  try {
    const content = await readFileFs(filePath, "utf8");
    // const rendered = content.toString().replace("{headline}", options.headline);
    return callback(null, marked(content));
  } catch (error) {
    return callback(error);
  }
});
app.set("view engine", "md");
app.set("views", "./views");
const handleFunction = (req, res) => {
  res.render("index", { headline: "Hello World" });
};

app.get("/", handleFunction);

app.listen(process.env.PORT, () => console.log("server is running..."));
