const asyncHandler = require("express-async-handler");
const Appointment = require("../models/Appointment");

const formatAppointment = (appt) => {
  const doctor = appt.doctor && typeof appt.doctor === "object" ? appt.doctor : null;
  const patient = appt.patient && typeof appt.patient === "object" ? appt.patient : null;
  return {
    id: appt._id,
    doctorId: appt.doctorId || doctor?._id?.toString() || appt.doctor?.toString?.() || "",
    doctorName: appt.doctorName || doctor?.name || "Doctor",
    doctorSpecialization: appt.doctorSpecialization || doctor?.specialty || "",
    doctorImage: appt.doctorImage || doctor?.image || "",
    patientName: appt.patientName || patient?.name || "",
    patientEmail: appt.patientEmail || patient?.email || "",
    patientPhone: appt.patientPhone || patient?.phone || "",
    date: appt.date,
    time: appt.time,
    status: appt.status,
    notes: appt.notes || appt.reason || "",
  };
};

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
