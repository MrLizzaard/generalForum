const express = require("express");
const router = express.Router();
const contact = require("../models/contact");

// Contacts - Index
router.get("/", (req, res) => {
  contact.find({}, (err, contacts) => {
    if (err) return res.json(err);
    res.render("contacts/index", { contacts: contacts });
  });
});

// Contacts - New
router.get("/new", (req, res) => {
  res.render("contacts/new");
});

// Contacts - Create
router.post("/", (req, res) => {
  contact.create(req.body, (err, contact) => {
    if (err) return res.json(err);
    res.redirect("/contacts");
  });
});

// Contacts - Show
router.get("/:id", (req, res) => {
  contact.findOne({ _id: req.params.id }, (err, contact) => {
    if (err) return res.json(err);
    res.render("contacts/show", { contact: contact });
  });
});

// Contacts - Edit
router.get("/:id/edit", (req, res) => {
  contact.findOne({ _id: req.params.id }, (err, contact) => {
    if (err) return res.json(err);
    res.render("contacts/edit", { contact: contact });
  });
});

// Contacts - Update
router.put("/:id", (req, res) => {
  contact.findOneAndUpdate({ _id: req.params.id }, req.body, (err, contact) => {
    if (err) return res.json(err);
    res.redirect("/contacts/" + req.params.id);
  });
});

// Contacts = Delete
router.delete("/:id", (req, res) => {
  contact.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.json(err);
    res.redirect("/contacts");
  });
});

module.exports = router;
