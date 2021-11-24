const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("./config/passport");
const app = express();

// DB setting
mongoose.connect(process.env.MONGO_DB);
let db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
});
db.on("error", (err) => {
  console.log("DB Erorr : ", err);
});

// other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({ secret: "MySecret", resave: true, saveUninitialized: true }));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(function (req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

// Port setting;
const port = 3000;
app.listen(port, () => {
  console.log("server on! http://localhost:" + 3000);
});
