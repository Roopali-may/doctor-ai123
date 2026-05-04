const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: String,
    type: { type: String, enum: ["in-person", "online"], default: "in-person" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    fee: Number,
    paid: { type: Boolean, default: false },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
