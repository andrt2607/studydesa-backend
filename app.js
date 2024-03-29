var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const sequelize = require("./databases/mysql");
const {client} = require("./config/redis")

var router = require("./routes/index");
const errorMiddleware = require("./middleware/errorMiddleware");
// const { errorMiddleware } = require("./middleware/errorMiddleware");
// var desaRouter = require("./routes/desaRouter");
// var usersRouter = require('./routes/users');
var cron = require("node-cron");
const { default: helmet } = require("helmet");

var app = express();
app.use(helmet())

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/", router);
app.use(errorMiddleware);
// app.use("/", desaRouter);

//setup cron scheduler
cron.schedule("* * * * *", () => {
  console.log("running a task every minute");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//get queue


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

client.connect().then((res) => {
  // console.log("yey")
}).catch((err) => {
  // console.log("noo")
})

module.exports = app;
