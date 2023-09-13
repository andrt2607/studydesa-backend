const {
  getUserByUid,
  registerUser,
  loginUser,
  getAllUser,
  getUserPagination,
} = require("../services/api/authService");

var router = require("express").Router();
// var router = express.Router();

// /* GET users listing. */
router.get("/:id", getUserByUid);
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/userpag", getUserPagination)

module.exports = router;
