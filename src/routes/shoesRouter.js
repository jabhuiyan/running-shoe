const express = require("express");
const router = express.Router();

const shoesController = require("../controllers/shoesController");

//GET routes starts here
router.get("/", shoesController.getAll);

router.get("/search", shoesController.search);

router.get("/:id", shoesController.getOne);
//POST routes starts here
router.post("/", shoesController.postNewShoe);

router.put("/:id", shoesController.postUpdateShoe);

//DELETE routes starts here
router.delete("/:id", shoesController.deleteShoe);

module.exports = router;
