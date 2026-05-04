const asyncHandler = require("express-async-handler");
const Payment = require("../models/Payment");
const Appointment = require("../models/Appointment");

// Mock processor — replace with Razorpay/Stripe in production
exports.create = asyncHandler(async (req, res) => {
  const { amount, method, appointmentId } = req.body;
  const payment = await Payment.create({
    user: req.user._id,
    appointment: appointmentId,
    amount,
    method,
    status: "success",
    txnId: "TXN" + Date.now(),
  });
  if (appointmentId) {
    await Appointment.findByIdAndUpdate(appointmentId, { paid: true });
  }
  res.status(201).json(payment);
});

exports.getOne = asyncHandler(async (req, res) => {
  const p = await Payment.findById(req.params.id);
  if (!p) {
    res.status(404);
    throw new Error("Payment not found");
  }
  res.json(p);
});
