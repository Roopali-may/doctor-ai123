const asyncHandler = require("express-async-handler");
const Patient = require("../models/Patient");

exports.me = asyncHandler(async (req, res) => {
  let p = await Patient.findOne({ user: req.user._id });
  if (!p) p = await Patient.create({ user: req.user._id });
  res.json(p);
});

exports.update = asyncHandler(async (req, res) => {
  const p = await Patient.findOneAndUpdate({ user: req.user._id }, req.body, {
    new: true,
    upsert: true,
  });
  res.json(p);
});

exports.listRecords = asyncHandler(async (req, res) => {
  const p = await Patient.findOne({ user: req.user._id });
  res.json(p?.records || []);
});

exports.uploadRecord = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("File required");
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  const p = await Patient.findOneAndUpdate(
    { user: req.user._id },
    {
      $push: {
        records: {
          title: req.body.title || req.file.originalname,
          type: req.body.type || "document",
          fileUrl,
        },
      },
    },
    { new: true, upsert: true }
  );
  res.status(201).json(p.records[p.records.length - 1]);
});

exports.deleteRecord = asyncHandler(async (req, res) => {
  await Patient.updateOne(
    { user: req.user._id },
    { $pull: { records: { _id: req.params.id } } }
  );
  res.json({ message: "Record deleted" });
});
