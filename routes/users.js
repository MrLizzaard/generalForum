const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Index
router.get("/", (req, res) => {
  User.find({})
    .sort({ username: 1 })
    .exec((err, users) => {
      if (err) return res.json(err);
      res.render("users/index", { users: users });
    });
});

// New
router.get("/new", (req, res) => {
  res.render("users/new");
});

// Create
router.post("/", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.json(err);
    res.redirect("/users");
  });
});

// Show
router.get("/:username", (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return res.json(err);
    res.render("users/show", { user: user });
  });
});

// Edit
router.get("/:username/edit", (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return res.json(err);
    res.render("users/edit", { user: user });
  });
});

// Update
router.put("/:username", (req, res, next) => {
  User.findOne({ username: req.params.username })
    .select("password")
    .exec((err, user) => {
      if (err) return res.json(err);

      user.originalPassword = user.password;
      user.password = req.body.newPassword ? req.body.newPassword : user.password;
      for (let i in req.body) {
        user[i] = req.body[i];
      }

      user.save((err, user) => {
        if (err) return res.json(err);
        res.redirect("/users/" + user.username);
      });
    });
});

// Delete
router.delete("/:username", (req, res) => {
  User.deleteOne({ username: req.params.username }, (err) => {
    if (err) return res.json(err);
    res.redirect("/users");
  });
});

module.exports = router;
