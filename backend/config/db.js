const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_LOCAL_URI || "mongodb://localhost:27017";
  const dbName = process.env.MONGO_DB_NAME || "doctor_appointment";
  try {
    await mongoose.connect(uri, { dbName });
    console.log(`✅ MongoDB connected: ${uri}/${dbName}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
