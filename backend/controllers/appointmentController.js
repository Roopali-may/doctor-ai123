const asyncHandler = require("express-async-handler");
const Appointment = require("../models/Appointment");

exports.myAppointments = asyncHandler(async (req, res) => {
  const list = await Appointment.find({ patient: req.user._id })
    .populate("doctor")
    .sort("-createdAt");
  res.json(list.map(formatAppointment));
});

exports.allAppointments = asyncHandler(async (req, res) => {
  const list = await Appointment.find()
    .populate("doctor")
    .populate("patient", "name email phone")
    .sort("-createdAt");
  res.json(list.map(formatAppointment));
});

exports.book = asyncHandler(async (req, res) => {
  const appt = await Appointment.create({ ...req.body, patient: req.user._id });
  res.status(201).json(formatAppointment(appt));
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const appt = await Appointment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!appt) {
    res.status(404);
    throw new Error("Appointment not found");
  }
  res.json(appt);
});

exports.cancel = asyncHandler(async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, { status: "cancelled" });
  res.json({ message: "Cancelled" });
});
