var router = require("express").Router();

router.use("/desa", require("./desaRouter"));
router.use("/auth", require("./authRouter"));

module.exports = router;
