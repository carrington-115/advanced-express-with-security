require("dotenv").config({ path: "../../.env" });
const { connectDatabase } = require("./db");
const http = require("http");
const server = http.createServer();

connectDatabase(process.env.MONGODB_API)
  .then(() => {
    console.log("The database is connected");
    server.listen(process.env.PORT);
  })
  .catch((error) => console.error(error));
