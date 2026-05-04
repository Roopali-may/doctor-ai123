const router = require("express").Router();
const c = require("../controllers/appointmentController");
const { protect, authorize } = require("../middlewares/auth");

router.get("/", protect, c.myAppointments);
router.get("/all", protect, authorize("admin", "doctor"), c.allAppointments);
router.post("/", protect, c.book);
router.patch("/:id/status", protect, authorize("admin", "doctor"), c.updateStatus);
router.delete("/:id", protect, c.cancel);

module.exports = router;
