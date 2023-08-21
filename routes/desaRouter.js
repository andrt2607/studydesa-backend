var router = require("express").Router();
const {
  createDesa,
  getAllDesa,
  getDesaById,
  deleteDesa,
  updateDesa,
} = require("../services/api/desaService");

/* GET users listing. */
router.post("/", createDesa);
router.get("/", getAllDesa);
router.get("/:id", getDesaById);
router.put("/:id", updateDesa);
router.delete("/:id", deleteDesa);

module.exports = router;
