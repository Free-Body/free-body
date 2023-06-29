const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
module.exports = app;


// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// Retrieve all products from the database
app.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  } catch (error) {
    next(error);
  }
});

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html with products as data
// error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
