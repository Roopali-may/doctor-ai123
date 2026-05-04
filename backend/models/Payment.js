const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    amount: { type: Number, required: true }, // INR
    currency: { type: String, default: "INR" },
    method: { type: String, enum: ["upi", "card", "netbanking", "wallet"], default: "upi" },
    status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    txnId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
