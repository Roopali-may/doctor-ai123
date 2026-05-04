const multer = require("multer");
const path = require("path");
const fs = require("fs");

const dir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, dir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

module.exports = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });
