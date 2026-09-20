const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    city: { type: String, trim: true, maxlength: 60 },
    car: { type: String, trim: true, maxlength: 120 },
    status: {
      type: String,
      enum: ["new", "contacted", "scheduled", "completed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

module.exports = mongoose.model("Booking", bookingSchema);
