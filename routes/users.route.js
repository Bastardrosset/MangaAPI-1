var express = require("express");
var router = express.Router();
const userCtrl = require("../controller/user.controller.js");

/* GET users listing. */
// Get all users
router.get("/users", userCtrl.getAllUsers);
// Get user ID
router.get("/user/id", userCtrl.getUserId);
// Update user ID
router.put("/update/user/id", userCtrl.updateUser);
// Delete user ID
router.delete("/remove/user/id", userCtrl.removeUserId);

module.exports = router;
