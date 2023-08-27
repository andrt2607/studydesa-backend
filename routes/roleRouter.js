var router = require("express").Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { createRole } = require("../services/api/roleService");

// const verifyToken = require('../middleware/authMiddleware')

/* GET users listing. */
router.post("/", createRole);
module.exports = router;
