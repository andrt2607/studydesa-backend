const { authMiddleware } = require("../middleware/authMiddleware");
const { updateFakultas, updateBirthdayDate } = require("../services/api/mahasiswaService");

var router = require("express").Router();
// var router = express.Router();

// /* GET users listing. */
router.put("/fakultas",  authMiddleware ,updateFakultas);
router.put("/birth_date",  authMiddleware ,updateBirthdayDate);

module.exports = router;