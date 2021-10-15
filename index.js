const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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

// DB schema
const contactSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String },
  phone: { type: String },
});
const contact = mongoose.model("contact", contactSchema);

// Routes
// Home
app.get("/", (req, res) => {
  res.redirect("/contacts");
});

// Contacts - Index
app.get("/contacts", (req, res) => {
  contact.find({}, (err, contacts) => {
    if (err) return res.json(err);
    res.render("contacts/index", { contacts: contacts });
  });
});

// Contacts - New
app.get("/contacts/new", (req, res) => {
  res.render("contacts/new");
});

// Contacts - Create
app.post("/contacts", (req, res) => {
  contact.create(req.body, (err, contact) => {
    if (err) return res.json(err);
    res.redirect("/contacts");
  });
});

// Port setting
const port = 3000;
app.listen(port, () => {
  console.log("server on! http://localhost:" + port);
});
