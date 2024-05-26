const mongoose = require("mongoose");

module.exports.connectDatabase = async (dbUrl) =>
  mongoose.connect(dbUrl, { useNewUrlParser: true });
