const {
  getUserByUid,
  registerUser,
  loginUser,
} = require("../services/api/authService");

var router = require("express").Router();
// var router = express.Router();

// /* GET users listing. */
router.get("/:id", getUserByUid);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
