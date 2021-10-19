const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: { type: String, require: true, unique: true },
  email: { type: String },
  phone: { type: String },
});

const contact = mongoose.model("contact", contactSchema);

module.exports = contact;
