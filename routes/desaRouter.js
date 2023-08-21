var router = require("express").Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createDesa,
  getAllDesa,
  getDesaById,
  deleteDesa,
  updateDesa,
} = require("../services/api/desaService");

// const verifyToken = require('../middleware/authMiddleware')

/* GET users listing. */
router.post("/", authMiddleware, createDesa);
router.get("/", getAllDesa);
router.get("/:id", getDesaById);
router.put("/:id", authMiddleware, updateDesa);
router.delete("/:id", authMiddleware, deleteDesa);

module.exports = router;
