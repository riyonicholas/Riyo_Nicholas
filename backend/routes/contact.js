const router = require("express").Router();
const {
  sendMessage,
  getAllMessages,
  markAsRead,
  deleteMessage,
} = require("../controllers/contactController");

router.post("/", sendMessage);
router.get("/", getAllMessages);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteMessage);

module.exports = router;
