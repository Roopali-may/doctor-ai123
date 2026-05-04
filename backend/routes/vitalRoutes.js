const router = require("express").Router();
const c = require("../controllers/vitalController");
const { protect } = require("../middlewares/auth");

router.get("/", protect, c.list);
router.post("/", protect, c.create);

module.exports = router;
