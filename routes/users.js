const express = require("express");
const router = express.Router();
const User = require("../models/User");
const util = require("../util");

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
      req.flash("errors", util.parseError(err));
      return res.redirect("/users/new");
    }
    res.redirect("/users");
  });
});

// Show
router.get("/:username", util.isLoggedin, checkPermission, (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return res.json(err);
    res.render("users/show", { user: user });
  });
});

// Edit
router.get("/:username/edit", util.isLoggedin, checkPermission, (req, res) => {
  let user = req.flash("user")[0];
  let errors = req.flash("errors")[0] || {};

  if (!user) {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) return res.json(err);
      res.render("users/edit", { username: req.params.username, user: user, errors: errors });
    });
  } else {
    res.render("users/edit", { username: req.params.username, user: user, errors: errors });
  }
});

// Update
router.put("/:username", util.isLoggedin, checkPermission, (req, res, next) => {
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
        if (err) {
          req.flash("user", req.body);
          req.flash("errors", util.parseError(err));
          return res.redirect("/users/" + req.params.username + "/edit");
        }
        res.redirect("/users/" + user.username);
      });
    });
});

module.exports = router;

function checkPermission(req, res, next) {
  User.findOne({ username: req.params.username }, function (err, user) {
    if (err) return res.json(err);
    if (user.id != req.user.id) return util.noPermission(req, res);

    next();
  });
}
