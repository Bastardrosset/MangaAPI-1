const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/auth.controller");

/* Signup function */
router.post("/register", authCtrl.signup);
/* Signin function*/
router.post("/signin", authCtrl.signin);
/* Logout function */
router.post("/logout", authCtrl.logout);


module.exports = router;