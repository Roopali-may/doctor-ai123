const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const demoAccounts = [
  { name: "Admin", email: "admin@hms.com", password: "admin123", role: "admin" },
  { name: "Patient One", email: "patient@hms.com", password: "patient123", role: "patient" },
  { name: "Dr. Demo", email: "doctor@hms.com", password: "doctor123", role: "doctor" },
];

const makeHttpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const findOrCreateDemoAccount = async (email, password) => {
  const demo = demoAccounts.find(
    (account) => account.email === email && account.password === password
  );
  if (!demo) return null;
  const existing = await User.findOne({ email }).select("+password");
  return existing || User.create(demo);
};

const sanitize = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  phone: u.phone,
  role: u.role,
  avatar: u.avatar,
});

exports.register = asyncHandler(async (req, res) => {
  const { name, password, phone, role } = req.body;
  const email = req.body.email?.trim().toLowerCase();
  if (!name?.trim() || !email || !password) {
    throw makeHttpError("Name, email and password are required", 400);
  }
  const exists = await User.findOne({ email });
  if (exists) {
    throw makeHttpError("Email already registered. Please login instead.", 400);
  }
  const user = await User.create({ name: name.trim(), email, password, phone, role });
  const token = signToken(user._id);
  res.status(201).json({ user: sanitize(user), token });
});

exports.login = asyncHandler(async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const { password } = req.body;
  let user = await User.findOne({ email }).select("+password");
  if (!user) user = await findOrCreateDemoAccount(email, password);
  if (!user || !(await user.matchPassword(password))) {
    throw makeHttpError("Invalid email or password", 401);
  }
  const token = signToken(user._id);
  res.json({ user: sanitize(user), token });
});

exports.logout = asyncHandler(async (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

exports.me = asyncHandler(async (req, res) => {
  res.json({ user: sanitize(req.user) });
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  // Stub: in production send email with reset link
  res.json({ message: `Reset instructions sent to ${req.body.email}` });
});
