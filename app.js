const createError = require("http-errors");
const express = require("express");
const cors = require('cors');
const path = require("path");
const logger = require("morgan");
const sequelize = require("./database");

require('dotenv').config({ path: './config/.env' });
require('./database');

sequelize.sync(
  // {force: true}
).then(()=>console.log('database is ready'));

const usersRouter = require("./routes/users.route"); 
const authRouter = require("./routes/auth.route");
const mangaRouter = require("./routes/manga.route");

const app = express();

//----- Entetes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, , Authorization'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next();
  });

// Dependences & middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//----- Headers & autorizations -----//
app.use(cors());

// Routes
app.use("/api/manga", mangaRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

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
