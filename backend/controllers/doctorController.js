const asyncHandler = require("express-async-handler");
const Doctor = require("../models/Doctor");

exports.getAll = asyncHandler(async (req, res) => {
  const { specialty, search } = req.query;
  const q = {};
  if (specialty) q.specialty = specialty;
  if (search) q.name = { $regex: search, $options: "i" };
  const doctors = await Doctor.find(q).sort("-createdAt");
  res.json(doctors);
});

exports.getOne = asyncHandler(async (req, res) => {
  const doc = await Doctor.findById(req.params.id);
  if (!doc) {
    res.status(404);
    throw new Error("Doctor not found");
  }
  res.json(doc);
});

exports.create = asyncHandler(async (req, res) => {
  const doc = await Doctor.create(req.body);
  res.status(201).json(doc);
});

exports.update = asyncHandler(async (req, res) => {
  const doc = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    res.status(404);
    throw new Error("Doctor not found");
  }
  res.json(doc);
});

exports.remove = asyncHandler(async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor removed" });
});
