const router = require("express").Router();
const c = require("../controllers/prescriptionController");
const { protect, authorize } = require("../middlewares/auth");

router.get("/", protect, c.list);
router.post("/", protect, authorize("doctor", "admin"), c.create);

module.exports = router;
