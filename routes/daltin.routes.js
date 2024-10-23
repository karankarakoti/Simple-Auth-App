const express = require("express");
const daltinController = require("../controller/daltin.controller");

const router = express.Router();

router.post("/", daltinController.register);
router.get("/:id", daltinController.get);

module.exports = router;