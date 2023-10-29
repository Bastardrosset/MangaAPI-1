const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware")

/* Signup function */
router.post("/register", authCtrl.signup);
/* Signin function*/
router.post("/signin", authCtrl.signin);
/* Logout function */
router.post("/logout", authMiddleware, authCtrl.logout);


module.exports = router;