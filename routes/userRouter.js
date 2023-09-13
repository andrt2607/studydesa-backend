var router = require("express").Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { getUserPagination } = require("../services/api/roleService");
// const { createRole } = require("../services/api/roleService");

// const verifyToken = require('../middleware/authMiddleware')

/* GET users listing. */
router.get("/", getUserPagination);
// router.get("/")
module.exports = router;
