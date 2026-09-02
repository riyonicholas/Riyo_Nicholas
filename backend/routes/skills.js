const router = require("express").Router();
const {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillsController");

router.get("/", getAllSkills);
router.post("/", createSkill);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;
