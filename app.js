const createError = require("http-errors");
const express = require("express");
const session = require('express-session');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sequelize = require("./database");

require('dotenv').config();

sequelize.sync(
  // {force: true}
).then(()=>console.log('database is ready'));

const usersRouter = require("./routes/users.route"); 
const authRoute = require("./routes/auth.route");
const mangaRouter = require("./routes/manga.route");
const passport = require("passport")

const app = express();

// Configuration express-session
app.use(session({
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  secret: process.env.SECRET_KEY, 
  resave: false,
  saveUninitialized: false,
}));

// Dependences & middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/manga", mangaRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
