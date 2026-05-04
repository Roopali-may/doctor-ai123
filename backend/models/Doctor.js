const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: Number, default: 0 },
    qualification: String,
    bio: String,
    image: String,
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    consultationFee: { type: Number, default: 500 },
    availableSlots: [{ type: String }],
    languages: [{ type: String }],
    location: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
