const { testHitQueue } = require("../services/api/testQueueService");

var router = require("express").Router();
// const { createRole } = require("../services/api/roleService");

// const verifyToken = require('../middleware/authMiddleware')

/* GET users listing. */
router.get("/", testHitQueue);
// router.get("/")
module.exports = router;
