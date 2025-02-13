const path = require('path');
const express = require('express');
const createError = require('http-errors');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")

const connectDB = require("./mysql/connection");
const UserController = require("./controllers/users")

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin : process.env.FRONTEND_URL,
  credentials : true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// auth proces
app.use("/" , require("./routes/authRoutes"))

// overeni emailu
app.use("/mail" , require("./routes/mailRoutes"))

// kontrola, jestli se (username | email) nachazi v databazi
app.get("/email/exists" , UserController.isEmailExists)
app.get("/username/exists" , UserController.isUsernameExists)

// nahravani souboru
app.use("/upload" , require("./routes/uploadRoutes"))

// zkontroluje jwt_token
app.use(require("./middlewares/tokenCheck"))

// signed | unsigned
app.get("/verify" , require("./controllers/authController").verify)

// Endpoints
app.use("/posts" , require("./routes/posts"))
app.use("/stories" , require("./routes/stories"))
app.use("/inbox" , require("./routes/inbox"))
app.use("/users" , require("./routes/users"))
app.use("/channels" , require("./routes/channels"))
app.use("/hobbies" , require("./routes/hobbyRoutes"))
app.use("/friends" , require("./routes/friends"))

// propojeni mySQL
connectDB()

// 404
app.use(function(req, res, next) {
  next(createError(404));
});

// neocekavana chyba
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
