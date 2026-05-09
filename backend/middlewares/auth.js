const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const makeHttpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) token = header.split(" ")[1];
  if (!token && req.cookies?.token) token = req.cookies.token;

  if (!token) {
    throw makeHttpError("Not authorized, no token", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      throw makeHttpError("User no longer exists", 401);
    }
    next();
  } catch (e) {
    throw makeHttpError("Not authorized, token invalid", 401);
  }
});

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(403);
    return next(new Error(`Role '${req.user.role}' not allowed`));
  }
  next();
};

module.exports = { protect, authorize };
