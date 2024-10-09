const express = require("express");
const authController = require("../controller/auth.controller");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post("/login", authController.login());
router.post("/register", authController.register());
router.get("/me", isAuthenticatedUser(), authController.getProfile());
router.post("/verify-otp", authController.verifyOTP());
router.get("/logout", authController.logout);

module.exports = router;