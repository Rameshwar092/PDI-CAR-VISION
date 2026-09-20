const express = require("express");
const { body, validationResult } = require("express-validator");
const Booking = require("../models/Booking");
const { sendBookingNotification } = require("../config/mailer");
const { bookingLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

/**
 * POST /api/bookings
 * Creates a new inspection booking request from the contact form.
 */
router.post(
  "/",
  bookingLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("Phone is required")
      .matches(/^[0-9+\-\s()]{7,20}$/)
      .withMessage("Enter a valid phone number"),
    body("city").optional({ checkFalsy: true }).trim().isLength({ max: 60 }),
    body("car").optional({ checkFalsy: true }).trim().isLength({ max: 120 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, phone, city, car } = req.body;
      const booking = await Booking.create({ name, phone, city, car });

      // Fire-and-forget: don't fail the request if email sending has issues.
      sendBookingNotification(booking).catch((err) =>
        console.error("Failed to send booking email:", err.message)
      );

      res.status(201).json({
        success: true,
        message: "Booking received",
        booking: { id: booking._id, name: booking.name },
      });
    } catch (err) {
      console.error("Error creating booking:", err.message);
      res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
    }
  }
);

/**
 * GET /api/bookings
 * Lists all bookings, newest first. In production this should be behind
 * admin authentication — see middleware/auth.js and README for notes.
 */
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(200);
    res.json({ success: true, bookings });
  } catch (err) {
    console.error("Error fetching bookings:", err.message);
    res.status(500).json({ success: false, message: "Could not fetch bookings." });
  }
});

module.exports = router;
