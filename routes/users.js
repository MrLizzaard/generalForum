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
  let user = req.flash("user")[0] || {};
  let errors = req.flash("errors")[0] || {};
  res.render("users/new", { user: user, errors: errors });
});

// Create
router.post("/", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      req.flash("user", req.body);
      req.flash("error", parseError(err));
      return res.redirect("/users/new");
    }
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
  let user = req.flash("user")[0];
  let errors = req.flash("errors")[0] || {};

  if (!user) {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) return res.json(err);
      res.render("users/edit", { username: req.params.username, user: user, errors: errors });
    });
  } else {
    res.render("user/edit", { username: req.params.username, user: user, errors: errors });
  }
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

function parseError(errors) {
  let parsed = {};

  if (errors.name === "ValidationError") {
    for (let name in errors.errors) {
      let validationError = errors.errors[name];
      parsed[name] = { message: validationError.message };
    }
  } else if (errors.code === "11000" && errors.errmsg.indexOf("username") > 0) {
    parsed.username = { message: "this username already exists!" };
  } else {
    parsed.unhandled = JSON.stringify(errors);
  }

  return parsed;
}
