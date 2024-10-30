const {
  getUserByUid,
  registerUser,
  loginUser,
  getAllUser,
  getUserPagination,
  logout,
} = require("../services/api/authService");

var router = require("express").Router();
const { authMiddleware } = require("../middleware/authMiddleware");
// var router = express.Router();

// /* GET users listing. */
router.get("/:id", getUserByUid);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logout);
// router.get("/userpag", getUserPagination)

module.exports = router;
