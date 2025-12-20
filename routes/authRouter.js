const express = require("express");
const { auth } = require("../middleware/auth");
const { register, login, getAllUsers, getUserById } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", getAllUsers);
router.get("/userData", auth, getUserById);
module.exports = router;
