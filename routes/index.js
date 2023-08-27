var router = require("express").Router();

// const verifyToken = require('../middleware/authMiddleware')

// router.use(verifyToken)
router.use("/desa", require("./desaRouter"));
router.use("/auth", require("./authRouter"));
router.use("/mahasiswa", require("./mahasiswaRouter"));
router.use("/role", require("./roleRouter"));

module.exports = router;
