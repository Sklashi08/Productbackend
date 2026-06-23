// route/user.route.js
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
  updateuser
} = require("../controller/user.controller.js");

router.post("/register", register);
router.post("/login", login);
router.get("/getallusers", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateuser);
module.exports = router;
