require("dotenv").config({ path: "../.env" });
const express = require("express");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_API);
