const rateLimit = require("express-rate-limit");

// Limits booking submissions to prevent spam/abuse — 5 per 15 minutes per IP.
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { bookingLimiter };
