const router = require("express").Router();
const { register, login, logout, me, forgotPassword } = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, me);
router.post("/forgot-password", forgotPassword);

module.exports = router;
