const router = require("express").Router();
const c = require("../controllers/doctorController");
const { protect, authorize } = require("../middlewares/auth");

router.get("/", c.getAll);
router.get("/:id", c.getOne);
router.post("/", protect, authorize("admin"), c.create);
router.put("/:id", protect, authorize("admin", "doctor"), c.update);
router.delete("/:id", protect, authorize("admin"), c.remove);

module.exports = router;
