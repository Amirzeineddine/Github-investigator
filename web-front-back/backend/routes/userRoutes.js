const express = require("express");

const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getallUser
 
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddelware");

router.post("/", registerUser);
router.get("/me", protect, getUser);
router.get("/all", protect, getallUser);
router.post("/login", loginUser);





module.exports = router;
