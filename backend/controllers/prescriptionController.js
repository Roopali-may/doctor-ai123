const asyncHandler = require("express-async-handler");
const Prescription = require("../models/Prescription");

exports.list = asyncHandler(async (req, res) => {
  const filter = req.user.role === "doctor" ? {} : { patient: req.user._id };
  const items = await Prescription.find(filter)
    .populate("doctor")
    .populate("patient", "name email")
    .sort("-createdAt");
  res.json(items);
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Prescription.create(req.body);
  res.status(201).json(item);
});
