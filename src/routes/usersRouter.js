const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/usersController.js");

router.get("/", usersController.all);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  usersController.getAuthenticatedUser
);

router.get("/:email", usersController.getOne);

router.put("/:email", usersController.updateOne);

router.delete("/:email", usersController.deleteOne);

router.post("/signup", usersController.signup);

router.post("/login", usersController.login);

module.exports = router;
