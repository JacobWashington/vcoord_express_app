const db = require("../models");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  db.users
    .findAll()
    .then((users) => {
      res.render("users", { users });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
