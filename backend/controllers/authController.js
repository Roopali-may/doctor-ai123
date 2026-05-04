const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

const sanitize = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  phone: u.phone,
  role: u.role,
  avatar: u.avatar,
});

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email and password are required");
  }
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("Email already registered");
  }
  const user = await User.create({ name, email, password, phone, role });
  const token = signToken(user._id);
  res.status(201).json({ user: sanitize(user), token });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  if (role && user.role !== role) {
    res.status(403);
    throw new Error(`This account is not registered as ${role}`);
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
