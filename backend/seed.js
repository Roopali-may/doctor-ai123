require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Doctor = require("./models/Doctor");

(async () => {
  await connectDB();
  await User.deleteMany({});
  await Doctor.deleteMany({});

  await User.create([
    { name: "Admin", email: "admin@hms.com", password: "admin123", role: "admin" },
    { name: "Patient One", email: "patient@hms.com", password: "patient123", role: "patient" },
    { name: "Dr. Demo", email: "doctor@hms.com", password: "doctor123", role: "doctor" },
  ]);

  await Doctor.create([
    {
      name: "Dr. Aarav Sharma",
      specialty: "Cardiologist",
      experience: 12,
      qualification: "MBBS, MD",
      bio: "Senior cardiologist with 12+ years of experience.",
      consultationFee: 800,
      rating: 4.8,
      reviews: 240,
      languages: ["English", "Hindi"],
      location: "Mumbai",
    },
    {
      name: "Dr. Priya Mehta",
      specialty: "Dermatologist",
      experience: 8,
      qualification: "MBBS, DDVL",
      consultationFee: 600,
      rating: 4.7,
      reviews: 180,
      languages: ["English", "Hindi", "Marathi"],
      location: "Pune",
    },
  ]);

  console.log("✅ Seed complete");
  await mongoose.disconnect();
})();
