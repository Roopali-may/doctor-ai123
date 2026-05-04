require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const patientRoutes = require("./routes/patientRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const vitalRoutes = require("./routes/vitalRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// --- Middlewares ---
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Static for uploaded medical records
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Health ---
app.get("/api/v1/health", (_req, res) =>
  res.json({ ok: true, ts: new Date().toISOString() })
);

// --- Routes (mounted at /api/v1 to match VITE_BASEURL) ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/prescriptions", prescriptionRoutes);
app.use("/api/v1/vitals", vitalRoutes);
app.use("/api/v1/payments", paymentRoutes);

// 404 + error handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 API running on http://localhost:${PORT}/api/v1`)
  );
});
