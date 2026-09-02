const router = require("express").Router();
const {
  getAllExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");

router.get("/", getAllExperience);
router.post("/", createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

module.exports = router;
