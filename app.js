require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const connectMongoDB = require("./loaders/mongooseLoader");

const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const counselsRouter = require("./routes/counsels");

const app = express();

connectMongoDB();

app.use(logger("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/counsels", counselsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);

  if (req.app.get("env") === "development") {
    res.json({
      result: err.result || "error",
      message: err.message,
      stack: err.stack,
    });

    return;
  }

  if (err.statusCode === 500) {
    err.message = "Internal Server Error";
  }

  res.json({
    result: err.result || "error",
    message: err.message,
  });
});

module.exports = app;
