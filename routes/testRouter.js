const {
  testHitQueue,
  uploadImageFileDesa,
} = require("../services/api/testQueueService");
const { uploadOption } = require("../utils/uploadFile");

var router = require("express").Router();
// const { createRole } = require("../services/api/roleService");

// const verifyToken = require('../middleware/authMiddleware')

/* GET users listing. */
router.get("/", testHitQueue);
router.post("/imageDesa", uploadOption.single("image"), uploadImageFileDesa);
// router.get("/")
module.exports = router;
