const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    dob: Date,
    gender: { type: String, enum: ["male", "female", "other"] },
    bloodGroup: String,
    address: String,
    emergencyContact: String,
    allergies: [String],
    chronicConditions: [String],
    records: [
      {
        title: String,
        type: String, // lab-report, prescription, scan, etc
        fileUrl: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
