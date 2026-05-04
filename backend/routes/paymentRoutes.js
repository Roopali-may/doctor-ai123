const router = require("express").Router();
const c = require("../controllers/paymentController");
const { protect } = require("../middlewares/auth");

router.post("/", protect, c.create);
router.get("/:id", protect, c.getOne);

module.exports = router;
