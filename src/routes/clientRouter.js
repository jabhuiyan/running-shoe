const express = require("express");
const router = express.Router();

// Routes for shoes
router.get("/shoes", function (req, res) {
  res.render("./shoes/all");
});

router.get("/shoes/add", function (req, res) {
  res.render("./shoes/add");
});

router.get("/shoes/show", function (req, res) {
  res.render("./shoes/show");
});

// Routes for users
router.get("/users/", function (req, res) {
  res.render("./users/all");
});

router.get("/users/add", function (req, res) {
  res.render("./users/add");
});

router.get("/users/edit", function (req, res) {
  res.render("./users/edit");
});

module.exports = router;
