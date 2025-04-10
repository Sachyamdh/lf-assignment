const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
