const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

// mongoDB setting
mongoose.connect(process.env.MONGO_DB);
let db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");
});

db.on("error", (err) => {
  console.log("DB error : ", err);
});

// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.use("/", require("./routes/home"));
app.use("/contacts", require("./routes/contacts"));

// Port setting
const port = 3000;
app.listen(port, () => {
  console.log("server on! http://localhost:" + port);
});
