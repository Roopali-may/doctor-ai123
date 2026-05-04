const asyncHandler = require("express-async-handler");
const Vital = require("../models/Vital");

exports.list = asyncHandler(async (req, res) => {
  const items = await Vital.find({ patient: req.user._id }).sort("-recordedAt");
  res.json(items);
});

exports.create = asyncHandler(async (req, res) => {
  const item = await Vital.create({ ...req.body, patient: req.user._id });
  res.status(201).json(item);
});
