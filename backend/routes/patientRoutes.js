const router = require("express").Router();
const c = require("../controllers/patientController");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.get("/me", protect, c.me);
router.put("/me", protect, c.update);
router.get("/me/records", protect, c.listRecords);
router.post("/me/records", protect, upload.single("file"), c.uploadRecord);
router.delete("/me/records/:id", protect, c.deleteRecord);

module.exports = router;
